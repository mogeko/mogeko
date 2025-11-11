import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APIErrorCode } from "@/lib/errors";
import { notion } from "@/lib/notion";
import { retrieveUsers } from "@/lib/notion-staffs";

vi.mock("@/lib/notion", () => {
  return {
    notion: {
      users: { retrieve: vi.fn() },
    },
  };
});

vi.mock("next/navigation", () => ({ notFound: vi.fn() }));

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }));

describe("retrieveUsers", () => {
  const mockUserId = "test-user-id";
  const mockUser = {
    id: mockUserId,
    object: "user" as const,
    type: "person" as const,
    name: "Test User",
    avatar_url: "https://example.com/avatar.jpg",
    person: { email: "test@example.com" },
  };

  beforeEach(() => vi.clearAllMocks());

  it("Should be successfully retrieved", async () => {
    vi.mocked(notion.users.retrieve).mockResolvedValue(mockUser as any);

    const result = await retrieveUsers(mockUserId);

    expect(notion.users.retrieve).toHaveBeenCalledWith({
      user_id: mockUserId,
    });
    expect(result).toEqual(mockUser);
  });

  it("Cache tags should be used", async () => {
    vi.mocked(notion.users.retrieve).mockResolvedValue(mockUser as any);

    await retrieveUsers(mockUserId);

    expect(notion.users.retrieve).toHaveBeenCalledWith({
      user_id: mockUserId,
    });
  });

  it("NotFound should be called when returning an ObjectNotFound error", async () => {
    const apiError = new Error("Object not found");
    (apiError as any).code = APIErrorCode.ObjectNotFound;
    vi.mocked(notion.users.retrieve).mockRejectedValue(apiError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow(Error);
    expect(notFound).toHaveBeenCalled();
  });

  it("Should rethrow the error when returning other errors", async () => {
    const apiError = new Error("API Error");
    (apiError as any).code = "SOME_OTHER_ERROR";
    vi.mocked(notion.users.retrieve).mockRejectedValue(apiError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("API Error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Network errors should be handled", async () => {
    const networkError = new Error("Network error");
    vi.mocked(notion.users.retrieve).mockRejectedValue(networkError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("Network error");
    expect(notFound).not.toHaveBeenCalled();
  });

  it("Authentication errors should be handled", async () => {
    const authError = new Error("Unauthorized");
    (authError as any).code = APIErrorCode.Unauthorized;
    vi.mocked(notion.users.retrieve).mockRejectedValue(authError);

    await expect(retrieveUsers(mockUserId)).rejects.toThrow("Unauthorized");
    expect(notFound).not.toHaveBeenCalled();
  });
});
