"use client";
import { useEffect } from "react";

interface FullPagePopupProps {
  open: boolean;
  onClose: () => void;
  direction?: "left" | "right";
  color?: string;
  textColor?: string;
  children: React.ReactNode;
}

export default function FullPagePopup({
  open,
  onClose,
  direction = "right",
  color,
  textColor,
  children,
}: FullPagePopupProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const translateClass =
    direction === "right"
      ? open
        ? "translate-x-0"
        : "translate-x-full"
      : open
        ? "translate-x-0"
        : "-translate-x-full";

  const positionClass =
    direction === "right" ? "right-0 justify-end" : "left-0 justify-start";

  return (
    <div
      className={`fixed inset-0 z-50 flex ${positionClass} items-center pointer-events-none`}
    >
      <div
        className={`${color || "bg-white"} h-full w-full md:w-1/2 shadow-xl transition-transform duration-500 ${translateClass} pointer-events-auto relative`}
      >
        <button
          className={`absolute top-4 right-4 text-xl text-${textColor || "black"}`}
          onClick={onClose}
        >
          ×
        </button>
        <div
          className={`h-full w-full flex flex-col text-${textColor || "black"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
