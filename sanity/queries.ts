import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import ProjectType from "@/types/project";
import { notFound } from "next/navigation";

export const INDEX_QUERY = defineQuery(`*[
  _type == "project"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

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

export const DOCUMENTARIES_QUERY = defineQuery(`*[
  _type == "project"
  && category == "Documentaries"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

export async function getDocumentariesProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: DOCUMENTARIES_QUERY });
  return data;
}

export const STORIES_QUERY = defineQuery(`*[
  _type == "project"
  && category == "Stories"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

export async function getStoriesProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: STORIES_QUERY });
  return data;
}

export const DIARY_QUERY = defineQuery(`*[
  _type == "project"
  && category == "Diary"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

export async function getDiaryProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: DIARY_QUERY });
  return data;
}

export const PORTRAITS_QUERY = defineQuery(`*[
  _type == "project"
  && category == "Portraits"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

export async function getPortraitsProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: PORTRAITS_QUERY });
  return data;
}

export const COMPANIES_QUERY = defineQuery(`*[
  _type == "project"
  && category == "Companies"
  && defined(slug.current)
]{_id, title, slug, thumbnail, gallery, category, year, description } | order(orderRank)`);

export async function getCompaniesProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: COMPANIES_QUERY });
  return data;
}

export const AWARD_QUERY = defineQuery(`*[
  _type == "award"
]{_id, title, slug, description } | order(orderRank)`);
export async function getAwardsProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: AWARD_QUERY });
  return data;
}

export const BOOK_QUERY = defineQuery(`*[
  _type == "book"
]{_id, title, slug, description } | order(orderRank)`);
export async function getBooksProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: BOOK_QUERY });
  return data;
}

export const WRITING_QUERY = defineQuery(`*[
  _type == "writing"
]{_id, title, slug, description } | order(orderRank)`);
export async function getWritingProjects(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: WRITING_QUERY });
  return data;
}
