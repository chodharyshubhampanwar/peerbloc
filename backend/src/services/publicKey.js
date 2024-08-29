import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPublicKeyService = async (key, signerId) => {
  if (!key || !signerId) {
    throw new Error("Public key and signer ID are required");
  }

  const publicKey = await prisma.publicKey.create({
    data: { key, signerId },
  });

  return publicKey;
};

export const getPublicKeyService = async (id) => {
  if (!id) {
    throw new Error("Public key ID is required");
  }

  const publicKey = await prisma.publicKey.findUnique({
    where: { id },
    include: { signer: true },
  });

  if (!publicKey) {
    throw new Error("Public key not found");
  }

  return publicKey;
};

export const updatePublicKeyStatusService = async (id, status) => {
  if (!id || !status) {
    throw new Error("Public key ID and status are required");
  }

  const validStatuses = ["valid", "invalid"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const publicKey = await prisma.publicKey.updateMany({
    where: { id },
    data: { status },
  });

  return publicKey;
};
