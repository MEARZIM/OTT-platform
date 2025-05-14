import { User } from "@prisma/client";
import { Request, Response } from "express";

import likedService from "../services/liked.service";

class LikedController {
    async getLikedContents(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const videos = await likedService.getLikedContents(user.id);
        res.status(200).json({ success: true, data: videos });
    }

    async likeContent(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ success: false, message: "Video ID is required" });
        }

        const liked = await likedService.isContentLiked(user.id, videoId);
        if (liked) {
            return res.status(400).json({ success: false, message: "Content already liked" });
        }

        const likedContent = await likedService.likeContent(user.id, videoId);
        res.status(200).json({ success: true, data: likedContent });
    }

    async unlikeContent(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ success: false, message: "Video ID is required" });
        }

        const liked = await likedService.isContentLiked(user.id, videoId);
        if (!liked) {
            return res.status(400).json({ success: false, message: "Content already not liked" });
        }

        const likedContent = await likedService.unlikeContent(user.id, videoId);
        res.status(200).json({ success: true, data: likedContent });
    }

    async isVideoLiked(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { videoId } = req.params;

        if (videoId) {
            return res.status(404).json({ success: false, message: "No Video found" });
        }

        const videos = await likedService.isContentLiked(user.id, videoId);
        res.status(200).json({ success: true, data: videos });
    }
}

export default new LikedController();