export interface Skill {
  id: string;
  name: string;
  category: 'Languages' | 'Web Tech' | 'Tools & Core CS';
  icon: string;
  color: string;
  level: string; // e.g. "Proficient", "Intermediate", "Advanced"
  description: string;
  projectsCount: number;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  problemSolved: string;
  description: string;
  features: string[];
  technologies: string[];
  category: 'Full Stack' | 'Frontend' | 'Algorithms / Core CS';
  githubUrl: string;
  liveDemoUrl: string;
  previewType: 'interactive' | 'visual';
  accentColor: string;
  metrics?: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  grade: string;
  currentStatus: string;
  description: string;
  coreSubjects: string[];
  keyHighlights: string[];
}

export interface JourneyStep {
  step: number;
  title: string;
  period: string;
  technologies: string[];
  description: string;
  keyMilestones: string[];
  status: 'completed' | 'in-progress' | 'mastering';
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  metric: string;
  description: string;
  badge: string;
}

export interface GitRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  updatedAt: string;
  url: string;
}
