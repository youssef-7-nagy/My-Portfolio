import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { navLinks, developer } from '../../data/portfolioData';
import { Moon, Sun, Menu, X } from 'lucide-react';
import yLogo from '../../assets/logos/y.png';
import './Navbar.css';

export default function Navbar({ splashActive = false }) {
  const { theme, toggleTheme, activeSection, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMobileMenu();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <nav className="navbar__inner container">
        {/* Brand */}
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
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
                <span className="navbar__link-indicator" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className="navbar__theme-icon">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </span>
          </button>
          <a href="#contact" className="btn btn-primary navbar__cta" onClick={(e) => handleNavClick(e, '#contact')}>
            Let&rsquo;s Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="navbar__mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileMenuOpen ? 'navbar__mobile--open' : ''}`}>
        <div className="navbar__mobile-backdrop" onClick={closeMobileMenu} />
        <div className="navbar__mobile-sheet glass">
          <ul className="navbar__mobile-links">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <a
                  href={link.href}
                  className={`navbar__mobile-link ${activeSection === link.id ? 'navbar__mobile-link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-actions">
            <button className="navbar__theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <a href="#contact" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#contact')} style={{ width: '100%', justifyContent: 'center' }}>
              Let&rsquo;s Talk
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
