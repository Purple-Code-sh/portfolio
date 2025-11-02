import BlogIndex from "@/app/[locale]/components/BlogIndex";

const BLOG_ITEMS: {
  [key: string]: { name: string; url: string };
} = {
  bundlersAndReactMigration: {
    name: "Bundlers y Migración de React",
    url: "/blog/Bundlers-and-React-migration",
  },
};

export default function Blogs() {
  return (
    <div className="sh-container py-8 md:py-12 xl:py-16">
      <BlogIndex pageTitle="Blog" indexArray={BLOG_ITEMS} />
    </div>
  );
}
