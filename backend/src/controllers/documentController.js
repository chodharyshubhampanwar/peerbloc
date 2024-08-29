import {
  createDocumentSign,
  getDocumentSign,
} from "../services/documentService.js";
import {
  createPublicKeyService,
  getPublicKeyService,
  updatePublicKeyStatusService,
} from "../services/publicKey.js";
import { verifyDocumentService } from "../services/verifyDocument.js";
import {
  createSignerService,
  getSignerService,
} from "../services/signDocument.js";

export const createDocument = async (req, res) => {
  try {
    const { content, signerId } = req.body;
    const document = await createDocumentSign(content, signerId);
    res.status(201).json(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await getDocumentSign(id);
    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const createSigner = async (req, res) => {
  try {
    const { name, publicKeyId } = req.body;
    const signer = await createSignerService(name, publicKeyId);
    res.status(201).json(signer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getSigner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const signer = await getSignerService(id);
    res.json(signer);
  } catch (err) {
    next(err);
  }
};

export const createPublicKey = async (req, res) => {
  try {
    const { key, signerId } = req.body;
    const publicKey = await createPublicKeyService(key, signerId);
    res.status(201).json(publicKey);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getPublicKey = async (req, res, next) => {
  try {
    const { id } = req.params;
    const publicKey = await getPublicKeyService(id);
    res.json(publicKey);
  } catch (err) {
    next(err);
  }
};

export const updatePublicKeyStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const publicKey = await updatePublicKeyStatusService(id, status);
    res.json(publicKey);
  } catch (err) {
    next(err);
  }
};

export const verifyDocument = async (req, res, next) => {
  try {
    const { documentId } = req.body;
    const isValid = await verifyDocumentService(documentId);
    res.json({ isValid });
  } catch (err) {
    next(err);
  }
};
