"use client";
import Grid from "@/components/ui/grid";
import { useViewMode } from "@/context/ViewModeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <nav>
      <Grid className="pt-3 pr-3 pl-3 md:pr-5 md:pl-5 text-[15px] md:text-[11px] lg:text-[15px] font-SuisseIntl">
        <div className="col-start-1 col-span-1 flex flex-col text-[#AAAAAA]">
          <Link
            className={pathname === "/" ? "text-black" : "hover:text-black"}
            href="/"
          >
            All
          </Link>
          <Link
            className={
              pathname === "/documentaries" ? "text-black" : "hover:text-black"
            }
            href="/documentaries"
          >
            Documentaries
          </Link>
          <Link
            className={
              pathname === "/stories" ? "text-black" : "hover:text-black"
            }
            href="/stories"
          >
            Stories
          </Link>
          <Link
            className={
              pathname === "/diary" ? "text-black" : "hover:text-black"
            }
            href="/diary"
          >
            Diary
          </Link>
          <Link
            className={
              pathname === "/portraits" ? "text-black" : "hover:text-black"
            }
            href="/portraits"
          >
            Portraits
          </Link>
          <Link
            className={
              pathname === "/companies" ? "text-black" : "hover:text-black"
            }
            href="/companies"
          >
            Companies
          </Link>
        </div>
        <div className="col-start-5 md:col-start-7 col-span-2 flex flex-col">
          <div>Index</div>
          {(pathname === "/" ||
            pathname === "/documentaries" ||
            pathname === "/stories" ||
            pathname === "/diary" ||
            pathname === "/portraits" ||
            pathname === "/companies") && (
            <div className="font-PPeditorialNew">
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
          )}
        </div>
        <div className="col-start-10 lg:col-start-12 text-right">
          <Link href="/about">About</Link>
        </div>
      </Grid>
    </nav>
  );
}
