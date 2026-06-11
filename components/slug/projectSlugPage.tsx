"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import type Project from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Grid from "../ui/grid";
import HalfPopUp from "@/components/ui/popUp/HalfPopUp";
import { AnimatePresence, motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";

interface ProjectSlugPageProps {
  projectData: Project;
}

export default function ProjectSlugPage({ projectData }: ProjectSlugPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const images = projectData.gallery || [];
  const selectedImage = images[selectedImageIndex];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const preloadKey = useMemo(
    () => images.map((img) => urlFor(img.asset).url()).join("."),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projectData.slug],
  );

  useEffect(() => {
    images.forEach((img) => {
      const el = new window.Image();
      el.src = urlFor(img.asset).url();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preloadKey]);

  const sharedTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const handleCarouselClick = (index: number) => {
    setSelectedImageIndex(index);

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 100;

      if (index > selectedImageIndex) {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else if (index < selectedImageIndex) {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleCarouselClick((selectedImageIndex + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        handleCarouselClick(
          (selectedImageIndex - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex, images.length, showPopup]);

  return (
    <>
      <div className="flex-col md:hidden z-30 px-3 pt-5">
        <h1 className="text-[25px] font-PPeditorialNew">{projectData.title}</h1>
        <p className="text-[11px]">{projectData.category}</p>
      </div>
      <Grid className="min-h-screen overflow-hidden font-SuisseIntl w-full px-3 md:px-5">
        <div className="hidden md:fixed top-11 md:top-4 left-3 md:left-5 z-30 col-span-full md:col-span-4 ">
          <h1 className="text-[25px] xl:text-[35px] font-PPeditorialNew">
            {projectData.title}
          </h1>
          <p className="text-[11px] xl:text-[15px]">{projectData.category}</p>
        </div>

        <motion.div
          transition={sharedTransition}
          className="flex flex-col pt-3 md:pt-10 lg:pt-7.5 relative col-span-full md:col-start-6 lg:col-span-6 lg:col-start-7"
          animate={{
            width: showCarousel ? "50%" : "100%",
          }}
        >
          <div className="flex items-start justify-center lg:justify-end pointer-events-none w-full">
            <AnimatePresence mode="popLayout">
              {selectedImage && (
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-full"
                >
                  <UIImageSanity
                    asset={selectedImage.asset}
                    alt="Selected"
                    className={`w-full h-full max-w-full md:max-w-[calc(100vw-4rem)] object-contain object-top lg:object-left cursor-pointer pointer-events-auto transition-all duration-500 ${
                      showCarousel
                        ? "max-h-[70vh] md:max-h-[60vh] lg:max-h-[40vh]"
                        : "max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh]"
                    }`}
                    onClick={() => setShowCarousel(!showCarousel)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Grid>

      <HalfPopUp
        open={showPopup}
        onClose={() => setShowPopup(false)}
        direction="left"
        color="bg-[#998D77]"
        textColor="[#FAEEBC]"
      >
        <h2 className="p-3 pt-8 md:pt-8 md:p-5 xl:p-6 pb-6 text-[11px] xl:text-[15px] font-SuisseIntl">
          {projectData.title}
        </h2>
        <div className="px-4 md:px-5 xl:px-6 whitespace-pre-wrap text-justify font-SuisseIntl overflow-y-auto text-[11px] xl:text-[15px]">
          {projectData.description}
        </div>
      </HalfPopUp>

      <div className="fixed bottom-0 left-0 w-full z-30 bg-white px-3 md:px-5 pb-5 flex flex-col justify-end pointer-events-none font-SuisseIntl">
        <div className="pointer-events-auto pt-2 mt-2">
          <motion.div layout transition={sharedTransition}>
            <Grid className="text-[11px] xl:text-[15px] w-full items-center mb-0">
              <div className="col-start-1 text-left">
                {projectData.description &&
                projectData.description.trim() !== "" ? (
                  <button
                    className="cursor-pointer"
                    onClick={() => setShowPopup(true)}
                  >
                    Text
                  </button>
                ) : (
                  <span className="opacity-0 pointer-events-none">&nbsp;</span>
                )}
              </div>
              <span
                className="col-start-5 md:col-start-6 lg:col-start-7 text-left"
                onClick={() =>
                  handleCarouselClick(
                    (selectedImageIndex - 1 + images.length) % images.length,
                  )
                }
              >
                {selectedImageIndex + 1} / {images.length}
              </span>
              <button
                className="col-start-8 md:col-start-10 lg:col-start-12 text-end cursor-pointer"
                onClick={() => setShowCarousel(!showCarousel)}
              >
                {showCarousel ? "Close" : "Overview"}
              </button>
            </Grid>
          </motion.div>

          <AnimatePresence>
            {showCarousel && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="flex gap-3 overflow-x-auto no-scrollbar pb-2"
                  ref={scrollContainerRef}
                >
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleCarouselClick(index)}
                      className={`shrink-0 transition-opacity ${index === selectedImageIndex ? "opacity-100" : "opacity-30"}`}
                    >
                      <UIImageSanity
                        asset={image.asset}
                        alt="thumb"
                        className="w-auto h-16 md:h-20 object-contain"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
