import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  ProfileData,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  EducationItem,
  ContactMessage,
  ResumeData,
  AdminStats
} from '../types';
import {
  initialProfile,
  initialExperiences,
  initialProjects,
  initialSkills,
  initialEducation,
  initialResume
} from '../data/initialData';

interface PortfolioContextType {
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  education: EducationItem[];
  resume: ResumeData;
  messages: ContactMessage[];
  stats: AdminStats | null;
  adminToken: string | null;
  isAdminLoggedIn: boolean;
  theme: 'dark' | 'cyber';
  setTheme: (t: 'dark' | 'cyber') => void;
  
  // Auth
  loginAdmin: (token: string) => void;
  logoutAdmin: () => void;

  // Actions
  updateProfile: (p: Partial<ProfileData>) => Promise<boolean>;
  addExperience: (e: Omit<ExperienceItem, 'id'>) => Promise<boolean>;
  updateExperience: (id: string, e: Partial<ExperienceItem>) => Promise<boolean>;
  deleteExperience: (id: string) => Promise<boolean>;
  
  addProject: (p: Omit<ProjectItem, 'id'>) => Promise<boolean>;
  updateProject: (id: string, p: Partial<ProjectItem>) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  
  addSkill: (s: Omit<SkillItem, 'id'>) => Promise<boolean>;
  updateSkill: (id: string, s: Partial<SkillItem>) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
  
  addEducation: (ed: Omit<EducationItem, 'id'>) => Promise<boolean>;
  updateEducation: (id: string, ed: Partial<EducationItem>) => Promise<boolean>;
  deleteEducation: (id: string) => Promise<boolean>;

