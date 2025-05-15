import ratingRepository from "../repositories/rating.repository";

class RatingService {
    rateVideo(userId: string, videoId: string, rating: number) {
        return ratingRepository.rateVideo(userId, videoId, rating);
    }

    getUserRating(userId: string, videoId: string) {
        return ratingRepository.getUserRating(userId, videoId);
    }
}

export default new RatingService();
