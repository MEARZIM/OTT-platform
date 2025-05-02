import { Router } from "express";

import AdminController from "../controllers/admin.controller";
import AdminAuthController from "../auth/controller/adminAuth.controller";


const router = Router();

router.get("/", AdminController.getAllAdmins as any);
router.get("/:id", AdminController.getAdminById as any);
router.post("/create", AdminController.createAdmin as any); // SUPER_ADMINS only create Admin
router.patch("/update/:id", AdminController.updateAdmin as any); // SUPER_ADMINS only create Admin
router.post("/auth/login", AdminAuthController.credentialsAdminLogin as any); // Super Admin login TODO: ADD admin login in same route

export default router;
