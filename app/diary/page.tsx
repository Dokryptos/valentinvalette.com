import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getDiaryProjects } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function DiaryPage({}) {
  const projects = await getDiaryProjects();
  return <ProjectListComponent projectArray={projects} />;
}
