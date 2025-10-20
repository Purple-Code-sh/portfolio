import PagesCreated from "./sections/PagesCreated";
import Hero from "./sections/Hero";
import ImportantProjects from "./sections/ImportantProjects";
import { Separator } from "./components/Separator";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="sh-container">
        <PagesCreated />
        <Separator />
        <ImportantProjects />
      </section>
    </main>
  );
}
