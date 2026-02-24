"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/grid";

const aboutNavigation = [
  { label: "About", href: "/about" },
  { label: "Awards", href: "/about/awards" },
  { label: "Book", href: "/about/book" },
  { label: "Exhibitions", href: "/about/exhibitions" },
  { label: "Writings", href: "/about/writings" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Grid className="pt-3 pr-3 pl-3 md:pr-5 md:pl-5">
      {/* Sidebar Navigation */}
      <div className="col-start-1 col-span-1 sticky top-3 h-fit text-[15px] md:text-[11px] lg:text-[15px] font-SuisseIntl">
        <nav className="flex flex-col gap-2 text-[#AAAAAA]">
          {aboutNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href ? "text-black" : "hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="col-start-2 col-span-4 md:col-span-5">{children}</div>
    </Grid>
  );
}
