import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  headline: { type: String, required: true },
  summary: { type: String, required: true },
  aboutText: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  githubUrl: { type: String },
  linkedinUrl: { type: String },
  profileImage: { type: String },
  availableForWork: { type: Boolean, default: true }
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  period: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  responsibilities: [{ type: String }],
  technologies: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  features: [{ type: String }],
  technologies: [{ type: String }],
  image: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  location: { type: String },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  period: { type: String },
  cgpa: { type: String }
}, { timestamps: true });

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' }
}, { timestamps: true });

const ResumeSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export const ProfileModel = mongoose.model('Profile', ProfileSchema);
export const ExperienceModel = mongoose.model('Experience', ExperienceSchema);
export const ProjectModel = mongoose.model('Project', ProjectSchema);
export const SkillModel = mongoose.model('Skill', SkillSchema);
export const EducationModel = mongoose.model('Education', EducationSchema);
export const MessageModel = mongoose.model('Message', MessageSchema);
export const ResumeModel = mongoose.model('Resume', ResumeSchema);
export const AdminModel = mongoose.model('Admin', AdminSchema);
