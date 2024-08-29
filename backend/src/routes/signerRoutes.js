import express from "express";
import { createSigner, getSigner } from "../controllers/documentController.js";

const router = express.Router();

router.post("/signer", createSigner);
router.get("/signer/:id", getSigner);

export default router;
