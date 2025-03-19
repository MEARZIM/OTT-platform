import { PrismaClient } from "@prisma/client";
import { CreateUserDTO } from "../dtos/user.dto";

const prisma = new PrismaClient();

class UserRepository {

    async findByEmail(email: string) {
        if (!email) throw new Error("Email is required");
        return await prisma.user.findUnique({
            where: { email }
        });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id }
        });
    }
    
}

export default new UserRepository();