import bcrypt from "bcrypt";

import { prisma } from "../../../libs/prisma";
import { CreateAdminDTO } from "../types/admin";
import { AdminRole, Video } from "@prisma/client";

class AdminRepository {
    async findById(id: string) {
        return await prisma.admin.findUnique({
            where: {
                id,
                role: AdminRole.ADMIN
            }
        })
    }

    async getAllAdmins() {
        return await prisma.admin.findMany({
            where: {
                role: AdminRole.ADMIN
            }
        })
    }

    async findByEmail(email: string) {
        return await prisma.admin.findUnique({
            where: {
                email,
                role: AdminRole.ADMIN
            }
        })
    }

    async create(data: CreateAdminDTO) {
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: data.email },
        });

        if (existingAdmin) {
            throw new Error("Admin with this email already exists.");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);


        return await prisma.admin.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        })
    }
}

export default new AdminRepository();
