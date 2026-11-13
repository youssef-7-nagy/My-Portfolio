import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Maximize2,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

// Dedicated UI screenshots from the assets/gallery folder
import ariadneStoryImg from '../../assets/gallery/Screenshot 2026-11-09 095008.png';
import ariadneTalentImg from '../../assets/gallery/Screenshot 2026-11-09 095025.png';
import velmoraHeroImg from '../../assets/gallery/Screenshot 2026-11-09 095121.png';
import velmoraDeliveryImg from '../../assets/gallery/Screenshot 2026-11-09 095136.png';
import velmoraMasterpiecesImg from '../../assets/gallery/Screenshot 2026-11-09 095152.png';

// High-resolution platform preview assets
import ariadnePreviewImg from '../../assets/projects/ariadne_preview.png';
import novamartPreviewImg from '../../assets/projects/novamart_preview.jpg';
import taskflowPreviewImg from '../../assets/projects/taskflow_preview.jpg';

import './VisualGlimpses.css';

const glimpsesData = [
  {
    id: 'glimpse-1',
    title: 'Ariadne Studio — Cinematic Storytelling',
    subtitle: 'High-contrast commercial agency visual showcase with narrative film cinematography and fluid gallery grid.',
    metaTag: 'Commercial Media • 2026',
    imageUrl: ariadneStoryImg,
    aspectClass: 'glimpses-card--tall', // 4/5
    category: 'Commercial',
    tech: ['React', 'Vite', 'Cinematic UI', 'Responsive Design'],
    liveUrl: 'https://ariadneg.com',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#3C6E71',
  },
  {
    id: 'glimpse-2',
    title: 'Velmora Bliss — Dining & Reservation Hero',
    subtitle: 'Gourmet restaurant hero interface featuring seamless table booking, culinary highlights, and curated menu flows.',
    metaTag: 'Full-Stack MERN • Table Booking',
    imageUrl: velmoraHeroImg,
    aspectClass: 'glimpses-card--wide', // 16/10
    category: 'E-Commerce',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#F4D35E',
  },
  {
    id: 'glimpse-3',
    title: 'Ariadne — Full-Bleed Media Archive',
    subtitle: 'Luxury commercial agency architecture featuring fluid full-bleed framing, high-bitrate streaming, and dark aesthetics.',
    metaTag: 'Production Media • 2026',
    imageUrl: ariadnePreviewImg,
    aspectClass: 'glimpses-card--square', // 4/3
    category: 'Commercial',
    tech: ['React', 'CSS Grid', 'Tailwind', 'Motion UI'],
    liveUrl: 'https://ariadneg.com',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#3C6E71',
  },
  {
    id: 'glimpse-4',
    title: 'Velmora — Kitchen Dispatch & Rapid Delivery',
    subtitle: '30-minute doorstep dispatch architecture featuring real-time availability badges and operational logistics UI.',
    metaTag: 'Logistics Flow • Order Tracking',
    imageUrl: velmoraDeliveryImg,
    aspectClass: 'glimpses-card--tall', // 4/5
    category: 'E-Commerce',
    tech: ['React', 'REST API', 'JWT Auth', 'Redux Toolkit'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#F4D35E',
  },
  {
    id: 'glimpse-5',
    title: 'Ariadne — Creative Direction Talent Roster',
    subtitle: 'Editorial talent spotlight interface highlighting directors, visual artists, and cinematography credentials.',
    metaTag: 'Editorial Profile • Talent Spotlight',
    imageUrl: ariadneTalentImg,
    aspectClass: 'glimpses-card--wide', // 16/10
    category: 'Commercial',
    tech: ['React', 'CSS Grid', 'Typography', 'Framer'],
    liveUrl: 'https://ariadneg.com',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#3C6E71',
  },
  {
    id: 'glimpse-6',
    title: 'Velmora — Interactive Culinary Feast Carousel',
    subtitle: 'Multi-column feast carousel highlighting artisanal menu courses with fluid responsive touch gestures.',
    metaTag: 'Interactive UI • Fluid Carousel',
    imageUrl: velmoraMasterpiecesImg,
    aspectClass: 'glimpses-card--wide', // 16/10
    category: 'E-Commerce',
    tech: ['Touch Gestures', 'CSS Grid', 'Dynamic Filtering'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#F4D35E',
  },
  {
    id: 'glimpse-7',
    title: 'NovaMart — Storefront & Dynamic Checkout',
    subtitle: 'High-converting e-commerce web platform featuring dynamic shopping cart drawer, faceted search, and checkout.',
    metaTag: 'Retail Platform • MERN Stack',
    imageUrl: novamartPreviewImg,
    aspectClass: 'glimpses-card--tall', // 4/5
    category: 'E-Commerce',
    tech: ['React', 'Redux', 'Stripe Payments', 'Node.js'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#F4D35E',
  },
  {
    id: 'glimpse-8',
    title: 'TaskFlow — Real-Time Sprint Dashboard',
    subtitle: 'Collaborative Kanban workspace with live task transitions, team member assignments, and drag-and-drop boards.',
    metaTag: 'Productivity Platform • Socket.IO',
    imageUrl: taskflowPreviewImg,
    aspectClass: 'glimpses-card--square', // 4/3
    category: 'Web Apps',
    tech: ['Socket.IO', 'Express', 'MongoDB', 'JWT Auth'],
    liveUrl: 'https://github.com/youssef-7-nagy',
    githubUrl: 'https://github.com/youssef-7-nagy',
    accentColor: '#284B63',
  },
];

const CATEGORIES = ['All', 'Commercial', 'E-Commerce', 'Web Apps'];

export default function VisualGlimpses() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedGlimpse, setSelectedGlimpse] = useState(null);

  // Filter items based on active category tab
  const filteredGlimpses = useMemo(() => {
    if (activeCategory === 'All') return glimpsesData;
    return glimpsesData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Current index in modal
  const currentIndex = useMemo(() => {
    if (!selectedGlimpse) return -1;
    return filteredGlimpses.findIndex((item) => item.id === selectedGlimpse.id);
  }, [selectedGlimpse, filteredGlimpses]);

  // Navigation handlers for Lightbox modal
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedGlimpse(filteredGlimpses[currentIndex - 1]);
    } else {
      setSelectedGlimpse(filteredGlimpses[filteredGlimpses.length - 1]);
    }
  }, [currentIndex, filteredGlimpses]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredGlimpses.length - 1) {
      setSelectedGlimpse(filteredGlimpses[currentIndex + 1]);
    } else {
      setSelectedGlimpse(filteredGlimpses[0]);
    }
  }, [currentIndex, filteredGlimpses]);

  const handleClose = useCallback(() => {
    setSelectedGlimpse(null);
  }, []);

  // Keyboard navigation for Lightbox modal (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!selectedGlimpse) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedGlimpse, handleClose, handlePrev, handleNext]);

  return (
    <section id="ui-showcase" className="glimpses-section" aria-label="Visual Glimpses and UI Showcase">
      {/* Background Architectural Ambience */}
      <div className="glimpses-ambient-glow" aria-hidden="true" />
      <div className="glimpses-grid-pattern" aria-hidden="true" />

      <div className="container glimpses-container">
        {/* Section Header */}
        <div className="glimpses-header">
          <div className="hero-badge animate-fade-in-up">
            <span className="hero-badge__dot" />
            <Sparkles size={13} style={{ marginRight: '6px' }} />
            Visual Glimpses &bull; UI Showcase
          </div>

          <h2 className="section-title">
            Crafted Interfaces & <span className="gradient-text">Visual Glimpses</span>
          </h2>

          <p className="section-subtitle">
            A curated masonry showcase of production web applications, interactive interfaces,
            and digital user flows engineered across modern full-stack platforms.
          </p>

          {/* Interactive Filter Pills */}
          <div className="glimpses-filter-bar" role="tablist" aria-label="Filter visual glimpses">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  className={`glimpses-filter-pill ${isActive ? 'glimpses-filter-pill--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' && <Layers size={13} style={{ marginRight: '6px' }} />}
                  {cat}
                  <span className="glimpses-pill-count">
                    {cat === 'All'
                      ? glimpsesData.length
                      : glimpsesData.filter((i) => i.category === cat).length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Bento Grid */}
        <div className="glimpses-masonry">
          {filteredGlimpses.map((item, idx) => (
            <article
              key={item.id}
              className={`glimpses-card ${item.aspectClass}`}
              onClick={() => setSelectedGlimpse(item)}
              tabIndex={0}
              role="button"
              aria-label={`Open preview for ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedGlimpse(item);
                }
              }}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {/* Card Image Container */}
              <div className="glimpses-card__media">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="glimpses-card__img"
                />
              </div>

              {/* Seamless Dark Gradient Vignette for Razor-Sharp Legibility */}
              <div className="glimpses-card__gradient" aria-hidden="true" />

              {/* Top-Right Quick Expand Icon Button */}
              <div
                className="glimpses-card__expand-btn"
                aria-hidden="true"
                title="Expand full-resolution preview"
              >
                <Maximize2 size={16} />
              </div>

              {/* Bottom Card Information */}
              <div className="glimpses-card__content">
                {/* Meta Category Tag */}
                <span className="glimpses-card__tag">
                  {item.metaTag}
                </span>

                {/* Primary Card Title */}
                <h3 className="glimpses-card__title">
                  {item.title}
                </h3>

                {/* Expanded Subtitle (Reveals Smoothly on Hover) */}
                <p className="glimpses-card__subtitle">
                  {item.subtitle}
                </p>

                {/* Tech Pills (Subtle inline tags on hover) */}
                <div className="glimpses-card__tech-row">
                  {item.tech.slice(0, 3).map((t) => (
                    <span key={t} className="glimpses-card__tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Dark Glassmorphism Lightbox Modal */}
      {selectedGlimpse && (
        <div
          className="glimpses-modal-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${selectedGlimpse.title}`}
        >
          <div
            className="glimpses-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="glimpses-modal-header">
              <div className="glimpses-modal-meta">
                <span className="glimpses-modal-badge">
                  {selectedGlimpse.metaTag}
                </span>
                <span className="glimpses-modal-counter">
                  {currentIndex + 1} / {filteredGlimpses.length}
                </span>
              </div>

              <button
                type="button"
                className="glimpses-modal-close-btn"
                onClick={handleClose}
                aria-label="Close modal preview"
                title="Close (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="glimpses-modal-viewport">
              <img
                src={selectedGlimpse.imageUrl}
                alt={selectedGlimpse.title}
                className="glimpses-modal-image"
              />

              {/* Prev / Next In-Viewport Navigation Controls */}
              {filteredGlimpses.length > 1 && (
                <>
                  <button
                    type="button"
                    className="glimpses-modal-nav glimpses-modal-nav--prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous image"
                    title="Previous (Left arrow)"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    className="glimpses-modal-nav glimpses-modal-nav--next"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next image"
                    title="Next (Right arrow)"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer with Project Context and Live Links */}
            <div className="glimpses-modal-footer">
              <div className="glimpses-modal-info">
                <h3 className="glimpses-modal-title">{selectedGlimpse.title}</h3>
                <p className="glimpses-modal-desc">{selectedGlimpse.subtitle}</p>

                {/* Tech Badges */}
                <div className="glimpses-modal-tags">
                  {selectedGlimpse.tech.map((t) => (
                    <span key={t} className="glimpses-modal-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="glimpses-modal-actions">
                {selectedGlimpse.liveUrl && (
                  <a
                    href={selectedGlimpse.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary glimpses-modal-btn"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={16} />
                  </a>
                )}

                {selectedGlimpse.githubUrl && (
                  <a
                    href={selectedGlimpse.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary glimpses-modal-btn"
                  >
                    <FaGithub size={16} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
