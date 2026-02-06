import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getPortraitsProjects } from "@/sanity/queries";

export default async function PortraitsPage({}) {
  const projects = await getPortraitsProjects();
  return <ProjectListComponent projectArray={projects} />;
}
