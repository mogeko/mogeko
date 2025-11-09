import { env } from "node:process";
import { S3Client } from "@aws-sdk/client-s3";

import "server-only";

export const BUCKET_NAME = env.R2_BUCKET_NAME;

export const s3 = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT,
});
