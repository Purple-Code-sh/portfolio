import React, { Suspense } from "react";
import {
  Mouse,
  Rotate3d,
  Move,
  ZoomIn,
  MousePointerClick,
  ArrowBigUp,
} from "lucide-react";

const Spline = React.lazy(() => import("@splinetool/react-spline/next"));

export default function ParallaxBg() {
  return (
    <section className="absolute inset-0 ">
      <div className="relative overflow-hidden h-screen ">
        {/* Background */}
        <div className="bg-[url('/bg-grany-2.webp')] mix-blend-difference opacity-80 bg-cover absolute inset-0 bg-top-left bg-no-repeat -z-10" />

        <div className="w-full h-11/12 lg:w-3/4 lg:top-0 lg:right-0 absolute bottom-0">
          <div className="relative h-full w-full bg-transparent p-8">
            <div className="absolute bottom-4 right-4 z-30 w-auto rounded-md hidden lg:block bg-shBlack py-2 px-5 text-sm text-txt-300/60">
              {/* Fila 1: Tecla Shift */}
              <div className="flex items-center justify-end gap-1">
                <span>Mantén</span>
                <span className="font-bold text-txt-300/70">Shift</span>

                <ArrowBigUp size={16} className="text-txt-200/80" />
                <span>para:</span>
              </div>

              <div className="my-1 border-b border-txt-200/10"></div>

              {/* Fila 2: Click (Mover) */}
              <div className="flex items-center justify-end gap-2">
                <span>Mover (Click)</span>
                {/* CORRECCIÓN: Ícono para la acción de click */}
                <MousePointerClick size={16} className="text-txt-300/80" />
              </div>

              {/* Fila 3: Rueda (Zoom) */}
              <div className="mt-1 flex items-center justify-end gap-2">
                <span>Zoom (Rueda)</span>
                {/* CORRECCIÓN: Ícono del mouse (que muestra la rueda) */}
                <Mouse size={16} className="text-txt-300/80" />
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-30 w-auto lg:hidden rounded-md bg-shBlack px-6 py-2 text-[9px] sm:text-xs text-txt-300/60">
              {/* Fila 1: Orbitar */}
              <div className="flex items-center justify-end gap-2">
                <span className="font-medium text-txt-300/70">Orbitar</span>
                <span className="text-txt-300/50">(2 dedos)</span>
                <Rotate3d size={14} className="text-txt-300/70" />
              </div>

              {/* Fila 2: Mover (Pan) */}
              <div className="mt-1 flex items-center justify-end gap-2">
                <span className="font-medium text-txt-300/70">Mover</span>
                <span className="text-txt-300/50">(3 dedos)</span>
                <Move size={14} className="text-txt-300/70" />
              </div>

              {/* Fila 3: Zoom */}
              <div className="mt-1 flex items-center justify-end gap-2">
                <span className="font-medium text-txt-300/70">Zoom</span>
                <span className="text-txt-300/50">(Pellizcar)</span>
                <ZoomIn size={14} className="text-txt-300/70" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-11/12 lg:w-5/6 lg:top-0 lg:right-0 absolute bottom-0 z-20 brightness-110">
          <Suspense
            fallback={
              <div className="flex items-end lg:items-center p-8 justify-center h-full w-full text-txt-300/80">
                Loading 3D Model...
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
