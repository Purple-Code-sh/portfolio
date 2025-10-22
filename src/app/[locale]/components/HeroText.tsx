"use client";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Inter, Genos } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const genos = Genos({ subsets: ["latin"] });

export default function HeroText() {
  const t = useTranslations("Hero");
  return (
    <article
      className={`mt-4 md:mt-24 lg:mt-32 xl:mt-36 h-[92vh] sh-container z-40 bg-transparent ${genos.className}`}
    >
      <motion.p
        className="text-center md:text-left text-lg sm:text-xl lg:text-2xl z-40 mb-4 text-balance text-primary-400 md:border-l-4 border-primary-500/30 pl-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {t("greeting")}
      </motion.p>
      <motion.h1
        className="text-center md:text-left max-w-prose bg-clip-text z-40 text-transparent bg-gradient-to-t md:bg-gradient-to-tl from-secondary via-white to-primary-500 pb-4 text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {t("role")}
      </motion.h1>
      <motion.p
        className="text-center md:text-left text-xl z-40 md:text-4xl font-medium mb-2 md:mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {t("motto")}
      </motion.p>

      <motion.p
        className={`${inter.className} text-center md:text-left z-40 text-sm md:text-base text-balance font-light md:max-w-prose text-txt-200`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {t("passion")}
      </motion.p>
    </article>
  );
}
