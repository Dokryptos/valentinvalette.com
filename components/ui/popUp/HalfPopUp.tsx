"use client";
import { useEffect } from "react";

interface HalfPagePopupProps {
  open: boolean;
  onClose: () => void;
  direction?: "left" | "right";
  color?: string;
  textColor?: string;
  widthClassName?: string;
  children: React.ReactNode;
}

export default function HalfPagePopup({
  open,
  onClose,
  direction = "left",
  color,
  textColor,
  widthClassName,
  children,
}: HalfPagePopupProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const positionClass = direction === "right" ? "right-0" : "left-0";
  const translateClass = open
    ? "translate-x-0"
    : direction === "right"
      ? "translate-x-full"
      : "-translate-x-full";

  return (
    <div className="fixed inset-0 z-80 pointer-events-none ">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          open ? "opacity-20 pointer-events-auto" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`
          absolute top-0 h-full
          ${positionClass}
          w-full ${widthClassName ?? "md:w-[calc(50%-20px)]"}
          ${color || "bg-white"}
          shadow-xl
          overflow-y-auto
          transition-transform duration-500
          pointer-events-auto
          ${translateClass}
        `}
      >
        <button
          className={`absolute top-4 right-4 text-xl text-${textColor || "black"} p-2 cursor-pointer z-10`}
          onClick={onClose}
        >
          ×
        </button>
        <div className={`flex flex-col pb-4 text-${textColor || "black"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
