import path from "path";
import multer from "multer";
import { Router } from "express";

import videoController from "../controller/video.controller";
import { verifyAdmin } from "../../../../middleware/admin.middleware";

const videoRouter = Router();

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

videoRouter.post("/", verifyAdmin as any, upload.single("file"), videoController.uploadVideoController as any); // Admin can only upload videos
videoRouter.post("/:id", verifyAdmin as any, upload.single("file"), videoController.uploadVideoController as any); // Admin can only upload videos

export default videoRouter;