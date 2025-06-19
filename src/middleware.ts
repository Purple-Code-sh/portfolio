import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  // Detecta automáticamente el idioma preferido del usuario
  localeDetection: true,
  // Función personalizada para detectar el locale
  localePrefix: "as-needed", // Solo agrega prefijo cuando no es el idioma por defecto
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
