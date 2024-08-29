import express from "express";
import {
  registerUserController,
  loginUserController,
  verifyUserController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/verify", verifyUserController);

export default router;
