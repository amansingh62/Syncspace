import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createChannel, deleteMessage, editMessage, getChannel, leaveChannel, listChannels, listMessages, sendMessages } from "../controllers/channelsController.js";
const router = Router();
router.post("/:workspaceId/channels", requireAuth, createChannel);
router.get("/:workspaceId/channels", requireAuth, listChannels);
router.get("/:workspaceId/channels/:channelId", requireAuth, getChannel);
router.post("/:workspaceId/channels/:channelId/messages", requireAuth, sendMessages);
router.get("/:workspaceId/channels/:channelId/messages", requireAuth, listMessages);
router.patch("/:workspaceId/channels/:channelId/messages/:messageId", requireAuth, editMessage);
router.delete("/:workspaceId/channels/:channelId/messages/:messageId", requireAuth, deleteMessage);
router.delete("/:workspaceId/channels/:channeld/leave", requireAuth, leaveChannel);
export default router;
//# sourceMappingURL=channelRoutes.js.map