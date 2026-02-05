import type { Request, Response } from "express";
export declare const createDoc: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listDoc: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDoc: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDoc: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=docsController.d.ts.map