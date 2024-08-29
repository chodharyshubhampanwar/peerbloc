import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSignature = async (
  signature,
  documentId,
  signerId,
  publicKeyId
) => {
  if (!signature || !documentId || !signerId || !publicKeyId) {
    throw new Error(
      "Signature, document ID, signer ID, and public key ID are required"
    );
  }

  // const existingSignature = await prisma.signature.findFirst({
  //   where: { signature },
  // });

  const existingSignature = await prisma.signature.findFirst({
    where: { documentId, isValid: true },
  });

  if (existingSignature) {
    throw new Error("Document is already signed");
  }

  const newSignature = await prisma.signature.create({
    data: {
      signature,
      documentId,
      signerId,
      publicKeyId,
    },
  });

  return newSignature;
};
