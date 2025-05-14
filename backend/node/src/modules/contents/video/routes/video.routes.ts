import multer from "multer";
import { Router } from "express";

import videoController from "../controller/video.controller";
import { verifyAdmin } from "../../../../middleware/admin.middleware";


const videoRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const isVideo = file.mimetype.startsWith("video/");
        const isImage = file.mimetype.startsWith("image/");
        if (isVideo || isImage) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only video or image allowed"));
        }
    },
});

// ADMIN ROUTES(PROTECTED ROUTES)
videoRouter.post(
    "/",
    verifyAdmin as any,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    videoController.uploadVideoController as any
); 

videoRouter.patch(
    "/:videoId",
    verifyAdmin as any,
    upload.fields([
        // { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 },
    ]),
    videoController.updateVideoController as any
) 

videoRouter.delete(
    "/:videoId",
    verifyAdmin as any,
    videoController.deleteVideoController as any
);

videoRouter.get(
    "/uploaded-by",
    verifyAdmin as any,
    videoController.getVideosByUploadedByIdController as any
);



// PUBLIC ROUTES
videoRouter.get(
    "/",
    videoController.getAllVideosController as any
);

videoRouter.get(
    "/search",
    videoController.getSearchedVideosController as any
);

videoRouter.get(
    "/:id",
    videoController.getVideoByIdController as any
);

videoRouter.get(
    "/category/:categoryId",
    videoController.getVideoByCategoryIdController as any
)

videoRouter.get(
    "/most-liked",
    videoController.getMostLikedVideosController as any
);

videoRouter.get(
    "/top-rated",
    videoController.getTopRatedVideosController as any
);

export default videoRouter;