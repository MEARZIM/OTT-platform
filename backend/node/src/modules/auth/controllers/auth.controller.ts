import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import AuthService from "../service/auth.service";
import UserData from "../types/user-auth";

dotenv.config();

class AuthController {
    async googleCallback(req: Request, res: Response) {
        const user = req.user as UserData;
        const token = AuthService.generateToken(user);
        res.cookie("token", token, { httpOnly: true });

        res.redirect(`${process.env.FRONTEND_URL}/dashboard`); // Redirect to the dashboard
    }

    async logout(req: Request, res: Response) {
        req.logout((err: any) => {
            if (err) {
                return res.status(500).json({ status: 500, message: 'Logout failed', error: err });
            }
            res.clearCookie("token");
            return res.redirect(`${process.env.FRONTEND_URL}/`);
        });
    }

    async getToken(req: Request, res: Response) {
        const token = req.cookies.token;
        // console.log(token)
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        try {
            return res.json(token); // Send the user data
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

export default new AuthController();