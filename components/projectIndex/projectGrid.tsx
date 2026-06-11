"use client";

import Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useGridCols } from "@/context/GridColsContext";

interface ProjectGridProps {
  projectArray: Project[];
}

export default function ProjectGrid({ projectArray }: ProjectGridProps) {
  const { cols } = useGridCols();

  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 40,
    mass: 1,
  };

  return (
    <div className="w-full">
      <motion.div
        layout
        transition={springTransition}
        className="grid gap-x-3 gap-y-5 px-3 md:px-5 pb-5"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        <AnimatePresence mode="popLayout">
          {projectArray.map((project, i) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                delay: i * 0.05,
                opacity: { duration: 0.5 },
                layout: springTransition,
              }}
              className="group cursor-pointer"
            >
              <Link href={`/${project?.slug?.current}`} className="block">
                <div className="relative overflow-hidden mb-3 aspect-[3/4]">
                  <UIImageSanity
                    asset={project.thumbnail.asset}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="font-SuisseIntl text-[9px] xl:text-[12px] text-[#AAAAAA] group-hover:text-black transition-colors duration-300">
                  <div className="flex justify-between items-baseline whitespace-pre-wrap">
                    <h2>{project?.title}</h2>
                    <span>{project?.year}</span>
                  </div>
                  <span className="whitespace-pre-wrap">
                    {project?.category}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
