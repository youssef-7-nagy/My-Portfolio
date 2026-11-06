import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { navLinks, developer } from '../../data/portfolioData';
import { Moon, Sun } from 'lucide-react';
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
        {/* Left: Brand title / logo */}
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
            Portfoliob<span className="navbar__brand-dot">®</span>
          </span>
        </a>

        {/* Center: Navigation Links ("Home", "About", "Service", "Contact") */}
        <ul className="navbar__links navbar__links--center">
          {editorialNavLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Minimalist Hamburger Menu (Two Horizontal Lines) */}
        <div className="navbar__right-actions">
          <button
            className="navbar__minimal-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            title="Menu"
          >
            <span className="navbar__minimal-line" />
            <span className="navbar__minimal-line" />
          </button>
        </div>
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
