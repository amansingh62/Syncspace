import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";

export const requireWorkspaceMember = async (req: Request, res: Response, next: NextFunction) => {
    const workspaceId = req.params.workspaceId;

    if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid workspace" });

    const member = await prisma.workspaceMember.findFirst({
        where: {
            userId: req.userId!,
            workspaceId,
        },
    });

    if(!member) return res.status(403).json({ message: "Not a workspace member" });

    req.workspaceId = workspaceId;
    req.workspaceRole = member.role;

    next();
}
