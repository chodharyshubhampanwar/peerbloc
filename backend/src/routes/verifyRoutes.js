import express from "express";
import { verifyDocument } from "../controllers/documentController.js";

const router = express.Router();

router.post("/verify", verifyDocument);

export default router;
