"use client";

import { Fragment, useCallback, useEffect } from "react";

const FOCUSEABLE_SELECTOR = `
  button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;

function isFocusableElement(e: EventTarget | null): e is HTMLElement {
  if (!e || !(e instanceof HTMLElement)) return false;

  return e.matches(FOCUSEABLE_SELECTOR);
}

export const GlobalHotkey: React.FC = () => {
  const handleKeyPress = useCallback((event: Event) => {
    const els = document.querySelectorAll<HTMLElement>(FOCUSEABLE_SELECTOR);

    if (!(event instanceof KeyboardEvent && els.length)) return;
    if (event.key === "Enter" || event.key === " ") {
      if (isFocusableElement(event.target)) {
        event.preventDefault(), event.target.click();
      }
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFocusableElement(event.target)) {
        event.preventDefault();

        for (let i = 0; i < els.length; i++) {
          if (els[i] === event.target) {
            els[(i - 1 + els.length) % els.length].focus();
            break;
          }
        }
      }
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      if (isFocusableElement(event.target)) {
        event.preventDefault();

        for (let i = 0; i < els.length; i++) {
          if (els[i] === event.target) {
            els[(i + 1) % els.length].focus();
            break;
          }
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
