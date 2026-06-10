"use client";
import HalfAboutPopup from "@/components/ui/popUp/HalfPopUp";
import About, { BookContenu } from "@/types/about";
import { useState, useEffect } from "react";
import { UIImageSanity } from "../ui/image/sanity";
import { useRouter } from "next/navigation";

interface BooksClientProps {
  books: About[];
}

function renderSpans(
  children: Array<{ _type?: string; text: string; marks?: string[] }>,
) {
  return children.map((span, i) => {
    let node: React.ReactNode = span.text;
    if (span.marks?.includes("em")) node = <em key={`em-${i}`}>{node}</em>;
    if (span.marks?.includes("strong"))
      node = <strong key={`strong-${i}`}>{node}</strong>;
    return <span key={i}>{node}</span>;
  });
}

export default function BooksClient({ books }: BooksClientProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setPopupOpen(false);
    setTimeout(() => router.back(), 500);
  };

  return (
    <HalfAboutPopup
      open={popupOpen}
      onClose={handleClose}
      direction="right"
      color="bg-[#faf9e8]"
      textColor="black"
    >
      {books.map((book) => (
        <div key={book._id} className="p-5 pt-8 text-[11px] xl:text-[15px] font-SuisseIntl">
          <div>{book.title}</div>
          <div className="pt-6 space-y-3 list-none">
            {Array.isArray(book.contenu) &&
              book.contenu.map((contenuItem: BookContenu, index: number) => {
                if (contenuItem._type === "singleImage") {
                  return (
                    <li key={index}>
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
                      <p className="whitespace-pre-wrap text-justify">
                        {renderSpans(contenuItem.children ?? [])}
                      </p>
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
