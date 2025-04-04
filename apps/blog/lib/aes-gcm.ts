import { Buffer } from "node:buffer";
import { getRandomValues, subtle } from "node:crypto";
import { TextDecoder, TextEncoder } from "node:util";

export async function encrypt(plaintext: string, password: string) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await subtle.digest("SHA-256", pwUtf8);

  const iv = getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };
  const key = await subtle.importKey("raw", pwHash, alg, false, ["encrypt"]);

  const ptUint8 = new TextEncoder().encode(plaintext);
  const ctBuffer = await subtle.encrypt(alg, key, ptUint8);

  const ivHex = Buffer.from(iv).toString("hex");
  const ctBase64 = Buffer.from(ctBuffer).toString("base64");

  return ivHex + ctBase64;
}

export async function decrypt(ciphertext: string, password: string) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await subtle.digest("SHA-256", pwUtf8);

  const iv = Buffer.from(ciphertext.slice(0, 24), "hex");
  const alg = { name: "AES-GCM", iv };
  const key = await subtle.importKey("raw", pwHash, alg, false, ["decrypt"]);

  const ctBuffer = Buffer.from(ciphertext.slice(24), "base64");

  const plainBuffer = await subtle.decrypt(alg, key, ctBuffer);

  return new TextDecoder().decode(plainBuffer);
}
