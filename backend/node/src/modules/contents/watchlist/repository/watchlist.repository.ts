import { prisma } from "../../../../libs/prisma";

class WatchlistRepository {
    async addToWatchlist(userId: string, videoId: string) {
        return prisma.watchlist.upsert({
            where: { userId_videoId: { userId, videoId } },
            update: {},
            create: { userId, videoId },
        });
    }

    async removeFromWatchlist(userId: string, videoId: string) {
        return prisma.watchlist.delete({
            where: { userId_videoId: { userId, videoId } },
        });
    }

    async isInWatchlist(userId: string, videoId: string) {
        return prisma.watchlist.findUnique({
            where: { userId_videoId: { userId, videoId } },
        });
    }

    async getWatchlist(userId: string) {
        return prisma.watchlist.findMany({
            where: { userId },
            include: { video: true },
        });
    }
}

export default new WatchlistRepository();
