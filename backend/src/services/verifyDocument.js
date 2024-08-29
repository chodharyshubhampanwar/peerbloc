import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { getHashFromCache } from "../utils/cacheUtils.js";

const prisma = new PrismaClient();

export const verifyDocumentService = async (documentId) => {
  if (!documentId) {
    throw new Error("Document ID is required");
  }

  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { signer: { include: { publicKey: true } } },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  const signature = await prisma.signature.findFirst({
    where: { documentId, isValid: true },
    include: { publicKey: true },
  });

  if (!signature) {
    throw new Error("Signature not found");
  }

  const hash = await getHashFromCache(document.content);

  const isValid = verifySignature(
    hash,
    signature.signature,
    signature.publicKey.key
  );

  return isValid;
};

const verifySignature = (hash, signature, publicKey) => {
  const verifier = crypto.createVerify("SHA256");
  verifier.update(hash);
  const isValid = verifier.verify(publicKey, Buffer.from(signature, "base64"));
  return isValid;
};
