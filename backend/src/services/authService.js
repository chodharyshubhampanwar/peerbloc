import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

const prisma = new PrismaClient();

export const registerUser = async (email, password) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationToken: generateVerificationToken(),
      },
    });
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  if (!user.emailVerified) {
    throw new Error(
      "Email not verified. Please verify your email before logging in."
    );
  }
  const token = generateToken(user.id);
  return token;
};

export const verifyUser = async (token) => {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });
  if (!user) {
    throw new Error("Invalid verification token");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
    },
  });
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const generateVerificationToken = () => {
  const token = Math.random().toString(36).substring(8);
  return token;
};
