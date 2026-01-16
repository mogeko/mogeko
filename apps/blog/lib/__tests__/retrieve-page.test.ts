import { beforeEach, describe, expect, it, mock } from "bun:test";
import type { PageObjectResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

const notion = { pages: { retrieve: mock() } };

mock.module("@/lib/notion", () => ({ notion }));
mock.module("next/cache", () => ({ cacheLife: mock(), cacheTag: mock() }));
mock.module("next/navigation", () => ({ notFound: mock() }));

const { retrievePage } = await import("@/lib/notion-staffs");

const mockPageId = "test-page-id";
const mockPage = {
  id: mockPageId,
  object: "page" as const,
  created_time: "2023-01-01T00:00:00.000Z",
  last_edited_time: "2023-01-01T00:00:00.000Z",
  archived: false,
  parent: { type: "database_id" as const, database_id: "test-database-id" },
  properties: {},
  url: "https://notion.so/test-page",
  public_url: null,
  icon: null,
  cover: null,
} as PageObjectResponse;

beforeEach(() => {
  mock.clearAllMocks();
});

describe("retrievePage", () => {
  it("Should be successfully retrieved", async () => {
    notion.pages.retrieve.mockResolvedValue(mockPage);

    const result = await retrievePage(mockPageId);

    expect(notion.pages.retrieve).toHaveBeenCalledWith({
      page_id: mockPageId,
    });
    expect(result).toEqual(mockPage);
  });

  it("NotFoundError should be thrown when the page ID is empty", async () => {
    await expect(retrievePage(undefined)).rejects.toThrow(NotFoundError);
    await expect(retrievePage("")).rejects.toThrow(NotFoundError);
    expect(notion.pages.retrieve).not.toHaveBeenCalled();
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    notion.pages.retrieve.mockRejectedValue(apiError);

    await expect(retrievePage(mockPageId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    notion.pages.retrieve.mockRejectedValue(apiError);

    await expect(retrievePage(mockPageId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Undefined should be returned when an incomplete page object is returned", async () => {
    const partialPage = {
      ...mockPage,
      object: "partial_page" as const,
    } as unknown as PageObjectResponse;

    notion.pages.retrieve.mockResolvedValue(partialPage);

    const result = await retrievePage(mockPageId);

    expect(result).toBeUndefined();
  });

  it("Cache tags should be used", async () => {
    notion.pages.retrieve.mockResolvedValue(mockPage);

    await retrievePage(mockPageId);

    expect(notion.pages.retrieve).toHaveBeenCalledWith({
      page_id: mockPageId,
    });
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");

    notion.pages.retrieve.mockRejectedValue(networkError);

    await expect(retrievePage(mockPageId)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    notion.pages.retrieve.mockRejectedValue(authError);

    await expect(retrievePage(mockPageId)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });
});
