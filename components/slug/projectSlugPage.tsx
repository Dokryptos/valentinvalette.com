"use client";

import { useState, useRef, useEffect } from "react";
import type Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Grid from "../ui/grid";

interface ProjectSlugPageProps {
  projectData: Project;
}

export default function ProjectSlugPage({ projectData }: ProjectSlugPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const images = projectData.gallery || [];
  const selectedImage = images[selectedImageIndex];

  // Largeur réelle d'un item (w-48 = 192px + gap-3 = 12px)
  const ITEM_WIDTH = 48;

  const scrollToThumb = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * ITEM_WIDTH,
        behavior: "smooth",
      });
    }
  };

  const handleCarouselClick = (index: number) => {
    setSelectedImageIndex(index);
    scrollToThumb(index);
  };

  return (
    <>
      <Grid className="min-h-screen overflow-hidden font-SuisseIntl w-full">
        <div className="fixed top-11 md:top-4 left-5 z-30 col-span-full md:col-span-4 ">
          <h1 className="text-[25px] xl:text-[35px] font-PPeditorialNew">
            {projectData.title}
          </h1>
          <p className="text-[11px] xl:text-[15px]">{projectData.category}</p>
        </div>

        <div className="flex flex-col col-span-full md:col-span-4 md:col-start-7 lg:col-start-7 lg:col-span-4">
          <div className="flex items-center pt-20 lg:pt-7.5">
            {selectedImage && (
              <UIImageSanity
                asset={selectedImage.asset}
                alt="Selected"
                className="object-contain px-4 md:px-0 max-h-[70vh] md:pr-4 lg:pr-0"
              />
            )}
          </div>
        </div>
      </Grid>
      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 pt-2">
        <Grid className="flex text-[10px] uppercase mb-2">
          <button
            className="col-start-1 text-left"
            onClick={() =>
              handleCarouselClick(
                (selectedImageIndex - 1 + images.length) % images.length,
              )
            }
          >
            Prev
          </button>
          <span className="col-start-5 md:col-start-6 lg:col-start-7 text-left">
            {selectedImageIndex + 1} / {images.length}
          </span>
          <button
            className="col-start-8 md:col-start-10 lg:col-start-12 text-end"
            onClick={() =>
              handleCarouselClick((selectedImageIndex + 1) % images.length)
            }
          >
            Next
          </button>
        </Grid>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {images.map((image, index) => (
            <button
              key={image.asset._ref + index}
              onClick={() => handleCarouselClick(index)}
              className={`shrink-0 relative transition-opacity ${
                index === selectedImageIndex
                  ? "opacity-100 shadow-xl"
                  : "opacity-30 hover:opacity-50"
              }`}
            >
              <UIImageSanity
                asset={image.asset}
                alt="thumb"
                className="w-auto h-16 md:h-22 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
