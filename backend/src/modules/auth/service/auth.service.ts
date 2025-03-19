import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Profile } from "passport";

import AuthRepository from "../repositories/auth.repository";


dotenv.config();

class AuthService {
    async findOrCreateUser(userData: Profile, accessToken: string, refreshToken?: string) {
        // console.log(userData?.emails?.[0]?.value);
        let user = await AuthRepository.findByEmail(userData?.emails?.[0].value || '');
        console.log(user);

        if (!user) {
            user = await AuthRepository.createUser(userData, "google", userData.id, accessToken, refreshToken);
        } else {
            await AuthRepository.upsertUser(userData, "google", userData.id, accessToken, refreshToken);
        }

        return user;
    };

    generateToken(user: Profile) {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "7d",
        });
    };

    async findByEmail(email: string) {
        return AuthRepository.findByEmail(email);
    }
}

export default new AuthService();