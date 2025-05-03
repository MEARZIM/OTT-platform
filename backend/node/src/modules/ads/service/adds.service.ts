import { AdType } from '@prisma/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

import s3 from '../../../libs/s3';
import video from '../../../libs/mux';
import addsRepository from '../repositories/adds.repository';
import { CreateAdDto } from '../dto/ad';

class AdService {

    private static async uploadToS3(file: Buffer, fileName: string, mimetype: string): Promise<string> {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `ads/${fileName}`,
            Body: file,
        });

        await s3.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/ads/${fileName}`;

        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    private static async uploadVideo(file: Buffer, fileName: string, mimetype: string) {
        const s3Url = await AdService.uploadToS3(file, fileName, mimetype) as string;

        const asset = await video.assets.create({
            input: [{ url: s3Url }],
            playback_policy: ["public"],
            test: false,
            video_quality: "plus"
        })
        // console.log(asset);
        return asset;
    }
    async AddAd(
        title: string,
        description: string,
        offsetSeconds: number,
        type: AdType,
        file: Buffer,
        fileName: string,
        mimetype: string,
    ) {
        // const s3Url = await AdService.uploadToS3(file, fileName, mimetype);
        const asset = await AdService.uploadVideo(file, fileName, mimetype);

        const data = {
            title,
            description,
            muxAssetId: asset.id,
            playbackId: asset?.playback_ids?.[0]?.id ?? "",
            offsetSeconds: Number(offsetSeconds) ?? 60,
            type: type,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return addsRepository.createAd(data);
    }

    async getAllAds() {
        return addsRepository.getAllAds();
    }

    async getAdById(id: string) {
        return addsRepository.getAdById(id);
    }

    async updateAd(id: string, data: Partial<CreateAdDto>) {
        return addsRepository.updateAd(id, data);
    }

    async deleteAd(id: string) {
        return addsRepository.deleteAd(id);
    }
}

export default new AdService();