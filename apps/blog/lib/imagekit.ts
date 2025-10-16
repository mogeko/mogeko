import { Buffer } from "node:buffer";

import "server-only";

export async function upload(opts: UploadOptions): Promise<UploadResponse> {
  const priveKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!priveKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined");
  }

  const formData = new FormData();

  for (const [key, value] of Object.entries(opts)) {
    if (value !== undefined) {
      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value);
      }
    }
  }

  const res = await fetch("https://upload.imagekit.io/api/v2/files/upload", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${base64(`${priveKey}:`)}`,
      ContentType: "multipart/form-data",
    },
    body: formData,
  });

  if (!res.ok) {
    const { message } = (await res.json()) as ErrorResponse;

    throw new Error(message || res.statusText);
  }

  return (await res.json()) as UploadResponse;
}

function base64(plaintext: string): string {
  return Buffer.from(plaintext).toString("base64");
}

export type UploadOptions = {
  file: string | Blob | File;
  fileName: string;
  useUniqueFileName?: boolean;
  tags?: string[];
  folder?: string;
  isPrivateFile?: boolean;
  customCoordinates?: string;
  responseFields?: string | string[];
  overwriteFile?: boolean;
  overwriteAITags?: boolean;
  overwriteTags?: boolean;
  overwriteCustomMetadata?: boolean;
  checks?: string;
};

export type UploadResponse = ImageResponse | VideoResponse;

type ImageResponse = {
  fileId: string;
  name: string;
  size: number;
  versionInfo: { id: string; name: string };
  filePath: string;
  url: string;
  fileType: "image";
  height: number;
  width: number;
  orientation: number;
  thumbnailUrl: string;
};

type VideoResponse = {
  fileId: string;
  name: string;
  size: number;
  versionInfo: { id: string; name: string };
  filePath: string;
  url: string;
  fileType: "non-image";
  height: number;
  width: number;
  bitRate: number;
  duration: number;
  audioCodec: string;
  videoCodec: string;
};

type ErrorResponse = {
  message: string;
  help: string;
};
