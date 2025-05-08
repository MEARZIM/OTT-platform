import bcrypt from "bcrypt";

import { prisma } from "../../../libs/prisma";
import { CreateAdminDTO } from "../types/admin";
import { AdminRole, Video } from "@prisma/client";

class AdminRepository {
    async findById(id: string) {
        return await prisma.admin.findUnique({
            where: {
                id,
            },
            include: {
                uploadedVideos: true
            }
        })
    }

    async getAllAdmins() {
        return await prisma.admin.findMany({
            where: {
                role: AdminRole.ADMIN
            },
            include: {
                uploadedVideos: true,
            }
        })
    }

    async findByEmail(email: string) {
        return await prisma.admin.findUnique({
            where: {
                email,
            }
        })
    }

    async updateAdmin(id: string, data: Partial<CreateAdminDTO>) {
        
        return await prisma.admin.update({
            where: { id },
            data: {
                ...data,
                password: data.password ? await bcrypt.hash(data.password, 10) : undefined,
            },
        });
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
