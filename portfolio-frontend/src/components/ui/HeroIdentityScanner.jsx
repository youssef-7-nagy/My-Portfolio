import { useState, useEffect } from 'react';
import './HeroIdentityScanner.css';

/**
 * HeroIdentityScanner
 * High-Tech Holographic Laser-Scan Identity Component
 * 
 * Features:
 * - Dynamic letter synthesis with staggered illumination
 * - Scanline linear grating mask overlay
 * - Chromatic sweeping radial beam optics (Yellow, Crimson, Cyan, Emerald, Sapphire)
 * - Interactive role switching that represents Youssef Nagy's developer persona
 */
const ROLES = [
  { id: 'mern', label: 'MERN Stack', text: 'MERN STACK DEVELOPER', tag: 'Mongo • Express • React • Node' },
  { id: 'fullstack', label: 'Full-Stack', text: 'FULL STACK ARCHITECT', tag: 'Scalable Systems & APIs' },
  { id: 'react', label: 'React & Node', text: 'REACT & NODE SPECIALIST', tag: 'High-Performance Web Apps' },
  { id: 'identity', label: 'Youssef Nagy', text: 'YOUSSEF NAGY', tag: 'Creative Code Craftsman' },
];

export default function HeroIdentityScanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through identities every 4.8 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROLES.length);
    }, 4800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentRole = ROLES[activeIndex];
  const letters = currentRole.text.split('');

  return (
    <div 
      className="cyber-scanner-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Developer Identity Hologram Scanner"
    >
      {/* Top HUD Header */}
      <div className="cyber-scanner-header">
        <div className="cyber-scanner-status">
          <span className="cyber-scanner-dot" />
          <span>STATUS // IDENTITY_SCAN</span>
        </div>

        {/* Interactive Identity Filter Pills */}
        <div className="cyber-role-pills" role="tablist">
          {ROLES.map((role, idx) => (
            <button
              key={role.id}
              role="tab"
              aria-selected={activeIndex === idx}
              className={`cyber-role-pill ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hologram Laser Scanner Body */}
      <div className="cyber-scanner-body">
        <div className="cyber-loader-wrapper" key={currentRole.id}>
          {letters.map((char, index) => {
            const isSpace = char === ' ';
            const delay = `${(0.08 + index * 0.085).toFixed(3)}s`;

            return (
              <span
                key={`${currentRole.id}-${index}`}
                className={`cyber-letter ${isSpace ? 'cyber-space' : ''}`}
                style={isSpace ? undefined : { animationDelay: delay }}
              >
                {isSpace ? '\u00A0' : char}
              </span>
            );
          })}

          {/* Grating scanlines & sweeping chromatic radial beam */}
          <div className="cyber-scanner-grating" aria-hidden="true" />
        </div>
      </div>

      {/* Cybernetic Footer Info */}
      <div className="cyber-scanner-footer">
        <div className="cyber-tagline">
          <span className="cyber-tagline-icon">⚡</span>
          <span>{currentRole.tag}</span>
        </div>
        <div className="cyber-signature">
          LOC // EGYPT • OPEN TO WORK
        </div>
      </div>
    </div>
  );
}

