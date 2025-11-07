import { describe, expect, it } from "vitest";
import { groupBy } from "@/lib/utils";

describe("groupBy", () => {
  it("should group items by key selector", () => {
    const items = [
      { id: 1, category: "A" },
      { id: 2, category: "B" },
      { id: 3, category: "A" },
      { id: 4, category: "C" },
      { id: 5, category: "B" },
    ];

    const result = groupBy(items, (item) => item.category);

    expect(result).toEqual([
      [
        "A",
        [
          { id: 1, category: "A" },
          { id: 3, category: "A" },
        ],
      ],
      [
        "B",
        [
          { id: 2, category: "B" },
          { id: 5, category: "B" },
        ],
      ],
      ["C", [{ id: 4, category: "C" }]],
    ]);
  });

  it("should handle empty array", () => {
    const result = groupBy([], (item) => item);
    expect(result).toEqual([]);
  });

  it("should use index in key selector", () => {
    const items = ["a", "b", "c"];
    const result = groupBy(items, (_, index) => index % 2);

    expect(result).toEqual([
      [0, ["a", "c"]],
      [1, ["b"]],
    ]);
  });

  it("should group by numeric keys", () => {
    const items = [1, 2, 3, 4, 5];
    const result = groupBy(items, (item) => item % 2);

    expect(result).toEqual([
      [1, [1, 3, 5]],
      [0, [2, 4]],
    ]);
  });

  it("should maintain insertion order", () => {
    const items = [
      { type: "fruit", name: "apple" },
      { type: "vegetable", name: "carrot" },
      { type: "fruit", name: "banana" },
    ];

    const result = groupBy(items, (item) => item.type);

    expect(result[0][0]).toBe("fruit");
    expect(result[1][0]).toBe("vegetable");
  });
});
