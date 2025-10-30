import { APIErrorCode } from "@notionhq/client";

export class NotFoundError extends Error {
  readonly code = APIErrorCode.ObjectNotFound;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }

  static isNotFoundError(err: unknown): err is NotFoundError {
    return (
      err instanceof Error &&
      (("code" in err && err.code === APIErrorCode.ObjectNotFound) ||
        err.name === "NotFoundError")
    );
  }
}

export { APIErrorCode };