  updateResume: (file: File) => Promise<boolean>;
  sendContactMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; message: string }>;
  markMessageStatus: (id: string, status: 'read' | 'unread') => Promise<boolean>;
  deleteMessage: (id: string) => Promise<boolean>;
  refreshAdminStats: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [education, setEducation] = useState<EducationItem[]>(initialEducation);
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<AdminStats | null>({
    totalProjects: initialProjects.length,
    totalSkills: initialSkills.length,
    totalExperience: initialExperiences.length,
    totalMessages: 0,
    unreadMessages: 0,
    resumeActive: true,
    viewsCount: 142
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('admin_jwt_token'));
  const [theme, setTheme] = useState<'dark' | 'cyber'>('dark');

  const isAdminLoggedIn = !!adminToken;

  const loginAdmin = (token: string) => {
    localStorage.setItem('admin_jwt_token', token);
    setAdminToken(token);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('admin_jwt_token');
    setAdminToken(null);
  };

  // Fetch initial public data
  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const resProf = await fetch('/api/profile').then(r => r.json()).catch(() => null);
        if (resProf?.success && resProf.data) setProfile(resProf.data);

        const resExp = await fetch('/api/experience').then(r => r.json()).catch(() => null);
        if (resExp?.success && resExp.data) setExperiences(resExp.data);

        const resProj = await fetch('/api/projects').then(r => r.json()).catch(() => null);
        if (resProj?.success && resProj.data) setProjects(resProj.data);

        const resSkill = await fetch('/api/skills').then(r => r.json()).catch(() => null);
        if (resSkill?.success && resSkill.data) setSkills(resSkill.data);

        const resEdu = await fetch('/api/education').then(r => r.json()).catch(() => null);
        if (resEdu?.success && resEdu.data) setEducation(resEdu.data);

        const resRes = await fetch('/api/resume').then(r => r.json()).catch(() => null);
        if (resRes?.success && resRes.data) setResume(resRes.data);
      } catch (err) {
        console.log('Using default client state:', err);
      }
    };
    fetchPublicData();
  }, []);

  // Fetch Admin Stats & Messages if logged in
  const refreshAdminStats = async () => {
    if (!adminToken) return;
    try {
      const resStats = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${adminToken}` }
      }).then(r => r.json());

      if (resStats?.success) {
        setStats(resStats.data);
      }

      const resMsgs = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${adminToken}` }
      }).then(r => r.json());

      if (resMsgs?.success) {
        setMessages(resMsgs.data);
      }
    } catch (err) {
      console.error('Error fetching admin stats', err);
    }
  };

  useEffect(() => {
    if (adminToken) {
      refreshAdminStats();
    }
  }, [adminToken]);

  // Actions
  const updateProfile = async (p: Partial<ProfileData>) => {
    const updated = { ...profile, ...p };
    setProfile(updated);
    if (adminToken) {
      try {
        await fetch('/api/admin/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`
          },
          body: JSON.stringify(p)
        });
      } catch (err) {
        console.error(err);
      }
    }
    return true;
  };

  const addExperience = async (e: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = { ...e, id: 'exp-' + Date.now() };
    setExperiences(prev => [newExp, ...prev]);
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(e)
        }).then(r => r.json());
        if (res?.success && res.data) {
          setExperiences(prev => prev.map(item => item.id === newExp.id ? res.data : item));
        }
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const updateExperience = async (id: string, e: Partial<ExperienceItem>) => {
    setExperiences(prev => prev.map(item => item.id === id ? { ...item, ...e } : item));
    if (adminToken) {
      try {
        await fetch(`/api/admin/experience/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(e)
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const deleteExperience = async (id: string) => {
    setExperiences(prev => prev.filter(item => item.id !== id));
    if (adminToken) {
      try {
        await fetch(`/api/admin/experience/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const addProject = async (p: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = { ...p, id: 'proj-' + Date.now() };
    setProjects(prev => [newProj, ...prev]);
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(p)
        }).then(r => r.json());
        if (res?.success && res.data) {
          setProjects(prev => prev.map(item => item.id === newProj.id ? res.data : item));
        }
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const updateProject = async (id: string, p: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(item => item.id === id ? { ...item, ...p } : item));
    if (adminToken) {
      try {
        await fetch(`/api/admin/projects/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(p)
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(item => item.id !== id));
    if (adminToken) {
      try {
        await fetch(`/api/admin/projects/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const addSkill = async (s: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = { ...s, id: 'sk-' + Date.now() };
    setSkills(prev => [...prev, newSkill]);
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(s)
        }).then(r => r.json());
        if (res?.success && res.data) {
          setSkills(prev => prev.map(item => item.id === newSkill.id ? res.data : item));
        }
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const updateSkill = async (id: string, s: Partial<SkillItem>) => {
    setSkills(prev => prev.map(item => item.id === id ? { ...item, ...s } : item));
    if (adminToken) {
      try {
        await fetch(`/api/admin/skills/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(s)
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const deleteSkill = async (id: string) => {
    setSkills(prev => prev.filter(item => item.id !== id));
    if (adminToken) {
      try {
        await fetch(`/api/admin/skills/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const addEducation = async (ed: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = { ...ed, id: 'edu-' + Date.now() };
    setEducation(prev => [...prev, newEdu]);
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(ed)
        }).then(r => r.json());
        if (res?.success && res.data) {
          setEducation(prev => prev.map(item => item.id === newEdu.id ? res.data : item));
        }
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const updateEducation = async (id: string, ed: Partial<EducationItem>) => {
    setEducation(prev => prev.map(item => item.id === id ? { ...item, ...ed } : item));
    if (adminToken) {
      try {
        await fetch(`/api/admin/education/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify(ed)
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const deleteEducation = async (id: string) => {
    setEducation(prev => prev.filter(item => item.id !== id));
    if (adminToken) {
      try {
        await fetch(`/api/admin/education/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const updateResume = async (file: File) => {
    if (!adminToken) return false;
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await fetch('/api/admin/upload-resume', {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: formData
      }).then(r => r.json());
      if (res?.success && res.data) {
        setResume(res.data);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const sendContactMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      }).then(r => r.json());

      if (res?.success) {
        if (res.data) setMessages(prev => [res.data, ...prev]);
        return { success: true, message: 'Message sent successfully! Vinith will get back to you soon.' };
      }
      return { success: false, message: res?.message || 'Failed to send message' };
    } catch (err) {
      const clientMsg: ContactMessage = {
        id: 'msg-' + Date.now(),
        ...msg,
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [clientMsg, ...prev]);
      return { success: true, message: 'Message submitted successfully!' };
    }
  };

  const markMessageStatus = async (id: string, status: 'read' | 'unread') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (adminToken) {
      try {
        await fetch(`/api/admin/messages/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
          body: JSON.stringify({ status })
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  const deleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (adminToken) {
      try {
        await fetch(`/api/admin/messages/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (err) { console.error(err); }
    }
    return true;
  };

  return (
    <PortfolioContext.Provider value={{
      profile,
      experiences,
      projects,
      skills,
      education,
      resume,
      messages,
      stats,
      adminToken,
      isAdminLoggedIn,
      theme,
      setTheme,
      loginAdmin,
      logoutAdmin,
      updateProfile,
      addExperience,
      updateExperience,
      deleteExperience,
      addProject,
      updateProject,
      deleteProject,
      addSkill,
      updateSkill,
      deleteSkill,
      addEducation,
      updateEducation,
      deleteEducation,
      updateResume,
      sendContactMessage,
      markMessageStatus,
      deleteMessage,
      refreshAdminStats
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
