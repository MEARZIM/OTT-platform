import { User } from "@prisma/client";
import { Request, Response } from "express";

import ratingService from "../services/rating.service";


class RatingController {
    async rateVideo(req: Request, res: Response) {
        const user = req.user as User;
        const { videoId } = req.params;
        const { rating } = req.body;

        if (!user || !videoId || rating == null) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const rated = await ratingService.rateVideo(user.id, videoId, rating);
        return res.status(200).json({ success: true, data: rated });
    }

    async getRating(req: Request, res: Response) {
        const user = req.user as User;
        const { videoId } = req.params;

        if (!user || !videoId) {
            return res.status(400).json({ success: false, message: "Missing data" });
        }

        const rating = await ratingService.getUserRating(user.id, videoId);
        return res.status(200).json({ success: true, data: rating });
    }
}

export default new RatingController();
