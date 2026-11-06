export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const developer = {
  firstName: 'Youssef',
  lastName: 'Nagy',
  title: 'Junior MERN Stack Developer',
  tagline: 'Building modern web experiences with MongoDB, Express, React & Node.js',
  email: 'youssefnagy@example.com',
  location: 'Egypt',
  status: 'Available for work',
  resumeUrl: '#',
};

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/', icon: 'FaGithub' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/', icon: 'FaLinkedin' },
  { id: 'twitter', label: 'Twitter / X', url: 'https://x.com/', icon: 'FaTwitter' },
  { id: 'email', label: 'Email', url: 'mailto:youssefnagy@example.com', icon: 'FaEnvelope' },
];

export const services = [
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'End-to-end web applications using the MERN stack with clean code and scalable architecture.',
    icon: 'Layers',
  },
  {
    id: 'frontend',
    title: 'Frontend UI/UX',
    description: 'Pixel-perfect, responsive interfaces with React, smooth animations, and modern design patterns.',
    icon: 'Monitor',
  },
  {
    id: 'backend',
    title: 'REST API Development',
    description: 'Robust Node.js & Express APIs with authentication, validation, and database integration.',
    icon: 'Server',
  },
  {
    id: 'database',
    title: 'Database Design',
    description: 'MongoDB schema design, data modeling, aggregation pipelines, and performance optimization.',
    icon: 'Database',
  },
];

export const skills = [
  { name: 'React', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Git & GitHub', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Vite', category: 'tools' },
];

import ariadneImg from '../assets/projects/ariadne_preview.png';
import novamartImg from '../assets/projects/novamart_preview.jpg';
import taskflowImg from '../assets/projects/taskflow_preview.jpg';

export const projects = [
  {
    id: 'ariadne',
    title: 'Ariadne Studio',
    subtitle: 'Cinematic Photography & Visual Arts Platform',
    description: 'A live production web platform dedicated to luxury commercial photography, brand storytelling, and visual artistry with cinematic aesthetics and fluid galleries.',
    liveUrl: 'https://ariadneg.com',
    embedUrl: 'https://ariadneg.com/',
    githubUrl: 'https://github.com/',
    image: ariadneImg,
    domain: 'https://ariadneg.com',
    status: 'Live Production',
    isLiveClient: true,
    tags: ['React', 'Vite', 'Modern CSS', 'Responsive UI'],
    category: 'frontend',
    featured: true,
    hasLiveEmbed: true,
    accent: '#3C6E71',
    highlights: [
      'Live client site in production at ariadneg.com',
      'Fluid responsive layouts across 4K, laptop, and mobile',
      'High-performance image delivery & cinematic aesthetic',
    ],
  },
  {
    id: 'velmora-bliss',
    title: 'Velmora Bliss',
    subtitle: 'Modern E-Commerce & Lifestyle Platform',
    description: 'A modern, responsive e-commerce web platform deployed live on Vercel featuring product showcases, dynamic shopping experience, and sleek interface design.',
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    embedUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    githubUrl: 'https://github.com/',
    image: novamartImg,
    domain: 'https://velmora-bliss-9iqf.vercel.app',
    status: 'Live Production',
    isLiveClient: true,
    tags: ['React', 'E-Commerce', 'Vercel', 'Modern UI'],
    category: 'fullstack',
    featured: true,
    hasLiveEmbed: true,
    accent: '#284B63',
    highlights: [
      'Live deployment running at velmora-bliss-9iqf.vercel.app',
      'Modern product showcase & smooth interactive cart experience',
      'Fluid responsive design across desktop and mobile',
    ],
  },
  {
    id: 'taskflow',
    title: 'TaskFlow Workspace',
    subtitle: 'Productivity & Sprint Tracking App',
    description: 'Intuitive project management board with drag-and-drop tasks, team sprint collaboration, progress analytics, and responsive mobile optimization.',
    liveUrl: 'https://github.com/',
    embedUrl: null,
    githubUrl: 'https://github.com/',
    image: taskflowImg,
    domain: 'https://taskflow-app.io',
    status: 'Interactive App',
    isLiveClient: false,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    category: 'fullstack',
    featured: true,
    hasLiveEmbed: false,
    accent: '#F4D35E',
    highlights: [
      'Kanban board with dynamic status management',
      'Full CRUD operations connected to MongoDB Atlas',
      'Sprint velocity charts & glassmorphism UI',
    ],
  },
];


