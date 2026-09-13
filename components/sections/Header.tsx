import { useTranslations } from "next-intl";
import HeaderVideo from "../HeaderVideo";
import PlaceIcon from '@mui/icons-material/Place';

export default function Header(){

    const t = useTranslations('Header')

    return(
        <HeaderVideo srcMp4="/noir-video.mp4">
                <div>
                    <h1 className="uppercase text-text">
                        <span className="block leading-none font-space-grotesk font-bold text-[clamp(3.25rem,10vw,10.5rem)]">{t('name_1')}</span> 
                        <span className="block leading-none font-space-grotesk font-bold text-[clamp(3.25rem,10vw,10.5rem)] pl-[clamp(1.5rem,4vw,5rem)]">{t('name_2')}</span>
                    </h1>
                    <div className="mt-[clamp(1.25rem,2vw,2rem)] flex items-center gap-[0.5em] text-[clamp(0.85rem,1vw,1.05rem)] text-surface font-normal tracking-[0.01em] leading-[1.6]">
                        <span>{t('subheader')}</span>
                    </div>
                </div>
                <div className="absolute z-10 inset-x-0 bottom-0 py-6 max-sm:flex-col max-sm:gap-2 max-sm:items-start max-sm:pb-5">
                  <div className="flex items-center gap-[0.35rem]">
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-medium">{t("placement_1")}</span>
                    <PlaceIcon className="mx-[0.1rem]" />
                    <span className="text-[0.65rem] uppercase tracking-[0.18em] font-bold">{t("placement_2")}</span>
                  </div>
                </div>
        </HeaderVideo>
    )
}