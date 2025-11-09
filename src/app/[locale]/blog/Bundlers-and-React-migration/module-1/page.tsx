import {
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
  title: "Módulo 1 | Bundlers y Migración de React",
  description: "Fundamentos de los Bundlers (El 'Por Qué')",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module1() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content='Módulo 1: Fundamentos de los Bundlers (El "Por Qué")' />

      {/* --- SECCIÓN 1: QUÉ ES UN BUNDLER --- */}
      <section className="mb-12">
        <SubtitleH2 content="1. ¿Qué es un Bundler?" />
        <TextP>
          Un <Strong>Bundler</Strong> (empaquetador) es una herramienta de línea
          de comandos que se ejecuta <Strong>antes</Strong> de que tu código
          llegue al navegador.
        </TextP>
        <TextP>
          Su trabajo es tomar tu complejo código fuente de desarrollo y
          convertirlo en un conjunto de archivos estáticos (HTML, CSS y
          JavaScript plano) que un navegador web pueda entender y ejecutar
          eficientemente.
        </TextP>

        <SubtitleH3 content="El Problema que Resuelve" />
        <TextP>
          El navegador es un entorno de ejecución limitado y fundamentalmente
          &quot;tonto&quot; en el sentido de que solo entiende tres cosas: HTML,
          CSS y JavaScript.
        </TextP>
        <TextP>
          Tu código fuente de React usa tecnologías que{" "}
          <Strong>no son nativas</Strong> del navegador:
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>JSX:</Strong> El navegador no tiene idea de qué es{" "}
            <CodeInline>&lt;MiComponente /&gt;</CodeInline>. Esto es azúcar
            sintáctico que debe convertirse en JavaScript (ej.{" "}
            <CodeInline>
              React.createElement(&apos;MiComponente&apos;, ...)
            </CodeInline>
            ).
          </li>
          <li>
            <Strong>TypeScript:</Strong> El navegador no entiende anotaciones de
            tipo como{" "}
            <CodeInline>const user: string = &apos;Test&apos;</CodeInline>.
          </li>
          <li>
            <Strong>Módulos de CSS:</Strong> El navegador no sabe qué hacer con{" "}
            <CodeInline>
              import styles from &apos;./Button.module.css&apos;
            </CodeInline>
            .
          </li>
          <li>
            <Strong>Módulos de Node:</Strong> El navegador no tiene el módulo{" "}
            <CodeInline>fs</CodeInline> o <CodeInline>path</CodeInline>, y no
            entiende la sintaxis <CodeInline>require()</CodeInline> de CommonJS.
          </li>
          <li>
            <Strong>Eficiencia:</Strong> Si tu aplicación tiene 200 componentes
            (200 archivos <CodeInline>.js</CodeInline>), el navegador{" "}
            <Strong>no puede</Strong> hacer 200 peticiones HTTP para cargarlos.
            Sería catastróficamente lento.
          </li>
        </ul>
        <TextP>
          El <Strong>bundler</Strong> es el &quot;traductor&quot; y
          &quot;organizador&quot; que resuelve todos estos problemas en un paso
          de compilación.
        </TextP>
      </section>

      {/* --- SECCIÓN 2: TRANSPILACIÓN VS. EMPAQUETADO --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Transpilación vs. Empaquetado" />
        <TextP>
          Este es el error conceptual más común. Son dos procesos diferentes que
          el bundler orquesta.
        </TextP>

        <SubtitleH3 content="Transpilación (Traducción de Código)" />
        <TextP>
          Es el acto de convertir código de un lenguaje a otro lenguaje de nivel
          similar.
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Babel:</Strong> Es el transpilador más famoso. Su trabajo es
            &quot;traducir&quot; sintaxis.
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>
                Ej. 1 (JSX):{" "}
                <CodeInline>&lt;div&gt;Hola&lt;/div&gt;</CodeInline> →{" "}
                <CodeInline>
                  React.createElement(&apos;div&apos;, null, &apos;Hola&apos;)
                </CodeInline>
              </li>
              <li>
                Ej. 2 (ES6 a ES5):{" "}
                <CodeInline>const f= () =&gt; {"{}"}</CodeInline> →{" "}
                <CodeInline>var $f=$ function() {"{}"}</CodeInline>
              </li>
            </ul>
          </li>
          <li>
            <Strong>TypeScript (TSC):</Strong> El compilador de TypeScript
            transpila los tipos.
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>
                Ej. (TS a JS):{" "}
                <CodeInline>let user: string = &apos;Ana&apos;</CodeInline> →{" "}
                <CodeInline>let user = &apos;Ana&apos;</CodeInline> (elimina el
                tipo).
              </li>
            </ul>
          </li>
        </ul>

        <SubtitleH3 content="Empaquetado (Unión de Archivos)" />
        <TextP>
          Es el acto de tomar múltiples archivos fuente y unirlos en uno solo (o
          unos pocos), resolviendo sus dependencias.
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Webpack, Vite (Rollup), Parcel:</Strong> Son empaquetadores.
          </li>
        </ul>

        <SubtitleH3 content="La Relación Crucial" />
        <TextP>
          Un bundler como Webpack no sabe qué hacer con un archivo JSX. Lo que
          hace es gestionar el proceso:
        </TextP>
        <ol className="list-decimal list-inside space-y-2 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            Webpack ve un archivo <CodeInline>.jsx</CodeInline>.
          </li>
          <li>
            Dice: &quot;Esto no es JS. Según mi configuración (
            <CodeInline>webpack.config.js</CodeInline>), debo pasárselo a{" "}
            <CodeInline>babel-loader</CodeInline>&quot;.
          </li>
          <li>
            <Strong>Babel (el transpilador)</Strong> recibe el archivo, lo
            convierte a JS plano.
          </li>
          <li>
            <Strong>Webpack</Strong> recibe el JS plano de vuelta y ahora sí
            sabe cómo &quot;empaquetarlo&quot; (unirlo) con otros archivos JS.
          </li>
        </ol>
        <HighlightBox>
          En resumen: Transpilar es traducir. Empaquetar es unir.
        </HighlightBox>
      </section>

      {/* --- SECCIÓN 3: GRAFO DE DEPENDENCIAS --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. El Grafo de Dependencias" />
        <TextP>
          Esta es la &quot;hoja de ruta&quot; que construye el bundler para
          saber qué incluir. Es la parte más importante.
        </TextP>
        <TextP>
          Un bundler no adivina tus archivos; los descubre siguiendo los{" "}
          <CodeInline>import</CodeInline>.
        </TextP>

        <ol className="list-decimal list-inside space-y-2 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Punto de Entrada (entry):</Strong> Le dices al bundler que
            comience en <CodeInline>src/index.js</CodeInline>.
          </li>
          <li>
            <Strong>Análisis:</Strong> El bundler lee{" "}
            <CodeInline>index.js</CodeInline>.
          </li>
          <li>
            <Strong>Descubrimiento:</Strong> Ve la línea:{" "}
            <CodeInline>import App from &apos;./App.js&apos;</CodeInline>.
          </li>
          <li>
            <Strong>Construcción del Grafo:</Strong> Añade{" "}
            <CodeInline>App.js</CodeInline> al grafo como una dependencia de{" "}
            <CodeInline>index.js</CodeInline>.
          </li>
          <li>
            <Strong>Recursión:</Strong> Ahora abre{" "}
            <CodeInline>App.js</CodeInline>. Ve:{" "}
            <CodeInline>import Button from &apos;./Button.js&apos;</CodeInline>{" "}
            e <CodeInline>import &apos;./App.css&apos;</CodeInline>.
          </li>
          <li>
            <Strong>Construcción del Grafo:</Strong> Añade{" "}
            <CodeInline>Button.js</CodeInline> y{" "}
            <CodeInline>App.css</CodeInline> al grafo como dependencias de{" "}
            <CodeInline>App.js</CodeInline>.
          </li>
          <li>
            <Strong>Análisis de Assets:</Strong> Abre{" "}
            <CodeInline>App.css</CodeInline> y ve:{" "}
            <CodeInline>
              background-image: url(&apos;./logo.png&apos;)
            </CodeInline>
            .
          </li>
          <li>
            <Strong>Construcción del Grafo:</Strong> Añade{" "}
            <CodeInline>logo.png</CodeInline> al grafo como una dependencia de{" "}
            <CodeInline>App.css</CodeInline>.
          </li>
        </ol>
        <TextP>
          Al final de este proceso, el bundler tiene un mapa completo (un grafo
          de dependencias) de todos los archivos (JS, CSS, PNG) que son
          absolutamente necesarios para que tu aplicación funcione.
        </TextP>
        <TextP>
          Cualquier archivo en tu proyecto que no esté en este grafo (código
          muerto o <Strong>dead code</Strong>) será ignorado y no se incluirá en
          el bundle final.
        </TextP>
      </section>

      {/* --- SECCIÓN 4: DESARROLLO VS. PRODUCCIÓN --- */}
      <section className="mb-12">
        <SubtitleH2 content="4. Desarrollo vs. Producción" />
        <TextP>
          Un bundler tiene dos modos de operación con objetivos opuestos.
        </TextP>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <SubtitleH3 content="Modo Desarrollo (npm run dev)" />
            <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed">
              <li>
                <Strong>Objetivo:</Strong> Máxima velocidad de desarrollo y
                depuración fácil.
              </li>
              <li>
                <Strong>Proceso:</Strong> Inicia un <Strong>Dev Server</Strong>{" "}
                (servidor de desarrollo, ej.{" "}
                <CodeInline>localhost:3000</CodeInline>).
              </li>
              <li>
                <Strong>HMR (Hot Module Replacement):</Strong> Esta es la
                característica estrella. Cuando modificas un componente React o
                un archivo CSS, el bundler no recarga la página completa.
                Detecta el cambio e &quot;inyecta&quot; solo ese módulo
                modificado en la página en tiempo real, sin perder el estado de
                tu aplicación. Esto es vital para la productividad.
              </li>
              <li>
                <Strong>Output:</Strong> El código no está minificado. Es
                legible e incluye <Strong>Source Maps</Strong> (mapas de fuente)
                para que en las herramientas de desarrollador del navegador veas
                tu código original (ej. <CodeInline>Button.jsx</CodeInline>), no
                el bundle transpilado.
              </li>
            </ul>
          </div>

          <div>
            <SubtitleH3 content="Modo Producción (npm run build)" />
            <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed">
              <li>
                <Strong>Objetivo:</Strong> Mínimo tamaño de archivo y máximo
                rendimiento para el usuario final.
              </li>
              <li>
                <Strong>Proceso:</Strong> No levanta un servidor. Genera una
                carpeta (ej. <CodeInline>dist</CodeInline> o{" "}
                <CodeInline>build</CodeInline>) con los archivos estáticos
                finales.
              </li>
              <li>
                <Strong>Optimización 1: Minificación:</Strong>
                <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
                  <li>
                    Quita todos los espacios en blanco, saltos de línea y
                    comentarios.
                  </li>
                  <li>
                    Renombra variables (
                    <CodeInline>miVariableImportante</CodeInline> →{" "}
                    <CodeInline>a</CodeInline>).
                  </li>
                </ul>
              </li>
              <li>
                <Strong>Optimización 2: Code Splitting:</Strong>
                <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
                  <li>
                    En lugar de un <CodeInline>bundle.js</CodeInline> de 10MB,
                    lo divide inteligentemente.
                  </li>
                  <li>
                    Crea un <CodeInline>main.js</CodeInline> (lo esencial) y
                    bundles separados para cada ruta (ej.{" "}
                    <CodeInline>profile.js</CodeInline>) que se cargan solo
                    cuando el usuario visita esa ruta (
                    <Strong>lazy loading</Strong>).
                  </li>
                </ul>
              </li>
              <li>
                <Strong>Optimización 3: Optimización de Assets:</Strong>
                <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
                  <li>Comprime imágenes.</li>
                  <li>
                    Junta todo el CSS en un solo archivo{" "}
                    <CodeInline>.css</CodeInline> minificado.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <HighlightBox>
          Estos archivos en la carpeta <CodeInline>dist</CodeInline> son los que
          despliegas en un servidor web (uno creado con Express por ejemplo).
        </HighlightBox>
      </section>
    </div>
  );
}
