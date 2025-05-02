import { Request, Response } from "express";

import adminService from "../services/admin.service";


class AdminController {

    async getAllAdmins(req: Request, res: Response) {
        try {
            const admins = await adminService.getAllAdmins();
            return res.json(admins);
        } catch (error: any) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


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

    async updateAdmin(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const existingAdmin = await adminService.getAdminById(id);

            if (!existingAdmin) {
                return res.status(401).json({ message: "Admin not found." });
            }

            if (req.body.email) {
                const existingEmail = await adminService.getAdminByEmail(req.body.email);

                if (existingEmail && existingEmail.id !== id) {
                    return res.status(401).json({ message: "Email already in use." });
                }
            }
            const updatedAdmin = await adminService.updateAdmin(id, req.body);
            return res.status(200).json({ message: "Admin updated successfully" });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }


}

export default new AdminController();
