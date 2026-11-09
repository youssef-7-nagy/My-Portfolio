import { useState, useEffect, useRef } from 'react';
import { developer } from '../../data/portfolioData';
import SocialClock from '../ui/SocialClock';
import {
  Send,
  Check,
  Copy,
  Clock,
  Sparkles,
  MessageSquare,
  Mail,
  User,
  Briefcase,
  ArrowUpRight
} from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import './ContactSection.css';

const PROJECT_TYPE_CHIPS = [
  'Full-Stack MERN App',
  'Frontend / React UI',
  'Backend & REST APIs',
  'Junior Developer Role',
  'Freelance / Contract',
  'General Inquiry'
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cairoTime, setCairoTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  // Live Cairo Local Time indicator
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        setCairoTime(timeStr);
      } catch {
        setCairoTime('GMT+2');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

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

  // Field validation
  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Please enter your email address.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'subject':
        if (!value.trim()) return 'Please enter a subject or select a category.';
        return '';
      case 'message':
        if (!value.trim()) return 'Please write a brief message.';
        if (value.trim().length < 10) return 'Message should be at least 10 characters.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChipSelect = (chip) => {
    setFormData((prev) => ({ ...prev, subject: chip }));
    setTouched((prev) => ({ ...prev, subject: true }));
    setErrors((prev) => ({ ...prev, subject: '' }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    const hasErrors = Object.values(newErrors).some((err) => Boolean(err));
    if (hasErrors) return;

    setIsSubmitting(true);

    // Prepare direct mailto URL
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Youssef,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.subject}\n\nMessage:\n${formData.message}\n\n---\nSent via youssef.dev Contact Form`
    );
    const mailtoUrl = `mailto:${developer.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  // WhatsApp quick dispatch URL for submitted inquiry
  const whatsappInquiryUrl = `https://wa.me/201275675022?text=${encodeURIComponent(
    `Hello Youssef! My name is ${formData.name || 'a visitor'} (${formData.email || ''}). I'm reaching out regarding: ${
      formData.subject || 'a project'
    }. Message: ${formData.message || ''}`
  )}`;

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
          <div className="hero-badge animate-fade-in-up">
            <span className="hero-badge__dot" />
            Get In Touch
          </div>
          <h2 className="section-title">
            Let&rsquo;s Build Something <span className="gradient-text">Great Together.</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a junior full-stack opportunity, or want to say hello?
            My inbox is always open.
          </p>
        </div>

        {/* Live Status & Availability Bento Banner */}
        <div className="contact-status-banner">
          <div className="status-banner__item">
            <div className="status-indicator">
              <span className="status-indicator__ping" />
              <span className="status-indicator__dot" />
            </div>
            <div className="status-banner__text">
              <span className="status-banner__label">Current Status</span>
              <strong className="status-banner__value">Available for Roles & Projects</strong>
            </div>
          </div>

          <div className="status-banner__divider" aria-hidden="true" />

          <div className="status-banner__item">
            <Clock size={16} className="status-banner__icon" />
            <div className="status-banner__text">
              <span className="status-banner__label">Local Time (Cairo, Egypt)</span>
              <strong className="status-banner__value">{cairoTime || 'GMT+2'}</strong>
            </div>
          </div>

          <div className="status-banner__divider" aria-hidden="true" />

          <div className="status-banner__item">
            <Sparkles size={16} className="status-banner__icon" />
            <div className="status-banner__text">
              <span className="status-banner__label">Response Time</span>
              <strong className="status-banner__value">&lt; 24 Hours Guaranteed</strong>
            </div>
          </div>
        </div>

        {/* Main 2-Column Contact Experience Grid */}
        <div className="contact-main-grid">
          {/* Column 1: Interactive Contact Form */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              <div className="form-card-header">
                <div className="form-card-header__title-row">
                  <h3 className="form-card-title">Send a Direct Message</h3>
                  <span className="form-card-step-badge">Quick Form</span>
                </div>
                <p className="form-card-subtitle">
                  Select a topic below or fill out your details — your message will be dispatched immediately.
                </p>
              </div>

              {/* Quick Topic / Project Type Chips */}
              <div className="project-chips-container">
                <span className="chips-label">I&rsquo;m interested in:</span>
                <div className="chips-list">
                  {PROJECT_TYPE_CHIPS.map((chip) => {
                    const isSelected = formData.subject === chip;
                    return (
                      <button
                        key={chip}
                        type="button"
                        className={`chip-button ${isSelected ? 'chip-button--active' : ''}`}
                        onClick={() => handleChipSelect(chip)}
                      >
                        {isSelected && <Check size={12} className="chip-check-icon" />}
                        <span>{chip}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Body or Success State */}
              {isSubmitted ? (
                <div className="form-success-card animate-fade-in">
                  <div className="form-success-icon">
                    <Check size={28} />
                  </div>
                  <h4 className="form-success-title">Message Prepared & Dispatched!</h4>
                  <p className="form-success-desc">
                    Thank you, <strong>{formData.name}</strong>. Your default email client was opened with your message to <strong>{developer.email}</strong>.
                  </p>

                  <div className="form-success-actions">
                    <a
                      href={`mailto:${developer.email}?subject=${encodeURIComponent(
                        `[Portfolio Inquiry] ${formData.subject}`
                      )}&body=${encodeURIComponent(formData.message)}`}
                      className="btn btn-primary"
                    >
                      <Mail size={15} />
                      <span>Re-open Email</span>
                    </a>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }}
                    >
                      <FaWhatsapp size={16} />
                      <span>Also Send on WhatsApp</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    className="form-reset-btn"
                    onClick={handleResetForm}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Name & Email Row */}
                  <div className="form-row form-row--2cols">
                    {/* Name Field */}
                    <div className={`form-group ${errors.name && touched.name ? 'has-error' : ''}`}>
                      <label htmlFor="contact-name" className="form-label">
                        Your Name <span className="required-star">*</span>
                      </label>
                      <div className="input-wrapper">
                        <User size={16} className="input-icon" />
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          className="form-input"
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="name"
                          required
                        />
                      </div>
                      {errors.name && touched.name && (
                        <span className="field-error-message">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className={`form-group ${errors.email && touched.email ? 'has-error' : ''}`}>
                      <label htmlFor="contact-email" className="form-label">
                        Your Email <span className="required-star">*</span>
                      </label>
                      <div className="input-wrapper">
                        <Mail size={16} className="input-icon" />
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          className="form-input"
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="email"
                          required
                        />
                      </div>
                      {errors.email && touched.email && (
                        <span className="field-error-message">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className={`form-group ${errors.subject && touched.subject ? 'has-error' : ''}`}>
                    <label htmlFor="contact-subject" className="form-label">
                      Subject / Project Scope <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <Briefcase size={16} className="input-icon" />
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        className="form-input"
                        placeholder="Select a chip above or type your topic..."
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                    {errors.subject && touched.subject && (
                      <span className="field-error-message">{errors.subject}</span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className={`form-group ${errors.message && touched.message ? 'has-error' : ''}`}>
                    <label htmlFor="contact-message" className="form-label">
                      Your Message <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper input-wrapper--textarea">
                      <MessageSquare size={16} className="input-icon input-icon--textarea" />
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        className="form-input form-textarea"
                        placeholder="Tell me about your project, timeline, tech stack, or the role you are hiring for..."
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </div>
                    {errors.message && touched.message && (
                      <span className="field-error-message">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary form-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="btn-spinner" />
                        <span>Preparing Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                        <ArrowUpRight size={15} className="submit-arrow" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Direct Channels & Interactive Social Radar */}
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

            {/* Interactive Social Clock Radar Area */}
            <div className="contact-radar-container">
              <SocialClock />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
