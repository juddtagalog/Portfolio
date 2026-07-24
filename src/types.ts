export type NavigationTab = 'Home' | 'Projects' | 'Resume' | 'About';

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  techStack: string[];
  duration: string;
  durationSeconds: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  technologies: string[];
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface ExtracurricularItem {
  event: string;
  role: string;
  date: string;
}

export interface OwnerProfile {
  name: string;
  role: string;
  avatar: string;
  banner: string;
  bio: string;
  stats: {
    label: string;
    value: string;
  }[];
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  extracurriculars: ExtracurricularItem[];
}