import { describe, expect, it } from "bun:test";
import { decrypt, encrypt } from "@/lib/aes-gcm";

describe("encrypt", () => {
  it("should encrypt plaintext successfully", async () => {
    const plaintext = "Hello, World!";
    const password = "my-secret-password";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });

  it("should produce different ciphertext for same plaintext with different passwords", async () => {
    const plaintext = "Hello, World!";
    const password1 = "password1";
    const password2 = "password2";

    const ciphertext1 = await encrypt(plaintext, password1);
    const ciphertext2 = await encrypt(plaintext, password2);

    expect(ciphertext1).not.toBe(ciphertext2);
  });

  it("should produce different ciphertext for same plaintext with same password (due to random IV)", async () => {
    const plaintext = "Hello, World!";
    const password = "my-password";

    const ciphertext1 = await encrypt(plaintext, password);
    const ciphertext2 = await encrypt(plaintext, password);

    expect(ciphertext1).not.toBe(ciphertext2);
  });

  it("should handle empty plaintext", async () => {
    const plaintext = "";
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });

  it("should handle special characters in plaintext", async () => {
    const plaintext = "Hello 世界! 🚀 @#$%^&*()";
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });

  it("should handle long plaintext", async () => {
    const plaintext = "A".repeat(1000);
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });

  it("should handle empty password", async () => {
    const plaintext = "Hello, World!";
    const password = "";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });

  it("should handle special characters in password", async () => {
    const plaintext = "Hello, World!";
    const password = "p@ssw0rd! 🚀 #$%^&*";

    const ciphertext = await encrypt(plaintext, password);

    expect(ciphertext).toBeDefined();
    expect(typeof ciphertext).toBe("string");
    expect(ciphertext.length).toBeGreaterThan(0);
  });
});

describe("encrypt and decrypt integration", () => {
  it("should decrypt ciphertext successfully", async () => {
    const plaintext = "Hello, World!";
    const password = "my-secret-password";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should handle empty plaintext", async () => {
    const plaintext = "";
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should handle special characters in plaintext", async () => {
    const plaintext = "Hello 世界! 🚀 @#$%^&*()";
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should handle long plaintext", async () => {
    const plaintext = "A".repeat(1000);
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should handle empty password", async () => {
    const plaintext = "Hello, World!";
    const password = "";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should handle special characters in password", async () => {
    const plaintext = "Hello, World!";
    const password = "p@ssw0rd! 🚀 #$%^&*";

    const ciphertext = await encrypt(plaintext, password);
    const decrypted = await decrypt(ciphertext, password);

    expect(decrypted).toBe(plaintext);
  });

  it("should fail with wrong password", async () => {
    const plaintext = "Hello, World!";
    const password = "correct-password";
    const wrongPassword = "wrong-password";

    const ciphertext = await encrypt(plaintext, password);

    await expect(decrypt(ciphertext, wrongPassword)).rejects.toThrow();
  });

  it("should fail with corrupted ciphertext", async () => {
    const plaintext = "Hello, World!";
    const password = "password";

    const ciphertext = await encrypt(plaintext, password);
    const corruptedCiphertext = ciphertext.slice(0, -10); // Remove last 10 characters

    await expect(decrypt(corruptedCiphertext, password)).rejects.toThrow();
  });

  it("should fail with invalid ciphertext format", async () => {
    const password = "password";
    const invalidCiphertext = "invalid-ciphertext-format";

    await expect(decrypt(invalidCiphertext, password)).rejects.toThrow();
  });

  it("should fail with empty ciphertext", async () => {
    const password = "password";

    await expect(decrypt("", password)).rejects.toThrow();
  });

  it("should fail with ciphertext that is too short", async () => {
    const password = "password";
    const shortCiphertext = "abc123"; // Too short to contain IV

    await expect(decrypt(shortCiphertext, password)).rejects.toThrow();
  });
});
