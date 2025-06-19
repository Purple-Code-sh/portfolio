import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import defaultMessages from "../../messages/es.json";
import { headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const now = (await headers()).get("x-now");
  const timeZone =
    (await headers()).get("x-time-zone") ?? "America/Mexico_City";
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
