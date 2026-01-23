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
    const members = await prisma.workspaceMember.findMany({ 
        where: { userId: req.userId! },
        include: {
            workspace: {
        select: {
          id: true,
          name: true,
        },
      },
        },
    });

      res.json(members);

};

export const inviteMember = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { workspaceId } = req.params;

  if (typeof workspaceId !== "string") {
    return res.status(400).json({ message: "Invalid workspace" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const existingInvite = await prisma.workspaceInvite.findUnique({
    where: {
      workspaceId_email: {
        workspaceId,
        email,
      },
    },
  });

  if (existingInvite) {
    return res.status(400).json({
      message: "User already invited to this workspace",
    });
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

  return res.status(201).json({ token });
};

export const acceptInvite = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (typeof token !== "string") {
    return res.status(400).json({ message: "Invalid invite token" });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const invite = await prisma.workspaceInvite.findUnique({
    where: { token },
  });

  if (!invite || invite.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired invite" });
  }

  const alreadyMember = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: req.userId,
        workspaceId: invite.workspaceId,
      },
    },
  });

  if (alreadyMember) {
    return res.status(400).json({ message: "Already a workspace member" });
  }

  await prisma.workspaceMember.create({
    data: {
      userId: req.userId,
      workspaceId: invite.workspaceId,
      role: "MEMBER",
    },
  });

  await prisma.workspaceInvite.delete({
    where: { id: invite.id },
  });

  return res.json({ success: true });
};

export const getMyInvite = async (req: Request, res: Response) => {
  const userId = req.userId!;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

    const invites = await prisma.workspaceInvite.findMany({
      where: {
        email: user.email,
        expiresAt: { gt: new Date() },
      },

      include: {
        workspace: {
          select: { id: true, name: true },
        },
      },
    });

    return res.json(invites);
};

export const rejectInvite = async (req: Request, res: Response) => {
  const { token } = req.params;
  const userId = req.userId!;

  if(typeof token !== "string") return res.status(400).json({ message: "Invalid invite Token" });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true }
  });

   if(!user) return res.status(401).json({ message: "Unauthorize" });

   const invite = await prisma.workspaceInvite.findUnique({
    where: { token },
   });

   if (!invite || invite.email !== user.email) {
    return res.status(404).json({ message: "Invite not found" });
  };

  await prisma.workspaceInvite.delete({
    where: { id: invite.id }
  });

  return res.json({ success: true });
  
};

export const getWorkspaceMembers = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const userId = req.userId!;
 
  if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid workspace" });
  
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      }
    }
  });

  if(!membership) return res.status(403).json({ message: "Not a workspace member" });

  const members = await prisma.workspaceMember.findMany({
    where: {
      workspaceId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { 
      role: "desc",
    },
  });

  return res.json({
    currentUserRole: membership.role,
  members: members.map(m => ({
    id: m.id,
    role: m.role,
    user: m.user,
    isCurrentUser: m.userId === userId,

    })),
});
};

export const changeMemberRole = async (req: Request, res: Response) => {
  const { workspaceId, memberId } = req.params;
  const { role } = req.body;
  const userId = req.userId!;

  if(typeof workspaceId !== "string" || typeof memberId !== "string") {
    return res.status(400).json({ message: "Invalid workspace or member" });
  }

  if(!["ADMIN", "MEMBER"].includes(role)){
    return res.status(400).json({ message: "Invalid role" });
  };

  const requester = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    }
  });

  if(!requester || requester.role !== "OWNER"){
    return res.status(403).json({ message: "Only owner can change roles" });
  };

  const target = await prisma.workspaceMember.findUnique({
    where: { id: memberId },
  });

  if(!target || target.workspaceId !== workspaceId) {
    return res.status(404).json({ message: "Member not found" });
  };

  if(target.role === "OWNER"){
    return res.status(400).json({ message: "Cannot change owner role" });
  };

  const changed = await prisma.workspaceMember.update({
    where: {
      id: memberId
    },
    data: {
     role
    }
  });

  res.json(changed);
};

export const removeMember = async (req: Request, res: Response) => {
  const { memberId, workspaceId } = req.params;
  const userId = req.userId!;

  if(typeof workspaceId !== "string" || typeof memberId !== "string") {
    return res.status(400).json({ message: "Invalid workspace or member" });
  }

  const requester = await prisma.workspaceMember.findUnique({
    where: { 
      userId_workspaceId: {
        userId, 
        workspaceId
      }
    }
  });

  if(!requester) return res.status(403).json({ message: "Not a workspace member" });

  const target = await prisma.workspaceMember.findUnique({ 
    where: {
      id: memberId
    }
  });

  if(!target || target.workspaceId !== workspaceId){
    return res.status(404).json({ message: "Member not found" });
  };

  if(target.role === "OWNER") return res.status(400).json({ message: "Cannot remove owner" });

  if(target.userId === userId) return res.status(400).json({ message: "Cannot remove self" });

  if(requester.role === "ADMIN" && target.role !== "MEMBER") return res.status(403).json({ message: "Admins can only remove members"});

  await prisma.workspaceMember.delete({
    where: { id: memberId }
  });

  return res.json({ success: true });
};

export const leaveWorkspace = async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const userId = req.userId!;

  if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid Workspace" });

  const membership = await prisma.workspaceMember.findUnique({
    where: { 
      userId_workspaceId: {
        workspaceId,
        userId
      },
    },
  });

  if(!membership) return res.status(404).json({ message: "Not a workspace member" });

  if(membership.role == "OWNER") return res.status(400).json({ message: "Owner cannot leave directly" });

  await prisma.workspaceMember.delete({
    where: { id: membership.id }
  });

  res.json({ success: "true" });
};
