import { Request, Response } from "express";

import videoCategoryService from "../services/videoCategory.service";
import { AddVideoCategoryDTO } from "../dto/videoCategory";

class VideoCategoryController {
    async addVideoCategory(req: Request, res: Response) {
        try {
            const newMapping = await videoCategoryService.addVideoCategory(req.body as AddVideoCategoryDTO);
            res.status(201).json({ message: "Category assigned to video successfully", newMapping });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteVideoCategory(req: Request, res: Response) {
        try {
            const { videoId, categoryId } = req.params;
            await videoCategoryService.deleteVideoCategory(videoId, categoryId);
            res.status(200).json({ message: "Video category deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new VideoCategoryController();
