import { VideoData } from "../dto/video.d";
import { prisma } from "../../../../libs/prisma";

class VideoRepository {

    // for admins
    async addVideoToDatabase(data: VideoData) {
        return prisma.video.create({
            data: {
                title: data.title,
                description: data.description,
                thumbnail: data.thumbnail,
                uploadedById: data.uploadedById,
                muxAssetId: data.muxAssetId,
                playbackId: data.playbackId,
                status: data.status,
                adId: data.adId,
                categories: {
                    create: data.categoryIds.map((categoryId: string) => ({
                        category: {
                            connect: {
                                id: categoryId
                            },
                        },
                    })),
                },
            },
        });
    }

    async updateVideo(videoId: string, data: Partial<VideoData>) {
        return prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                thumbnail: data.thumbnail,
                uploadedById: data.uploadedById,
                muxAssetId: data.muxAssetId,
                playbackId: data.playbackId,
                adId: data.adId,
                categories: {
                    connectOrCreate: data.categoryIds?.map((categoryId) => ({
                        where: {
                            videoId_categoryId: {
                                videoId: videoId,
                                categoryId: categoryId
                            }
                        },
                        create: {
                            category: {
                                connect: {
                                    id: categoryId
                                }
                            }
                        }
                    }))
                }
            },
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