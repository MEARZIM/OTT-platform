import { Request, Response } from "express";
import { User } from "@prisma/client";

import videoService from "../services/video.service";

class VideoController {
    async uploadVideoController(req: Request, res: Response) {
        try {

            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            if (!req.body) {
                return res.status(400).json({ message: "No file uploaded because of Empty title and description" });
            }

            const { title, description }: {
                title: string,
                description: string;
            } = req.body;

            const fileName = req.file.filename;
            const mimeType = req.file.mimetype;

            if(!req.user){
                return res.status(401).json({ message: "Unauthorized" });
            }

            const video = await videoService.addVideoToDataBase(req.user as User,title, description, req.file.buffer, fileName, mimeType);

            return res.status(200).json({ message: "Video uploaded successfully", video });
            // res.status(200).json({ message: "Video uploaded successfully", user: req.user });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default new VideoController();