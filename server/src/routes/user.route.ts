import express from "express";
import {
  checkAuth,
  handleForgotPassword,
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
  handleResetPassword,
  handleUpdateProfile,
  handleVerifyEmail,
} from "../controllers/user.controller";
import { authenticated } from "../middlewares/authenticated";

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
router.get("/check-auth", authenticated, checkAuth);

// UPDATE PROFILE ROUTE
router.put("/profile/update", authenticated, handleUpdateProfile);

export default router;
