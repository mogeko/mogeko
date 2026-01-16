import { describe, expect, it, mock } from "bun:test";

mock.module("@/lib/image-helper", () => ({}));
mock.module("server-only", () => ({}));

const { sha1 } = await import("@/components/image");

describe("sha1", () => {
  it("should return hex string for input text", async () => {
    const result = await sha1("hello world");

    expect(typeof result).toBe("string");
    expect(result).toHaveLength(40); // SHA-1 hex string is 40 characters
  });

  it("should return consistent hash for same input", async () => {
    const input = "test string";
    const hash1 = await sha1(input);
    const hash2 = await sha1(input);

    expect(hash1).toBe(hash2);
  });

  it("should return different hashes for different inputs", async () => {
    const hash1 = await sha1("input1");
    const hash2 = await sha1("input2");

    expect(hash1).not.toBe(hash2);
  });

  it("should handle empty string", async () => {
    const result = await sha1("");

    expect(result).toHaveLength(40);
    expect(typeof result).toBe("string");
  });

  it("should handle special characters", async () => {
    const result = await sha1("!@#$%^&*()_+-=[]{}|;':,.<>?");

    expect(result).toHaveLength(40);
  });

  it("should handle unicode characters", async () => {
    const result = await sha1("你好世界");

    expect(result).toHaveLength(40);
  });

  it("should handle long strings", async () => {
    const longString = "a".repeat(10000);

    const result = await sha1(longString);

    expect(result).toHaveLength(40);
  });

  it("should return lowercase hex string", async () => {
    const result = await sha1("test");

    expect(result).toBe(result.toLowerCase());
  });

  it("should match known SHA-1 hash", async () => {
    // SHA-1 hash of "hello world"
    const expectedHash = "2aae6c35c94fcfb415dbe95f408b9ce91ee846ed";

    const result = await sha1("hello world");

    expect(result).toBe(expectedHash);
  });

  it("should handle URLs", async () => {
    const url = "https://example.com/path?query=value";

    const result = await sha1(url);

    expect(result).toHaveLength(40);
  });
});
