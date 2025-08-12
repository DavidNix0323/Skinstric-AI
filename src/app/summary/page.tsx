"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SummaryPage() {
  const [summaryData, setSummaryData] = useState<{
    race?: Record<string, number>;
    age?: Record<string, number>;
    gender?: Record<string, number>;
  } | null>(null);

  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"race" | "age" | "gender">("race");
  const [selectedLabel, setSelectedLabel] = useState<string>("—");

  useEffect(() => {
    const raw = localStorage.getItem("skinstricPhaseTwo");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSummaryData(parsed);
        setSelectedLabel(getTop(parsed.race).label);
      } catch {
        setSummaryData(null);
      }
    }
  }, []);

  const getTop = (data?: Record<string, number>) => {
    if (!data) return { label: "—", confidence: 0 };
    const [label, value] = Object.entries(data).sort((a, b) => b[1] - a[1])[0];
    return { label, confidence: +(value * 100).toFixed(1) };
  };

  const activeAgeLabel = selectedAge ?? getTop(summaryData?.age).label;
  const activeConfidence =
    selectedAge && summaryData?.age?.[selectedAge] !== undefined
      ? +(summaryData.age[selectedAge] * 100).toFixed(1)
      : getTop(summaryData?.age).confidence;

  const activeValue = summaryData?.[selectedCategory]?.[selectedLabel] ?? 0;

  return (
    <main className="min-h-screen bg-white text-[#0F1011] px-6 py-10 font-geist-sans">
      {/* Title Block */}
      <div className="mb-2">
        <h1 className="text-md font-bold tracking-wide mb-1">A.I. ANALYSIS</h1>
        <p className="text-7xl font-500 text-gray-700 leading-snug">DEMOGRAPHICS</p>
        <p className="text-xl font-200 text-gray-700 leading-snug">PREDICTED RACE & AGE</p>
      </div>

      {/* Summary Output */}
      {!summaryData ? (
        <p className="text-sm text-gray-500">No summary data found.</p>
      ) : (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">


          {/* Prediction Boxes */}
<div className="bg-white-100 space-y-3 md:flex md:flex-col h-auto md:h-[62%]">
  <div
    onClick={() => {
      setSelectedCategory("race");
      setSelectedLabel(getTop(summaryData.race).label);
    }}
    className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t hover:bg-[#E1E1E2] ${
      selectedCategory === "race" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"
    }`}
  >
    <p className="text-base font-semibold">{getTop(summaryData.race).label}</p>
    <h4 className="text-base font-semibold mb-1">RACE</h4>
  </div>
  <div
    onClick={() => {
      setSelectedCategory("age");
      setSelectedLabel(activeAgeLabel);
    }}
    className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t hover:bg-[#E1E1E2] ${
      selectedCategory === "age" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"
    }`}
  >
    <p className="text-base font-semibold">{activeAgeLabel}</p>
    <h4 className="text-base font-semibold mb-1">AGE</h4>
  </div>
  <div
    onClick={() => {
      setSelectedCategory("gender");
      setSelectedLabel(getTop(summaryData.gender).label);
    }}
    className={`p-3 cursor-pointer flex-1 flex flex-col justify-between border-t hover:bg-[#E1E1E2] ${
      selectedCategory === "gender" ? "bg-[#1A1B1C] text-white hover:bg-black" : "bg-[#F3F3F4]"
    }`}
  >
    <p className="text-base font-semibold">{getTop(summaryData.gender).label}</p>
    <h4 className="text-base font-semibold mb-1">SEX</h4>
  </div>
</div>

            {/* Confidence Meter */}
            <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
              <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2">
                {selectedLabel}
              </p>
              <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "384px",
                    position: "relative",
                    transform: "scale(1)",
                    transformOrigin: "center center",
                  }}
                >
                  <svg className="CircularProgressbar text-[#1A1B1C]" viewBox="0 0 100 100">
                    <path
                      className="CircularProgressbar-trail"
                      d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                      strokeWidth="1.7"
                      fillOpacity="0"
                    />
                    <path
                      className="CircularProgressbar-path"
                      d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3"
                      strokeWidth="1.7"
                      fillOpacity="0"
                      style={{
                        stroke: "#1A1B1C",
                        strokeDasharray: "308.819px",
                        strokeDashoffset: `${308.819 - (activeValue * 100 / 100) * 308.819}px`,
                        transitionDuration: "0.8s",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl md:text-[40px] font-normal relative">
                      {(activeValue * 100).toFixed(0)}
                      <span className="absolute text-xl md:text-3xl">%</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
                If A.I. estimate is wrong, select the correct one.
              </p>
            </div>

            {/* Breakdown Tabs */}
<div className="bg-gray-100 pt-4 pb-4 md:border-t">
  <div className="space-y-0">
    <div className="flex justify-between px-4">
      <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">
        {selectedCategory.toUpperCase()}
      </h4>
      <h4 className="text-base leading-[24px] tracking-tight font-medium mb-2">A.I. CONFIDENCE</h4>
    </div>
    {Object.entries(summaryData[selectedCategory] ?? {}).map(([label, value]) => (
      <div
        key={label}
        onClick={() => {
          if (selectedCategory === "age") setSelectedAge(label);
          setSelectedLabel(label);
        }}
        className={`flex items-center justify-between h-[48px] hover:bg-[#E1E1E2] px-4 cursor-pointer ${
          selectedLabel === label ? "bg-[#1A1B1C] text-white hover:bg-black" : ""
        }`}
      >
        <div className="flex items-center gap-1">
          <span className="font-normal text-base leading-6 tracking-tight">{label}</span>
        </div>
        <span className="font-normal text-base leading-6 tracking-tight">{(value * 100).toFixed(1)}%</span>
      </div>
    ))}
  </div>
</div>

          </div>
        </>
      )}

      {/* Back Button */}
      <div className="fixed bottom-[32px] left-6 sm:left-14 z-10">
        <Link href="/result" className="group flex items-center gap-[30px]">
          <motion.div
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-12 h-12"
          >
            <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out">
              ▶
            </motion.span>
            <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
          </motion.div>
          <span className="font-black text-black mr-5 relative">Back</span>
        </Link>
      </div>

      {/* Home Button */}
      <div className="fixed bottom-[32px] right-6 sm:right-14 z-10">
        <Link href="/">
          <button className="group flex items-center gap-[30px]">
            <span className="text-sm font-black text-black ml-5 relative">
              HOME
            </span>
            <motion.div className="relative w-12 h-12">
              <motion.span className="absolute right-[15px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] transition duration-300 ease-in-out">
                ▶
              </motion.span>
              <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
            </motion.div>
          </button>
        </Link>
      </div>
    </main>
  );
}
