"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface GridColsContextType {
  cols: number;
  setCols: (cols: number) => void;
}

const GridColsContext = createContext<GridColsContextType | undefined>(
  undefined,
);

export function GridColsProvider({ children }: { children: ReactNode }) {
  // On commence avec une valeur par défaut "sûre" (ex: 2 pour mobile)
  const [cols, setCols] = useState(2);

  useEffect(() => {
    // Fonction pour définir le nombre de colonnes selon la largeur
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile
        setCols(2);
      } else if (width < 1024) {
        // Tablette
        setCols(4);
      } else {
        // Desktop
        setCols(6);
      }
    };

    // Appeler au montage
    updateCols();

    // Optionnel : écouter le redimensionnement de la fenêtre
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

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
