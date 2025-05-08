import likedRepository from "../repositories/liked.repository";

class LikedService {

    async getLikedContents(userId: string) {
        return await likedRepository.getLikedVideos(userId);
    }
    async likeContent(userId: string, videoId: string) {
        return await likedRepository.likeVideo(userId, videoId);
    }
    async unlikeContent(userId: string, videoId: string) {
        return await likedRepository.unlikeVideo(userId, videoId);
    }
    async isContentLiked(userId: string, videoId: string) {
        return await likedRepository.isVideoLiked(userId, videoId);
    }

}

export default new LikedService();