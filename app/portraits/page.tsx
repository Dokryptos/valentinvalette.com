import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getPortraitsProjects } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PortraitsPage({}) {
  const projects = await getPortraitsProjects();
  return <ProjectListComponent projectArray={projects} />;
}
