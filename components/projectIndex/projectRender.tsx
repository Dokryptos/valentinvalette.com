"use client";
import { useViewMode } from "@/context/ViewModeContext";
import type ProjectType from "@/types/project";
import ProjectGrid from "./projectGrid";
import ProjectList from "./projectList";

interface ProjectProps {
  projectArray: ProjectType[];
}

export default function ProjectListComponent({ projectArray }: ProjectProps) {
  const { viewMode } = useViewMode();

  return (
    <div className="">
      <div>
        {viewMode === "grid" ? (
          <ProjectGrid projectArray={projectArray} />
        ) : (
          <ProjectList projectArray={projectArray} />
        )}
      </div>
    </div>
  );
}
