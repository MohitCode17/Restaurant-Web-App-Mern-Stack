import express from "express";
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
  handleVerifyEmail,
} from "../controllers/user.controller";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegisterUser);

// LOGIN USER ROUTE
router.post("/login", handleLoginUser);

// LOGOUT USER ROUTE
router.post("/logout", handleLogoutUser);

// VERIFY EMAIL ROUTE
router.post("/verify-email", handleVerifyEmail);

export default router;
