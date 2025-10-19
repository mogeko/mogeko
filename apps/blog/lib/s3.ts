import { S3Client } from "@aws-sdk/client-s3";

import "server-only";

export const s3 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
});

export const BUCKET_NAME = process.env.R2_BUCKET_NAME;

export * from "@aws-sdk/client-s3";
