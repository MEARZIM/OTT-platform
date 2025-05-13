import { Router } from "express";

import AdminController from "../controllers/admin.controller";
import AdminAuthController from "../auth/controller/adminAuth.controller";
import { verifyAdmin } from "../../../middleware/admin.middleware";
import { verifySuperAdmin } from "../../../middleware/superAdmin.middleware";


const router = Router();

router.get("/", AdminController.getAllAdmins as any);
router.get("/current-admin", verifyAdmin as any, AdminController.getCurrentLogedInAdmin as any);
router.get("/logout", AdminController.logout as any);
router.get("/:id", AdminController.getAdminById as any);
router.post("/create", verifySuperAdmin as any, AdminController.createAdmin as any); 
router.patch("/update/:id", verifySuperAdmin as any, AdminController.updateAdmin as any); 
router.post("/auth/login", AdminAuthController.credentialsAdminLogin as any); // Super Admin login TODO: ADD admin login in same route

export default router;
