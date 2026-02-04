import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { getIO  } from "../socket/index.js";

export const createChannel = async (req: Request, res: Response) => {
   const { workspaceId } = req.params;
   const { name } = req.body;
   const userId = req.userId!;

   if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid params" });

   if(!name || name.trim().length < 2) return res.status(400).json({ message: "Channel name is too short" });

   const membership = await prisma.workspaceMember.findUnique({
    where: {
        userId_workspaceId: {
            userId, workspaceId
        },
    },
   });

   if(!membership) return res.status(404).json({ message: "Not a workspace member" });

   const channel = await prisma.channel.create({
    data: {
        workspaceId,
      name: name.toLowerCase().replace(/\s+/g, "-"),
      ownerId: userId,
    },
   });

   res.status(201).json(channel);
};

export const listChannels = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const userId = req.userId!;

    if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid params" });

    const membership = await prisma.workspaceMember.findUnique({
        where: {
           userId_workspaceId: {
            userId, workspaceId
           },
        },
    });

    if(!membership) return res.status(404).json({ message: "Not a workspace member" });

    const channels = await prisma.channel.findMany({
        where: {
            workspaceId 
        },

        orderBy: {
            createdAt: "asc"
        },
    });

    res.json(channels);
};

export const getChannel = async (req: Request, res: Response) => {
  const { workspaceId, channelId } = req.params;
  const userId = req.userId!;

  if (typeof workspaceId !== "string" || typeof channelId !== "string") {
    return res.status(400).json({ message: "Invalid params" });
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!membership) {
    return res.status(403).json({ message: "Not a workspace member" });
  }

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
      workspaceId,
    },
  });

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  const channelMembership = await prisma.channelMember.findUnique({
    where: {
      channelId_userId: {
        channelId,
        userId,
      },
    },
  });

  if (!channelMembership) {
    return res.status(403).json({ message: "Not a channel member" });
  }

  res.json({
    id: channel.id,
    name: channel.name,
    workspaceId: channel.workspaceId,
    createdAt: channel.createdAt,
  });
};

export const sendMessages = async (req: Request, res: Response) => {
    const { workspaceId, channelId } = req.params;
    const { content } = req.body;
    const userId = req.userId!;

   if(typeof channelId !== "string" || typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid params" });

   if (!content || content.trim().length === 0) return res.status(400).json({ message: "Empty Message" });

   const channel = await prisma.channel.findUnique({
    where: { id: channelId, workspaceId }
   });

   if(!channel) return res.status(404).json({ message: "Channel not found" });

   const membership = await prisma.workspaceMember.findUnique({
    where: {
        userId_workspaceId: {
            userId, workspaceId
        },
    },
   });

   if(!membership) return res.status(404).json({ message: "Not a workspace member" });

   const message = await prisma.message.create({
    data: {
        userId,
        content: content.trim(),
        channelId
    },
    include: {
        user: { select: { id: true, name: true }}
    },
   });

   const io = getIO();

   io.to(`channel:${channelId}`).emit("message:new", message);

   res.status(201).json(message);
};

export const listMessages = async (req: Request, res: Response) => {
    const { workspaceId, channelId } = req.params;
    const cursor = req.query.cursor as string | undefined;
    const userId = req.userId!;

    if(typeof workspaceId !== "string" || typeof channelId !== "string") return res.status(400).json({ message: "Invalid params"});

    const channel = await prisma.channel.findFirst({
        where: {
            id: channelId, workspaceId
        },
    });

    if(!channel) return res.status(404).json({ message: "Channel not found" });

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId, workspaceId
            },
        },
    });

    if(!membership) return res.status(404).json({ message: "Not a workspace member" });

    const LIMIT = 20;

    const messages = await prisma.message.findMany({
        where: {
            channelId
        },
        orderBy: {
            createdAt: "desc"
        },
        take: LIMIT + 1,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1
        }),
         include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
         }
    });

    let nextCursor: string | null = null;

    if(messages.length > LIMIT) {
        const nextItem = messages.pop();
        nextCursor = nextItem!.id;
    };

    res.json({
        messages: messages.reverse(),
        nextCursor,
    });
};

export const editMessage = async (req: Request, res: Response) => {
  const { workspaceId, channelId, messageId } = req.params;
  const { content } = req.body;
  const userId = req.userId!;

  if (
    typeof workspaceId !== "string" ||
    typeof channelId !== "string" ||
    typeof messageId !== "string"
  ) {
    return res.status(400).json({ message: "Invalid params" });
  }

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ message: "Content cannot be empty" });
  }

  const message = await prisma.message.findFirst({
    where: {
      id: messageId,
      channelId,
      channel: {
        workspaceId,
      },
    },
  });

  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!membership) {
    return res.status(403).json({ message: "Not a workspace member" });
  }

  if (
    message.userId !== userId &&
    membership.role !== "OWNER" &&
    membership.role !== "ADMIN"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

const updated = await prisma.message.update({
  where: { id: messageId },
  data: { content },
  include: {
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  },
});

  const io = getIO();

  io.to(`channel:${channelId}`).emit("message:updated", updated);

  res.json(updated);
};

export const deleteMessage = async (req: Request, res: Response) => {
    const { workspaceId, channelId, messageId } = req.params;
    const userId = req.userId!;

    if (
    typeof workspaceId !== "string" ||
    typeof channelId !== "string" ||
    typeof messageId !== "string"
  ) {
    return res.status(400).json({ message: "Invalid params" });
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: { 
        userId_workspaceId: {
            userId, workspaceId
        },
    },
  });

  if(!membership) return res.status(404).json({ message: "Not a workspace member" });

  const message = await prisma.message.findUnique({
    where: { id: messageId, channelId,
        channel: {
            workspaceId
        },
     },
        
  });

  if(!message) return res.status(404).json({ message: "Message not found" });

   if (
    message.userId !== userId &&
    membership?.role !== "OWNER" &&
    membership?.role !== "ADMIN"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  };

   await prisma.message.delete({
     where: {
        id: messageId
     },
   });

   const io = getIO();

   io.to(`channel:${channelId}`).emit("message:deleted", {
    id: messageId,
   });
   
   res.json({ success: true });
};

export const leaveChannel = async (req: Request, res: Response) => {
  const { workspaceId, channelId } = req.params;
  const userId = req.userId!;

  if (
    typeof workspaceId !== "string" ||
    typeof channelId !== "string"
  ) {
    return res.status(400).json({ message: "Invalid params" });
  }

  const workspaceMembership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  if (!workspaceMembership) {
    return res.status(403).json({ message: "Not a workspace member" });
  }

  const channel = await prisma.channel.findFirst({
    where: {
      id: channelId,
      workspaceId,
    },
    include: {
      members: {
        orderBy: { joinedAt: "asc" },
      },
    },
  });

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" });
  }

  const isOwner = channel.ownerId === userId;

  if (!isOwner) {
    await prisma.channelMember.delete({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
    });

    return res.json({ success: true });
  }

  const otherMembers = channel.members.filter(
    m => m.userId !== userId
  );

  if (otherMembers.length === 0) {
    await prisma.channel.delete({
      where: { id: channelId },
    });

    return res.json({
      success: true,
      deleted: true,
    });
  }

  const newOwner = otherMembers[0]!;

  await prisma.$transaction([
    prisma.channel.update({
      where: { id: channelId },
      data: {
        ownerId: newOwner.userId,
      },
    }),
    prisma.channelMember.delete({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
    }),
  ]);

  return res.json({
    success: true,
    newOwnerId: newOwner.userId,
  });
};