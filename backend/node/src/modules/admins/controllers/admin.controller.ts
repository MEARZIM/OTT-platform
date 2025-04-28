import { Request, Response } from "express";

import adminService from "../services/admin.service";


class AdminController {
    

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
