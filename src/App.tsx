import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AnimatePresence } from 'framer-motion';

const PortfolioApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const { isAdminLoggedIn } = usePortfolio();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple router based on path
  if (currentPath === '/admin/login') {
    if (isAdminLoggedIn) {
      window.location.href = '/admin/dashboard';
      return null;
    }
    return <AdminLogin />;
  }

  if (currentPath === '/admin/dashboard') {
    if (!isAdminLoggedIn) {
      window.location.href = '/admin/login';
      return null;
    }
    return <AdminDashboard />;
  }

  return (
    <div className="bg-[#07090e] min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-white font-sans relative">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ResumeSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}

export default App;
