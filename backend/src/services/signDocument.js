import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSignerService = async (name, publicKeyId) => {
  if (!name || !publicKeyId) {
    throw new Error("Name and public key ID are required");
  }
  const signer = await prisma.signer.create({
    data: {
      name,
      publicKey: {
        create: {
          key: "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwVACPqWPMgPBMf2ouMKNzrFx4Sii+UJRlkfxBJ9q1CfudnfbZDLJpUvMUwT59engfwIwftgvVSnU8+G8XMs-----END PUBLIC KEY-----",
        },
      },
    },
    include: {
      publicKey: true,
    },
  });

  return signer;
};

export const getSignerService = async (id) => {
  if (!id) {
    throw new Error("Signer ID is required");
  }

  const signer = await prisma.signer.findUnique({
    where: { id },
    include: { publicKey: true },
  });

  if (!signer) {
    throw new Error("Signer not found");
  }

  return signer;
};
