import { Request, Response } from "express";
import AdminServices from "../services/admin.service";


class AdminController {
    async uploadVideoController(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const fileName = `${Date.now()}-${req.file.originalname}`;
            const mimeType = req.file.mimetype;

            const videoUrl = await AdminServices.uploadToS3(req.file.buffer,fileName, mimeType);

            res.status(200).json({ message: "Video uploaded successfully", videoUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

}

export default new AdminController();
