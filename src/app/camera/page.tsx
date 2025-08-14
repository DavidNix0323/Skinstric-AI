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
        }, 3000);
      })
      .catch(() => {
        setAccessDenied(true);
      });
  }, [router]);
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 max-w-[100vw]">
      {!accessDenied ? (
        <>
          {/* Spinner Layer */}
          <div className="absolute inset-0 flex items-center justify-center z-0 -translate-y-[60px] sm:-translate-y-[90px]">
            <div className="relative w-[300px] sm:w-[540px] h-[300px] sm:h-[540px]">
              <div className="absolute inset-0 w-[260px] sm:w-[460px] h-[260px] sm:h-[460px] animate-[spin_2s_linear_infinite] opacity-100 m-auto">
                <Image
                  src="/Diamond-dark-small.webp"
                  alt="Diamond 1"
                  width={600}
                  height={600}
                  className="w-full h-full"
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] animate-[spin_3s_linear_infinite] opacity-90 rotate-[120deg] m-auto">
                <Image
                  src="/Diamond-dark-small.webp"
                  alt="Diamond 2"
                  width={800}
                  height={800}
                  className="w-full h-full"
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 w-[300px] sm:w-[540px] h-[300px] sm:h-[540px] animate-[spin_4s_linear_infinite] opacity-70 rotate-[240deg] m-auto">
                <Image
                  src="/Diamond-dark-small.webp"
                  alt="Diamond 3"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Centered Camera + Text */}
          <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-[140px] sm:-translate-y-[180px] z-10 flex flex-col items-center animate-[fadePulse_2s_ease-in-out_infinite]">
            <Image
              src="/camera-icon.webp"
              alt="Camera Icon"
              width={100}
              height={100}
              priority
              unoptimized
              className="animate-[float_2.5s_ease-in-out_infinite]"
            />
            <h1 className="text-xl font-bold mt-6 text-center">
              SETTING UP CAMERA...
            </h1>
          </div>

          {/* Instruction Block */}
          <div className="absolute top-1/2 translate-y-[160px] sm:translate-y-[200px] z-10 text-center px-4 sm:px-6">
            <p className="text-sm sm:text-base font-medium mb-3">
              TO GET BETTER RESULTS MAKE SURE TO HAVE
            </p>
            <div className="flex justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium flex-wrap">
              <span>◇ NEUTRAL EXPRESSION</span>
              <span>◇ FRONTAL POSE</span>
              <span>◇ ADEQUATE LIGHTING</span>
            </div>

            {/* Loading Bar */}
            <div className="mt-6 w-[240px] h-[6px] bg-black bg-opacity-10 rounded-full overflow-hidden mx-auto">
  <div className="h-full bg-black rounded-full animate-fill" />
</div>

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
