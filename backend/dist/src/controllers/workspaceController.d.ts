import type { Request, Response } from "express";
export declare const createWorkspace: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listWorkspaces: (req: Request, res: Response) => Promise<void>;
export declare const inviteMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const acceptInvite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyInvite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const rejectInvite: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWorkspaceMembers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const changeMemberRole: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeMember: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const leaveWorkspace: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteWorkspace: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=workspaceController.d.ts.map