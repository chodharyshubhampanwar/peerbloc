import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import { uploadQrCode } from "./src/controllers/userController.js";
import documentRouter from "./src/routes/documentRoutes.js";
import signerRouter from "./src/routes/signerRoutes.js";
import publicKeyRouter from "./src/routes/keyRoutes.js";
import verifyRouter from "./src/routes/verifyRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api", documentRouter);
app.use("/api", signerRouter);
app.use("/api", publicKeyRouter);
app.use("/api", verifyRouter);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadQrCode);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
