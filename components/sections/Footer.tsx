import FooterLink from "../FooterTools/FooterLink";
import FooterAnimation from "../FooterTools/FooterAnimation";

export default function Footer() {
  return (
    <section className="flex flex-col px-[clamp(1.5rem,5vw,6rem)] pt-7 pb-7">
      <div
        className="flex flex-col items-start text-center gap-4
                   lg:flex-row lg:items-center lg:justify-between lg:text-left lg:gap-6
                   font-space-grotesk font-bold
                   text-lg sm:text-3xl md:text-3xl"
      >
        <div className="break-all sm:break-normal">
          <a
            href="mailto:contact@azizaghanagdiyev.com"
            className="border-b hover:border-b-5 transition-all duration-100 ease-in-out uppercase"
          >
            contact@azizaghanagdiyev.com
          </a>
        </div>
        <div className="flex flex-col items-start lg:items-center gap-4 lg:flex-row lg:gap-6">
          <FooterLink label="LINKEDIN" href="https://www.linkedin.com/in/azizagha-nagdiyev-928848250" />
          <FooterLink label="INSTAGRAM" href="https://www.instagram.com/aziznqdyv/" />
          <FooterLink label="GITHUB" href="https://github.com/aziznqd" />
        </div>
      </div>

      {/* Grows to consume all leftover vertical space, but pins
          FooterMiddle to the bottom of that space instead of centering it */}
      <div className="flex-1 flex flex-col justify-end min-h-0">
        <FooterAnimation />
      </div>
    </section>
  );
}