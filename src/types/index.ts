export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "frontend" | "backend" | "fullstack";
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  tags: string[];
}

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  roles: string[];
  social: SocialLink[];
  stats: { label: string; value: string }[];
}
