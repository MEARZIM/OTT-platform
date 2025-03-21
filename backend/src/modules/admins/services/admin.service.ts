import path from "path";
import video from "../../../libs/mux";
import s3 from "../../../libs/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";


class AdminServices {
    async uploadVideoService(file: Express.Multer.File) {

        const filePath = path.join(__dirname,"../../../../", file.path);
       
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: "ayan.txt",
            Body: "Awsome",
        });

        await s3.send(command);

        return filePath;
    }
}

export default new AdminServices();
