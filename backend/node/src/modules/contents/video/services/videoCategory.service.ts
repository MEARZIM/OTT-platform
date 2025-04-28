import { AddVideoCategoryDTO } from "../dto/videoCategory";
import videoCategoryRepository from "../repository/videoCategory.repository";


class VideoCategoryService {
    async addVideoCategory(data: AddVideoCategoryDTO) {
        // Check if video exists
        const videoExists = await videoCategoryRepository.checkVideoExists(data.videoId);
        if (!videoExists) throw new Error("Video not found.");

        // Check if category exists
        const categoryExists = await videoCategoryRepository.checkCategoryExists(data.categoryId);
        if (!categoryExists) throw new Error("Category not found.");

        // Check for duplicate mapping
        const existingMapping = await videoCategoryRepository.checkDuplicateMapping(data.videoId, data.categoryId);
        if (existingMapping) throw new Error("This category is already assigned to this video.");

        return videoCategoryRepository.addVideoCategory(data);
    }

    async deleteVideoCategory(videoId: string, categoryId: string) {
        return await videoCategoryRepository.deleteVideoCategory(videoId, categoryId);
    }
}


export default new VideoCategoryService;
