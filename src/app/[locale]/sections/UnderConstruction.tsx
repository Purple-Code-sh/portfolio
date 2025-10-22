import { useTranslations } from "next-intl";
import Image from "next/image";
import { Linkedin, Link, Github, Mail } from "lucide-react"; // Importa los iconos necesarios de lucide-react

export default function UnderConstruction() {
  const t = useTranslations("UnderConstruction");
  return (
    <section className="w-full py-12 md:py-16 xl:py-20 max-w-3xl mx-auto">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <Image
          src="/under-c.png"
          alt="Under Construction"
          className="w-full h-auto object-contain rounded-lg mix-blend-exclusion opacity-85"
          width={1184}
          height={518}
        />
        <h4 className=" text-center text-txt-300 text-sm lg:text-base font-semibold">
          {t("title")}
        </h4>

        <div className="text-center mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://www.linkedin.com/in/purple-code-sh"
            className="flex flex-col items-center p-4 bg-neutral-800 border-secondary/20 hover:border-primary-400/50 shadow-primary-400/15 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-8 w-8 text-primary-500 mb-2 group-hover:text-primary-400" />{" "}
            <div className="font-semibold text-primary-500 text-lg flex items-center gap-1 group-hover:text-primary-400">
              <Link className="h-4 w-4" />
              LinkedIn
            </div>
            <span className="text-sm text-gray-400 mt-1 break-all">
              purple-code-sh
            </span>
          </a>
          <a
            href="https://github.com/Purple-Code-sh"
            className="flex flex-col items-center p-4 bg-neutral-800 border-secondary/20 hover:border-primary-400/50 shadow-primary-400/15 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-8 w-8 text-primary-500 mb-2 group-hover:text-primary-400" />{" "}
            <div className="font-semibold text-primary-500 text-lg flex items-center gap-1 group-hover:text-primary-400">
              <Link className="h-4 w-4" />
              GitHub
            </div>
            <span className="text-sm text-gray-400 mt-1 break-all">
              Purple-Code-sh
            </span>
          </a>
          <a
            href="mailto:purple.code.sh@gmail.com"
            className="flex flex-col items-center p-4 bg-neutral-800 border-secondary/20 hover:border-primary-400/50 shadow-primary-400/15 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl group"
          >
            <Mail className="h-8 w-8 text-primary-500 mb-2 group-hover:text-primary-400" />{" "}
            <div className="font-semibold text-primary-500 text-lg flex items-center gap-1 group-hover:text-primary-400">
              <Link className="h-4 w-4" />
              Email
            </div>
            <span className="text-sm text-gray-400 mt-1 break-all">
              purple.code.sh@gmail.com
            </span>
          </a>
        </div>

        <div className="text-center mx-auto mt-8">
          <a
            href="/CV4_en.pdf"
            download
            className="bg-gradient-to-t from-primary-500 to-gray-100 hover:from-primary-400 hover:to-white transition-colors duration-300 hover:scale-[102%] cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black font-bold py-3 px-6 rounded-full text-sm md:text-base disabled:bg-neutral-400 disabled:cursor-not-allowed"
          >
            Descargar Currículum
          </a>
        </div>
      </div>
    </section>
  );
}
