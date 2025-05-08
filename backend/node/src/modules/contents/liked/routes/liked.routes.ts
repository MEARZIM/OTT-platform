import { Router } from "express";

import LikedController from "../controllers/liked.controller";
import { userAuthenticateJWT } from "../../../auth/middleware/auth.middleware";

const likedRouter = Router();

likedRouter.get("/", userAuthenticateJWT as any, LikedController.getLikedContents as any); // USER CAN GET LIKED CONTENTS
likedRouter.post("/:videoId", userAuthenticateJWT as any, LikedController.likeContent as any); // USER CAN LIKE CONTENT
likedRouter.delete("/:videoId", userAuthenticateJWT as any, LikedController.likeContent as any); // USER CAN UNLIKE CONTENT

export default likedRouter;
