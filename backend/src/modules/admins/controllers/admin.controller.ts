import { Request, Response } from "express";

import adminService from "../services/admin.service";


class AdminController {
    async uploadVideoController(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const fileName = `${Date.now()}-${req.file.originalname}`;
            const mimeType = req.file.mimetype;

            const videoUrl = await adminService.uploadVideo(req.file.buffer, fileName, mimeType);

            res.status(200).json({ message: "Video uploaded successfully", videoUrl });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    async getAdminById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const admin = await adminService.getAdminById(id);
            if (!admin) return res.status(404).json({ message: "User not found" });
            return res.json(admin);
        } catch (error: any) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async createAdmin(req: Request, res: Response) {
        try {
            const newAdmin = await adminService.createAdmin(req.body);
            return res.status(200).json({ message: "Admin created successfully", newAdmin });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

}

export default new AdminController();
