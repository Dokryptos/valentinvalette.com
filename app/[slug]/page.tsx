import ProjectPage from "@/components/slug/projectPage";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import type projectType from "@/types/project";

const PROJECT_QUERY = defineQuery(`
  {
    "project": *[
      _type == "project" &&
      slug.current == $slug
    ][0]{
    ...
  },
`);

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: (await params).slug },
  });
  if (!data) {
    notFound();
  }
  const projectData: projectType = data.project;
  return <ProjectPage projectData={projectData} />;
}
