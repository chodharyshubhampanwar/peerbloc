import { nanoid } from "nanoid";
import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { uploadFile } from "../utils/awsUpload.js";
import generateQRCode from "../utils/generateQRCode.js";

const prisma = new PrismaClient();

// const upload = multer({ storage: multer.memoryStorage() });

export const getUserProfileController = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, emailVerified: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const uploadQrCode = async (req, res) => {
  try {
    const qrUrl = await generateQRCode(nanoid());

    const userId = "fd147143-a1bf-4875-8299-0e639a44ddb7";
    const document = await prisma.document.create({
      data: {
        qrUrl,
        userId,
      },
    });

    console.log("Document saved:", document);
    res.json({ qrUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "File upload failed" });
  }
};

// app.get("/api/files/:key", async (req, res) => {
//   try {
//     const key = req.params.key;
//     const url = await getFile(key);
//     res.json({ url });
//   } catch (error) {
//     console.error("Error getting file URL:", error);
//     res.status(500).json({ error: "Failed to get file URL" });
//   }
// });
