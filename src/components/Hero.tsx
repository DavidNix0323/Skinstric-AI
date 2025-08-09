"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SkinstricIntro() {
  const [hoverDirection, setHoverDirection] = useState<"left" | "right" | null>(null);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  const headlineShift = {
    left: -500,
    right: 500,
    null: 0,
  };

  return (
    <section className="relative h-screen w-full bg-white flex items-center justify-center px-4 text-center overflow-hidden font-inter text-[#1A1B1C]">
      {/* Background Diamonds */}
      <motion.div
        animate={{ opacity: hoverDirection ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] border border-dotted border-[#A0A4AB] rotate-45 -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] border border-dotted border-[#A0A4AB] rotate-45 -translate-y-1/2 translate-x-1/2" />
      </motion.div>

      {/* Headline Block */}
      <motion.div
        animate={{ x: headlineShift[hoverDirection ?? "null"] }}
        transition={{ type: "spring", stiffness: 120, damping: 40 }}
        className="absolute z-10"
      >
        <motion.h1
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
  className="text-[60px] lg:text-[100px] font-normal tracking-tighter leading-none"
>
  Sophisticated
  <br />
  <motion.span
    initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      x:
        hoverDirection === "left"
          ? -100
          : hoverDirection === "right"
          ? 100
          : 0,
    }}
    transition={{
      opacity: { duration: 1.2, ease: 'easeOut' },
      x: { type: "spring", stiffness: 120, damping: 35 },
    }}
    className="block"
  >
    skincare
  </motion.span>
</motion.h1>

      </motion.div>

      {/* CTA Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute top-1/2 left-0 right-0 flex justify-between px-12 md:px-24 text-sm font-medium"
        style={{ transform: "translateY(-50%)" }}
      >
        {/* Left CTA */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: hoverDirection === "left" ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-3 cursor-pointer"
          onMouseEnter={() => {
            setHoverDirection("right");
            setHoveredLeft(true);
          }}
          onMouseLeave={() => {
            setHoverDirection(null);
            setHoveredLeft(false);
          }}
        >
          {/* Diamond + Arrow ◀ */}
          <motion.div
            animate={{ scale: hoveredLeft ? 1.1 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[32px] h-[32px]"
          >
            <motion.span className="absolute left-[4px] top-[4px] right-[10px] scale-[1.2] rotate-180 group-hover:scale-105 transition duration-[1000ms] ease-in-out">
              ▶
            </motion.span>
            <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-110 transition duration-[1000ms] ease-in-out" />
          </motion.div>

          {/* Label */}
          <Link href="" className="hover:text-black transition">
            DISCOVER A.I.
          </Link>
        </motion.div>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: hoverDirection === "right" ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-3 cursor-pointer"
          onMouseEnter={() => {
            setHoverDirection("left");
            setHoveredRight(true);
          }}
          onMouseLeave={() => {
            setHoverDirection(null);
            setHoveredRight(false);
          }}
        >
         <Link
  href="/test"
  className="group flex items-center gap-3 hover:text-black transition"
>
  {/* Label */}
  <span>TAKE TEST</span>

  {/* Diamond + Arrow ▶ */}
  <motion.div
    animate={{ scale: hoveredRight ? 1.1 : 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="relative w-[32px] h-[32px]"
  >
    <motion.span className="absolute top-[6px] right-[8px] scale-[1.2] group-hover:scale-105 transition duration-[1000ms] ease-in-out">
      ▶
    </motion.span>
    <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-110 transition duration-[1000ms] ease-in-out" />
  </motion.div>
</Link>
        </motion.div>
      </motion.div>
      

      {/* Description */}
      <div className="absolute bottom-40 left-12 text-left text-[17px] leading-[1.75rem] font-medium tracking-normal text-[#1A1B1C] max-w-[460px]">
        <p>
          Skinstric developed an A.I. that creates a<br />
          highly-personalized routine tailored to
          <br />
          what your skin needs.
        </p>
      </div>
    </section>
  );
}
