import { useState, useEffect, useRef } from 'react';
import { developer } from '../../data/portfolioData';
import {
  Check,
  Copy
} from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  // Intersection Observer for scroll entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(developer.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`section contact-section ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Background Decorative Mesh Glow */}
      <div className="contact-bg-glow contact-bg-glow--left" aria-hidden="true" />
      <div className="contact-bg-glow contact-bg-glow--right" aria-hidden="true" />

      <div className="container contact-container">
        {/* Section Header */}
        <div className="contact-header">
          <h2 className="section-title">
            Let&rsquo;s Build Something <span className="gradient-text">Great Together.</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a junior full-stack opportunity, or want to say hello?
            My inbox is always open.
          </p>
        </div>

        {/* Main Contact Experience: Direct Channels & Interactive Social Radar */}
        <div className="contact-main-grid contact-main-grid--single">
          {/* Direct Channels & Interactive Social Radar */}
          <div className="contact-channels-column">
            {/* Direct Cards List */}
            <div className="direct-cards-list">
              {/* Email Card with One-Click Copy */}
              <div className="direct-contact-card">
                <div className="direct-card-main">
                  <div className="direct-card-icon direct-card-icon--email">
                    <FaEnvelope size={18} />
                  </div>
                  <div className="direct-card-info">
                    <span className="direct-card-tag">Direct Email</span>
                    <a
                      href={`mailto:${developer.email}`}
                      className="direct-card-link"
                      title="Open in email client"
                    >
                      {developer.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  className={`copy-btn ${copiedEmail ? 'copy-btn--copied' : ''}`}
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* WhatsApp Card */}
              <a
                href={developer.whatsappUrl || 'https://wa.me/201275675022'}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-contact-card direct-contact-card--interactive"
              >
                <div className="direct-card-main">
                  <div className="direct-card-icon direct-card-icon--whatsapp">
                    <FaWhatsapp size={20} />
                  </div>
                  <div className="direct-card-info">
                    <span className="direct-card-tag">WhatsApp</span>
                    <span className="direct-card-link">01275675022</span>
                  </div>
                </div>
                <div className="direct-card-arrow">
                  <ArrowUpRight size={17} />
                </div>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com/in/youssef-nagy7"
                target="_blank"
                rel="noopener noreferrer"
                className="direct-contact-card direct-contact-card--interactive"
              >
                <div className="direct-card-main">
                  <div className="direct-card-icon direct-card-icon--linkedin">
                    <FaLinkedin size={19} />
                  </div>
                  <div className="direct-card-info">
                    <span className="direct-card-tag">LinkedIn Network</span>
                    <span className="direct-card-link">linkedin.com/in/youssef-nagy7</span>
                  </div>
                </div>
                <div className="direct-card-arrow">
                  <ArrowUpRight size={17} />
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/youssef-7-nagy"
                target="_blank"
                rel="noopener noreferrer"
                className="direct-contact-card direct-contact-card--interactive"
              >
                <div className="direct-card-main">
                  <div className="direct-card-icon direct-card-icon--github">
                    <FaGithub size={19} />
                  </div>
                  <div className="direct-card-info">
                    <span className="direct-card-tag">Open Source Code</span>
                    <span className="direct-card-link">github.com/youssef-7-nagy</span>
                  </div>
                </div>
                <div className="direct-card-arrow">
                  <ArrowUpRight size={17} />
                </div>
              </a>

              {/* Location & Remote Availability */}
              <div className="direct-contact-card direct-contact-card--static">
                <div className="direct-card-main">
                  <div className="direct-card-icon direct-card-icon--location">
                    <FaLocationDot size={18} />
                  </div>
                  <div className="direct-card-info">
                    <span className="direct-card-tag">Location & Availability</span>
                    <span className="direct-card-link direct-card-link--plain">
                      {developer.location} &bull; Open to Remote Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
