import { Request, Response } from "express";

import adminAuthService from "../../admins/auth/service/adminAuth.service";

class AdminAuthController {
    async credentialsAdminLogin(req: Request, res: Response) {
        try {
            const response  = await adminAuthService.adminLogin(req.body);

            // TODO: Add cookie to response and redirect to admin/superadmin dashboard;
            return res.status(200).json(response);
           
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}

export default new AdminAuthController();