import userRepository from "../repositories/user.repository";

class UserService {

    // ✅ Get user by email
    async getUserByEmail(email: string) {
        return await userRepository.findByEmail(email);
    }

    // ✅ Get user by ID
    async getUserById(id: string) {
        return await userRepository.findById(id);
    }

}

export default new UserService();
