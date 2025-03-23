import video from "../../../libs/mux";
import s3 from "../../../libs/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import adminRepository from "../repositories/admin.repository";
import { CreateAdminDTO } from "../types/admin";


class AdminServices {
    private static async uploadToS3(file: Buffer, fileName: string, mimetype: string) : Promise<string> {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: file,
        });

        await s3.send(command);

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }

    async uploadVideo(file: Buffer, fileName: string, mimetype: string){
        const s3Url = await AdminServices.uploadToS3(file, fileName, mimetype) as string;

        const asset = await video.assets.create({
            input: [{ url: s3Url }],
            playback_policy: ["public"],
            test: false,
            video_quality: "plus"
        })
        console.log(asset);
        // TODO: Save the asset.id to the database
    }

    async getAdminById(id: string) {
        return await adminRepository.findById(id);
    }

    async createAdmin(data: CreateAdminDTO) {
        return await adminRepository.create(data);
    }

}

export default new AdminServices();


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