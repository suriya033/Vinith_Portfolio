import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  UserCheck,
  Briefcase,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  MessageSquare,
  Share2,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Eye,
  Check,
  Search,
  Upload,
  BarChart2,
  Sparkles,
  Save
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    profile,
    experiences,
    projects,
    skills,
    education,
    resume,
    messages,
    stats,
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
    markMessageStatus,
    deleteMessage
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'profile' | 'experience' | 'projects' | 'skills' | 'education' | 'resume' | 'messages' | 'socials'
  >('dashboard');

  const [profileForm, setProfileForm] = useState(profile);
  const [profileSaved, setProfileSaved] = useState(false);

  // Forms modal states
  const [editingExp, setEditingExp] = useState<any>(null);
  const [editingProj, setEditingProj] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [editingEdu, setEditingEdu] = useState<any>(null);

  // New item triggers
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingProj, setIsAddingProj] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);

  // Message search
  const [messageSearch, setMessageSearch] = useState('');

  // Save profile handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  // Resume upload state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;
    setResumeUploading(true);
    await updateResume(resumeFile);
    setResumeUploading(false);
    setResumeFile(null);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile Management', icon: UserCheck },
    { id: 'experience', label: 'Experience Timeline', icon: Briefcase },
    { id: 'projects', label: 'Projects Manager', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Tools', icon: Cpu },
    { id: 'education', label: 'Education Data', icon: GraduationCap },
    { id: 'resume', label: 'Resume Upload', icon: FileText },
    { id: 'messages', label: 'Contact Messages', icon: MessageSquare, badge: messages.filter(m => m.status === 'unread').length },
    { id: 'socials', label: 'Social Networks', icon: Share2 }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0d17] border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-white font-heading">ML PORTFOLIO ADMIN</h1>
              <p className="text-[10px] font-mono text-cyan-400">VINITH S DASHBOARD</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-2 mt-6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/20 transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Website</span>
            <ExternalLink className="w-3 h-3 ml-auto" />
          </a>

          <button
            onClick={() => { logoutAdmin(); window.location.href = '/admin/login'; }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">System Dashboard</h2>
                <p className="text-xs text-slate-400 font-mono">Overview of portfolio stats and message activity</p>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Live Portfolio Preview</span>
              </a>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Total Projects</div>
                <div className="text-3xl font-extrabold text-white font-heading mt-2">{projects.length}</div>
                <div className="text-[11px] text-cyan-400 mt-1 font-mono">3 Machine Learning Apps</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Total Skills</div>
                <div className="text-3xl font-extrabold text-white font-heading mt-2">{skills.length}</div>
                <div className="text-[11px] text-cyan-400 mt-1 font-mono">Categorized & Active</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Experience Entries</div>
                <div className="text-3xl font-extrabold text-white font-heading mt-2">{experiences.length}</div>
                <div className="text-[11px] text-cyan-400 mt-1 font-mono">Gradtwin & DLK Software</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase">Contact Messages</div>
                <div className="text-3xl font-extrabold text-white font-heading mt-2">{messages.length}</div>
                <div className="text-[11px] text-purple-400 mt-1 font-mono">
                  {messages.filter(m => m.status === 'unread').length} Unread
                </div>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4">Recent Contact Messages</h3>
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 3).map((m) => (
                    <div key={m.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm text-slate-200">{m.name} ({m.email})</div>
                        <div className="text-xs text-cyan-300 font-mono mt-0.5">{m.subject}</div>
                        <div className="text-xs text-slate-400 line-clamp-1 mt-1">"{m.message}"</div>
                      </div>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-white font-heading">Profile & Hero Content</h2>
            <p className="text-xs text-slate-400 font-mono">Manage main homepage details & biography</p>

            <form onSubmit={handleSaveProfile} className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">NAME</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">JOB TITLE</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">HEADLINE</label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">HERO SUPPORTING SUMMARY</label>
                <textarea
                  value={profileForm.summary}
                  onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">ABOUT SECTION TEXT</label>
                <textarea
                  value={profileForm.aboutText}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutText: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">PHONE</label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
                {profileSaved && <span className="text-xs text-green-400 font-mono">Profile saved successfully!</span>}
              </div>
            </form>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">Experience Management</h2>
                <p className="text-xs text-slate-400 font-mono">Add & edit internships (Gradtwin & DLK Software)</p>
              </div>
              <button
                onClick={() => {
                  setEditingExp({
                    company: '',
                    position: '',
                    period: '',
                    responsibilities: [''],
                    technologies: ['Python', 'Scikit-learn']
                  });
                  setIsAddingExp(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white">{exp.position} @ <span className="text-cyan-400">{exp.company}</span></h3>
                    <div className="text-xs font-mono text-slate-400">{exp.period}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingExp(exp); setIsAddingExp(false); }}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">Project Management</h2>
                <p className="text-xs text-slate-400 font-mono">Manage project portfolio cards & visual concepts</p>
              </div>
              <button
                onClick={() => {
                  setEditingProj({
                    title: '',
                    description: '',
                    category: 'Machine Learning',
                    features: ['Data preprocessing', 'Model training'],
                    technologies: ['Python', 'Scikit-learn'],
                    githubUrl: ''
                  });
                  setIsAddingProj(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((proj) => (
                <div key={proj.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold">
                      {proj.category}
                    </span>
                    <h3 className="font-bold text-lg text-white mt-2">{proj.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">"{proj.description}"</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-400">Published: Yes</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingProj(proj); setIsAddingProj(false); }}
                        className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">Skills Management</h2>
                <p className="text-xs text-slate-400 font-mono">Organized categories (Programming, Libraries, Data Science, Tools)</p>
              </div>
              <button
                onClick={() => {
                  setEditingSkill({ name: '', category: 'Programming', visible: true });
                  setIsAddingSkill(true);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((s) => (
                <div key={s.id} className="glass-panel p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-white">{s.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{s.category}</div>
                  </div>
                  <button
                    onClick={() => deleteSkill(s.id)}
                    className="p-1.5 rounded bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">Education Data</h2>
                <p className="text-xs text-slate-400 font-mono">M.I.E.T Engineering College (Trichy, B.Tech AI & DS, CGPA 8.0)</p>
              </div>
            </div>

            {education.map((edu) => (
              <div key={edu.id} className="glass-panel p-6 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                <p className="text-sm text-cyan-400 font-semibold mt-1">{edu.degree} in {edu.field}</p>
                <div className="text-xs text-slate-400 font-mono mt-2">{edu.location} · {edu.period} · CGPA: {edu.cgpa}</div>
              </div>
            ))}
          </div>
        )}

        {/* RESUME TAB */}
        {activeTab === 'resume' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white font-heading">Resume PDF Upload</h2>
            <p className="text-xs text-slate-400 font-mono">Replace active portfolio resume without modifying source code</p>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs text-slate-300 font-mono">
                Active Resume PDF: <span className="text-cyan-400 font-bold">{resume.fileName}</span>
              </div>

              <form onSubmit={handleResumeSubmit} className="space-y-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800"
                />

                <button
                  type="submit"
                  disabled={!resumeFile || resumeUploading}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{resumeUploading ? 'Uploading...' : 'Upload & Set Active Resume'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">Contact Messages</h2>
                <p className="text-xs text-slate-400 font-mono">Submitted through public contact form</p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel p-8 text-center text-slate-500 text-xs">No contact messages received yet.</div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-white">{msg.name}</span>
                        <span className="text-[10px] font-mono text-slate-500">{new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-cyan-400 font-mono mt-0.5">{msg.email}</div>
                      <div className="text-xs font-bold text-purple-300 mt-2">Subject: {msg.subject}</div>
                      <p className="text-sm text-slate-300 mt-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                        "{msg.message}"
                      </p>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SOCIALS TAB */}
        {activeTab === 'socials' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-white font-heading">Social Links</h2>
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">GITHUB URL</label>
                <input
                  type="text"
                  value={profileForm.githubUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">LINKEDIN URL</label>
                <input
                  type="text"
                  value={profileForm.linkedinUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Social Links
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
