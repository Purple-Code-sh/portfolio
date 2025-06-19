import { routing } from "@/i18n/routing";

export type SupportedLocale = (typeof routing.locales)[number];

/**
 * Establece la cookie de preferencia de idioma
 */
export function setPreferredLocaleCookie(locale: SupportedLocale): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 año

  document.cookie = `preferred-locale=${locale}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Obtiene la cookie de preferencia de idioma
 */
export function getPreferredLocaleCookie(): SupportedLocale | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const preferredLocaleCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("preferred-locale=")
  );

  if (!preferredLocaleCookie) return null;

  const locale = preferredLocaleCookie.split("=")[1].trim() as SupportedLocale;

  // Verificar que sea un locale válido
  return routing.locales.includes(locale) ? locale : null;
}

/**
 * Elimina la cookie de preferencia de idioma
 */
export function removePreferredLocaleCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie =
    "preferred-locale=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

/**
 * Detecta el idioma preferido del navegador
 */
export function getBrowserPreferredLocale(): SupportedLocale | null {
  if (typeof navigator === "undefined") return null;

  const browserLanguage = navigator.language.split("-")[0] as SupportedLocale;

  return routing.locales.includes(browserLanguage) ? browserLanguage : null;
}

/**
 * Mapea países a locales
 */
export const countryToLocaleMap: Record<string, SupportedLocale> = {
  // Países de habla hispana
  MX: "es",
  ES: "es",
  AR: "es",
  CO: "es",
  PE: "es",
  CL: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  GQ: "es",

  // Países de habla inglesa
  US: "en",
  CA: "en",
  GB: "en",
  AU: "en",
  NZ: "en",
  IE: "en",
  ZA: "en",
  IN: "en",
  SG: "en",
  HK: "en",
};

/**
 * Obtiene el locale basado en el código de país
 */
export function getLocaleFromCountry(
  countryCode: string
): SupportedLocale | null {
  return countryToLocaleMap[countryCode.toUpperCase()] || null;
}

/**
 * Verifica si hay una preferencia de idioma guardada
 */
export function hasPreferredLocale(): boolean {
  return getPreferredLocaleCookie() !== null;
}

/**
 * Resetea todas las preferencias y recarga la página para autodetección
 */
export function resetToAutoDetection(): void {
  removePreferredLocaleCookie();

  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("language-detected");
  }

  if (typeof window !== "undefined") {
    window.location.reload();
  }
}
