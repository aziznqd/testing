'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

type FooterLinkProps = {
  label: string;
  href: string;
  target?: '_blank' | '_self';
};

export default function FooterLink({
  label,
  href,
  target = '_blank',
}: FooterLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const link = linkRef.current;
      if (!link) return;

      const front = link.querySelector('.footer-link-front');
      const back = link.querySelector('.footer-link-back');

      gsap.set(front, { yPercent: 0, opacity: 1 });
      gsap.set(back, { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.4, ease: 'power3.inOut' },
      });

      tl.to(front, { yPercent: -100, opacity: 0 }, 0).to(
        back,
        { yPercent: 0, opacity: 1 },
        0
      );

      link.addEventListener('mouseenter', () => tl.play());
      link.addEventListener('mouseleave', () => tl.reverse());
    }, linkRef);

    return () => ctx.revert();
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className="footer-link relative inline-block overflow-hidden uppercase"
    >
      <div className="footer-link-inner relative h-[1.2em]">
        <div className="footer-link-front block">
          <div>{label}</div>
        </div>
        <div className="footer-link-back absolute left-0 top-0 block">
          <div>{label}</div>
        </div>
      </div>
    </a>
  );
}