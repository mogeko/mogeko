import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("class1", null, "class2")).toBe("class1 class2");
    expect(cn("class1", undefined, "class2")).toBe("class1 class2");
    expect(cn("class1", false, "class2")).toBe("class1 class2");
    expect(cn("class1", true && "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isDisabled = false;

    expect(
      cn("base-class", isActive && "active", isDisabled && "disabled"),
    ).toBe("base-class active");
  });

  it("should merge Tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    expect(cn("text-sm font-bold", "text-lg")).toBe("font-bold text-lg");
  });

  it("should handle arrays of class names", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
    expect(cn(["class1", null, "class2"], ["class3", undefined])).toBe(
      "class1 class2 class3",
    );
  });
});
