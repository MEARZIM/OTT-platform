import { Request, Response } from "express";
import userService from "../services/user.service";
import { User } from "@prisma/client";

class UserController {
    // ✅ Get user by email
    async getUserInfo(req: Request, res: Response) {
        try {
            console.log("User info request", req.user);
            if (!req.user) return res.status(401).json({ message: "Unauthorized" });
            const user = req.user as User;

            if (!user) return res.status(404).json({ message: "User not found" });

            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // ✅ Get user by Id
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ message: "User not found" });
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

}

export default new UserController();
