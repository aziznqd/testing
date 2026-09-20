"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Card, { cardList } from "./Card";

function AnimatedHeading({ text }: { text: string }) {
  const reduce = useReducedMotion();
  let letterIndex = 0;

  return (
    <h2
      className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-space-grotesk"
      aria-label={text}
    >
      {text.split(" ").map((word, w, words) => (
        <span
          key={w}
          className="inline-block whitespace-nowrap"
          aria-hidden="true"
        >
          {word.split("").map((char) => {
            const i = letterIndex++;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={
                  reduce ? false : { opacity: 0, filter: "blur(8px)", y: 10 }
                }
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </h2>
  );
}

const VISIBLE = 2;
const SCROLL_VH_PER_CARD = 100;

type Phase = "before" | "pinned" | "after";

function PinnedSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("before");

  const extraCards = Math.max(cardList.length - VISIBLE, 0);
  const scrollVh = extraCards * SCROLL_VH_PER_CARD;

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setPhase(p <= 0 ? "before" : p >= 1 ? "after" : "pinned");
  });

  const x = useTransform(
    scrollYProgress,
    (v) => `calc(${v * extraCards} * (var(--cw) + var(--gap)) * -1)`
  );

  const stagePosition =
    phase === "pinned"
      ? "fixed inset-x-0 top-0"
      : phase === "after"
        ? "absolute inset-x-0 bottom-0"
        : "absolute inset-x-0 top-0";

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ height: `${100 + scrollVh}vh` }}
    >
      <div
        className={`flex h-screen flex-col overflow-hidden ${stagePosition}`}
        style={
          {
            "--gap": "1.5rem",
            "--cw": `calc((100vw - 2 * clamp(1.5rem,5vw,6rem) - (${VISIBLE} - 1) * 1.5rem) / ${VISIBLE})`,
          } as CSSProperties
        }
      >
        <div className="px-[clamp(1.5rem,5vw,6rem)] pb-6 pt-10">
          <AnimatedHeading text="Experience" />
        </div>

        <div className="min-h-0 flex-1 pb-8">
          <motion.div
            style={{ x, paddingInline: "clamp(1.5rem,5vw,6rem)" }}
            className="flex h-full w-max items-stretch gap-[var(--gap)] transform-gpu"
          >
            {cardList.map((card) => (
              <div
                key={card.id}
                style={{ width: "var(--cw)" }}
                className="h-full flex-shrink-0"
              >
                <Card {...card} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PlainSection() {
  return (
    <div className="px-[clamp(1.5rem,5vw,6rem)] py-8 md:py-10">
      <div className="mb-6 flex justify-start text-left">
        <AnimatedHeading text="Experience" />
      </div>
      <div className="flex flex-col gap-6">
        {cardList.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-20 text-foreground">
      {reduce ? (
        <PlainSection />
      ) : (
        <>
          <div className="hidden lg:block">
            <PinnedSection />
          </div>
          <div className="lg:hidden">
            <PlainSection />
          </div>
        </>
      )}
    </section>
  );
}