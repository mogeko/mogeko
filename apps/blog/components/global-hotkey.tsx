"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

const FOCUSEABLE_SELECTORS = `
  button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;

function isFocusableElement(e: EventTarget | null): e is HTMLElement {
  if (!e || !(e instanceof HTMLElement)) return false;

  return e.matches(FOCUSEABLE_SELECTORS);
}

export const GlobalHotkey: React.FC = () => {
  const [elements, setElements] = useState<ArrayLike<HTMLElement>>([]);

  useEffect(() => {
    setElements(document.querySelectorAll<HTMLElement>(FOCUSEABLE_SELECTORS));
  }, []);

  const handleKeyPress = useCallback(
    (event: Event) => {
      if (!(event instanceof KeyboardEvent && elements.length)) return;
      if (event.key === "Enter" || event.key === " ") {
        if (isFocusableElement(event.target)) {
          event.preventDefault(), event.target.click();
        }
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        if (isFocusableElement(event.target)) {
          event.preventDefault();

          for (let i = 0; i < elements.length; i++) {
            if (elements[i] === event.target) {
              elements[(i - 1 + elements.length) % elements.length].focus();
              break;
            }
          }
        }
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        if (isFocusableElement(event.target)) {
          event.preventDefault();

          for (let i = 0; i < elements.length; i++) {
            if (elements[i] === event.target) {
              elements[(i + 1) % elements.length].focus();
              break;
            }
          }
        }
      }
    },
    [elements],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <Fragment />;
};
