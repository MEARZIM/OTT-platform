import { Router } from "express";

import historyController from "../controllers/history.controller";
import { authenticateJWT } from "../../../../middleware/user.auth.middleware";

const historyRouter = Router();

historyRouter.get("/", authenticateJWT as any, historyController.getHistory as any);       // Get watch history
historyRouter.post("/:videoId", authenticateJWT as any, historyController.addedToHistory as any); // Add to watch history
historyRouter.delete("/", authenticateJWT as any, historyController.clearHistory as any);  // Clear history
historyRouter.delete("/:videoId", authenticateJWT as any, historyController.deleteHistory as any); // Remove from watch history

export default historyRouter;
