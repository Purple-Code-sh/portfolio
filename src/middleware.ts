import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

function detectLocaleFromIP(country: string | null): string | null {
  if (!country) return null;

  const countryToLocale: Record<string, string> = {
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

  return countryToLocale[country] || null;
}

function detectLocaleFromAcceptLanguage(
  acceptLanguage: string | null
): string | null {
  if (!acceptLanguage) return null;

  const browserLocales = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim())
    .map((l) => l.split("-")[0]);

  // Función helper type-safe
  const isValidLocale = (
    locale: string
  ): locale is (typeof routing.locales)[number] => {
    return routing.locales.includes(locale as (typeof routing.locales)[number]);
  };

  const supportedLocale = browserLocales.find(isValidLocale);

  return supportedLocale || null;
}

function getPreferredLocaleFromCookie(request: NextRequest): string | null {
  const cookieValue = request.cookies.get("preferred-locale")?.value;

  // Verificar que el locale de la cookie sea válido
  if (
    cookieValue &&
    (routing.locales as readonly string[]).includes(cookieValue)
  ) {
    return cookieValue;
  }

  return null;
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verificar si la URL ya tiene un locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si ya tiene locale, continuar con el middleware normal
  if (pathnameHasLocale) {
    return createMiddleware(routing)(request);
  }

  // Orden de prioridad para detectar el locale:
  let detectedLocale: string | null = null;

  // 1. Cookie de preferencia (prioridad más alta)
  detectedLocale = getPreferredLocaleFromCookie(request);

  // 2. Detección por IP geográfica
  if (!detectedLocale) {
    // Type-safe access to geo property (available in Vercel Edge Runtime)
    const requestWithGeo = request as NextRequest & {
      geo?: { country?: string; region?: string; city?: string };
    };
    const country =
      requestWithGeo.geo?.country || request.headers.get("cf-ipcountry");
    detectedLocale = detectLocaleFromIP(country);
  }

  // 3. Accept-Language del navegador
  if (!detectedLocale) {
    const acceptLanguage = request.headers.get("accept-language");
    detectedLocale = detectLocaleFromAcceptLanguage(acceptLanguage);
  }

  // 4. Fallback al locale por defecto
  const locale = detectedLocale || routing.defaultLocale;

  // Redirigir con el locale detectado
  const url = new URL(
    `/${locale}${pathname}${request.nextUrl.search}`,
    request.url
  );
  return Response.redirect(url);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
