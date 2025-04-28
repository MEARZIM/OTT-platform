import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AdminValidator } from "../types/admin-auth";
import adminRepository from "../../repositories/admin.repository";

class AdminAuthService {
    async adminLogin(data: AdminValidator) {
        const admin = await adminRepository.findByEmail(data.email);
        if (!admin) throw new Error("Invalid email or password.");

        const isValidPassword = await bcrypt.compare(data.password, admin.password);
        if (!isValidPassword) throw new Error("Invalid email or password.");

        // Generate token
        const token = jwt.sign({
            id: admin.id, role: admin.role
        }, process.env.JWT_SECRET!,
            {
                expiresIn: "7d"
            });

        return { token, role: admin.role };
    }
}

export default new AdminAuthService();