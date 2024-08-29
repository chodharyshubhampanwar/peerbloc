import {
  registerUser,
  loginUser,
  verifyUser,
} from "../services/authService.js";
import { sendVerificationEmail } from "../services/emailService.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    await registerUser(email, password);
    const user = await prisma.user.findUnique({ where: { email } });
    await sendVerificationEmail(email, user.verificationToken);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.message === "Email already exists") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Error registering user" });
    }
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginUser(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);

    if (error.message === "Email not verified") {
      res.status(401).json({ message: "Email not verified" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  }
};

export const verifyUserController = async (req, res) => {
  const { token } = req.query;
  try {
    await verifyUser(token);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ message: "Invalid verification token" });
  }
};
