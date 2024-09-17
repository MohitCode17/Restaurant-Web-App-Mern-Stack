import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/config";

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
// ..........TESTING API............
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test Pass." });
});

export default app;
