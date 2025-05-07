import { CreateAdDto } from "../dto/ad";
import { prisma } from "../../../libs/prisma";

class AdRepository {
    async createAd(data: CreateAdDto) {
        return prisma.ad.create({
            data
        });
    }
    
    async getAllAds() {
        return prisma.ad.findMany({
            include:{
                video: true
            }
        });
    }

    async getAdById(id: string) {
        return prisma.ad.findUnique({
            where: { id },
            include:{
                video: true
            }
        });
    }

    async updateAd(id: string, data: Partial<CreateAdDto>) {
        return prisma.ad.update({
            where: { id },
            data
        });
    }

    async deleteAd(id: string) {
        return prisma.ad.delete({
            where: { id }
        });
    }
}

export default new AdRepository();