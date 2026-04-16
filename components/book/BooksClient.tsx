"use client";
import FullPagePopup from "@/components/ui/popUp/HalfPopUp";
import About, { BookContenu } from "@/types/about";
import { useState } from "react";
import { UIImageSanity } from "../ui/image/sanity";

interface BooksClientProps {
  books: About[];
}
export default function BooksClient({ books }: BooksClientProps) {
  const [popupOpen, setPopupOpen] = useState(true);
  console.log(books);
  return (
    <FullPagePopup
      open={popupOpen}
      onClose={() => setPopupOpen(false)}
      direction="right"
    >
      {books.map((book) => (
        <div key={book._id}>
          <div>{book.title}</div>
          <div>
            {Array.isArray(book.contenu) &&
              book.contenu.map((contenuItem: BookContenu, index: number) => {
                if (contenuItem._type === "singleImage") {
                  return (
                    <li key={index}>
                      <span>Photo seule</span>
                      {contenuItem.asset?.url && (
                        <UIImageSanity
                          asset={contenuItem.asset.url}
                          alt="Image"
                        />
                      )}
                    </li>
                  );
                }
                if (contenuItem._type === "doubleImage") {
                  return (
                    <li key={index}>
                      <span>Deux photos</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        {contenuItem.image1?.asset?.url && (
                          <UIImageSanity
                            asset={contenuItem.image1.asset.url}
                            alt=""
                            style={{ maxWidth: 100 }}
                          />
                        )}
                        {contenuItem.image2?.asset?.url && (
                          <UIImageSanity
                            asset={contenuItem.image2.asset.url}
                            alt=""
                            style={{ maxWidth: 100 }}
                          />
                        )}
                      </div>
                    </li>
                  );
                }
                if (contenuItem._type === "descriptionBlock") {
                  return (
                    <li key={index}>
                      <span>Description :</span>
                      <div>
                        {contenuItem.children?.map((description, i) => (
                          <p key={i}>{description.text}</p>
                        ))}
                      </div>
                    </li>
                  );
                }
                return null;
              })}
          </div>
        </div>
      ))}
    </FullPagePopup>
  );
}
