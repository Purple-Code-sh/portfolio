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
  title: "Módulo 4 | Bundlers y Migración de React",
  description: "El Legacy Code de React (Componentes de Clase)",
  robots: {
    index: true,
    follow: true,
    notranslate: false,
  },
};
const inter = Inter({ subsets: ["latin"] });

export default function Module4() {
  return (
    <div className={`sh-container py-8 md:py-12 xl:py-16 ${inter.className}`}>
      <TitleH1 content='Módulo 4: El "Legacy Code" de React (Componentes de Clase)' />

      <TextP>
        Este es el &quot;React Clásico&quot;. Antes de 2018 (introducción de los
        Hooks), esta era la única forma de crear componentes con estado, lógica
        de ciclo de vida o cualquier comportamiento complejo.
      </TextP>
      <TextP>
        Los proyectos que requieren mantenimiento o una actualización a métodos
        más modernos están llenos de esta sintaxis. El trabajo está en
        entenderla para poder migrarla.
      </TextP>

      {/* --- SECCIÓN 1: SINTAXIS BÁSICA --- */}
      <section className="mb-12">
        <SubtitleH2 content="1. La Sintaxis Básica: class extends React.Component" />
        <TextP>
          La estructura fundamental es una clase de ES6 que hereda de{" "}
          <CodeInline>React.Component</CodeInline>.
        </TextP>
        <TextP>
          Requisito clave: Debe tener un método llamado{" "}
          <CodeInline>render()</CodeInline>.
        </TextP>
        <TextP>
          El método <CodeInline>render()</CodeInline> es el que devuelve el JSX
          (la UI).
        </TextP>
        <CodeBlock>
          {`import React from 'react';

class Saludo extends React.Component {
  render() {
    return <h1>Hola, este es un componente de clase.</h1>;
  }
}

export default Saludo;`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 2: MANEJO DE PROPS --- */}
      <section className="mb-12">
        <SubtitleH2 content="2. Manejo de props (Propiedades)" />
        <TextP>
          Las props se reciben automáticamente gracias a{" "}
          <CodeInline>super(props)</CodeInline> y se acceden a través de{" "}
          <CodeInline>this.props</CodeInline>.
        </TextP>
        <TextP>
          <Strong>Acceso:</Strong>{" "}
          <CodeInline>this.props.nombreDeLaProp</CodeInline>
        </TextP>
        <TextP>
          <Strong>Inmutabilidad:</Strong> Al igual que en los componentes
          funcionales, las props son de solo lectura. Nunca debes modificar{" "}
          <CodeInline>this.props</CodeInline>.
        </TextP>
        <CodeBlock>
          {`class SaludoUsuario extends React.Component {
  render() {
    // Accedemos a la prop 'nombre'
    return <h1>Hola, {this.props.nombre}</h1>;
  }
}

// Uso: <SaludoUsuario nombre="Mentor" />`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 3: MANEJO DE STATE --- */}
      <section className="mb-12">
        <SubtitleH2 content="3. Manejo de state (Estado)" />
        <TextP>
          Este es el concepto central. El state es el objeto que almacena los
          datos internos del componente que pueden cambiar.
        </TextP>

        <SubtitleH3 content="A. Inicialización del Estado" />
        <TextP>
          El estado debe inicializarse en el{" "}
          <CodeInline>constructor()</CodeInline> del componente. El constructor
          es el primer método que se ejecuta.
        </TextP>
        <ul className="list-disc list-inside space-y-3 pl-5 text-sm md:text-base leading-relaxed mb-6">
          <li>
            <Strong>Regla #1:</Strong> Siempre debes llamar a{" "}
            <CodeInline>super(props)</CodeInline> primero en el constructor.
          </li>
          <li>
            <Strong>Regla #2:</Strong> El estado siempre es un objeto. Se asigna
            a <CodeInline>this.state</CodeInline>.
          </li>
        </ul>
        <CodeBlock>
          {`class Contador extends React.Component {
  constructor(props) {
    super(props); // Siempre primero
    // Inicializamos el estado
    this.state = {
      conteo: 0
    };
  }

  render() {
    // Accedemos al estado
    return <h1>Conteo: {this.state.conteo}</h1>;
  }
}`}
        </CodeBlock>

        <SubtitleH3 content="B. Actualización del Estado" />
        <TextP>
          <Strong>Error Fatal:</Strong> Nunca modifiques el estado directamente.
        </TextP>
        <TextP>
          <CodeInline>this.state.conteo = 1;</CodeInline>{" "}
          <Strong>¡INCORRECTO!</Strong> React no se enterará del cambio.
        </TextP>
        <TextP>
          <Strong>Forma Correcta:</Strong> Se usa el método{" "}
          <CodeInline>this.setState()</CodeInline>. Este método le dice a React
          que el estado ha cambiado, y React programará un nuevo{" "}
          <CodeInline>render()</CodeInline>.
        </TextP>
        <CodeBlock>
          {`// dentro de la clase Contador
incrementar() {
  // setState es ASÍNCRONO.
  // React agrupa múltiples setState por rendimiento.
  this.setState({
    conteo: this.state.conteo + 1
  });
}`}
        </CodeBlock>
        <TextP>
          <Strong>Mejor Práctica (Forma Funcional):</Strong> Como{" "}
          <CodeInline>setState</CodeInline> es asíncrono, si tu nuevo estado
          depende del estado anterior, debes usar la forma funcional para evitar
          bugs.
        </TextP>
        <CodeBlock>
          {`incrementar() {
  // Garantiza que usamos el estado más reciente
  this.setState((prevState) => {
    return {
      conteo: prevState.conteo + 1
    }
  });
};`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 4: EL 'INFIERNO' DEL THIS --- */}
      <section className="mb-12">
        <SubtitleH2 content='4. El "Infierno" del this' />
        <TextP>Este es el bug más común en componentes de clase.</TextP>
        <TextP>
          <Strong>El Problema:</Strong> El contexto de{" "}
          <CodeInline>this</CodeInline> en JavaScript se pierde cuando pasas un
          método de clase como un callback (por ejemplo, a un{" "}
          <CodeInline>onClick</CodeInline>).
        </TextP>
        <TextP>
          <Strong>Ejemplo Roto:</Strong>
        </TextP>
        <CodeBlock>
          {`<button onClick={this.incrementar}>Incrementar</button>
// Cuando se hace clic, 'this' dentro de 'incrementar' es 'undefined'.
// 'this.setState' fallará.`}
        </CodeBlock>

        <SubtitleH3 content='Solución 1: .bind() en el Constructor (La forma "clásica")' />
        <TextP>
          Le dices a JavaScript que &quot;relacione&quot; permanentemente el{" "}
          <CodeInline>this</CodeInline> de la clase al método.
        </TextP>
        <CodeBlock>
          {`constructor(props) {
  super(props);
  this.state = { conteo: 0 };

  // "Bindeamos" el método
  this.incrementar = this.incrementar.bind(this);
}

// Ahora 'this' siempre será la instancia del componente
incrementar() {
  this.setState((prev) => ({ conteo: prev.conteo + 1 }));
}`}
        </CodeBlock>

        <SubtitleH3 content='Solución 2: Class Fields (Arrow Functions - La forma "moderna")' />
        <TextP>
          Esta sintaxis usa una función de flecha, que automáticamente captura
          el <CodeInline>this</CodeInline> del contexto de la clase.
        </TextP>
        <CodeBlock>
          {`// No se necesita constructor para bindeo
incrementar = () => {
  this.setState((prev) => ({ conteo: prev.conteo + 1 }));
}

// Funciona directamente
render() {
  return <button onClick={this.incrementar}>Incrementar</button>
}`}
        </CodeBlock>
      </section>

      {/* --- SECCIÓN 5: CICLO DE VIDA --- */}
      <section className="mb-12">
        <SubtitleH2 content="5. El Ciclo de Vida (Lifecycle)" />
        <TextP>
          Esta es la parte más importante para la migración. Estos métodos son
          los &quot;puntos de control&quot; donde puedes ejecutar código en
          momentos específicos de la vida del componente.
        </TextP>
        <TextP>
          Son el equivalente directo a los <CodeInline>useEffect</CodeInline> en
          los Hooks.
        </TextP>

        <SubtitleH3 content="A. Montaje (componentDidMount)" />
        <TextP>
          <Strong>Cuándo se ejecuta:</Strong> Una sola vez, justo después de que
          el componente se ha renderizado en el DOM por primera vez.
        </TextP>
        <TextP>
          <Strong>Uso principal:</Strong> Peticiones API (fetch), suscripciones
          (<CodeInline>setInterval</CodeInline>, WebSockets,{" "}
          <CodeInline>addEventListener</CodeInline>).
        </TextP>
        <TextP>
          <Strong>Equivalente en Hooks:</Strong>{" "}
          <CodeInline>useEffect(() =&gt; {"{...}"}, [])</CodeInline> (array de
          dependencias vacío).
        </TextP>

        <SubtitleH3 content="B. Actualización (componentDidUpdate)" />
        <TextP>
          <Strong>Cuándo se ejecuta:</Strong> Cada vez que las{" "}
          <CodeInline>props</CodeInline> o el <CodeInline>state</CodeInline>{" "}
          cambian.
        </TextP>
        <TextP>
          <Strong>Argumentos:</Strong>{" "}
          <CodeInline>componentDidUpdate(prevProps, prevState)</CodeInline>
        </TextP>
        <HighlightBox>
          <Strong>¡TRAMPA MORTAL!:</Strong> Si llamas a{" "}
          <CodeInline>setState</CodeInline> aquí sin una condición, crearás un
          bucle infinito (<CodeInline>setState</CodeInline> -&gt; re-render
          -&gt; <CodeInline>componentDidUpdate</CodeInline> -&gt;{" "}
          <CodeInline>setState</CodeInline>...).
        </HighlightBox>
        <TextP>
          <Strong>Uso principal:</Strong> Reaccionar a un cambio de props. (Ej.
          &quot;si el ID del usuario cambió, haz un nuevo fetch&quot;).
        </TextP>
        <TextP>
          <Strong>Equivalente en Hooks:</Strong>{" "}
          <CodeInline>useEffect(() =&gt; {"{...}"}, [prop.id])</CodeInline>{" "}
          (array de dependencias poblado).
        </TextP>
        <CodeBlock>
          {`// Ejemplo: Cargar datos de un usuario cuando el 'id' cambia
componentDidUpdate(prevProps) {
  // LA CONDICIÓN ES OBLIGATORIA!
  if (this.props.userId !== prevProps.userId) {
    // El ID cambió, hacer un nuevo fetch
    this.fetchUserData(this.props.userId);
  }
}`}
        </CodeBlock>

        <SubtitleH3 content="C. Desmontaje (componentWillUnmount)" />
        <TextP>
          <Strong>Cuándo se ejecuta:</Strong> Una sola vez, justo antes de que
          el componente sea destruido y eliminado del DOM.
        </TextP>
        <TextP>
          <Strong>Uso principal:</Strong> Limpieza. Cancelar peticiones,
          des-suscribirse (<CodeInline>clearInterval</CodeInline>,{" "}
          <CodeInline>removeEventListener</CodeInline>).
        </TextP>
        <TextP>
          <Strong>Equivalente en Hooks:</Strong> La función de retorno de{" "}
          <CodeInline>useEffect</CodeInline>.
        </TextP>
        <CodeBlock>{`useEffect(() => { 
  return () => { ... } // Función de limpieza
}, [])`}</CodeBlock>

        <SubtitleH3 content="D. render()" />
        <TextP>
          <Strong>Cuándo se ejecuta:</Strong> En el montaje y cada vez que{" "}
          <CodeInline>setState</CodeInline> o un cambio de{" "}
          <CodeInline>props</CodeInline> lo dispara.
        </TextP>
        <TextP>
          <Strong>Regla:</Strong> Debe ser una función pura de{" "}
          <CodeInline>this.props</CodeInline> y{" "}
          <CodeInline>this.state</CodeInline>. No debe tener efectos secundarios
          (como fetch).
        </TextP>
      </section>

      {/* --- SECCIÓN 6: EJEMPLO COMPLETO --- */}
      <section className="mb-12">
        <SubtitleH2 content="6. Ejemplo Completo (El Código a Migrar)" />
        <TextP>
          Aquí tienes un componente típico de clase que usa todos estos
          conceptos. Estúdialo. Este es el &quot;antes&quot; que traducirás en
          el Módulo 5.
        </TextP>
        <CodeBlock>
          {`import React from 'react';

class UserData extends React.Component {
  // 1. Inicialización
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      loading: true,
      seconds: 0
    };
    // 4. Bindeo de 'this'
    this.fetchData = this.fetchData.bind(this);
  }

  // Función de ayuda
  fetchData(userId) {
    this.setState({ loading: true });
    fetch(\`https://api.example.com/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        this.setState({ userData: data, loading: false });
      });
  }

  // 5A. Montaje: Iniciar petición y temporizador
  componentDidMount() {
    this.fetchData(this.props.userId);

    this.timerId = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  // 5B. Actualización: Reaccionar a cambio de prop 'userId'
  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchData(this.props.userId);
      // Reiniciamos el estado si el usuario cambia
      this.setState({ seconds: 0, userData: null });
    }
  }

  // 5C. Desmontaje: Limpieza
  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  // 5D. Render
  render() {
    const { loading, userData, seconds } = this.state;

    if (loading || !userData) {
      return <div>Cargando datos del usuario {this.props.userId}...</div>;
    }

    return (
      <div>
        <h1>Nombre: {userData.name}</h1>
        <p>Email: {userData.email}</p>
        <p>Tiempo en esta página: {seconds} segundos.</p>
      </div>
    );
  }
}`}
        </CodeBlock>
      </section>
    </div>
  );
}
