import { Router } from "express";

import historyController from "../controllers/history.controller";
import { authenticateJWT } from "../../../../middleware/user.auth.middleware";

const router = Router();

router.get("/", authenticateJWT as any, historyController.getHistory as any);       // Get watch history
router.post("/:videoId", authenticateJWT as any, historyController.addedToHistory as any); // Add to watch history
router.delete("/", authenticateJWT as any, historyController.clearHistory as any);  // Clear history
router.delete("/:videoId", authenticateJWT as any, historyController.deleteHistory as any); // Remove from watch history

export default router;
