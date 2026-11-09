import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { usePortfolio } from './context/PortfolioContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SplashScreen from './components/ui/SplashScreen';
import Projects from './components/sections/Projects';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import HeroIdentityScanner from './components/ui/HeroIdentityScanner';
import ContactSection from './components/sections/ContactSection';
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
      <HeroSection />

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

      {/* Modern High-Converting About Me Section */}
      <AboutSection />

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

      {/* Projects Section */}
      <Projects />

      {/* Modern High-Converting Contact Hub */}
      <ContactSection />
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
