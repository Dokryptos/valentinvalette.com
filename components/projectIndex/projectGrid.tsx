"use client";

import Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type ProjectType from "@/types/project";
import { useGridCols } from "@/context/GridColsContext";

interface ProjectGridProps {
  projectArray: Project[];
}

export default function ProjectGrid({ projectArray }: ProjectGridProps) {
  const { cols } = useGridCols();

  const [hoveredImageId, setHoveredImageId] = useState<string | null>(
    projectArray[0]?._id || null,
  );
  const gridAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <div>
      <div
        className="gap-x-3 gap-y-5 pr-3 pl-3 md:pr-5 md:pl-5 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 h-auto scroll-x-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {projectArray.map((project: ProjectType, i: number) => (
          <motion.div
            custom={i}
            initial="hidden"
            animate="visible"
            className="lg:text-[#AAAAAA] hover:lg:text-black transition-colors cursor-pointer"
            variants={gridAnimationVariant}
            key={project._id}
            onMouseEnter={() => setHoveredImageId(project._id)}
            onMouseLeave={() => setHoveredImageId(null)}
          >
            <Link href={`/${project?.slug?.current}`}>
              <UIImageSanity
                key={project._id}
                asset={project.thumbnail.asset}
                className="pb-3"
                alt={`Grid image ${project.title}`}
              />
              <div className="font-SuisseIntl text-[9px] xl:text-[12px]">
                <div className="flex justify-between">
                  <h2>{project?.title}</h2>
                  <span className="tabular-nums">{project?.year}</span>
                </div>
                <span>{project?.category}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
