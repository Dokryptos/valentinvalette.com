"use client";

import Project, { SanityImage } from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useState } from "react";
import Grid from "../ui/grid";
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
    <Grid className="gap-x-5">
      {projectArray.map((project: ProjectType, i: number) => (
        <motion.div
          custom={i}
          initial="hidden"
          animate="visible"
          className="mb-10"
          variants={gridAnimationVariant}
          key={project._id}
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
            <h2
              className={`opacity-100 ${hoveredImageId === project._id ? "laptop:opacity-100" : "laptop:opacity-0"}`}
            >
              {project?.title}, {project.gallery.length} Images
            </h2>
          </Link>
        </motion.div>
      ))}
    </Grid>
  );
}
