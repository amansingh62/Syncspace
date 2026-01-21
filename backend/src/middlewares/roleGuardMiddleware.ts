import type { Request, Response, NextFunction } from "express";
import type { WorkspaceRole } from "../types/roles.js";

export const requireRole =
  (roles: WorkspaceRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.workspaceRole || !roles.includes(req.workspaceRole)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
