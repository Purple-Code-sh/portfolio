"use client";
import { motion } from "motion/react";
import { Inter, Genos } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const genos = Genos({ subsets: ["latin"] });

export default function Blogs(props: {
  pageTitle: string;
  pageDescription?: string;
  indexArray: {
    [key: string]: { name: string; url: string };
  };
}) {
  return (
    <div className={` w-full z-40 bg-transparent ${genos.className}`}>
      <motion.h1
        className="text-center md:text-left max-w-prose bg-clip-text text-transparent bg-gradient-to-t md:bg-gradient-to-tl from-secondary via-white to-primary-500 pb-4 text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        {props.pageTitle}
      </motion.h1>

      <motion.p
        className={`${inter.className} text-center md:text-left z-40 mb-6 md:mb-8 lg:mb-12 text-sm md:text-base text-balance font-light text-balance text-txt-200`}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {props.pageDescription}
      </motion.p>

      <div className="flex flex-col gap-3">
        {Object.keys(props.indexArray).map((key) => (
          <Link href={props.indexArray[key].url} key={key}>
            <motion.p
              className="text-center md:text-left text-xl bg-neutral-800 px-4 md:px-6 py-2 rounded-lg hover:bg-primary-500/25 transition-colors hover:underline underline-offset-4 duration-200 md:text-4xl font-medium mb-2 md:mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {props.indexArray[key].name}
            </motion.p>
          </Link>
        ))}
      </div>
    </div>
  );
}
