import HeroText from "../components/HeroText";
import ParallaxBg from "../components/ParallaxBg";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // ... (aquí puede ir tu 'title', 'description', etc.)
  other: {
    rel: "preload",
    href: "https://prod.spline.design/WlUJKj9kPo5C4Dac/scene.splinecode",
    as: "fetch",
    crossOrigin: "anonymous",
  },
};

export default function Hero() {
  return (
    <section>
      <div className="z-40">
        <HeroText />
      </div>
      <div className="z-30">
        <ParallaxBg />
      </div>
    </section>
  );
}
