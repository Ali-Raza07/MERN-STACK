const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();
 
const TeamMember = require('./models/TeamMember');
const Slide      = require('./models/Slide');
const Admin      = require('./models/Admin');
 
const teamData = [
  {
    name: 'Ahmed Raza', 
    role: 'Developer', 
    order: 1,
    bio: 'Full-stack MERN developer with 4 years of experience building scalable web applications.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  },
  {
    name: 'Sara Khan', 
    role: 'Designer', 
    order: 2,
    bio: 'UI/UX designer crafting pixel-perfect interfaces. Figma expert with a passion for motion design.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  },
  {
    name: 'Ali Hassan', 
    role: 'Developer', 
    order: 3,
    bio: 'Backend Node.js engineer focused on REST APIs, microservices, and database optimization.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  },
  {
    name: 'Fatima Malik', 
    role: 'Manager', 
    order: 4,
    bio: 'Product manager with a background in agile methodologies and cross-functional team leadership.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  },
  {
    name: 'Bilal Akhtar', 
    role: 'DevOps', 
    order: 5,
    bio: 'AWS certified cloud engineer. Docker & Kubernetes expert, CI/CD pipeline builder.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  },
  {
    name: 'Zainab Mir', 
    role: 'Designer', 
    order: 6,
    bio: 'Brand designer and illustrator creating design systems that scale beautifully across all platforms.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    linkedin: 'https://linkedin.com', 
    github: 'https://github.com'
  }
];
 
const slideData = [
  {
    tag: 'MERN Stack', 
    title: 'E-Commerce Platform',
    order: 1,
    desc: 'Full-stack shopping platform with real-time inventory, payment gateway, and admin dashboard.',
    cta: 'View Project',
    color: '#c8f55a',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80'
  },
  {
    tag: 'AI Integration', 
    title: 'AI Analytics Dashboard', 
    order: 2,
    desc: 'Machine learning-powered business intelligence tool with live data visualization.',
    cta: 'See Demo', 
    color: '#7c6ff7',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80'
  },
  {
    tag: 'Mobile App',
    title: 'Social Connect App',
    order: 3,
    desc: 'Cross-platform React Native app with real-time messaging, stories, and media sharing.',
    cta: 'Learn More',
    color: '#ff6b35',
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80'
  },
  {
    tag: 'SaaS Product',
    title: 'Project Management Tool',
    order: 4,
    desc: 'Kanban-based team collaboration platform with real-time updates via WebSockets.',
    cta: 'View Project', 
    color: '#c8f55a',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&q=80'
  }
];
 
const adminData = {
  username: 'admin',
  email: 'admin@devportfolio.com',
  password: 'admin123'
};
 
async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devportfolio');
  console.log('✅ Connected to MongoDB');
 
  await TeamMember.deleteMany({});
  await Slide.deleteMany({});
  await Admin.deleteMany({});
 
  const team   = await TeamMember.insertMany(teamData);
  const slides = await Slide.insertMany(slideData);
  const admin  = await Admin.create(adminData);
 
  console.log(`✅ Seeded ${team.length} team members`);
  console.log(`✅ Seeded ${slides.length} slides`);
  console.log(`✅ Admin created → email: ${admin.email} | password: admin123`);
  console.log('\n🎉 Database ready!');
  process.exit(0);
}
 
seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
