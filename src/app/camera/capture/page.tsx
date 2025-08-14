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

  const handleConfirm = async () => {
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
    <main className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Live Camera Feed */}
      {!hasCaptured && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Frozen Image Preview */}
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

      {/* Overlay UI */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-[480px]">
        {/* Nice Shot Message */}
        {hasCaptured && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-[80px] w-full text-center z-20"
          >
            <h2 className="text-white text-xl sm:text-2xl font-bold">Nice Shot!</h2>
          </motion.div>
        )}

        {/* Take Photo Button */}
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

        {/* Action Buttons After Capture */}
        {hasCaptured && (
          <div className="absolute bottom-[100px] sm:bottom-[120px] w-full flex justify-center gap-4 sm:gap-6 z-20 px-4">
            <button
              onClick={() => {
                setImageBase64(null);
                setHasCaptured(false);
              }}
              className="px-4 sm:px-6 py-2 bg-gray-700 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-gray-600"
            >
              Retake
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 sm:px-6 py-2 bg-green-600 text-white text-sm sm:text-base font-semibold rounded-sm hover:bg-green-500"
            >
              Use This Photo
            </button>
          </div>
        )}

      {/* Bottom-left BACK button */}
<div className="fixed bottom-[18px] left-14 z-10">
  <Link href="/ai-access" className="group flex items-center gap-[30px]">
    <motion.div
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-12 h-12"
    >
      {/* Unified hover container */}
      <div className="absolute inset-0 group-hover:scale-[0.92] transition duration-300 ease-in-out">
        <div className="w-full h-full border border-white rotate-45" />
        <span className="absolute right-[20px] bottom-[13px] scale-[0.9] rotate-180">
          ▶
        </span>
      </div>
    </motion.div>
    <span className="font-black text-white mr-5 relative">Back</span>
  </Link>
</div>



        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* ✅ Bottom Instruction Block (outside overlay container) */}
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
