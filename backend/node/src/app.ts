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
import adRouter from "./modules/ads/routes/ads.route";
import historyRouter from "./modules/contents/history/routes/history.routes";
import likedRouter from "./modules/contents/liked/routes/liked.routes";
import subscriptionRouter from "./modules/subscriptions/routes/subscription.routes";
import webhookRouter from "./modules/webhook/routes/webhook.routes";
import watchlistRouter from "./modules/contents/watchlist/routes/watchlist.route";
import videoRatingRouter from "./modules/contents/rating/routes/rating.routes";

dotenv.config();
const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST", "PUT", "PATCH" ,"DELETE"],
        credentials: true,
    })
);

app.use("/api/webhook", express.raw({ type: 'application/json' }), webhookRouter);


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
app.use("/api/ads", adRouter);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRouter);
app.use("/api/content/like", likedRouter);
app.use("/api/content/video", videoRouter);
app.use("/api/content/history", historyRouter);
app.use("/api/content/watchlist", watchlistRouter);
app.use("/api/content/video-category", videoCategoryRouter);
app.use("/api/content/rating", videoRatingRouter);
app.use("/api/subscription/", subscriptionRouter);



export default app;
