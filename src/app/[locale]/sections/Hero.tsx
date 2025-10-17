"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBg from "../components/ParallaxBg";
import CharacModel from "../components/CharacModel";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  const logCameraState = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      const target = controlsRef.current.target;

      // Imprime los valores en la consola de una forma fácil de copiar
      console.log(
        `%cCamera Position:`,
        "color: yellow; font-weight: bold;",
        `[${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(
          2
        )}, ${camera.position.z.toFixed(2)}]`
      );
      console.log(
        `%cControls Target:`,
        "color: cyan; font-weight: bold;",
        `[${target.x.toFixed(2)}, ${target.y.toFixed(2)}, ${target.z.toFixed(
          2
        )}]`
      );
    }
  };

  return (
    <section>
      <HeroText />
      <ParallaxBg />
      <CharacModel />
    </section>
  );
}
