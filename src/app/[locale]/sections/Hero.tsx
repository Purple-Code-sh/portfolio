import HeroText from "../components/HeroText";
import ParallaxBg from "../components/ParallaxBg";

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
