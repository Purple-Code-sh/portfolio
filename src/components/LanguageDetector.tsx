"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageDetector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo ejecutar en el primer render y si no hay cookie de preferencia
    const hasPreferredLocale = document.cookie.includes("preferred-locale=");
    const isFirstVisit = !localStorage.getItem("language-detected");

    if (hasPreferredLocale || !isFirstVisit) {
      return;
    }

    // Detectar idioma del navegador como fallback
    const browserLanguage = navigator.language.split("-")[0];
    const supportedLocales = ["en", "es"];

    // Si el idioma del navegador es diferente al actual y está soportado
    if (
      supportedLocales.includes(browserLanguage) &&
      browserLanguage !== locale
    ) {
      // Cambiar al idioma detectado
      router.replace({ pathname }, { locale: browserLanguage });
    }

    // Marcar que ya se ejecutó la detección
    localStorage.setItem("language-detected", "true");
  }, [locale, router, pathname]);

  return null; // Este componente no renderiza nada
}

// Componente para mostrar un indicador de carga durante el cambio de idioma
export function LanguageChangeIndicator() {
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
        <span className="text-sm">Cambiando idioma...</span>
      </div>
    </div>
  );
}
