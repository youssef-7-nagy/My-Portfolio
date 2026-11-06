import { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";
import logoSrc from "../../assets/logos/y.png";

/**
 * Optimized SplashScreen
 * Zero-Lag 60fps Animation & FLIP Shared-Element Transition to Navbar Logo
 * - Zero React re-renders mid-flight (uses direct DOM refs and Web Animations API)
 * - Logo texture pre-decoded before frame 1 to eliminate initial frame drop
 * - CPU-heavy masks eliminated in favor of lightweight SVG pathLength="1" paths
 * - Pure GPU compositor transform & scale translation to target navbar logo
 */
const SplashScreen = ({
  onComplete,
  oncePerSession = true,
  storageKey = "youssef_splash_played",
}) => {
  const [isRemoved, setIsRemoved] = useState(() => {
    if (typeof window !== "undefined" && oncePerSession) {
      try {
        return sessionStorage.getItem(storageKey) === "true";
      } catch {
        return false;
      }
    }
    return false;
  });

  const overlayRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isRemoved) {
      onComplete?.();
      return;
    }

    let isCancelled = false;
    const timers = [];

    // 1. Lock scrolling during splash screen
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // 2. Hide navbar logo temporarily to prepare for seamless arrival
    const navbarLogo = document.querySelector("[data-navbar-logo]");
    if (navbarLogo) {
      navbarLogo.style.opacity = "0";
      navbarLogo.style.transition = "opacity 0.2s ease";
    }

    const cleanupAndFinish = () => {
      if (isCancelled) return;
      if (navbarLogo) {
        navbarLogo.style.opacity = "1";
      }
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;

      try {
        if (oncePerSession) sessionStorage.setItem(storageKey, "true");
      } catch {
        // Ignore storage errors in private browsing
      }

      setIsRemoved(true);
      onComplete?.();
    };

    const startSequence = async () => {
      // 3. Pre-decode logo texture directly into GPU VRAM before animation starts
      try {
        const preloadImg = new Image();
        preloadImg.src = logoSrc;
        if (preloadImg.decode) {
          await Promise.race([
            preloadImg.decode(),
            new Promise((res) => setTimeout(res, 600)),
          ]);
        }
      } catch {
        // Continue even if pre-decode fails
      }

      if (isCancelled) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        if (imgRef.current) imgRef.current.classList.add("is-visible");
        if (svgRef.current) svgRef.current.classList.add("is-hidden");
        const t = setTimeout(() => {
          if (overlayRef.current) overlayRef.current.classList.add("is-fading-out");
          setTimeout(cleanupAndFinish, 350);
        }, 400);
        timers.push(t);
        return;
      }

      // 4. Double requestAnimationFrame ensures complete paint before drawing begins
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isCancelled || !stageRef.current) return;

          // Stage 1: Begin hardware-accelerated drawing on GPU
          stageRef.current.classList.add("start-drawing");

          // Stage 2: Drawing finishes, smoothly reveal solid original PNG logo
          const t1 = setTimeout(() => {
            if (isCancelled) return;
            if (imgRef.current) imgRef.current.classList.add("is-visible");
            if (svgRef.current) svgRef.current.classList.add("is-hidden");
          }, 1150);

          // Stage 3 & 4: GPU FLIP Flight directly into Navbar logo coordinates
          const t2 = setTimeout(() => {
            if (isCancelled || !stageRef.current || !overlayRef.current) return;

            const targetEl = document.querySelector("[data-navbar-logo]");

            if (targetEl && stageRef.current.animate) {
              const sourceRect = stageRef.current.getBoundingClientRect();
              const targetRect = targetEl.getBoundingClientRect();

              if (targetRect.width > 0 && sourceRect.width > 0) {
                const sourceCenterX = sourceRect.left + sourceRect.width / 2;
                const sourceCenterY = sourceRect.top + sourceRect.height / 2;
                const targetCenterX = targetRect.left + targetRect.width / 2;
                const targetCenterY = targetRect.top + targetRect.height / 2;

                const deltaX = targetCenterX - sourceCenterX;
                const deltaY = targetCenterY - sourceCenterY;
                const scale = targetRect.width / sourceRect.width;

                // Fade out white splash backdrop smoothly during flight
                overlayRef.current.classList.add("bg-transparent");

                // Execute FLIP flight strictly on the Compositor thread
                const flight = stageRef.current.animate(
                  [
                    { transform: "translate3d(0px, 0px, 0px) scale(1)" },
                    {
                      transform: `translate3d(${deltaX}px, ${deltaY}px, 0px) scale(${scale})`,
                    },
                  ],
                  {
                    duration: 750,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "forwards",
                  }
                );

                flight.onfinish = cleanupAndFinish;
                return;
              }
            }

            // Fallback: graceful fade-out if navbar logo element is absent
            overlayRef.current.classList.add("is-fading-out");
            const t3 = setTimeout(cleanupAndFinish, 550);
            timers.push(t3);
          }, 1600);

          timers.push(t1, t2);
        });
      });
    };

    startSequence();

    return () => {
      isCancelled = true;
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      if (navbarLogo) navbarLogo.style.opacity = "1";
    };
  }, [isRemoved, oncePerSession, storageKey, onComplete]);

  if (isRemoved) return null;

  return (
    <div
      ref={overlayRef}
      className="splash-overlay"
      role="status"
      aria-label="Loading portfolio"
    >
      <div ref={stageRef} className="splash-stage">
        {/* Layer 1: Hardware-accelerated SVG contour paths (zero CPU masks) */}
        <svg
          ref={svgRef}
          className="splash-svg"
          viewBox="0 0 444 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Top-left arm of Y */}
          <path
            pathLength="1"
            className="logo-path path-1"
            d="M 110 77 L 156 77 Q 163 77 168 82 L 208 122 L 185 152 L 110 77 Z"
          />
          {/* Right arm and vertical stem of Y */}
          <path
            pathLength="1"
            className="logo-path path-2"
            d="M 319 77 L 275 77 Q 268 77 262 83 L 201 148 Q 196 155 196 165 L 196 286 Q 196 292 203 285 L 234 252 L 234 172 Q 234 164 240 157 L 319 77 Z"
          />
          {/* Code bracket left (<) */}
          <path
            pathLength="1"
            className="logo-path path-3"
            d="M 171 151 L 122 201 L 171 251 L 171 224 L 149 201 L 171 178 Z"
          />
          {/* Code bracket right (>) */}
          <path
            pathLength="1"
            className="logo-path path-4"
            d="M 258 151 L 307 201 L 258 251 L 258 224 L 280 201 L 258 178 Z"
          />
        </svg>

        {/* Layer 2: Original pixel-perfect logo */}
        <img
          ref={imgRef}
          src={logoSrc}
          alt="Youssef Logo"
          width="444"
          height="316"
          decoding="async"
          fetchPriority="high"
          className="splash-img"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
