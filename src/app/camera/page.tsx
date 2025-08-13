"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CameraIntroPage() {
  const router = useRouter();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setTimeout(() => {
          router.push("/camera/capture");
        }, 3000); // Delay to show loading screen
      })
      .catch(() => {
        setAccessDenied(true);
      });
  }, [router]);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      

      {!accessDenied ? (
        <>
          {/* Spinning Diamonds */}
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

          {/* Camera Icon */}
          <div className="z-10 mb-6">
            <Image
              src="/camera-icon.webp"
              alt="Camera Icon"
              width={120}
              height={120}
              priority
              unoptimized
            />
          </div>

          {/* Loading Text */}
          <h1 className="text-xl font-bold z-10 mb-4">SETTING UP CAMERA...</h1>

          {/* Instruction Block */}
          <div className="text-center z-10 mb-10">
            <p className="text-md font-medium mb-2">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center items-center gap-6 text-sm font-medium">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="absolute bottom-[64px] w-[240px] h-[6px] bg-white bg-opacity-20 rounded-full overflow-hidden z-10">
            <div className="h-full bg-white animate-pulse rounded-full w-[40%]" />
          </div>
        </>
      ) : (
        <div className="text-center px-6">
          <h1 className="text-xl font-bold mb-4">Camera Access Denied</h1>
          <p className="text-sm text-gray-300 mb-6">
            Please allow camera access in your browser settings to continue.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.refresh()}
              className="px-4 py-2 bg-white text-black font-semibold rounded-sm hover:bg-gray-200"
            >
              Retry
            </button>
            <button
              onClick={() => router.push("/ai-access")}
              className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-sm hover:bg-gray-600"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

