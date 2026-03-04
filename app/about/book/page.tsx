import { getBooksProjects } from "@/sanity/queries";
import BooksClient from "@/components/book/BooksClient";

export default async function BooksPage() {
  const books = await getBooksProjects();
  return <BooksClient books={books} />;
}
