import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

// DigitalOcean S3 client setup
const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.DO_SPACE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY || "",
  },
});

// Upload function
export const uploadToDigitalOceanAWS = async (
  file: Express.Multer.File
): Promise<{ location: string }> => {
  try {
    const key = `${nanoid()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.DO_SPACE_BUCKET,
      Key: key,
      Body: file.buffer,
      ACL: "public-read", // Optional, allows public access
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const location = `${process.env.DO_SPACE_ENDPOINT}/${process.env.DO_SPACE_BUCKET}/${key}`;
    return { location };
  } catch (error: any) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};

// Delete function
export const deleteFromDigitalOceanAWS = async (
  fileUrl: string
): Promise<void> => {
  try {
    const key = fileUrl.split(
      `${process.env.DO_SPACE_ENDPOINT}/${process.env.DO_SPACE_BUCKET}/`
    )[1];

    const command = new DeleteObjectCommand({
      Bucket: process.env.DO_SPACE_BUCKET,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error: any) {
    console.error("Error deleting file from DigitalOcean:", error.message);
    throw new Error("Error deleting file from DigitalOcean.");
  }
};
