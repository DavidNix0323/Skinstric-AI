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

  useEffect(() => {
    const raw = localStorage.getItem("skinstricPhaseTwo");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setSummaryData(parsed);
      } catch {
        setSummaryData(null);
      }
    }
  }, []);

  const getTopLabel = (data?: Record<string, number>) => {
    if (!data) return null;
    const [label, value] = Object.entries(data).sort((a, b) => b[1] - a[1])[0];
    return `${label} (${(value * 100).toFixed(1)}%)`;
  };

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
        <div className="space-y-6">
          {/* Demographics Block */}
          <section>
            <h2 className="text-sm font-semibold uppercase mb-1">Demographics</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Race:</strong> {getTopLabel(summaryData.race)}</li>
              <li><strong>Age:</strong> {getTopLabel(summaryData.age)}</li>
              <li><strong>Sex:</strong> {getTopLabel(summaryData.gender)}</li>
            </ul>
          </section>

          {/* Race Breakdown Table */}
          {summaryData.race && (
            <section className="mt-6">
              <h2 className="text-sm font-semibold uppercase mb-1">Race Breakdown</h2>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                {Object.entries(summaryData.race).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span>{label}</span>
                    <span>{(value * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Age Breakdown Table */}
          {summaryData.age && (
            <section className="mt-6">
              <h2 className="text-sm font-semibold uppercase mb-1">Age A.I. Confidence</h2>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                {Object.entries(summaryData.age).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span>{label}</span>
                    <span>{(value * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
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
