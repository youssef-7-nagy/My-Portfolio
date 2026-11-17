import { ArrowUpRight, Sparkles } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiExpress } from 'react-icons/si';
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
        <span className="hero-grid-plus hero-grid-plus--v1-h1">+</span>
        <span className="hero-grid-plus hero-grid-plus--v2-h1">+</span>
        <span className="hero-grid-plus hero-grid-plus--v3-h1">+</span>
        <span className="hero-grid-plus hero-grid-plus--v4-h1">+</span>

        <span className="hero-grid-plus hero-grid-plus--v1-h2">+</span>
        <span className="hero-grid-plus hero-grid-plus--v2-h2">+</span>
        <span className="hero-grid-plus hero-grid-plus--v3-h2">+</span>
        <span className="hero-grid-plus hero-grid-plus--v4-h2">+</span>
      </div>

      {/* =======================================================
          A. DESKTOP COMPOSITION (min-width: 769px)
          Preserved with full original layout, statement & widgets
          ======================================================= */}
      <div className="hero-desktop-composition">
        {/* Massive Faint Background Typography (Behind Portrait) */}
        <div className="hero-editorial__bg-name" aria-hidden="true">
          YOUSSEF
        </div>

        {/* Central Subject Portrait Cutout */}
        <div className="hero-editorial__portrait-wrapper">
          <img
            src={youssefPhoto}
            alt="Youssef Nagy Portrait"
            className="hero-editorial__portrait-img"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Foreground Content & Controls */}
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
      </div>

      {/* =======================================================
          B. MOBILE & SMALL TABLET VIEWPORTS (max-width: 768px)
          Clean, balanced poster-style layout inspired by reference
          ======================================================= */}
      <div className="hero-mobile-composition">
        {/* Top Tagline */}
        <div className="hero-mobile-tagline">
          <span>FRONTEND DEVELOPER</span>
          <span className="hero-mobile-tagline__dot">•</span>
          <span>MERN STACK</span>
          <span className="hero-mobile-tagline__dot">•</span>
          <span>PROBLEM SOLVER</span>
        </div>

        {/* Visual Anchor Stage */}
        <div className="hero-mobile-anchor">
          {/* Head-Level Side Words Flanking the Head */}
          <div className="hero-mobile-flank" aria-hidden="true">
            <span className="hero-mobile-word hero-mobile-word--left">HEY,</span>
            <span className="hero-mobile-word hero-mobile-word--right">I&rsquo;M</span>
          </div>

          {/* Central Portrait Cutout Anchor */}
          <div className="hero-mobile-portrait-wrapper">
            <img
              src={youssefPhoto}
              alt="Youssef Nagy Portrait"
              className="hero-mobile-portrait-img"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Large Bold Name Across Chest */}
          <h1 className="hero-mobile-name">YOUSSEF</h1>

          {/* Tech Stack Bar Directly Underneath Name */}
          <div className="hero-mobile-tech-bar" aria-label="Core Technologies">
            <div className="tech-badge tech-badge--react" title="React">
              <FaReact />
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--node" title="Node.js">
              <FaNodeJs />
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--express" title="Express.js">
              <SiExpress />
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--ts" title="TypeScript">
              <span>TS</span>
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--js" title="JavaScript">
              <span>JS</span>
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--html" title="HTML5">
              <span>5</span>
            </div>
            <span className="tech-divider" aria-hidden="true" />

            <div className="tech-badge tech-badge--css" title="CSS3">
              <span>3</span>
            </div>
          </div>

          {/* Action CTA Button */}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="hero-mobile-cta"
            title="Let's Connect"
          >
            <span>LET&rsquo;S CONNECT</span>
            <span className="hero-mobile-cta__arrow">→</span>
          </a>

          {/* Social Profile Badge Link */}
          <a
            href="https://linkedin.com/in/youssef-nagy7"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-mobile-social"
            title="View LinkedIn Profile"
          >
            <span className="hero-mobile-social__icon">in</span>
            <span className="hero-mobile-social__handle">Youssef Nagy</span>
          </a>
        </div>
      </div>
    </section>
  );
}

