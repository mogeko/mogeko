import type { ListBlockChildrenResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

const notion = { blocks: { children: { list: vi.fn() } } };

vi.mock("@/lib/notion", () => ({ notion }));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

const { queryBlocks } = await import("@/lib/notion-staffs");

const mockBlockId = "test-block-id";
const mockParams = { block_id: mockBlockId, page_size: 100 };
const mockBlocksResult: ListBlockChildrenResponse = {
  type: "block" as const,
  block: {},
  object: "list" as const,
  results: [
    {
      id: "block-1",
      object: "block" as const,
      type: "paragraph" as const,
      paragraph: {
        rich_text: [
          {
            type: "text" as const,
            text: { content: "Test paragraph content", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default" as const,
            },
            plain_text: "Test paragraph content",
            href: null,
          },
        ],
        color: "default" as const,
      },
      has_children: false,
      archived: false,
    },
    {
      id: "block-2",
      object: "block" as const,
      type: "heading_2" as const,
      heading_2: {
        rich_text: [
          {
            type: "text" as const,
            text: { content: "Test heading", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default" as const,
            },
            plain_text: "Test heading",
            href: null,
          },
        ],
        color: "default" as const,
        is_toggleable: false,
      },
      has_children: false,
      archived: false,
    },
  ],
  next_cursor: null,
  has_more: false,
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("queryBlocks", () => {
  it("Should be successfully queried", async () => {
    notion.blocks.children.list.mockResolvedValue(mockBlocksResult);

    const result = await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockBlocksResult);
  });

  it("Cache tags should be used", async () => {
    notion.blocks.children.list.mockResolvedValue(mockBlocksResult);

    await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    notion.blocks.children.list.mockRejectedValue(apiError);

    await expect(queryBlocks(mockParams)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    notion.blocks.children.list.mockRejectedValue(apiError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");

    notion.blocks.children.list.mockRejectedValue(networkError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    notion.blocks.children.list.mockRejectedValue(authError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Should handle different block query parameters", async () => {
    const complexParams = {
      block_id: mockBlockId,
      page_size: 50,
      start_cursor: "cursor-123",
    };

    notion.blocks.children.list.mockResolvedValue(mockBlocksResult);

    const result = await queryBlocks(complexParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(complexParams);
    expect(result).toEqual(mockBlocksResult);
  });

  it("Should handle paginated results", async () => {
    const paginatedResult = {
      ...mockBlocksResult,
      next_cursor: "next-cursor-123",
      has_more: true,
    };

    notion.blocks.children.list.mockResolvedValue(paginatedResult);

    const result = await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(paginatedResult);
    expect(result.has_more).toBe(true);
    expect(result.next_cursor).toBe("next-cursor-123");
  });
});
