"use client";

import Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import type ProjectType from "@/types/project";

interface ProjectGridProps {
  projectArray: Project[];
}

export default function ProjectGrid({ projectArray }: ProjectGridProps) {
  const [cols, setCols] = useState(4);

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
      <div className="fixed top-10 left-1/2 flex items-center gap-6">
        <input
          type="range"
          min="2"
          max="6"
          step="1"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
          className="w-40 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <span className="text-[10px] font-SuisseIntl text-black w-4">
          {cols}
        </span>
      </div>
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
            <Link
              href={`/${project?.slug?.current}`}
              onMouseEnter={() => {
                setHoveredImageId(project._id);
              }}
            >
              <UIImageSanity
                key={project._id}
                asset={project.thumbnail.asset}
                className="pb-3"
                alt={`Grid image ${project.title}`}
              />
              <div className="font-SuisseIntl text-[9px] xl:text-[12px]">
                <div className="flex justify-between">
                  <h2>{project?.title}</h2>
                  <span>{project?.year}</span>
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
