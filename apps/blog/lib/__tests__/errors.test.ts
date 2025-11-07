import { describe, expect, it } from "vitest";
import { APIErrorCode, NotFoundError, UnauthorizedError } from "@/lib/errors";

describe("NotFoundError", () => {
  it("should create NotFoundError with correct properties", () => {
    const message = "Resource not found";
    const error = new NotFoundError(message);

    expect(error).toBeInstanceOf(NotFoundError);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("NotFoundError");
    expect(error.message).toBe(message);
    expect(error.code).toBe(APIErrorCode.ObjectNotFound);
  });

  it("should identify NotFoundError instances correctly", () => {
    const notFoundError = new NotFoundError("Not found");
    const otherError = new Error("Other error");
    const unauthorizedError = new UnauthorizedError("Unauthorized");

    expect(NotFoundError.isNotFoundError(notFoundError)).toBe(true);
    expect(NotFoundError.isNotFoundError(otherError)).toBe(false);
    expect(NotFoundError.isNotFoundError(unauthorizedError)).toBe(false);
    expect(NotFoundError.isNotFoundError(null)).toBe(false);
    expect(NotFoundError.isNotFoundError(undefined)).toBe(false);
    expect(NotFoundError.isNotFoundError("string")).toBe(false);
    expect(NotFoundError.isNotFoundError({})).toBe(false);
  });

  it("should identify NotFoundError by code", () => {
    const errorWithCode = new Error("Some error");
    (errorWithCode as any).code = APIErrorCode.ObjectNotFound;

    expect(NotFoundError.isNotFoundError(errorWithCode)).toBe(true);
  });

  it("should identify NotFoundError by name", () => {
    const errorWithName = new Error("Some error");
    errorWithName.name = "NotFoundError";

    expect(NotFoundError.isNotFoundError(errorWithName)).toBe(true);
  });
});

describe("UnauthorizedError", () => {
  it("should create UnauthorizedError with correct properties", () => {
    const message = "Access denied";
    const error = new UnauthorizedError(message);

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("UnauthorizedError");
    expect(error.message).toBe(message);
    expect(error.code).toBe(APIErrorCode.Unauthorized);
  });

  it("should identify UnauthorizedError instances correctly", () => {
    const unauthorizedError = new UnauthorizedError("Unauthorized");
    const otherError = new Error("Other error");
    const notFoundError = new NotFoundError("Not found");

    expect(UnauthorizedError.isUnauthorizedError(unauthorizedError)).toBe(true);
    expect(UnauthorizedError.isUnauthorizedError(otherError)).toBe(false);
    expect(UnauthorizedError.isUnauthorizedError(notFoundError)).toBe(false);
    expect(UnauthorizedError.isUnauthorizedError(null)).toBe(false);
    expect(UnauthorizedError.isUnauthorizedError(undefined)).toBe(false);
    expect(UnauthorizedError.isUnauthorizedError("string")).toBe(false);
    expect(UnauthorizedError.isUnauthorizedError({})).toBe(false);
  });

  it("should identify UnauthorizedError by code", () => {
    const errorWithCode = new Error("Some error");
    (errorWithCode as any).code = APIErrorCode.Unauthorized;

    expect(UnauthorizedError.isUnauthorizedError(errorWithCode)).toBe(true);
  });

  it("should identify UnauthorizedError by name", () => {
    const errorWithName = new Error("Some error");
    errorWithName.name = "UnauthorizedError";

    expect(UnauthorizedError.isUnauthorizedError(errorWithName)).toBe(true);
  });
});
