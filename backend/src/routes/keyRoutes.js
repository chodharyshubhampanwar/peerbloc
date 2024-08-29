import express from "express";
import {
  createPublicKey,
  getPublicKey,
  updatePublicKeyStatus,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/key", createPublicKey);
router.get("/key/:id", getPublicKey);
router.patch("/key/:id", updatePublicKeyStatus);

export default router;
