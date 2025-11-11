import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIErrorCode, NotFoundError } from "@/lib/errors";
import { notion } from "@/lib/notion";
import { retrievePage } from "@/lib/notion-staffs";

vi.mock("@/lib/notion", () => {
  return {
    notion: {
      pages: { retrieve: vi.fn() },
    },
  };
});

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

describe("retrievePage", () => {
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
  };

  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully retrieved", async () => {
    vi.mocked(notion.pages.retrieve).mockResolvedValue(mockPage);

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
    const apiError = new Error("Object not found");
    (apiError as any).code = APIErrorCode.ObjectNotFound;
    vi.mocked(notion.pages.retrieve).mockRejectedValue(apiError);

    // Act & Assert
    await expect(retrievePage(mockPageId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    // Arrange
    const apiError = new Error("API Error");
    (apiError as any).code = "SOME_OTHER_ERROR";
    vi.mocked(notion.pages.retrieve).mockRejectedValue(apiError);

    // Act & Assert
    await expect(retrievePage(mockPageId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Undefined should be returned when an incomplete page object is returned", async () => {
    // Arrange
    const partialPage = {
      ...mockPage,
      object: "partial_page" as const,
    };
    vi.mocked(notion.pages.retrieve).mockResolvedValue(partialPage as any);

    // Act
    const result = await retrievePage(mockPageId);

    // Assert
    expect(result).toBeUndefined();
  });

  it("Cache tags should be used", async () => {
    // Arrange
    vi.mocked(notion.pages.retrieve).mockResolvedValue(mockPage);

    // Act
    await retrievePage(mockPageId);

    // Assert
    expect(notion.pages.retrieve).toHaveBeenCalledWith({
      page_id: mockPageId,
    });
  });

  it("Network errors should be handled", async () => {
    // Arrange
    const networkError = new Error("Network error");
    vi.mocked(notion.pages.retrieve).mockRejectedValue(networkError);

    await expect(retrievePage(mockPageId)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new Error("Unauthorized");
    (authError as any).code = APIErrorCode.Unauthorized;
    vi.mocked(notion.pages.retrieve).mockRejectedValue(authError);

    await expect(retrievePage(mockPageId)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });
});
