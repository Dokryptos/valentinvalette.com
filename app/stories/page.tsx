import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getStoriesProjects } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function StoriesPage({}) {
  const projects = await getStoriesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
