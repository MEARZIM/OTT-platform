import { VideoData } from "../dto/video";
import { prisma } from "../../../../libs/prisma";

class VideoRepository {

    // for admins
    async addVideoToDatabase(data: VideoData) {
        return prisma.video.create({
            data
        });
    }

    async updateVideo(videoId: string, data: Partial<VideoData>) {
        return prisma.video.update({
            where: {
                id: videoId
            },
            data
        });
    }

    async deleteVideo(id: string) {

        return prisma.$transaction([
            // Delete related ratings
            prisma.videoRating.deleteMany({
                where: { videoId: id },
            }),

            // Delete related likes
            prisma.likedVideo.deleteMany({
                where: { videoId: id },
            }),

            // Delete related watch history entries
            prisma.watchHistory.deleteMany({
                where: { videoId: id },
            }),

            // Delete category associations
            prisma.videoCategory.deleteMany({
                where: { videoId: id },
            }),

            // Finally, delete the video
            prisma.video.delete({
                where: { id },
            }),
        ]);
    }

    async getVideosByUploadedById(uploadedById: string) {
        return prisma.video.findMany({
            where: {
                uploadedById
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                ad: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }





    // for users
    async getVideoById(id: string) {
        return prisma.video.findUnique({
            where: {
                id
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                ad: true
            }
        });
    }

    async getAllVideos() {
        return prisma.video.findMany({
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                ad: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async getVideoByCategoryId(categoryId: string) {
        return prisma.video.findMany({
            where: {
                categories: {
                    some: {
                        categoryId: categoryId
                    }
                }
            },
            include: {
                categories: {
                    include: {
                        category: true
                    }
                },
                ad: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async getMostLikedVideos(limit: number = 5) {
        const mostLiked = await prisma.likedVideo.groupBy({
            by: ['videoId'],
            _count: { videoId: true },
            orderBy: {
                _count: {
                    videoId: 'desc',
                },
            },
            take: limit,
        });

        const videoIds = mostLiked.map((item) => item.videoId);

        return prisma.video.findMany({
            where: {
                id: {
                    in: videoIds,
                },
            },
            include: {
                uploadedBy: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                ad: true,
            },
        });
    }

    async getTopRatedVideos(limit: number = 10) {
        return prisma.video.findMany({
            orderBy: {
                rating: 'desc',
            },
            take: limit,
            // where: {
            //     status: 'PUBLISHED', 
            // },
            include: {
                categories: {
                    include: {
                        category: true,
                    },
                },
                ad: true,
            },
        });
    }

}

export default new VideoRepository;