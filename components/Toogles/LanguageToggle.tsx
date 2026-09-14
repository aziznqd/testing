'use client'

import { Locale, useLocale } from "next-intl"

type LanguageToggleProps = {
    changeLocalAction: (locale: Locale) => Promise<void>;
    onClick: () => void
}

export default function LanguageToggle({changeLocalAction, onClick}: LanguageToggleProps){

    const locale = useLocale(); 

    function handleClick(){
        onClick()
        setTimeout(() => {
            const nextLocale = locale === "en" ? "az" : "en";
            changeLocalAction(nextLocale as Locale)
        }, 1000)
    }

    return(
        <button 
            onClick={handleClick}
            className="className='flex items-center gap-1.5 px-3 py-1 rounded-full  hover:bg-white/20 transition-all duration-200 cursor-pointer active:scale-95 transition-all ease-in-out duration-300'">
            {locale.toUpperCase()}
        </button>
    )
}