import bcrypt from "bcrypt";

import { prisma } from "../../../libs/prisma";
import { CreateAdminDTO } from "../types/admin";
import { Video } from "@prisma/client";

class AdminRepository {
    async findById(id: string) {
        return await prisma.admin.findUnique({
            where: { id }
        })
    }

    async findByEmail(email: string) {
        return await prisma.admin.findUnique({
            where: { email }
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

    async saveVideo(data: Video) {
        return await prisma.video.create({
            data
        });
    }   
}

export default new AdminRepository();
