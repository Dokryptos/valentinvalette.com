"use client";

import Project, { SanityImage } from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useState } from "react";

interface HomeProps {
  projects: Project[];
}
export default function HomeComponent({ projects }: HomeProps) {
  const [hoveredImage, setHoveredImage] = useState<SanityImage | null>(
    projects[0]?.thumbnail || null,
  );
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(
    projects[0]?._id || null,
  );
  const [hoveredLink, setHoveredLink] = useState<string | null>(
    projects[0]?.slug.current || null,
  );

  return (
    <div className="flex items-center h-full pl-5">
      <div className="w-full h-full overflow-x-auto overflow-y-hidden">
        <div
          className="grid gap-y-6 gap-x-3"
          style={{
            gridTemplateRows: "repeat(4, 1fr)",
            gridAutoFlow: "column",
            gridAutoRows: "23%",
          }}
        >
          {projects.map((project, index) => (
            <div
              className="font-SuisseIntl flex cursor-pointer w-[310px] md:w-[220px] lg:w-[220px] xl:w-[340px] z-10"
              key={project._id}
              onMouseEnter={() => {
                setHoveredImage(project.thumbnail);
                setHoveredImageId(project._id);
                setHoveredLink(project.slug.current);
              }}
            >
              <span className="text-[15px] md:text-[11px] lg:text-[15px] pr-3 ">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              <div>
                <h2 className="font-PPeditorialNew text-[28px] md:text-[18px] lg:text-[28px]">
                  {project.title}
                </h2>
                <div className="text-[15px] md:text-[11px] lg:text-[15px]">
                  <span>
                    {project.category.charAt(0).toUpperCase() +
                      project.category.slice(1)}
                  </span>
                  <span className="pr-1 pl-1">/</span>
                  <span>{project.gallery.length} Assets</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {hoveredImage && (
        <div>
          <Link
            href={`/${hoveredLink}`}
            className="bottom-5 fixed right-5 z-0 block overflow-hidden "
          >
            <UIImageSanity
              asset={hoveredImage}
              className="w-auto h-auto max-h-[200px] xl:max-h-[450px] xl:max-w-[400px] lg:max-h-[400px] lg:max-w-[350px] object-contain"
              alt=""
            />
          </Link>
        </div>
      )}
    </div>
  );
}
