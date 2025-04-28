import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/email/:email", userController.getUserByEmail as any);
router.get("/id/:id", userController.getUserById as any);

export default router;
