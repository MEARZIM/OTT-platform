import express from "express";
import passport from "../strategies/google.strategy";
import AuthController from "../controllers/auth.controller";

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), AuthController.googleCallback);
router.get("/logout", AuthController.logout);
router.get("/token", AuthController.getToken as any);

export default router;
