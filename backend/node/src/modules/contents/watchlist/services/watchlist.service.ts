import watchlistRepository from "../repository/watchlist.repository";

class WatchlistService {
    async getWatchlist(userId: string) {
        return await watchlistRepository.getWatchlist(userId);
    }

    async addToWatchlist(userId: string, videoId: string) {
        return await watchlistRepository.addToWatchlist(userId, videoId);
    }

    async removeFromWatchlist(userId: string, videoId: string) {
        return await watchlistRepository.removeFromWatchlist(userId, videoId);
    }

    async isInWatchlist(userId: string, videoId: string) {
        return await watchlistRepository.isInWatchlist(userId, videoId);
    }
}

export default new WatchlistService();
