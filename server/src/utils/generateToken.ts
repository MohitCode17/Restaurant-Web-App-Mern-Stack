import { Response } from "express";
import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { config } from "../config/config";

export const generateToken = (res: Response, user: IUserDocument) => {
  // THE ! OPERATOR USED TO TELL TYPESCRIPT THAT "jwt_secret_key" HAVE A VALUE AT RUNTIME, IT SHOULD NOT THROW AN ERROR ABOUT BEING NULL OR UNDEFINED
  const token = jwt.sign({ userId: user._id }, config.jwt_secret_key!, {
    expiresIn: "1d",
  });

  // STORE IN COOKIE
  res.cookie("authToken", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
