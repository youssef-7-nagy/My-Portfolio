import { useState, useEffect, useRef } from 'react';
import { projects } from '../../data/portfolioData';
import { ExternalLink, Lock, RotateCw, X, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

/**
 * MacBookProjectCard
 * Renders a large, realistic 3D open MacBook mockup with live embedded website or screenshot
 * and clean project details arranged underneath.
 */
function MacBookProjectCard({ project, index, onOpenModal }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const stageRef = useRef(null);
  const [dynamicScale, setDynamicScale] = useState(null);

  // Dynamically calculate the perfect laptop scale based on the actual rendered column width
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measureAndScale = (entries) => {
      const entry = entries ? entries[0] : null;
      const width = entry ? entry.contentRect.width : el.offsetWidth;
      if (width > 40) {
        // Fits the 620px hardware base within column with a safety margin (never overflows or overlaps)
        // Capped at 0.82 for sharp high-res rendering on huge monitors
        const calculatedScale = Math.min(0.82, Math.max(0.38, (width - 8) / 620));
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
      className="project-showcase-item"
      style={{
        '--project-accent': project.accent || 'var(--color-ocean-teal)',
        ...(dynamicScale ? { '--laptop-scale': dynamicScale } : {})
      }}
    >
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

                  {/* Live Injected Iframe — actively injected on all devices & screen sizes */}
                  {hasEmbed && (
                    <iframe
                      src={project.embedUrl}
                      title={`${project.title} Live Preview`}
                      className={`macbook-live-iframe ${iframeLoaded ? 'macbook-live-iframe--loaded' : 'macbook-live-iframe--loading'}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoad={() => setIframeLoaded(true)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
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

      {/* Desk Ambient Reflection & Glow */}
      <div className="laptop-desk-shadow" />

      {/* Clean Project Information Hierarchy Underneath Laptop */}
      <div className="project-info-block">
        {/* 1. Project Number & Title */}
        <div className="project-info-header">
          <span className="project-index-badge">0{index + 1}</span>
          <h3 className="project-title">{project.title}</h3>
        </div>

        {/* 2. Concise One-Line Description */}
        <p className="project-one-liner">{project.subtitle}</p>

        {/* 3. Relevant Technology Tags */}
        <div className="project-tech-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* 4. Subtle Row of Action Links */}
        <div className="project-actions-row">
          {project.hasLiveEmbed ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn project-action-btn--primary"
            >
              <ExternalLink size={13} />
              <span>Live Website</span>
            </a>
          ) : (
            <a
              href={project.liveUrl !== '#' ? project.liveUrl : project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn project-action-btn--primary"
            >
              <ExternalLink size={13} />
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
              <FaGithub size={14} />
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
              <Maximize2 size={13} />
              <span>Expand</span>
            </button>
          )}
        </div>
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
            3-COLUMN INTERACTIVE MACBOOK GRID (Permanently Open)
            ======================================================= */}
        <div className="laptop-showcase-grid">
          {projects.slice(0, 3).map((project, index) => (
            <MacBookProjectCard
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
