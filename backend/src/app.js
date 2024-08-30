import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyHelmet from "@fastify/helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCookie);
fastify.register(fastifyHelmet);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register routes
fastify.register(userRoutes, { prefix: "/v1/users" });

// Global error handler
fastify.setErrorHandler(errorHandler);

const start = async () => {
  try {
    const address = await fastify.listen({ port: process.env.PORT || 5000 });
    fastify.log.info(`Server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

export default fastify;
