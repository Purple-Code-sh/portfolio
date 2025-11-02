import {
  CodeBlock,
  CodeInline,
  HighlightBox,
  Strong,
  SubtitleH2,
  SubtitleH3,
  TextP,
  TitleH1,
} from "@/app/[locale]/utils/blog-text-styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Módulo 3 | Bundlers y Migración de React",
  description: "Vite (El Estándar Moderno)",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module3() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content="Módulo 3: Vite (El Estándar Moderno)" />

      <TextP>
        Has dominado Webpack, el estándar legacy. Ahora, vamos a ver a Vite, el
        estándar moderno. La razón por la que IBM te pregunta por esto es porque
        los proyectos nuevos se inician con Vite y existe una fuerte presión
        para migrar los proyectos antiguos de Webpack a Vite y así mejorar la
        productividad del desarrollador.
      </TextP>

      {/* --- SECCIÓN 1: LA MAGIA DE VITE --- */}
      <section className="mb-12">
        <SubtitleH2 content='1. La "Magia" de Vite: ¿Por Qué es tan Rápido?' />
        <TextP>
          Vite no es solo &quot;un Webpack más rápido&quot;; es una arquitectura
          fundamentalmente diferente. Su velocidad en desarrollo no proviene de
          una mejor optimización, sino de hacer <Strong>menos trabajo</Strong>.
        </TextP>
        <TextP>La diferencia clave está en el servidor de desarrollo:</TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Webpack (Dev Server):</Strong> Cuando inicias{" "}
            <CodeInline>webpack-dev-server</CodeInline>, este lee tu{" "}
            <CodeInline>entry</CodeInline> (index.js), rastrea todos los{" "}
            <CodeInline>import</CodeInline> de tu aplicación, transpila y
            empaqueta <Strong>toda</Strong> la aplicación en memoria
            (pre-bundling) antes de servir una sola página. Si tu proyecto es
            grande, este arranque puede tardar de segundos a minutos.
          </li>
          <li>
            <Strong>Vite (Dev Server):</Strong> Cuando inicias{" "}
            <CodeInline>vite</CodeInline>, este arranca{" "}
            <Strong>instantáneamente</Strong>. No empaqueta nada. En su lugar,
            se apoya en una característica nativa del navegador:{" "}
            <Strong>ES Modules (ESM)</Strong>.
          </li>
        </ul>

        <TextP>
          <Strong>El Flujo de Vite:</Strong>
        </TextP>
        <ol className="list-decimal list-inside space-y-2 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            Vite sirve tu <CodeInline>index.html</CodeInline>.
          </li>
          <li>
            El navegador lee el <CodeInline>index.html</CodeInline> y encuentra{" "}
            <CodeInline>
              &lt;script type=&quot;module&quot;
              src=&quot;/src/main.jsx&quot;&gt;
            </CodeInline>
            .
          </li>
          <li>
            El navegador solicita <CodeInline>/src/main.jsx</CodeInline> a Vite.
          </li>
          <li>
            Vite toma <CodeInline>main.jsx</CodeInline>, lo transpila (usando{" "}
            <Strong>esbuild</Strong>, no Babel) y se lo devuelve al navegador.
          </li>
          <li>
            Si <CodeInline>main.jsx</CodeInline> importa{" "}
            <CodeInline>./App.jsx</CodeInline>, el navegador solicita{" "}
            <CodeInline>/App.jsx</CodeInline>.
          </li>
          <li>
            Vite toma <CodeInline>App.jsx</CodeInline>, lo transpila y se lo
            devuelve.
          </li>
        </ol>

        <HighlightBox>
          <Strong>Conclusión:</Strong> Vite solo transpila los archivos que el
          navegador le pide <Strong>a demanda</Strong>. No empaqueta la
          aplicación completa. Esto se llama <Strong>lazy loading</Strong> a
          nivel de módulo.
        </HighlightBox>

        <SubtitleH3 content="El Arma Secreta: esbuild" />
        <TextP>
          Vite no usa Babel para transpilar tu código en desarrollo. Usa{" "}
          <Strong>esbuild</Strong>, un transpilador escrito en Go (no en
          JavaScript). <Strong>esbuild</Strong> es órdenes de magnitud (10-100x)
          más rápido que Babel, lo que hace que la transpilación a demanda sea
          casi instantánea.
        </TextP>
      </section>

      {/* --- SECCIÓN 2: ROLLUP --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Rollup: El Bundler de Producción" />
        <TextP>Aquí hay una distinción crucial que debes entender:</TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>En Desarrollo:</Strong> Vite usa esbuild + ESM nativos (sin
            empaquetado).
          </li>
          <li>
            <Strong>En Producción:</Strong> Cuando ejecutas{" "}
            <CodeInline>vite build</CodeInline>, Vite NO usa esbuild para
            empaquetar. Usa <Strong>Rollup</Strong>.
          </li>
        </ul>
        <TextP>
          ¿Por qué? Rollup es un bundler más maduro que Webpack para crear
          bundles de producción altamente optimizados (especialmente para
          librerías). Produce un código más limpio y tiene un{" "}
          <Strong>tree-shaking</Strong> (eliminación de código muerto) más
          agresivo.
        </TextP>
        <HighlightBox>
          Vite te da lo mejor de ambos mundos:
          <ol className="list-decimal list-inside space-y-2 pl-4 mt-2">
            <li>
              <Strong>Desarrollo:</Strong> Arranque instantáneo (esbuild).
            </li>
            <li>
              <Strong>Producción:</Strong> Bundles súper optimizados (Rollup).
            </li>
          </ol>
        </HighlightBox>
      </section>

      {/* --- SECCIÓN 3: ANATOMÍA DE VITE.CONFIG.JS --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. Anatomía de un vite.config.js" />
        <TextP>
          La mayor ventaja de Vite, después de la velocidad, es la simplicidad
          de su configuración. Compara esto con el{" "}
          <CodeInline>webpack.config.js</CodeInline> del módulo anterior.
        </TextP>
        <CodeBlock>
          {`// vite.config.js (Usa ESM por defecto)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 1. PLUGINS
  // Aquí es donde ocurre la magia.
  // No necesitas 'babel-loader', 'style-loader', etc.
  // Solo necesitas el plugin oficial de React.
  plugins: [
    react() // Maneja JSX, HMR (Fast Refresh) y Babel
  ],

  // 2. SERVIDOR DE DESARROLLO
  // Equivalente a 'devServer' en Webpack
  server: {
    port: 3000,
    open: true,
    // Configuración de Proxy (para evitar CORS en desarrollo)
    proxy: {
      // Redirige /api/usuarios a http://localhost:4000/api/usuarios
      '/api': {
        target: 'http://localhost:4000', // Tu backend de Express
        changeOrigin: true,
      }
    },
  },

  // 3. BUILD (PRODUCCIÓN)
  // Opciones para Rollup
  build: {
    outDir: 'dist', // Equivalente a 'output.path'
    // Opciones avanzadas de Rollup (raramente se tocan)
    rollupOptions: {
      // ...
    }
  }
});`}
        </CodeBlock>
        <SubtitleH3 content="Observaciones Clave:" />
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            No hay <CodeInline>entry</CodeInline>: Vite asume que{" "}
            <CodeInline>index.html</CodeInline> está en la raíz del proyecto.
          </li>
          <li>
            No hay <CodeInline>output.filename</CodeInline>: Rollup se encarga
            de generar los nombres con hash por defecto.
          </li>
          <li>
            No hay <CodeInline>module.rules</CodeInline>: Los plugins (como{" "}
            <CodeInline>@vitejs/plugin-react</CodeInline>) manejan los tipos de
            archivo por ti.
          </li>
          <li>
            TypeScript, CSS, JSON, e Imágenes funcionan{" "}
            <Strong>out-of-the-box</Strong> (sin configuración).
          </li>
        </ul>
      </section>

      {/* --- SECCIÓN 4: ESTRATEGIA DE MIGRACIÓN --- */}
      <section className="mb-12">
        <SubtitleH2 content="4. Estrategia de Migración (De CRA/Webpack a Vite)" />
        <TextP>En tu trabajo en IBM, esto es lo que harías:</TextP>
        <ol className="list-decimal list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Instalar Dependencias:</Strong> Ejecutar{" "}
            <CodeInline>npm install vite @vitejs/plugin-react</CodeInline> y
            desinstalar <CodeInline>webpack</CodeInline>,{" "}
            <CodeInline>react-scripts</CodeInline>, etc.
          </li>
          <li>
            <Strong>
              Crear <CodeInline>vite.config.js</CodeInline>:
            </Strong>{" "}
            Añadir la configuración básica (como la de arriba).
          </li>
          <li>
            <Strong>
              Mover <CodeInline>index.html</CodeInline>:
            </Strong>{" "}
            Mover <CodeInline>public/index.html</CodeInline> a la{" "}
            <Strong>raíz</Strong> del proyecto.
          </li>
          <li>
            <Strong>
              Ajustar <CodeInline>index.html</CodeInline>:
            </Strong>
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>
                Cambiar{" "}
                <CodeInline>
                  &lt;script src=&quot;%PUBLIC_URL%/...&quot;&gt;
                </CodeInline>{" "}
                a{" "}
                <CodeInline>
                  &lt;script type=&quot;module&quot;
                  src=&quot;/src/main.jsx&quot;&gt;
                </CodeInline>
                .
              </li>
              <li>
                Vite maneja el <CodeInline>index.html</CodeInline> como la
                entrada principal.
              </li>
            </ul>
          </li>
          <li>
            <Strong>Variables de Entorno:</Strong> Renombrar todas las variables
            de env de <CodeInline>REACT_APP_MI_VARIABLE</CodeInline> a{" "}
            <CodeInline>VITE_MI_VARIABLE</CodeInline>.
          </li>
          <li>
            <Strong>Probar:</Strong> Ejecutar <CodeInline>vite</CodeInline> (el
            nuevo <CodeInline>dev</CodeInline>) y{" "}
            <CodeInline>vite build</CodeInline> (el nuevo{" "}
            <CodeInline>build</CodeInline>).
          </li>
        </ol>
      </section>
    </div>
  );
}
