import Express, { Request, Response, Router } from "express";
import multer from 'multer';
import { v4 } from 'uuid';
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { getAdminFromAuthHeader, getUserFromAuthHeader } from "./jwt";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Used instead of S3 when AWS_S3_BUCKET_NAME is not set (local development)
const LOCAL_UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export function getRouterUpload() {
  const router_upload = Router();

  router_upload.use('/uploads', Express.static(LOCAL_UPLOAD_DIR));

  router_upload.post('/upload', multer().any(), async (req: Request, res: Response) => {
    const authorization = req.headers.authorization ?? '';

    try {
      // Applicants upload their own documents; admins are allowed too
      await getUserFromAuthHeader(authorization as string)
        .catch(() => getAdminFromAuthHeader(authorization as string));
    } catch {
      res.status(401).end(`This endpoint is restricted`);
      return;
    }

    try {
      if (!(req as any).files || (req as any).files?.length === 0) {
        res.status(400).end(`Bad request`);
        return;
      }
      const file = ((req as any).files as any)[0];
      const fileUrl = process.env.AWS_S3_BUCKET_NAME
        ? await uploadToS3(file.buffer, file.originalname)
        : await saveLocally(file.buffer, file.originalname, `${req.protocol}://${req.get('host')}`);

      res.json(fileUrl);
    } catch (err: any) {
      res.status(500).end(err.toString());
    }
  });

  async function saveLocally(buffer: Buffer, originalName: string, baseUrl: string): Promise<string> {
    const filename = `${v4()}${path.extname(originalName)}`;
    await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(LOCAL_UPLOAD_DIR, filename), buffer);

    return `${baseUrl}/uploads/${filename}`;
  }

  async function uploadToS3(buffer: Buffer, originalName: string): Promise<string> {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error('AWS_S3_BUCKET_NAME is not configured');
    }

    const extension = path.extname(originalName);
    const filename = `${v4()}${extension}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filename,
      Body: buffer,
      ContentType: getContentType(extension),
    });

    await s3Client.send(command);

    // Return the public S3 URL
    return `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${filename}`;
  }

  function getContentType(extension: string): string {
    const types: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return types[extension.toLowerCase()] || 'application/octet-stream';
  }

  return router_upload;
}
