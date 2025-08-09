"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SkinstricTesting() {
  return (
    <section className="relative w-full min-h-screen bg-white font-inter text-[#1A1B1C] overflow-hidden">
      {/* Diamond Spinner Layer */}
<div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
  {/* Diamond 1: Large */}
  <div className="absolute w-[600px] h-[600px] animate-spin-slow origin-center z-0">
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Small"
      width={840}
      height={840}
      className="w-full h-full"
      priority
      unoptimized
    />
  </div>

  {/* Diamond 2: XL */}
  <div className="absolute w-[640px] h-[640px] animate-spin-slower origin-center rotate-[185deg] z-0">
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Medium"
      width={1160}
      height={1160}
      className="w-full h-full"
      priority
      unoptimized
    />
  </div>

  {/* Diamond 3: XXL Faint */}
  <div className="absolute w-[650px] h-[650px] animate-spin-slowest origin-center opacity-35 z-0">
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Faint"
      width={1440}
      height={1440}
      className="w-full h-full"
      priority
      unoptimized
    />
  </div>
</div>


      {/* Static Center Block */}
      <div className="fixed inset-0 flex items-center justify-center z-10">
  <div className="flex flex-col items-center text-center space-y-2">
    <p className="text-md text-gray-400 tracking-wider uppercase mb-1">
      CLICK TO TYPE
    </p>
    <input
  className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10"
  placeholder="Introduce Yourself"
  autoComplete="off"
  type="text"
  name="name"
/>

  </div>
</div>

      {/* Top-left label */}
      <div className="absolute left-10 text-xs font-bold tracking-wide z-10">
        TO START ANALYSIS
      </div>

      {/* Bottom-left diamond + arrow ◀ */}
<div className="fixed bottom-[40px] left-14 z-10">
  <Link href="/" className="group flex items-center gap-[30px]">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-[45px] h-[45px]"
    >
      <motion.span className="absolute left-[6px] right-[20px] bottom-[12px] top-[6px] scale-[1.2] rotate-180 group-hover:scale-105 transition duration-[1000ms] ease-in-out">
        ▶
      </motion.span>
      <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-110 transition duration-[1000ms] ease-in-out" />
    </motion.div>

    <span className="text-md font-black text-black tracking-tight transition">
  Back
</span>

  </Link>
</div>
    </section>
  );
}
