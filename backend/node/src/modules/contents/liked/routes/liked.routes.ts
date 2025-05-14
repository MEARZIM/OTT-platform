import { Router } from "express";

import LikedController from "../controllers/liked.controller";
import { authenticateJWT } from "../../../../middleware/user.auth.middleware";

const likedRouter = Router();

likedRouter.get("/", authenticateJWT as any, LikedController.getLikedContents as any); // USER CAN GET LIKED CONTENTS
likedRouter.post("/:videoId", authenticateJWT as any, LikedController.likeContent as any); // USER CAN LIKE CONTENT
likedRouter.delete("/:videoId", authenticateJWT as any, LikedController.likeContent as any); // USER CAN UNLIKE CONTENT
likedRouter.get("/:videoId", authenticateJWT as any, LikedController.isVideoLiked as any); // CHECK LIKED OR UNLIKED CONTENT

export default likedRouter;
