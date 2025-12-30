import { beforeEach, describe, expect, it, vi } from "vitest";

const mockRedisInstance = { hset: vi.fn(), hgetall: vi.fn() };
const Redis = {
  fromEnv: vi.fn().mockReturnValue(mockRedisInstance),
};

vi.mock("@upstash/redis", () => ({ Redis }));
vi.mock("server-only", () => ({}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("redis", () => {
  it("should export a Redis instance created with fromEnv", async () => {
    const { redis } = await import("@/lib/redis");

    expect(Redis.fromEnv).toHaveBeenCalledTimes(1);
    expect(redis).toBe(mockRedisInstance);
  });

  it("should have basic Redis methods available", async () => {
    const { redis } = await import("@/lib/redis");

    expect(typeof redis.hset).toBe("function");
    expect(typeof redis.hgetall).toBe("function");
  });
});
