import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { initialProfile, initialExperiences, initialProjects, initialSkills, initialEducation, initialResume } from '../src/data/initialData.js';

const DATA_FILE = path.join(process.cwd(), 'data_store.json');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vinith_portfolio';

// Local storage object structure
export interface LocalStore {
  profile: any;
  experiences: any[];
  projects: any[];
  skills: any[];
  education: any[];
  messages: any[];
  resume: any;
  adminUser: { email: string; passwordHash: string };
  viewsCount: number;
}

// In-memory / file fallback store
let memoryStore: LocalStore = {
  profile: initialProfile,
  experiences: initialExperiences,
  projects: initialProjects,
  skills: initialSkills,
  education: initialEducation,
  messages: [],
  resume: initialResume,
  adminUser: {
    email: 'admin@viniths.com',
    // hash for "admin123"
    passwordHash: '$2a$10$w8.mN.jL7eGkC9W8T5Y08eQ.z8J6i9q1c2v3b4n5m6'
  },
  viewsCount: 142
};

export let isMongoConnected = false;

// Load file store if exists
if (fs.existsSync(DATA_FILE)) {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    memoryStore = { ...memoryStore, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading local data file, using default seed data');
  }
} else {
  saveLocalStore();
}

export function saveLocalStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to local data file:', err);
  }
}

export function getLocalStore(): LocalStore {
  return memoryStore;
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    isMongoConnected = true;
    console.log('MongoDB connected successfully');
  } catch (err) {
    isMongoConnected = false;
    console.log('MongoDB connection skipped/failed. Using persistent local JSON database fallback.');
  }
}
