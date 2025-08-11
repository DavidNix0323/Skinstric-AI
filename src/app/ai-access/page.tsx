'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';


export default function AiAccessPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSendToAI = async () => {
    if (!imageBase64) return;
    const res = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 }),
    });
    const json = await res.json();
    localStorage.setItem('skinstricPhaseTwo', JSON.stringify(json.data));
    router.push('/selfie');
  };

  return (
    <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Top-left label */}
      <div className="absolute left-10 top-4 text-sm font-bold tracking-wide z-10">
        TO START ANALYSIS
      </div>
        {/* Camera Preview Box */}
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
      </div>
    )}
  </div>
</div>

      

   {/* Diamond Spinner Layer Left */}
<div className="fixed top-1/2 left-[16%] -translate-y-1/2 z-0 pointer-events-none">
  <div className="relative w-[405.18px] h-[405.18px]">
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Small"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slow origin-center brightness-50"
      priority
      unoptimized
    />
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Medium"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slower origin-center rotate-[185deg]"
      priority
      unoptimized
    />
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Faint"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest origin-center opacity-80"
      priority
      unoptimized
    />
    <Image
  src="/camera-icon.webp"
  alt="Center Icon"
  width={120}
  height={120}
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
  priority
  unoptimized
/>

  </div>
</div>

{/* Diamond Spinner Layer Right */}
<div className="fixed top-1/2 right-[20%] -translate-y-1/2 z-0 pointer-events-none">
  <div className="relative w-[405.18px] h-[405.18px]">
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Small"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slow origin-center brightness-50"
      priority
      unoptimized
    />
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Medium"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slower origin-center rotate-[185deg]"
      priority
      unoptimized
    />
    <Image
      src="/Diamond-dark-small.webp"
      alt="Diamond Faint"
      width={405.18}
      height={405.18}
      className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] animate-spin-slowest origin-center opacity-80"
      priority
      unoptimized
      
    />
    <Image
  src="/gallery-icon.webp"
  alt="Center Icon"
  width={120}
  height={120}
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
  priority
  unoptimized
/>

  </div>
</div>

    

      {/* Bottom-left BACK button */}
      <div className="fixed bottom-[32px] left-14 z-10">
        <Link href="/test" className="group flex items-center gap-[30px]">
          <motion.div transition={{ duration: 0.3, ease: 'easeOut' }} className="relative w-12 h-12">
            <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out">
              ▶
            </motion.span>
            <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
          </motion.div>
          <span className="font-black text-black mr-5 relative">Back</span>
        </Link>
      </div>
    </main>
  );
}
