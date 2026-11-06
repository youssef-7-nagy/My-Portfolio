import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/portfolioData';
import { ExternalLink, Lock, RotateCw, X, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

/**
 * MacBookDisplay
 * Renders the 3D scaled MacBook mockup with live embedded website or screenshot
 * and ambient color halo glow.
 */
function MacBookDisplay({ project, index, onOpenModal }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const stageRef = useRef(null);
  const [dynamicScale, setDynamicScale] = useState(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measureAndScale = (entries) => {
      const entry = entries ? entries[0] : null;
      const width = entry ? entry.contentRect.width : el.offsetWidth;
      if (width > 40) {
        // Fits the 620px hardware base within container width; scale up to 0.98 on wide screens
        const calculatedScale = Math.min(0.98, Math.max(0.42, (width - 12) / 620));
        const rounded = Math.round(calculatedScale * 100) / 100;
        setDynamicScale((prev) => (prev !== rounded ? rounded : prev));
      }
    };

    measureAndScale();

    const observer = new ResizeObserver(measureAndScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasEmbed = Boolean(project.hasLiveEmbed && project.embedUrl);

  return (
    <div
      className="project-laptop-wrapper"
      style={{
        '--project-accent': project.accent || 'var(--color-ocean-teal)',
        ...(dynamicScale ? { '--laptop-scale': dynamicScale } : {})
      }}
    >
      {/* Ambient Radial Color Glow behind the MacBook */}
      <div className="laptop-ambient-glow" aria-hidden="true" />

      {/* 3D Scaled Laptop Stage */}
      <div ref={stageRef} className="laptop-stage">
        <div className="laptop-scaler">
          <div className="laptop">
            {/* 3D Rotating Screen Lid (Open by default) */}
            <div className="screen">
              {/* Active Screen Viewport */}
              <div className="macbook-screen-viewport">
                <div
                  className="macbook-screen-frame"
                  onClick={() => hasEmbed && onOpenModal(project)}
                  style={{ cursor: hasEmbed ? 'pointer' : 'default' }}
                  title={hasEmbed ? 'Click to open interactive preview' : project.title}
                >
                  {/* High-res project screenshot rendered as underlying base layer */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="macbook-preview-fallback"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Live Injected Iframe */}
                  {hasEmbed && (
                    <iframe
                      src={project.embedUrl}
                      title={`${project.title} Live Preview`}
                      className={`macbook-live-iframe ${iframeLoaded ? 'macbook-live-iframe--loaded' : 'macbook-live-iframe--loading'}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoad={() => setIframeLoaded(true)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  )}
                </div>

                {/* Realistic Anti-Reflective Glass Glare */}
                <div className="macbook-screen-glare" />
              </div>
            </div>

            {/* Aluminum Keyboard Base Chassis */}
            <div className="keyboard" />
          </div>
        </div>
      </div>

      {/* Desk Ambient Reflection & Shadow */}
      <div className="laptop-desk-shadow" />
    </div>
  );
}

/**
 * ProjectDetailsCard
 * Renders the prominent number, bold title, readable description,
 * customized tech stack pills, and action button row with staggered delays.
 */
function ProjectDetailsCard({ project, index, onOpenModal }) {
  const numStr = `0${index + 1}`;

  return (
    <div className="project-details-card">
      {/* 1. Prominent Project Index Number */}
      <div className="project-number-row">
        <span className="project-number-ghost">{numStr}</span>
        <span className="project-number-badge">PROJECT {numStr}</span>
        {project.status && (
          <span className="project-status-pill">{project.status}</span>
        )}
      </div>

      {/* 2. Bold High-Contrast Title & Subtitle */}
      <h3 className="project-title-large">{project.title}</h3>
      <p className="project-subtitle-lead">{project.subtitle}</p>

      {/* 3. Highly Readable Long Description */}
      <p className="project-description-text">{project.description}</p>

      {/* 4. Tech Stack Badges with pure White background & Light Gray border */}
      <div className="project-tech-badges">
        {project.tags.map((tag) => (
          <span key={tag} className="tech-badge-item">
            {tag}
          </span>
        ))}
      </div>

      {/* 5. Bottom Action Buttons Row */}
      <div className="project-actions-row">
        {project.hasLiveEmbed ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn project-action-btn--primary"
          >
            <ExternalLink size={14} />
            <span>Live Website</span>
          </a>
        ) : (
          <a
            href={project.liveUrl !== '#' ? project.liveUrl : project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn project-action-btn--primary"
          >
            <ExternalLink size={14} />
            <span>Explore Demo</span>
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-btn"
            title="View Source Code on GitHub"
          >
            <FaGithub size={15} />
            <span>GitHub</span>
          </a>
        )}

        {project.hasLiveEmbed && (
          <button
            type="button"
            className="project-action-btn project-action-btn--expand"
            onClick={() => onOpenModal(project)}
            title="Open Fullscreen Interactive Viewer"
          >
            <Maximize2 size={14} />
            <span>Expand</span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * AlternatingProjectRow
 * Represents a single stacked full-width project row in the zig-zag layout.
 * Even rows (index 0, 2...): Details on Left, MacBook on Right.
 * Odd rows (index 1, 3...): MacBook on Left, Details on Right.
 */
function AlternatingProjectRow({ project, index, onOpenModal }) {
  const rowRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Trigger GPU-accelerated scroll-entry animation as each individual row scrolls into view
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Zig-zag assignment: index 0 (even) => laptop right / text left
  // index 1 (odd) => laptop left / text right
  const isLaptopRight = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`project-zigzag-row ${isLaptopRight ? 'row--laptop-right' : 'row--laptop-left'} ${inView ? 'is-in-view' : ''}`}
    >
      {/* Central Tracking Line Node Dot */}
      <div className="zigzag-track-node" aria-hidden="true">
        <span className="track-node-dot" />
      </div>

      {/* Column 1: Details for even rows, MacBook for odd rows */}
      <div className="zigzag-col zigzag-col--text">
        <ProjectDetailsCard project={project} index={index} onOpenModal={onOpenModal} />
      </div>

      {/* Column 2: MacBook for even rows, Details for odd rows */}
      <div className="zigzag-col zigzag-col--media">
        <MacBookDisplay project={project} index={index} onOpenModal={onOpenModal} />
      </div>
    </div>
  );
}

export default function Projects() {
  const [liveModalProject, setLiveModalProject] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger smooth one-time opening animation when Projects section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Avoid re-triggering or layout shifts on subsequent scrolls
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLiveModal = (project) => {
    setLiveModalProject(project);
  };

  const closeLiveModal = () => {
    setLiveModalProject(null);
  };

  const reloadModalIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`section projects-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="hero-badge animate-fade-in-up" style={{ alignSelf: 'center', marginBottom: '12px' }}>
            <span className="hero-badge__dot" />
            Portfolio Showcase
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore interactive production web platforms running live inside realistic 3D MacBook displays.
          </p>
        </div>

        {/* =======================================================
            ALTERNATING ZIG-ZAG INTERACTIVE PROJECTS TIMELINE
            With Central Vertical Tracking Spine & Cinematic Entrance
            ======================================================= */}
        <div className="projects-zigzag-timeline">
          {/* Faint elegant vertical tracking line down the center */}
          <div className="zigzag-center-spine" aria-hidden="true" />

          {/* Alternating Project Rows */}
          {projects.slice(0, 3).map((project, index) => (
            <AlternatingProjectRow
              key={project.id}
              project={project}
              index={index}
              onOpenModal={openLiveModal}
            />
          ))}
        </div>
      </div>

      {/* =======================================================
          FULLSCREEN MACBOOK INTERACTIVE MODAL VIEWER
          ======================================================= */}
      {liveModalProject && (
        <div className="live-modal-backdrop" onClick={closeLiveModal}>
          <div className="live-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Browser Chrome Header */}
            <div className="modal-browser-chrome">
              <div className="modal-chrome-dots">
                <button
                  type="button"
                  className="modal-dot dot-red"
                  onClick={closeLiveModal}
                  title="Close Preview"
                >
                  <X size={10} />
                </button>
                <span className="modal-dot dot-yellow" />
                <span className="modal-dot dot-green" />
              </div>

              <div className="modal-address-bar">
                <Lock size={12} style={{ color: 'var(--accent-1)' }} />
                <span className="modal-url-text">{liveModalProject.domain}</span>
                <span className="modal-live-badge">
                  <span className="hero-badge__dot" style={{ width: 6, height: 6 }} />
                  Live Production Site
                </span>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="browser-action-btn"
                  onClick={reloadModalIframe}
                  title="Reload frame"
                >
                  <RotateCw size={13} />
                  <span>Reload</span>
                </button>
                <a
                  href={liveModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="browser-action-btn"
                  title="Open in new tab"
                >
                  <ExternalLink size={13} />
                  <span>Open Site</span>
                </a>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={closeLiveModal}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Live Interactive Iframe Viewport */}
            <div className="modal-iframe-viewport">
              <iframe
                key={iframeKey}
                src={liveModalProject.liveUrl}
                title={`${liveModalProject.title} Live Preview`}
                className="modal-iframe"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
