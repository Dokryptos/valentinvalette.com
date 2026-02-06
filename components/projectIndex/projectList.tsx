"use client";

import Project, { SanityImage } from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useState } from "react";

interface ProjectListProps {
  projectArray: Project[];
}
export default function ProjectList({ projectArray }: ProjectListProps) {
  const [hoveredImage, setHoveredImage] = useState<SanityImage | null>(
    projectArray[0]?.thumbnail || null,
  );
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(
    projectArray[0]?._id || null,
  );

  const [hoveredLink, setHoveredLink] = useState<string | null>(
    projectArray[0]?.slug.current || null,
  );

  return (
    <div className="flex items-center h-full">
      <div className="w-full h-full overflow-x-auto overflow-y-hidden">
        <div
          className="grid gap-y-6 gap-x-3 pl-3 md:pl-5"
          style={{
            gridTemplateRows: "repeat(4, 1fr)",
            gridAutoFlow: "column",
            gridAutoRows: "23%",
          }}
        >
          {projectArray.map((project, index) => (
            <div
              className="group font-SuisseIntl flex cursor-pointer w-77.5 md:w-55 lg:w-55 xl:w-85 z-10"
              key={project._id}
              onMouseEnter={() => {
                setHoveredImage(project.thumbnail);
                setHoveredLink(project.slug.current);
                setHoveredImageId(project._id);
              }}
            >
              <span className="text-[15px] md:text-[11px] lg:text-[15px] pr-3 text-gray-400 group-hover:text-black transition-colors">
                {index < 9 ? `0${index + 1}` : index + 1}
              </span>
              <div>
                <h2 className="font-PPeditorialNew text-[28px] md:text-[18px] lg:text-[28px] text-gray-400 group-hover:text-black transition-colors">
                  {project.title}
                </h2>
                <div className="text-[15px] md:text-[11px] lg:text-[15px] text-gray-400 group-hover:text-black transition-colors">
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
            className="bottom-3 right-3 md:right-5 md:bottom-5 fixed z-0 block overflow-hidden "
          >
            <UIImageSanity
              asset={hoveredImage}
              className="w-auto h-auto max-h-50 xl:max-h-112.5 xl:max-w-100 lg:max-h-100 lg:max-w-87.5 object-contain"
              alt=""
            />
          </Link>
        </div>
      )}
    </div>
  );
}
