export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  summary: string;
  aboutText: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  heroImage?: string;
  availableForWork: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  category: string;
  published: boolean;
  order: number;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Libraries & Frameworks' | 'Data Science' | 'Tools';
  icon?: string;
  order: number;
  visible: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  period: string;
  cgpa: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface ResumeData {
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
  active: boolean;
}

export interface AdminStats {
  totalProjects: number;
  totalSkills: number;
  totalExperience: number;
  totalMessages: number;
  unreadMessages: number;
  resumeActive: boolean;
  viewsCount: number;
}
