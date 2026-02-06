import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectType from "@/types/project";
import { notFound } from "next/navigation";

export const INDEX_QUERY = defineQuery(`*[
  _type == "project"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, shortTitle, year, description, details } | order(orderRank)`);

// Fonction pour récupérer les projets (Serveur)
export async function getAllProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: INDEX_QUERY });
  return data;
}

export const INDEX_PROJECT_QUERY = defineQuery(`
  {
  "project": *[
    _type == "project" &&
    slug.current == $slug
  ][0]{
  ...,
},
"projectArray": *[
  _type == "project"
  && defined(slug.current)
] | order(orderRank) {_id, title, slug, description, thumbnail, gallery, category, details, shortTitle, year }
}
`);

export async function getProject({ params }: { params: { slug: string } }) {
  const { data } = await sanityFetch({
    query: INDEX_PROJECT_QUERY,
    params: { slug: params.slug },
  });
  if (!data) {
    notFound();
  }
  return data;
}
