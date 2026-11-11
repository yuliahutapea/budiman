import Express, { Request, Response, Router } from "express";
import multer from "multer";
import fs from "fs/promises";
import { v4 } from "uuid";
import path from "path";
import { getAdminFromAuthHeader, getUserFromAuthHeader } from "./jwt";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION || "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
//   },
// });

export function getRouterUpload() {
  const router_upload = Router();

  router_upload.post(
    "/upload",
    multer().any(),
    async (req: Request, res: Response) => {
      const authorization = req.headers.authorization ?? "";
      let authenticated = false;
      try {
        await getAdminFromAuthHeader(authorization as string);
        authenticated = true;
      } catch {}

      if (!authenticated) {
        try {
          await getUserFromAuthHeader(authorization);
          authenticated = true;
        } catch {}
      }

      if (!authenticated) {
        return res.status(401).end("This endpoint is restricted");
      }

      try {
        if (!(req as any).files || (req as any).files?.length === 0) {
          res.status(400).end(`Bad request`);
          return;
        }
        const file = ((req as any).files as any)[0];
        // const fileUrl = await uploadToS3(file.buffer, file.originalname);
        const fileUrl = await uploadToLocal(file.buffer, file.originalname);
        // res.json(fileUrl);
        return res.status(200).json({
          url: fileUrl,
        });
      } catch (err: any) {
        res.status(500).end(err.toString());
      }
    },
  );

  async function uploadToLocal(
    buffer: Buffer,
    originalName: string,
  ): Promise<string> {
    const extension = path.extname(originalName);
    const filename = `${v4()}${extension}`;

    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return `/uploads/${filename}`;
  }

  async function uploadToS3(
    buffer: Buffer,
    originalName: string,
  ): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("AWS_S3_BUCKET_NAME is not configured");
    }

    const extension = path.extname(originalName);
    const filename = `${v4()}${extension}`;

    // const command = new PutObjectCommand({
    //   Bucket: bucketName,
    //   Key: filename,
    //   Body: buffer,
    //   ContentType: getContentType(extension),
    // });

    // await s3Client.send(command);

    // Return the public S3 URL
    return `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${filename}`;
  }

  function getContentType(extension: string): string {
    const types: { [key: string]: string } = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return types[extension.toLowerCase()] || "application/octet-stream";
  }

  return router_upload;
}
