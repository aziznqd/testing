import { Locale } from "next-intl";
import { cookies } from "next/headers";
import HomeClient from "@/components/HomeClient";

export default function Home() {
  async function changeLocalAction(locale: Locale) {
    'use server'
    const store = await cookies();
    store.set('locale', locale);
  }

  return <HomeClient changeLocalAction={changeLocalAction} />;
}