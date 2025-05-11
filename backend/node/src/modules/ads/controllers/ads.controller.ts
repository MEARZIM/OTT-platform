import { AdType } from "@prisma/client";
import { Request, Response } from "express";

import addsService from "../service/ads.service";
import { generateTimestampedFilename } from "../../../utils/generateFilename";


class AdController {
    async uploadVideoController(req: Request, res: Response) {
        try {

            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            if (!req.body) {
                return res.status(400).json({ message: "No file uploaded because of Empty title and description" });
            }

            const { title, description, offsetSeconds, type }: {
                title: string,
                description: string;
                offsetSeconds: number;
                type: AdType;
            } = req.body;
            
            const fileName = generateTimestampedFilename(req.file.originalname as string);
            const mimeType = req.file.mimetype;

            if(!req.user){
                return res.status(401).json({ message: "Unauthorized" });
            }


            const Ad = await addsService.AddAd(
                title, 
                description, 
                offsetSeconds, 
                type, 
                req.file.buffer, 
                fileName, 
                mimeType,
            );

            return res.status(200).json({ message: "Ad uploaded successfully", Ad });
            
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getAllAdsController(req: Request, res: Response) {
        try {
            const ads = await addsService.getAllAds();
            return res.status(200).json({ ads });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getAdByIdController(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ad = await addsService.getAdById(id);
            if (!ad) {
                return res.status(404).json({ message: "Ad not found" });
            }
            return res.status(200).json({ ad });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async updateAdController(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const ad = await addsService.updateAd(id, data);
            if (!ad) {
                return res.status(404).json({ message: "Ad not found" });
            }
            return res.status(200).json({ message: "Ad updated successfully", ad });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default new AdController();