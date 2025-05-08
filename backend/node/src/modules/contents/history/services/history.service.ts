import historyRepository from "../repositories/history.repository";

class HistoryService {
    
    async getHistory(userId: string) {
        return historyRepository.getHistory(userId);
    }
    
    async addedToHistory(userId: string, videoId: string) {
        return historyRepository.addedToHistory(userId, videoId);
    }
    
    async deleteHistory(userId: string, videoId: string) {
        return historyRepository.removeFromHistory(userId, videoId);
    }

    async clearHistory(userId: string) {
        return historyRepository.clearHistory(userId);
    }

}

export default new HistoryService();