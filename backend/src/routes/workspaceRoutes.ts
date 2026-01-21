import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireWorkspaceMember } from "../middlewares/workspaceMiddleware.js";
import { requireRole } from "../middlewares/roleGuardMiddleware.js";
import { acceptInvite, createWorkspace, inviteMember, listWorkspaces } from "../controllers/workspaceController.js";

const router = Router();

router.post("/", requireAuth, createWorkspace);
router.get("/", requireAuth, listWorkspaces);
router.post("/:workspaceId/invites", requireAuth, requireWorkspaceMember, requireRole(["OWNER", "ADMIN"]), inviteMember);
router.post("/invite/:token", requireAuth, acceptInvite);

export default router;