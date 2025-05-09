import { Request, Response } from "express";
import { User } from "@prisma/client";

import videoService from "../services/video.service";

class VideoController {
    async uploadVideoController(req: Request, res: Response) {
        try {

            if (!req.files || !("video" in req.files) || !("thumbnail" in req.files)) {
                return res.status(400).json({ message: "Both video and thumbnail are required" });
            }

            if (!req.body) {
                return res.status(400).json({ message: "No file uploaded because of Empty title and description" });
            }

            const { title, description }: {
                title: string,
                description: string;
            } = req.body;

            const videoFile = (req.files as any)["video"][0];
            const thumbnailFile = (req.files as any)["thumbnail"][0];
        

            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const video = await videoService.addVideoToDataBase(
                req.user as User, 
                title, 
                description, 
                videoFile.buffer,
                videoFile.originalname,
                thumbnailFile.buffer,
                thumbnailFile.originalname,
            );

            return res.status(200).json({ message: "Video uploaded successfully", video });
            // res.status(200).json({ message: "Video uploaded successfully", user: req.user });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getVideoByIdController(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const video = await videoService.getVideoById(id);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            return res.status(200).json(video);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default new VideoController();