"use client";

import { useKeyPress } from "@/lib/use-keypress";
import { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";

const FOCUSEABLE_SELECTORS = `
  button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]),
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;

const FocusableElementsCtx = createContext<Array<HTMLElement>>([]);

function isFocusableElement(element: EventTarget | null) {
  if (!element || !(element instanceof HTMLElement)) return false;

  return element.matches(FOCUSEABLE_SELECTORS);
}

export const GlobalHotkey: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [elements, setElements] = useState<Array<HTMLElement>>([]);

  useEffect(() => {
    const focusableElements = Array.from(
      document.querySelectorAll<HTMLElement>(FOCUSEABLE_SELECTORS),
    );
    setElements(focusableElements);
  }, []);

  const onHandlePreviousFocus = useCallback(
    (event: Event) => {
      const target = event.target;

      if (isFocusableElement(target)) {
        event.preventDefault();

        for (let i = 0; i < elements.length; i++) {
          if (elements[i] === target) {
            elements[(i - 1 + elements.length) % elements.length].focus();
            break;
          }
        }
      }
    },
    [elements],
  );

  const onHandleNextFocus = useCallback(
    (event: Event) => {
      const target = event.target;

      if (isFocusableElement(target)) {
        event.preventDefault();

        for (let i = 0; i < elements.length; i++) {
          if (elements[i] === target) {
            elements[(i + 1) % elements.length].focus();
            break;
          }
        }
      }
    },
    [elements],
  );

  useKeyPress("ArrowUp", onHandlePreviousFocus);
  useKeyPress("ArrowDown", onHandleNextFocus);

  return (
    <FocusableElementsCtx.Provider value={elements}>
      {children}
    </FocusableElementsCtx.Provider>
  );
};

export const useFocusableDOMs = () => useContext(FocusableElementsCtx);
