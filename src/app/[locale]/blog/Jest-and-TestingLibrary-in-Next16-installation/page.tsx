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
      <TitleH1 content="Instalación de Jest y React Testing Library en Next.js versión 16" />

      {/* --- SECCIÓN 0 --- */}
      <section className="mb-12">
        <SubtitleH2 content="Consideraciones" />
        <TextP>
          Para la siguiente guía, se asume que el proyecto de Next está en la
          versión 16. Ya sea porque ha sido creado desde cero usando algun
          template o mediante el uso de{" "}
          <CodeInline>npx create-next-app@latest</CodeInline>. O porque se ha
          actualizado un proyecto existente a dicha versión.
          <br />
          <br />
          Además, para este ejemplo se asume que el proyecto se ha construido
          con: <Strong>TypeScript, ESLint y AppRouter</Strong>. <br />Y que,
          preferiblemente, el codigo de la aplicación se encuentra dentro de una
          carpeta <CodeInline>src/</CodeInline>.
        </TextP>
      </section>

      {/* --- SECCIÓN 1 --- */}
      <section className="mb-12">
        <SubtitleH2 content="1. Instalación de dependencias e inicialización de Jest" />

        <TextP>
          De acuerdo a la documentación oficial de{" "}
          <a
            href="https://nextjs.org/docs/app/guides/testing/jest#optional-extend-jest-with-custom-matchers"
            className="font-bold underline"
            target="_blank"
          >
            Next
          </a>
          . La configuración de Jest requiere la instalación de las siguientes{" "}
          <Strong>dependencias de desarrollo</Strong>:
        </TextP>
        <CodeBlock>
          {`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest`}
        </CodeBlock>

        <SubtitleH3 content="Inicialización de Jest y configuración inicial" />
        <TextP>
          Despues de la instalación de dependencias, se debe crear un archivo
          llamado <CodeInline>jest.config.ts</CodeInline> en la raíz del
          proyecto. Este archivo se encargará de configurar Jest y sus opciones.
        </TextP>
        <TextP>
          Esto se puede hacer de manera manual o utilizando el comando:
        </TextP>
        <CodeBlock>{`npm init jest@latest`}</CodeBlock>
        <TextP>
          Para el cual se deberan seleccionar las siguientes opciones:
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            Would you like to use Jest when running &quot;test&quot; script in
            package.json?: <Strong>Yes</Strong>
          </li>
          <li>
            Would you like to use Typescript for the configuration file?:{" "}
            <Strong>Yes</Strong>
          </li>
          <li>
            Choose the test environment that will be used for testing:{" "}
            <Strong>jsdom (browser like)</Strong>
          </li>
          <li>
            Do you want Jest to add coverage reports?: <Strong>No</Strong>
          </li>
          <li>
            Wich provider should be used to instrument code for coverage?:{" "}
            <Strong>v8</Strong>
          </li>
          <li>
            Automatically clear mock calls, instances, contexts and results
            before every test?: <Strong>No</Strong>
          </li>
        </ul>
        <TextP>
          Al usar el comando anterior, el archivo se creará con un contenido
          inicial. El cual se puede borrar o modificar según sea necesario.
          <br />
          Adicionalmente se agrega el script &quot;test&quot; dentro del archivo{" "}
          <CodeInline>package.json</CodeInline>.
        </TextP>
        <HighlightBox>
          Si no tienes el script &quot;test&quot; en el package.json. Solo
          tienes que agregarlo en la seccion de scripts como:{" "}
          <CodeInline>&quot;test&quot;: &quot;jest&quot;</CodeInline>
          <br />O usando la versión del script que busca los cambios de manera
          automática y vuelve a ejecutar los tests:{" "}
          <CodeInline>
            &quot;test:watch&quot;: &quot;jest --watchAll&quot;
          </CodeInline>
        </HighlightBox>
        <TextP>
          En nuestra implementación, se recomienda que el contenido del archivo{" "}
          <CodeInline>jest.config.ts</CodeInline> sea exactamente el siguiente:
        </TextP>
        <CodeBlock>
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
`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 2 --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Extender la configuración inicial" />
        <TextP>
          Para asegurarnos de que el contenido del archivo{" "}
          <CodeInline>jest.config.ts</CodeInline> funcione correctamente debemos
          instalar el preset de jest para TypeScript. Lo cual se hace con el
          siguiente comando:
        </TextP>
        <CodeBlock>{`npm install ts-jest`}</CodeBlock>

        <SubtitleH3 content="Archivo setup" />
        <TextP>
          En la configuracion inicial, la linea{" "}
          <CodeInline>setupFilesAfterEnv</CodeInline> se utiliza para cargar
          archivos de configuración adicionales. Nosotros lo usaremos para
          extender Jest usando los &quot;custom matchers&quot;.
        </TextP>
        <TextP>
          Para ello, debemos crear el documento al que hace referencia{" "}
          <CodeInline>setupFilesAfterEnv</CodeInline> en nuestra configuracion
          inicial.
          <br />
          Asi que, en el root de nuestro proyecto, en el mismo nivel en el que
          se encuentra el archivo <CodeInline>jest.config.ts</CodeInline>,
          crearemos un archivo llamado <CodeInline>jest.setup.ts</CodeInline>.
          <br />
          Cuyo contenido debe ser el siguiente:
        </TextP>
        <CodeBlock>{`import "@testing-library/jest-dom";`}</CodeBlock>
        <HighlightBox>
          Esta dependencia ya la hemos instalado en el paso 1. Junto con las
          demas dependencias de desarrollo.
        </HighlightBox>
      </section>

      {/* --- SECCIÓN 3: GRAFO DE DEPENDENCIAS --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. Pruebas de funcionamiento" />
        <TextP>
          Para asegurarnos de que nuestra implementación funciona correctamente
          debemos crear nuestro primer test. Para ello, debemos crear una
          carpeta llamada <CodeInline>__tests__</CodeInline> al mismo nivel que
          nuestra carpeta de App, osea dentro de <CodeInline>src/</CodeInline>.
        </TextP>
        <TextP>
          Posteriormente, dentro de la carpeta __tests__ crearemos un archivo
          llamado <CodeInline>Home.tsx</CodeInline>.
          <br />
          Este archivo contendrá nuestro primer test. Cuyo contenido puede ser
          el siguiente:
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
});
`}
        </CodeBlock>

        <HighlightBox>
          Este test se encarga de comprobar que dentro de la página de inicio
          (App/page.tsx) existen los textos &quot;Templates&quot; y &quot;Edit
          the page.tsx file&quot;. Puedes modificarlo para buscar otros textos o
          hacer un test diferente para otros componentes.
        </HighlightBox>
        <TextP>
          Una vez que hayas creado el archivo, debemos ejecutar el comando{" "}
          <CodeInline>npm test</CodeInline> o{" "}
          <CodeInline>npm run test:watch</CodeInline> para que se ejecuten los
          tests existentes.
        </TextP>
        <TextP>
          Si todo va bien, deberíamos ver como resultado en la terminal que
          todos los test pasan. O como minimo ver los tests en rojo.
          <br />
          Cualquiera de los 2 casos significa que nuestra implementación
          funciona correctamente.
        </TextP>
      </section>

      {/* --- SECCIÓN 4: DESARROLLO VS. PRODUCCIÓN --- */}
      <section className="mb-12">
        <SubtitleH2 content="4. Desarrollo vs. Producción" />
        <TextP>
          Un bundler tiene dos modos de operación con objetivos opuestos.
        </TextP>
      </section>
    </div>
  );
}
