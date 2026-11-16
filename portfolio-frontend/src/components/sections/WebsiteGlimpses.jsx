import AccordionGallery from '../ui/AccordionGallery';

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
  },
  {
    image: maghsaltakBiImg,
    label: 'Maghsaltak — Business Intelligence & Admin Dashboard',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak revenue and business intelligence dashboard'
  },
  {
    image: maghsaltakHomeImg,
    label: 'Maghsaltak — On-Demand Mobile Car Wash Portal',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak eco-friendly car wash landing portal'
  },
  {
    image: maghsaltakBookingImg,
    label: 'Maghsaltak — Service Booking & Dispatch Flow',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak service selection and booking flow'
  },
  {
    image: maghsaltakCareImg,
    label: 'Maghsaltak — Vehicle Care & Service Tiers',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak car care treatment options and packages'
  },
  {
    image: maghsaltakMissionImg,
    label: 'Maghsaltak — Brand Story & Eco-Friendly Mission',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak eco-friendly water saving mission snapshot'
  },
  {
    image: maghsaltakPlansImg,
    label: 'Maghsaltak — Monthly Packages & Subscription Plans',
    link: 'https://maghsaltak-one.vercel.app/',
    alt: 'Maghsaltak monthly wash tiers and platinum package snapshot'
  }
];

export default function WebsiteGlimpses() {
  return (
    <section id="glimpses" className="section glimpses-section">
      <div className="container glimpses-container">
        {/* Section Header */}
        <div className="glimpses-header">
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
            defaultIndex={-1}
            accentColor="var(--color-warm-yellow)"
            overlayColor="#000000"
            textColor="#ffffff"
            height={410}
            gap={8}
            radius={18}
            expandRatio={0.48}
            trigger="hover"
            grayscale={true}
            tilt={4}
            parallax={0.15}
            duration={0.6}
          />
        </div>
      </div>
    </section>
  );
}
