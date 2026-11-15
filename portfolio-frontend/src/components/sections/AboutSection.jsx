import { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Code2, 
  Layers, 
  Building2, 
  Sparkles
} from 'lucide-react';
import './AboutSection.css';

const statsData = [
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Academic Foundation',
    title: 'B.Com in BIS — Helwan University',
    highlight: 'GPA: 3.5 / Excellent',
    desc: 'Business Information Systems major bridging system architecture with deep business analytics.',
    accent: '#DC5F31'
  },
  {
    id: 'specialization',
    icon: Code2,
    label: 'Core Specialization',
    title: 'MERN Stack Engineering',
    highlight: 'React • Node • Express • MongoDB',
    desc: 'Production-ready full-stack architectures, Next.js, and real-time Socket.IO communication.',
    accent: '#DC5F31'
  },
  {
    id: 'practical-proof',
    icon: Layers,
    label: 'Proven Delivery',
    title: '2+ Full-Stack Platforms',
    highlight: 'RBAC • JWT • Socket.IO',
    desc: 'Engineered Maghsaltak (mobile car wash app) & Velmora Bliss with full multi-role admin panels.',
    accent: '#DC5F31'
  },
  {
    id: 'industry-training',
    icon: Building2,
    label: 'Corporate & Industry Experience',
    title: 'QNB Bank & AMIT Diploma',
    highlight: 'Oracle SQL & Node.js Diploma',
    desc: 'Extracted core banking system data for variance analysis at QNB; intensive AMIT software diploma.',
    accent: '#DC5F31'
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

        {/* 1. Interactive 4-Card Highlights Grid (Styled with 3px Accent Border & Rounded Pill Aesthetics) */}
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
                <div className="about-stat-card__icon-box">
                  <Icon size={26} />
                </div>
                <span className="about-stat-card__label">{stat.label}</span>
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
      </div>
    </section>
  );
}

