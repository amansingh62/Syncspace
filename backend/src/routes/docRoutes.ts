import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createDoc, getDoc, listDoc } from "../controllers/docs.js";

const router = Router();

router.post("/:workspaceId/docs", requireAuth, createDoc);
router.get("/:workspaceId/docs", requireAuth, listDoc);
router.get("/:workspaceId/docs/:docId", requireAuth, getDoc);

export default router;