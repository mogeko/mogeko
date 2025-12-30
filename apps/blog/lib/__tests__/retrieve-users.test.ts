import type { UserObjectResponse } from "@notionhq/client";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

const notion = { users: { retrieve: vi.fn() } };

vi.mock("@/lib/notion", () => ({ notion }));
vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));
vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

const { retrieveUsers } = await import("@/lib/notion-staffs");

const mockUserId = "test-user-id";
const mockUser: UserObjectResponse = {
  id: mockUserId,
  object: "user" as const,
  type: "person" as const,
  name: "Test User",
  avatar_url: "https://example.com/avatar.jpg",
  person: { email: "test@example.com" },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("retrieveUsers", () => {
  it("Should be successfully retrieved", async () => {
    notion.users.retrieve.mockResolvedValue(mockUser);

    const result = await retrieveUsers(mockUserId);

    expect(notion.users.retrieve).toHaveBeenCalledWith({
      user_id: mockUserId,
    });
    expect(result).toEqual(mockUser);
  });

  it("Cache tags should be used", async () => {
    notion.users.retrieve.mockResolvedValue(mockUser);

    await retrieveUsers(mockUserId);

    expect(notion.users.retrieve).toHaveBeenCalledWith({
      user_id: mockUserId,
    });
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new NotFoundError("Object not found");

    notion.users.retrieve.mockRejectedValue(apiError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");

    notion.users.retrieve.mockRejectedValue(apiError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");

    notion.users.retrieve.mockRejectedValue(networkError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new UnauthorizedError("Unauthorized");

    notion.users.retrieve.mockRejectedValue(authError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });
});
