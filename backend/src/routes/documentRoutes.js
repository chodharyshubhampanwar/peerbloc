// routes/document.js
import express from "express";
import {
  createDocument,
  getDocument,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/document", createDocument);
router.get("/document/:id", getDocument);

export default router;
