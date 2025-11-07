import { describe, expect, it } from "vitest";
import { colorVariants } from "@/lib/colors";

describe("colorVariants", () => {
  it("should return empty string for default color", () => {
    const result = colorVariants();
    expect(result).toBe("");
  });

  it("should return correct class for blue color", () => {
    const result = colorVariants({ color: "blue" });
    expect(result).toContain("text-blue-700");
  });

  it("should return correct class for blue background", () => {
    const result = colorVariants({ color: "blue_background" });
    expect(result).toContain("bg-blue-300");
  });

  it("should return correct class for red color", () => {
    const result = colorVariants({ color: "red" });
    expect(result).toContain("text-red-700");
  });

  it("should return correct class for green background", () => {
    const result = colorVariants({ color: "green_background" });
    expect(result).toContain("bg-green-300");
  });

  it("should handle null for default variants", () => {
    const result = colorVariants({ color: "default" });
    expect(result).toBe("");
  });

  it("should handle null for default_background", () => {
    const result = colorVariants({ color: "default_background" });
    expect(result).toBe("");
  });
});
