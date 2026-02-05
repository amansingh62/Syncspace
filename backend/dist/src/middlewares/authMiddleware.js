import { verifyAccessToken } from "../utilities/token.js";
export const requireAuth = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const payload = verifyAccessToken(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map