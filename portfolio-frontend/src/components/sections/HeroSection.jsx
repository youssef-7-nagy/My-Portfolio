import { ArrowUpRight, Sparkles } from 'lucide-react';
import youssefPhoto from '../../assets/logos/youssef_photo.png';
import projectPreview from '../../assets/projects/ariadne_preview.png';
import './HeroSection.css';

/**
 * HeroSection
 * Replicates the architectural grid layout, giant background/foreground typography,
 * warm monochromatic gradient backdrop, and floating interactive cards from the reference design.
 */
export default function HeroSection() {
  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectClick = (e) => {
    e.preventDefault();
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-editorial">
      {/* 1. Architectural Dashed Grid with Delicate (+) Intersections */}
      <div className="hero-editorial__grid" aria-hidden="true">
        {/* Vertical Dashed Lines */}
        <div className="hero-grid-line hero-grid-line--v1" />
        <div className="hero-grid-line hero-grid-line--v2" />
        <div className="hero-grid-line hero-grid-line--v3" />
        <div className="hero-grid-line hero-grid-line--v4" />

        {/* Horizontal Dashed Lines */}
        <div className="hero-grid-line hero-grid-line--h1" />
        <div className="hero-grid-line hero-grid-line--h2" />

        {/* Intersection Plus (+) Indicators */}
        <span className="hero-grid-plus" style={{ left: '12%', top: '18%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '38%', top: '18%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '62%', top: '18%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '88%', top: '18%' }}>+</span>

        <span className="hero-grid-plus" style={{ left: '12%', top: '66%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '38%', top: '66%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '62%', top: '66%' }}>+</span>
        <span className="hero-grid-plus" style={{ left: '88%', top: '66%' }}>+</span>
      </div>

      {/* 2. Massive Faint Background Typography (Layer 1 - Behind Portrait) */}
      <div className="hero-editorial__bg-name" aria-hidden="true">
        YOUSSEF
      </div>

      {/* 3. Central Subject Portrait Cutout (Layer 2) */}
      <div className="hero-editorial__portrait-wrapper">
        <img
          src={youssefPhoto}
          alt="Youssef Nagy Portrait"
          className="hero-editorial__portrait-img"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 4. Foreground Content & Controls (Layer 3 - In Front of Portrait) */}
      <div className="hero-editorial__foreground">
        {/* Mid-Left Supporting Copy */}
        <div className="hero-editorial__statement">
          <p>
            I DESIGN USER-CENTERED DIGITAL EXPERIENCES THAT ARE SIMPLE SMART AND IMPACTFUL
          </p>
        </div>

        {/* Bottom-Left Year & Primary Bold Name */}
        <div className="hero-editorial__bottom-brand">
          <span className="hero-editorial__year">©2026</span>
          <h1 className="hero-editorial__fg-name">YOUSSEF</h1>
        </div>

        {/* Top-Right Floating Card: Featured Project */}
        <div
          className="hero-floating-card hero-floating-card--top"
          onClick={handleProjectClick}
          role="button"
          tabIndex={0}
          title="View Project"
        >
          <div className="hero-floating-card__thumb-box">
            <img
              src={projectPreview}
              alt="Featured Design"
              className="hero-floating-card__img"
            />
          </div>
          <div className="hero-floating-card__meta">
            <span className="hero-floating-card__tag"># ZENTIX</span>
            <span className="hero-floating-card__category">/Design</span>
          </div>
        </div>

        {/* Bottom-Right Floating Badge: Contact & Profile */}
        <div className="hero-floating-badge hero-floating-badge--bottom">
          <div className="hero-floating-badge__header">
            <span className="hero-floating-badge__label">Let&rsquo;s Talk</span>
            <Sparkles size={13} className="hero-floating-badge__sparkle" />
          </div>
          <div className="hero-floating-badge__body">
            <img
              src={youssefPhoto}
              alt="Youssef Nagy Avatar"
              className="hero-floating-badge__avatar"
            />
            <div className="hero-floating-badge__info">
              <h3 className="hero-floating-badge__name">Youssef</h3>
              <p className="hero-floating-badge__role">MERN Developer</p>
            </div>
            <a
              href="#contact"
              onClick={handleContactClick}
              className="hero-floating-badge__btn"
              aria-label="Contact Youssef Nagy"
              title="Contact Me"
            >
              <ArrowUpRight size={18} strokeWidth={2.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
