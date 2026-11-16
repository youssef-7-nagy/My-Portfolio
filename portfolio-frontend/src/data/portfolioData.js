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
  email: 'youssefn899@gmail.com',
  phone: '01275675022',
  whatsappUrl: 'https://wa.me/201275675022',
  location: 'Cairo, Egypt',
  status: 'Available for work',
  resumeUrl: '#',
};

export const socialLinks = [
  { id: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/201275675022', icon: 'FaWhatsapp', handle: '01275675022' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/youssef-nagy7', icon: 'FaLinkedin', handle: 'linkedin.com/in/youssef-nagy7' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/youssef.nagy7', icon: 'FaInstagram', handle: 'youssef.nagy7' },
  { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/youssefnagy935@yahoo.com', icon: 'FaFacebook', handle: 'youssefnagy935@yahoo.com' },
  { id: 'github', label: 'GitHub', url: 'https://github.com/youssef-7-nagy', icon: 'FaGithub', handle: 'youssef-7-nagy' },
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
import velmoraImg from '../assets/projects/velmora_preview.png';
import maghsaltakImg from '../assets/projects/maghsaltak_preview.png';

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
    image: velmoraImg,
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
    id: 'maghsaltak',
    title: 'Maghsaltak',
    subtitle: 'Mobile Car Wash Application (Graduation Project)',
    description: 'An on-demand mobile car wash application developed as a graduation project that allows people to get their cars washed at their doorstep without having to visit a car wash station or wait in long queues.',
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    embedUrl: 'https://maghsaltak-one.vercel.app/',
    githubUrl: 'https://github.com/youssef-7-nagy',
    image: maghsaltakImg,
    domain: 'https://maghsaltak-one.vercel.app',
    status: 'Graduation Project',
    isLiveClient: true,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    category: 'fullstack',
    featured: true,
    hasLiveEmbed: true,
    accent: '#F4D35E',
    highlights: [
      'Doorstep on-demand car wash booking platform',
      'Eliminates long waiting lines at physical car wash stations',
      'Multi-role portals with real-time Socket.IO dispatching',
    ],
  },
];


