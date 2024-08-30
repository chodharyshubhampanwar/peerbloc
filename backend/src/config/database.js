import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbUri = process.env.MONGODB_URI;

console.log(dbUri);

export async function databasePlugin(fastify) {
  const dbUri = process.env.MONGODB_URI;

  console.log(dbUri);

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  fastify.addHook("onClose", () => {
    mongoose.connection.close();
  });
}
