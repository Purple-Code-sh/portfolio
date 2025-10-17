"use client";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBg from "../components/ParallaxBg";
import { CharacModel } from "../components/CharacModel";
import { OrbitControls } from "@react-three/drei";

export default function Hero() {
  return (
    <section>
      <HeroText />
      <ParallaxBg />
      <figure
        className="absolute inset-0 mx-auto z-30 border border-red-800"
        style={{ width: "90vw", height: "90dvh" }}
      >
        <Canvas>
          <CharacModel />
          <OrbitControls />
        </Canvas>
      </figure>
    </section>
  );
}
