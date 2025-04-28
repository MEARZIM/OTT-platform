import { VideoData } from "../dto/video";
import { prisma } from "../../../../libs/prisma";
import { AddVideoCategoryDTO } from "../dto/videoCategory";

class VideoRepository {

    async addVideoToDatabase(data: VideoData) {
        return prisma.video.create({
            data
        });
    }


}

export default new VideoRepository;