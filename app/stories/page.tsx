import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getStoriesProjects } from "@/sanity/queries";

export default async function StoriesPage({}) {
  const projects = await getStoriesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
