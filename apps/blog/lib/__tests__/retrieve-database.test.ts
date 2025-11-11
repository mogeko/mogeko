import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIErrorCode, NotFoundError } from "@/lib/errors";
import { notion } from "@/lib/notion";
import { retrieveDatabase } from "@/lib/notion-staffs";

vi.mock("@/lib/notion", () => {
  return {
    notion: {
      databases: { retrieve: vi.fn() },
    },
  };
});

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

describe("retrieveDatabase", () => {
  const mockDatabaseId = "test-database-id";
  const mockDatabase = {
    id: mockDatabaseId,
    title: [{ text: { content: "Test Database" } }],
    properties: {},
    object: "database" as const,
    created_time: "2023-01-01T00:00:00.000Z",
    last_edited_time: "2023-01-01T00:00:00.000Z",
    archived: false,
    is_inline: false,
    parent: { type: "workspace" as const, workspace: true },
    url: "https://notion.so/test-database",
    public_url: null,
    icon: null,
    cover: null,
  };

  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully retrieved", async () => {
    vi.mocked(notion.databases.retrieve).mockResolvedValue(mockDatabase);

    const result = await retrieveDatabase(mockDatabaseId);

    expect(notion.databases.retrieve).toHaveBeenCalledWith({
      database_id: mockDatabaseId,
    });
    expect(result).toEqual(mockDatabase);
  });

  it("NotFoundError should be thrown when the database ID is empty", async () => {
    await expect(retrieveDatabase(undefined)).rejects.toThrow(NotFoundError);
    await expect(retrieveDatabase("")).rejects.toThrow(NotFoundError);
    expect(notion.databases.retrieve).not.toHaveBeenCalled();
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new Error("Object not found");
    (apiError as any).code = APIErrorCode.ObjectNotFound;
    vi.mocked(notion.databases.retrieve).mockRejectedValue(apiError);

    // Act & Assert
    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    // Arrange
    const apiError = new Error("API Error");
    (apiError as any).code = "SOME_OTHER_ERROR";
    vi.mocked(notion.databases.retrieve).mockRejectedValue(apiError);

    // Act & Assert
    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Undefined should be returned when an incomplete database object is returned", async () => {
    // Arrange
    const partialDatabase = {
      ...mockDatabase,
      object: "partial_database" as const,
    };
    vi.mocked(notion.databases.retrieve).mockResolvedValue(
      partialDatabase as any,
    );

    // Act
    const result = await retrieveDatabase(mockDatabaseId);

    // Assert
    expect(result).toBeUndefined();
  });

  it("Cache tags should be used", async () => {
    // Arrange
    vi.mocked(notion.databases.retrieve).mockResolvedValue(mockDatabase);

    // Act
    await retrieveDatabase(mockDatabaseId);

    // Assert
    expect(notion.databases.retrieve).toHaveBeenCalledWith({
      database_id: mockDatabaseId,
    });
  });

  it("Network errors should be handled.", async () => {
    // Arrange
    const networkError = new Error("Network error");
    vi.mocked(notion.databases.retrieve).mockRejectedValue(networkError);

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(
      "Network error",
    );
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new Error("Unauthorized");
    (authError as any).code = APIErrorCode.Unauthorized;
    vi.mocked(notion.databases.retrieve).mockRejectedValue(authError);

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(
      "Unauthorized",
    );
    expect(notFound).not.toHaveBeenCalled();
  });
});
