import type { Response } from "express";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/", 
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/", 
    });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", {
  path: "/",
});

res.clearCookie("refreshToken", {
  path: "/",
});
};
