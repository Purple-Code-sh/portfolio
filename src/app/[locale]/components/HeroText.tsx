"use client";
import { motion } from "motion/react";
import { article } from "motion/react-client";

export default function HeroText() {
  return (
    <article className="mt-4 md:mt-12 lg:mt-16 h-[90dvh] sh-container z-20 bg-transparent">
      <motion.p
        className="text-center md:text-left text-base md:text-lg mb-4 text-balance text-primary-400 md:border-l-4 border-primary-500/30 pl-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Hi, I&apos;m Shmin.
      </motion.p>
      <motion.h1
        className="text-center md:text-left bg-clip-text text-transparent bg-gradient-to-t md:bg-gradient-to-tl from-secondary via-white to-primary-500 pb-4 text-5xl md:text-6xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Software Engineer
      </motion.h1>
      <motion.p
        className="text-center md:text-left  text-xl md:text-2xl font-medium mb-2 md:mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Scaling Teams with Code.
      </motion.p>

      <motion.p
        className="text-center md:text-left text-base md:text-lg text-balance font-light md:max-w-prose text-txt-200"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        I&apos;m passionate about building solutions with React, Next.js, and
        Python that solve complex business challenges through automation and
        AI-powered tools.
      </motion.p>
    </article>
  );
}
