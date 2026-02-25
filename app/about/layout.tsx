"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Grid from "@/components/ui/grid";
import Image from "next/image";
import Arrow from "@/public/Arrow.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { aboutPageColors, defaultAboutColor } from "./colors";

const aboutNavigation = [
  { label: "Biographie", href: "/about/biographie" },
  { label: "Awards", href: "/about/awards" },
  { label: "Book", href: "/about/book" },
  { label: "Exhibitions", href: "/about/exhibitions" },
  { label: "Writings", href: "/about/writings" },
  { label: "Instagram", href: "https://www.instagram.com/valentin.valette/" },
];

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const backgroundColor =
    aboutPageColors[pathname as keyof typeof aboutPageColors] ||
    defaultAboutColor;

  return (
    <div
      style={{
        backgroundColor,
        transition: "background-color 0.3s ease",
      }}
      className="min-h-screen"
    >
      <Grid className="pt-9 pr-3 pl-3 md:pr-5 md:pl-5">
        <div className="col-start-1 col-span-4 sticky h-fit font-SuisseIntl">
          <nav className="flex flex-col gap-1">
            {aboutNavigation.map((item, index) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredIndex === index;
              const showArrow = isActive || isHovered;

              return (
                <div
                  key={index}
                  className="flex items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Conteneur animé qui "pousse" le texte */}
                  <motion.div
                    initial={false}
                    animate={{
                      width: showArrow ? "auto" : 0,
                      opacity: showArrow ? 1 : 0,
                      marginRight: showArrow ? 12 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden shrink-0"
                  >
                    <Image
                      src={Arrow}
                      alt="Arrow"
                      width={15}
                      height={15}
                      className="min-w-3.75 object-contain"
                    />
                  </motion.div>

                  <Link
                    href={item.href}
                    className={`transition-colors font-PPeditorialNew flex text-[25px] xl:text-[35px] leading-tight whitespace-nowrap`}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>

        <div className="col-start-5 md:col-start-7 col-span-4 md:col-span-3 text-[11px] xl:text-[15px]">
          {children}
        </div>
      </Grid>
    </div>
  );
}
