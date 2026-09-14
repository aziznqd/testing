'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  /** Called once the reveal animation finishes, so the parent can unmount this. */
  onComplete?: () => void;
  /** How long the count/bar-fill takes, in seconds. */
  duration?: number;
}

/**
 * Full-screen page-reveal preloader, styled with Tailwind.
 *
 * - Bottom-right: a "000 → 100%" tabular counter
 * - Center: a thin loader bar that fills across a fixed width
 * - On complete: two panels split open (top slides up, bottom slides down)
 *   to reveal the page underneath
 *
 * Usage:
 *   {loading && <Preloader onComplete={() => setLoading(false)} />}
 */
export default function Preloader({ onComplete, duration = 2.4 }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const counterRowRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const barWrapRef = useRef<HTMLDivElement | null>(null);
  const panelTopRef = useRef<HTMLDivElement | null>(null);
  const panelBottomRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const counterEl = counterRef.current;
    const counterObj = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          setIsDone(true);
          onComplete?.();
        },
      });

      // 1. Count 0 -> 100 and fill the bar in lockstep
      tl.to(counterObj, {
        value: 100,
        duration,
        ease: 'power1.inOut',
        onUpdate: () => {
          const val = Math.floor(counterObj.value);
          if (counterEl) counterEl.textContent = String(val).padStart(1, '0');
        },
      }).to(
        barRef.current,
        { scaleX: 1, duration, ease: 'power1.inOut' },
        '<' // start at the same time as the count
      );

      // 2. Fade the counter + bar out
      tl.to([counterRowRef.current, barWrapRef.current], {
        opacity: 0,
        duration: 0.9,
        ease: 'power1.out',
      });

      // 3. Split the panels open to reveal the page
      tl.to(
        panelTopRef.current,
        { yPercent: -100, duration: 1.1, ease: 'power4.inOut' },
        '-=0.05'
      ).to(
        panelBottomRef.current,
        { yPercent: 100, duration: 1.1, ease: 'power4.inOut' },
        '<'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [duration, onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Curtain panels */}
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-black"
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black"
      />

      {/* Center loader bar */}
      <div
        ref={barWrapRef}
        className="absolute top-1/2 left-1/2 z-[2] w-[100vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-px w-full overflow-hidden bg-white/15">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left scale-x-0 bg-white"
          />
        </div>
      </div>

      {/* Bottom-right counter */}
      <div
        ref={counterRowRef}
        className="absolute bottom-5 right-5 z-[2] flex items-end gap-[2px] sm:bottom-8 sm:right-8 md:bottom-12 md:right-16 font-space-grotesk text-text"
      >
        <span
          ref={counterRef}
          className="text-[28px] leading-none tracking-tight tabular-nums sm:text-4xl md:text-[54px]"
        >
          0
        </span>
        <span className="mb-1.5 text-[13px] opacity-55 sm:text-base md:text-lg">
          %
        </span>
      </div>
    </div>
  );
}