import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiJsonwebtokens,
  SiDocker,
  SiVercel,
  SiHostinger,
  SiGithub,
  SiPostman,
  SiNpm,
  SiNodemon
} from 'react-icons/si';

import {
  FaCss3Alt,
  FaAws,
  FaGitAlt,
  FaCodeBranch,
  FaDatabase
} from 'react-icons/fa';

import {
  TbDevices,
  TbBrandVscode,
  TbApi,
  TbRoute
} from 'react-icons/tb';

import {
  ShieldCheck,
  CheckCheck,
  Layers,
  Settings2,
  Server,
  Monitor,
  Wrench,
  Rocket,
  FolderTree,
  Repeat,
  Bug,
  Sparkles,
  Code2,
  Workflow,
  GitPullRequest,
  FileCode,
  KeyRound,
  Network
} from 'lucide-react';

/* ==========================================================================
   TECHNICAL EXPERTISE - 3 CORE SPECIALIZATION CARDS
   ========================================================================== */

export const technicalExpertise = {
  frontend: {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Modern & Interactive Interfaces',
    category: 'frontend',
    icon: Monitor,
    badge: '10 Core Techs',
    skills: [
      {
        id: 'html5',
        name: 'HTML5',
        shortName: 'HTML5',
        category: 'frontend',
        icon: SiHtml5,
        color: '#E34F26',
        level: 'Semantic & SEO',
        desc: 'Accessible, semantic markup, rich metadata, and modern DOM structure.',
        projects: ['Ariadne Studio', 'Velmora Bliss']
      },
      {
        id: 'css3',
        name: 'CSS3',
        shortName: 'CSS3',
        category: 'frontend',
        icon: FaCss3Alt,
        color: '#1572B6',
        level: 'Advanced Layouts',
        desc: 'Custom properties, Flexbox, CSS Grid, 3D transforms, and keyframe animations.',
        projects: ['Portfolio', 'Ariadne Studio']
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        shortName: 'JS (ES6+)',
        category: 'frontend',
        icon: SiJavascript,
        color: '#F7DF1E',
        level: 'Asynchronous Core',
        desc: 'Closures, promises, async/await, event loop, and modular architectural patterns.',
        projects: ['All Platforms']
      },
      {
        id: 'react',
        name: 'React.js',
        shortName: 'React.js',
        category: 'frontend',
        icon: SiReact,
        color: '#61DAFB',
        level: 'Primary SPA Library',
        desc: 'Custom hooks, state management (Redux / Context), memoization, and component lifecycles.',
        projects: ['Ariadne Studio', 'Velmora Bliss', 'Maghsaltak']
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        shortName: 'Next.js',
        category: 'frontend',
        icon: SiNextdotjs,
        color: 'currentColor',
        level: 'SSR & Hybrid',
        desc: 'App router, server-side rendering, API routes, and optimized edge deployment.',
        projects: ['Production Work']
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        shortName: 'TypeScript',
        category: 'frontend',
        icon: SiTypescript,
        color: '#3178C6',
        level: 'Type Safety',
        desc: 'Strict type definitions, generics, interfaces, and compile-time defect prevention.',
        projects: ['Velmora Bliss']
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        shortName: 'Tailwind',
        category: 'frontend',
        icon: SiTailwindcss,
        color: '#06B6D4',
        level: 'Utility-First UI',
        desc: 'Atomic CSS tokens, responsive variants, dark mode configuration, and theme customization.',
        projects: ['Velmora Bliss', 'Admin Portals']
      },
      {
        id: 'bootstrap',
        name: 'Bootstrap',
        shortName: 'Bootstrap',
        category: 'frontend',
        icon: SiBootstrap,
        color: '#7952B3',
        level: 'Grid & Components',
        desc: 'Rapid layout prototyping, responsive grid systems, and accessible UI primitives.',
        projects: ['Enterprise Demos']
      },
      {
        id: 'sass',
        name: 'Sass',
        shortName: 'Sass / SCSS',
        category: 'frontend',
        icon: SiSass,
        color: '#CC6699',
        level: 'Modular Styling',
        desc: 'Variables, mixins, nesting, BEM architecture, and automated design token pipelines.',
        projects: ['Ariadne Studio']
      },
      {
        id: 'responsive',
        name: 'Responsive Design',
        shortName: 'Responsive',
        category: 'frontend',
        icon: TbDevices,
        color: '#3C6E71',
        level: 'Fluid 320px–4K',
        desc: 'Mobile-first viewport engineering, clamp() scaling, and seamless cross-device fidelity.',
        projects: ['All Client Sites']
      }
    ]
  },

  backend: {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'Powerful & Scalable APIs',
    category: 'backend',
    icon: Server,
    badge: 'Primary Specialization',
    isPrimary: true,
    skills: [
      {
        id: 'nodejs',
        name: 'Node.js',
        shortName: 'Node.js',
        category: 'backend',
        icon: SiNodedotjs,
        color: '#5FA04E',
        level: 'Core Runtime',
        desc: 'High-throughput event-driven microservices, streams, cluster workers, and asynchronous I/O.',
        projects: ['Maghsaltak Backend', 'Velmora Bliss API']
      },
      {
        id: 'express',
        name: 'Express.js',
        shortName: 'Express.js',
        category: 'backend',
        icon: SiExpress,
        color: 'currentColor',
        level: 'REST Backbone',
        desc: 'Robust middleware pipelines, centralized error handlers, and route controller layering.',
        projects: ['Maghsaltak', 'Velmora Bliss']
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        shortName: 'NestJS',
        category: 'backend',
        icon: SiNestjs,
        color: '#E0234E',
        level: 'Enterprise Architecture',
        desc: 'Dependency injection, modular providers, DTO validations, and decorators.',
        projects: ['Enterprise Architecture']
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        shortName: 'REST APIs',
        category: 'backend',
        icon: TbApi,
        color: '#3C6E71',
        level: 'Standardized Endpoints',
        desc: 'Stateless HTTP design, status codes, query pagination, filtering, and rate limiting.',
        projects: ['Maghsaltak', 'Velmora Bliss']
      },
      {
        id: 'mvc',
        name: 'MVC Architecture',
        shortName: 'MVC Pattern',
        category: 'backend',
        icon: Layers,
        color: '#F4D35E',
        level: 'Clean Separation',
        desc: 'Separation of concerns across models, business services, and request controllers.',
        projects: ['All Backend Projects']
      },
      {
        id: 'auth',
        name: 'Auth & Authorization',
        shortName: 'RBAC & Auth',
        category: 'backend',
        icon: ShieldCheck,
        color: '#10B981',
        level: 'Security & Roles',
        desc: 'Bcrypt hashing, multi-tenant RBAC (Admin/User/Worker), and secure cookie sessions.',
        projects: ['Maghsaltak Admin', 'Velmora Auth']
      },
      {
        id: 'jwt',
        name: 'JWT (Tokens)',
        shortName: 'JWT',
        category: 'backend',
        icon: SiJsonwebtokens,
        color: '#D63AFF',
        level: 'Stateless Security',
        desc: 'Access/refresh token lifecycles, cryptographically signed payloads, and revocation.',
        projects: ['Maghsaltak', 'Velmora Bliss']
      },
      {
        id: 'middleware',
        name: 'Middleware',
        shortName: 'Middleware',
        category: 'backend',
        icon: Settings2,
        color: '#64748B',
        level: 'Request Pipeline',
        desc: 'Logging (Morgan), CORS security, input sanitization, and global exception filters.',
        projects: ['All APIs']
      },
      {
        id: 'routing',
        name: 'Routing & Controllers',
        shortName: 'Controllers',
        category: 'backend',
        icon: TbRoute,
        color: '#3B82F6',
        level: 'Modular Flow',
        desc: 'Clean REST router nesting, async wrapper handlers, and isolated parameter validations.',
        projects: ['Maghsaltak API']
      },
      {
        id: 'validation',
        name: 'Data Validation',
        shortName: 'Validation',
        category: 'backend',
        icon: CheckCheck,
        color: '#06B6D4',
        level: 'Strict Sanitization',
        desc: 'Joi / Express-Validator / Zod schemas to sanitize inputs and block malicious payloads.',
        projects: ['Production APIs']
      }
    ]
  },

  databases: {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Data Management & Persistence',
    category: 'database',
    icon: FaDatabase,
    badge: '5 Core Systems',
    skills: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        shortName: 'MongoDB',
        category: 'database',
        icon: SiMongodb,
        color: '#47A248',
        level: 'NoSQL Document Store',
        desc: 'Document schema design, aggregation pipelines, replica indexing, and sharding.',
        projects: ['Maghsaltak', 'Velmora Bliss']
      },
      {
        id: 'mongoose',
        name: 'Mongoose',
        shortName: 'Mongoose',
        category: 'database',
        icon: SiMongoose,
        color: '#880000',
        level: 'ODM Modeling',
        desc: 'Strict schema casting, pre/post middleware hooks, virtuals, and population joins.',
        projects: ['Maghsaltak', 'Velmora Bliss']
      },
      {
        id: 'mysql',
        name: 'MySQL',
        shortName: 'MySQL',
        category: 'database',
        icon: SiMysql,
        color: '#4479A1',
        level: 'Relational DB',
        desc: 'Foreign key constraints, indexed joins, normalization, and ACID transaction safety.',
        projects: ['QNB Banking Project']
      },
      {
        id: 'sql',
        name: 'SQL',
        shortName: 'SQL Engine',
        category: 'database',
        icon: FaDatabase,
        color: '#00758F',
        level: 'Query Optimization',
        desc: 'Complex analytical queries, aggregations, views, and core banking data extraction.',
        projects: ['Helwan BIS & QNB Bank']
      },
      {
        id: 'db-design',
        name: 'Database Design',
        shortName: 'DB Architecture',
        category: 'database',
        icon: Network,
        color: '#F4D35E',
        level: 'ERD & Performance',
        desc: 'Entity-relationship modeling, indexing strategies, cache layering, and redundancy reduction.',
        projects: ['Maghsaltak Architecture']
      }
    ]
  }
};

