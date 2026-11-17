import { useState, useEffect, useRef, useCallback } from 'react';
import { developer } from '../../data/portfolioData';
import codiImg from '../../assets/pop-up/codi.png';
import { X } from 'lucide-react';
import './FloatingPenguinContact.css';

export default function FloatingPenguinContact({ splashActive = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [position, setPosition] = useState(null); // { x, y }

  const widgetRef = useRef(null);
  const popupRef = useRef(null);

  // Drag tracking refs
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const widgetStartRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const snapTimerRef = useRef(null);

  // Constants - Sleek, comfortable size on mobile
  const WIDGET_WIDTH = 88;
  const WIDGET_HEIGHT = 88;
  const EDGE_MARGIN = 16;

  // Two-stage opening: when popup opens, smoothly expand the social clock radar after a short delay
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsClockOpen(true);
    }, 220);

    return () => {
      clearTimeout(timer);
      setIsClockOpen(false);
    };
  }, [isOpen]);

  // 1. Initial Positioning at Bottom-Right of Viewport
  useEffect(() => {
    const initPos = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const initialX = Math.max(EDGE_MARGIN, vw - WIDGET_WIDTH - 24);
      const initialY = Math.max(EDGE_MARGIN, vh - WIDGET_HEIGHT - 28);
      const coords = { x: initialX, y: initialY };
      currentPosRef.current = coords;
      setPosition(coords);
    };

    initPos();

    // Re-dock or clamp on window resize
    const handleResize = () => {
      setPosition(prev => {
        if (!prev) return prev;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isRightDocked = prev.x >= (vw - WIDGET_WIDTH) / 2;
        const newX = isRightDocked
          ? Math.max(EDGE_MARGIN, vw - WIDGET_WIDTH - EDGE_MARGIN)
          : EDGE_MARGIN;
        const newY = Math.max(EDGE_MARGIN, Math.min(vh - WIDGET_HEIGHT - EDGE_MARGIN, prev.y));
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Apple AssistiveTouch Snapping logic
  const snapToNearestEdge = useCallback((currentX, currentY) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const midPoint = (vw - WIDGET_WIDTH) / 2;

    const targetX = currentX < midPoint
      ? EDGE_MARGIN
      : Math.max(EDGE_MARGIN, vw - WIDGET_WIDTH - EDGE_MARGIN);

    const targetY = Math.max(
      EDGE_MARGIN,
      Math.min(vh - WIDGET_HEIGHT - EDGE_MARGIN, currentY)
    );

    setIsSnapping(true);
    setPosition({ x: targetX, y: targetY });

    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      setIsSnapping(false);
    }, 450);
  }, []);

  // 3. Pointer Event Handlers for Reliable Dragging (Mouse & Touch)
  const handlePointerDown = e => {
    // Only respond to primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;

    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    widgetStartRef.current = position || { x: 0, y: 0 };
    hasMovedRef.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
    setIsSnapping(false);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored for safety
    }
  };

  const handlePointerMove = e => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 5) {
      hasMovedRef.current = true;
      // Requirement 3: Close/hide Get in Touch immediately as soon as dragging begins!
      if (isOpen) {
        setIsOpen(false);
      }
    }

    if (hasMovedRef.current) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Allow fluid free movement during drag inside viewport
      const nextX = Math.max(0, Math.min(vw - WIDGET_WIDTH, widgetStartRef.current.x + dx));
      const nextY = Math.max(EDGE_MARGIN, Math.min(vh - WIDGET_HEIGHT - EDGE_MARGIN, widgetStartRef.current.y + dy));

      const nextCoords = { x: nextX, y: nextY };
      currentPosRef.current = nextCoords;
      setPosition(nextCoords);
    }
  };

  const handlePointerUp = e => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    if (hasMovedRef.current) {
      // It was a drag: snap smoothly to nearest edge!
      snapToNearestEdge(currentPosRef.current.x, currentPosRef.current.y);
    } else {
      // Requirement 4: It was a clean tap without dragging: toggle contact popup!
      setIsOpen(prev => !prev);
    }
  };

  const handlePointerCancel = e => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    snapToNearestEdge(currentPosRef.current.x, currentPosRef.current.y);
  };

  // Requirement 5: Isolate widget drag & prevent underlying page scrolling / gesture movement
  useEffect(() => {
    if (!isDragging) return;

    const preventTouchScroll = e => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    document.addEventListener('gesturestart', preventTouchScroll, { passive: false });
    document.body.classList.add('floating-widget-dragging');

    return () => {
      document.removeEventListener('touchmove', preventTouchScroll);
      document.removeEventListener('gesturestart', preventTouchScroll);
      document.body.classList.remove('floating-widget-dragging');
    };
  }, [isDragging]);

  // 4. Outside-Click and Escape Key Listeners to Close Popup
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = e => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        widgetRef.current &&
        !widgetRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Social link click handler
  const handleSocialClick = (e, url, isMail = false) => {
    e.stopPropagation();
    if (isMail) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Center trigger toggle handler
  const handleClockTriggerClick = e => {
    e.stopPropagation();
    setIsClockOpen(prev => !prev);
  };

  // 5. Intelligent Popup Positioning Calculation (Reference Image 1 Alignment)
  const calculatePopupStyle = () => {
    if (!position) return { display: 'none' };

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    const isMobile = vw <= 768;

    const popupWidth = isMobile ? Math.min(270, vw - 24) : 292;
    const popupHeight = 280; // Rendered height of the popup with clock

    const isDockedOnRight = position.x >= (vw - WIDGET_WIDTH) / 2;

    if (isMobile) {
      // Mobile positioning: neatly right/left-aligned with the widget
      const left = isDockedOnRight
        ? Math.max(12, Math.min(vw - popupWidth - 12, position.x + WIDGET_WIDTH - popupWidth))
        : Math.max(12, Math.min(vw - popupWidth - 12, position.x));

      // Vertical: Prefer hovering directly above the widget with exact 10px spacing
      const spaceAbove = position.y;
      if (spaceAbove >= 260) {
        return {
          left: `${Math.round(left)}px`,
          bottom: `${Math.round(Math.max(12, vh - position.y + 10))}px`,
          width: `${Math.round(popupWidth)}px`
        };
      } else {
        // Open below if widget is dragged near screen top
        return {
          left: `${Math.round(left)}px`,
          top: `${Math.round(position.y + WIDGET_HEIGHT + 10)}px`,
          width: `${Math.round(popupWidth)}px`
        };
      }
    }

    // Desktop / Tablet Landscape: Float to the side of the widget
    const left = isDockedOnRight
      ? Math.max(16, position.x - popupWidth - 14)
      : Math.min(vw - popupWidth - 16, position.x + WIDGET_WIDTH + 14);

    const idealTop = position.y + WIDGET_HEIGHT - popupHeight;
    const top = Math.max(16, Math.min(vh - popupHeight - 16, idealTop));

    return {
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
      width: `${Math.round(popupWidth)}px`
    };
  };

  if (splashActive || !position) return null;

  return (
    <div className="floating-penguin-root" aria-live="polite">
      {/* Draggable Penguin Character Button */}
      <button
        ref={widgetRef}
        type="button"
        className={`floating-penguin-btn ${isDragging ? 'is-dragging' : ''} ${isSnapping ? 'is-snapping' : ''
          } ${isOpen ? 'is-open' : ''}`}
        style={{
          left: `${Math.round(position.x)}px`,
          top: `${Math.round(position.y)}px`
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        aria-label={isOpen ? 'Close contact popup' : 'Open contact popup'}
        aria-expanded={isOpen}
      >
        <div className="floating-penguin-avatar-wrapper">
          <img
            src={codiImg}
            alt="Youssef Nagy interactive assistant"
            className="floating-penguin-img"
            draggable="false"
          />
        </div>
      </button>

      {/* Contact Popup (Matching Reference Image 1 Header + Centered Animated Social Clock) */}
      {isOpen && (
        <aside
          ref={popupRef}
          className="floating-contact-popup"
          style={calculatePopupStyle()}
          role="dialog"
          aria-labelledby="contact-popup-heading"
        >
          {/* Header with Dark Navy Background & Decorative Corner Brackets (PRESERVED 100%) */}
          <header className="popup-header">
            <span className="popup-header__bracket-tl" aria-hidden="true" />
            <span className="popup-header__bracket-br" aria-hidden="true" />

            <div className="popup-header__top-row">
              <span className="popup-header__brand">YOUSSEF.DEV</span>
              <button
                type="button"
                className="popup-header__close"
                onClick={() => setIsOpen(false)}
                aria-label="Close contact popup"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>

            <h3 id="contact-popup-heading" className="popup-header__title">
              Get in Touch
            </h3>
          </header>

          {/* White Content Area: Centered Animated Social Clock Radar */}
          <div className="popup-body popup-body--clock">
            <div
              className={`social-clock ${isClockOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setIsClockOpen(true)}
            >
              <div className="social-clock__list">
                {/* 1. Email: youssefn899@gmail.com */}
                <button
                  type="button"
                  className="social-clock__button email"
                  onClick={(e) => handleSocialClick(e, `mailto:${developer.email}`, true)}
                  title={`Email: ${developer.email}`}
                  aria-label={`Email ${developer.email}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </button>

                {/* 2. WhatsApp: 01275675022 */}
                <button
                  type="button"
                  className="social-clock__button whatsapp"
                  onClick={(e) => handleSocialClick(e, developer.whatsappUrl || 'https://wa.me/201275675022')}
                  title="WhatsApp: 01275675022"
                  aria-label="WhatsApp 01275675022"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                </button>

                {/* 3. LinkedIn: linkedin.com/in/youssef-nagy7 */}
                <button
                  type="button"
                  className="social-clock__button linkedin"
                  onClick={(e) => handleSocialClick(e, 'https://linkedin.com/in/youssef-nagy7')}
                  title="LinkedIn: linkedin.com/in/youssef-nagy7"
                  aria-label="LinkedIn Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </button>

                {/* 4. Instagram: youssef.nagy7 */}
                <button
                  type="button"
                  className="social-clock__button instagram"
                  onClick={(e) => handleSocialClick(e, 'https://instagram.com/youssef.nagy7')}
                  title="Instagram: youssef.nagy7"
                  aria-label="Instagram Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </button>

                {/* 5. GitHub: youssef-7-nagy */}
                <button
                  type="button"
                  className="social-clock__button github"
                  onClick={(e) => handleSocialClick(e, 'https://github.com/youssef-7-nagy')}
                  title="GitHub: youssef-7-nagy"
                  aria-label="GitHub Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </button>

                {/* 6. Facebook: youssefnagy935@yahoo.com */}
                <button
                  type="button"
                  className="social-clock__button facebook"
                  onClick={(e) => handleSocialClick(e, 'https://facebook.com/search/top?q=youssefnagy935%40yahoo.com')}
                  title="Facebook: youssefnagy935@yahoo.com"
                  aria-label="Facebook Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                  </svg>
                </button>
              </div>

              {/* Central Trigger Button */}
              <button
                type="button"
                className="social-clock__trigger"
                onClick={handleClockTriggerClick}
                aria-label={isClockOpen ? 'Collapse contact options' : 'Expand contact options'}
                title="Connect with Youssef"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
