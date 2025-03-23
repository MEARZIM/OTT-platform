import video from "../../../libs/mux";
import s3 from "../../../libs/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";


class AdminServices {
    async uploadToS3(file: Buffer, fileName: string, mimetype: string) {

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: file,
        });

        await s3.send(command);

        const s3url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        const asset = await video.assets.create({
            input: [{ url: s3url }],
            playback_policy: ["public"],
            test: false,
            video_quality: "plus"
        })
        console.log(asset);

        return "video url"
        // return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${fileName}`;
    }
}

export default new AdminServices();
