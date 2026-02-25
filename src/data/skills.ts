import { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "SiReact", category: "frontend" },
  { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
  { name: "TypeScript", icon: "SiTypescript", category: "frontend" },
  { name: "JavaScript", icon: "SiJavascript", category: "frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "frontend" },
  { name: "HTML5", icon: "SiHtml5", category: "frontend" },
  { name: "CSS3", icon: "SiCss3", category: "frontend" },
  { name: "Redux", icon: "SiRedux", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "SiNodedotjs", category: "backend" },
  { name: "Express", icon: "SiExpress", category: "backend" },
  { name: "Python", icon: "SiPython", category: "backend" },
  { name: "REST APIs", icon: "SiPostman", category: "backend" },
  { name: "GraphQL", icon: "SiGraphql", category: "backend" },

  // Database
  { name: "MongoDB", icon: "SiMongodb", category: "database" },
  { name: "PostgreSQL", icon: "SiPostgresql", category: "database" },
  { name: "MySQL", icon: "SiMysql", category: "database" },
  { name: "Firebase", icon: "SiFirebase", category: "database" },
  { name: "Redis", icon: "SiRedis", category: "database" },

  // Tools
  { name: "Git", icon: "SiGit", category: "tools" },
  { name: "Docker", icon: "SiDocker", category: "tools" },
  { name: "AWS", icon: "SiAmazonwebservices", category: "tools" },
  { name: "Vercel", icon: "SiVercel", category: "tools" },
  { name: "VS Code", icon: "SiVisualstudiocode", category: "tools" },
  { name: "Figma", icon: "SiFigma", category: "tools" },
];

export const skillCategories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools & DevOps" },
] as const;
