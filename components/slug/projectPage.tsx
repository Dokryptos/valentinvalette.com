"use client";
import Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";

interface ProjectProps {
  projectData: Project;
}
export default function ProjectPage({ projectData }: ProjectProps) {
  console.log(projectData);
  return (
    <div className="w-full h-screen overflow-y-auto">
      <h1>{projectData.title}</h1>
    </div>
  );
}
