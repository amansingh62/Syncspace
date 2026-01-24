import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createDoc, listDoc } from "../controllers/docs.js";

const router = Router();

router.post("/:workspaceId/docs", requireAuth, createDoc);
router.get("/:workspaceId/docs", requireAuth, listDoc);

export default router;