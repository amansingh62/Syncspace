import type { Response } from "express";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const, 
        maxAge: 15 * 60 * 1000,
        path: "/", 
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none" as const, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/", 
    });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("accessToken", {
        path: "/",
        sameSite: "none" as const, 
        secure: true,
    });

    res.clearCookie("refreshToken", {
        path: "/",
        sameSite: "none" as const, 
        secure: true,
    });
};