"use client";
import { motion } from "motion/react";
import { article } from "motion/react-client";
import { useTranslations } from "next-intl";

export default function HeroText() {
  const t = useTranslations("Hero");
  return (
    <article className="mt-4 md:mt-12 lg:mt-16 h-[90dvh] sh-container z-30 bg-transparent">
      <motion.p
        className="text-center md:text-left text-base md:text-lg mb-4 text-balance text-primary-400 md:border-l-4 border-primary-500/30 pl-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {t("greeting")}
      </motion.p>
      <motion.h1
        className="text-center md:text-left bg-clip-text text-transparent bg-gradient-to-t md:bg-gradient-to-tl from-secondary via-white to-primary-500 pb-4 text-5xl md:text-6xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {t("role")}
      </motion.h1>
      <motion.p
        className="text-center md:text-left  text-xl md:text-2xl font-medium mb-2 md:mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {t("motto")}
      </motion.p>

      <motion.p
        className="text-center md:text-left text-base md:text-lg text-balance font-light md:max-w-prose text-txt-200"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {t("passion")}
      </motion.p>
    </article>
  );
}
