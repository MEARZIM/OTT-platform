import path from "path";
import multer from "multer";
import { Router } from "express";

import AdController from "../controllers/ads.controller";
import { verifySuperAdmin } from "../../../middleware/superAdmin.middleware";

const adRouter = Router();

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

// Create a new ad
adRouter.post("/", 
    upload.single("file"), 
    verifySuperAdmin as any, 
    AdController.uploadVideoController as any
); // Super Admin can only upload Adds


// Get all ads
adRouter.get("/", AdController.getAllAdsController as any); // TODO:Super Admin and admin can only get Adds
// Get ad by id
adRouter.get("/:id", AdController.getAdByIdController as any); // TODO:Super Admin and admin can only get Adds by id
// update ad by id
adRouter.patch("/:id", AdController.updateAdController as any); // TODO:Super Admin can only update Adds by id

export default adRouter;