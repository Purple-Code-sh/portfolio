import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PagesCreated from "./components/PagesCreated";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <main className="sh-container">
      <h1>{t("title")}</h1>
      <Link href="/about">{t("about")}</Link>

      <PagesCreated />
    </main>
  );
}
