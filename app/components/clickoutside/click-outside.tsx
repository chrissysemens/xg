import React from "react";

import { useEffect, useRef } from "react";

type ClickOutsideProps = {
  children: React.ReactNode;
  action: () => void;
};

export const ClickOutside = ({ children, action }: ClickOutsideProps) => {
  const clickAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.target &&
      clickAreaRef.current &&
      !clickAreaRef.current.contains(event.target as Element)
    ) {
      action();
    }
  };
  return (
    <div
      data-testid="click-outside"
      ref={clickAreaRef}
      style={{ width: "fit-content" }}
    >
      {children}
    </div>
  );
};
