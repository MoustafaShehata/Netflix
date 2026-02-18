import {
  forgotPasswordEmail,
  resetPasswordEmail,
  verificationEmail,
  welcomeEmail,
} from "../Emails/emails.js";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const Images = [
      "/assets/avatar1.png",
      "/assets/avatar2.png",
      "/assets/avatar3.png",
    ];
    const profileImage = Images[Math.floor(Math.random() * Images.length)];

    // verificationEmail
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationCodeExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    verificationEmail(email, verificationCode);

    const newUser = new User({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      profileImage,
      verificationCode,
      verificationCodeExpiresAt,
    });

    // jwt
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: undefined,
        verificationCode: undefined,
        verificationCodeExpiresAt: undefined,
      },
    });

    await newUser.save();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log("Error in signup controller " + error.message);
  }
};

// verifyEmail
export const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode || verificationCode.length !== 6) {
      return res
        .status(400)
        .json({ success: false, message: "verification Code is required" });
    }

    const user = await User.findOne({
      verificationCode: verificationCode,
      verificationCodeExpiresAt: { $gt: Date.now() },
    });

    if (user?.isVerified == true) {
      return res.json({ message: "Email Already verified" });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid code or code is expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in verifyEmail controller " + error.message);
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // welcomeEmail
    welcomeEmail(email);

    // jwt
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in login controller " + error.message);
  }
};

// forgotPassword
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }

    // forgotPasswordEmail
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    forgotPasswordEmail(email, resetPasswordToken);

    await user.save();

    res.status(200).json({
      success: true,
      message: "forgot password email sent successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in forgotPassword controller " + error.message);
  }
};

// resetPassword
export const resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!password || !confirmPassword || !token) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token " });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "The passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const hashedNewPassword = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    user.password = hashedNewPassword;
    await user.save();

    // resetPasswordEmail
    resetPasswordEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "reset password successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in resetPassword controller " + error.message);
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in logout controller " + error.message);
  }
};

// authcheck
export const authcheck = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in authcheck controller " + error.message);
  }
};
