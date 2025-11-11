import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIErrorCode } from "@/lib/errors";
import { notion } from "@/lib/notion";
import { queryBlocks } from "@/lib/notion-staffs";

vi.mock("@/lib/notion", () => {
  return {
    notion: {
      blocks: { children: { list: vi.fn() } },
    },
  };
});

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

describe("queryBlocks", () => {
  const mockBlockId = "test-block-id";
  const mockParams = {
    block_id: mockBlockId,
    page_size: 100,
  };
  const mockBlocksResult = {
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

  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully queried", async () => {
    vi.mocked(notion.blocks.children.list).mockResolvedValue(
      mockBlocksResult as any,
    );

    const result = await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockBlocksResult);
  });

  it("Cache tags should be used", async () => {
    vi.mocked(notion.blocks.children.list).mockResolvedValue(
      mockBlocksResult as any,
    );

    await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new Error("Object not found");
    (apiError as any).code = APIErrorCode.ObjectNotFound;
    vi.mocked(notion.blocks.children.list).mockRejectedValue(apiError);

    await expect(queryBlocks(mockParams)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");
    (apiError as any).code = "SOME_OTHER_ERROR";
    vi.mocked(notion.blocks.children.list).mockRejectedValue(apiError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");
    vi.mocked(notion.blocks.children.list).mockRejectedValue(networkError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new Error("Unauthorized");
    (authError as any).code = APIErrorCode.Unauthorized;
    vi.mocked(notion.blocks.children.list).mockRejectedValue(authError);

    await expect(queryBlocks(mockParams)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Should handle different block query parameters", async () => {
    const complexParams = {
      block_id: mockBlockId,
      page_size: 50,
      start_cursor: "cursor-123",
    };
    vi.mocked(notion.blocks.children.list).mockResolvedValue(
      mockBlocksResult as any,
    );

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
    vi.mocked(notion.blocks.children.list).mockResolvedValue(
      paginatedResult as any,
    );

    const result = await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(paginatedResult);
    expect(result.has_more).toBe(true);
    expect(result.next_cursor).toBe("next-cursor-123");
  });

  it("Should handle empty block results", async () => {
    const emptyResult = {
      type: "block" as const,
      block: {
        object: "list" as const,
        results: [],
        next_cursor: null,
        has_more: false,
      },
    };
    vi.mocked(notion.blocks.children.list).mockResolvedValue(
      emptyResult as any,
    );

    const result = await queryBlocks(mockParams);

    expect(notion.blocks.children.list).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(emptyResult);
    expect(result.block.results).toHaveLength(0);
  });
});
