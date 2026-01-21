import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js"
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: `${env.FRONTEND}`, 
    credentials: true,               
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/app/workspaces/new", workspaceRoutes)

export default app;
