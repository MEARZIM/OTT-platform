import { User } from "@prisma/client";
import { Request, Response } from "express";

import watchlistService from "../services/watchlist.service";

class WatchlistController {
    async getWatchlist(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const videos = await watchlistService.getWatchlist(user.id);
        return res.status(200).json({ success: true, data: videos });
    }

    async addToWatchlist(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ success: false, message: "Video ID is required" });
        }

        const exists = await watchlistService.isInWatchlist(user.id, videoId);
        if (exists) {
            return res.status(400).json({ success: false, message: "Video already in watchlist" });
        }

        const added = await watchlistService.addToWatchlist(user.id, videoId);
        return res.status(200).json({ success: true, data: added });
    }

    async removeFromWatchlist(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({ success: false, message: "Video ID is required" });
        }

        const exists = await watchlistService.isInWatchlist(user.id, videoId);
        if (!exists) {
            return res.status(400).json({ success: false, message: "Video is not in watchlist" });
        }

        const removed = await watchlistService.removeFromWatchlist(user.id, videoId);
        return res.status(200).json({ success: true, data: removed });
    }

    async isInWatchlist(req: Request, res: Response) {
        const user = req.user as User;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { videoId } = req.params;
        if (!videoId) {
            return res.status(404).json({ success: false, message: "No Video found" });
        }

        const exists = await watchlistService.isInWatchlist(user.id, videoId);
        return res.status(200).json({ success: exists, data: exists });
    }
}

export default new WatchlistController();
