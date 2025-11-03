import BlogIndex from "@/app/[locale]/components/BlogIndex";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "BLOG",
  description:
    "Blog sobre temas relacionados al frontend, backend y desarrollo de software",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

const BLOG_ITEMS: {
  [key: string]: { name: string; url: string };
} = {
  bundlersAndReactMigration: {
    name: "Bundlers y Migración de React",
    url: "/blog/Bundlers-and-React-migration",
  },
  jestAndTestingLibraryInNext16: {
    name: "Instalación de Jest y React Testing Library en Next v16",
    url: "/blog/Jest-and-TestingLibrary-in-Next16-installation",
  },
};

export default function Blogs() {
  return (
    <div className="sh-container py-8 md:py-12 xl:py-16">
      <BlogIndex pageTitle="Blog" indexArray={BLOG_ITEMS} />
    </div>
  );
}
