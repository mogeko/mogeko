import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { QueryDataSourceResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

const notion = { dataSources: { query: mock() } };

mock.module("@/lib/notion", () => ({ notion }));
mock.module("next/cache", () => ({ cacheLife: mock(), cacheTag: mock() }));
mock.module("next/navigation", () => ({ notFound: mock() }));

const { queryDataSources } = await import("@/lib/notion-staffs");

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

beforeEach(() => {
  mock.clearAllMocks();
});

describe("queryDataSources", () => {
  it("Should be successfully queried", async () => {
    notion.dataSources.query.mockResolvedValue(mockQueryResult);

    const result = await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockQueryResult);
  });

  it("Cache tags should be used", async () => {
    notion.dataSources.query.mockResolvedValue(mockQueryResult);

    await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    notion.dataSources.query.mockRejectedValue(apiError);

    await expect(queryDataSources(mockParams)).rejects.toThrow(NotFoundError);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    notion.dataSources.query.mockRejectedValue(apiError);

    await expect(queryDataSources(mockParams)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");

    notion.dataSources.query.mockRejectedValue(networkError);

    await expect(queryDataSources(mockParams)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    notion.dataSources.query.mockRejectedValue(authError);

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

    notion.dataSources.query.mockResolvedValue(mockQueryResult);

    const result = await queryDataSources(complexParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(complexParams);
    expect(result).toEqual(mockQueryResult);
  });
});
