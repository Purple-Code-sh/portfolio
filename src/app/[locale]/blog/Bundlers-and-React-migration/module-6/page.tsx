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
  title: "Módulo 6 | Bundlers y Migración de React",
  description: "Estrategias de Mantenimiento",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module6() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content="Módulo 6: Estrategias de Mantenimiento" />

      <TextP>
        Has aprendido a leer Webpack (M2) y Vite (M3). Has aprendido a leer
        componentes de clase (M4) y a escribirlos con Hooks (M5).
      </TextP>
      <TextP>
        Ahora, la pregunta más importante: ¿Cómo lo haces en un proyecto real
        sin que te despidan?
      </TextP>
      <TextP>
        En una empresa como IBM, el legacy code existe por una razón: funciona y
        genera dinero. Tu principal directiva no es &quot;modernizar&quot;; es{" "}
        <Strong>&quot;no romper&quot;</Strong>.
      </TextP>

      {/* --- SECCIÓN 1: EL PRINCIPIO DE "NO ROMPER" --- */}
      <section className="mb-12">
        <SubtitleH2 content='1. El Principio de "No Romper": El Rol Crítico de las Pruebas' />
        <TextP>
          Esta es la regla de oro. Nunca, jamás, migres un componente que no
          tenga una cobertura de pruebas adecuada.
        </TextP>
        <TextP>
          ¿Por qué? Porque sin pruebas, tu única forma de verificar que la
          migración fue exitosa es &quot;haciendo clic en la UI&quot;, lo cual
          es propenso a errores humanos.
        </TextP>

        <SubtitleH3 content="Las Herramientas" />
        <TextP>
          Necesitas dominar <Strong>Jest</Strong> (el test runner) y{" "}
          <Strong>React Testing Library (RTL)</Strong> (la utilidad para
          renderizar y consultar componentes).
        </TextP>

        <SubtitleH3 content="El Flujo de Trabajo (TDD aplicado a la migración)" />
        <ol className="list-decimal list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Identifica el Componente:</Strong> Eliges el componente de
            clase <CodeInline>UserData</CodeInline> que vas a migrar.
          </li>
          <li>
            <Strong>Escribe la Prueba (si no existe):</Strong> Escribe una
            prueba de RTL que verifique su comportamiento actual (el de clase).
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>Que muestra &quot;Cargando...&quot; al inicio.</li>
              <li>
                Que (después de un fetch simulado) muestra el nombre del
                usuario.
              </li>
              <li>
                Que si las props cambian, vuelve a mostrar
                &quot;Cargando...&quot; y luego el nuevo nombre.
              </li>
            </ul>
          </li>
          <li>
            <Strong>Ejecuta la Prueba:</Strong>{" "}
            <CodeInline>npm test</CodeInline>. La prueba debe pasar (color
            verde). Este es tu contrato, tu red de seguridad.
          </li>
          <li>
            <Strong>Migra el Componente:</Strong> Ahora, abre{" "}
            <CodeInline>UserData.jsx</CodeInline> y haz la refactorización a
            Hooks (Módulo 5). <Strong>No toques el archivo de prueba</Strong>.
          </li>
          <li>
            <Strong>Ejecuta la Prueba de Nuevo:</Strong>{" "}
            <CodeInline>npm test</CodeInline>.
          </li>
          <li>
            <Strong>Resultado:</Strong>
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>
                <Strong>Si la prueba pasa (verde):</Strong> tu migración fue un
                éxito. El comportamiento externo del componente es idéntico.
              </li>
              <li>
                <Strong>Si la prueba falla (rojo):</Strong> has introducido un
                bug (probablemente en un <CodeInline>useEffect</CodeInline>).
                Arréglarlo antes de continuar.
              </li>
            </ul>
          </li>
        </ol>

        <HighlightBox>
          En la entrevista, si te preguntan &quot;Cómo migras un
          componente&quot;, tu primera respuesta debe ser: &quot;Primero, me
          aseguro de que tenga una cobertura de pruebas completa con React
          Testing Library&quot;.
        </HighlightBox>
      </section>

      {/* --- SECCIÓN 2: ESTRATEGIA BOTTOM-UP --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Estrategia de Migración: Bottom-Up (De Abajo hacia Arriba)" />
        <TextP>
          No puedes empezar migrando el <CodeInline>App.js</CodeInline>. Los
          proyectos grandes son un árbol de componentes. La estrategia más
          segura es empezar por las &quot;hojas&quot; y subir hacia el
          &quot;tronco&quot;.
        </TextP>
        <ol className="list-decimal list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Identifica los &quot;Componentes Hoja&quot;:</Strong> Son
            los componentes más simples que no importan a otros componentes de
            tu aplicación (ej. <CodeInline>Button.jsx</CodeInline>,{" "}
            <CodeInline>Avatar.jsx</CodeInline>,{" "}
            <CodeInline>Spinner.jsx</CodeInline>).
          </li>
          <li>
            <Strong>Mígralos:</Strong> Estos son fáciles. Probablemente solo
            reciben props y no tienen estado. (Si son de clase, migra{" "}
            <CodeInline>this.props</CodeInline> a <CodeInline>props</CodeInline>
            ).
          </li>
          <li>
            <Strong>Sube un Nivel:</Strong> Ahora migra los componentes que usan
            esos componentes hoja (ej. un{" "}
            <CodeInline>UserProfileCard.jsx</CodeInline> que usa{" "}
            <CodeInline>Avatar</CodeInline> y <CodeInline>Button</CodeInline>).
          </li>
          <li>
            <Strong>Repite:</Strong> Continúa subiendo por el árbol, migrando
            componentes más complejos (<CodeInline>UserList.jsx</CodeInline>)
            hasta que finalmente llegues a la raíz (
            <CodeInline>App.js</CodeInline>).
          </li>
        </ol>
        <TextP>
          <Strong>Ventaja:</Strong> Esta estrategia aísla los fallos. Si rompes
          el <CodeInline>UserProfileCard</CodeInline>, es mucho más fácil de
          depurar que si rompes <CodeInline>App.js</CodeInline> y todo el sitio
          deja de funcionar.
        </TextP>
      </section>

      {/* --- SECCIÓN 3: MANEJO DE ESTADO GLOBAL --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. Manejo de Estado Global (Redux y Context)" />
        <TextP>
          Aquí es donde la migración se complica. Es muy probable que encuentres
          componentes de clase &quot;conectados&quot; a Redux.
        </TextP>

        <SubtitleH3 content='A. Redux "Clásico" (connect())' />
        <TextP>
          Verás código como este, que es un &quot;High-Order Component&quot;
          (HOC):
        </TextP>
        <CodeBlock>
          {`// ANTES: Componente de clase "conectado"
class UserProfile extends React.Component {
  componentDidMount() {
    // Las props 'fetchUser' y 'user' vienen de Redux!
    this.props.fetchUser(this.props.id);
  }
  render() {
    return <div>{this.props.user.name}</div>
  }
}

// 'connect' mapea el estado y las acciones de Redux a las props
const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = {
  fetchUser: (id) => ({ type: 'FETCH_USER_REQUEST', payload: id })
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);`}
        </CodeBlock>
        <TextP>
          <Strong>Tu trabajo de migración:</Strong>
        </TextP>
        <ol className="list-decimal list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            Migra <CodeInline>UserProfile</CodeInline> a un componente funcional
            (Módulo 5).
          </li>
          <li>
            Reemplaza <CodeInline>connect()</CodeInline> con Hooks de Redux:
            <ul className="list-disc list-inside pl-6 mt-2 space-y-2">
              <li>
                <CodeInline>mapStateToProps</CodeInline> se reemplaza por{" "}
                <CodeInline>useSelector()</CodeInline>.
              </li>
              <li>
                <CodeInline>mapDispatchToProps</CodeInline> se reemplaza por{" "}
                <CodeInline>useDispatch()</CodeInline>.
              </li>
            </ul>
          </li>
        </ol>
        <CodeBlock>
          {`// DESPUÉS: Componente funcional con Hooks de Redux
import { useSelector, useDispatch } from 'react-redux';

function UserProfile({ id }) {
  const dispatch = useDispatch();
  
  // 1. Reemplazo de mapStateToProps
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    // 2. Reemplazo de mapDispatchToProps
    dispatch({ type: 'FETCH_USER_REQUEST', payload: id });
  }, [dispatch, id]);

  return <div>{user.name}</div>;
}`}
        </CodeBlock>

        <SubtitleH3 content="B. Context API" />
        <TextP>
          El Context API &quot;clásico&quot; usaba un{" "}
          <CodeInline>&lt;MyContext.Consumer&gt;</CodeInline>. La migración es
          más simple: reemplázalo con el Hook{" "}
          <CodeInline>useContext()</CodeInline>.
        </TextP>
      </section>

      {/* --- SECCIÓN 4: RESUMEN DE LA RUTA --- */}
      <section className="mb-12">
        <SubtitleH2 content="Resumen de la Ruta de Aprendizaje" />
        <ol className="list-decimal list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Módulo 1:</Strong> Entendiste <Strong>por qué</Strong>{" "}
            necesitamos bundlers (Transpilación, Grafo de Dependencias).
          </li>
          <li>
            <Strong>Módulo 2:</Strong> Aprendiste a <Strong>leer</Strong> el
            pipeline legacy (<CodeInline>webpack.config.js</CodeInline>).
          </li>
          <li>
            <Strong>Módulo 3:</Strong> Aprendiste a <Strong>usar</Strong> el
            pipeline moderno (<CodeInline>vite.config.js</CodeInline>).
          </li>
          <li>
            <Strong>Módulo 4:</Strong> Aprendiste a <Strong>leer</Strong> el
            código React legacy (Componentes de Clase, Ciclo de Vida).
          </li>
          <li>
            <Strong>Módulo 5:</Strong> Aprendiste a <Strong>escribir</Strong> el
            código React moderno (Hooks, <CodeInline>useEffect</CodeInline>).
          </li>
          <li>
            <Strong>Módulo 6:</Strong> Aprendiste la <Strong>estrategia</Strong>{" "}
            para migrar de uno al otro sin romper nada (Pruebas, Bottom-Up).
          </li>
        </ol>
        <HighlightBox>
          Has completado la ruta. Esta es la base de conocimiento exacta que se
          espera de un ingeniero frontend que trabaja en mantenimiento y
          modernización de aplicaciones.
        </HighlightBox>
      </section>
    </div>
  );
}
