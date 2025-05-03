import path from "path";
import multer from "multer";
import { Router } from "express";

import AdController from "../controllers/ads.controller";
import { verifyAdmin } from "../../../middleware/admin.middleware";

const adRouter = Router();

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

adRouter.post("/create", verifyAdmin as any, upload.single("file"), AdController.uploadVideoController as any); // Super Admin can only upload Adds
adRouter.get("/", AdController.getAllAdsController as any); // TODO:Super Admin and admin can only get Adds
adRouter.get("/:id", AdController.getAdByIdController as any); // TODO:Super Admin and admin can only get Adds by id
adRouter.patch("/:id", AdController.updateAdController as any); // TODO:Super Admin can only update Adds by id

export default adRouter;