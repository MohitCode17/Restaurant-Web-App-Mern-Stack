import express from "express";
import {
  handleForgotPassword,
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

// FORGOT PASSWORD ROUTE
router.post("/forgot-password", handleForgotPassword);

export default router;
