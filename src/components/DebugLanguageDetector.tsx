"use client";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function DebugLanguageDetector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasPreferredLocale = document.cookie.includes("preferred-locale=");
    const isFirstVisit = !localStorage.getItem("language-detected");

    if (hasPreferredLocale || !isFirstVisit) {
      setStatus("Ya configurado");
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 2000);
      return;
    }

    setStatus("Detectando idioma...");
    setIsVisible(true);

    const browserLanguage = navigator.language.split("-")[0];
    const supportedLocales = ["en", "es"];

    if (
      supportedLocales.includes(browserLanguage) &&
      browserLanguage !== locale
    ) {
      setStatus(`Cambiando a ${browserLanguage}...`);
      setTimeout(() => {
        router.replace({ pathname }, { locale: browserLanguage });
      }, 1000);
    } else {
      setStatus("Idioma correcto");
      setTimeout(() => setIsVisible(false), 2000);
    }

    localStorage.setItem("language-detected", "true");
  }, [locale, router, pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <div className="animate-pulse rounded-full h-2 w-2 bg-white"></div>
        <span className="text-sm">{status}</span>
      </div>
    </div>
  );
}
