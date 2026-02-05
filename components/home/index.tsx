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
      <div className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center">
        <div
          className="grid gap-10 p-8"
          style={{
            gridTemplateRows: "repeat(4, 1fr)",
            gridAutoFlow: "column",
            gridAutoRows: "23%",
          }}
        >
          {projects.map((project, index) => (
            <div
              className="font-SuisseIntl"
              key={project._id}
              onMouseEnter={() => {
                setHoveredImage(project.thumbnail);
                setHoveredImageId(project._id);
                setHoveredLink(project.slug.current);
              }}
            >
              <span className="text-[15px] md:text-[11px] lg:text-[15px]">
                {index < 10 ? `0${index}` : index}
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
        <Link href={`/${hoveredLink}`}>
          <UIImageSanity
            key={hoveredImageId}
            asset={hoveredImage}
            alt={`Thumbnail hovered ${hoveredImageId}`}
            className="bottom-5 fixed right-5 z-0 object-contain desktop:max-h-[450px] desktop:max-w-[400px] laptop:max-h-[400px] laptop:max-w-[350px]"
          />
        </Link>
      )}
    </div>
  );
}
