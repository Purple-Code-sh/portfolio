import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import defaultMessages from "../../messages/es.json";
import { headers, cookies } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  let locale = routing.defaultLocale;

  if (requested && hasLocale(routing.locales, requested)) {
    // Si hay un locale válido en la URL, usarlo
    locale = requested;
  } else {
    // Fallback: intentar obtener de cookie de preferencia
    const cookieStore = await cookies();
    const preferredLocale = cookieStore.get("preferred-locale")?.value;

    if (preferredLocale && hasLocale(routing.locales, preferredLocale)) {
      locale = preferredLocale as (typeof routing.locales)[number];
    } else {
      // Fallback final: usar Accept-Language header
      const headersList = await headers();
      const acceptLanguage = headersList.get("accept-language");

      if (acceptLanguage) {
        const browserLocales = acceptLanguage
          .split(",")
          .map((l) => l.split(";")[0].trim())
          .map((l) => l.split("-")[0]);

        const supportedLocale = browserLocales.find((l) =>
          (routing.locales as readonly string[]).includes(l)
        );

        if (supportedLocale) {
          locale = supportedLocale as (typeof routing.locales)[number];
        }
      }
    }
  }

  const headersList = await headers();
  const now = headersList.get("x-now");
  const timeZone = headersList.get("x-time-zone") ?? "America/Mexico_City";

  const localeMessages = (await import(`../../messages/${locale}.json`))
    .default;
  const messages = { ...defaultMessages, ...localeMessages };

  return {
    locale,
    now: now
      ? new Date(now)
      : // Ensure a consistent value for a render
        new Date(),
    timeZone,
    messages,
  };
});
