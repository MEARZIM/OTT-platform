import { Request, Response } from "express";

import AuthService from "../service/auth.service";

class AuthController {
    async googleCallback(req: Request, res: Response) {
        const user = req.body as any;
        const token = AuthService.generateToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("http://localhost:5174/dashboard"); // Redirect to the dashboard
    }

    async logout(req: Request, res: Response) {
        (req as any).logout();
        res.json({
            status: 200,
            logged: false,
            message: 'Successfuly logged out!'
        });
        res.clearCookie("token");
        res.redirect("/");
    }
}

export default new AuthController();