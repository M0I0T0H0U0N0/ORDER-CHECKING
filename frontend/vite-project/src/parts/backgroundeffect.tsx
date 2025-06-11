"use client";


import { Vortex } from "@/components/ui/vortex";
import CardDemo from "./login"; // Adjust path if needed

function Demo() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fullscreen Vortex Background */}
      <div className="absolute inset-0 z-0">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={2000}
          baseHue={120}
          className="w-full h-full"
        />
      </div>

      {/* Optional Radial Mask for Aesthetic Fade */}
      <div className="absolute inset-0 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Login Card Centered Above Everything */}
      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[400px]">
          <CardDemo />
        </div>
      </div>
    </div>
  );
}

export default Demo;
