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
  title: "Módulo 2 | Bundlers y Migración de React",
  description: "Webpack (El Estándar Corporativo Legacy)",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module2() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content="Módulo 2: Webpack (El Estándar Corporativo Legacy)"></TitleH1>

      <TextP>
        Bienvenido a Webpack. Esta herramienta construyó la web moderna que
        conocemos y, por esa razón, mantiene millones de líneas de código en
        producción en empresas como IBM.
      </TextP>
      <TextP>
        No puedes migrar un sistema que no entiendes. Tu trabajo de
        mantenimiento y migración comenzará aquí.
      </TextP>
      <TextP>
        <Strong>Webpack es poderoso, explícito y complejo.</Strong>
      </TextP>

      {/* --- SECCIÓN 1: CONCEPTOS CLAVE --- */}
      <section className="mb-12">
        <SubtitleH2 content="1. Los 4 Conceptos Clave" />
        <TextP>
          Toda la configuración de Webpack, sin importar cuán grande sea, se
          basa en cuatro conceptos fundamentales.
        </TextP>

        <SubtitleH3 content="A. entry (Punto de Entrada)" />
        <TextP>
          <Strong>Qué es:</Strong> Le dice a Webpack por dónde empezar a
          construir su grafo de dependencias (visto en el Módulo 1).
        </TextP>
        <TextP>
          <Strong>En la práctica:</Strong> Es la ruta a tu archivo JavaScript
          principal, usualmente <CodeInline>src/index.js</CodeInline> o{" "}
          <CodeInline>src/main.js</CodeInline>.
        </TextP>
        <TextP>
          Archivo <CodeInline>webpack.config.js</CodeInline>:
        </TextP>
        <CodeBlock>
          {`module.exports = {
  entry: './src/index.js'
};`}
        </CodeBlock>

        <SubtitleH3 content="B. output (Punto de Salida)" />
        <TextP>
          <Strong>Qué es:</Strong> Le dice a Webpack dónde y cómo debe dejar el
          bundle (o bundles) de producción que genera.
        </TextP>
        <TextP>
          <Strong>En la práctica:</Strong> Defines un{" "}
          <CodeInline>path</CodeInline> (la carpeta de destino, ej.{" "}
          <CodeInline>dist</CodeInline>) y un <CodeInline>filename</CodeInline>{" "}
          (el nombre del archivo).
        </TextP>
        <TextP>
          Archivo <CodeInline>webpack.config.js</CodeInline>:
        </TextP>
        <CodeBlock>
          {`const path = require('path');

module.exports = {
  // ...
  output: {
    // La carpeta de salida (debe ser una ruta absoluta)
    path: path.resolve(__dirname, 'dist'),
    
    // El nombre del archivo principal
    filename: 'bundle.js',
    
    // [contenthash] es una técnica de cacheo:
    // el nombre cambia solo si el contenido cambia.
    // filename: 'main.[contenthash].js'
  }
};`}
        </CodeBlock>

        <SubtitleH3 content="C. loaders (Cargadores)" />
        <TextP>
          <Strong>Qué es:</Strong> Son los traductores. Webpack solo entiende
          JavaScript y JSON. Los loaders le enseñan cómo procesar otros tipos de
          archivos y convertirlos en módulos válidos para su grafo de
          dependencias.
        </TextP>
        <TextP>
          <Strong>En la práctica:</Strong> Se configuran en{" "}
          <CodeInline>module.rules</CodeInline>. Cada &quot;regla&quot; tiene
          dos propiedades clave:
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>test:</Strong> Una expresión regular (RegExp) que indica qué
            archivos debe procesar (ej. <CodeInline>/\.css$/</CodeInline> para
            todos los archivos CSS).
          </li>
          <li>
            <Strong>use:</Strong> El loader (o loaders) que se debe usar.
            Importante: Los loaders se ejecutan en{" "}
            <Strong>orden inverso</Strong> (de derecha a izquierda o de abajo
            hacia arriba).
          </li>
        </ul>
        <TextP>
          <Strong>Ejemplos Esenciales:</Strong>
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <CodeInline>babel-loader</CodeInline>: Transpila JSX y ES6+ a
            JavaScript.
          </li>
          <li>
            <CodeInline>style-loader</CodeInline> y{" "}
            <CodeInline>css-loader</CodeInline>: Necesarios para importar CSS.
          </li>
          <li>
            <CodeInline>MiniCssExtractPlugin.loader</CodeInline>: Alternativa a{" "}
            <CodeInline>style-loader</CodeInline> para producción. Extrae el CSS
            en un archivo <CodeInline>.css</CodeInline> separado.
          </li>
        </ul>

        <SubtitleH3 content="D. plugins (Complementos)" />
        <TextP>
          <Strong>Qué es:</Strong> Son los &quot;multi-usos&quot;. Mientras los
          loaders actúan sobre archivos individuales, los plugins realizan
          acciones sobre el bundle completo.
        </TextP>
        <TextP>
          <Strong>En la práctica:</Strong> Hacen optimización, gestión de
          assets, inyección de variables de entorno, etc.
        </TextP>
        <TextP>
          <Strong>Ejemplos Esenciales:</Strong>
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <CodeInline>HtmlWebpackPlugin</CodeInline>: Genera automáticamente
            tu <CodeInline>index.html</CodeInline> e inyecta la etiqueta{" "}
            <CodeInline>&lt;script&gt;</CodeInline>.
          </li>
          <li>
            <CodeInline>MiniCssExtractPlugin</CodeInline>: Acompaña al loader
            del mismo nombre y genera el archivo CSS final.
          </li>
          <li>
            <CodeInline>CleanWebpackPlugin</CodeInline>: Limpia tu carpeta{" "}
            <CodeInline>dist</CodeInline> antes de cada build.
          </li>
        </ul>
      </section>

      {/* --- SECCIÓN 2: ANATOMÍA DE UN CONFIG --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Anatomía de un webpack.config.js Real" />
        <TextP>
          A continuación, se muestra un archivo de configuración típico de un
          proyecto React legacy que podrías encontrar.
        </TextP>
        <CodeBlock>
          {`// La mayoría de los configs legacy usan sintaxis CommonJS (require)
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Exportamos una función para acceder a la variable 'mode'
module.exports = (env, argv) => {
  // argv.mode será 'development' o 'production'
  const isProduction = argv.mode === 'production';

  return {
    // 1. ENTRY
    entry: './src/index.js',

    // 2. OUTPUT
    output: {
      path: path.resolve(__dirname, 'dist'),
      // [contenthash] para cache-busting en producción
      filename: isProduction ? 'js/main.[contenthash].js' : 'js/main.js',
      // Limpia la carpeta 'dist' en cada build
      clean: true,
    },

    // Modo (habilita optimizaciones por defecto)
    mode: argv.mode,

    // 3. LOADERS
    module: {
      rules: [
        // Regla para JavaScript y JSX
        {
          test: /\\.(js|jsx)$/,
          exclude: /node_modules/, // Siempre excluir node_modules
          use: {
            loader: 'babel-loader', // El traductor de Babel
            options: {
              presets: [
                '@babel/preset-env', // Transpila ES6+
                ['@babel/preset-react', { runtime: 'automatic' }] // Transpila JSX
              ]
            }
          }
        },
        // Regla para CSS
        {
          test: /\\.css$/,
          // Orden inverso: 1. css-loader, 2. style-loader o MiniCssExtract...
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        // Regla para imágenes
        {
          test: /\\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource', // Webpack 5+ maneja esto nativamente
        }
      ]
    },

    // 4. PLUGINS
    plugins: [
      // Genera el index.html y le inyecta el <script>
      new HtmlWebpackPlugin({
        template: './public/index.html', // Usa esta plantilla
        filename: 'index.html' // El archivo de salida
      }),
      
      // Este plugin solo se activa en producción
      isProduction && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      })
    ].filter(Boolean), // Filtramos los plugins falsos (como el de arriba en dev)

    // Configuración del Servidor de Desarrollo
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      open: true, // Abrir el navegador automáticamente
      hot: true, // Habilitar Hot Module Replacement (HMR)
      historyApiFallback: true, // Clave para React-Router
    },

    // Source Maps para depuración
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
  };
};`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 3: EL DOLOR DE WEBPACK --- */}
      <section className="mb-12">
        <SubtitleH2 content='3. El "Dolor" de Webpack (El "Por Qué" Migrar)' />
        <TextP>
          Si Webpack es tan poderoso, ¿por qué la industria está migrando a
          Vite?
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Lentitud en Desarrollo:</Strong>{" "}
            <CodeInline>webpack-dev-server</CodeInline> es lento para iniciar.
            Empaqueta preventivamente (pre-bundles) toda tu aplicación en
            memoria antes de que puedas ver algo. El HMR (Hot Module
            Replacement) también es lento en proyectos grandes.
          </li>
          <li>
            <Strong>Configuración Compleja:</Strong> Como has visto, la
            configuración es verbosa y frágil. Añadir SASS, TypeScript o PostCSS
            requiere múltiples loaders y plugins que deben configurarse en el
            orden correcto.
          </li>
          <li>
            <Strong>Dependencias Pesadas:</Strong> Un proyecto base con Webpack
            requiere una docena de paquetes de desarrollo (
            <CodeInline>webpack</CodeInline>,{" "}
            <CodeInline>webpack-cli</CodeInline>,{" "}
            <CodeInline>webpack-dev-server</CodeInline>,{" "}
            <CodeInline>babel-loader</CodeInline>,{" "}
            <CodeInline>css-loader</CodeInline>, etc.) solo para un &quot;Hola
            Mundo&quot;.
          </li>
        </ul>
        <HighlightBox>
          El dolor de Webpack es su lentitud en el feedback de desarrollo y su
          alta sobrecarga de configuración.
        </HighlightBox>
      </section>
    </div>
  );
}
