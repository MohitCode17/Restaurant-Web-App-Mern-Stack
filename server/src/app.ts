import express, { Request, Response } from "express";

// EXPRESS APP INSTANCE
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
// ..........TESTING API............
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test Pass." });
});

export default app;
