import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticateJWT } from "../../../middleware/user.auth.middleware";

const router = Router();

router.get("/", authenticateJWT as any, userController.getUserInfo as any);
router.get("/id/:id", userController.getUserById as any);

export default router;
