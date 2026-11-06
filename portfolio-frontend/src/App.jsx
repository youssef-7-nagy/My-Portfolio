import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';
import { developer } from './data/portfolioData';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SocialClock from './components/ui/SocialClock';
import SplashScreen from './components/ui/SplashScreen';
import Projects from './components/sections/Projects';
import HeroPhotoCard from './components/ui/HeroPhotoCard';
import HeroIdentityScanner from './components/ui/HeroIdentityScanner';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import './App.css';

function HomePage() {
  const { setActiveSection } = usePortfolio();

  // Intersection Observer to track active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="section hero-section">
        <div className="container hero-container">
          {/* Left Column: Bio & Calls to Action */}
          <div className="hero-text-col">
            <div className="hero-badge animate-fade-in-up">
              <span className="hero-badge__dot" />
              Available for work
            </div>
            <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Hi, I&rsquo;m <span className="gradient-text">Youssef Nagy</span>
            </h1>
            <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Junior MERN Stack Developer
            </p>
            <p className="hero-description animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              I build modern, responsive web applications with MongoDB, Express.js, React, and Node.js.
              Passionate about clean code and user-centric design.
            </p>
            <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-outline">
                Get In Touch
              </a>
            </div>

            {/* Floating tech badges */}
            <div className="hero-tech-row animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
              {['MongoDB', 'Express', 'React', 'Node.js'].map((tech) => (
                <span key={tech} className="hero-tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          {/* Right Column: Photo */}
          <div className="hero-visual-col">
            <HeroPhotoCard />
          </div>
        </div>

        {/* Background ambient glow */}
        <div className="hero-glow hero-glow--1" />
        <div className="hero-glow hero-glow--2" />
      </section>

      {/* Cyber Scanner Showcase Section */}
      <section id="identity-scanner" className="section cyber-showcase-section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-badge animate-fade-in-up" style={{ marginBottom: '16px' }}>
            <span className="hero-badge__dot" />
            Holographic Terminal
          </div>
          <h2 className="section-title">
            Developer <span className="gradient-text">Identity Matrix</span>
          </h2>
          <p className="section-subtitle">
            Laser-synthesized scanline readout showcasing active disciplines, specialties, and architecture stack.
          </p>

          <HeroIdentityScanner />
        </div>
      </section>

      {/* Placeholder sections – we'll flesh these out next */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">Coming soon — my journey into MERN stack development.</p>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Coming soon — interactive tech stack grid.</p>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">My <span className="gradient-text">Services</span></h2>
          <p className="section-subtitle">Coming soon — service offering cards.</p>
        </div>
      </section>

      <Projects />

      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-subtitle">
            Have an opportunity, question, or want to collaborate? Connect with me directly or use the interactive social radar below.
          </p>

          <div className="contact-grid">
            {/* Left Column: Direct channels & bio */}
            <div className="contact-info">
              <h3 className="contact-heading">
                Let&rsquo;s build something <span className="gradient-text">great together</span>.
              </h3>
              <p className="contact-desc">
                I&rsquo;m currently open to Junior MERN Stack roles, freelance projects, and exciting collaborations. Feel free to reach out via your favorite platform!
              </p>

              <div className="contact-channels">
                <a href={`mailto:${developer.email}`} className="contact-card">
                  <div className="contact-card__icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-card__details">
                    <span className="contact-card__label">Direct Email</span>
                    <span className="contact-card__value">{developer.email}</span>
                  </div>
                </a>

                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="contact-card">
                  <div className="contact-card__icon" style={{ background: 'rgba(var(--color-ocean-teal-rgb), 0.15)', color: 'var(--color-ocean-teal)' }}>
                    <FaWhatsapp />
                  </div>
                  <div className="contact-card__details">
                    <span className="contact-card__label">WhatsApp</span>
                    <span className="contact-card__value">Chat on WhatsApp</span>
                  </div>
                </a>

                <div className="contact-card" style={{ cursor: 'default' }}>
                  <div className="contact-card__icon" style={{ background: 'rgba(var(--color-deep-steel-blue-rgb), 0.15)', color: 'var(--color-warm-yellow)' }}>
                    <FaLocationDot />
                  </div>
                  <div className="contact-card__details">
                    <span className="contact-card__label">Location</span>
                    <span className="contact-card__value">{developer.location} &bull; Open to Remote Worldwide</span>
                  </div>
                </div>
              </div>

              <div className="contact-cta-row">
                <a href={`mailto:${developer.email}`} className="btn btn-primary">
                  Send Me An Email
                </a>
                <a href="#home" className="btn btn-outline">
                  Back To Top
                </a>
              </div>
            </div>

            {/* Right Column: Social Clock interactive radial button */}
            <div className="contact-clock-col">
              <SocialClock />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 800 }}>
          <span className="gradient-text">404</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '16px' }}>
          Oops — page not found.
        </p>
        <a href="/" className="btn btn-primary" style={{ marginTop: '32px' }}>
          Back to Home
        </a>
      </div>
    </section>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen
          oncePerSession={false}
          onComplete={() => setShowSplash(false)}
        />
      )}
      <div className="app">
        <Navbar splashActive={showSplash} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
