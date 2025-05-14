import { CreateUserDTO } from "../dtos/user.dto";

import { prisma } from "../../../libs/prisma";

class UserRepository {

    async findByEmail(email: string) {
        if (!email) throw new Error("Email is required");
        return await prisma.user.findUnique({
            where: { email },
            include: {
                likedVideos: true,
                watchHistory: true,
                Watchlist: true,
            }
        });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                likedVideos: true,
                watchHistory: true,
                Watchlist: true,
            }
        });
    }

}

export default new UserRepository();