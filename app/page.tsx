import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getAllProjects } from "@/sanity/queries";

export default async function Home({}) {
  const projects = await getAllProjects();
  return <ProjectListComponent projectArray={projects} />;
}
