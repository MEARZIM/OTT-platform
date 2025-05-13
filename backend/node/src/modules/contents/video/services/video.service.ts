import { User, VideoStatus } from "@prisma/client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// import video from "../../../../libs/mux";
import s3 from "../../../../libs/s3";
import videoReposiroty from "../repository/video.reposiroty";
import { generateTimestampedFilename } from "../../../../utils/generateFilename";
import { VideoData } from "../dto/video.d";

enum fileType {
    VIDEO = "videos",
    THUMBNAIL = "thumbnails",
}

class VideoService {
    private static async deleteFromS3(type: fileType, fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${type}/${fileName}`,
        });
    
        await s3.send(command);
    }

    private static async uploadToS3(type: fileType, file: Buffer, fileName: string): Promise<string> {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${type}/${fileName}`,
            Body: file,
        });

        await s3.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${type}/${fileName}`;

        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    // private static async uploadVideo(file: Buffer, fileName: string) {
    //     const s3Url = await VideoService.uploadToS3(fileType.VIDEO, file, fileName) as string;

    //     const asset = await video.assets.create({
    //         input: [{ url: s3Url }],
    //         playback_policy: ["public"],
    //         test: false,
    //         video_quality: "plus"
    //     })
        
    //     await VideoService.deleteFromS3(fileType.VIDEO, fileName);

    //     return asset;
    // }


    // for admins
    async addVideoToDataBase(
        user: User,
        title: string,
        description: string,
        videoBuffer: Buffer,
        videoFileName: string,
        thumbnailBuffer: Buffer,
        thumbnailFileName: string,
        categoryIds: string[],
        adId: string,
        status: VideoStatus,
    ) {
        const videoFileNameWithTimestamp = generateTimestampedFilename(videoFileName);
        const thumbnailFileNameWithTimestamp = generateTimestampedFilename(thumbnailFileName);

        const [videoUrl ,thumbnailUrl] = await Promise.all([
            // VideoService.uploadVideo(videoBuffer, videoFileNameWithTimestamp),
            VideoService.uploadToS3(fileType.VIDEO, videoBuffer, videoFileNameWithTimestamp),
            VideoService.uploadToS3(fileType.THUMBNAIL, thumbnailBuffer, thumbnailFileNameWithTimestamp),
        ]);

        const data = {
            title,
            description,
            rating: 0,
            url: videoUrl,
            thumbnail: thumbnailUrl || null, // Ensure thumbnail is nullable
            uploadedById: user.id,
            // muxAssetId: asset.id,
            // playbackId: asset?.playback_ids?.[0]?.id ?? "",
            adId: adId || null, // Ensure adId is nullable
            status,
            categoryIds,
            updatedAt: new Date(),
            createdAt: new Date(),
        }

        return videoReposiroty.addVideoToDatabase(data)

    }

    async updateVideo(
        videoId: string,
        title: string,
        description: string,
        categoryIds: string[],
        adId: string,
        status: VideoStatus,
        thumbnailBuffer?: Buffer,
        thumbnailFileName?: string,
    ) {

        let data: Partial<VideoData>;

        if (thumbnailBuffer && thumbnailFileName) {
            const thumbnailFileNameWithTimestamp = generateTimestampedFilename(thumbnailFileName);
            const thumbnailUrl = await VideoService.uploadToS3(fileType.THUMBNAIL, thumbnailBuffer, thumbnailFileNameWithTimestamp);
            data = {
                title,
                description,
                thumbnail: thumbnailUrl,
                status,
                categoryIds,
                adId,
                updatedAt: new Date(),
            }    
        } else {
            data = {
                title,
                description,
                status,
                categoryIds,
                adId,
                updatedAt: new Date(),
            }
        }



        return videoReposiroty.updateVideo(videoId, data);
    }

    async deleteVideo(id: string) {
        return videoReposiroty.deleteVideo(id);
    }

    async getVideosByUploadedById(uploadedById: string) {
        return videoReposiroty.getVideosByUploadedById(uploadedById);
    }



    // for users
    async getVideoById(id: string) {
        return videoReposiroty.getVideoById(id);
    }


    async getAllVideos() {
        return videoReposiroty.getAllVideos();
    }

    async getVideoByCategoryId(categoryId: string) {
        return videoReposiroty.getVideoByCategoryId(categoryId);
    }

    async getMostLikedVideos() {
        return videoReposiroty.getMostLikedVideos();
    }

    async getTopRatedVideos() {
        return videoReposiroty.getTopRatedVideos();
    }

}

export default new VideoService;


// Example of asset object returned by the Mux API:
// {
//     video_quality: 'plus',
//     test: true,
//     status: 'preparing',
//     progress: { state: 'ingesting' },
//     playback_ids: [
//       {
//         policy: 'public',
//         id: 'meAgXuNAE5zFnWyAT5tNtf0100HEgk00DxIC8U7w9k'
//       }
//     ],
//     mp4_support: 'none',
//     max_resolution_tier: '1080p',
//     master_access: 'none',
//     ingest_type: 'on_demand_url',
//     id: 'GQDdPGMEXb54pzKqGb01ugcYQiYWPXE5wfD3NH4',
//     encoding_tier: 'smart',
//     created_at: '1742736102'
//   }