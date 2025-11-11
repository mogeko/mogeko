import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIErrorCode } from "@/lib/errors";
import { notion } from "@/lib/notion";
import { queryDataSources } from "@/lib/notion-staffs";

vi.mock("@/lib/notion", () => {
  return {
    notion: {
      dataSources: { query: vi.fn() },
    },
  };
});

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

describe("queryDataSources", () => {
  const mockDataSourceId = "test-data-source-id";
  const mockParams = {
    data_source_id: mockDataSourceId,
    filter: { property: "Status", status: { equals: "Published" } },
  };
  const mockQueryResult = {
    type: "page_or_database" as const,
    page_or_database: {
      object: "list" as const,
      results: [
        {
          id: "result-1",
          object: "data_source_result" as const,
          properties: {
            Title: { title: [{ text: { content: "Test Result" } }] },
          },
        },
      ],
      next_cursor: null,
      has_more: false,
    },
  };

  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully queried", async () => {
    vi.mocked(notion.dataSources.query).mockResolvedValue(
      mockQueryResult as any,
    );

    const result = await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
    expect(result).toEqual(mockQueryResult);
  });

  it("Cache tags should be used", async () => {
    vi.mocked(notion.dataSources.query).mockResolvedValue(
      mockQueryResult as any,
    );

    await queryDataSources(mockParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(mockParams);
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new Error("Object not found");
    (apiError as any).code = APIErrorCode.ObjectNotFound;
    vi.mocked(notion.dataSources.query).mockRejectedValue(apiError);

    await expect(queryDataSources(mockParams)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");
    (apiError as any).code = "SOME_OTHER_ERROR";
    vi.mocked(notion.dataSources.query).mockRejectedValue(apiError);

    await expect(queryDataSources(mockParams)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");
    vi.mocked(notion.dataSources.query).mockRejectedValue(networkError);

    await expect(queryDataSources(mockParams)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new Error("Unauthorized");
    (authError as any).code = APIErrorCode.Unauthorized;
    vi.mocked(notion.dataSources.query).mockRejectedValue(authError);

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
    vi.mocked(notion.dataSources.query).mockResolvedValue(
      mockQueryResult as any,
    );

    const result = await queryDataSources(complexParams);

    expect(notion.dataSources.query).toHaveBeenCalledWith(complexParams);
    expect(result).toEqual(mockQueryResult);
  });
});
