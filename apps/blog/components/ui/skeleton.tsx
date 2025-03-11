"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const SEQUENCE = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];

export const Skeleton: React.FC<
  Omit<React.HTMLAttributes<HTMLSpanElement>, "children">
> = ({ className, ...props }) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const indexLength = SEQUENCE.length;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % indexLength);
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [indexLength]);

  return (
    <span
      className={cn(
        "inline-block w-[1ch] h-4 text-inherit align-bottom",
        className,
      )}
      {...props}
    >
      {SEQUENCE[index]}
    </span>
  );
};
