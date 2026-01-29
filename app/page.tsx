import HomeComponent from "@/components/home";
import { getAllProjects } from "@/sanity/queries";

export default async function Home({}) {
  const projects = await getAllProjects();
  return <HomeComponent projects={projects} />;
}
