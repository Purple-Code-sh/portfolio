import BlogIndex from "@/app/[locale]/components/BlogIndex";

const THEME_GLOSARY: {
  [key: string]: { name: string; url: string };
} = {
  Module1: {
    name: "Módulo 1: Fundamentos de los Bundlers",
    url: "/blog/Bundlers-and-React-migration/module-1",
  },
  Module2: {
    name: "Módulo 2: Webpack (El Estándar Corporativo Legacy)",
    url: "/blog/Bundlers-and-React-migration/module-2",
  },
  Module3: {
    name: "Módulo 3: Vite (El Estándar Moderno)",
    url: "/blog/Bundlers-and-React-migration/module-3",
  },
  Module4: {
    name: "Módulo 4: El Gran Cambio de React (Componentes de Clase)",
    url: "/blog/Bundlers-and-React-migration/module-4",
  },
  Module5: {
    name: "Módulo 5: Taller de Migración (Funcional con Hooks)",
    url: "/blog/Bundlers-and-React-migration/module-5",
  },
};

export default function BundlersAndReactMigration() {
  return (
    <div className="sh-container py-8 md:py-12 xl:py-16">
      <BlogIndex
        pageTitle="Bundlers y Migración de React"
        pageDescription="Esta ruta de aprendizaje cubre dos temas principales: los bundlers y la migración de componentes en React. La primera parte define qué es un bundler, compara el funcionamiento de Webpack (loaders, plugins) con el de Vite (ESM, Rollup) y explica sus diferencias en desarrollo y producción. La segunda parte detalla el proceso de migración de componentes de React, mapeando la sintaxis de Clases (con this.state y ciclos de vida) a la sintaxis funcional moderna (con useState, useEffect y otros Hooks), e incluye estrategias de mantenimiento y pruebas para dicho proceso."
        indexArray={THEME_GLOSARY}
      />
    </div>
  );
}
