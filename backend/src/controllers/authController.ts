import type { Request, Response } from "express";
import { setAuthCookies, clearAuthCookies } from "../utilities/cookies.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utilities/token.js";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

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

  const sessionId = randomUUID();

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(sessionId);

  const session = await prisma.session.create({
    data: {
      id: sessionId,
      userId: user.id,
      refreshToken, 
      userAgent: req.headers["user-agent"] ?? "unknown",
      ipAddress: req.ip ?? "unknown",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  setAuthCookies(res, accessToken, refreshToken);

  res.json({ success: true });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  const session = await prisma.session.findUnique({
    where: { refreshToken: token },
  });

  if (!session) {
    return res.status(401).json({ message: "Token reuse detected" });
  }

  if (session.revokedAt) {
    await prisma.session.updateMany({
      where: { userId: session.userId },
      data: { revokedAt: new Date() },
    });

    return res.status(401).json({ message: "Token reuse detected" });
  }

  const newRefreshToken = signRefreshToken(session.id);
  const newAccessToken = signAccessToken(session.userId);

  await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken: newRefreshToken },
  });

  setAuthCookies(res, newAccessToken, newRefreshToken);
  res.json({ success: true });
};


export const logout = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if(refreshToken){
        await prisma.session.deleteMany({
         where: { refreshToken: refreshToken }
        });
    }

      clearAuthCookies(res);
  res.json({ success: true });
};

export const logoutAll = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await prisma.session.deleteMany({
    where: { userId: req.userId },
  });

  clearAuthCookies(res);
  res.json({ success: true });
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
