import { prisma } from '../../../../libs/prisma'

class HistoryRepository {
    async addedToHistory(userId: string, videoId: string): Promise<any> {
        return prisma.watchHistory.upsert({
            where: { userId_videoId: { userId, videoId } },
            update: { watchedAt: new Date() },
            create: { userId, videoId },
        });
    }

    async removeFromHistory(userId: string, videoId: string): Promise<any> {
        return prisma.watchHistory.deleteMany({
            where: { userId, videoId },
        });
    }

    async getHistory(userId: string): Promise<any> {
        return prisma.watchHistory.findMany({
            where: { userId },
            include: {
                video: true
            },
            orderBy: { watchedAt: 'desc' },
        });
    }

    async clearHistory(userId: string): Promise<any> {
        return prisma.watchHistory.deleteMany({
            where: { userId },
        });
    }

}

export default new HistoryRepository();