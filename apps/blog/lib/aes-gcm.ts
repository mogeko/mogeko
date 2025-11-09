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
 * import { decrypt, encrypt } from "@/lib/aes-gcm";
 *
 * const cipher = await encrypt("Hello, world!", "pa$$w0rd");
 *
 * await decrypt(cipher, "pa$$w0rd"); // Hello, world!
 * ```
 *
 * @module
 */

import { crypto } from "@std/crypto/crypto";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
import { decodeHex, encodeHex } from "@std/encoding/hex";

/**
 * Encrypt plain text to cipher text with AES-GCM algorithm.
 *
 * @param plain Plain text that needs to be encrypted.
 * @param passwd The password used for encryption.
 * @returns Cipher text encrypted with AES-GCM algorithm.
 *
 * @example Usage
 * ```ts
 * import { encrypt } from "@/lib/aes-gcm";
 *
 * const cipher = await encrypt("Hello, world!", "pa$$w0rd");
 * ```
 */
export async function encrypt(plain: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);

  const ptUint8 = new TextEncoder().encode(plain);

  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8);

  return encodeHex(iv) + encodeBase64(ctBuffer);
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
 * import { decrypt } from "@/lib/aes-gcm";
 *
 * const cipher = "aca99b97756adc21cf62e71agw1jW7Zmthd9vylHTNYs3vzH2hFthaWmom0D8k4=";
 *
 * await decrypt(cipher, "pa$$w0rd"); // Hello, world!
 * ```
 */
export async function decrypt(cipher: string, passwd: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(passwd);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const alg = { name: "AES-GCM", iv: decodeHex(cipher.slice(0, 24)) };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]);

  const ctUint8 = decodeBase64(cipher.slice(24));

  const ptBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);

  return new TextDecoder().decode(ptBuffer);
}
