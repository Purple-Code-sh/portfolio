import PagesCreated from "./sections/PagesCreated";
import Hero from "./sections/Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="sh-container">
        <PagesCreated />
      </section>
    </main>
  );
}
