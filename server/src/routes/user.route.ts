import express from "express";
import {
  checkAuth,
  handleForgotPassword,
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
  handleResetPassword,
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

// RESET PASSWORD ROUTE
router.post("/reset-password/:token", handleResetPassword);

// CHECK USER AUTH STATUS ROUTE
router.get("/check-auth", checkAuth);

export default router;
