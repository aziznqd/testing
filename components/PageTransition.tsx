"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition
 * ----------------
 * 8 ədəd şaquli sütun aşağıdan yuxarıya doğru dalğa şəklində
 * qalxaraq bütün ekranı örtür, sonra eyni sütunlar yuxarı
 * doğru davam edib ekranı tam açır (yeni səhifəni göstərir).
 *
 * Animasiya tam bitəndə (sütunlar tam yox olub ekranı açandan sonra)
 * `onComplete` callback-i çağırılır.
 *
 * İstifadə (Next.js App Router - layout.tsx):
 *
 *   import PageTransition from "./PageTransition";
 *
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html lang="az">
 *         <body>
 *           <PageTransition onComplete={() => console.log("animasiya bitdi")} />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 */

interface PageTransitionProps {
  onComplete: () => void;
}

const COLUMN_COUNT = 5;

export default function PageTransition({ onComplete }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);

  // onComplete-i ref-də saxlayırıq ki, effect hər render-də deyil,
  // yalnız pathname dəyişəndə yenidən işə düşsün
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const columns = columnsRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onCompleteRef.current();
      },
    });

    // BAŞLANĞIC VƏZİYYƏT: bütün sütunlar aşağıda, hündürlüyü 0
    gsap.set(columns, {
      scaleY: 0,
      transformOrigin: "bottom",
    });

    // 1-Cİ MƏRHƏLƏ: sütunlar aşağıdan yuxarı qalxıb ekranı tam örtür (dalğa effekti)
    tl.to(columns, {
      scaleY: 1,
      duration: 0.6,
      ease: "power3.inOut",
      stagger: {
        each: 0.08,
        from: "start", // soldan sağa dalğa. "center" versən ortadan başlar
      },
    })
      // Qısa fasilə - ekran tam örtülü qalır (yeni səhifə arxada render olunsun deyə)
      .to({}, { duration: 0.15 })
      // 2-Cİ MƏRHƏLƏ: transform-origin-u yuxarıya keçiririk ki,
      // sütunlar İNDİ yuxarı istiqamətdə "yığılaraq" yox olsun
      .set(columns, { transformOrigin: "top" })
      .to(columns, {
        scaleY: 0,
        duration: 0.6,
        ease: "power3.inOut",
        stagger: {
          each: 0.08,
          from: "start",
        },
      });
    // Timeline bitəndə (yuxarıdakı onComplete) çağırılır

    return () => {
      tl.kill();
    };
    // pathname dəyişəndə (yəni yeni səhifəyə keçiddə) animasiya yenidən işə düşür
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        pointerEvents: "none", // istifadəçinin kliklərinə mane olmasın
      }}
    >
      {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            columnsRef.current[i] = el;
          }}
          style={{
            flex: 1,
            height: "100%",
            background: "#050505", // istədiyin rəngə/gradient-ə dəyişə bilərsən
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}