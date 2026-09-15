"use client";

import { useTranslations } from "next-intl";
import { useState, SyntheticEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
}

interface ContactFormErrors {
  name: boolean;
  email: boolean;
  topic: boolean;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    topic: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({
    name: false,
    email: false,
    topic: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim().length > 0) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validate = (): boolean => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    const nextErrors: ContactFormErrors = {
      name: formData.name.trim().length === 0,
      email: !emailValid,
      topic: formData.topic.trim().length === 0,
    };
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.topic;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormData({ name: "", email: "", topic: "" });
      setErrors({ name: false, email: false, topic: false });
      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = useTranslations('Contact')

  return (
    <section className="px-[clamp(1.5rem,5vw,6rem)] py-8 md:py-10 relative z-30 leading-none">
      <div className="bg-foreground rounded-[2rem] md:rounded-[3rem] w-full overflow-hidden relative flex flex-col lg:flex-row items-stretch shadow-2xl">
        {/* LEFT SIDE: FORM ONLY */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col bg-foreground p-8 pb-4 md:p-12 lg:py-16 lg:pl-16 lg:pr-8 lg:pb-16">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full h-full flex-1"
            noValidate
          >
            <div className="flex flex-col gap-1 w-full">
              <input
                type="text"
                placeholder={t("placeholder_name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-invalid={errors.name}
                className={`w-full bg-backgroud px-6 py-4 rounded-full outline-none font-medium text-sm md:text-base placeholder:text-foreground transition-all ${
                  errors.name
                    ? "border-red-500 ring-2 ring-red-500/30"
                    : "border-gray-300 focus:ring-4 focus:ring-backgroud/10 focus:border-backgroud"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-semibold pl-4">
                  {t("error_name")}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <input
                type="email"
                placeholder={t("placeholder_email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-invalid={errors.email}
                className={`w-full bg-backgroud text-backgroud px-6 py-4 rounded-full outline-none font-medium text-sm md:text-base placeholder:text-foreground transition-all ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-500/30"
                    : "border-gray-300 focus:ring-4 focus:ring-backgroud/10 focus:border-backgroud"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs font-semibold pl-4">
                  {t("error_email")}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full flex-1">
              <textarea
                placeholder={t("placeholder_topic")}
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                aria-invalid={errors.topic}
                className={`w-full h-full min-h-[120px] resize-none bg-backgroud px-6 py-4 rounded-3xl outline-none font-medium text-sm md:text-base placeholder:text-foreground transition-all ${
                  errors.topic
                    ? "border-red-500 ring-2 ring-red-500/30"
                    : "border-gray-300 focus:ring-4 focus:ring-backgroud/10 focus:border-backgroud"
                }`}
              />
              {errors.topic && (
                <span className="text-red-500 text-xs font-semibold pl-4">
                  {t("error_topic")}
                </span>
              )}
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[58px] bg-backgroud text-foreground px-8 rounded-full font-bold text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 flex-shrink-0 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? "Sending..." : "Let's Talk"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-600 text-xs font-semibold pl-4 pt-2">
                  {t("form_success")}
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-xs font-semibold pl-4 pt-2">
                  {t("form_error")}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: TEXT ONLY, BLACK & WHITE */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center bg-foreground text-backgroud px-8 pt-0 pb-8 md:px-12 md:pt-0 md:pb-12 lg:py-16 lg:pl-8 lg:pr-16 lg:pt-16">
          <h2 className="flex flex-col gap-2 mb-6 lg:mb-8">
            <span className="font-body text-[clamp(1.5rem,3vw,2.5rem)] font-light tracking-tight leading-tight text-background">
              {t("text_1")}
            </span>
            <span className="font-heading text-[clamp(3.5rem,7vw,6.5rem)] font-bold font-space-grotesk tracking-tight leading-none text-backgroud">
              {t("text_2")}
            </span>
          </h2>
          <p className="text-background text-sm md:text-base max-w-xl font-medium">
              {t("text_3")}
          </p>
        </div>
      </div>
    </section>
  );
}