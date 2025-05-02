import video from "../../../libs/mux";
import s3 from "../../../libs/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import adminRepository from "../repositories/admin.repository";
import { CreateAdminDTO } from "../types/admin";


class AdminServices {
    async getAllAdmins() {
        return await adminRepository.getAllAdmins();
    }
    
    async getAdminById(id: string) {
        return await adminRepository.findById(id);
    }

    async createAdmin(data: CreateAdminDTO) {
        return await adminRepository.create(data);
    }

}

export default new AdminServices();


