import { Router } from "express";
import multer from "multer";

import AdminController from "../controllers/admin.controller";
import AdminAuthController from "../auth/controller/adminAuth.controller";


const router = Router();

// Store file in memory (RAM) instead of disk
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only mp4 is allowed"));
        }
    }
});

router.post("/upload", upload.single("file"), AdminController.uploadVideoController as any); // Admin can only upload videos
router.get("/:id", AdminController.getAdminById as any);
router.post("/create", AdminController.createAdmin as any); // SUPER_ADMINS only create Admin
router.post("/auth/login", AdminAuthController.credentialsAdminLogin as any); // Super Admin login TODO: ADD admin login in same route

export default router;
