import type { Request, Response, NextFunction } from "express";
import type { WorkspaceRole } from "../types/roles.js";
export declare const requireRole: (roles: WorkspaceRole[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleGuardMiddleware.d.ts.map