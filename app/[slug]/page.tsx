import ProjectSlugPage from "@/components/slug/projectSlugPage";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import type projectType from "@/types/project";

const PROJECT_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    slug,
    category,
    description,
    thumbnail,
    gallery,
    year,
  }
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
  console.log(data);
  const projectData: projectType = data;
  return <ProjectSlugPage projectData={projectData} />;
}
