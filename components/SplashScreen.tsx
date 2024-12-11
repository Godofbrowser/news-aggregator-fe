"use client";

import { useEffect, useRef } from "react";
import { Rocket } from 'lucide-react';
import gsap from "gsap";

export function SplashScreen({ onComplete, contentReady }: { onComplete: () => void; contentReady: boolean }) {
  const rocketRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !rocketRef.current || !contentReady) return;

    const tl = gsap.timeline({
      defaults: { duration: .6, ease: 'power2.out' },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete
        });
      }
    });

     tl
    .to(gsap.utils.toArray(containerRef.current.querySelectorAll('h1, p')), {
      opacity: 0,
      yPercent: 50,
    })
    .to(rocketRef.current, {
      y: () => rocketRef.current ? -(rocketRef.current.getBoundingClientRect().bottom) : window.innerHeight,
      scale: 1.2,
      duration: 1.,
      ease: 'power4.in',
    })
    .to(containerRef.current, {
      opacity: 0,
      scale: 2,
      display: 'none',
    });
  }, [onComplete, contentReady]);

  return (
    <div 
    ref={containerRef} 
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-600"
  >
    <div 
      className="flex flex-col items-center justify-center text-white"
    >
      <Rocket 
        size={120} 
        strokeWidth={1.5} 
        className="mb-4 text-white -rotate-45 animate-pulse"
        ref={rocketRef} 
      />
      <h1 className="text-4xl font-bold tracking-wide">
        NewsHub
      </h1>
      <p className="mt-2 text-lg opacity-75">
        Launching Your News Experience
      </p>
    </div>
  </div>
  );
}
