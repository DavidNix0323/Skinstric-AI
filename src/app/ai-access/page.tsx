"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAccessPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImageBase64(base64);

      const res = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );

      const json = await res.json();
      localStorage.setItem("skinstricPhaseTwo", JSON.stringify(json.data));

      // Delay routing to allow spinner + preview to show
      setTimeout(() => {
        router.push("/result");
      }, 1200); // 1.2s gives time for visual feedback
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <input
  type="file"
  accept="image/*"
  capture={false}
  onChange={handleFileUpload}
  ref={fileInputRef}
  className="hidden"
/>


        {/* Top-left label */}
        <div className="absolute left-10 top-4 text-sm font-bold tracking-wide z-10">
          TO START ANALYSIS
        </div>

       {/* Preview Box */}
<div className="fixed top-[120px] sm:top-[90px] right-6 md:right-8 z-30">
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
      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400" />
    )}
  </div>
</div>


        {/* Diamond Spinner Layer Left */}
        <div className="fixed top-1/2 left-[10%] md:left-[16%] -translate-y-1/2 z-0 pointer-events-none xs:mt-[50px] xs:ml-[-140px] xs:flex xs:justify-center xs:relative">
          <div className="relative w-[405.18px] h-[405.18px] xs:flex xs:flex-col xs:items-center xs:justify-center xs:min-w-[190px] xs:max-w-[190px] xs:min-h-[190px] xs:max-h-[190px] xs:flex-shrink-0">
            {/* Diamonds */}
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Small"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slow origin-center brightness-50 scale-100 transition-none"
              priority
              unoptimized
            />
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Medium"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slower origin-center rotate-[185deg] scale-100 transition-none"
              priority
              unoptimized
            />
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Faint"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slowest origin-center opacity-35 scale-100 transition-none"
              priority
              unoptimized
            />

            {/* Camera Icon */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowCameraModal(true)}
              className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 xs:w-[80px] xs:h-[80px] scale-100 transition-transform duration-300 ease-out cursor-pointer hover:scale-[1.08] hover:brightness-110"
            >
              <Image
                src="/camera-icon.webp"
                alt="Camera Icon"
                width={120}
                height={120}
                priority
                unoptimized
              />
            </div>

            {/* Line */}
            <Image
              src="/ResScanLine.webp"
              alt="Camera Line"
              width={66.33}
              height={59.37}
              className="absolute xl:block md:right-[100px] md:top-[108px] xs:hidden"
              priority
              unoptimized
            />

            {/* Label */}
            <span className="absolute right-[-50px] top-[90px] text-black text-[14px] font-semibold tracking-wide xs:static xs:mt-[180px] xs:self-start xs:pl-[40px] xs:text-left">
              ALLOW A.I. <br /> TO SCAN YOUR FACE
            </span>
          </div>
        </div>

        {/* Diamond Spinner Layer Right */}
        <div className="fixed top-1/2 right-[10%] md:right-[20%] -translate-y-1/2 z-0 pointer-events-none xs:mt-[20px] xs:flex xs:justify-center xs:relative">
          <div className="relative w-[405.18px] h-[405.18px] xs:flex xs:flex-col xs:items-center xs:justify-center xs:min-w-[190px] xs:max-w-[190px] xs:min-h-[190px] xs:max-h-[190px] xs:flex-shrink-0">
            {/* Diamonds */}
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Small"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slow origin-center brightness-50 scale-100 transition-none"
              priority
              unoptimized
            />
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Medium"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slower origin-center rotate-[185deg] scale-100 transition-none"
              priority
              unoptimized
            />
            <Image
              src="/Diamond-dark-small.webp"
              alt="Diamond Faint"
              width={405.18}
              height={405.18}
              className="absolute md:w-[405.18px] md:h-[405.18px] w-[190px] h-[190px] animate-spin-slowest origin-center opacity-35 scale-100 transition-none"
              priority
              unoptimized
            />

            {/* Gallery Icon */}
            <div
  role="button"
  tabIndex={0}
  onClick={triggerImageUpload}
  className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 xs:w-[80px] xs:h-[80px] xs:top-[45%] xs:left-1/2 scale-100 transition-transform duration-300 ease-out cursor-pointer hover:scale-[1.08] hover:brightness-110"
>
  <Image
    src="/gallery-icon.webp"
    alt="Gallery Icon"
    width={120}
    height={120}
    priority
    unoptimized
  />
