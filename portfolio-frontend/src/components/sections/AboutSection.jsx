import { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Code2, 
  Layers, 
  Building2, 
  Download, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { developer } from '../../data/portfolioData';
import './AboutSection.css';

const statsData = [
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Academic Foundation',
    title: 'B.Com in BIS — Helwan University',
    highlight: 'GPA: 3.5 / Excellent',
    desc: 'Business Information Systems major bridging system architecture with deep business analytics.',
    accent: 'var(--color-ocean-teal)'
  },
  {
    id: 'specialization',
    icon: Code2,
    label: 'Core Specialization',
    title: 'MERN Stack Engineering',
    highlight: 'React • Node • Express • MongoDB',
    desc: 'Production-ready full-stack architectures, Next.js, and real-time Socket.IO communication.',
    accent: 'var(--color-warm-yellow)'
  },
  {
    id: 'practical-proof',
    icon: Layers,
    label: 'Proven Delivery',
    title: '2+ Full-Stack Platforms',
    highlight: 'RBAC • JWT • Socket.IO',
    desc: 'Engineered Maghsaltak (mobile car wash app) & Velmora Bliss with full multi-role admin panels.',
    accent: 'var(--color-deep-steel-blue)'
  },
  {
    id: 'industry-training',
    icon: Building2,
    label: 'Corporate & Industry Experience',
    title: 'QNB Bank & AMIT Diploma',
    highlight: 'Oracle SQL & Node.js Diploma',
    desc: 'Extracted core banking system data for variance analysis at QNB; intensive AMIT software diploma.',
    accent: 'var(--color-ocean-teal)'
  }
];

const competencyGroups = [
  {
    category: 'Frontend Engineering',
    color: 'var(--color-ocean-teal)',
    skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive UI']
  },
  {
    category: 'Backend & Real-Time',
    color: 'var(--color-deep-steel-blue)',
    skills: ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'JWT Authentication', 'Socket.IO']
  },
  {
    category: 'Databases & Analytics',
    color: 'var(--color-warm-yellow)',
    skills: ['MongoDB', 'SQL', 'Oracle SQL', 'Data Modeling']
  },
  {
    category: 'Professional Strengths',
    color: 'var(--color-light-gray)',
    skills: ['System Architecture', 'Business Logic', 'Team Leadership', 'Problem Solving', 'Scouts Leadership']
  }
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`section about-section ${inView ? 'is-visible' : ''}`}
    >
      <div className="container about-container">
        {/* Section Header */}
        <div className="about-header">
          <div className="hero-badge animate-fade-in-up" style={{ alignSelf: 'center', marginBottom: '12px' }}>
            <span className="hero-badge__dot" />
            Engineering & Analytical Mindset
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Bridging full-stack MERN software engineering with analytical business intelligence and scalable architecture.
          </p>
        </div>

        {/* 1. Interactive 4-Card Bento Stats / Highlights Grid */}
        <div className="about-stats-grid">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="about-stat-card"
                style={{ 
                  '--card-accent': stat.accent,
                  animationDelay: `${0.1 + idx * 0.08}s` 
                }}
              >
                <div className="about-stat-card__header">
                  <div className="about-stat-card__icon-box">
                    <Icon size={20} />
                  </div>
                  <span className="about-stat-card__label">{stat.label}</span>
                </div>
                <h3 className="about-stat-card__title">{stat.title}</h3>
                <div className="about-stat-card__highlight">
                  <Sparkles size={13} className="about-stat-sparkle" />
                  <span>{stat.highlight}</span>
                </div>
                <p className="about-stat-card__desc">{stat.desc}</p>
                <div className="about-stat-card__glow" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* 2. Main Narrative & Skills Two-Column Bento Layout */}
        <div className="about-main-grid">
          {/* Left Column: Narrative Professional Bio */}
          <div className="about-bio-card">
            <div className="about-card-badge">
              <span className="badge-bullet" />
              My Journey & Perspective
            </div>

            <div className="about-bio-paragraphs">
              <p className="about-bio-p about-bio-p--lead">
                I am a <strong>Junior Full Stack (MERN) Developer</strong> driven by a passion for creating reliable, high-performance web applications. My foundation is built upon a <strong>Bachelor of Commerce in Business Information Systems (BIS)</strong> from Helwan University, where I graduated with an <strong>Excellent 3.5 GPA</strong>. This distinct blend of business acumen and computer information systems equips me with a unique edge: I don&apos;t just write code; I thoroughly understand <em>business logic</em>, <em>system architecture</em>, and the seamless user journeys that drive real value.
              </p>

              <p className="about-bio-p">
                To reinforce my engineering craft, I completed an intensive <strong>Full Stack Node.js Diploma at AMIT</strong> and developed end-to-end production platforms. Among my notable projects is <strong>&quot;Maghsaltak&quot;</strong>, a multi-role car wash web platform featuring Client, Service Provider, and Admin portals powered by real-time Socket.IO event updates, appointment scheduling, and secure JWT authentication. Furthermore, during my <strong>Data Analytics & Business Planning internship at QNB Bank</strong>, I utilized <strong>Oracle SQL</strong> to extract and analyze core banking variance data across deposits and financial products, cementing my data-driven mindset.
              </p>

              <p className="about-bio-p">
                Outside of software engineering, I have been an active member of the worldwide Scout movement (<strong>Scouts & Guides Wadi El Nil</strong>) since 2016. Years of scouting have forged my teamwork, discipline, time management, and empathetic leadership skills. I am dedicated to clean code, modular architecture, and continuous growth, eager to contribute as an impactful Full Stack Developer on ambitious products.
              </p>
            </div>

            {/* Quick Resume & Contact Action CTA */}
            <div className="about-bio-actions">
              <a 
                href={developer.resumeUrl && developer.resumeUrl !== '#' ? developer.resumeUrl : 'mailto:youssefn899@gmail.com?subject=Resume%20Request%20-%20Youssef%20Nagy'} 
                className="about-btn about-btn--primary"
                target="_blank"
                rel="noreferrer"
                download
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <a 
                href="#contact" 
                onClick={handleContactClick} 
                className="about-btn about-btn--outline"
              >
                <Mail size={16} />
                <span>Get In Touch</span>
                <ArrowRight size={14} className="about-btn-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: Categorized Competencies & Core Technical Stack */}
          <div className="about-skills-card">
            <div className="about-card-badge">
              <span className="badge-bullet badge-bullet--yellow" />
              Verified Competencies
            </div>

            <h3 className="about-skills-heading">
              Technical Stack & Engineering Disciplines
            </h3>
            <p className="about-skills-sub">
              Organized by layer of architecture, certified through practical production platforms and academic excellence.
            </p>

            <div className="about-competency-groups">
              {competencyGroups.map((group) => (
                <div key={group.category} className="competency-group">
                  <div className="competency-group__header">
                    <span 
                      className="competency-group__indicator" 
                      style={{ background: group.color }} 
                    />
                    <h4 className="competency-group__title">{group.category}</h4>
                  </div>
                  <div className="competency-badges-row">
                    {group.skills.map((skill) => (
                      <span key={skill} className="competency-pill">
                        <CheckCircle2 size={12} className="competency-check" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Language Proficiency Bar */}
            <div className="about-languages-card">
              <span className="about-languages-title">Language Fluency</span>
              <div className="about-languages-tags">
                <span className="lang-tag">
                  <strong>Arabic:</strong> Native (C2)
                </span>
                <span className="lang-tag">
                  <strong>English:</strong> Professional (B2, AUC Certified)
                </span>
                <span className="lang-tag">
                  <strong>French:</strong> Elementary (A2)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
