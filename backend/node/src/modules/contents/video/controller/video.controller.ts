import { Request, Response } from "express";
import { Admin, AdminRole, User, VideoStatus } from "@prisma/client";

import videoService from "../services/video.service";

class VideoController {
    // for admins
    async uploadVideoController(req: Request, res: Response) {
        try {
            
            if (!req.files || !("video" in req.files) || !("thumbnail" in req.files)) {
                return res.status(400).json({ message: "Both video and thumbnail are required" });
            }

            if (!req.body) {
                return res.status(400).json({ message: "No file uploaded because of Empty title and description" });
            }

            const { 
                title, 
                description,
                status,
                adId,
                categoryIds
            }: {
                title: string,
                description: string;
                categoryIds: string;
                adId: string;
                status: VideoStatus
            } = req.body;

            const videoFile = (req.files as any)["video"][0];
            const thumbnailFile = (req.files as any)["thumbnail"][0];

            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const video = await videoService.addVideoToDataBase(
                req.user as User,
                title,
                description,
                videoFile.buffer,
                videoFile.originalname,
                thumbnailFile.buffer,
                thumbnailFile.originalname,
                JSON.parse(categoryIds),
                adId,
                status,
            );

            return res.status(200).json({ message: "Video uploaded successfully", video });
            // return res.status(200).json({ message: "Video uploaded successfully" });
            
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async updateVideoController(req: Request, res: Response) {
        try {
            const { videoId } = req.params; // video id
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const admin = req.user as Admin;

            if (!admin.role || admin.role !== AdminRole.ADMIN) {
                return res.status(403).json({ message: "Forbidden! You dont have access to this request." });
            }

            if (!videoId) {
                return res.status(400).json({ message: "Video id is required" });
            }

            const isVideoExist  = await videoService.getVideoById(videoId);
            if (!isVideoExist) {
                return res.status(404).json({ message: "Video not found" });
            }
            
            
            const {
                title,
                description,
                status,
                adId,
                categoryIds  
            }: {
                title: string,
                description: string;
                categoryIds: string;
                adId: string;
                status: VideoStatus
            } = req.body; 
           
            let video;
            if (req.files && ("thumbnail" in req.files)) {
                const thumbnailFile = (req.files as any)["thumbnail"][0];
                video = await videoService.updateVideo(
                    videoId,
                    title,
                    description,
                    JSON.parse(categoryIds),
                    adId,
                    status,
                    thumbnailFile.buffer,
                    thumbnailFile.originalname,
                );
            } else{
                video = await videoService.updateVideo(
                    videoId,
                    title,
                    description,
                    JSON.parse(categoryIds),
                    adId,
                    status,
                );
            }


            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            return res.status(200).json({ message: "Video updated successfully", video });
            // return res.status(200).json({ message: "Video updated successfully" });
            
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async deleteVideoController(req: Request, res: Response) {
        try {
            const { videoId } = req.params; // video id
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const admin = req.user as Admin;

            if (!admin.role || admin.role !== AdminRole.ADMIN) {
                return res.status(403).json({ message: "Forbidden! You dont have access to this request." });
            }

            if (!videoId) {
                return res.status(400).json({ message: "Video id is required" });
            }

            const isVideoExist  = await videoService.getVideoById(videoId);
            if (!isVideoExist) {
                return res.status(404).json({ message: "Video not found" });
            }

            await videoService.deleteVideo(videoId);
            return res.status(200).json({ message: "Video deleted successfully" });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getVideosByUploadedByIdController(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const admin = req.user as Admin;

            if (!admin.role || admin.role !== AdminRole.ADMIN) {
                return res.status(403).json({ message: "Forbidden! You dont have access to this request." });
            }


            const videos = await videoService.getVideosByUploadedById(admin.id);
            return res.status(200).json(videos);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };









    // for users
    async getVideoByIdController(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const video = await videoService.getVideoById(id);
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            return res.status(200).json(video);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getAllVideosController(req: Request, res: Response) {
        try {
            const videos = await videoService.getAllVideos();
            return res.status(200).json(videos);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getVideoByCategoryIdController(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const videos = await videoService.getVideoByCategoryId(categoryId);
            return res.status(200).json(videos);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getMostLikedVideosController(req: Request, res: Response) {
        try {
            const videos = await videoService.getMostLikedVideos();
            return res.status(200).json(videos);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };

    async getTopRatedVideosController(req: Request, res: Response) {
        try {
            const videos = await videoService.getTopRatedVideos();
            return res.status(200).json(videos);
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}

export default new VideoController();