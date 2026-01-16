import { describe, expect, it, mock } from "bun:test";
import { tap } from "@/tap";

describe("tap", () => {
  it("calls the function with the value", () => {
    const fn = mock();
    const result = tap(fn)(1);

    expect(fn).toHaveBeenCalledWith(1);
    expect(result).toBe(1);
  });
});
