import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import AdminController from "../controllers/admin.controller";
import path from "path";

const router = Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos/");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), AdminController.uploadVideoController as any);

export default router;
