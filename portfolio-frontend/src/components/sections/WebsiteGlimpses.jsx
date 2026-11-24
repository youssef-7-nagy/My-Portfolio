import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Layers
} from 'lucide-react';

import ariadneStoryImg from '../../assets/gallery/Screenshot 2026-11-09 095008.png';
import ariadneTalentImg from '../../assets/gallery/Screenshot 2026-11-09 095025.png';
import velmoraHeroImg from '../../assets/gallery/Screenshot 2026-11-09 095121.png';
import velmoraDeliveryImg from '../../assets/gallery/Screenshot 2026-11-09 095136.png';
import velmoraMenuImg from '../../assets/gallery/Screenshot 2026-11-09 095152.png';
import maghsaltakBiImg from '../../assets/gallery/Screenshot 2026-11-13 202703.png';
import maghsaltakHomeImg from '../../assets/gallery/Screenshot 2026-11-13 202903.png';
import maghsaltakBookingImg from '../../assets/gallery/Screenshot 2026-11-13 202936.png';
import maghsaltakCareImg from '../../assets/gallery/Screenshot 2026-11-13 202945.png';
import maghsaltakMissionImg from '../../assets/gallery/Screenshot 2026-11-13 203002.png';
import maghsaltakPlansImg from '../../assets/gallery/Screenshot 2026-11-13 204405.png';

import './WebsiteGlimpses.css';

const CATEGORIES = ['All', 'Maghsaltak', 'Velmora Bliss', 'Ariadne Studio'];

