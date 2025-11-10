import { Redis } from "@upstash/redis";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@upstash/redis", () => ({
  Redis: {
    fromEnv: vi.fn(),
  },
}));

vi.mock("server-only", () => ({}));

describe("redis", () => {
  beforeEach(async () => vi.clearAllMocks());

  it("should export a Redis instance created with fromEnv", async () => {
    const mockRedisInstance = { hset: vi.fn(), hgetall: vi.fn() };

    vi.mocked(Redis.fromEnv).mockReturnValue(mockRedisInstance as any);

    const { redis } = await import("@/lib/redis");

    expect(Redis.fromEnv).toHaveBeenCalledTimes(1);
    expect(redis).toBe(mockRedisInstance);
  });

  it("should have basic Redis methods available", async () => {
    const mockRedisInstance = { hset: vi.fn(), hgetall: vi.fn() };

    vi.mocked(Redis.fromEnv).mockReturnValue(mockRedisInstance as any);

    const { redis } = await import("@/lib/redis");

    expect(typeof redis.hset).toBe("function");
    expect(typeof redis.hgetall).toBe("function");
  });
});
