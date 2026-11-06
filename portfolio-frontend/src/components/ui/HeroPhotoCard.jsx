import photoImg from '../../assets/logos/youssef_photo.png';
import './HeroPhotoCard.css';

/**
 * HeroPhotoCard
 * Premium Cybernetic Animated Circular Frame
 * Features dual-orbiting gradient comet beams, orbiting sparks,
 * futuristic HUD tick marks, and atmospheric ambient glow using
 * the official 6-color design system:
 * - Warm Yellow:     #F4D35E
 * - Ocean Teal:      #3C6E71
 * - Deep Steel Blue: #284B63
 * - Light Gray:      #D9D9D9
 * - Black:           #000000
 * - White:           #FFFFFF
 */
export default function HeroPhotoCard() {
  return (
    <div className="profile-frame-wrapper">
      {/* 1. Atmospheric Ambient Core Glow */}
      <div className="profile-ambient-glow" aria-hidden="true" />

      {/* 2. High-Tech Cyber SVG Ring System */}
      <svg
        className="profile-frame-svg"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Beam 1: Ocean Teal to Deep Steel Blue */}
          <linearGradient id="brandBeam1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3C6E71" stopOpacity="1" />
            <stop offset="45%" stopColor="#3C6E71" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#284B63" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#284B63" stopOpacity="0" />
          </linearGradient>

          {/* Beam 2: Warm Yellow to Ocean Teal */}
          <linearGradient id="brandBeam2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F4D35E" stopOpacity="1" />
            <stop offset="50%" stopColor="#F4D35E" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#3C6E71" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3C6E71" stopOpacity="0" />
          </linearGradient>

          {/* Beam 3: Light Gray to Deep Steel Blue Accent */}
          <linearGradient id="brandBeam3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9D9D9" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#284B63" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#284B63" stopOpacity="0" />
          </linearGradient>

          {/* Ocean Teal Glow Filter */}
          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Warm Yellow Glow Filter */}
          <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Counter-Rotating Dashed Orbit Ring */}
        <circle
          cx="200"
          cy="200"
          r="193"
          className="svg-orbit-dashed"
          stroke="rgba(217, 217, 217, 0.25)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
        />

        {/* Static Base Guide Track */}
        <circle
          cx="200"
          cy="200"
          r="184"
          className="svg-base-track"
          stroke="rgba(217, 217, 217, 0.15)"
          strokeWidth="2"
        />

        {/* Primary Rotating Ring: Ocean Teal & Warm Yellow Beams + Luminous Orbiting Sparks */}
        <g className="svg-rotating-primary">
          {/* Ocean Teal to Deep Steel Blue Comet Arc */}
          <circle
            cx="200"
            cy="200"
            r="184"
            stroke="url(#brandBeam1)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="260 896"
            filter="url(#cyanGlow)"
          />
          {/* Warm Yellow to Ocean Teal Comet Arc */}
          <circle
            cx="200"
            cy="200"
            r="184"
            stroke="url(#brandBeam2)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="240 916"
            strokeDashoffset="-580"
            filter="url(#goldGlow)"
          />

          {/* Orbiting Spark 1 (Ocean Teal Core) */}
          <circle cx="384" cy="200" r="5" fill="#3C6E71" filter="url(#cyanGlow)" />
          <circle cx="384" cy="200" r="2.2" fill="#FFFFFF" />

          {/* Orbiting Spark 2 (Warm Yellow Core) */}
          <circle cx="16" cy="200" r="5" fill="#F4D35E" filter="url(#goldGlow)" />
          <circle cx="16" cy="200" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Secondary Counter-Rotating Accent Ring */}
        <g className="svg-rotating-secondary">
          <circle
            cx="200"
            cy="200"
            r="174"
            stroke="url(#brandBeam3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="180 913"
            opacity="0.85"
          />
          <circle
            cx="200"
            cy="200"
            r="174"
            stroke="rgba(244, 211, 94, 0.55)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="130 963"
            strokeDashoffset="-450"
          />
        </g>

        {/* Cardinal HUD Tech Crosshairs / Notches */}
        <g className="svg-hud-ticks" opacity="0.75">
          <line x1="200" y1="2" x2="200" y2="10" stroke="#3C6E71" strokeWidth="2" strokeLinecap="round" />
          <line x1="390" y1="200" x2="398" y2="200" stroke="#F4D35E" strokeWidth="2" strokeLinecap="round" />
          <line x1="200" y1="390" x2="200" y2="398" stroke="#284B63" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="200" x2="10" y2="200" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {/* 3. Inner Circular Disc with Portrait Photo */}
      <div className="profile-photo-inner">
        {/* Subtle Cyber Grid Lines in background */}
        <div className="profile-backdrop-grid" />
        <div className="profile-backdrop-glow" />

        {/* High-Resolution Portrait Photo */}
        <img
          src={photoImg}
          alt="Youssef Nagy - Full Stack MERN Developer"
          className="profile-photo-img"
          loading="eager"
        />

        {/* Subtle Glass Sheen Reflection */}
        <div className="profile-photo-glare" />
      </div>

      {/* 4. Docked Holographic Status Pill */}
      <div className="profile-status-pill">
        <span className="status-pill-pulse" />
        <span className="status-pill-text">Available for Opportunities</span>
      </div>
    </div>
  );
}
