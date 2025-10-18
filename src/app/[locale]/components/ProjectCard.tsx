import Image from "next/image";
import type { Landing } from "@prisma/client"; // Import the type from the parent

const TECHNOLOGY_ICONS: { [key: string]: string } = {
  html: "/tech-icons/html.svg",
  tailwind: "/tech-icons/tailwind.svg",
  css: "/tech-icons/css.svg",
  "javascript-ES6": "/tech-icons/js.svg",
  cloudflare: "/tech-icons/cloudflare.svg",
  next: "/tech-icons/next.png",
  typescript: "/tech-icons/typescript.svg",
  aws: "/tech-icons/aws.svg",
  zustand: "/tech-icons/zustand.svg",
  node: "/tech-icons/node.png",
  react: "/tech-icons/react.svg",
  npm: "/tech-icons/npm.svg",
  github: "/tech-icons/github.svg",
  mysql: "/tech-icons/mysql.svg",
  default: "/tech-icons/default.svg",
};

type ProjectCardProps = {
  project: Landing;
  onClick: () => void;
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="bg-neutral-800 border-secondary/20 hover:border-primary-400/50 shadow-primary-400/15 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl h-full flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
    >
      <Image
        src={project.imagePreview}
        alt={`${project.name} preview`}
        className="w-full h-32 lg:h-48 object-cover"
        width={358}
        height={192}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <div className="flex-grow" />
        <div className="mt-3 lg:mt-4 flex gap-2 w-full flex-wrap items-baseline">
          {project.technologies.map((techName) => (
            <Image
              key={techName}
              src={TECHNOLOGY_ICONS[techName] || TECHNOLOGY_ICONS.default}
              alt={techName}
              title={techName}
              className="h-4 md:h-5 lg:h-6 opacity-90 hover:opacity-100 w-auto object-contain"
              width={64}
              height={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
