import User from "../models/User.js";
import { generateToken } from "../services/authService.js";

export const registerUser = async (request, reply) => {
  try {
    const { username, email, password } = request.body;
    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .code(201)
      .send({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

export const loginUser = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return reply.code(401).send({ error: "Invalid email or password" });
    }

    const token = generateToken(user);
    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .send({ message: "Logged in successfully", userId: user._id });
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};

export const logoutUser = async (request, reply) => {
  reply.clearCookie("token").send({ message: "Logged out successfully" });
};

export const getCurrentUser = async (request, reply) => {
  try {
    const user = await User.findById(request.user.id).select("-password");
    if (!user) {
      return reply.code(404).send({ error: "User not found" });
    }
    reply.send(user);
  } catch (error) {
    reply.code(400).send({ error: error.message });
  }
};
