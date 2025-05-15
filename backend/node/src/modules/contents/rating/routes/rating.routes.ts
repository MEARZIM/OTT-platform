import { Router } from "express";

import { authenticateJWT } from "../../../../middleware/user.auth.middleware";
import ratingController from "../controllers/rating.controller";

const videoRatingRouter = Router();

videoRatingRouter.post("/:videoId", authenticateJWT as any, ratingController.rateVideo as any);
videoRatingRouter.get("/:videoId", authenticateJWT as any, ratingController.getRating as any);

export default videoRatingRouter;
