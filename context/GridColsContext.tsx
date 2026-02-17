"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GridColsContextType {
  cols: number;
  setCols: (cols: number) => void;
}

const GridColsContext = createContext<GridColsContextType | undefined>(
  undefined,
);

export function GridColsProvider({ children }: { children: ReactNode }) {
  const [cols, setCols] = useState(6);

  return (
    <GridColsContext.Provider value={{ cols, setCols }}>
      {children}
    </GridColsContext.Provider>
  );
}

export function useGridCols() {
  const context = useContext(GridColsContext);
  if (context === undefined) {
    throw new Error("useGridCols must be used within GridColsProvider");
  }
  return context;
}
