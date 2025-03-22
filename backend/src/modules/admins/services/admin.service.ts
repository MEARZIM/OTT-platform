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

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/videos/${fileName}`;
    }
}

export default new AdminServices();
