import { useState } from 'react';
import './IsometricStack3D.css';

export default function IsometricStack3D({
  activeCategory,
  onSelectCategory,
  hoveredCard
}) {
  const [hoveredSlab, setHoveredSlab] = useState(null);

  return (
    <div className="iso-stack-container" role="region" aria-label="3D Stacked Architecture Model">
      <svg
        className="iso-stack-svg"
        viewBox="0 0 440 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="neon-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neon-glow-subtle" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="slab-drop-shadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#000000" floodOpacity="0.65" />
          </filter>

          <filter id="backend-light-spill" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#84cc16" floodOpacity="0.45" />
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.7" />
          </filter>

          {/* Gradients for Frontend & Database (Dark Metallic Glass) */}
          <linearGradient id="dark-top-grad" x1="100" y1="60" x2="340" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#223042" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#151f2b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0d141e" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="dark-left-face" x1="100" y1="100" x2="220" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0e1722" />
            <stop offset="100%" stopColor="#070c12" />
          </linearGradient>

          <linearGradient id="dark-right-face" x1="220" y1="160" x2="350" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1c2838" />
            <stop offset="100%" stopColor="#101924" />
          </linearGradient>

          {/* Gradients for Backend Centerpiece (Luminous Neon Lime-Green Glass) */}
          <linearGradient id="backend-top-grad" x1="100" y1="140" x2="350" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a3e635" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#84cc16" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="backend-left-face" x1="100" y1="180" x2="220" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#2e4d08" />
          </linearGradient>

          <linearGradient id="backend-right-face" x1="220" y1="250" x2="350" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="60%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>

          {/* Database Top Face Reflection Gradient (Catching neon light from Backend) */}
          <linearGradient id="database-top-grad" x1="220" y1="230" x2="220" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c4735" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#1a2e26" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#121b24" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0a0f16" stopOpacity="0.98" />
          </linearGradient>

          {/* Floating Tablet Gradients */}
          <linearGradient id="glass-tablet-face" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#090d13" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="base-shadow-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#166534" stopOpacity="0.18" />
            <stop offset="75%" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ==================================================================
            0. GROUNDING BASE SHADOW & GREEN RADIAL FLOOR AURA
            ================================================================== */}
        <g className="iso-base-platform">
          {/* Diffuse green floor aura */}
          <ellipse
            cx="220"
            cy="390"
            rx="145"
            ry="46"
            fill="url(#base-shadow-gradient)"
            filter="blur(16px)"
          />
          {/* Crisp directional contact shadow under Database slab */}
          <ellipse
            cx="220"
            cy="382"
            rx="115"
            ry="30"
            fill="#000000"
            opacity="0.65"
          />
        </g>

        {/* ==================================================================
            1. CURVED GLOWING NEON-GREEN CONNECTOR PATHS & ENERGY NODES
            ================================================================== */}
        <g className="iso-connector-circuits" aria-hidden="true">
          {/* Wire 1: Curving from behind stack to top-left (Frontend Card) */}
          <path
            d="M 230 45 C 130 30, 40 40, -10 65"
            className="circuit-path circuit-path--wire1"
          />
          {/* Wire 2: Curving from Backend level to right (Backend Card) */}
          <path
            d="M 335 220 C 375 220, 410 205, 450 195"
            className="circuit-path circuit-path--wire2"
          />
          {/* Wire 3: Orbiting around Database slab to bottom-left (Database Card) */}
          <path
            d="M 120 330 C 50 335, 10 320, -10 310"
            className="circuit-path circuit-path--wire3"
          />
          {/* Wire 4: Delicate looping aura arc wrapping behind the centerpiece */}
          <path
            d="M 105 180 C 80 230, 95 300, 150 345"
            className="circuit-path circuit-path--arc"
          />

          {/* Pulsing Energy Nodes (Dots) traveling / glowing on lines */}
          <circle cx="20" cy="60" r="3.5" className="circuit-energy-node node--pulse1" />
          <circle cx="430" cy="200" r="4.5" className="circuit-energy-node node--pulse2" />
          <circle cx="25" cy="316" r="3.5" className="circuit-energy-node node--pulse3" />
          <circle cx="98" cy="245" r="2.8" className="circuit-energy-node node--pulse4" />
        </g>

        {/* ==================================================================
            2. LAYER 3: DATABASE SLAB (BOTTOM)
            ================================================================== */}
        <g
          className={`iso-slab iso-slab--database ${
            hoveredSlab === 'database' || hoveredCard === 'database' || activeCategory === 'database'
              ? 'is-slab-lifted'
              : ''
          }`}
          onMouseEnter={() => setHoveredSlab('database')}
          onMouseLeave={() => setHoveredSlab(null)}
          onClick={() => onSelectCategory && onSelectCategory('database')}
          filter="url(#slab-drop-shadow)"
        >
          {/* Left Face */}
          <path
            d="M 104.7 273.8 Q 90.0 280.0 104.7 286.2 L 205.3 328.8 Q 220.0 335.0 220.0 335.5 L 220.0 367.0 L 205.3 360.8 L 104.7 318.2 Q 90.0 312.0 104.7 305.8 Z"
            fill="url(#dark-left-face)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.8"
          />

          {/* Right Face (with Database label) */}
          <path
            d="M 220.0 335.5 Q 220.0 335.0 234.7 328.8 L 335.3 286.2 Q 350.0 280.0 335.3 273.8 L 335.3 305.8 Q 350.0 312.0 335.3 318.2 L 234.7 360.8 Q 220.0 367.0 220.0 367.0 Z"
            fill="url(#dark-right-face)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.8"
          />

          {/* Top Face (catching neon green reflection sheen from Backend above) */}
          <path
            d="M 234.7 231.2 L 335.3 273.8 Q 350.0 280.0 335.3 286.2 L 234.7 328.8 Q 220.0 335.0 205.3 328.8 L 104.7 286.2 Q 90.0 280.0 104.7 273.8 L 205.3 231.2 Q 220.0 225.0 234.7 231.2 Z"
            fill="url(#database-top-grad)"
            stroke="rgba(132, 204, 22, 0.35)"
            strokeWidth="1.2"
          />

          {/* Specular Top Rim Highlight */}
          <path
            d="M 104.7 286.2 L 205.3 328.8 Q 220.0 335.0 234.7 328.8 L 335.3 286.2"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Clean White Label: Database */}
          <text
            x="294"
            y="323"
            transform="rotate(-23 294 323)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14.5"
            fontWeight="700"
            fontFamily="Inter, Outfit, sans-serif"
            letterSpacing="0.04em"
            className="iso-slab-label"
          >
            Database
          </text>
        </g>

        {/* ==================================================================
            3. LAYER 2: BACKEND SLAB (MIDDLE - THE GLOWING HERO CENTERPIECE)
            ================================================================== */}
        <g
          className={`iso-slab iso-slab--backend ${
            hoveredSlab === 'backend' || hoveredCard === 'backend' || activeCategory === 'backend'
              ? 'is-slab-lifted is-hero-focused'
              : ''
          }`}
          onMouseEnter={() => setHoveredSlab('backend')}
          onMouseLeave={() => setHoveredSlab(null)}
          onClick={() => onSelectCategory && onSelectCategory('backend')}
          filter="url(#backend-light-spill)"
        >
          {/* Ambient downward green light bleed */}
          <ellipse
            cx="220"
            cy="275"
            rx="110"
            ry="38"
            fill="#84cc16"
            opacity="0.32"
            filter="blur(14px)"
          />

          {/* Left Face */}
          <path
            d="M 104.7 188.8 Q 90.0 195.0 104.7 201.2 L 205.3 243.8 Q 220.0 250.0 220.0 250.5 L 220.0 282.0 L 205.3 275.8 L 104.7 233.2 Q 90.0 227.0 104.7 220.8 Z"
            fill="url(#backend-left-face)"
            stroke="#65a30d"
            strokeWidth="1"
          />

          {/* Right Face (Vibrant Neon Lime-Green with "Backend" text) */}
          <path
            d="M 220.0 250.5 Q 220.0 250.0 234.7 243.8 L 335.3 201.2 Q 350.0 195.0 335.3 188.8 L 335.3 220.8 Q 350.0 227.0 335.3 233.2 L 234.7 275.8 Q 220.0 282.0 220.0 282.0 Z"
            fill="url(#backend-right-face)"
            stroke="#bef264"
            strokeWidth="1.2"
          />

          {/* Top Face (Luminous Glass with Intense Inner Neon Glow) */}
          <path
            d="M 234.7 146.2 L 335.3 188.8 Q 350.0 195.0 335.3 201.2 L 234.7 243.8 Q 220.0 250.0 205.3 243.8 L 104.7 201.2 Q 90.0 195.0 104.7 188.8 L 205.3 146.2 Q 220.0 140.0 234.7 146.2 Z"
            fill="url(#backend-top-grad)"
            stroke="#bef264"
            strokeWidth="1.8"
          />

          {/* Specular Top Rim Neon Highlight */}
          <path
            d="M 104.7 201.2 L 205.3 243.8 Q 220.0 250.0 234.7 243.8 L 335.3 201.2"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* Crisp Bold White Label: Backend */}
          <text
            x="294"
            y="238"
            transform="rotate(-23 294 238)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="15.5"
            fontWeight="800"
            fontFamily="Inter, Outfit, sans-serif"
            letterSpacing="0.05em"
            className="iso-slab-label iso-slab-label--backend"
          >
            Backend
          </text>
        </g>

        {/* ==================================================================
            4. LAYER 1: FRONTEND SLAB (TOP)
            ================================================================== */}
        <g
          className={`iso-slab iso-slab--frontend ${
            hoveredSlab === 'frontend' || hoveredCard === 'frontend' || activeCategory === 'frontend'
              ? 'is-slab-lifted'
              : ''
          }`}
          onMouseEnter={() => setHoveredSlab('frontend')}
          onMouseLeave={() => setHoveredSlab(null)}
          onClick={() => onSelectCategory && onSelectCategory('frontend')}
          filter="url(#slab-drop-shadow)"
        >
          {/* Left Face */}
          <path
            d="M 104.7 103.8 Q 90.0 110.0 104.7 116.2 L 205.3 158.8 Q 220.0 165.0 220.0 165.5 L 220.0 197.0 L 205.3 190.8 L 104.7 148.2 Q 90.0 142.0 104.7 135.8 Z"
            fill="url(#dark-left-face)"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.8"
          />

          {/* Right Face (with Frontend label) */}
          <path
            d="M 220.0 165.5 Q 220.0 165.0 234.7 158.8 L 335.3 116.2 Q 350.0 110.0 335.3 103.8 L 335.3 135.8 Q 350.0 142.0 335.3 148.2 L 234.7 190.8 Q 220.0 197.0 220.0 197.0 Z"
            fill="url(#dark-right-face)"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.8"
          />

          {/* Top Face */}
          <path
            d="M 234.7 61.2 L 335.3 103.8 Q 350.0 110.0 335.3 116.2 L 234.7 158.8 Q 220.0 165.0 205.3 158.8 L 104.7 116.2 Q 90.0 110.0 104.7 103.8 L 205.3 61.2 Q 220.0 55.0 234.7 61.2 Z"
            fill="url(#dark-top-grad)"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
          />

          {/* Specular Top Rim Highlight */}
          <path
            d="M 104.7 116.2 L 205.3 158.8 Q 220.0 165.0 234.7 158.8 L 335.3 116.2"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Clean White Label: Frontend */}
          <text
            x="294"
            y="153"
            transform="rotate(-23 294 153)"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14.5"
            fontWeight="700"
            fontFamily="Inter, Outfit, sans-serif"
            letterSpacing="0.04em"
            className="iso-slab-label"
          >
            Frontend
          </text>
        </g>

        {/* ==================================================================
            5. TOP FLOATING UPRIGHT TRANSLUCENT GLASS CARD (</>)
            ================================================================== */}
        <g className="iso-floating-code-tablet" aria-label="Code Bracket Symbol">
          {/* Ambient soft shadow cast by floating card */}
          <ellipse
            cx="220"
            cy="70"
            rx="32"
            ry="12"
            fill="#000000"
            opacity="0.45"
            filter="blur(5px)"
          />

          {/* Upright Tilted Translucent Glass Tile */}
          <g transform="translate(182, 10)">
            {/* Glass Card Body */}
            <polygon
              points="14 8, 70 0, 62 58, 6 66"
              fill="url(#glass-tablet-face)"
              stroke="rgba(163, 230, 53, 0.7)"
              strokeWidth="1.6"
              filter="drop-shadow(0 6px 16px rgba(0, 0, 0, 0.6))"
            />

            {/* Specular Glass Sheen across top edge */}
            <line
              x1="14"
              y1="8"
              x2="70"
              y2="0"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeOpacity="0.8"
            />

            {/* Glowing Neon Lime-Green </> Symbol */}
            <g
              transform="translate(18, 16)"
              filter="url(#neon-glow-strong)"
            >
              {/* < bracket */}
              <polyline
                points="12 10, 4 19, 12 28"
                stroke="#a3e635"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* / slash */}
              <line
                x1="22"
                y1="8"
                x2="17"
                y2="30"
                stroke="#a3e635"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* > bracket */}
              <polyline
                points="27 10, 35 19, 27 28"
                stroke="#a3e635"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
