import qrcode from "qrcode";
import { nanoid } from "nanoid";
import { uploadFile } from "../utils/awsUpload.js";

const generateQRCode = async (documentId) => {
  const documentData = JSON.stringify(documentId);
  try {
    const verifyUrl = `https://xyz.com/verify/doc?id=${documentData}`;
    const qrDataUrl = await new Promise((resolve, reject) => {
      qrcode.toDataURL(verifyUrl, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });

    const buffer = Buffer.from(qrDataUrl.split(",")[1], "base64");
    const file = {
      originalname: `qrcode-${nanoid()}.png`,
      buffer,
      mimetype: "image/png",
    };
    const qrUrl = await uploadFile(file);
    return qrUrl;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
};

export default generateQRCode;