/* ==========================================================================
   DEVELOPER TOOLKIT & ENGINEERING WORKFLOW - 4 CONNECTED CARDS
   ========================================================================== */

export const developerToolkit = [
  {
    id: 'devops',
    stepNumber: '01',
    title: 'DevOps & Deployment',
    subtitle: 'Containerization & Cloud Infrastructure',
    icon: SiDocker,
    accent: '#3C6E71',
    tools: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Docker Compose', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
      { name: 'Hostinger', icon: SiHostinger, color: '#673DE6' },
      { name: 'Env Variables', icon: KeyRound, color: '#F4D35E' }
    ],
    desc: 'Containerized staging environments, seamless CI builds, edge CDNs, and encrypted zero-leak secret configs.'
  },
  {
    id: 'version-control',
    stepNumber: '02',
    title: 'Version Control & Collaboration',
    subtitle: 'Branching & Code Lifecycle',
    icon: FaCodeBranch,
    accent: '#284B63',
    tools: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
      { name: 'Git Branching', icon: FaCodeBranch, color: '#3C6E71' },
      { name: 'Pull Requests', icon: GitPullRequest, color: '#A371F7' },
      { name: '.gitignore', icon: FileCode, color: '#F4D35E' }
    ],
    desc: 'Trunk-based and feature-branch workflows, comprehensive PR code reviews, semantic commits, and merge hygiene.'
  },
  {
    id: 'tools',
    stepNumber: '03',
    title: 'Development Tools',
    subtitle: 'Productivity & API Testing Suite',
    icon: Wrench,
    accent: '#F4D35E',
    tools: [
      { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
      { name: 'Antigravity', icon: Sparkles, color: '#F4D35E' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'MongoDB Compass', icon: SiMongodb, color: '#47A248' },
      { name: 'npm', icon: SiNpm, color: '#CB3837' },
      { name: 'Nodemon', icon: SiNodemon, color: '#76D04B' }
    ],
    desc: 'Accelerated development stack with automated live reloading, comprehensive API test suites, and database inspectors.'
  },
  {
    id: 'concepts',
    stepNumber: '04',
    title: 'Additional Concepts',
    subtitle: 'Engineering Principles & Best Practices',
    icon: Rocket,
    accent: '#3C6E71',
    tools: [
      { name: 'CI/CD', icon: Repeat, color: '#3C6E71' },
      { name: 'SDLC', icon: Workflow, color: '#284B63' },
      { name: 'Debugging', icon: Bug, color: '#E0234E' },
      { name: 'Clean Code', icon: Code2, color: '#10B981' },
      { name: 'Project Structure', icon: FolderTree, color: '#F4D35E' }
    ],
    desc: 'Production-ready architectural standards, structured error tracing, modular folders, and defensive coding.'
  }
];

export const toolkitBanner = {
  quote: 'Building Better. One Commit at a Time.',
  subtext: 'Obsessed with scalable architecture, measurable performance, and seamless user experiences.'
};
