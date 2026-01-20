import type { ZodTypeAny  } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodTypeAny ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
    });

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });
    }
    next();
  };
