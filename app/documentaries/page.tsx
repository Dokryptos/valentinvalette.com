import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getDocumentariesProjects } from "@/sanity/queries";
export const revalidate = 30;
export const dynamic = "force-dynamic";

export default async function DocumentairesPage({}) {
  const projects = await getDocumentariesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
