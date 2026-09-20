import Image from "next/image";
import type { CSSProperties } from "react";

export interface CardProps {
  id: number;
  title: string;
  jobTitle: string;
  description: string[];
  time: string;
  active?: boolean;
  imgSrc: string;
}

export const cardList: CardProps[] = [
  {
    id: 1,
    title: "DevLab LLC",
    jobTitle: "Front-End Development Mentor",
    description: [
      "Mentored frontend developers in building modern web applications using React, Next.js, Tailwind CSS, and other innovative technologies.",
      "Reviewed code and taught best practices to improve code quality.",
      "Guided the team in creating responsive, scalable interfaces.",
    ],
    time: "Sep 2026 - Present",
    active: true,
    imgSrc: "/devlab_logo.png",
  },
  {
    id: 2,
    title: "Vionix Academy",
    jobTitle: "Lead Developer",
    description: [
      "Took full command of the website project, from planning to launch.",
      "Made key technical decisions and managed the development process.",
      "Delivered a complete, production-ready website.",
    ],
    time: "Dec 2025 - Apr 2026",
    imgSrc: "/vionix_logo.png",
  },
  {
    id: 3,
    title: "Foundry Up",
    jobTitle: "Front-End Developer",
    description: [
      "Developed responsive web pages using Next.js and Tailwind CSS.",
      "Turned designs into clean, fast interfaces that work on all screen sizes.",
    ],
    time: "May 2025 - Sep 2025",
    imgSrc: "/foundryup_logo.png",
  },
  {
    id: 4,
    title: "SUMbuilders",
    jobTitle: "Front-End Developer",
    description: [
      "Built the company's first website from scratch using React.",
      "Implemented responsive design so the site works on desktop, tablet, and mobile.",
      "Created reusable components to keep the code clean and easy to extend.",
    ],
    time: "Feb 2025 - Jul 2025",
    imgSrc: "/sumbuilder_logo.png",
  },
];

function getTilt(id: number) {
  const r = Math.sin(id * 12.9898) * 43758.5453;
  const frac = r - Math.floor(r);
  const deg = (frac - 0.5) * 5;
  const signed = Math.abs(deg) < 0.8 ? (deg < 0 ? -0.8 : 0.8) : deg;
  return Math.round(signed * 10) / 10;
}

export default function Card({
  id,
  title,
  jobTitle,
  description,
  time,
  active,
  imgSrc,
}: CardProps) {
  return (
    <article
      style={{ "--tilt": `${getTilt(id)}deg` } as CSSProperties}
      className="flex min-h-0 w-full rotate-[var(--tilt)] flex-col gap-5 overflow-hidden rounded-[2rem] border-[3px] border-foreground bg-foreground p-6 text-[color:var(--background)] transition-transform duration-300 ease-out hover:rotate-0 md:p-8 font-space-grotesk"
    >
      <div className="flex-shrink-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--background)] px-4 py-1.5 text-sm font-medium text-foreground">
          {active && (
            <span
              className="h-2 w-2 rounded-full bg-green-400"
              aria-hidden="true"
            />
          )}
          {time}
        </span>
      </div>

      <div className="flex flex-shrink-0 items-center gap-4">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-neutral-300 bg-foreground">
          <Image
            src={imgSrc}
            alt={`${title} logo`}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-xl font-bold leading-tight tracking-tight md:text-2xl">
            {title}
          </h3>
          <p className="mt-0.5 text-sm">{jobTitle}</p>
        </div>
      </div>

      {description.length > 0 && (
        <ul className="min-h-0 flex-1 list-disc space-y-2 overflow-y-auto pl-5 text-base leading-relaxed marker:text-current md:text-lg">
          {description.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </article>
  );
}