import { getBooksProjects } from "@/sanity/queries";

export default async function BooksPage({}) {
  const books = await getBooksProjects();
  return (
    <div>
      {books.map((book) => (
        <div
          className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
          key={book._id}
        >
          <span>{book.year}</span>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
}
