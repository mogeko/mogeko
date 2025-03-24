"use client";

import { Fragment, useCallback, useEffect } from "react";

const FOCUSEABLE_SELECTOR = `
  button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;

function isFocusableElement(evt: EventTarget | null): evt is HTMLElement {
  if (!evt || !(evt instanceof HTMLElement)) return false;

  return evt.matches(FOCUSEABLE_SELECTOR);
}

export const GlobalHotkey: React.FC = () => {
  const handleKeyPress = useCallback((event: Event) => {
    if (!isFocusableElement(event.target)) return;

    const els = document.querySelectorAll<HTMLElement>(FOCUSEABLE_SELECTOR);

    if (!els.length || !(event instanceof KeyboardEvent)) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(), event.target.click();
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();

      for (let i = 0; i < els.length; i++) {
        if (els[i] === event.target) {
          els[(i + 1) % els.length].focus();
          break;
        }
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();

      for (let i = 0; i < els.length; i++) {
        if (els[i] === event.target) {
          els[(i - 1 + els.length) % els.length].focus();
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <Fragment />;
};
