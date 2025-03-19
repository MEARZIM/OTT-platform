import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const appAuth = express();

appAuth.use(
    cors({
        origin: ["http://localhost:5174", "http://localhost:5173"],
        credentials: true,
    })
);

appAuth.use(express.json());
appAuth.use(cookieParser());
appAuth.use(session({ secret: process.env.SESSION_SECRET as string, resave: false, saveUninitialized: true }));
appAuth.use(passport.initialize());
appAuth.use(passport.session());

appAuth.use("/api/auth", authRoutes);

export default appAuth;
