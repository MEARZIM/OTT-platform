import path from "path";
import multer from "multer";
import { Router } from "express";

import videoController from "../controller/video.controller";
import { verifyAdmin } from "../../../../middleware/admin.middleware";

const videoRouter = Router();

// Store file in memory (RAM) instead of disk
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); 
        const timestamp = new Date().toISOString()
            .replace(/:/g, "-") // Replace colons with hyphens
            .replace(/\..+/, "") // Remove milliseconds and 'Z'
            .replace("T", "_"); // Replace 'T' separator

        const newFileName = `${timestamp}${ext}`;

        cb(null, newFileName);
    }
});

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

videoRouter.post("/", verifyAdmin as any, upload.single("file"), videoController.uploadVideoController as any); // Admin can only upload videos

export default videoRouter;