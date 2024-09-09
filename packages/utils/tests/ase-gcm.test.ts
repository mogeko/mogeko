import { decrypt, encrypt } from "@/ase-gcm";
import { describe, expect, it } from "vitest";

describe("ase-gcm", () => {
  it("encrypts and decrypts a string", async () => {
    const plaintext = "hello world";
    const password = "pa$$w0rd";

    const ciphertext = await encrypt(plaintext, password);
    const result = await decrypt(ciphertext, password);

    expect(ciphertext).not.toEqual(plaintext);
    expect(result).toEqual(plaintext);
  });
});
