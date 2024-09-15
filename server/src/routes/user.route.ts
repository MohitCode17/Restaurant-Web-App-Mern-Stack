import express from "express";
import { handleRegisterUser } from "../controllers/user.controller";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegisterUser);

export default router;
