'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  srcMp4: string;
  srcWebm?: string;
  poster?: string;
  children?: React.ReactNode;
}

export default function HeroVideo({ srcMp4, srcWebm, poster, children }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;

    if (el.readyState >= 3) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden px-[clamp(1.5rem,5vw,6rem)] text-[#f5f4f2]">
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

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        {children}
      </div>
    </section>
  );
}