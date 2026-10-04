"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
  afterImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
  beforeLabel = "Swirled & Oxidized Paint (Before)",
  afterLabel = "Stage 2 Paint Correction + 10H Ceramic (After)",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="w-full">
      <div
        className="relative w-full h-80 sm:h-[480px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-2xl bg-black"
        onMouseMove={(e) => isDragging && handleSliderMove(e)}
        onTouchMove={(e) => isDragging && handleSliderMove(e)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onClick={(e) => handleSliderMove(e)}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="After paint correction and ceramic coating"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-emerald-500/40 text-emerald-400 text-xs font-semibold tracking-wide">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full min-w-[320px] sm:min-w-[600px] lg:min-w-[1000px]">
            <Image
              src={beforeImage}
              alt="Before paint correction"
              fill
              className="object-cover filter contrast-75 brightness-90"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded border border-red-500/40 text-red-400 text-xs font-semibold tracking-wide whitespace-nowrap">
            {beforeLabel}
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-xl pointer-events-auto">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2.5 flex items-center justify-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        Drag slider left and right to inspect optical clarity and depth restoration
      </p>
    </div>
  );
}
