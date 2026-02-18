import { ENV_VARS } from "../config/envVars.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  Welcome_Email_Template,
} from "./emailTemplates.js";

import { mailtrapClient, sender } from "./mailtrap.config.js";

// verificationEmail
export const verificationEmail = async (email, verificationCode) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationCode,
      ),
      subject: "verifiy your Email",
      category: "Email verification",
    });
    console.log("Verification Email sent successfully " + response);
  } catch (error) {
    console.log("Error while sending Verification Email " + error.message);
  }
};

// welcomeEmail
export const welcomeEmail = async (email) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      html: Welcome_Email_Template,
      subject: "welcome email ",
      category: "Welcome email ",
    });
    console.log("Welcome email send successfully " + response);
  } catch (error) {
    console.log("Error in Welcome email " + error.message);
  }
};

// forgotPasswordEmail
export const forgotPasswordEmail = async (email, token) => {
  try {
    const recipient = [{ email }];
    const response = mailtrapClient.send({
      from: sender,
      to: recipient,
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        `${ENV_VARS.CLIENT_URL}/reset-password/${token}`,
      ),
      subject: "forgot password email",
      category: "forgot password email",
    });
    console.log("forgotPasswordEmail send successfully " + response);
  } catch (error) {
    console.log("error in forgotPasswordEmail " + error.message);
  }
};

// resetPasswordEmail
export const resetPasswordEmail = async (email) => {
  try {
    const recipient = [{ email }];
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      subject: "success passwordResetEmail",
      category: "success passwordResetEmail",
    });
    console.log("password reset successfully " + response);
  } catch (error) {
    console.log("Error in resetPasswordEmail " + error.message);
  }
};
