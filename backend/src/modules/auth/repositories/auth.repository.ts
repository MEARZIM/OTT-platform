import { PrismaClient } from "@prisma/client";
import { Profile } from "passport";

const prisma = new PrismaClient();

class AuthRepository {

    async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }


    async createUser(userData: Profile, provider: string, providerAccountId: string, accessToken: string, refreshToken?: string) {

        return await prisma.user.create({
            data: {
                email: userData?.emails?.[0]?.value ?? '',
                name: userData.displayName,
                profileImage: userData.photos?.[0]?.value,
                accounts: {
                    create: {
                        provider,
                        providerAccountId,
                        type: "oauth",
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    },
                },
            },
            include: { accounts: true },
        });
    }

    async upsertUser(userData: Profile, provider: string, providerAccountId: string, accessToken: string, refreshToken?: string) {
        return prisma.account.upsert({
            where: { provider_providerAccountId: { provider: provider, providerAccountId: providerAccountId } },
            update: { access_token: accessToken, refresh_token: refreshToken },
            create: {
                userId: userData.id,
                provider: provider,
                providerAccountId: providerAccountId,
                type: "oauth",
                access_token: accessToken,
                refresh_token: refreshToken,
            },
        });
    }
}

export default new AuthRepository();