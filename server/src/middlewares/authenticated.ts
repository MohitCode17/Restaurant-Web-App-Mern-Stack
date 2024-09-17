import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // GETTING TOKEN FROM COOKIES
    const token = req.cookies.authToken;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });

    // VERIFYING TOKEN
    const decode = jwt.verify(
      token,
      config.jwt_secret_key as string
    ) as JwtPayload;

    // CHECK IF TOKEN WAS VERIFY
    if (!decode)
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
