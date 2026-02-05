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
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);

  const gridAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <div className="gap-x-3 gap-y-5 pr-5 pl-5 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6">
      {projectArray.map((project: ProjectType, i: number) => (
        <motion.div
          custom={i}
          initial="hidden"
          animate="visible"
          className=""
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
            <div className="pt-3">
              <div>
                <h2>{project?.title}</h2>
                <span>{project?.year}</span>
              </div>
              <span>{project?.category}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
