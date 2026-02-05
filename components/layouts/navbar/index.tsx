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
      <Grid className="pt-3 pr-5 pl-5 text-[11px] font-suisseIntl ">
        <div className="col-start-1 col-span-1 flex flex-col text-[#AAAAAA]">
          <Link className="text-black" href="/">
            All
          </Link>
          <Link className="hover:text-black" href="/documentaires">
            Documentaires
          </Link>
          <Link className="hover:text-black" href="/stories">
            Stories
          </Link>
          <Link className="hover:text-black" href="/diary">
            Diary
          </Link>
          <Link className="hover:text-black" href="/portraits">
            Portraits
          </Link>
          <Link className="hover:text-black" href="/companies">
            Companies
          </Link>
        </div>
        <div className="col-start-7 col-span-2 flex flex-col">
          <div>Index</div>
          {pathname === "/" && (
            <div className="font-PPeditorialNew">
              <button
                className={`hover:text-black ${viewMode === "list" ? "text-black" : "text-[#AAAAAA]"}`}
                onClick={() => setViewMode("list")}
              >
                List
              </button>
              <span className="pr-1 pl-1 text-[#AAAAAA]">/</span>
              <button
                className={`hover:text-black ${viewMode === "grid" ? "text-black" : "text-[#AAAAAA]"}`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
            </div>
          )}
        </div>
        <div className="col-start-10">
          <Link href="/about">About</Link>
        </div>
      </Grid>
    </nav>
  );
}
