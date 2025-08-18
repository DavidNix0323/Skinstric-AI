"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CameraPage() {
  const router = useRouter();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [hasCaptured, setHasCaptured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    setImageBase64(imageData);
    setHasCaptured(true);
  };

  const handleRetake = () => {
    setImageBase64(null);
    setHasCaptured(false);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera re-init failed:", err));
  };

  const handleConfirm = async () => {
    if (!imageBase64) return;
    setIsLoading(true);

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
    <main className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8">
      {!hasCaptured && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {hasCaptured && imageBase64 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={imageBase64}
            alt="Captured"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-[480px]">
      {hasCaptured && (
  <motion.div
    initial={{ opacity: 0, y: -60, scale: 0.6 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    }}
    className="fixed top-[80px] sm:top-[120px] left-0 right-0 text-center z-50 pointer-events-none"
  >
    <motion.h2
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 0.8, 1] }}
  transition={{ duration: 0.6, ease: 'easeInOut' }}
  className="text-white text-xl sm:text-2xl font-bold relative"
>
  <span className="absolute inset-0 flex items-center justify-center text-red-500 blur-sm -translate-x-1 -translate-y-1">
    Nice Shot!
  </span>
  <span className="absolute inset-0 flex items-center justify-center text-blue-500 blur-sm translate-x-1 translate-y-1">
    Nice Shot!
  </span>
  <span className="relative z-10">Nice Shot!</span>
</motion.h2>

  </motion.div>
)}



        {!hasCaptured && (
          <div className="fixed top-1/2 right-6 sm:right-14 transform -translate-y-1/2 z-10">
            <button onClick={handleCapture} className="group flex items-center gap-4">
              <span className="font-black text-white text-sm sm:text-base relative">Take Photo</span>
              <img
                src="/takePictureIcon.webp"
                alt="Take Photo Icon"
                width={60}
                height={60}
                className="w-14 h-14 sm:w-16 sm:h-16 cursor-pointer group-hover:scale-[0.92] transition duration-300 ease-in-out"
              />
            </button>
          </div>
        )}

        {hasCaptured && (
          <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
         <div className="mb-[40px] mt-auto sm:mt-[120px] flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">

        
        

              <button
                onClick={handleRetake}
                className="px-4 sm:px-6 py-2 bg-gray-700 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-gray-600 w-full sm:w-auto"
              >
                Retake
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className={`px-4 sm:px-6 py-2 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-green-500 flex items-center justify-center min-w-[120px] w-full sm:w-auto ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Use This Photo"
                )}
              </button>
              {isLoading && (
  <div className="fixed inset-0 flex flex-col items-center justify-center sm:hidden z-50">
    <p className="text-white text-sm font-medium mb-2">Analyzing Image...</p>
    <div className="flex justify-center items-center space-x-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-white rounded-full"
          animate={{ y: [0, -8, 0] }}
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
)}

            </div>
          </div>
        )}

        <div className="fixed bottom-[20px] left-4 z-10">
  <Link href="/ai-access" className="group flex items-center gap-[30px]">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-12 h-12"
    >
      <div className="absolute inset-0 group-hover:scale-[0.92] transition duration-300 ease-in-out">
        <div className="w-full h-full border border-white rotate-45 flex items-center justify-center">
          {/* Mobile-only Back label */}
          <span className="sm:hidden rotate-[315deg] text-xs font-bold text-white block">
            Back
          </span>
        </div>

        {/* Arrow stays untouched */}
        <span className="hidden sm:block absolute right-[20px] bottom-[13px] text-white scale-[0.9] rotate-180">
          ▶
        </span>
      </div>
    </motion.div>

    {/* Desktop-only Back label outside diamond */}
    <span className="hidden sm:inline font-black text-white mr-5 relative">Back</span>
  </Link>
</div>


        <canvas ref={canvasRef} className="hidden" />
      </div>

      {!hasCaptured && (
        <div className="absolute bottom-[64px] sm:bottom-[110px] w-full text-center z-20 px-4">
          <p className="text-white text-sm sm:text-md font-medium mb-2">
            TO GET BETTER RESULTS MAKE SURE TO HAVE
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white text-xs sm:text-sm font-medium">
            <span>◇ NEUTRAL EXPRESSION</span>
            <span>◇ FRONTAL POSE</span>
            <span>◇ ADEQUATE LIGHTING</span>
          </div>
        </div>
      )}
    </main>
  );
}
