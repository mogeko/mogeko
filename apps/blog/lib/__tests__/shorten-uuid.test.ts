import { describe, expect, it } from "bun:test";
import { shortenUUID } from "@/lib/utils";

describe("shortenUUID", () => {
  it("should remove hyphens from 36-character UUID", () => {
    const uuid36 = "12345678-1234-5678-1234-567812345678";
    expect(shortenUUID(uuid36)).toBe("12345678123456781234567812345678");
  });

  it("should return 32-character UUID unchanged", () => {
    const uuid32 = "12345678123456781234567812345678";
    expect(shortenUUID(uuid32)).toBe("12345678123456781234567812345678");
  });

  it("should convert to lowercase", () => {
    const uuidMixedCase = "ABCDEF12-3456-7890-ABCD-EF1234567890";
    expect(shortenUUID(uuidMixedCase)).toBe("abcdef1234567890abcdef1234567890");
  });

  it("should handle whitespace in UUID", () => {
    const uuidWithSpaces = "  12345678-1234-5678-1234-567812345678  ";
    // The function doesn't trim before checking length, so this will be undefined
    expect(shortenUUID(uuidWithSpaces)).toBeUndefined();
  });

  it("should return undefined for invalid UUID lengths", () => {
    expect(shortenUUID("short")).toBeUndefined();
    expect(shortenUUID("very-long-string-that-is-not-a-uuid")).toBeUndefined();
    expect(shortenUUID("12345678-1234-5678-1234")).toBeUndefined();
  });

  it("should return undefined for undefined input", () => {
    expect(shortenUUID(undefined)).toBeUndefined();
  });

  it("should return undefined for null input", () => {
    expect(shortenUUID(null as any)).toBeUndefined();
  });

  it("should handle empty string", () => {
    expect(shortenUUID("")).toBeUndefined();
  });
});
