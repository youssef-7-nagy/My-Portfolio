import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { navLinks, developer } from '../../data/portfolioData';
import { Moon, Sun, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import yLogo from '../../assets/logos/y.png';
import './Navbar.css';

const editorialNavLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ splashActive = false }) {
  const {
    theme,
    toggleTheme,
    activeSection,
    navigateToSection,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);

  // Track scroll position to adjust background and dimensions
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  const handleNavClick = (e, link) => {
    if (e) e.preventDefault();
    closeMobileMenu();
    navigateToSection(link.id);
    setClickedSection(link.id);
    setTimeout(() => {
      setClickedSection((curr) => (curr === link.id ? null : curr));
    }, 450);

    const target = document.querySelector(link.href);
    if (target) {
      const navEl = document.getElementById('navbar');
      const offset = navEl ? navEl.offsetHeight : 70;
      const elementTop = target.getBoundingClientRect().top + window.scrollY;
      const targetPosition = link.id === 'home' ? 0 : Math.max(0, elementTop - offset + 8);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <nav className="navbar__inner container">
          {/* Left: Brand & Logo */}
          <a
            href="#home"
            className="navbar__brand"
            onClick={(e) => handleNavClick(e, { id: 'home', href: '#home' })}
          >
            {/*
              The logo class controls CSS visibility (not opacity).
              The SplashScreen JS also sets inline visibility:hidden during the
              flight so getBoundingClientRect() returns accurate measurements
              without the logo ever being visually painted over the splash.
            */}
            <img
              id="navbar-target-logo"
              data-navbar-logo="true"
              src={yLogo}
              alt={`${developer.firstName} ${developer.lastName} Logo`}
              width="65"
              height="46"
              className={`navbar__logo-icon ${splashActive ? 'navbar__logo-icon--hidden' : 'navbar__logo-icon--visible'}`}
            />
            {/* Brand text: hidden with no transition during splash, then slides in */}
            <span
              className={`navbar__brand-text ${splashActive ? 'navbar__brand-text--hidden' : 'navbar__brand-text--visible'}`}
            >
              youssef<span className="navbar__brand-dot">.dev</span>
              <span className="navbar__brand-sup">®</span>
            </span>
          </a>

          {/* Center: Developer Code-Bracket Navigation Links */}
          <ul className="navbar__links navbar__links--center" role="menubar">
            {editorialNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              const isClicked = clickedSection === link.id;
              return (
                <li key={link.id} role="none" className="navbar__item">
                  <a
                    href={link.href}
                    role="menuitem"
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''} ${isClicked ? 'navbar__link--clicked' : ''}`}
                    onClick={(e) => handleNavClick(e, link)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Opening Code Bracket: < */}
                    <span className="navbar__bracket navbar__bracket--open" aria-hidden="true">
                      &lt;
                    </span>

                    {/* Section Label */}
                    <span className="navbar__link-label">{link.label}</span>

                    {/* Closing Code Bracket: /> */}
                    <span className="navbar__bracket navbar__bracket--close" aria-hidden="true">
                      /&gt;
                    </span>

                    {/* Animated Neon Underline Indicator */}
                    {isActive && <span className="navbar__active-indicator" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Quick Theme Toggle & Minimalist Hamburger Menu */}
          <div className="navbar__right-actions">
            <button
              className="navbar__quick-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              className={`navbar__minimal-menu-btn ${mobileMenuOpen ? 'navbar__minimal-menu-btn--open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              title="Menu"
            >
              <span className="navbar__minimal-line navbar__minimal-line--top" />
              <span className="navbar__minimal-line navbar__minimal-line--bottom" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Architectural Navigation Overlay (Matched to Reference Design) */}
      <div
        className={`navbar-drawer ${mobileMenuOpen ? 'navbar-drawer--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Deep ambient backdrop */}
        <div className="navbar-drawer__backdrop" onClick={closeMobileMenu} />

        {/* Faint Architectural Grid with (+) Crossings */}
        <div className="navbar-drawer__grid" aria-hidden="true">
          <div className="drawer-grid-line drawer-grid-line--v1" />
          <div className="drawer-grid-line drawer-grid-line--v2" />
          <div className="drawer-grid-line drawer-grid-line--v3" />
          <div className="drawer-grid-line drawer-grid-line--h1" />
          <div className="drawer-grid-line drawer-grid-line--h2" />
        </div>

        {/* Overlay Content Container */}
        <div className="navbar-drawer__container">
          {/* Top Bar with Brand & Close Button */}
          <div className="navbar-drawer__header">
            <span className="navbar-drawer__brand-title">
              youssef.dev<span>®</span>
            </span>
            <button
              className="navbar-drawer__close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Huge Typography Navigation Links with '+' Indicators */}
          <div className="navbar-drawer__nav-wrap">
            <nav className="navbar-drawer__nav" role="navigation">
              <ul className="navbar-drawer__links">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.id} className="navbar-drawer__item">
                      <a
                        href={link.href}
                        className={`navbar-drawer__link ${isActive ? 'navbar-drawer__link--active' : ''}`}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        <span className="navbar-drawer__label">{link.label}</span>
                        <span className="navbar-drawer__plus" aria-hidden="true">
                          {isActive ? '•' : '+'}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom Bar Info & Socials */}
          <div className="navbar-drawer__footer">
            <div className="navbar-drawer__status">
              <span className="navbar-drawer__status-dot" />
              Available for work &bull; ©2026
            </div>

            <div className="navbar-drawer__socials">
              <a
                href="https://github.com/youssef-7-nagy"
                target="_blank"
                rel="noreferrer"
                className="navbar-drawer__social-btn"
                aria-label="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="navbar-drawer__social-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="navbar-drawer__social-btn"
                aria-label="Twitter / X"
              >
                <FaTwitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