</div>

            {/* Line */}
            <Image
              src="/ResGalleryLine.webp"
              alt="Gallery Line"
              width={66.33}
              height={59.37}
              className="absolute xl:block md:left-[100px] md:bottom-[108px] xs:hidden"
              priority
              unoptimized
            />

            {/* Label */}
            <span className="absolute left-[26px] bottom-[70px] text-black text-[14px] font-semibold tracking-wide xs:static xs:mt-[180px] xs:self-start xs:pl-[40px] xs:text-right xs:max-w-[80%] xs:text-sm">
  ALLOW A.I. <br /> ACCESS GALLERY
</span>

          </div>
        </div>

      {/* Bottom-left BACK button */}
<div className="fixed bottom-[32px] left-14 z-10">
  <Link href="/test" className="group flex items-center gap-[30px]">
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




{/* Hidden input for camera capture */}
<input
  type="file"
  accept="image/*"
  onChange={handleFileUpload}
  ref={fileInputRef}
  className="hidden"
/>


{/* Camera Access Prompt Modal */}
<AnimatePresence>
  {showCameraModal && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-[100px] left-[5%] w-[90%] z-[50] sm:top-[420px] sm:left-[580px] sm:w-[352px] sm:translate-x-0"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-black text-white rounded-lg shadow-xl p-4 w-full h-auto text-center relative sm:w-[360px] sm:h-[140px] sm:px-4 sm:py-6"
      >
        <h2 className="text-sm font-semibold tracking-wide mb-4">
          ALLOW A.I. TO ACCESS YOUR CAMERA
        </h2>

        <div className="hidden sm:block absolute bottom-[60px] left-0 w-full h-px bg-white opacity-20" />

        <div className="flex flex-col items-center gap-2 sm:absolute sm:bottom-4 sm:right-4 sm:flex-row sm:gap-4">
          <button
            className="px-5 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded-sm tracking-wide"
            onClick={() => setShowCameraModal(false)}
          >
            DENY
          </button>
          <button
            className="px-5 py-1.5 bg-green-600 hover:bg-green-500 text-sm rounded-sm tracking-wide"
            onClick={() => {
              router.push("/camera");
            }}
          >
            ALLOW
          </button>
        </div>

        <button
          className="mt-2 text-xs text-gray-400 hover:text-white tracking-wide sm:absolute sm:bottom-4 sm:left-6 sm:mt-0"
          onClick={() => setShowCameraModal(false)}
        >
          BACK
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>




{isLoading && (
  <div className="fixed inset-0 bg-white z-[999] overflow-hidden">
    {/* Spinner Background Layer */}
    <div className="absolute inset-0 z-[998]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[600px] h-[600px] origin-center animate-[spin_8s_linear_infinite]">
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
        <div className="absolute w-[640px] h-[640px] origin-center rotate-[185deg] animate-[spin_12s_linear_infinite]">
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
        <div className="absolute w-[650px] h-[650px] origin-center opacity-35 animate-[spin_16s_linear_infinite]">
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
    </div>

    {/* Centered Text + Dots */}
    <div className="absolute inset-0 flex items-center justify-center z-[1000]">
      <div className="z-10 flex flex-col items-center">
        <p className="text-[#1A1B1C] text-sm font-semibold uppercase tracking-wide mb-4 animate-pulse">
          PREPARING YOUR ANALYSIS...
        </p>
        <div className="flex justify-center items-center space-x-6 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-[#1A1B1C] rounded-full"
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
      </div>
    </div>

    {/* Header */}
    <div className="absolute top-0 left-0 w-full z-[1001] px-6 py-4 bg-white flex items-center justify-between text-[11px] text-[#0F1011]">
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-bold text-[11px] mr-1 leading-[16px] text-[#0F1011] font-geist-sans"
        >
          SKINSTRIC
        </Link>
        <span className="text-[11px] text-gray-600 leading-[16px]">
          [ INTRO ]
        </span>
      </div>
      <button className="border border-black bg-black px-2 py-1 rounded-sm text-white text-[9px] font-semibold cursor-default leading-[16px] font-geist-sans">
        ENTER CODE
      </button>
    </div>

    {/* Label */}
    <div className="absolute top-[64px] left-10 text-sm font-bold tracking-wide z-[1001]">
      TO START ANALYSIS
    </div>

    {/* Preview Box */}
    <div className="fixed top-[90px] right-6 md:right-8 z-[1001] xs:top-[120px] xs:right-4">
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
    <div className="fixed bottom-[32px] left-14 z-[1001] xs:left-4 xs:bottom-6">
      <Link
        href="/ai-access"
        className="group flex items-center gap-[30px]"
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-12 h-12"
        >
          <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out">
            ▶
          </motion.span>
          <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
        </motion.div>
        <span className="font-black text-black mr-5 relative">
          Back
        </span>
      </Link>
    </div>
  </div>
)}

      </main>
    </>
  );
}
