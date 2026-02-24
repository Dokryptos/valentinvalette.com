"use client";
import Grid from "@/components/ui/grid";
import { useViewMode } from "@/context/ViewModeContext";
import { useGridCols } from "@/context/GridColsContext";
import { useResponsiveGridRange } from "@/hooks/useResponsiveGridRange";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { viewMode, setViewMode } = useViewMode();
  const { cols, setCols } = useGridCols();
  const { min, max } = useResponsiveGridRange();

  const categories = [
    { label: "All", href: "/" },
    { label: "Documentaries", href: "/documentaries" },
    { label: "Stories", href: "/stories" },
    { label: "Diary", href: "/diary" },
    { label: "Portraits", href: "/portraits" },
    { label: "Companies", href: "/companies" },
  ];

  const isAboutPage = pathname.startsWith("/about");
  const isCategoryPage = categories.some((cat) => pathname === cat.href);

  return (
    <nav>
      <Grid className="pt-3 pr-3 pl-3 md:pr-5 md:pl-5 text-[11px] lg:text-[15px] font-SuisseIntl">
        <div className="col-start-1 col-span-2 flex flex-col text-[#AAAAAA]">
          {isAboutPage ? (
            // Si on est dans About
            <Link href="/" className="text-black font-SuisseIntl">
              Valentin Valette
            </Link>
          ) : isCategoryPage ? (
            // Si on est sur une page de catégorie (Home, Documentaries, etc.)
            <div className="flex flex-col text-[#AAAAAA]">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  className={
                    pathname === cat.href ? "text-black" : "hover:text-black"
                  }
                  href={cat.href}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          ) : null}
          {/* Note : "null" signifie que rien ne s'affiche sur les autres pages (ex: une page projet) */}
        </div>
        <div className="col-start-5 md:col-start-7 col-span-2 flex flex-col">
          <div>Index</div>
          {(pathname === "/" ||
            pathname === "/documentaries" ||
            pathname === "/stories" ||
            pathname === "/diary" ||
            pathname === "/portraits" ||
            pathname === "/companies") && (
            <div className="font-PPeditorialNew flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex gap-2">
                <button
                  className={`hover:text-black cursor-pointer ${viewMode === "list" ? "text-black" : "text-[#AAAAAA]"}`}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
                <span className="pr-1 pl-1 text-[#AAAAAA]">/</span>
                <button
                  className={`hover:text-black cursor-pointer ${viewMode === "grid" ? "text-black" : "text-[#AAAAAA]"}`}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </button>
              </div>
              {viewMode === "grid" && (
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step="1"
                    value={cols}
                    onChange={(e) => setCols(parseInt(e.target.value))}
                    className="w-20 h-[1] bg-black rounded-lg appearance-none cursor-pointer accent-[#D9D9D9]"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-start-8 md:col-start-10 lg:col-start-12 text-right">
          <Link href="/about/biographie">About</Link>
        </div>
      </Grid>
    </nav>
  );
}
