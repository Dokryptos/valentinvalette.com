import Grid from "@/components/ui/grid";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Grid className="pt-3 pr-5 pl-5 ">
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
        <div className="col-start-7 flex flex-col text-[#AAAAAA]">
          <div className="text-black">Index</div>
          <Link className="hover:text-black" href="/">
            List
          </Link>
          <Link className="hover:text-black" href="/">
            Grid
          </Link>
        </div>
        <div className="col-start-10">
          <Link href="/about">About</Link>
        </div>
      </Grid>
    </nav>
  );
}
