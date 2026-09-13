'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  /** MP4 source (widely supported, use this as the primary/fallback) */
  srcMp4: string;
  /** Optional WebM source, smaller file size, put first so browsers prefer it */
  srcWebm?: string;
  /** Poster image shown before the video can play (also the LCP image) */
  poster?: string;
  children?: React.ReactNode;
}

export default function HeroVideo({ srcMp4, srcWebm, poster, children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Belt-and-suspenders: React doesn't always reliably set the `muted`
  // property on the underlying DOM node, which can silently block
  // autoplay in some browsers. Setting it directly guards against that.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;

    // If the browser already has this video cached/decoded (e.g. after
    // a remount), `canplay` may fire before this effect runs, so we'd
    // never catch it and isLoaded would stay false forever. Checking
    // readyState here catches that case.
    if (el.readyState >= 3) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden px-[clamp(1.5rem,5vw,6rem)] text-[#f5f4f2]">
      {/* Video layer */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onCanPlay={() => setIsLoaded(true)}
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>

      {/* Dark overlay for text contrast — tune opacity to taste */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Foreground content (nav, headline, etc.) */}
      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center">
        {children}
      </div>
    </section>
  );
}