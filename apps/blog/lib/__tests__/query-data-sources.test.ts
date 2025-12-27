import type { QueryDataSourceResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

vi.mock("@/lib/notion", () => {
  return {
    notion: { dataSources: { query: vi.fn() } },
  };
});

const { notion } = await import("@/lib/notion");

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

const mockDataSourceId = "test-data-source-id";
const mockParams = {
  data_source_id: mockDataSourceId,
  filter: { property: "Status", status: { equals: "Published" } },
};
const mockQueryResult: QueryDataSourceResponse = {
  type: "page_or_data_source" as const,
  page_or_data_source: {},
  object: "list" as const,
  results: [
    {
      id: "result-1",
      object: "data_source" as const,
      properties: {
        Title: {
          type: "title",
          name: "Example Title",
          id: "1",
          description: null,
          title: {},
        },
      },
    },
  ],
  next_cursor: null,
  has_more: false,
};

describe("queryDataSources", () => {
  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully queried", async () => {
    vi.mocked(notion.dataSources).query.mockResolvedValue(mockQueryResult);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    const result = await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockQueryResult);
  });

  it("Cache tags should be used", async () => {
    vi.mocked(notion.dataSources).query.mockResolvedValue(mockQueryResult);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    vi.mocked(notion.dataSources).query.mockRejectedValue(apiError);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    await expect(queryDataSources(mockParams)).rejects.toThrow(NotFoundError);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    vi.mocked(notion.dataSources).query.mockRejectedValue(apiError);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    await expect(queryDataSources(mockParams)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");

    vi.mocked(notion.dataSources).query.mockRejectedValue(networkError);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    await expect(queryDataSources(mockParams)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    vi.mocked(notion.dataSources).query.mockRejectedValue(authError);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    await expect(queryDataSources(mockParams)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Should handle different query parameters", async () => {
    const complexParams = {
      data_source_id: mockDataSourceId,
      filter: {
        and: [
          { property: "Status", status: { equals: "Published" } },
          { property: "Category", select: { equals: "Tech" } },
        ],
      },
      sorts: [{ property: "Created", direction: "descending" as const }],
      page_size: 50,
    };

    vi.mocked(notion.dataSources).query.mockResolvedValue(mockQueryResult);

    const { queryDataSources } = await import("@/lib/notion-staffs");

    const result = await queryDataSources(complexParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(complexParams);
    expect(result).toEqual(mockQueryResult);
  });
});
