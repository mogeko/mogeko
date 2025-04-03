import { getRandomValues, subtle } from "node:crypto";

export async function encrypt(plaintext: string, password: string) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await subtle.digest("SHA-256", pwUtf8);

  const iv = getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };
  const key = await subtle.importKey("raw", pwHash, alg, false, ["encrypt"]);

  const ptUint8 = new TextEncoder().encode(plaintext);
  const ctBuffer = await subtle.encrypt(alg, key, ptUint8);

  const ctString = String.fromCharCode(...new Uint8Array(ctBuffer));
  const ctBase64 = Buffer.from(ctString, "binary").toString("base64");

  const ivHex = Array.from(iv, (b) => `00${b.toString(16)}`.slice(-2)).join("");

  return ivHex + ctBase64;
}

export async function decrypt(ciphertext: string, password: string) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await subtle.digest("SHA-256", pwUtf8);

  const iv = Buffer.from(ciphertext.slice(0, 24), "hex");
  const alg = { name: "AES-GCM", iv: new Uint8Array(iv) };
  const key = await subtle.importKey("raw", pwHash, alg, false, ["decrypt"]);

  const ctStr = Buffer.from(ciphertext.slice(24), "base64").toString("binary");
  const ctUint8 = new Uint8Array(
    (ctStr.match(/[\s\S]/g) as RegExpExecArray).map((ch) => ch.charCodeAt(0)),
  );

  const plainBuffer = await subtle.decrypt(alg, key, ctUint8);

  return new TextDecoder().decode(plainBuffer);
}
