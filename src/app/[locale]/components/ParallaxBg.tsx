import React, { Suspense } from "react";
import { useTranslations } from "next-intl";
import {
  Mouse,
  // Rotate3d,
  Move,
  ZoomIn,
  MousePointerClick,
  ArrowBigUp,
} from "lucide-react";

const Spline = React.lazy(() => import("@splinetool/react-spline/next"));

export default function ParallaxBg() {
  const t = useTranslations("Hero.controls");

  return (
    <section className="absolute inset-0 ">
      <div className="relative overflow-hidden h-screen ">
        {/* Backgrounds */}
        <div className="bg-[linear-gradient(to_bottom,rgba(11,17,13,0),rgba(0,0,0,1)),url('/fondo-2.jpg')] mix-blend-difference bg-contain absolute inset-0 bg-top-left bg-no-repeat -z-10" />
        <div className="bg-[url('/fondo-1.jpg')] mix-blend-difference opacity-[2%] bg-contain absolute inset-0 bg-top-left bg-no-repeat -z-10" />

        <div className="w-full h-11/12 lg:w-3/4 lg:top-0 lg:right-0 absolute bottom-0">
          <div className="relative h-full w-full bg-transparent p-8">
            <div className="absolute bottom-4 right-4 z-30 w-auto rounded-md hidden lg:block bg-shBlack border border-primary-500/50 py-2 xl:py-3 px-5 text-sm text-txt-300/60">
              <div className="flex items-center justify-end gap-1">
                <span>{t("hold")}</span>
                <span className="font-bold text-txt-300/70">{t("shift")}</span>

                <ArrowBigUp size={16} className="text-txt-200/80" />
                <span>{t("to")}</span>
              </div>

              <div className="my-1 border-b border-txt-200/25"></div>

              <div className="flex items-center justify-end gap-2">
                <span>{t("panClick")}</span>
                <MousePointerClick size={16} className="text-txt-300/80" />
              </div>

              <div className="mt-1 flex items-center justify-end gap-2">
                <span>{t("zoomWheel")}</span>
                <Mouse size={16} className="text-txt-300/80" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-30 w-auto lg:hidden rounded-md border border-primary-500/50 bg-shBlack px-6 py-2 text-[9px] sm:text-xs text-txt-300/60">
              <div className="mt-1 flex items-center justify-end gap-2">
                <span className="font-medium text-txt-300/70">{t("zoom")}</span>
                <span className="text-txt-300/50">{t("pinching")}</span>
                <ZoomIn size={14} className="text-txt-300/70" />
              </div>

              <div className="mt-1 flex items-center justify-end gap-2">
                <span className="font-medium text-txt-300/70">{t("pan")}</span>
                <span className="text-txt-300/50">{t("twoFingers")}</span>
                <Move size={14} className="text-txt-300/70" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-11/12 lg:w-5/6 lg:top-0 lg:right-0 absolute bottom-0 z-20 brightness-110">
          <Suspense
            fallback={
              <div className="flex items-end lg:items-center p-8 justify-center h-full w-full text-txt-300/80">
                {t("loading")}
              </div>
            }
          >
            <Spline scene="https://prod.spline.design/WlUJKj9kPo5C4Dac/scene.splinecode" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
