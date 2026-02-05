export const requireRole = (roles) => (req, res, next) => {
    if (!req.workspaceRole || !roles.includes(req.workspaceRole)) {
        return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
};
//# sourceMappingURL=roleGuardMiddleware.js.map