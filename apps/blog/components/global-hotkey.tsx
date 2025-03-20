"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

const FOCUSEABLE_SELECTORS = `
  button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;
function isFocusableElement(element: EventTarget | null) {
  if (!element || !(element instanceof HTMLElement)) return false;

  return element.matches(FOCUSEABLE_SELECTORS);
}

export const GlobalHotkey: React.FC = () => {
  const [elements, setElements] = useState<ArrayLike<HTMLElement>>([]);

  useEffect(() => {
    setElements(document.querySelectorAll<HTMLElement>(FOCUSEABLE_SELECTORS));
  }, []);

  const handleKeyPress = useCallback(
    (event: Event) => {
      if (!("key" in event && elements.length)) return;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        if (isFocusableElement(event.target)) {
          event.preventDefault();

          for (let i = 0; i < elements.length; i++) {
            if (elements[i] === event.target) {
              elements[(i - 1 + elements.length) % elements.length].focus();
              break;
            }
          }
        }
      }
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
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
