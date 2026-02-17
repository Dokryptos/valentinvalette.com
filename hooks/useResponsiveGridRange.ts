"use client";

import { useState, useEffect } from "react";

interface RangeValues {
  min: number;
  max: number;
}

export function useResponsiveGridRange(): RangeValues {
  const [rangeValues, setRangeValues] = useState<RangeValues>({
    min: 2,
    max: 6,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Mobile: 1-2
      if (width < 768) {
        setRangeValues({ min: 1, max: 2 });
      }
      // Tablet: 2-4
      else if (width < 1024) {
        setRangeValues({ min: 2, max: 4 });
      }
      // Large: 2-6
      else {
        setRangeValues({ min: 2, max: 6 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return rangeValues;
}
