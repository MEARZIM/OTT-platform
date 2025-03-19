import app from "../../app";
import authRoutes from "./routes/auth.routes";

app.use("/api/auth", authRoutes);