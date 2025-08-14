"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { submitPhaseOne } from '@/lib/api';


export default function SkinstricTesting() {
  const router = useRouter();
  const [step, setStep] = useState<"name" | "location" | "processing">("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [dotCount, setDotCount] = useState(0);
  const [showProceed, setShowProceed] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (step === "processing") {
      const dotInterval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4);
      }, 500);
  
      const proceedTimeout = setTimeout(() => {
        clearInterval(dotInterval);
  
        submitPhaseOne(name, location)
          .then((data) => {
            console.log("API response:", data);
            setShowProceed(true);
          })
          .catch((err) => {
            console.error("API error:", err);
            setError("Something went wrong. Try again.");
          });
  
      }, 2500);
  
      return () => {
        clearInterval(dotInterval);
        clearTimeout(proceedTimeout);
      };
    }
  }, [step]);
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    if (step === "name") {
      const isAlpha = /^[A-Za-z\s]+$/.test(name.trim());
      if (!isAlpha) {
        setError("Please enter a valid name.");
        return;
      }
      setError("");
      setStep("location");
    } else if (step === "location") {
      if (!location.trim()) {
        setError("Please enter a location.");
        return;
      }
      setError("");
      setStep("processing");
    }
  };

  const handleProceed = () => {
    localStorage.setItem("skinstricName", name);
    localStorage.setItem("skinstricLocation", location);
    router.push("/ai-access");
  };

  return (
    <section className="relative w-full min-h-screen bg-white font-inter text-[#1A1B1C] sm:overflow-hidden overflow-y-auto pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">

      {/* Diamond Spinner Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] animate-spin-slow origin-center z-0">
          <Image src="/Diamond-dark-small.webp" alt="Diamond Small" width={840} height={840} className="w-full h-full" priority unoptimized />
        </div>
        <div className="absolute w-[640px] h-[640px] animate-spin-slower origin-center rotate-[185deg] z-0">
          <Image src="/Diamond-dark-small.webp" alt="Diamond Medium" width={1160} height={1160} className="w-full h-full" priority unoptimized />
        </div>
        <div className="absolute w-[650px] h-[650px] animate-spin-slowest origin-center opacity-35 z-0">
          <Image src="/Diamond-dark-small.webp" alt="Diamond Faint" width={1440} height={1440} className="w-full h-full" priority unoptimized />
        </div>
      </div>

      {/* Top-left label */}
      <div className="absolute left-10 text-xs font-bold tracking-wide z-10">
        TO START ANALYSIS
      </div>

      {/* Static Center Block */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="flex flex-col items-center text-center space-y-2">
          {step !== "processing" && (
            <p className="text-md text-gray-400 tracking-wider uppercase mb-1">
              CLICK TO TYPE
            </p>
          )}

          {step === "name" && (
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="Introduce Yourself"
              autoComplete="off"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}

          {step === "location" && (
            <input
              autoFocus
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
              placeholder="your city name"
              autoComplete="off"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}

          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}

          {step === "processing" && !showProceed && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-500 uppercase tracking-wide mb-4"
              >
                Processing Submission
              </motion.p>

              <div className="flex justify-center items-center space-x-6 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {showProceed && (
            <div className="flex flex-col items-center gap-4 z-10">
              <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">
                Thank you!
              </p>
              <p className="text-lg text-gray-600">
                Proceed for the next step
              </p>
            </div>
          )}
        </div>
      </div>

    {/* Bottom-left BACK button */}
<div className="fixed bottom-[32px] left-14 z-10">
  <Link href="/" className="group flex items-center gap-[30px]">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-12 h-12"
    >
      {/* Diamond shape */}
      <motion.div
        className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out"
      >
        {/* Mobile: BACK label inside diamond */}
        <div className="absolute inset-0 sm:hidden flex items-center justify-center">
          <span className="text-sm font-black text-black -rotate-45">Back</span>
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


      {/* Bottom-right Proceed button */}
      {showProceed && (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.2,
          }}
          onAnimationComplete={() => setBounce(true)}
          className="fixed bottom-[32px] right-14 z-10"
        >
          <motion.div
            animate={bounce ? { y: [0, -14, 6, 0] } : {}}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              times: [0, 0.4, 0.7, 1],
            }}
          >
            <button onClick={handleProceed} className="inline-block">
              <div className="relative group">
                {/* Mobile */}
                <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 sm:hidden">
                  <span className="rotate-[-45deg] text-sm font-bold">PROCEED</span>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex flex-row relative justify-center items-center">
            <span className="text-sm font-black text-black mr-5">PROCEED</span>
            <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
            <span className="absolute right-[15px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] ease duration-300">▶</span>
          </div>
        </div>
      </button>
    </motion.div>
  </motion.div>
)}



    </section>
  );
}
