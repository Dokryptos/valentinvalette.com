"use client";

import { useBackgroundColor } from "@/context/BackgroundColorContext";
import { useEffect } from "react";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { backgroundColor } = useBackgroundColor();

  useEffect(() => {
    // Appliquer la couleur au body
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.transition = "background-color 0.3s ease";
  }, [backgroundColor]);

  return <>{children}</>;
}
