import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import docRouters from "./routes/docRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: `${env.FRONTEND}`, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],               
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/workspaces", docRouters);
app.use("/api/workspaces", channelRoutes);

export default app;
