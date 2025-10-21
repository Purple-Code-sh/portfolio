import PagesCreated from "./sections/PagesCreated";
import Hero from "./sections/Hero";
import ImportantProjects from "./sections/ImportantProjects";
import { Separator } from "./components/Separator";
import UnderConstruction from "./sections/UnderConstruction";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="sh-container">
        <PagesCreated />
        <Separator />
        <ImportantProjects />
        <Separator />
        <UnderConstruction />
      </section>
    </main>
  );
}
