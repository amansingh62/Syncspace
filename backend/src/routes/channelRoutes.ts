import { Router } from "express"
import { requireAuth } from "../middlewares/authMiddleware.js";
import { createChannel, listChannels, listMessages, sendMessages } from "../controllers/channelsController.js";

const router = Router();

router.post("/:workspaceId/channels", requireAuth, createChannel);
router.get("/:workspaceId/channels", requireAuth, listChannels);
router.post("/:workspaceId/channels/:channelId/messages", requireAuth, sendMessages);
router.get("/:workspaceId/channels/:channelId/messages", requireAuth, listMessages);
export default router;