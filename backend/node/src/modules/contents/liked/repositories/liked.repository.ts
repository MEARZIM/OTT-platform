import { prisma } from "../../../../libs/prisma";

class LikedRepository {

    async likeVideo(userId: string, videoId: string) {
        return prisma.likedVideo.upsert({
            where: { userId_videoId: { userId, videoId } },
            update: {},
            create: { userId, videoId },
        });
    };

    async unlikeVideo(userId: string, videoId: string) {
        return prisma.likedVideo.delete({
            where: { userId_videoId: { userId, videoId } },
        });
    };

    async isVideoLiked(userId: string, videoId: string) {
        return prisma.likedVideo.findUnique({
            where: { userId_videoId: { userId, videoId } },
        });
    };

    async getLikedVideos(userId: string) {
        return prisma.likedVideo.findMany({
            where: { userId },
            include: { video: true },
        });
    };
}

export default new LikedRepository();