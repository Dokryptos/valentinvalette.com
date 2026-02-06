import ProjectListComponent from "@/components/projectIndex/projectRender";
import { getDiaryProjects } from "@/sanity/queries";

export default async function DiaryPage({}) {
  const projects = await getDiaryProjects();
  return <ProjectListComponent projectArray={projects} />;
}
