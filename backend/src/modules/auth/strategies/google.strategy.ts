import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AuthService from "../service/auth.service";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await AuthService.findOrCreateUser(profile, accessToken, refreshToken);
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (email: string, done) => {
    try {
        const user = await AuthService.findByEmail(email);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
