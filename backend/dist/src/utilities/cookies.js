export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
};
export const clearAuthCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};
//# sourceMappingURL=cookies.js.map