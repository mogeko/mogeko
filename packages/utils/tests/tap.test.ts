import { afterAll, describe, expect, it, vi } from "vitest";
import { tap } from "@/tap";

describe("tap", () => {
  afterAll(() => {
    vi.resetAllMocks();
  });

  it("calls the function with the value", () => {
    const fn = vi.fn();
    const result = tap(fn)(1);

    expect(fn).toHaveBeenCalledWith(1);
    expect(result).toBe(1);
  });
});
