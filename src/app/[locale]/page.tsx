import PagesCreated from "./sections/PagesCreated";
import Hero from "./sections/Hero";
import ImportantProjects from "./sections/ImportantProjects";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="sh-container">
        <PagesCreated />
        <ImportantProjects />
      </section>
    </main>
  );
}
