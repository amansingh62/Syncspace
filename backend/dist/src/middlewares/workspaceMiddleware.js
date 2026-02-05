import { prisma } from "../config/prisma.js";
export const requireWorkspaceMember = async (req, res, next) => {
    const workspaceId = req.params.workspaceId;
    if (typeof workspaceId !== "string")
        return res.status(400).json({ message: "Invalid workspace" });
    const member = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId: req.userId,
                workspaceId,
            },
        },
    });
    if (!member)
        return res.status(403).json({ message: "Not a workspace member" });
    req.workspaceId = workspaceId;
    req.workspaceRole = member.role;
    next();
};
//# sourceMappingURL=workspaceMiddleware.js.map