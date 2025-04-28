import { User } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import video from "../../../../libs/mux";
import s3 from "../../../../libs/s3";
import videoReposiroty from "../repository/video.reposiroty";

class VideoService {
    private static async uploadToS3(file: Buffer, fileName: string, mimetype: string): Promise<string> {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `videos/${fileName}`,
            Body: file,
        });

        await s3.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${fileName}`;

        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    private static async uploadVideo(file: Buffer, fileName: string, mimetype: string) {
        const s3Url = await VideoService.uploadToS3(file, fileName, mimetype) as string;

        const asset = await video.assets.create({
            input: [{ url: s3Url }],
            playback_policy: ["public"],
            test: false,
            video_quality: "plus"
        })
        // console.log(asset);
        return asset;
    }

    async addVideoToDataBase(user: User,title: string, description: string, file: Buffer, fileName: string, mimetype: string){
        const s3Url = await VideoService.uploadToS3(file, fileName, mimetype) as string;
        const asset = await VideoService.uploadVideo(file, fileName, mimetype);

        const data = {
            title,
            description,
            url: s3Url,
            rating: 0,
            uploadedById: user.id,
            muxAssetId: asset.id,
            playbackId: asset?.playback_ids?.[0]?.id ?? "",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return videoReposiroty.addVideoToDatabase(data)

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