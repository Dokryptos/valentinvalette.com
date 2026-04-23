import { getBooksProjects } from "@/sanity/queries";
import BooksClient from "@/components/book/BooksClient";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await getBooksProjects();
  return <BooksClient books={books} />;
}
