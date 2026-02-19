"use client";
import Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";

interface ProjectProps {
  projectData: Project;
}
export default function ProjectPage({ projectData }: ProjectProps) {
  console.log(projectData);
  return <div>test</div>;
}
