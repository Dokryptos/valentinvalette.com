"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Intro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisibleBg, setIsVisibleBg] = useState(true);

  const [randomBg, setRandomBg] = useState("#998D77");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const hasSeenIntro = sessionStorage.getItem("hasSeenH1Animate");

    if (!hasSeenIntro) {
      const colors = ["#998D77", "#9EBEE4"];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      setRandomBg(chosenColor);

      setShowIntro(true);

      const timerBg = setTimeout(() => {
        setIsVisibleBg(false);
        sessionStorage.setItem("hasSeenH1Animate", "true");
      }, 1500);

      return () => {
        clearTimeout(timerBg);
      };
    }
  }, []);

  if (!isMounted || !showIntro) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        className="fixed inset-0 z-45"
        style={{ backgroundColor: randomBg }}
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      >
        <motion.div
          className={`fixed inset-0 flex items-center justify-center ${
            isVisibleBg
              ? "opacity-100"
              : "opacity-0 transition-opacity duration-300"
          }`}
        >
          <h1 className="font-PPeditorialNew text-[#FAEEBC] desktop:text-[70px] tablet:text-[45px] text-[35px]">
            Valentin Valette
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}
