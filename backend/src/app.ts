import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.use(
    cors({
        origin: ["http://localhost:5174", "http://localhost:5173"],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET as string || "bdjbcvijsdbijvbsd", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

export default app;
