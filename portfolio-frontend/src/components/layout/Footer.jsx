import { navLinks, developer, socialLinks } from '../../data/portfolioData';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaHeart } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiCodeBracket, HiArrowUp } from 'react-icons/hi2';
import './Footer.css';

const iconMap = {
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedinIn,
  FaTwitter: FaXTwitter,
  FaEnvelope: FaEnvelope,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id="footer">
      {/* Gradient divider */}
      <div className="footer__divider" />

      <div className="container footer__grid">
        {/* Column 1 – Brand & Bio */}
        <div className="footer__brand-col">
          <a href="#home" className="footer__brand" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
            <span className="footer__brand-icon">
              <HiCodeBracket size={20} />
            </span>
            <span className="footer__brand-name">
              {developer.firstName}<span className="gradient-text">.dev</span>
            </span>
          </a>
          <p className="footer__bio">{developer.tagline}</p>

          {/* Status Badge */}
          <div className="footer__status">
            <span className="footer__status-dot" />
            <span>{developer.status}</span>
          </div>
        </div>

        {/* Column 2 – Quick Links */}
        <div className="footer__links-col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__link-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className="footer__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 – Connect */}
        <div className="footer__social-col">
          <h4 className="footer__heading">Connect</h4>
          <div className="footer__socials">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon] || FaGithub;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-btn"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
          <p className="footer__email">{developer.email}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom container">
        <p className="footer__copyright">
          &copy; {currentYear} {developer.firstName} {developer.lastName}. Built with
          <FaHeart size={14} className="footer__heart" />
          & MERN Stack
        </p>

        <button className="footer__scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          <HiArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
