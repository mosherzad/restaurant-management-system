"use client";

import { useEffect, useState } from "react";
import { MdFoodBank } from "react-icons/md";

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [text, setText] = useState("GOOD FOOD");

  useEffect(() => {
    const timerSplash = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    const timerText = setTimeout(() => {
      setText("FAIRLY SERVED");
    }, 500);

    return () => {
      clearTimeout(timerText);
      clearTimeout(timerSplash);
    };
  }, []);

  if (!showSplash) return null;

  return (
    <main className="fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden bg-[#161616]">
      <div className="text-center">
        <div className="mb-5 flex items-center justify-center space-x-2 text-4xl font-bold text-white sm:text-5xl">
          <MdFoodBank className="text-[#EC6D13]" size={58} />
          <span>
            Fair<span className="text-[#EC6D13]">Plate</span>
          </span>
        </div>

        <div className="mx-auto h-1 w-36 overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#EC6D13]" />
        </div>

        <p className="mt-5 text-sm tracking-[0.25em] text-white/50">{text}</p>
      </div>
    </main>
  );
};

export default SplashScreen;
