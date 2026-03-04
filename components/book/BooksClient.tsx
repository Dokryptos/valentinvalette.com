"use client";
import FullPagePopup from "@/components/ui/popUp/HalfPopUp";
import About from "@/types/about";
import { useState } from "react";

interface BooksClientProps {
  books: About[];
}
export default function BooksClient({ books }: BooksClientProps) {
  const [popupOpen, setPopupOpen] = useState(true);
  return (
    <FullPagePopup
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
      direction="right"
    >
      {books.map((book) => (
        <div key={book._id}>{book.description}</div>
      ))}
    </FullPagePopup>
  );
}
