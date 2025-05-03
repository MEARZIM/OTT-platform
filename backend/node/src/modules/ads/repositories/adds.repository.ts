import { CreateAdDto } from "../dto/ad";
import { prisma } from "../../../libs/prisma";

class AdRepository {
    async createAd(data: CreateAdDto) {
        return prisma.ad.create({
            data
        });
    }
    
}

export default new AdRepository();