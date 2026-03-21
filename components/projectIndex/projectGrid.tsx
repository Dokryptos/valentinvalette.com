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
    <div className="w-full min-h-screen">
      <motion.div
        layout
        transition={springTransition}
        className="grid gap-x-3 gap-y-10 px-3 md:px-5 h-full overflow-y-auto"
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
                <div className="relative overflow-hidden mb-3">
                  <UIImageSanity
                    asset={project.thumbnail.asset}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="font-SuisseIntl text-[9px] xl:text-[12px] text-[#AAAAAA] group-hover:text-black transition-colors duration-300">
                  <div className="flex justify-between items-baseline">
                    <h2 className="tracking-wider">{project?.title}</h2>
                    <span className="tabular-nums opacity-60">
                      {project?.year}
                    </span>
                  </div>
                  <span>{project?.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
