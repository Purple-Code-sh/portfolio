import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PagesCreated from "./sections/PagesCreated";
import Hero from "./sections/Hero";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <main className="sh-container">
      <Hero />
      <Link href="/about">{t("about")}</Link>

      <PagesCreated />
    </main>
  );
}
