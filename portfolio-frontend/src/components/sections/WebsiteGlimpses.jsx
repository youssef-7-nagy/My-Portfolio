import AccordionGallery from '../ui/AccordionGallery';

import ariadneStoryImg from '../../assets/gallery/Screenshot 2026-11-09 095008.png';
import ariadneTalentImg from '../../assets/gallery/Screenshot 2026-11-09 095025.png';
import velmoraHeroImg from '../../assets/gallery/Screenshot 2026-11-09 095121.png';
import velmoraDeliveryImg from '../../assets/gallery/Screenshot 2026-11-09 095136.png';
import velmoraMenuImg from '../../assets/gallery/Screenshot 2026-11-09 095152.png';

import './WebsiteGlimpses.css';

const galleryItems = [
  {
    image: ariadneStoryImg,
    label: 'Ariadne Studio — Cinematic Storytelling',
    link: 'https://ariadneg.com',
    alt: 'Ariadne Studio commercial agency website snapshot'
  },
  {
    image: ariadneTalentImg,
    label: 'Ariadne Studio — Editorial Talent Archive',
    link: 'https://ariadneg.com',
    alt: 'Ariadne Studio model & talent portfolio snapshot'
  },
  {
    image: velmoraHeroImg,
    label: 'Velmora Bliss — Luxury Dining & Table Booking',
    link: 'https://velmora-bliss-9iqf.vercel.app/',
    alt: 'Velmora Bliss gourmet dining hero snapshot'
  },
  {
    image: velmoraDeliveryImg,
    label: 'Velmora Bliss — Order & Delivery Experience',
    link: 'https://velmora-bliss-9iqf.vercel.app/',
    alt: 'Velmora Bliss food order flow snapshot'
  },
  {
    image: velmoraMenuImg,
    label: 'Velmora Bliss — Interactive Menu Showcase',
    link: 'https://velmora-bliss-9iqf.vercel.app/',
    alt: 'Velmora Bliss gourmet food menu snapshot'
  }
];

export default function WebsiteGlimpses() {
  return (
    <section id="glimpses" className="section glimpses-section">
      <div className="container glimpses-container">
        {/* Section Header */}
        <div className="glimpses-header">
          <div className="hero-badge animate-fade-in-up" style={{ alignSelf: 'center', marginBottom: '12px' }}>
            <span className="hero-badge__dot" />
            Website Glimpses
          </div>
          <h2 className="section-title">
            Website <span className="gradient-text">Glimpses</span>
          </h2>
          <p className="section-subtitle">
            Interactive snapshots and production UI moments captured from live web platforms. Hover or tap to expand any glimpse.
          </p>
        </div>

        {/* React Bits AccordionGallery */}
        <div className="glimpses-gallery-wrapper">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={2}
            accentColor="var(--color-warm-yellow)"
            overlayColor="#000000"
            textColor="#ffffff"
            height={460}
            gap={12}
            radius={20}
            expandRatio={0.52}
            trigger="hover"
            grayscale={true}
            tilt={7}
            duration={0.65}
          />
        </div>
      </div>
    </section>
  );
}
