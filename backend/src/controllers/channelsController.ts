import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

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

   if(!membership) return res.status(403).json({ message: "Not a workspace member" });

   const channel = await prisma.channel.create({
    data: {
        workspaceId,
      name: name.toLowerCase().replace(/\s+/g, "-"),
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

    if(!membership) return res.status(403).json({ message: "Not a workspace member" });

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

   if(!membership) return res.status(403).json({ message: "Not a workspace member" });

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

    if(!channel) return res.status(403).json({ message: "Channel not found" });

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId, workspaceId
            },
        },
    });

    if(!membership) return res.status(403).json({ message: "Not a workspace member" });

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