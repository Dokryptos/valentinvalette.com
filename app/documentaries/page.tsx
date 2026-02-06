import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getDocumentariesProjects } from "@/sanity/queries";

export default async function DocumentairesPage({}) {
  const projects = await getDocumentariesProjects();
  return <ProjectListComponent projectArray={projects} />;
}
