"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface BackgroundColorContextType {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BackgroundColorContext = createContext<BackgroundColorContextType | null>(
  null,
);

export const BackgroundColorProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");

  return (
    <BackgroundColorContext.Provider
      value={{ backgroundColor, setBackgroundColor }}
    >
      {children}
    </BackgroundColorContext.Provider>
  );
};

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    return { backgroundColor: "#ffffff", setBackgroundColor: () => {} };
  }
  return context;
};
