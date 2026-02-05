import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createDoc, getDoc, listDoc, updateDoc } from "../controllers/docsController.js";
const router = Router();
router.post("/:workspaceId/docs", requireAuth, createDoc);
router.get("/:workspaceId/docs", requireAuth, listDoc);
router.get("/:workspaceId/docs/:docId", requireAuth, getDoc);
router.patch("/:workspaceId/docs/:docId", requireAuth, updateDoc);
export default router;
//# sourceMappingURL=docRoutes.js.map