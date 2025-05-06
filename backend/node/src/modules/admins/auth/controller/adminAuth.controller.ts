import { Request, Response } from "express";
import adminAuthService from "../service/adminAuth.service";

class AdminAuthController {
    async credentialsAdminLogin(req: Request, res: Response) {
        try {
          
            const response = await adminAuthService.adminLogin(req.body);

            if (!response || !response.token) {
                console.warn("Login failed: Invalid credentials.");
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Set the token in an HTTP-only cookie
            res.cookie("token", response.token, {
                httpOnly: true,
                //secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            });

            console.log("Login successful, token set in cookie.");
            return res.status(200).json(response);

        } catch (error: any) {
            console.error("Login error:", error); 
            return res.status(500).json({ message: error.message || "Login failed" });
        }
    }
}

export default new AdminAuthController();
