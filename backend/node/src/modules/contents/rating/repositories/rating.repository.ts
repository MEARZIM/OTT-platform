import { prisma } from "../../../../libs/prisma";

class RatingRepository {
    async rateVideo(userId: string, videoId: string, rating: number) {
        const rated = await prisma.videoRating.upsert({
            where: { userId_videoId: { userId, videoId } },
            update: { rating },
            create: { userId, videoId, rating },
        });

        await this.updateAverageRating(videoId);
        return rated;
    }

    async getUserRating(userId: string, videoId: string) {
        return prisma.videoRating.findUnique({
            where: { userId_videoId: { userId, videoId } },
        });
    }

    async updateAverageRating(videoId: string) {
        const ratings = await prisma.videoRating.findMany({
            where: { videoId },
            select: { rating: true }
        });

        const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;

        return prisma.video.update({
            where: { id: videoId },
            data: { rating: avg },
        });
    }
}

export default new RatingRepository();
