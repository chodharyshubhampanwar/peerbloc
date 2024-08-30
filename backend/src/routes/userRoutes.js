import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const userRoutes = async (fastify, options) => {
  fastify.get("/", (req, res) => {
    res.send("Hello World");
  });
  fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
  fastify.post("/logout", logoutUser);
  fastify.get("/me", { preHandler: authenticate }, getCurrentUser);
};

export default userRoutes;
