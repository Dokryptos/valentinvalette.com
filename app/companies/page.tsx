import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getCompaniesProjects } from "@/sanity/queries";
export const revalidate = 30;
export const dynamic = "force-dynamic";

export default async function CompaniesPage({}) {
  const projects = await getCompaniesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
