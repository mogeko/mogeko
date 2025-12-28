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
