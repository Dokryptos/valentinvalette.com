"use client";
import HalfAboutPopup from "@/components/ui/popUp/HalfPopUp";
import About, { BookContenu } from "@/types/about";
import { useState, useEffect } from "react";
import { UIImageSanity } from "../ui/image/sanity";

interface BooksClientProps {
  books: About[];
}
export default function BooksClient({ books }: BooksClientProps) {
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    // Ouvrir le popup avec un petit délai pour l'animation d'arrivée
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  console.log(books);
  return (
    <HalfAboutPopup open={popupOpen} onClose={() => setPopupOpen(false)}>
      {books.map((book) => (
        <div key={book._id}>
          <div>{book.title}</div>
          <div className="">
            {Array.isArray(book.contenu) &&
              book.contenu.map((contenuItem: BookContenu, index: number) => {
                if (contenuItem._type === "singleImage") {
                  return (
                    <li key={index} className="">
                      {contenuItem.asset && (
                        <UIImageSanity asset={contenuItem.asset} alt="Image" />
                      )}
                    </li>
                  );
                }
                if (contenuItem._type === "doubleImage") {
                  return (
                    <li key={index}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {contenuItem.image1?.asset && (
                          <UIImageSanity
                            asset={contenuItem.image1.asset}
                            alt=""
                            style={{ maxWidth: 100 }}
                          />
                        )}
                        {contenuItem.image2?.asset && (
                          <UIImageSanity
                            asset={contenuItem.image2.asset}
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
    </HalfAboutPopup>
  );
}
