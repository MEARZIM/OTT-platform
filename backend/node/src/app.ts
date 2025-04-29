import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./modules/users/routes/user.routes";
import authRoutes from "./modules/auth/routes/auth.routes";
import adminRoutes from "./modules/admins/routes/admin.routes";
import categoryRouter from "./modules/contents/categories/routes/category.routes";
import videoRouter from "./modules/contents/video/routes/video.routes";
import videoCategoryRouter from "./modules/contents/video/routes/videoCategory.routes";

dotenv.config();
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET as string || "bdjbcvijsdbijvbsd", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("../uploads",express.static("uploads"));

// ✅ Global error handler
app.use(errorHandler);

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/content/video", videoRouter);
app.use("/api/content/video-category", videoCategoryRouter);


export default app;
