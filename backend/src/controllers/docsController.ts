import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { Prisma } from "../../generated/prisma/browser.js";

export const createDoc = async (req: Request, res: Response) => {
   const { workspaceId } = req.params;
   const { title } = req.body;
   const userId = req.userId!;

   if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid"});

   if(!title || title.trim().length < 2){
    return res.status(400).json({ message: "Title too short" });
   };

   const membership = await prisma.workspaceMember.findUnique({
    where: {
        userId_workspaceId: {
            userId, workspaceId
        },
    },
   });

   if(!membership) return res.status(403).json({ message: "Not a workspace member" });

   const doc = await prisma.doc.create({
    data: {
        workspaceId,
        title: title.trim(),
    }
   });

   return res.json(doc);
}

export const listDoc = async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const userId = req.userId!;

    if(typeof workspaceId !== "string") return res.status(400).json({ message: "Invalid workspace"});

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
              userId, workspaceId
            },
        },
    });

    if(!membership) return res.status(403).json({ message: "Member not found" });

    const docs = await prisma.doc.findMany({
        where: {
            workspaceId
        },
        orderBy: { updatedAt: "desc"},
    });

    res.json(docs);
};

export const getDoc = async (req: Request, res: Response) => {
    const { workspaceId, docId } = req.params;
    const userId = req.userId!;

    if(typeof workspaceId !== "string" || typeof docId !== "string") return res.status(400).json({ message: "Invalid params" });

    const membership = await prisma.workspaceMember.findUnique({
        where: {
            userId_workspaceId: {
                userId, workspaceId
            },
        },
    });

    if(!membership) return res.status(403).json({ message: "Not a workspace member" });

    const doc = await prisma.doc.findFirst({

        where: {
            id: docId, workspaceId
        }
    });

     if (!doc) {
    return res.status(404).json({ message: "Doc not found" });
  }

    res.json(doc);
};

export const updateDoc = async (req: Request, res: Response) => {
  const { workspaceId, docId } = req.params;
  const { title, content } = req.body;
  const userId = req.userId!;

  if (typeof workspaceId !== "string" || typeof docId !== "string") {
    return res.status(400).json({ message: "Invalid params" });
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
  });

  if (!membership) {
    return res.status(403).json({ message: "Not a workspace member" });
  }

  const doc = await prisma.doc.findFirst({
    where: {
      id: docId,
      workspaceId,
    },
  });

  if (!doc) {
    return res.status(404).json({ message: "Doc not found" });
  }

  const data: Prisma.DocUpdateInput = {};

  if (typeof title === "string" && title.trim().length > 0) {
    data.title = title.trim();
  }

  if (typeof content === "string") {
    data.content = content;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  const updated = await prisma.doc.update({
    where: { id: docId },
    data,
  });

  return res.json(updated);
};
