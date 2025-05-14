import { Router } from "express";

import { authenticateJWT } from "../../../../middleware/user.auth.middleware";
import watchlistController from "../controller/watchlist.controller";

const watchlistRouter = Router();

watchlistRouter.get("/", authenticateJWT as any, watchlistController.getWatchlist as any); // USER CAN GET WATCHLIST
watchlistRouter.post("/:videoId", authenticateJWT as any, watchlistController.addToWatchlist as any); // ADD TO WATCHLIST
watchlistRouter.delete("/:videoId", authenticateJWT as any, watchlistController.removeFromWatchlist as any); // REMOVE FROM WATCHLIST
watchlistRouter.get("/:videoId", authenticateJWT as any, watchlistController.isInWatchlist as any); // CHECK IF IN WATCHLIST

export default watchlistRouter;
