"use client";

import { useTranslations } from "next-intl";
import FooterText from "./FooterText";

export default function FooterAnimation() {

    const t = useTranslations('Footer')

  return (
    <div className="footer-row-middle relative w-screen left-1/2 -translate-x-1/2 overflow-hidden pt-8">
      <div className="w-full">
        <FooterText text={t("animation_text_1")} direction="left" speed={80} />
        <FooterText text={t("animation_text_2")} direction="right" speed={80} />
      </div>
    </div>
  );
}