import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import AdminController from "../controllers/admin.controller";
import path from "path";

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

router.post("/upload", upload.single("file"), AdminController.uploadVideoController as any);

export default router;
