import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";

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
    // await sendVerificationEmail(email, verificationToken);

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
