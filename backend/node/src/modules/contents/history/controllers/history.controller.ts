import { User } from "@prisma/client";
import { Request, Response } from "express";

import historyService from "../services/history.service";

class HistoryController {
    async getHistory(req: Request, res: Response) {
        const user = req.user as User;
        const history = await historyService.getHistory(user.id);
        return res.status(200).json(history);
    }

    async addedToHistory(req: Request, res: Response) {
        const user = req.user as User;
        const { videoId } = req.params;
        const history = await historyService.addedToHistory(user.id, videoId);
        return res.status(200).json(history);
    }

    async deleteHistory(req: Request, res: Response) {
        const user = req.user as User;
        const { videoId } = req.params;
        const history = await historyService.deleteHistory(user.id, videoId);
        return res.status(200).json(history);
    }

    async clearHistory(req: Request, res: Response) {
        const user = req.user as User;
        const history = await historyService.clearHistory(user.id);
        return res.status(200).json(history);
    }
}

export default new HistoryController();