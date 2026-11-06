import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { navLinks, developer } from '../../data/portfolioData';
import { Moon, Sun, ArrowUpRight, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import yLogo from '../../assets/logos/y.png';
import './Navbar.css';

const editorialNavLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Service', href: '#services' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ splashActive = false }) {
  const { theme, toggleTheme, activeSection, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);

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

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMobileMenu();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
        <nav className="navbar__inner container">
          {/* Left: Brand & Logo */}
          <a href="#home" className="navbar__brand" onClick={(e) => handleNavClick(e, '#home')}>
            <img
              id="navbar-target-logo"
              data-navbar-logo="true"
              src={yLogo}
              alt={`${developer.firstName} ${developer.lastName} Logo`}
              width="53"
              height="38"
              className={`navbar__logo-icon ${splashActive ? 'navbar__logo-icon--hidden' : 'navbar__logo-icon--visible'}`}
            />
            <span className={`navbar__brand-text ${splashActive ? 'navbar__brand-text--hidden' : 'navbar__brand-text--visible'}`}>
              youssef<span className="navbar__brand-dot">.dev</span>
              <span className="navbar__brand-sup">®</span>
            </span>
          </a>

          {/* Center: Minimalist Navigation Links */}
          <ul className="navbar__links navbar__links--center" role="menubar">
            {editorialNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                    {isActive && <span className="navbar__active-dot" />}
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

      {/* Slide-out Editorial Navigation Drawer */}
      <div className={`navbar-drawer ${mobileMenuOpen ? 'navbar-drawer--open' : ''}`} aria-hidden={!mobileMenuOpen}>
        {/* Backdrop */}
        <div className="navbar-drawer__backdrop" onClick={closeMobileMenu} />

        {/* Panel */}
        <aside className="navbar-drawer__panel">
          <div className="navbar-drawer__header">
            <span className="navbar-drawer__brand-title">
              youssef.dev<span>®</span>
            </span>
            <button
              className="navbar-drawer__close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Large Editorial Nav Links */}
          <ul className="navbar-drawer__links">
            {navLinks.map((link, idx) => {
              const numStr = String(idx + 1).padStart(2, '0');
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="navbar-drawer__item">
                  <a
                    href={link.href}
                    className={`navbar-drawer__link ${isActive ? 'navbar-drawer__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span className="navbar-drawer__num">{numStr}</span>
                    <span className="navbar-drawer__label">{link.label}</span>
                    <ArrowUpRight size={18} className="navbar-drawer__arrow" />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Drawer Footer info */}
          <div className="navbar-drawer__footer">
            <div className="navbar-drawer__status">
              <span className="navbar-drawer__status-dot" />
              Available for work
            </div>

            <div className="navbar-drawer__contact">
              <span className="navbar-drawer__contact-label">Get in touch</span>
              <a href={`mailto:${developer.email}`} className="navbar-drawer__email">
                {developer.email}
              </a>
            </div>

            {/* Social Icons & Theme Button */}
            <div className="navbar-drawer__actions-row">
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

              <button
                className="navbar-drawer__theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
