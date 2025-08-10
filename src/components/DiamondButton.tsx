"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface DiamondButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  direction?: "left" | "right";
  bounce?: boolean;
}

export default function DiamondButton({
  label,
  href,
  onClick,
  direction = "right",
  bounce = false,
}: DiamondButtonProps) {
  const content = (
    <div className="group flex items-center gap-[30px]">
      {direction === "left" && (
        <motion.span className="text-sm font-black text-black relative">▶</motion.span>
      )}
      <motion.div
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-12 h-12"
      >
        <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
      </motion.div>
      {direction === "right" && (
        <motion.span className="text-sm font-black text-black relative">▶</motion.span>
      )}
      <span className="font-black text-black text-sm relative">{label}</span>
    </div>
  );

  const wrapper = bounce ? (
    <motion.div
      animate={{ y: [0, -14, 6, 0] }}
      transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.4, 0.7, 1] }}
    >
      {href ? <Link href={href}>{content}</Link> : <button onClick={onClick}>{content}</button>}
    </motion.div>
  ) : href ? (
    <Link href={href}>{content}</Link>
  ) : (
    <button onClick={onClick}>{content}</button>
  );

  return wrapper;
}
