import { useTranslations } from "next-intl";
import HeaderVideo from "../HeaderVideo";
import PlaceIcon from '@mui/icons-material/Place';

export default function Header(){

    const t = useTranslations('Header')

    return(
        <HeaderVideo srcMp4="/noir-video.mp4">
                <div>
                    <h1 className="uppercase text-text rotate-90 md:rotate-0 text-9xl md:text-[clamp(8rem,20vw,16rem)]">
                        <span className="block leading-none font-space-grotesk font-bold">{t('name_1')}</span> 
                        <span className="block leading-none font-space-grotesk font-bold">{t('name_2')}</span>
                    </h1>
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