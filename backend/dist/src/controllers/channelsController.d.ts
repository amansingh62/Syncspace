import type { Request, Response } from "express";
export declare const createChannel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listChannels: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChannel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const sendMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const leaveChannel: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=channelsController.d.ts.map