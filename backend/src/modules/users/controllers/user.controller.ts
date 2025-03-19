import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
    // ✅ Get user by email
    async getUserByEmail(req: Request, res: Response) {
        try {
            const email = req.params.email;
            if (!email) return res.status(400).json({ message: "Email is required" });

            const user = await userService.getUserByEmail(email);
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
