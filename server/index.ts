import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { connectDB, getLocalStore, saveLocalStore } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'vinith_ml_engineer_secret_key_2026';

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Static files for uploaded resumes and images
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

// JWT Middleware for Protected Admin Routes
export interface AuthRequest extends Request {
  user?: any;
}

const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

// -------------------------------------------------------------
// PUBLIC REST API ENDPOINTS
// -------------------------------------------------------------

// Profile
app.get('/api/profile', (req: Request, res: Response) => {
  const store = getLocalStore();
  store.viewsCount = (store.viewsCount || 0) + 1;
  saveLocalStore();
  res.json({ success: true, data: store.profile });
});

// Experience
app.get('/api/experience', (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.experiences });
});

// Projects
app.get('/api/projects', (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.projects });
});

// Skills
app.get('/api/skills', (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.skills });
});

// Education
app.get('/api/education', (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.education });
});

// Active Resume
app.get('/api/resume', (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.resume });
});

// Submit Contact Message
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
  }

  const store = getLocalStore();
  const newMessage = {
    id: 'msg-' + Date.now(),
    name,
    email,
    subject: subject || 'Portfolio Contact Form',
    message,
    status: 'unread',
    createdAt: new Date().toISOString()
  };

  store.messages.unshift(newMessage);
  saveLocalStore();

  res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMessage });
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION
// -------------------------------------------------------------

app.post('/api/admin/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const store = getLocalStore();

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Check default admin credentials or stored hash
  const isValidEmail = email.toLowerCase() === store.adminUser.email.toLowerCase() || email === 'admin@viniths.com';
  const isDefaultPass = password === 'admin123' || password === 'vinith2026';

  if (!isValidEmail) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  let isMatch = isDefaultPass;
  if (!isDefaultPass && store.adminUser.passwordHash) {
    isMatch = await bcrypt.compare(password, store.adminUser.passwordHash);
  }

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    success: true,
    token,
    user: { email, role: 'admin' },
    message: 'Login successful'
  });
});

// -------------------------------------------------------------
// PROTECTED ADMIN ROUTES (CRUD)
// -------------------------------------------------------------

// Dashboard Stats
app.get('/api/admin/stats', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const unreadMessages = store.messages.filter((m) => m.status === 'unread').length;
  
  res.json({
    success: true,
    data: {
      totalProjects: store.projects.length,
      totalSkills: store.skills.length,
      totalExperience: store.experiences.length,
      totalMessages: store.messages.length,
      unreadMessages,
      resumeActive: !!store.resume.active,
      viewsCount: store.viewsCount || 150
    }
  });
});

// Edit Profile
app.put('/api/admin/profile', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  store.profile = { ...store.profile, ...req.body };
  saveLocalStore();
  res.json({ success: true, message: 'Profile updated successfully', data: store.profile });
});

// Experience CRUD
app.post('/api/admin/experience', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const newExp = { id: 'exp-' + Date.now(), ...req.body };
  store.experiences.push(newExp);
  saveLocalStore();
  res.status(201).json({ success: true, data: newExp });
});

app.put('/api/admin/experience/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  const index = store.experiences.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Experience not found' });

  store.experiences[index] = { ...store.experiences[index], ...req.body };
  saveLocalStore();
  res.json({ success: true, data: store.experiences[index] });
});

app.delete('/api/admin/experience/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  store.experiences = store.experiences.filter((e) => e.id !== id);
  saveLocalStore();
  res.json({ success: true, message: 'Experience deleted' });
});

// Projects CRUD
app.post('/api/admin/projects', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const newProj = { id: 'proj-' + Date.now(), published: true, order: store.projects.length + 1, ...req.body };
  store.projects.push(newProj);
  saveLocalStore();
  res.status(201).json({ success: true, data: newProj });
});

app.put('/api/admin/projects/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  const index = store.projects.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Project not found' });

  store.projects[index] = { ...store.projects[index], ...req.body };
  saveLocalStore();
  res.json({ success: true, data: store.projects[index] });
});

app.delete('/api/admin/projects/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  store.projects = store.projects.filter((p) => p.id !== id);
  saveLocalStore();
  res.json({ success: true, message: 'Project deleted' });
});

// Skills CRUD
app.post('/api/admin/skills', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const newSkill = { id: 'sk-' + Date.now(), visible: true, order: store.skills.length + 1, ...req.body };
  store.skills.push(newSkill);
  saveLocalStore();
  res.status(201).json({ success: true, data: newSkill });
});

app.put('/api/admin/skills/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  const index = store.skills.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Skill not found' });

  store.skills[index] = { ...store.skills[index], ...req.body };
  saveLocalStore();
  res.json({ success: true, data: store.skills[index] });
});

app.delete('/api/admin/skills/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  store.skills = store.skills.filter((s) => s.id !== id);
  saveLocalStore();
  res.json({ success: true, message: 'Skill deleted' });
});

// Education CRUD
app.post('/api/admin/education', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const newEdu = { id: 'edu-' + Date.now(), ...req.body };
  store.education.push(newEdu);
  saveLocalStore();
  res.status(201).json({ success: true, data: newEdu });
});

app.put('/api/admin/education/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  const index = store.education.findIndex((e) => e.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Education entry not found' });

  store.education[index] = { ...store.education[index], ...req.body };
  saveLocalStore();
  res.json({ success: true, data: store.education[index] });
});

app.delete('/api/admin/education/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  store.education = store.education.filter((e) => e.id !== id);
  saveLocalStore();
  res.json({ success: true, message: 'Education deleted' });
});

// Messages Management
app.get('/api/admin/messages', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  res.json({ success: true, data: store.messages });
});

app.put('/api/admin/messages/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  const index = store.messages.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'Message not found' });

  store.messages[index] = { ...store.messages[index], ...req.body };
  saveLocalStore();
  res.json({ success: true, data: store.messages[index] });
});

app.delete('/api/admin/messages/:id', authenticateAdmin, (req: Request, res: Response) => {
  const store = getLocalStore();
  const { id } = req.params;
  store.messages = store.messages.filter((m) => m.id !== id);
  saveLocalStore();
  res.json({ success: true, message: 'Message deleted' });
});

// File / Resume Upload Endpoint
app.post('/api/admin/upload-resume', authenticateAdmin, upload.single('resume'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  const store = getLocalStore();
  store.resume = {
    fileUrl,
    fileName: req.file.originalname,
    uploadedAt: new Date().toISOString(),
    active: true
  };
  saveLocalStore();

  res.json({
    success: true,
    message: 'Resume uploaded successfully',
    data: store.resume
  });
});

// Image Upload Endpoint
app.post('/api/admin/upload-image', authenticateAdmin, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl
  });
});

// Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
