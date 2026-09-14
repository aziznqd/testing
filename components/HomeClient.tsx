"use client";

import LanguageToggle from "@/components/Toogles/LanguageToggle";
import Preloader from "@/components/Preloader";
import Header from "@/components/Sections/Header";
import { ThemeToggle } from "@/components/Toogles/ThemeToggle";
import { Locale } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import PageTransition from "./PageTransition";
import Footer from "./Sections/Footer";

export default function HomeClient({
  changeLocalAction,
}: {
  changeLocalAction: (locale: Locale) => Promise<void>;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [changing, setChanging] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastScrollY = window.scrollY;
    let isHidden = false;
    const threshold = 10; // ignore tiny scroll jitters

    const showHeader = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(header, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const hideHeader = () => {
      if (isHidden) return;
      isHidden = true;
      gsap.to(header, {
        yPercent: -150,
        duration: 0.4,
        ease: "power3.in",
      });
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Always show header near the top of the page
      if (currentScrollY < 80) {
        showHeader();
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(delta) < threshold) return;

      if (delta > 0) {
        // scrolling down
        hideHeader();
      } else {
        // scrolling up
        showHeader();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {changing && <PageTransition onComplete={() => setChanging(false)} />}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-5 transition-all duration-300 ease-in-out pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-end rounded-full transition-all duration-500 ease-in-out w-[95%] max-w-[1400px] px-0 py-2 bg-transparent border-none shadow-none">
          <div className="pointer-events-auto flex">
            <ThemeToggle onClick={() => setChanging(true)} />
            <LanguageToggle
              changeLocalAction={changeLocalAction}
              onClick={() => setChanging(true)}
            />
          </div>
        </div>
      </header>
      <main>
        <Header />
        <Footer/>
      </main>
    </>
  );
}