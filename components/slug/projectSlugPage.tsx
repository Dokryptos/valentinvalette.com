"use client";

import { useState, useRef, useEffect } from "react";
import type Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";

interface ProjectSlugPageProps {
  projectData: Project;
}

export default function ProjectSlugPage({ projectData }: ProjectSlugPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = projectData.gallery || [];
  const selectedImage = images[selectedImageIndex];

  // Largeur réelle d'un item (w-48 = 192px + gap-3 = 12px)
  const ITEM_WIDTH = 204;

  // Fonction pour scroller proprement
  const scrollToThumb = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * ITEM_WIDTH,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!isRotating) return;

    const interval = setInterval(() => {
      const nextIndex = (selectedImageIndex + 1) % images.length;
      setSelectedImageIndex(nextIndex);
      scrollToThumb(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRotating, selectedImageIndex, images.length]);

  const handleCarouselClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsRotating(false);
    scrollToThumb(index);
  };

  return (
    <div className="min-h-screen overflow-hidden font-SuisseIntl">
      <div className="fixed top-11 md:top-4 left-5 z-30 ">
        <h1 className="text-[25px] xl:text-[35px] font-PPeditorialNew">
          {projectData.title}
        </h1>
        <p className="text-[11px] xl:text-[15px]">{projectData.category}</p>
      </div>

      <div className="h-screen">
        <div className="flex flex-col">
          <div className="flex-1 items-center justify-center pt-20">
            {selectedImage && (
              <UIImageSanity
                asset={selectedImage.asset}
                alt="Selected"
                className="object-contain px-4"
              />
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6 font-mono text-[10px] uppercase">
              <button
                onClick={() =>
                  handleCarouselClick(
                    (selectedImageIndex - 1 + images.length) % images.length,
                  )
                }
              >
                Prev
              </button>
              <span>
                {selectedImageIndex + 1} / {images.length}
              </span>
              <button
                onClick={() =>
                  handleCarouselClick((selectedImageIndex + 1) % images.length)
                }
              >
                Next
              </button>
              <button
                onClick={() => setIsRotating(!isRotating)}
                className={isRotating ? "text-red-500" : ""}
              >
                {isRotating ? "Stop" : "Play"}
              </button>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {/* On simplifie : pas besoin de triple clone pour un carrousel simple */}
              {images.map((image, index) => (
                <button
                  key={image.asset._ref + index}
                  onClick={() => handleCarouselClick(index)}
                  className={`shrink-0 relative w-48 h-32 transition-opacity ${
                    index === selectedImageIndex
                      ? "opacity-100 shadow-xl"
                      : "opacity-30 hover:opacity-50"
                  }`}
                >
                  <UIImageSanity
                    asset={image.asset}
                    alt="thumb"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
