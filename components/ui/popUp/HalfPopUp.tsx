"use client";
import { useEffect } from "react";
import Grid from "../grid";

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
    <Grid
      className={`fixed inset-0 z-50 flex ${positionClass} items-center pointer-events-none gap-5`}
    >
      <div
        className={`${color || "bg-white"} h-full overflow-y-auto col-span-8 md:col-span-5 lg:col-span-6 shadow-xl transition-transform duration-500 ${translateClass} pointer-events-auto relative`}
      >
        <button
          className={`absolute top-4 right-4 text-xl text-${textColor || "black"} p-2 cursor-pointer`}
          onClick={onClose}
        >
          ×
        </button>
        <div
          className={`flex flex-col overflow-y-auto pb-10 text-${textColor || "black"}`}
        >
          {children}
        </div>
      </div>
    </Grid>
  );
}
