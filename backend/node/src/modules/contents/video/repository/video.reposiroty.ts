import { VideoData } from "../dto/video";
import { prisma } from "../../../../libs/prisma";
import { AddVideoCategoryDTO } from "../dto/videoCategory";

class VideoRepository {

    async addVideoToDatabase(data: VideoData) {
        return prisma.video.create({
            data
        });
    }

    async getVideoById(id: string) {
        return prisma.video.findUnique({
            where: {
                id
            }
        });
    }

}

export default new VideoRepository;