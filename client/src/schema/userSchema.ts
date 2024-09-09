import { z } from "zod";

// SIGNUP SCHEMA
export const userSignupSchema = z.object({
  fullname: z.string().min(2, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters"),
  contact: z
    .string()
    .min(10, "Contact number must be 10 digits."),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

// LOGIN SCHEMA
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
