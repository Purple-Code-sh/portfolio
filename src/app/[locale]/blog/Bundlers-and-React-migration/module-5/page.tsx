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
  title: "Módulo 5 | Bundlers y Migración de React",
  description: "Taller de Migración (Funcional con Hooks)",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module5() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content="Módulo 5: Taller de Migración (Funcional con Hooks)" />

      <TextP>
        Este es el ejercicio práctico. La tarea es: tomar un archivo{" "}
        <CodeInline>.jsx</CodeInline> escrito con clases (como el del Módulo 4)
        y refactorizarlo a Hooks sin romper la funcionalidad.
      </TextP>

      {/* --- SECCIÓN 1: EL MAPEO 1:1 --- */}
      <section className="mb-12">
        <SubtitleH2 content="1. El Mapeo 1:1 (La Traducción)" />
        <TextP>
          Vamos a traducir el componente <CodeInline>UserData</CodeInline> del
          módulo anterior.
        </TextP>

        {/* Estilos básicos de tabla.*/}
        <div className="overflow-x-auto my-6">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm md:text-base">
            <thead>
              <tr className="bg-primary-500/20">
                <th className="border border-primary-500/30 p-3">
                  Concepto de Clase (Módulo 4)
                </th>
                <th className="border border-primary-500/30 p-3">
                  Equivalente en Hooks (Módulo 5)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  class UserData extends React.Component
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  function UserData(props)
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  this.props.userId
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  props.userId (o desestructurado: {"{ userId }"})
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  this.state = {"{...}"}
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  const [state, setState] = useState({"..."})
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  this.setState({"{"} foo: &apos;bar&apos; {"}"})
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  setState(prev =&gt; ({"{...prev, foo: 'bar'}"}))
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  componentDidMount()
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  useEffect(() =&gt; {"{ ... }"}, [])
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  componentDidUpdate(prevProps)
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  useEffect(() =&gt; {"{...}"}, [props.userId])
                </td>
              </tr>
              <tr>
                <td className="border border-primary-500/30 p-3 font-mono">
                  componentWillUnmount()
                </td>
                <td className="border border-primary-500/30 p-3 font-mono">
                  useEffect(() =&gt; {"{"} return () =&gt; {"{...}"} {"}"}, [])
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- SECCIÓN 2: EL CÓDIGO "ANTES" --- */}
      <section className="mb-12">
        <SubtitleH2 content='2. El Código "Antes" (Del Módulo 4)' />
        <TextP>Solo como recordatorio, este es nuestro punto de partida.</TextP>
        <CodeBlock>
          {`// ANTES: Class Component
import React from 'react';

class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true,
      seconds: 0
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(userId) {
    this.setState({ loading: true });
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        this.setState({ userData: data, loading: false });
      });
  }

  componentDidMount() {
    this.fetchData(this.props.userId);
    this.timerId = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchData(this.props.userId);
      this.setState({ seconds: 0, userData: null });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { loading, userData, seconds } = this.state;
    
    // ... JSX (ver módulo 4 o el bloque "Después")
  }
}`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 3: EL CÓDIGO "DESPUÉS" --- */}
      <section className="mb-12">
        <SubtitleH2 content='3. El Código "Después" (Migrado a Hooks)' />
        <TextP>
          Aquí está la traducción directa. Estudia los comentarios para ver el
          mapeo.
        </TextP>
        <CodeBlock>
          {`// DESPUÉS: Functional Component con Hooks
import React, { useState, useEffect } from 'react';

// Las props se reciben como argumento. No hay 'this'.
function UserData({ userId }) {
  // 1. Traducción del STATE
  // this.state.userData
  const [userData, setUserData] = useState(null);
  // this.state.loading
  const [loading, setLoading] = useState(true);
  // this.state.seconds
  const [seconds, setSeconds] = useState(0);

  // 2. Traducción de MÉTODOS
  // 'fetchData' ya no necesita 'this'.
  // Las funciones se definen dentro del componente.
  const fetchData = (id) => {
    setLoading(true);
    fetch(\`https://api.example.com/users/\${id}\`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      });
  };

  // 3. Traducción del CICLO DE VIDA

  // A. componentDidMount + componentWillUnmount (para el temporizador)
  useEffect(() => {
    // Código de componentDidMount
    const timerId = setInterval(() => {
      // Usamos la forma funcional de setState (recomendado)
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Código de componentWillUnmount (la función de retorno)
    return () => {
      clearInterval(timerId);
    };
  }, []); // Array vacío: se ejecuta 1 vez al montar.

  // B. componentDidMount + componentDidUpdate (para el fetch)
  useEffect(() => {
    // Código de componentDidMount
    fetchData(userId);

    // Reiniciamos el estado cuando el ID cambia
    // (Lógica que estaba en componentDidUpdate)
    setSeconds(0);
    setUserData(null);
    
  }, [userId]); // Array de dependencias:
  // Se ejecuta 1 vez al montar Y
  // cada vez que 'userId' cambie.
  // Esto reemplaza la lógica de 'if (props.userId !== prevProps.userId)'

  // 4. Traducción del RENDER
  // El 'return' del componente es el 'render'
  if (loading || !userData) {
    return <div>Cargando datos del usuario {userId}...</div>;
  }

  return (
    <div>
      <h1>Nombre: {userData.name}</h1>
      <p>Email: {userData.email}</p>
      <p>Tiempo en esta página: {seconds} segundos.</p>
    </div>
  );
}

export default UserData;`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 4: LAS TRAMPAS --- */}
      <section className="mb-12">
        <SubtitleH2 content="4. Las Trampas (Lo que Rompe la Migración)" />
        <TextP>
          La migración parece fácil, pero el 99% de los bugs provienen de no
          entender el Array de Dependencias de{" "}
          <CodeInline>useEffect</CodeInline>.
        </TextP>

        <SubtitleH3 content="Regla #1: Stale Closures (El bug más común)" />
        <HighlightBox>
          Si llamas a un setter de estado (como{" "}
          <CodeInline>setSeconds</CodeInline>) dentro de un{" "}
          <CodeInline>useEffect</CodeInline>, y ese setter <Strong>no</Strong>{" "}
          usa la forma funcional (<CodeInline>prev =&gt; ...</CodeInline>),
          debes incluir el valor del estado (ej.{" "}
          <CodeInline>seconds</CodeInline>) en el array de dependencias. Si no
          lo haces, tendrás un bug de &quot;stale closure&quot; (el efecto
          &quot;recuerda&quot; el valor viejo de{" "}
          <CodeInline>seconds</CodeInline> para siempre).
        </HighlightBox>

        <SubtitleH3 content="Regla #2: Bucles Infinitos" />
        <TextP>
          Si creas un bucle infinito (ej. <CodeInline>useEffect</CodeInline> que
          llama a <CodeInline>fetchData</CodeInline>,{" "}
          <CodeInline>fetchData</CodeInline> actualiza un estado, y ese estado
          está en el array de dependencias), es porque no has separado bien las
          responsabilidades.
        </TextP>

        <SubtitleH3 content="Regla #3: useCallback" />
        <TextP>
          En nuestro ejemplo, <CodeInline>fetchData</CodeInline> se vuelve a
          crear en cada render. Si pasáramos <CodeInline>fetchData</CodeInline>{" "}
          como prop a un componente hijo optimizado (
          <CodeInline>React.memo</CodeInline>), causaríamos re-renders
          innecesarios.
        </TextP>
        <TextP>
          La solución es envolverla en <CodeInline>useCallback</CodeInline> para
          memorizarla.
        </TextP>
        <CodeBlock>
          {`import { useCallback, /*...*/ } from 'react';

const fetchData = useCallback((id) => {
  setLoading(true);
  fetch(\`https://api.example.com/users/\${id}\`)
    .then(res => res.json())
    .then(data => {
      setUserData(data);
      setLoading(false);
    });
}, []); // No tiene dependencias externas (solo setters de estado)`}
        </CodeBlock>
      </section>
    </div>
  );
}
