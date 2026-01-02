import { S3Client } from "@aws-sdk/client-s3";

import "server-only";

export const BUCKET_NAME = process.env.R2_BUCKET_NAME;

export const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  // In the v3.729.0 release, AWS introduced new compatibility changes.
  // See: https://github.com/aws/aws-sdk-js-v3/issues/6810
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});
