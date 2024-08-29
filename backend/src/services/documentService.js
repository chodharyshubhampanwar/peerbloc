import { PrismaClient } from "@prisma/client";
import { getSignerService } from "../services/signDocument.js";
import { createSignature } from "../services/signatureService.js";
import crypto from "crypto";
import { getHashFromCache } from "../utils/cacheUtils.js";

const prisma = new PrismaClient();

export const createDocumentSign = async (content, signerId) => {
  const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZypk76FKQqWfL
yhdHz86BBQxjCs61QjeNbAGnmOmgWtoZ8jb2JpLTfjDrgGjvaijGx+90qr4eeZrZ
jRQdRXhQfx8ZRc1dpqk/pm81tneZFV0YDs5CX+gqG+d3dF4e1o82e7Rw+A4x5qP1
+gZ34AaRcOJ50+s14l6kwnyAC8JQstE4iUqAr27E6hkvdz/q/gTT324XsY0xyp4G
QmoNWvkScSIv/BNukoeSuF26vOFWYv80i2GYJygivFiLViQbsBUTPLkql9v675Ix
1AcLeNM16oaCbdLmuaISMtF4tnKhAAv9Ygymu14QzO4E3XqeZ/CtPNGGmAfzI54X
N8zDfVvJAgMBAAECggEAH6SyEuQ0atRSQmfAbiyhQlmrbRB67BcM3z1cGC+9chEB
M1ff6G++UYA6N11W4cI43njaL8dHDEJ63zUCQSaAzqFJsXBU4FCAssDJ07IJOnLC
LeaozTgGEWgwf0inDC/8atwaYXeJCHMMS4biPbSM/8C5Bx5lRFT5j1K6qBgNSZAM
7vykcyzlBppJ9k8N5VXumCub36t3w4pJvgpZwHO1xljtVwwqgLf21ssFVNiSayP3
DIfIWSbFzVj6EyVTtwvkPOu70yS9WbraS4YRyI1T5QkTieIfT5hMKbzVO8bX7a0m
hfSQ0ZlvAe72Q9Ck020P/WlMSgYUJmgkRr2bTc8n6QKBgQD1l5cgFwx54rg7YXOp
e69yLf6vq3U1cLgZojxNSy0txj1bS0c/W0zqrHPi7kbDOdEi9aKDZsN8M5/DS1lq
sRmmF5/dY2wVjFWuDNI9+IGWSaDWOhNvChuoIROvBqmA1XqdQsP58VqBUbhwJLLh
ncALvKxi/YCjFM1kBdxan6JfbwKBgQDjBWZumSIeI4tFZ2SjKvg4QeniMwq6ZTs9
kQbsqpaWEEiKZw8DXomk5BESbyw0Dr2SB47Heg55VUEOA7oUcHWLntwgQfeNC+1l
Sl4S4kYbXFGhk9sHtQ2AlOEA++pTDSVJOK3qG4j1Y+L2yLK6A/4aiS7mkaGGaHb0
W531WudcRwKBgCOr3ACGOIKvopDFa9ZPJ8GO2rJLVh/n+mWGwfl8FNjUNW9ANN4H
9dkUKVTpxQ9wI2dPhEZPs88jdG4aUKeFh7MvNUIjwbwzgPJh3Fux76iTky/qiY4U
SsYV39UJQ6950nBrFSoFm16zLvXi7rSEhDNwOR27smZ9jAOeMk5bZ2szAoGBAIJI
+BcixOS9C1FiW+wUXe2TTlFlb5O3Qv87OtkZsWAfqjHboU8SszWxOWb17E1X5E1p
DvTFxIa3eaU8WE8glyTwn23XzeThYnVN750wxIExQxvSidHrgvs29cYlzL2q/qn9
4DlJYhlKINf2KDP+1JaQAh2KmENVsmbcKVPEvqBDAoGBAPKCR5yLfr7NxkRmZRgl
cynlJvjKaW+65T5dx49m12AB/t+IT9K0y7SsU2odC1DsmFjPQ2d+Wk3trvw6Xudf
qeCVl5ys82Hwcd5FmduNGs0RRBckOnPJWCoC66d26OU2Bu4Gt5VptJX5qcLBU8si
coHIyPt8kRCPaDiRJm78JwUg
-----END PRIVATE KEY-----`;

  if (!content || !signerId) {
    throw new Error("Content, signer ID, and private key are required");
  }

  const signer = await getSignerService(signerId);

  const hash = await getHashFromCache(content);

  const signature = generateSignature(hash, privateKey);

  const document = await prisma.document.create({
    data: {
      content,
      signerId,
      code: "1234567",
    },
  });

  await createSignature(signature, document.id, signerId, signer.publicKey.id);

  return document;
};

export const getDocumentSign = async (id) => {
  if (!id) {
    throw new Error("Document ID is required");
  }

  const document = await prisma.document.findUnique({
    where: { id },
    include: { signer: true },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  return document;
};

const generateSignature = (hash, privateKey) => {
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(hash)
    .sign(privateKey, "base64");

  return signature;
};
