import type { DatabaseObjectResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

vi.mock("@/lib/notion", () => {
  return {
    notion: { databases: { retrieve: vi.fn() } },
  };
});

const { notion } = await import("@/lib/notion");

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

const mockDatabaseId = "test-database-id";
const mockDatabase = {
  id: mockDatabaseId,
  title: [{ title: [{ text: { content: "Test Database" } }] }],
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
} as unknown as DatabaseObjectResponse;

describe("retrieveDatabase", () => {
  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully retrieved", async () => {
    vi.mocked(notion.databases).retrieve.mockResolvedValue(mockDatabase);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    const result = await retrieveDatabase(mockDatabaseId);

    expect(notion.databases.retrieve).toHaveBeenCalledWith({
      database_id: mockDatabaseId,
    });
    expect(result).toEqual(mockDatabase);
  });

  it("NotFoundError should be thrown when the database ID is empty", async () => {
    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await expect(retrieveDatabase(undefined)).rejects.toThrow(NotFoundError);
    await expect(retrieveDatabase("")).rejects.toThrow(NotFoundError);
    expect(notion.databases.retrieve).not.toHaveBeenCalled();
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    vi.mocked(notion.databases).retrieve.mockRejectedValue(apiError);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    vi.mocked(notion.databases).retrieve.mockRejectedValue(apiError);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Undefined should be returned when an incomplete database object is returned", async () => {
    const partialDatabase = {
      ...mockDatabase,
      object: "partial_database" as const,
    } as unknown as DatabaseObjectResponse;

    vi.mocked(notion.databases).retrieve.mockResolvedValue(partialDatabase);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    const result = await retrieveDatabase(mockDatabaseId);

    expect(result).toBeUndefined();
  });

  it("Cache tags should be used", async () => {
    vi.mocked(notion.databases).retrieve.mockResolvedValue(mockDatabase);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await retrieveDatabase(mockDatabaseId);

    expect(notion.databases.retrieve).toHaveBeenCalledWith({
      database_id: mockDatabaseId,
    });
  });

  it("Network errors should be handled.", async () => {
    const networkError = new Error("Network error");

    vi.mocked(notion.databases).retrieve.mockRejectedValue(networkError);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(
      "Network error",
    );
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    vi.mocked(notion.databases).retrieve.mockRejectedValue(authError);

    const { retrieveDatabase } = await import("@/lib/notion-staffs");

    await expect(retrieveDatabase(mockDatabaseId)).rejects.toThrow(
      "Unauthorized",
    );
    expect(notFound).not.toHaveBeenCalled();
  });
});
