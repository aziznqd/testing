"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type MarqueeProps = {
  text: string;
  direction?: "left" | "right";
  speed?: number; // px per second
  repeatCount?: number; // must be an even number for the seamless loop trick
  className?: string;
};

export default function FooterText({
  text,
  direction = "left",
  speed = 80,
  repeatCount = 12,
  className = "",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Because every item is identical, shifting the track by exactly
      // half its total scrollWidth produces a perfectly seamless loop.
      const totalWidth = track.scrollWidth / 2;
      const duration = totalWidth / speed;

      gsap.fromTo(
        track,
        { x: direction === "left" ? 0 : -totalWidth },
        {
          x: direction === "left" ? -totalWidth : 0,
          duration,
          ease: "linear",
          repeat: -1,
        }
      );
    }, trackRef);

    return () => ctx.revert();
  }, [direction, speed]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <div
            key={i}
            aria-hidden={i !== 0}
            className="marquee-item px-6 shrink-0"
          >
            <h2 className="footer-heading text-[30vw] sm:text-[30vw] md:text-[20vw] leading-none font-bold uppercase font-space-grotesk">
              {text}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}