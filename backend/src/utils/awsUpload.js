import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  console.log(file);
  const { originalname, buffer, mimetype } = file;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const cloudFrontUrl = `https://${process.env.CLOUDFRONT_DOMAIN_NAME}/${originalname}`;
    return cloudFrontUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const getFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  try {
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.error("Error getting signed URL from S3:", error);
    throw error;
  }
};
