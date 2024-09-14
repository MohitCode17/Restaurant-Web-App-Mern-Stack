import express, { Request, Response } from "express";

// EXPRESS APP INSTANCE
const app = express();

// ROUTES
// ..........TESTING API............
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test Pass." });
});

export default app;
