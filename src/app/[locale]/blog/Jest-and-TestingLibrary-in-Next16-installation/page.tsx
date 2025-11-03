import {
  CodeInline,
  HighlightBox,
  Strong,
  SubtitleH2,
  SubtitleH3,
  TextP,
  TitleH1,
  CodeBlock,
} from "@/app/[locale]/utils/blog-text-styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Instalación de Jest y React Testing Library en Next v16",
  description:
    "Guía paso a paso para crear un entorno de pruebas completamente funcional con Jest y React Testing Library en un proyecto de Next.js versión 16. Junto con un linter de ESLint para asegurar la calidad y consistencia del código de test.",
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
      {" "}
      <TitleH1 content="Instalación de Jest y React Testing Library en Next.js versión 16" />
      {/* --- SECCIÓN 0 --- */}{" "}
      <section className="mb-12">
        <SubtitleH2 content="Consideraciones" />
        <TextP>
          Para la siguiente guía, se asume que el proyecto de Next.js está en la
          versión 16. Esto es válido tanto si ha sido creado desde cero usando{" "}
          <Strong>algún</Strong> template, mediante el uso de{" "}
          <CodeInline>npx create-next-app@latest</CodeInline>, o si se ha
          actualizado un proyecto existente a dicha versión. <br />
          <br /> Además, para este ejemplo se asume que el proyecto se ha
          construido con: <Strong>TypeScript, ESLint y AppRouter</Strong>.{" "}
          <br />Y que, preferiblemente, el <Strong>código</Strong> de la
          aplicación se encuentra dentro de una carpeta{" "}
          <CodeInline>src/</CodeInline>.{" "}
        </TextP>
      </section>
      {/* --- SECCIÓN 1 --- */}{" "}
      <section className="mb-12">
        {" "}
        <SubtitleH2 content="1. Instalación de dependencias e inicialización de Jest" />
        <TextP>
          De acuerdo <Strong>con</Strong> la documentación oficial de{" "}
          <a
            href="https://nextjs.org/docs/app/guides/testing/jest#optional-extend-jest-with-custom-matchers"
            className="font-bold underline"
            target="_blank"
          >
            Next{" "}
          </a>
          , la configuración de Jest requiere la instalación de las siguientes{" "}
          <Strong>dependencias de desarrollo</Strong>:
        </TextP>
        <CodeBlock>
          {" "}
          {`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest`}{" "}
        </CodeBlock>{" "}
        <SubtitleH3 content="Inicialización de Jest y configuración inicial" />
        <TextP>
          <Strong>Después</Strong> de la instalación de dependencias, se debe
          crear un archivo llamado <CodeInline>jest.config.ts</CodeInline> en la
          raíz del proyecto. Este archivo se encargará de configurar Jest y sus
          opciones.{" "}
        </TextP>
        <TextP>
          Esto se puede hacer de manera manual o utilizando el comando:
        </TextP>
        <CodeBlock>{`npm init jest@latest`}</CodeBlock>{" "}
        <TextP>
          Para el cual se <Strong>deberán</Strong> seleccionar las siguientes
          opciones:
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          {" "}
          <li>
            Would you like to use Jest when running &quot;test&quot; script in
            package.json?: <Strong>Yes</Strong>{" "}
          </li>{" "}
          <li>
            Would you like to use Typescript for the configuration file?:
            <Strong>Yes</Strong>{" "}
          </li>{" "}
          <li>
            Choose the test environment that will be used for testing:
            <Strong>jsdom (browser like)</Strong>{" "}
          </li>{" "}
          <li>
            Do you want Jest to add coverage reports?: <Strong>No</Strong>{" "}
          </li>{" "}
          <li>
            Wich provider should be used to instrument code for coverage?:
            <Strong>v8</Strong>{" "}
          </li>{" "}
          <li>
            Automatically clear mock calls, instances, contexts and results
            before every test?: <Strong>No</Strong>{" "}
          </li>{" "}
        </ul>{" "}
        <TextP>
          Al usar el comando anterior, el archivo se creará con un contenido
          inicial, <Strong>el cual</Strong> se puede borrar o modificar según
          sea necesario. <br />
          Adicionalmente, se agrega el script &quot;test&quot; dentro del
          archivo <CodeInline>package.json</CodeInline>.{" "}
        </TextP>
        <HighlightBox>
          Si no tienes el script &quot;test&quot; en el package.json, solo
          tienes que agregarlo en la sección de scripts como:
          <CodeInline>&quot;test&quot;: &quot;jest&quot;</CodeInline>
          <br />O usando la versión del script que busca los cambios de manera
          automática y vuelve a ejecutar los tests:
          <CodeInline>
            &quot;test:watch&quot;: &quot;jest --watchAll&quot;{" "}
          </CodeInline>{" "}
        </HighlightBox>{" "}
        <TextP>
          En nuestra implementación, se recomienda que el contenido del archivo{" "}
          <CodeInline>jest.config.ts</CodeInline> sea exactamente el siguiente:
        </TextP>
        <CodeBlock>
          {" "}
          {`import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
`}{" "}
        </CodeBlock>{" "}
      </section>
      {/* --- SECCIÓN 2 --- */}{" "}
      <section className="mb-12">
        <SubtitleH2 content="2. Extender la configuración inicial" />
        <TextP>
          Para asegurarnos de que el contenido del archivo{" "}
          <CodeInline>jest.config.ts</CodeInline> funcione correctamente,
          debemos instalar el preset de Jest para TypeScript. Esto se hace con
          el siguiente comando:
        </TextP>
        <CodeBlock>{`npm install ts-jest`}</CodeBlock>
        <SubtitleH3 content="Archivo setup" />
        <TextP>
          En la <Strong>configuración</Strong> inicial, la{" "}
          <Strong>línea</Strong> <CodeInline>setupFilesAfterEnv</CodeInline> se
          utiliza para cargar archivos de configuración adicionales. Nosotros la
          usaremos para extender Jest usando los &quot;custom matchers&quot;.{" "}
        </TextP>
        <TextP>
          Para ello, debemos crear el documento al que hace referencia{" "}
          <CodeInline>setupFilesAfterEnv</CodeInline> en nuestra
          <Strong>configuración</Strong> inicial. <br /> <Strong>Así</Strong>{" "}
          que, en el <Strong>root</Strong> de nuestro proyecto, en el mismo
          nivel en el que se encuentra el archivo
          <CodeInline>jest.config.ts</CodeInline>, crearemos un archivo llamado{" "}
          <CodeInline>jest.setup.ts</CodeInline>. <br /> Cuyo contenido debe ser
          el siguiente:
        </TextP>
        <CodeBlock>{`import "@testing-library/jest-dom";`}</CodeBlock>{" "}
        <HighlightBox>
          Esta dependencia ya la hemos instalado en el paso 1, junto con las
          demás dependencias de desarrollo.
        </HighlightBox>
      </section>
      {/* --- SECCIÓN 3: GRAFO DE DEPENDENCIAS --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. Pruebas de funcionamiento" />
        <TextP>
          Para asegurarnos de que nuestra implementación funciona correctamente,
          debemos crear nuestro primer test. Para ello, debemos crear una
          carpeta llamada <CodeInline>__tests__</CodeInline> al mismo nivel que
          nuestra carpeta <CodeInline>app</CodeInline>, <Strong>o sea</Strong>,
          dentro de <CodeInline>src/</CodeInline>.
        </TextP>
        <TextP>
          Posteriormente, dentro de la carpeta{" "}
          <CodeInline>__tests__</CodeInline> crearemos un archivo llamado
          <CodeInline>Home.tsx</CodeInline>. <br /> Este archivo contendrá
          nuestro primer test, cuyo contenido puede ser el siguiente:
        </TextP>
        <CodeBlock>
          {`import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("Should renders 'Templates'", () => {
    const linkElement = screen.getByText("Templates");
    expect(linkElement).toBeInTheDocument();
  });

  it("Should renders 'Edit the page.tsx file'", () => {
    const linkElement = screen.getByText(/edit the page.tsx file/i);
    expect(linkElement).toBeInTheDocument();
  });
});`}{" "}
        </CodeBlock>{" "}
        <HighlightBox>
          Este test se encarga de comprobar que dentro de la página de inicio
          (app/page.tsx) existen los textos &quot;Templates&quot; y &quot;Edit
          the page.tsx file&quot;. Puedes modificarlo para buscar otros textos o
          hacer un test diferente para otros componentes.{" "}
        </HighlightBox>{" "}
        <TextP>
          Una vez que hayas creado el archivo, debemos ejecutar el comando{" "}
          <CodeInline>npm test</CodeInline> o{" "}
          <CodeInline>npm run test:watch</CodeInline> para que se ejecuten los
          tests existentes.{" "}
        </TextP>
        <TextP>
          Si todo va bien, deberíamos ver como resultado en la terminal que
          todos los <Strong>tests</Strong> pasan. O como <Strong>mínimo</Strong>
          , ver los tests en rojo (si fallan).
          <br /> Cualquiera de los 2 casos significa que nuestra implementación
          funciona correctamente.{" "}
        </TextP>
      </section>
      {/* --- SECCIÓN 4 --- */}{" "}
      <section className="mb-12">
        {" "}
        <SubtitleH2 content="4. Agregar linter a los archivos de test. Configuración de ESLint" />
        <TextP>
          Al escribir un test, es de utilidad tener reglas para mantener un
          código limpio y correcto. Para ello, debemos configurar ESLint e
          instalar los plugins necesarios que nos <Strong>ayudarán</Strong> a
          implementar el linter en nuestros archivos de testing.{" "}
        </TextP>
        <TextP>
          Primeramente instalaremos los plugins, lo cual se hace con el
          siguiente comando: _
        </TextP>
        <CodeBlock>{`npm install -D eslint-plugin-jest-dom eslint-plugin-testing-library`}</CodeBlock>{" "}
        <SubtitleH3 content="Configuración de ESLint (flat config file)" />
        <TextP>
          Normalmente, la <Strong>configuración</Strong> de ESLint se hace en un
          archivo llamado <CodeInline>.eslintrc.js</CodeInline> en la raíz del
          proyecto. <br /> Pero desde la versión 9.0.0 de ESLint, se puede
          configurar en un d archivo llamado{" "}
          <CodeInline>eslint.config.js</CodeInline>, <Strong>también</Strong> en
          la raíz del proyecto. El cual{" "}
          <a
            href="https://eslint.org/docs/latest/use/configure/migration-guide"
            className="underline font-bold"
            target="_blank"
          >
            se configura de forma distinta{" "}
          </a>{" "}
          a lo que se <Strong>hacía</Strong> previamente con eslintrc. <br /> La{" "}
          <Strong>última</Strong> versión de Next usa la nueva{" "}
          <Strong>configuración</Strong> de ESLint (Flat Config File) mediante
          el archivo <CodeInline>eslint.config.mjs</CodeInline>. Pero a
          continuación, se muestran ambos ejemplos, para que puedas usarlos
          según sea tu caso.{" "}
        </TextP>
        <TextP>
          {" "}
          <Strong>
            <Strong>Configuración</Strong> de ESLint (Flat Config File) para
            Next.js v16:
          </Strong>{" "}
        </TextP>
        <CodeBlock>{`import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// These are the two imports for the plugins that we installed for linter in testing files.
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  // This is the config for the plugins for testing files.
  {
    files: ["**/__tests__/**/*.tsx", "**/*.test.ts", "**/*.spec.ts"],
    ...jestDom.configs["flat/recommended"],
    ...testingLibrary.configs["flat/react"],
  },
]);

export default eslintConfig;`}</CodeBlock>{" "}
        <TextP>
          {" "}
          <Strong>
            <Strong>Configuración</Strong> de ESLint (.eslintrc.json) para
            versiones anteriores:
          </Strong>{" "}
        </TextP>
        <CodeBlock>{`{
  "extends": [
    "next/core-web-vitals",
    // This is the config for the plugins for testing files.
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ]
}`}</CodeBlock>{" "}
        <TextP>
          Habiendo agregado el uso de los plugins a la{" "}
          <Strong>configuración</Strong> de ESLint, deberíamos ver que en el
          archivo de test <CodeInline>Home.tsx</CodeInline> aparecen los errores
          de linter. Esto se debe a que el uso de{" "}
          <CodeInline>render()</CodeInline> dentro de{" "}
          <CodeInline>beforeEach()</CodeInline> no es recomendado.{" "}
        </TextP>
        <HighlightBox>
          En dado caso de que no se aplique la configuración de ESLint en tu
          editor de código, puedes reiniciar el servidor de ESLint. En VSCode lo
          puedes hacer con: <CodeInline>Ctrl + Shift + P</CodeInline> y
          escribiendo <CodeInline>ESLint: Restart ESLint Server</CodeInline>.{" "}
        </HighlightBox>{" "}
        <TextP>
          Para corregir los errores que indica el linter, basta con quitar el
          uso de render() dentro de beforeEach() y, en su lugar, agregarlo
          dentro de cada test individual. Lo que <Strong>haría</Strong> que
          nuestro archivo <CodeInline>Home.tsx</CodeInline> de test se vea así:
        </TextP>
        <CodeBlock>
          {`import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

describe("Home", () => {
  beforeEach(() => {});

  it("Should renders 'Templates'", () => {
    render(<Home />);
    const linkElement = screen.getByText("Templates");
    expect(linkElement).toBeInTheDocument();
  });

  it("Should renders 'Edit the page.tsx file'", () => {
    render(<Home />);
    const linkElement = screen.getByText(/edit the page.tsx file/i);
    expect(linkElement).toBeInTheDocument();
  });
});`}{" "}
        </CodeBlock>{" "}
      </section>
      {/* --- SECCIÓN 5: Conclusión --- */}
      <section className="mb-12">
        <SubtitleH2 content="Conclusión" />
        <TextP>
          ¡Y eso es todo! Si has seguido esta guía paso a paso, ahora tienes un
          entorno de pruebas completamente funcional con Jest y React Testing
          Library en tu proyecto de Next.js 16.
          <br />
          <br />
          No solo eso, sino que también has configurado ESLint para asegurar la
          calidad y consistencia de tu código de test, siguiendo las mejores
          prácticas modernas.
        </TextP>
      </section>
    </div>
  );
}
