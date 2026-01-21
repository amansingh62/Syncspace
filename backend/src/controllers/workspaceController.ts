import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import crypto from "crypto";

export const createWorkspace = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
    
        if(!req.userId) return res.status(401).json({ message: "Unathorized" });

        if(!name || name.trim().length < 2){
            res.status(400).json({ message: "Workspace name must be at least 2 characters" });
        }

        const workspace = await prisma.workspace.create({
            data: {
                name: name.trim(),
                members: {
                    create: {
                        userId: req.userId,
                        role: "OWNER",
                    },
                },
            },
            include: {
                members: true,
            },
        });
        return res.status(201).json(workspace);
    } catch (error) {
        console.error("Create workspace error:", error);
    return res.status(500).json({
      message: "Failed to create workspace",
    });
    }
};

export const listWorkspaces = async (req: Request, res: Response) => {
    const workspaces = await prisma.workspaceMember.findMany({ 
        where: { userId: req.userId! },
        include: {
            workspace: true,
        },
    });

    res.json(workspaces.map(w => ({
        id: w.workspace.id,
        name: w.workspace.name,
        role: w.role,
    })));
};

export const inviteMember = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { workspaceId } = req.params;

  if (typeof workspaceId !== "string") {
    return res.status(400).json({ message: "Invalid workspaceId" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

    const token = crypto.randomUUID();

    const invite = await prisma.workspaceInvite.create({
        data: {
            workspaceId,
            email,
            token,
            expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
    });

    res.status(201).json({ token });
}

export const acceptInvite = async (req: Request, res: Response) => {
    const { token } = req.params;

    if (typeof token !== "string") {
    return res.status(400).json({ message: "Invalid invite token" });
  }
    if (typeof token !== "string") {
    return res.status(400).json({ message: "Invalid invite token" });
  }
  
    const invite = await prisma.workspaceInvite.findUnique({
        where: { token },
    });

    if(!invite || invite.expiresAt < new Date()) {
        return res.status(400).json({ message: "Invalid invite" });
    }

    await prisma.workspaceMember.create({
        data: {
            userId: req.userId!,
            workspaceId: invite.workspaceId,
            role: "MEMBER"
        },
    });
}