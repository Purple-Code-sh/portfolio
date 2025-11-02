"use client";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import USFlag from "country-flag-icons/react/3x2/US";
import MXFlag from "country-flag-icons/react/3x2/MX";
import Link from "next/link";

const languages = [
  {
    code: "es",
    countryCode: "ES",
    Flag: MXFlag,
  },
  {
    code: "en",
    countryCode: "US",
    Flag: USFlag,
  },
  // Removí 'il' ya que no está en tu routing.ts
];

// Función para establecer la cookie de preferencia
function setPreferredLocaleCookie(locale: string) {
  // Cookie que expira en 1 año
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  document.cookie = `preferred-locale=${locale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

// Función para obtener la cookie de preferencia
function getPreferredLocaleCookie(): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const preferredLocaleCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("preferred-locale=")
  );

  return preferredLocaleCookie
    ? preferredLocaleCookie.split("=")[1].trim()
    : null;
}

export default function LanguageSelector() {
  const t = useTranslations("Languages");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  function onLanguageChange(nextLocale: string) {
    // Cerrar el dropdown
    setIsOpen(false);

    // Guardar la preferencia en cookie
    setPreferredLocaleCookie(nextLocale);

    // Navegar al nuevo locale
    router.replace({ pathname }, { locale: nextLocale });

    // Opcional: Mostrar un toast o feedback visual
    console.log(`Idioma cambiado a: ${nextLocale}`);
  }

  // Función para resetear la detección automática
  function resetAutoDetection() {
    // Eliminar la cookie de preferencia
    document.cookie =
      "preferred-locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Recargar la página para que se vuelva a detectar automáticamente
    window.location.reload();
  }

  return (
    <div className="text-txt-300 relative flex justify-end pt-3 z-50 gap-6 sh-container">
      <Link href="/">
        <p className=" bg-black flex cursor-pointer items-center space-x-2 px-4 py-2 backdrop-blur-2xl transition-colors hover:text-white hover:underline duration-300">
          Home
        </p>
      </Link>
      <Link href="/blog/">
        <p className=" bg-black flex cursor-pointer items-center space-x-2 px-4 py-2 backdrop-blur-2xl transition-colors hover:text-white hover:underline duration-300">
          Blog
        </p>
      </Link>

      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-neutral-700 bg-black flex cursor-pointer items-center space-x-2 rounded-full border border-white/25 px-4 py-2 backdrop-blur-2xl transition-colors duration-300"
        title={t("title")}
      >
        <currentLanguage.Flag className="h-4 w-auto" />
        <span className="text-sm font-medium text-white capitalize">
          {currentLanguage.code}
        </span>
        <ChevronDown
          className={`h-4 w-auto font-bold text-white transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-fit rounded-lg border bg-black py-1 shadow-lg backdrop-blur">
          {languages.map((language) => {
            const { Flag } = language;
            const isCurrentLanguage = locale === language.code;

            return (
              <button
                key={language.code}
                onClick={() => onLanguageChange(language.code)}
                disabled={isCurrentLanguage}
                className={`hover:bg-neutral-700 flex w-full cursor-pointer items-center space-x-2 px-4 py-2 text-white transition-colors duration-300 ${
                  isCurrentLanguage
                    ? "bg-white/10 cursor-not-allowed opacity-75"
                    : ""
                }`}
              >
                <Flag className="h-5 w-5 rounded-sm" />
                <span
                  className="text-txt-300 text-sm font-medium"
                  title={t(language.code)}
                >
                  {t(language.code)}
                  {isCurrentLanguage && " ✓"}
                </span>
              </button>
            );
          })}

          {/* Opción para resetear detección automática */}
          {getPreferredLocaleCookie() && (
            <>
              <hr className="my-1 border-white/20" />
              <button
                onClick={resetAutoDetection}
                className="hover:bg-neutral-700 flex w-full cursor-pointer items-center space-x-2 px-4 py-2 text-white transition-colors duration-300"
                title="Resetear y usar detección automática"
              >
                <span className="text-xs">🌍 Auto</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
