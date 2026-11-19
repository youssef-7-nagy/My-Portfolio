import { useState, useRef } from 'react';
import './IsometricStack3D.css';

/**
 * High-End 3D Technical Stack Visualization
 * Recreates the exact 3-tier floating glassmorphic architecture:
 * 1. Base Platform with mint-teal glowing rim & realistic contact shadows
 * 2. Bottom Layer: Database (Smoked obsidian glass with 3D cylinder icon)
 * 3. Middle Layer: Backend (Luminous emerald-green centerpiece with radiant inner glow)
 * 4. Top Layer: Frontend (Smoked obsidian glass with desktop monitor icon)
 * 5. Floating Tilted Glass Code Panel with 3D glowing </> bracket
 * 6. True 3D Orbital Rings with floating glowing node spheres
 * 7. Interactive 3D mouse parallax tilt & slab hover-lift
 */
export default function IsometricStack3D({
  activeCategory,
  onSelectCategory,
  hoveredCard
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSlab, setHoveredSlab] = useState(null);

  // Smooth mouse parallax tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Subtle 3D tilt: max ~6 deg pitch and yaw
    setTilt({
      x: -y * 8, // pitch (tilt up/down)
      y: x * 10  // yaw (tilt left/right)
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setHoveredSlab(null);
  };

  // Center coordinate of the stack
  const cx = 260;

  return (
    <div
      ref={containerRef}
      className="iso-stack-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="3D Technical Architecture Ecosystem - Frontend, Backend, Database"
    >
      <div
        className="iso-stack-scene"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)'
            : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <svg
          className="iso-stack-svg"
          viewBox="0 0 520 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* --------------------------------------------------------------
                1. NEON GLOW & DROP SHADOW FILTERS
                -------------------------------------------------------------- */}
            <filter id="emerald-glow-strong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="emerald-glow-subtle" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="backend-light-spill" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#10b981" floodOpacity="0.48" />
              <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.55" />
            </filter>

            <filter id="slab-drop-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000000" floodOpacity="0.65" />
            </filter>

            <filter id="screen-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#10b981" floodOpacity="0.32" />
              <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000000" floodOpacity="0.45" />
            </filter>

            <filter id="sphere-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#34d399" floodOpacity="0.8" />
            </filter>

            {/* --------------------------------------------------------------
                2. COLOR GRADIENTS FOR SLABS (METALLIC OBSIDIAN & EMERALD GLASS)
                -------------------------------------------------------------- */}
            {/* Top Face: Smoked Obsidian Glass (Frontend & Base) */}
            <linearGradient id="dark-top-grad" x1="140" y1="110" x2="380" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#243447" stopOpacity="0.96" />
              <stop offset="45%" stopColor="#172230" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0d141e" stopOpacity="0.98" />
            </linearGradient>

            {/* Front-Left Face: Dark Smoked Glass */}
            <linearGradient id="dark-left-face" x1="140" y1="140" x2="260" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f1722" />
              <stop offset="100%" stopColor="#070c12" />
            </linearGradient>

            {/* Front-Right Face: Smoked Glass catching subtle cyan reflection */}
            <linearGradient id="dark-right-face" x1="260" y1="180" x2="380" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a2736" />
              <stop offset="100%" stopColor="#0f1822" />
            </linearGradient>

            {/* Database Top Face: Catches intense emerald sheen from Backend above */}
            <linearGradient id="database-top-grad" x1="260" y1="280" x2="260" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e3a2e" stopOpacity="0.98" />
              <stop offset="25%" stopColor="#132720" stopOpacity="0.96" />
              <stop offset="70%" stopColor="#0f1722" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#080d14" stopOpacity="0.98" />
            </linearGradient>

            {/* --------------------------------------------------------------
                3. BACKEND CENTERPIECE GRADIENTS (LUMINOUS EMERALD VOLUMETRIC GLASS)
                -------------------------------------------------------------- */}
            <linearGradient id="backend-top-grad" x1="140" y1="190" x2="380" y2="270" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#34d399" stopOpacity="0.92" />
              <stop offset="75%" stopColor="#10b981" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.96" />
            </linearGradient>

            <linearGradient id="backend-right-face" x1="260" y1="270" x2="380" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="backend-left-face" x1="140" y1="230" x2="260" y2="270" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* --------------------------------------------------------------
                4. FLOATING CODE SCREEN & SPHERE GRADIENTS
                -------------------------------------------------------------- */}
            <linearGradient id="code-screen-glass" x1="0" y1="0" x2="104" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.92" />
              <stop offset="40%" stopColor="#111c26" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#081018" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="code-screen-border" x1="0" y1="0" x2="104" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>

            {/* 3D Sphere Radial Highlight */}
            <radialGradient id="sphere-grad" cx="35%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#6ee7b7" />
              <stop offset="65%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>

            {/* Base Shadow & Ambient Floor Reflection */}
            <radialGradient id="floor-shadow-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
              <stop offset="35%" stopColor="#047857" stopOpacity="0.14" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ================================================================
              LAYER 0: GROUND CONTACT SHADOW & AMBIENT FLOOR AURA
              ================================================================ */}
          <g className="iso-ground-shadows">
            {/* Soft wide ambient floor shadow */}
            <ellipse
              cx={cx}
              cy="436"
              rx="185"
              ry="48"
              fill="#000000"
              opacity="0.16"
              filter="blur(22px)"
            />
            {/* Emerald ambient floor bounce */}
            <ellipse
              cx={cx}
              cy="432"
              rx="155"
              ry="38"
              fill="url(#floor-shadow-radial)"
              filter="blur(18px)"
            />
            {/* Crisp contact shadow right under the base plate */}
            <ellipse
              cx={cx}
              cy="428"
              rx="132"
              ry="32"
              fill="#000000"
              opacity="0.45"
              filter="blur(8px)"
            />
          </g>

          {/* ================================================================
              LAYER 1: BACK SEGMENTS OF 3D ORBITAL RINGS (BEHIND STACK)
              ================================================================ */}
          <g className="iso-orbit-back" aria-hidden="true">
            {/* Upper Orbital Ring - Back Half */}
            <g transform={`translate(${cx}, 140) rotate(-18)`}>
              <path
                d="M -195 0 A 195 62 0 0 1 195 0"
                className="iso-orbit-path iso-orbit-path--back"
              />
            </g>

            {/* Lower Orbital Ring - Back Half */}
            <g transform={`translate(${cx}, 305) rotate(18)`}>
              <path
                d="M -210 0 A 210 66 0 0 1 210 0"
                className="iso-orbit-path iso-orbit-path--back"
              />
            </g>
          </g>

          {/* ================================================================
              LAYER 2: BASE GROUNDING PLATFORM
              ================================================================ */}
          <g className="iso-base-platform">
            {/* Base Plate: Left Face */}
            <path
              d={`M ${cx - 14} 433 Q ${cx} 437, ${cx + 14} 433 L ${cx + 116} 401 Q ${cx + 130} 395, ${cx + 130} 401 L ${cx + 130} 415 Q ${cx + 130} 409, ${cx + 116} 415 L ${cx + 14} 447 Q ${cx} 451, ${cx - 14} 447 Z`}
              fill="#0c131c"
            />
            {/* Base Plate: Right Face with Glowing Mint-Teal Rim */}
            <path
              d={`M ${cx - 14} 433 Q ${cx} 437, ${cx - 14} 433 L ${cx - 116} 401 Q ${cx - 130} 395, ${cx - 130} 401 L ${cx - 130} 415 Q ${cx - 130} 409, ${cx - 116} 415 L ${cx - 14} 447 Q ${cx} 451, ${cx - 14} 447 Z`}
              fill="#080c12"
            />
            {/* Base Plate: Top Face */}
            <path
              d={`M ${cx - 14} 363 Q ${cx} 359, ${cx + 14} 363 L ${cx + 116} 395 Q ${cx + 130} 401, ${cx + 116} 407 L ${cx + 14} 439 Q ${cx} 443, ${cx - 14} 439 L ${cx - 116} 407 Q ${cx - 130} 401, ${cx - 116} 395 Z`}
              fill="url(#dark-top-grad)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="0.8"
            />
            {/* Glowing Mint-Teal Perimeter Stroke along Base Plate Bottom Edge */}
            <path
              d={`M ${cx - 130} 401 L ${cx - 116} 415 L ${cx} 451 L ${cx + 116} 415 L ${cx + 130} 401`}
              stroke="#2dd4bf"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#emerald-glow-subtle)"
            />
          </g>

          {/* ================================================================
              LAYER 3: DATABASE SLAB (BOTTOM)
              ================================================================ */}
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
              d={`M ${cx - 14} 350 Q ${cx} 354, ${cx} 354 L ${cx - 106} 318 Q ${cx - 120} 312, ${cx - 120} 318 L ${cx - 120} 350 Q ${cx - 120} 344, ${cx - 106} 350 L ${cx - 14} 386 Q ${cx} 390, ${cx - 14} 386 Z`}
              fill="url(#dark-left-face)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.8"
            />

            {/* Right Face (with Database Icon & Label) */}
            <path
              d={`M ${cx} 354 Q ${cx} 354, ${cx + 14} 350 L ${cx + 106} 318 Q ${cx + 120} 312, ${cx + 106} 318 L ${cx + 120} 346 Q ${cx + 120} 352, ${cx + 106} 352 L ${cx + 14} 384 Q ${cx} 390, ${cx} 390 Z`}
              fill="url(#dark-right-face)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.8"
            />

            {/* Top Face (catching neon green reflection from Backend) */}
            <path
              d={`M ${cx - 14} 276 Q ${cx} 272, ${cx + 14} 276 L ${cx + 106} 312 Q ${cx + 120} 318, ${cx + 106} 324 L ${cx + 14} 356 Q ${cx} 360, ${cx - 14} 356 L ${cx - 106} 324 Q ${cx - 120} 318, ${cx - 106} 312 Z`}
              fill="url(#database-top-grad)"
              stroke="rgba(52, 211, 153, 0.4)"
              strokeWidth="1.2"
            />

            {/* Specular Top Rim Highlight */}
            <path
              d={`M ${cx - 106} 324 L ${cx} 360 L ${cx + 106} 324`}
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Front-Right Face: Database Cylinder Icon + Text Label */}
            <g transform={`rotate(-19.3 ${cx + 60} 355)`}>
              {/* 3-Tier Database Cylinder Icon */}
              <g transform={`translate(${cx + 18}, 346)`}>
                {/* Top Disk */}
                <ellipse cx="7" cy="3" rx="6.5" ry="2.2" stroke="#ffffff" strokeWidth="1.2" fill="rgba(45, 212, 191, 0.3)" />
                {/* Middle Disk */}
                <path d="M 0.5 6.5 A 6.5 2.2 0 0 0 13.5 6.5" stroke="#ffffff" strokeWidth="1.2" fill="none" />
                {/* Bottom Disk */}
                <path d="M 0.5 10 A 6.5 2.2 0 0 0 13.5 10" stroke="#ffffff" strokeWidth="1.2" fill="none" />
                {/* Side Edges */}
                <line x1="0.5" y1="3" x2="0.5" y2="10" stroke="#ffffff" strokeWidth="1.2" />
                <line x1="13.5" y1="3" x2="13.5" y2="10" stroke="#ffffff" strokeWidth="1.2" />
              </g>

              {/* Text Label: Database */}
              <text
                x={cx + 38}
                y="357"
                fill="#FFFFFF"
                fontSize="13.5"
                fontWeight="700"
                fontFamily="Inter, Outfit, sans-serif"
                letterSpacing="0.03em"
                className="iso-slab-label"
              >
                Database
              </text>
            </g>
          </g>

          {/* ================================================================
              LAYER 4: BACKEND SLAB (MIDDLE - THE LUMINOUS HERO CENTERPIECE)
              ================================================================ */}
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
            {/* Volumetric downward emerald light bleed */}
            <ellipse
              cx={cx}
              cy="295"
              rx="120"
              ry="42"
              fill="#10b981"
              opacity="0.38"
              filter="blur(16px)"
            />

            {/* Left Face */}
            <path
              d={`M ${cx - 14} 264 Q ${cx} 268, ${cx} 268 L ${cx - 106} 232 Q ${cx - 120} 226, ${cx - 120} 232 L ${cx - 120} 264 Q ${cx - 120} 258, ${cx - 106} 264 L ${cx - 14} 300 Q ${cx} 304, ${cx - 14} 300 Z`}
              fill="url(#backend-left-face)"
              stroke="#047857"
              strokeWidth="1"
            />

            {/* Right Face (Translucent Glowing Emerald Surface) */}
            <path
              d={`M ${cx} 268 Q ${cx} 268, ${cx + 14} 264 L ${cx + 106} 232 Q ${cx + 120} 226, ${cx + 106} 232 L ${cx + 120} 260 Q ${cx + 120} 266, ${cx + 106} 266 L ${cx + 14} 298 Q ${cx} 304, ${cx} 304 Z`}
              fill="url(#backend-right-face)"
              stroke="#6ee7b7"
              strokeWidth="1.2"
            />

            {/* Top Face (Luminous Glass with Volumetric Glow) */}
            <path
              d={`M ${cx - 14} 190 Q ${cx} 186, ${cx + 14} 190 L ${cx + 106} 226 Q ${cx + 120} 232, ${cx + 106} 238 L ${cx + 14} 270 Q ${cx} 274, ${cx - 14} 270 L ${cx - 106} 238 Q ${cx - 120} 232, ${cx - 106} 226 Z`}
              fill="url(#backend-top-grad)"
              stroke="#a7f3d0"
              strokeWidth="1.8"
            />

            {/* Specular Top Rim Neon Highlight */}
            <path
              d={`M ${cx - 106} 238 L ${cx} 274 L ${cx + 106} 238`}
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeOpacity="0.95"
              strokeLinecap="round"
              fill="none"
              filter="url(#emerald-glow-subtle)"
            />

            {/* Front-Right Face: Server Stack Icon + Bold Text Label */}
            <g transform={`rotate(-19.3 ${cx + 60} 269)`}>
              {/* 3-Tier Server/Database Icon */}
              <g transform={`translate(${cx + 18}, 260)`}>
                {/* Top Disk */}
                <ellipse cx="7" cy="3" rx="6.5" ry="2.2" stroke="#ffffff" strokeWidth="1.3" fill="rgba(255, 255, 255, 0.45)" />
                {/* Middle Disk */}
                <path d="M 0.5 6.5 A 6.5 2.2 0 0 0 13.5 6.5" stroke="#ffffff" strokeWidth="1.3" fill="none" />
                {/* Bottom Disk */}
                <path d="M 0.5 10 A 6.5 2.2 0 0 0 13.5 10" stroke="#ffffff" strokeWidth="1.3" fill="none" />
                {/* Side Edges */}
                <line x1="0.5" y1="3" x2="0.5" y2="10" stroke="#ffffff" strokeWidth="1.3" />
                <line x1="13.5" y1="3" x2="13.5" y2="10" stroke="#ffffff" strokeWidth="1.3" />
              </g>

              {/* Bold Crisp White Label: Backend */}
              <text
                x={cx + 38}
                y="271"
                fill="#FFFFFF"
                fontSize="14.5"
                fontWeight="800"
                fontFamily="Inter, Outfit, sans-serif"
                letterSpacing="0.04em"
                className="iso-slab-label iso-slab-label--backend"
              >
                Backend
              </text>
            </g>
          </g>

          {/* ================================================================
              LAYER 5: FRONTEND SLAB (TOP)
              ================================================================ */}
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
              d={`M ${cx - 14} 178 Q ${cx} 182, ${cx} 182 L ${cx - 106} 146 Q ${cx - 120} 140, ${cx - 120} 146 L ${cx - 120} 178 Q ${cx - 120} 172, ${cx - 106} 178 L ${cx - 14} 214 Q ${cx} 218, ${cx - 14} 214 Z`}
              fill="url(#dark-left-face)"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.8"
            />

            {/* Right Face (with Frontend desktop icon & label) */}
            <path
              d={`M ${cx} 182 Q ${cx} 182, ${cx + 14} 178 L ${cx + 106} 146 Q ${cx + 120} 140, ${cx + 106} 146 L ${cx + 120} 174 Q ${cx + 120} 180, ${cx + 106} 180 L ${cx + 14} 212 Q ${cx} 218, ${cx} 218 Z`}
              fill="url(#dark-right-face)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.8"
            />

            {/* Top Face */}
            <path
              d={`M ${cx - 14} 104 Q ${cx} 100, ${cx + 14} 104 L ${cx + 106} 140 Q ${cx + 120} 146, ${cx + 106} 152 L ${cx + 14} 184 Q ${cx} 188, ${cx - 14} 184 L ${cx - 106} 152 Q ${cx - 120} 146, ${cx - 106} 140 Z`}
              fill="url(#dark-top-grad)"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="1.2"
            />

            {/* Specular Top Rim Highlight */}
            <path
              d={`M ${cx - 106} 152 L ${cx} 188 L ${cx + 106} 152`}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />

            {/* Front-Right Face: Desktop Monitor Icon + Text Label */}
            <g transform={`rotate(-19.3 ${cx + 60} 183)`}>
              {/* Desktop Monitor Icon with Stand */}
              <g transform={`translate(${cx + 18}, 174)`}>
                {/* Monitor Frame */}
                <rect x="0" y="0" width="15" height="10" rx="1.8" stroke="#ffffff" strokeWidth="1.2" fill="rgba(255, 255, 255, 0.2)" />
                {/* Neck */}
                <line x1="7.5" y1="10" x2="7.5" y2="13" stroke="#ffffff" strokeWidth="1.2" />
                {/* Base */}
                <line x1="4" y1="13" x2="11" y2="13" stroke="#ffffff" strokeWidth="1.2" />
              </g>

              {/* Text Label: Frontend */}
              <text
                x={cx + 38}
                y="185"
                fill="#FFFFFF"
                fontSize="13.5"
                fontWeight="700"
                fontFamily="Inter, Outfit, sans-serif"
                letterSpacing="0.03em"
                className="iso-slab-label"
              >
                Frontend
              </text>
            </g>
          </g>

          {/* ================================================================
              LAYER 6: FLOATING TILTED GLASS CODE SCREEN (</>)
              ================================================================ */}
          <g className="iso-floating-screen-wrapper">
            {/* Ambient soft shadow cast by floating screen onto top slab */}
            <ellipse
              cx={cx}
              cy="104"
              rx="46"
              ry="14"
              fill="#000000"
              opacity="0.45"
              filter="blur(6px)"
            />

            {/* Tilted Glass Screen Assembly */}
            <g
              className="iso-floating-screen"
              transform={`translate(${cx}, 52) rotate(-12) skewX(-7)`}
            >
              {/* Glass Screen Plate */}
              <rect
                x="-52"
                y="-44"
                width="104"
                height="88"
                rx="18"
                fill="url(#code-screen-glass)"
                stroke="url(#code-screen-border)"
                strokeWidth="1.8"
                filter="url(#screen-glow)"
              />

              {/* Specular Top Rim Gloss Line */}
              <path
                d="M -44 -43 L 38 -43"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />

              {/* Glowing Neon Emerald </> Code Bracket Glyph */}
              <g filter="url(#emerald-glow-strong)">
                {/* < bracket */}
                <path
                  d="M -16 -12 L -28 0 L -16 12"
                  stroke="#34d399"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                {/* / slash */}
                <line
                  x1="7"
                  y1="-16"
                  x2="-3"
                  y2="16"
                  stroke="#34d399"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* > bracket */}
                <path
                  d="M 16 -12 L 28 0 L 16 12"
                  stroke="#34d399"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>

              {/* 3D Tactile Bevel Highlight Overlay */}
              <g opacity="0.65">
                <path
                  d="M -15 -11 L -27 0 L -15 11"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <line
                  x1="7.5"
                  y1="-15"
                  x2="-2"
                  y2="15"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M 17 -11 L 27 0 L 17 11"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            </g>
          </g>

          {/* ================================================================
              LAYER 7: FRONT SEGMENTS OF 3D ORBITAL RINGS & GLOWING NODE SPHERES
              Passing gracefully in front of the 3D stack
              ================================================================ */}
          <g className="iso-orbit-front" aria-hidden="true">
            {/* Upper Orbital Ring - Front Half */}
            <g transform={`translate(${cx}, 140) rotate(-18)`}>
              <path
                d="M 195 0 A 195 62 0 0 1 -195 0"
                className="iso-orbit-path iso-orbit-path--front"
              />
            </g>

            {/* Lower Orbital Ring - Front Half */}
            <g transform={`translate(${cx}, 305) rotate(18)`}>
              <path
                d="M 210 0 A 210 66 0 0 1 -210 0"
                className="iso-orbit-path iso-orbit-path--front"
              />
            </g>

            {/* Glowing Emerald Spherical Nodes along the orbits */}
            {/* Sphere 1: Upper orbit left */}
            <g className="iso-orbit-sphere sphere--1" transform="translate(105, 125)">
              <circle cx="0" cy="0" r="11" fill="#10b981" opacity="0.35" filter="blur(5px)" />
              <circle cx="0" cy="0" r="7.5" fill="url(#sphere-grad)" />
            </g>

            {/* Sphere 2: Upper orbit right */}
            <g className="iso-orbit-sphere sphere--2" transform="translate(415, 160)">
              <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0.35" filter="blur(5px)" />
              <circle cx="0" cy="0" r="6.5" fill="url(#sphere-grad)" />
            </g>

            {/* Sphere 3: Lower orbit front-left */}
            <g className="iso-orbit-sphere sphere--3" transform="translate(175, 360)">
              <circle cx="0" cy="0" r="12" fill="#10b981" opacity="0.4" filter="blur(6px)" />
              <circle cx="0" cy="0" r="8" fill="url(#sphere-grad)" />
            </g>

            {/* Sphere 4: Lower orbit right */}
            <g className="iso-orbit-sphere sphere--4" transform="translate(405, 285)">
              <circle cx="0" cy="0" r="10" fill="#10b981" opacity="0.35" filter="blur(5px)" />
              <circle cx="0" cy="0" r="6.5" fill="url(#sphere-grad)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
