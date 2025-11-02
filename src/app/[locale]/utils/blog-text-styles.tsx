import { Genos } from "next/font/google";

const genos = Genos({ subsets: ["latin"] });

export const TitleH1 = (props: { content: string }) => (
  <h1
    className={`text-center bg-clip-text text-transparent bg-gradient-to-t text-3xl font-bold mb-12 md:bg-gradient-to-tl from-secondary via-white to-primary-500 ${genos.className} text-3xl md:text-4xl lg:text-5xl font-bold`}
  >
    {props.content}
  </h1>
);

export const SubtitleH2 = (props: { content: string }) => (
  <h2
    className={` text-3xl font-bold mt-8 mb-4 text-primary-500 ${genos.className} text-xl md:text-2xl lg:text-3xl font-bold`}
  >
    {props.content}
  </h2>
);

export const SubtitleH3 = (props: { content: string }) => (
  <h3
    className={`text-3xl font-bold mt-6 mb-4 text-txt-300 ${genos.className} text-xl md:text-2xl lg:text-3xl font-medium`}
  >
    {props.content}
  </h3>
);

export const TextP = (props: { children: React.ReactNode }) => (
  <p className="text-sm md:text-base leading-relaxed mb-4">{props.children}</p>
);

export const Strong = (props: { children: React.ReactNode }) => (
  <strong className="font-bold">{props.children}</strong>
);

export const CodeInline = (props: { children: React.ReactNode }) => (
  <code className="bg-primary-500/20 px-2 py-1 rounded font-mono text-sm">
    {props.children}
  </code>
);

export const HighlightBox = (props: { children: React.ReactNode }) => (
  <div className="text-sm md:text-base leading-relaxed font-semibold bg-secondary/20 p-4 rounded-md my-6">
    {props.children}
  </div>
);

export const CodeBlock = (props: { children: React.ReactNode }) => (
  <pre className="bg-primary-500/20 p-4 rounded-md my-4 overflow-x-auto">
    <code className="font-mono text-sm">{props.children}</code>
  </pre>
);
