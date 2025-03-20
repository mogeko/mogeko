"use client";

import { useEffect } from "react";

type CbFn = (e: Event) => any;
type Options = {
  event?: string;
  eventOptions?: Record<string, unknown>;
};

export function useKeyPress(key: string, cb: CbFn, options: Options = {}) {
  const { event = "keydown", eventOptions = {} } = options;

  useEffect(() => {
    const handler = (event: Event) => {
      "key" in event && event.key === key && cb(event);
    };

    window.addEventListener(event, handler, eventOptions);

    return () => {
      window.removeEventListener(event, handler, eventOptions);
    };
  }, [key, event, eventOptions, cb]);
}
