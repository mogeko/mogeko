import { beforeEach, describe, expect, it, vi } from "vitest";
import { tryCatch } from "@/try-catch";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("tryCatch", () => {
  it("should catch the error", () => {
    const tryer = vi.fn((_) => {
      throw "this is not a valid value";
    });
    const catcher = vi.fn((error: any, value: string) => ({ error, value }));
    const result = tryCatch(tryer, catcher)("bar");

    expect(tryer).toHaveBeenCalledWith("bar");
    expect(catcher).toHaveBeenCalledWith("this is not a valid value", "bar");
    expect(result).toEqual({
      error: "this is not a valid value",
      value: "bar",
    });
  });

  it("should return the value", () => {
    const tryer = vi.fn((value: string) => value);
    const catcher = vi.fn();
    const result = tryCatch(tryer, catcher)("bar");

    expect(tryer).toHaveBeenCalledWith("bar");
    expect(catcher).not.toHaveBeenCalled();
    expect(result).toBe("bar");
  });
});
