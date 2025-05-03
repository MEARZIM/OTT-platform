import { AddVideoCategoryDTO } from "../dto/videoCategory";
import { prisma } from "../../../../libs/prisma";

class VideoCategoryRepository {
    async addVideoCategory(data: AddVideoCategoryDTO) {
        return prisma.videoCategory.create({
            data: {
                videoId: data.videoId,
                categoryId: data.categoryId,
            },
        });
    }

    async checkCategoryExists(categoryId: string) {
        return prisma.category.findUnique({
            where: { id: categoryId },
        });
    }

    async checkVideoExists(videoId: string) {
        return prisma.video.findUnique({
            where: { id: videoId },
        });
    }

    async checkDuplicateMapping(videoId: string, categoryId: string) {
        return prisma.videoCategory.findUnique({
            where: { videoId_categoryId: { videoId, categoryId } },
        });
    }

    async deleteVideoCategory(videoId: string, categoryId: string) {
        return await prisma.videoCategory.deleteMany({
            where: {
                videoId,
                categoryId
            }
        });
    }

    async deleteVideoCategoryByCategoryId(categoryId: string) {
        return await prisma.videoCategory.deleteMany({
            where: {
                categoryId
            }
        });
    }

    async deleteVideoCategoryByVideoId(videoId: string) {
        return await prisma.videoCategory.deleteMany({
            where: {
                videoId
            }
        });
    }
}

export default new VideoCategoryRepository;