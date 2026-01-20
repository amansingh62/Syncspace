import type { Request, Response } from "express";
import { setAuthCookies, clearAuthCookies } from "../utilities/cookies.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utilities/token.js";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const isExist = await prisma.user.findUnique({ where: {email} });
    if(isExist) return res.status(403).json({ message: "Account already exists"});

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: { name, email, password: hashed },
    });

    res.status(201).json({ id: user.id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  setAuthCookies(res, accessToken, refreshToken);

  res.json({ success: true });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if(!token) return res.status(401).json({ message: "NO token" });

  let payload;

  try {
    payload = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = signAccessToken(payload.userId);
  const newRefreshToken = signRefreshToken(payload.userId);

  setAuthCookies(res, newAccessToken, newRefreshToken);

  res.json({ success : true });
}

export const logout = async (req: Request, res: Response) => {
  clearAuthCookies(res);
  return res.json({ success: true });
};

export const me = async (req: Request, res: Response) => {
    if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
