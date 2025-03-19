import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./modules/users/routes/user.routes";
import authRoutes from "./modules/auth/routes/auth.routes";


const app = express();

app.use(
    cors({
        origin: "http://localhost:5174", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET as string || "bdjbcvijsdbijvbsd", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// ✅ Global error handler
app.use(errorHandler);

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


export default app;
