import { Router } from "express";
import videoCategoryController from "../controller/videoCategory.controller";

const videoCategoryRouter = Router();

// Only accessible for Admins
videoCategoryRouter.post('/create', videoCategoryController.addVideoCategory);
videoCategoryRouter.delete('/delete/video/:videoId', videoCategoryController.deleteVideoCategoryByVideoId);
videoCategoryRouter.delete('/delete/category/:categoryId', videoCategoryController.deleteVideoCategoryByCategoryId);
videoCategoryRouter.delete('/delete/video/:videoId/category/:categoryId', videoCategoryController.deleteVideoCategory)


export default videoCategoryRouter;