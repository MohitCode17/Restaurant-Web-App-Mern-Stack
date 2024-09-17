import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailtrap";

// SEND VERIFICATION EMAIL
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  // GET RECIPIENT
  const recipient = [{ email }];

  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send verification email.");
  }
};

// SEND WELCOME EMAIL
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);

  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Restaurant",
      html: htmlContent,
      template_variables: {
        company_info_name: "Restaurant",
        name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email.");
  }
};

// SEND RESET PASSWORD EMAIL
export const sendResetPasswordEmail = async (
  email: string,
  resetURL: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);

  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send reset password email.");
  }
};

// SEND RESET PASSWORD SUCCESS EMAIL
export const sendResetPasswordSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();

  try {
    await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: htmlContent,
      category: "Password Reset Success",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send reset password success email.");
  }
};
