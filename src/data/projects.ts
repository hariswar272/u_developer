import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with real-time inventory management, Stripe payment integration, and a comprehensive admin dashboard for managing products and orders.",
    image: "/images/projects/project-1.png",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Project Management Tool",
    description:
      "A collaborative project management application featuring real-time updates, Kanban boards, team chat, and automated workflow management with role-based access control.",
    image: "/images/projects/project-2.png",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Redux"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "AI Content Generator",
    description:
      "An intelligent content generation platform powered by OpenAI APIs with SEO optimization suggestions, content scheduling, and multi-format export capabilities.",
    image: "/images/projects/project-3.png",
    tags: ["Next.js", "OpenAI API", "Python", "FastAPI", "Tailwind CSS"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "4",
    title: "Real-Time Dashboard",
    description:
      "An interactive analytics dashboard with real-time data visualization, customizable widgets, and automated reporting using WebSocket connections for live data streaming.",
    image: "/images/projects/project-4.png",
    tags: ["React", "D3.js", "WebSocket", "Express", "Chart.js"],
    category: "frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "5",
    title: "Social Media API",
    description:
      "A scalable RESTful API for a social media platform with authentication, real-time notifications, media upload, and a sophisticated content recommendation engine.",
    image: "/images/projects/project-5.png",
    tags: ["Node.js", "Express", "MongoDB", "Redis", "JWT"],
    category: "backend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "6",
    title: "Portfolio Builder",
    description:
      "A drag-and-drop portfolio builder that allows developers to create stunning portfolios with customizable themes, animations, and one-click deployment to custom domains.",
    image: "/images/projects/project-6.png",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Framer Motion"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
];
