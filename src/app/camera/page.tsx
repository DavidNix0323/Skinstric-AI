'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CameraPage() {
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="absolute left-10 top-4 text-sm font-bold tracking-wide z-10">
        CAMERA ACCESS
      </div>

      {/* Preview Box */}
      <div className="fixed top-[90px] right-6 md:right-8 z-30">
        <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
        <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden relative rounded bg-white">
          {imageBase64 ? (
            <Image
              src={imageBase64}
              alt="Uploaded Preview"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-[32px] left-14 z-10">
        <motion.div className="group flex items-center gap-[30px]">
          <motion.div transition={{ duration: 0.3, ease: 'easeOut' }} className="relative w-12 h-12">
            <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out">
              ▶
            </motion.span>
            <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
          </motion.div>
          <span className="font-black text-black mr-5 relative">Back</span>
        </motion.div>
      </div>

      {/* TODO: Add camera logic, gallery access, and modal */}
    </div>
  );
}
