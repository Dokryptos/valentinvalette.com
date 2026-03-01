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

  const handleCarouselClick = (index: number) => {
    setSelectedImageIndex(index);
    scrollToThumb(index);
  };

  return (
    <Grid className="min-h-screen overflow-hidden font-SuisseIntl w-full">
      <div className="fixed top-11 md:top-4 left-5 z-30 col-span-full md:col-span-4 ">
        <h1 className="text-[25px] xl:text-[35px] font-PPeditorialNew">
          {projectData.title}
        </h1>
        <p className="text-[11px] xl:text-[15px]">{projectData.category}</p>
      </div>

      <div className="flex flex-col col-span-full md:col-span-8 ">
        <div className="flex items-center pt-20">
          {selectedImage && (
            <UIImageSanity
              asset={selectedImage.asset}
              alt="Selected"
              className="object-contain px-4"
            />
          )}
        </div>

        
        <Grid className="flex text-[10px] uppercase px-4">
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
          <span className="col-start-5 text-left">
            {selectedImageIndex + 1} / {images.length}
          </span>
          <button
            className="col-start-8 text-end"
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
                className="w-auto h-16 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </Grid>
  );
}
