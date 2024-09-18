import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config";
import userRoutes from "./routes/user.route";
import restaurantRoutes from "./routes/restaurant.route";
import menuRoutes from "./routes/menu.route";

// EXPRESS APP INSTANCE
const app = express();

// DEFAULT MIDDLEWARES
app.use(
  cors({
    origin: config.frontend_url,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);

export default app;
