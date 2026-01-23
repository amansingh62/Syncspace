import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { requireWorkspaceMember } from "../middlewares/workspaceMiddleware.js";
import { requireRole } from "../middlewares/roleGuardMiddleware.js";
import { acceptInvite, changeMemberRole, createWorkspace, 
         getWorkspaceMembers, inviteMember, leaveWorkspace, listWorkspaces,
         removeMember } from "../controllers/workspaceController.js";

const router = Router();

router.post("/", requireAuth, createWorkspace);
router.get("/", requireAuth, listWorkspaces);

router.get("/:workspaceId/members", requireAuth, getWorkspaceMembers);
router.patch("/:workspaceId/members/:memberId/role", requireAuth, changeMemberRole);
router.delete("/:workspaceId/members/:memberId", requireAuth, removeMember);

router.post("/:workspaceId/invite", requireAuth, requireWorkspaceMember, requireRole(["OWNER", "ADMIN"]), inviteMember);
router.post("/invite/:token", requireAuth, acceptInvite);

router.delete("/:workspaceId/leave", requireAuth, leaveWorkspace);

export default router;