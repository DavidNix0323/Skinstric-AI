"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";

export default function AiAccessPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);
  


  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setIsLoading(true);
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
  
      // 🔥 Send to AI immediately
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
  
      router.push("/result");
    };
    reader.readAsDataURL(file);
  };
  

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraAccess = () => {
    if (isMobile) {
      setTimeout(() => {
        cameraInputRef.current?.click();
      }, 100); // Prevents modal animation from blocking input
    } else {
      setShowCameraModal(true);
    }
  };
  

  useEffect(() => {
    if (!showCameraModal || !videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera access failed:", err));

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [showCameraModal]);

  const handleSendToAI = async () => {
    if (!imageBase64) return;
    const res = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      }
    );
    const json = await res.json();
    localStorage.setItem("skinstricPhaseTwo", JSON.stringify(json.data));
    router.push("/result");
  };

  return (
    <>
      {isHydrated && <Header />}
      <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Hidden input for gallery */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />

        {/* Hidden input for mobile camera capture */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          ref={cameraInputRef}
          className="hidden"
        />

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
              onClick={() => setShowAccessPrompt(true)}
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
            <span
              className="absolute right-[-50px] top-[90px] text-black text-[14px] font-semibold tracking-wide 
            xs:static xs:mt-[180px] xs:self-start xs:pl-[40px] xs:text-left"
            >
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
              className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 xs:w-[80px] xs:h-[80px] scale-100 transition-transform duration-300 ease-out cursor-pointer hover:scale-[1.08] hover:brightness-110"
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
            <span
              className="absolute left-[26px] bottom-[70px] text-black text-[14px] font-semibold tracking-wide 
            xs:static xs:mt-[180px] xs:self-start xs:pl-[40px] xs:text-right"
            >
              ALLOW A.I. <br /> ACCESS GALLERY
            </span>
          </div>
        </div>

        {/* Webcam Modal */}
        <AnimatePresence>
          {showCameraModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-[64px] left-0 right-0 bottom-0 bg-black bg-opacity-70 z-40"
            >
              <Header />

              {/* Fullscreen video */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay UI */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <div className="fixed top-1/2 right-14 transform -translate-y-1/2 z-10">
                  <button
                    onClick={() => {
                      const video = videoRef.current;
                      const canvas = canvasRef.current;
                      if (!video || !canvas) return;

                      canvas.width = video.videoWidth;
                      canvas.height = video.videoHeight;
                      const ctx = canvas.getContext("2d");
                      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
                      const imageData = canvas.toDataURL("image/png");
                      setImageBase64(imageData);
                      setShowCameraModal(false);
                      handleSendToAI();
                    }}
                    className="group flex items-center gap-4"
                  >
                    <span className="font-black text-white relative">
                      Take Photo
                    </span>
                    <img
                      src="/takePictureIcon.webp"
                      alt="Take Photo Icon"
                      width={60}
                      height={60}
                      className="w-16 h-16 cursor-pointer group-hover:scale-[0.92] transition duration-300 ease-in-out"
                    />
                  </button>
                </div>

                {/* Bottom Instruction Block */}
                <div className="absolute bottom-[180px] w-full text-center z-20 px-4">
                  <p className="text-white text-md font-medium mb-2">
                    TO GET BETTER RESULTS MAKE SURE TO HAVE
                  </p>
                  <div className="flex justify-center items-center gap-6 text-white text-sm font-medium">
                    <span>◇ NEUTRAL EXPRESSION</span>
                    <span>◇ FRONTAL POSE</span>
                    <span>◇ ADEQUATE LIGHTING</span>
                  </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </div>
              {/* Bottom-left BACK button Camera */}
              <div className="fixed bottom-[32px] left-14 z-10">
                <button
                  onClick={() => {
                    setShowCameraModal(false); // 👈 closes modal
                    router.push("/ai-access"); // 👈 navigates back
                  }}
                  className="group flex items-center gap-[30px]"
                >
                  <motion.div
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-12 h-12"
                  >
                    <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out text-white">
                      ▶
                    </motion.span>
                    <motion.div className="w-full h-full border border-white rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
                  </motion.div>
                  <span className="font-black text-white mr-5 relative">
                    Back
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom-left BACK button */}
        <div className="fixed bottom-[32px] left-14 z-10">
          <Link href="/test" className="group flex items-center gap-[30px]">
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
        {/* Camera Access Prompt Modal */}
        <AnimatePresence>
          {showAccessPrompt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-[420px] left-[580px] w-[352px] z-40"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-black text-white rounded-lg shadow-xl p-4 w-[360px] h-[140px] text-center relative"
              >
                <h2 className="text-sm font-semibold tracking-wide mb-4">
                  ALLOW A.I. TO ACCESS YOUR CAMERA
                </h2>

                {/* Divider Line */}
                <div className="absolute bottom-[60px] left-0 w-full h-px bg-white opacity-20" />

                {/* Bottom Right Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-4">
                  <button
                    onClick={() => setShowAccessPrompt(false)}
                    className="px-5 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded-sm tracking-wide"
                  >
                    DENY
                  </button>
                  <button
                    onClick={() => {
                      setShowAccessPrompt(false);
                      triggerCameraAccess();
                    }}
                    className="px-5 py-1.5 bg-green-600 hover:bg-green-500 text-sm rounded-sm tracking-wide"
                  >
                    ALLOW
                  </button>
                </div>

                {/* Back Button */}
                <button
                  onClick={() => setShowAccessPrompt(false)}
                  className="absolute bottom-4 left-6 text-xs text-gray-400 hover:text-white tracking-wide"
                >
                  BACK
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {isLoading && (
  <div className="fixed inset-0 bg-white z-[999] flex items-center justify-center overflow-hidden">
    {/* Diamond Spinner Layer */}
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

    {/* Centered Text + Dots */}
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
    {/* Full Header Block */}
<div className="absolute top-0 left-0 w-full z-[1001] px-6 py-4 bg-white flex items-center justify-between text-[11px] text-[#0F1011]">
  <div className="flex items-center">
    <Link
      href="/"
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-bold text-[11px] mr-1 leading-[16px] text-[#0F1011] font-geist-sans"
    >
      SKINSTRIC
    </Link>
    <span className="text-[11px] text-gray-600 leading-[16px]">[ INTRO ]</span>
  </div>
  <button className="border border-black bg-black px-2 py-1 rounded-sm text-white text-[9px] font-semibold cursor-default leading-[16px] font-geist-sans">
    ENTER CODE
  </button>
</div>

{/* TO START ANALYSIS label below header */}
<div className="absolute top-[64px] left-10 text-sm font-bold tracking-wide z-[1001]">
  TO START ANALYSIS
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
      <Link href="/" className="group flex items-center gap-[30px]">
        <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="relative w-12 h-12">
          <motion.span className="absolute right-[20px] bottom-[13px] scale-[0.9] group-hover:scale-[0.92] rotate-180 transition duration-300 ease-in-out">
            ▶
          </motion.span>
          <motion.div className="w-full h-full border border-black rotate-45 group-hover:scale-[0.92] transition duration-300 ease-in-out" />
        </motion.div>
        <span className="font-black text-black mr-5 relative">Back</span>
      </Link>
    </div>
  </div>
)}


      </main>
    </>
  );
}
