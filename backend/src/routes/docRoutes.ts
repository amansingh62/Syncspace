import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createDoc } from "../controllers/docs.js";

const router = Router();

router.post("/:workspaceId/docs", requireAuth, createDoc);

export default router;