const snapshotsData = [
  {
    id: 'ariadne-story',
    name: 'Ariadne Studio — Cinematic Storytelling',
    client: 'Ariadne Studio',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Ariadne Studio',
    projectType: 'Commercial Agency',
    scope: 'High-contrast commercial agency visual showcase with narrative film cinematography, full-bleed framing, and fluid gallery grid.',
    tags: ['React', 'Vite', 'Cinematic UI', 'Responsive Design'],
    liveUrl: 'https://ariadneg.com',
    image: ariadneStoryImg,
    thumb: ariadneStoryImg,
    accent: '#3C6E71',
    height: '350px'
  },
  {
    id: 'velmora-hero',
    name: 'Velmora Bliss — Gourmet Dining & Table Booking',
    client: 'Velmora Bliss',
    location: 'Vercel Cloud',
    year: '2026',
    category: 'Velmora Bliss',
    projectType: 'E-Commerce & Dining',
    scope: 'Gourmet restaurant hero interface featuring seamless online table reservation, culinary highlights, and curated seasonal menu flows.',
    tags: ['React', 'Full-Stack MERN', 'Tailwind', 'Vercel'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    image: velmoraHeroImg,
    thumb: velmoraHeroImg,
    accent: '#F4D35E',
    height: '240px'
  },
  {
    id: 'maghsaltak-bi',
    name: 'Maghsaltak — Business Intelligence & Admin Dashboard',
    client: 'Maghsaltak',
    location: 'Helwan University / Production',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack & BI',
    scope: 'Enterprise administrative BI dashboard delivering real-time revenue analytics, dispatch heatmaps, staff efficiency metrics, and customer cohort insights.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'BI Analytics'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakBiImg,
    thumb: maghsaltakBiImg,
    accent: '#3C6E71',
    height: '290px'
  },
  {
    id: 'ariadne-talent',
    name: 'Ariadne Studio — Editorial Talent Archive',
    client: 'Ariadne Studio',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Ariadne Studio',
    projectType: 'Commercial Agency',
    scope: 'Editorial talent and model roster interface highlighting directors, visual artists, and cinematography credentials with curated portfolios.',
    tags: ['React', 'CSS Grid', 'Typography', 'Talent Index'],
    liveUrl: 'https://ariadneg.com',
    image: ariadneTalentImg,
    thumb: ariadneTalentImg,
    accent: '#3C6E71',
    height: '260px'
  },
  {
    id: 'velmora-delivery',
    name: 'Velmora Bliss — Kitchen Dispatch & Rapid Delivery',
    client: 'Velmora Bliss',
    location: 'Vercel Cloud',
    year: '2026',
    category: 'Velmora Bliss',
    projectType: 'E-Commerce & Dining',
    scope: 'Swift 30-minute doorstep dispatch architecture featuring live availability badges, cart state persistence, and real-time food delivery tracking.',
    tags: ['React', 'REST APIs', 'Redux Toolkit', 'Order Flow'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    image: velmoraDeliveryImg,
    thumb: velmoraDeliveryImg,
    accent: '#F4D35E',
    height: '340px'
  },
  {
    id: 'maghsaltak-home',
    name: 'Maghsaltak — Mobile Car Wash Landing Portal',
    client: 'Maghsaltak',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack',
    scope: 'On-demand mobile car wash service homepage connecting vehicle owners with professional doorstep mobile wash crews across Cairo.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vite'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakHomeImg,
    thumb: maghsaltakHomeImg,
    accent: '#284B63',
    height: '250px'
  },
  {
    id: 'velmora-menu',
    name: 'Velmora Bliss — Interactive Culinary Menu Showcase',
    client: 'Velmora Bliss',
    location: 'Vercel Cloud',
    year: '2026',
    category: 'Velmora Bliss',
    projectType: 'E-Commerce & Dining',
    scope: 'Multi-course culinary menu showcase with detailed dish descriptions, pricing tiers, dietary indicators, and responsive touch gestures.',
    tags: ['React', 'Node.js', 'MongoDB', 'Responsive UI'],
    liveUrl: 'https://velmora-bliss-9iqf.vercel.app/',
    image: velmoraMenuImg,
    thumb: velmoraMenuImg,
    accent: '#F4D35E',
    height: '280px'
  },
  {
    id: 'maghsaltak-booking',
    name: 'Maghsaltak — Service Booking & Dispatch Flow',
    client: 'Maghsaltak',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack',
    scope: 'Streamlined multi-step car wash appointment wizard with vehicle type selection, slot scheduling, location pinning, and order confirmation.',
    tags: ['React', 'REST API', 'Socket.IO', 'Booking Engine'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakBookingImg,
    thumb: maghsaltakBookingImg,
    accent: '#3C6E71',
    height: '330px'
  },
  {
    id: 'maghsaltak-care',
    name: 'Maghsaltak — Vehicle Care & Service Tiers',
    client: 'Maghsaltak',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack',
    scope: 'Specialized detailing service cards illustrating interior steam sanitization, exterior clay bar, wax polish, and engine bay cleaning.',
    tags: ['React', 'CSS Modules', 'Service Catalog'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakCareImg,
    thumb: maghsaltakCareImg,
    accent: '#284B63',
    height: '250px'
  },
  {
    id: 'maghsaltak-mission',
    name: 'Maghsaltak — Eco-Friendly Water Saving Mission',
    client: 'Maghsaltak',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack',
    scope: 'Environmental impact section illustrating how mobile steam wash techniques save up to 80% of water per wash compared to traditional stations.',
    tags: ['Eco Tech', 'React', 'Brand Story'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakMissionImg,
    thumb: maghsaltakMissionImg,
    accent: '#F4D35E',
    height: '290px'
  },
  {
    id: 'maghsaltak-plans',
    name: 'Maghsaltak — Monthly Packages & Subscription Plans',
    client: 'Maghsaltak',
    location: 'Cairo, Egypt',
    year: '2026',
    category: 'Maghsaltak',
    projectType: 'MERN Stack',
    scope: 'Subscription pricing table showcasing Silver, Gold, and Platinum monthly wash passes with automated renewal and priority dispatch.',
    tags: ['Pricing Plans', 'Subscriptions', 'React', 'MongoDB'],
    liveUrl: 'https://maghsaltak-one.vercel.app/',
    image: maghsaltakPlansImg,
    thumb: maghsaltakPlansImg,
    accent: '#3C6E71',
    height: '310px'
  }
];

function LightboxModal({ project, onClose, onPrev, onNext, total, index }) {
  // Keyboard listeners: Escape to close, arrows to cycle
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    document.addEventListener('keydown', handler);
    // Lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="glimpses-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} viewer`}
    >
      <div
        className="glimpses-lightbox-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Image Stage */}
        <div className="glimpses-lightbox-stage">
          <img
            src={project.image}
            alt={project.name}
            className="glimpses-lightbox-image"
          />

          {/* Left Arrow */}
          <button
            type="button"
            onClick={onPrev}
            className="glimpses-lightbox-nav glimpses-lightbox-nav--prev"
            aria-label="Previous snapshot"
            title="Previous (Arrow Left)"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={onNext}
            className="glimpses-lightbox-nav glimpses-lightbox-nav--next"
            aria-label="Next snapshot"
            title="Next (Arrow Right)"
          >
            <ChevronRight size={20} />
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="glimpses-lightbox-close"
            aria-label="Close viewer"
            title="Close (Escape)"
          >
            <X size={18} />
          </button>

          {/* Counter Badge */}
          <div className="glimpses-lightbox-counter">
            <span>{index + 1}</span>
            <span className="counter-sep">/</span>
            <span>{total}</span>
          </div>
        </div>

        {/* Information Panel */}
        <div className="glimpses-lightbox-panel">
          <div className="glimpses-lightbox-info">
            <div className="glimpses-lightbox-badges">
              <span className="glimpses-cat-badge">
                {project.category}
              </span>
              <span className="glimpses-type-badge">
                {project.projectType}
              </span>
            </div>

            <h2 className="glimpses-lightbox-title">
              {project.name}
            </h2>

            <div className="glimpses-lightbox-meta">
              <span>{project.client}</span>
              <span className="meta-bullet">&bull;</span>
              <span>{project.location}</span>
              <span className="meta-bullet">&bull;</span>
              <span>{project.year}</span>
            </div>

            <p className="glimpses-lightbox-scope">
              {project.scope}
            </p>
          </div>

          <div className="glimpses-lightbox-actions">
            <div className="glimpses-lightbox-tags">
              {project.tags?.map((tag) => (
                <span key={tag} className="glimpses-tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glimpses-lightbox-live-btn"
                title={`Open ${project.client} live website`}
              >
                <span>Visit Live Platform</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebsiteGlimpses({ searchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = useMemo(() => {
    let list = snapshotsData;
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const prevSlide = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const nextSlide = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  return (
    <section id="glimpses" className="section glimpses-section">
      {/* Lightbox Modal */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <LightboxModal
          project={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
          total={filtered.length}
          index={lightboxIndex}
        />
      )}

      <div className="container glimpses-container">
        {/* Section Header */}
        <div className="glimpses-header">
          <div className="glimpses-header-row">
            <div className="glimpses-header-left">
              <h2 className="section-title glimpses-title">
                Website <span className="gradient-text">Glimpses</span>
              </h2>
            </div>
            <p className="glimpses-subtitle">
              {filtered.length} production snapshots &mdash; click any image to open the full-screen interactive viewer.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="glimpses-filter-row">
          <div className="glimpses-filter-pills">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? snapshotsData.length
                  : snapshotsData.filter((s) => s.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`glimpses-filter-btn ${isActive ? 'is-active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="glimpses-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="glimpses-empty-state">
            <div className="glimpses-empty-icon">
              <Layers size={36} />
            </div>
            <h3 className="glimpses-empty-title">No snapshots found</h3>
            <p className="glimpses-empty-desc">
              Try selecting another category to view project moments.
            </p>
          </div>
        )}

        {/* Masonry / Bento Gallery Grid */}
        {filtered.length > 0 && (
          <div className="glimpses-masonry-grid">
            {filtered.map((project, idx) => (
              <div
                key={project.id}
                className="glimpses-gallery-card"
                onClick={() => openLightbox(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
                aria-label={`Open ${project.name} in full screen viewer`}
              >
                {/* Image */}
                <div
                  className="glimpses-card-media"
                  style={{ height: project.height || '280px' }}
                >
                  <img
                    src={project.thumb}
                    alt={project.name}
                    className="glimpses-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Hover Reveal Overlay */}
                <div className="glimpses-card-overlay">
                  {/* Expand Icon Button */}
                  <div
                    className="glimpses-card-expand-btn"
                    title="Expand Full View"
                    aria-hidden="true"
                  >
                    <Maximize2 size={16} />
                  </div>

                  {/* Info In Overlay */}
                  <div className="glimpses-card-overlay-info">
                    <span className="glimpses-card-overlay-meta">
                      {project.location} &bull; {project.year}
                    </span>
                    <h3 className="glimpses-card-overlay-title">
                      {project.name}
                    </h3>
                    <p className="glimpses-card-overlay-client">
                      {project.client}
                    </p>
                  </div>
                </div>

                {/* Non-Hover Visible Bottom Strip */}
                <div className="glimpses-card-idle-strip">
                  <h3 className="glimpses-card-idle-title">
                    {project.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
