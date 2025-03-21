import path from "path";
import video from "../../../libs/mux";


class AdminServices {
    async uploadVideoService(file: Express.Multer.File) {

        const filePath = path.join(__dirname,"../../../../", file.path);
       

        return filePath;
    }
}

export default new AdminServices();
