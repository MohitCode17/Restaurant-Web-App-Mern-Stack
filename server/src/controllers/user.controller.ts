import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import crypto from "crypto";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";
import { config } from "../config/config";

// REGISTER USER CONTROLLER
export const handleRegisterUser = async (req: Request, res: Response) => {
  try {
    // GETTING DATA FOR RESIGTER USER
    const { fullname, email, password, contact } = req.body;

    // FIND USER WITH EMAIL
    let user = await User.findOne({ email });

    // THROW ERROR IF USER FOUND WITH EMAIL - IF USER ALREADY REGISTER THERE IS NO POINT TO RE-REGISTER TO USER
    if (user)
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });

    // HASH USER PASSWORD BEFORE STORING IT IN DATABASE
    const hashPassword = await bcrypt.hash(password, 10);

    // GENEREATE 6 DIGITS VERIFICATION CODE (2 WAY VERIFICATION)
    const verificationToken = generateVerificationCode();

    // CREATE NEW USER IN DATABASE
    user = await User.create({
      fullname,
      email,
      password: hashPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // GENERATE AUTH TOKEN (JWT)
    generateToken(res, user);

    // SEND VERIFICATION EMAIL
    await sendVerificationEmail(email, verificationToken);

    // REMOVE PASSWORD FROM USER OBJECT BEFORE SENDING TO FRONTEND
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// LOGIN USER CONTROLLER
export const handleLoginUser = async (req: Request, res: Response) => {
  try {
    // GETTING DATA FOR LOGIN USER
    const { email, password } = req.body;

    // FIND USER WITH EMAIL
    const user = await User.findOne({ email });

    // THROW ERROR IF USER NOT FOUND - DURING LOGIN USER SHOULD HAVE REGISTER FIRST
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    // CHECK PASSWORD WITH PASSWORD, WHICH WAS PROVIDED DURING REGISTRATION
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // THROW ERROR IF PASSWORD WRONG
    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    // GENERATE AUTH TOKEN
    generateToken(res, user);

    // UPDATE LAST LOGIN STATUS
    user.lastLogin = new Date();
    await user.save();

    // REMOVE PASSWORD FROM USER OBJECT BEFORE SENDING TO FRONTEND
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: `Welcome back, ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// LOGOUT USER CONTROLLER
export const handleLogoutUser = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("authToken").status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// VERIFY EMAIL CONTROLLER
export const handleVerifyEmail = async (req: Request, res: Response) => {
  try {
    // GETTING VERIFICATION CODE
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // SEND WELCOME EMAIL
    await sendWelcomeEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// FORGOT PASSWORD CONTROLLER
export const handleForgotPassword = async (req: Request, res: Response) => {
  try {
    // GETTING EMAIL
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });

    // GENERATE RESET TOKEN
    const resetToken = crypto.randomBytes(40).toString("hex");

    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // SENT RESET PASSWORD MAIL
    await sendResetPasswordEmail(
      user.email,
      `${config.frontend_url}/resetPassword/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// RESET PASSWORD CONTROLLER
export const handleResetPassword = async (req: Request, res: Response) => {
  try {
    // GETTING RESET PASSWORD TOKEN & NEW PASSWORD
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    // THROW AN ERROR - TOKEN IS EXPIRED OR NOT FOUND
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });

    // UPDATE PASSWORD
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // SEND SUCCESS RESET EMAIL
    await sendResetPasswordSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// CHECK AUTH FOR USER CONTROLLER
export const checkAuth = async (req: Request, res: Response) => {
  try {
    // GETTING USERID FROM REQ AFTER SUCCESSFULLY AUTHENTICATE
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE PROFILE CONTROLLER
export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    // GETTING USERID FROM REQ AFTER SUCCESSFULLY AUTHENTICATE
    const userId = req.id;

    // GETTING VALUE FOR UPDATE
    const { fullname, email, address, city, country, profilePicture } =
      req.body;

    // TO DO CLOUDINARY SETUP

    const updateData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
