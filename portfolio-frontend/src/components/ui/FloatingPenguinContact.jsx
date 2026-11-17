import { useState, useEffect, useRef, useCallback } from 'react';
import { developer, socialLinks } from '../../data/portfolioData';
import pipoImg from '../../assets/pipo.png';
import { Mail, X, ChevronRight } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import './FloatingPenguinContact.css';

export default function FloatingPenguinContact({ splashActive = false }) {
  const [isOpen, setIsOpen] = useState(false);
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

  // Constants - Sleek compact dimensions matching luxury reference
  const WIDGET_WIDTH = 84;
  const WIDGET_HEIGHT = 84;
  const EDGE_MARGIN = 16;

  // Instagram data from portfolioData
  const instagramItem = socialLinks.find(s => s.id === 'instagram') || {
    url: 'https://instagram.com/youssef.nagy7',
    handle: '@youssef.nagy7'
  };

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

    // Close popup on new drag interaction
    if (isOpen) {
      setIsOpen(false);
    }

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

    if (dist > 6) {
      hasMovedRef.current = true;
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
      // It was a clean click/tap: toggle contact popup!
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

  // 5. Intelligent Popup Positioning Calculation (Reference Image 1 Alignment)
  const calculatePopupStyle = () => {
    if (!position) return { display: 'none' };

    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    const isMobile = vw <= 768;

    // Compact luxury dimensions matching reference
    const popupWidth = isMobile ? Math.min(252, vw - 24) : 268;
    const popupHeight = 222; // Compact rendered height of the popup

    const isDockedOnRight = position.x >= (vw - WIDGET_WIDTH) / 2;

    let left;
    let top;

    if (isMobile) {
      // On mobile viewports: Float neatly above the widget (or below if widget is near screen top)
      if (isDockedOnRight) {
        // Align popup with the widget's right edge
        left = Math.max(12, Math.min(vw - popupWidth - 12, position.x + WIDGET_WIDTH - popupWidth));
      } else {
        // Align popup with the widget's left edge
        left = Math.max(12, Math.min(vw - popupWidth - 12, position.x));
      }

      // Vertical: Prefer hovering directly above the widget
      const spaceAbove = position.y;
      if (spaceAbove >= popupHeight + 14) {
        top = Math.max(12, position.y - popupHeight - 8);
      } else {
        // Open below if dragged to the upper screen
        top = Math.min(vh - popupHeight - 12, position.y + WIDGET_HEIGHT + 8);
      }
    } else {
      // Desktop / Tablet: Float to the side of the widget
      left = isDockedOnRight
        ? Math.max(16, position.x - popupWidth - 14)
        : Math.min(vw - popupWidth - 16, position.x + WIDGET_WIDTH + 14);

      const idealTop = position.y + WIDGET_HEIGHT - popupHeight;
      top = Math.max(16, Math.min(vh - popupHeight - 16, idealTop));
    }

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
        className={`floating-penguin-btn ${isDragging ? 'is-dragging' : ''} ${
          isSnapping ? 'is-snapping' : ''
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
            src={pipoImg}
            alt="Youssef Nagy interactive penguin assistant"
            className="floating-penguin-img"
            draggable="false"
          />
          {/* Subtle status indicator dot or toggle icon */}
          <span className="floating-penguin-badge" aria-hidden="true">
            {isOpen ? <X size={10} strokeWidth={2.5} /> : <span className="floating-penguin-badge__dot" />}
          </span>
        </div>
      </button>

      {/* Contact Popup (Matching Reference Image 1) */}
      {isOpen && (
        <aside
          ref={popupRef}
          className="floating-contact-popup"
          style={calculatePopupStyle()}
          role="dialog"
          aria-labelledby="contact-popup-heading"
        >
          {/* Header with Dark Navy Background & Decorative Corner Brackets */}
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

          {/* Body Cards: Email & Instagram */}
          <div className="popup-body">
            {/* 1. Email Me Card */}
            <a
              href={`mailto:${developer.email}`}
              className="popup-card"
              title={`Send an email to ${developer.email}`}
            >
              <div className="popup-card__left">
                <div className="popup-card__icon-box popup-card__icon-box--email">
                  <Mail size={15} strokeWidth={2} />
                </div>
                <div className="popup-card__content">
                  <span className="popup-card__title">Email Me</span>
                  <span className="popup-card__subtitle">{developer.email}</span>
                </div>
              </div>
              <ChevronRight size={13} className="popup-card__arrow" />
            </a>

            {/* 2. Instagram Card */}
            <a
              href={instagramItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="popup-card"
              title="Open Instagram Profile"
            >
              <div className="popup-card__left">
                <div className="popup-card__icon-box popup-card__icon-box--instagram">
                  <FaInstagram size={15} />
                </div>
                <div className="popup-card__content">
                  <span className="popup-card__title">Instagram</span>
                  <span className="popup-card__subtitle">
                    {instagramItem.handle.startsWith('@') ? instagramItem.handle : `@${instagramItem.handle}`}
                  </span>
                </div>
              </div>
              <ChevronRight size={13} className="popup-card__arrow" />
            </a>
          </div>

          {/* Minimal Elegant Footer Tagline */}
          <footer className="popup-footer">
            <p className="popup-footer__tagline">
              JUNIOR MERN STACK DEVELOPER &bull; YOUSSEF.DEV
            </p>
          </footer>
        </aside>
      )}
    </div>
  );
}
