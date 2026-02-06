import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getCompaniesProjects } from "@/sanity/queries";

export default async function CompaniesPage({}) {
  const projects = await getCompaniesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
