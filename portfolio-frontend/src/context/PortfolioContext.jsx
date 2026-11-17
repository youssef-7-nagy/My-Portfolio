import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved || 'dark';
  });
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ref to prevent IntersectionObserver / scroll listener from overriding activeSection during smooth-scroll
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef(null);

  const navigateToSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    isNavigatingRef.current = true;
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 900);
  }, []);

  // Sync theme attribute to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Close mobile menu on route / resize changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Ref to prevent overlapping transitions if clicked rapidly
  const isTransitioningRef = useRef(false);

  const toggleTheme = useCallback(() => {
    // Safely ignore rapid repeated clicks while a transition is running
    if (isTransitioningRef.current) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    // Respect accessibility settings
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Direct switch if View Transitions API is unsupported or user prefers reduced motion
    if (typeof document === 'undefined' || !document.startViewTransition || prefersReducedMotion) {
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      setTheme(nextTheme);
      return;
    }

    isTransitioningRef.current = true;
    document.documentElement.classList.add('theme-ink-transitioning');

    const transition = document.startViewTransition(() => {
      // Synchronously set data-theme so the new view snapshot captures all CSS variables immediately
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      setTheme(nextTheme);
    });

    transition.finished
      .catch(() => {})
      .finally(() => {
        isTransitioningRef.current = false;
        document.documentElement.classList.remove('theme-ink-transitioning');
      });
  }, [theme]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const value = {
    theme,
    toggleTheme,
    activeSection,
    setActiveSection,
    navigateToSection,
    isNavigatingRef,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
