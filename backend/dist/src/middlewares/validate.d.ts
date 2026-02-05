import type { ZodTypeAny } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map