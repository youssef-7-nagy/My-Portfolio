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
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="macbook-preview-fallback"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  )}

                  {/* Loading indicator when iframe is loading */}
                  {hasEmbed && !iframeLoaded && (
                    <div className="macbook-screen-loading">
                      <div className="macbook-loading-indicator">
                        <span className="macbook-spinner" />
                        <span>Loading live app...</span>
                      </div>
                    </div>
                  )}

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
function ProjectDetailsCard({ project, onOpenModal }) {
  return (
    <div className="project-details-card">
      {/* 1. Bold High-Contrast Title & Subtitle */}
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
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
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
        <ProjectDetailsCard project={project} onOpenModal={onOpenModal} />
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

  // Prevent background page scrolling while modal is open & listen for Escape key
  useEffect(() => {
    if (!liveModalProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLiveModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [liveModalProject]);

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
          ULTRA-REALISTIC MACBOOK PRO HARDWARE INTERACTIVE MODAL VIEWER
          ======================================================= */}
      {liveModalProject && (
        <div
          className="live-modal-backdrop"
          onClick={closeLiveModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${liveModalProject.title} Interactive MacBook Pro Preview`}
        >
          {/* Ambient Brand Halo Glow behind the MacBook */}
          <div
            className="modal-macbook-glow"
            style={{
              '--modal-accent': liveModalProject.accent || 'var(--color-ocean-teal)'
            }}
            aria-hidden="true"
          />

          {/* Ultra-realistic MacBook Pro Device Shell */}
          <div
            className="modal-macbook-device"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Upper Lid: Aluminum Bezel & Screen Assembly */}
            <div className="modal-macbook-lid">
              {/* FaceTime Camera Sensor Cutout */}
              <div className="modal-macbook-camera" aria-hidden="true">
                <span className="modal-macbook-camera__lens" />
              </div>

              {/* Display Bezel & Active Screen Canvas */}
              <div className="modal-macbook-screen">
                {/* macOS Browser Chrome Header Bar */}
                <div className="modal-browser-chrome">
                  {/* Traffic Light Window Controls */}
                  <div className="modal-chrome-dots">
                    <button
                      type="button"
                      className="modal-dot dot-red"
                      onClick={closeLiveModal}
                      title="Close Preview (Esc)"
                      aria-label="Close Preview"
                    >
                      <X size={8} />
                    </button>
                    <span className="modal-dot dot-yellow" title="Minimize" />
                    <span className="modal-dot dot-green" title="Zoom" />
                  </div>

                  {/* Dark Pill URL Address Bar */}
                  <div className="modal-address-bar">
                    <Lock size={12} className="modal-address-lock" />
                    <span className="modal-url-text">{liveModalProject.domain}</span>
                    <span className="modal-live-badge">
                      <span className="hero-badge__dot" style={{ width: 6, height: 6 }} />
                      Live Production
                    </span>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="browser-action-btn"
                      onClick={reloadModalIframe}
                      title="Reload preview frame"
                    >
                      <RotateCw size={13} />
                      <span className="btn-label-desktop">Reload</span>
                    </button>
                    <a
                      href={liveModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="browser-action-btn browser-action-btn--primary"
                      title="Open live website in new tab"
                    >
                      <ExternalLink size={13} />
                      <span className="btn-label-desktop">Open Site</span>
                    </a>
                    <button
                      type="button"
                      className="modal-close-btn"
                      onClick={closeLiveModal}
                      aria-label="Close modal"
                      title="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Live Interactive Iframe Viewport */}
                <div className="modal-iframe-viewport">
                  {/* Underlying High-res Screenshot fallback while iframe loads */}
                  {liveModalProject.image && (
                    <img
                      src={liveModalProject.image}
                      alt={liveModalProject.title}
                      className="modal-preview-fallback"
                    />
                  )}

                  <iframe
                    key={iframeKey}
                    src={liveModalProject.liveUrl}
                    title={`${liveModalProject.title} Live Preview`}
                    className="modal-iframe"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />

                  {/* Ultra-subtle Retina Glass Sheen Reflection */}
                  <div className="modal-macbook-glare" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Bottom Metallic Base Chassis & Signature Thumb Opening Notch */}
            <div className="modal-macbook-base" aria-hidden="true">
              <div className="modal-macbook-notch" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
