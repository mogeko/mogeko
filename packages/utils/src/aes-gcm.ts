/**
 * A library that implements AES-GCM algorithm encryption and decryption
 * for TypeScript/JavaScript.
 *
 * Galois/Counter Mode (GCM) uses a block cipher with block size 128 bits
 * (commonly AES-128) operated in counter mode for encryption, and uses
 * arithmetic in the Galois field GF(2128) to compute the authentication
 * tag; hence the name.
 *
 * ## Usage
 *
 * ```ts
 * import { decrypt, encrypt } from "@mogeko/utils/ase-gcm";
 *
 * const cipher = await encrypt("Hello, world!", "pa$$w0rd");
 *
 * await decrypt(cipher, "pa$$w0rd"); // Hello, world!
 * ```
 *
 * @module
 */

/**
 * Encrypt plain text to cipher text with AES-GCM algorithm.
 *
 * @param plain Plain text that needs to be encrypted.
 * @param passwd The password used for encryption.
 * @returns Cipher text encrypted with AES-GCM algorithm.
 *
 * @example Usage
 * ```ts
 * import { encrypt } from "@mogeko/utils/ase-gcm";
 *
 * const cipher = await encrypt("Hello, world!", "pa$$w0rd");
 * ```
 */
export async function encrypt(plain: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const iv = crypto.getRandomValues(Buffer.allocUnsafe(12));
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);

  const ptUint8 = new TextEncoder().encode(plain);
  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);

  return iv.toString("hex") + Buffer.from(ctBuffer).toString("base64");
}

/**
 * Decrypt the cipher text encrypted by AES-GCM algorithm to plain text.
 *
 * @param cipher Cipher text encrypted with AES-GCM algorithm.
 * @param passwd The password used for decryption.
 * @returns Plain text decrypted from cipher text.
 *
 * @example Usage
 * ```ts
 * import { decrypt } from "@mogeko/utils/ase-gcm";
 *
 * const cipher = "aca99b97756adc21cf62e71agw1jW7Zmthd9vylHTNYs3vzH2hFthaWmom0D8k4=";
 *
 * await decrypt(cipher, "pa$$w0rd"); // Hello, world!
 * ```
 */
export async function decrypt(cipher: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const iv = Buffer.from(cipher.slice(0, 24), "hex");
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]);

  const ctBuffer = Buffer.from(cipher.slice(24), "base64");
  const plainBuffer = await crypto.subtle.decrypt(alg, key, ctBuffer);

  return new TextDecoder().decode(plainBuffer);
}
