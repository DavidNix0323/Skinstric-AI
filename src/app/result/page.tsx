"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ResultPage() {
  const [showProceed, setShowProceed] = useState(true);
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    const resultData = localStorage.getItem("skinstricPhaseTwo");
    setShowProceed(!!resultData);
  }, []);

  const handleSummary = () => {
    window.location.href = "/summary";
  };

  const getOutlineScale = () => {
    switch (hovered) {
      case "demographics":
        return 1.12;
      case "cosmetic":
      case "skin":
        return 1.25;
      case "weather":
        return 1.5;
      default:
        return 0.95;
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#0F1011] px-4 sm:px-6 py-6 font-geist-sans">
      {/* Title Block */}
      <div className="relative min-h-[180px]">
        <div className="absolute top-[-40px] left-2 z-10 bg-white px-2 py-1 pointer-events-none">
          <h1 className="text-md font-bold tracking-wide mb-1">
            A.I. ANALYSIS
          </h1>
          <p className="text-sm font-semibold text-gray-700 leading-snug">
            A.I. has estimated the following.
            <br />
            Fix estimated information if needed.
          </p>
        </div>
      </div>

      {/* Diamond Grid with Dynamic Outline */}
      <div className="relative flex items-center justify-center h-[calc(100vh-80px)] sm:h-[60vh]">

      {/* Hover Outline Image */}
      {hovered && (
  <motion.img
    src="/Diamond-dark-small.webp"
    alt="Diamond Outline"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: getOutlineScale(), opacity: hovered ? 1 : 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="absolute w-[320px] h-[320px] sm:w-[550px] sm:h-[550px] rotate-45 z-0 pointer-events-none"
    draggable={false}
  />
)}


  {/* Diamond Grid */}
  <div className="grid grid-cols-3 grid-rows-3 gap-0 z-10">
    {/* Demographics */}
    <div className="flex items-center justify-center col-start-2">
      <Link href="/summary">
        <button
          onMouseEnter={() => setHovered("demographics")}
          onMouseLeave={() => setHovered("")}
          onClick={handleSummary}
          className="w-[120px] h-[120px] sm:w-[154px] sm:h-[154px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300"
        >
          <span className="transform -rotate-45">Demographics</span>
        </button>
      </Link>
    </div>

    {/* Cosmetic Concerns */}
    <div className="flex items-center justify-center row-start-2 col-start-1">
      <button
        onMouseEnter={() => setHovered("cosmetic")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => e.preventDefault()}
        aria-disabled="true"
        className="w-[120px] h-[120px] sm:w-[154px] sm:h-[154px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed"
      >
        <span className="transform -rotate-45">Cosmetic Concerns</span>
      </button>
    </div>

    {/* Skin Type Details */}
    <div className="flex items-center justify-center row-start-2 col-start-3">
      <button
        onMouseEnter={() => setHovered("skin")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => e.preventDefault()}
        aria-disabled="true"
        className="w-[120px] h-[120px] sm:w-[154px] sm:h-[154px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed"
      >
        <span className="transform -rotate-45">Skin Type Details</span>
      </button>
    </div>

    {/* Weather */}
    <div className="flex items-center justify-center row-start-3 col-start-2">
      <button
        onMouseEnter={() => setHovered("weather")}
        onMouseLeave={() => setHovered("")}
        onClick={(e) => e.preventDefault()}
        aria-disabled="true"
        className="w-[120px] h-[120px] sm:w-[154px] sm:h-[154px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed"
      >
        <span className="transform -rotate-45">Weather</span>
      </button>
    </div>
  </div>
</div>

     {/* Bottom-left BACK button */}
<div className="fixed bottom-[26px] left-14 z-10 xs:left-4">
  <Link href="/test" className="group flex items-center gap-[30px]">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-12 h-12 flex items-center justify-center"

    >
      {/* Diamond shape with mobile label inside */}
      <motion.div
        className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out"
      >
        {/* Mobile: BACK label inside diamond */}
        <div className="absolute inset-0 sm:hidden flex items-center justify-center">
          <span className="text-[11px] font-bold text-black -rotate-45">Back</span>
        </div>
      </motion.div>

      {/* Desktop: Arrow in corner */}
      <motion.span
        className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out hidden sm:block"
      >
        ▶
      </motion.span>
    </motion.div>

    {/* Desktop: BACK text */}
    <span className="font-black text-black mr-5 relative hidden sm:inline">Back</span>
  </Link>
</div>



{/* GET SUMMARY BUTTON */}
<div className="fixed bottom-[26px] right-6 sm:right-14 z-10">
  <Link href="/summary" className="group flex items-center gap-[20px] flex-row-reverse">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-12 h-12 flex items-center justify-center sm:mt-0"
    >
      {/* Diamond */}
      <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />

      {/* Mobile: SUM label inside diamond */}
      <div className="absolute inset-0 sm:hidden flex items-center justify-center">
        <span className="text-[11px] font-bold text-black leading-none">Sum</span>
      </div>

      {/* Desktop: Arrow in corner */}
      <motion.span className="absolute right-[15px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] transition duration-300 ease-in-out hidden sm:block">
        ▶
      </motion.span>
    </motion.div>

    {/* Desktop: GET SUMMARY text */}
    <span className="hidden sm:inline font-black text-black mr-5 relative">
      Get Summary
    </span>
  </Link>
</div>




    </main>
  );
}
