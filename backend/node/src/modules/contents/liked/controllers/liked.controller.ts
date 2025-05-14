import { User } from "@prisma/client";
import { Request, Response } from "express";

import likedService from "../services/liked.service";

class LikedController {
    async getLikedContents(req: Request, res: Response) {
        const user = req.user as User;
        console.log(user)
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const videos = await likedService.getLikedContents(user.id);
        return res.status(200).json({ success: true, data: videos });
    }

    async likeContent(req: Request, res: Response) {
        const user = req.user as User;
        console.log("user->",user)
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
        return res.status(200).json({ success: true, data: likedContent });
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
        return res.status(200).json({ success: true, data: likedContent });
    }

    async isVideoLiked(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const { videoId } = req.params;

        if (!videoId) {
            return res.status(404).json({ success: false, message: "No Video found" });
        }

        const video = await likedService.isContentLiked(user.id, videoId);
        if (!video) {
            return res.status(200).json({ success: false, data: video });
        }
        return res.status(200).json({ success: true, data: video });
    }
}

export default new LikedController();