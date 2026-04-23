import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getAllProjects } from "@/sanity/queries";
export const revalidate = 30;
export const dynamic = "force-dynamic";

export default async function Home({}) {
  const projects = await getAllProjects();
  return <ProjectListComponent projectArray={projects} />;
}
