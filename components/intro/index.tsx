"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro() {
  const [showIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("hasSeenH1Animate");
  });

  const [isVisibleBg, setIsVisibleBg] = useState(showIntro);
  const [isVisibleH1, setIsVisibleH1] = useState(showIntro);

  useEffect(() => {
    if (!showIntro) return;

    sessionStorage.setItem("hasSeenH1Animate", "true");

    const timerBg = setTimeout(() => {
      setIsVisibleBg(false);
    }, 1500);

    const timerH1 = setTimeout(() => {
      setIsVisibleH1(false);
      sessionStorage.setItem("hasSeenH1Animate", "true");
    }, 1150);

    return () => {
      clearTimeout(timerBg);
      clearTimeout(timerH1);
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <>
      {showIntro && (
        <div>
          <motion.div
            className={`fixed inset-0 z-45 bg-[#998D77] ${isVisibleBg ? "block" : "hidden"}`}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
          ></motion.div>
          <motion.div
            className={`fixed z-50 mt-20 mb-20 inset-0 flex items-center justify-center ${isVisibleH1 ? "block" : "hidden"}`}
          >
            <motion.h1
              className="font-neueGrotesk text-[#FAEEBC] dekstop:text-[70px] tablet:text-[45px] text-[35px]"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 2, ease: "easeOut" }}
            >
              Valentin Valette
            </motion.h1>
          </motion.div>
        </div>
      )}
    </>
  );
}
