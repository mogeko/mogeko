import { describe, expect, it } from "vitest";
import { iterateHelper } from "@/lib/utils";

describe("iterateHelper", () => {
  it("should iterate over async iterator with current and next values", async () => {
    async function* testGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const iterator = testGenerator();
    const results: Array<[number, number | undefined]> = [];

    for await (const [current, next] of iterateHelper(iterator)) {
      results.push([current, next]);
    }

    expect(results).toEqual([
      [1, 2],
      [2, 3],
      [3, undefined],
    ]);
  });

  it("should handle single item iterator", async () => {
    async function* singleItemGenerator() {
      yield "single";
    }

    const iterator = singleItemGenerator();
    const results: Array<[string, string | undefined]> = [];

    for await (const [current, next] of iterateHelper(iterator)) {
      results.push([current, next]);
    }

    expect(results).toEqual([["single", undefined]]);
  });

  it("should handle empty iterator", async () => {
    async function* emptyGenerator() {
      // No yields
    }

    const iterator = emptyGenerator();
    const results: Array<[any, any]> = [];

    for await (const value of iterateHelper(iterator)) {
      results.push(value);
    }

    // For empty iterator, it yields [undefined, undefined] once
    expect(results).toEqual([[undefined, undefined]]);
  });
});
