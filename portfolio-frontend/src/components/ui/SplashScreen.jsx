import { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";
import logoSrc from "../../assets/logos/y.png";

/**
 * Architectural Code-Lock SplashScreen
 * Awwwards-level 60fps GPU-accelerated intro with:
 *  Stage 1 — Blueprint grid fade-in
 *  Stage 2 — Dual-layer laser (teal/yellow accent + black ink) SVG trace
 *  Stage 3 — Magnetic bracket lock-in + shockwave pulse
 *  Stage 4 — Seamless FLIP flight to navbar logo
 * Zero React setState mid-animation (all DOM via useRef + Web Animations API)
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

  const overlayRef  = useRef(null);
  const stageRef    = useRef(null);
  const svgRef      = useRef(null);
  const imgRef      = useRef(null);
  const pulseRef    = useRef(null);
  const blueprintRef = useRef(null);

  useEffect(() => {
    if (isRemoved) {
      onComplete?.();
      return;
    }

    let isCancelled = false;
    const timers = [];

    // Lock scrolling during splash
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Hide navbar logo to prepare for clean handoff
    const navbarLogo = document.querySelector("[data-navbar-logo]");
    if (navbarLogo) {
      navbarLogo.style.opacity = "0";
      navbarLogo.style.transition = "opacity 0.2s ease";
    }

    const cleanupAndFinish = () => {
      if (isCancelled) return;
      if (navbarLogo) navbarLogo.style.opacity = "1";
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      try {
        if (oncePerSession) sessionStorage.setItem(storageKey, "true");
      } catch { /* ignore */ }
      setIsRemoved(true);
      onComplete?.();
    };

    const startSequence = async () => {
      // Pre-decode logo PNG into GPU VRAM before frame 1
      try {
        const preloadImg = new Image();
        preloadImg.src = logoSrc;
        if (preloadImg.decode) {
          await Promise.race([
            preloadImg.decode(),
            new Promise((res) => setTimeout(res, 600)),
          ]);
        }
      } catch { /* continue */ }

      if (isCancelled) return;

      // Reduced-motion fast-path
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

      // Double rAF — ensures main thread has settled before first draw
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isCancelled || !stageRef.current || !overlayRef.current) return;

          // ── Stage 1: Blueprint grid appears + laser trace begins ──────────
          overlayRef.current.classList.add("is-active");
          stageRef.current.classList.add("start-drawing");

          // ── Stage 2: Brackets lock in + PNG cross-fade + shockwave ─────────
          const t1 = setTimeout(() => {
            if (isCancelled) return;
            if (stageRef.current) stageRef.current.classList.add("is-locked");
            if (imgRef.current) imgRef.current.classList.add("is-visible");
            if (svgRef.current) svgRef.current.classList.add("is-hidden");
          }, 1150);

          // ── Stage 3: Blueprint fades, then FLIP flight to navbar ─────────
          const t2 = setTimeout(() => {
            if (isCancelled || !stageRef.current || !overlayRef.current) return;

            // Fade out blueprint lines before flight
            if (blueprintRef.current) {
              blueprintRef.current.classList.add("is-fading");
            }

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
                const scale  = targetRect.width / sourceRect.width;

                // Fade white backdrop while keeping flying logo fully visible
                overlayRef.current.classList.add("is-flying");

                const flight = stageRef.current.animate(
                  [
                    { transform: "translate3d(0px, 0px, 0px) scale(1)" },
                    { transform: `translate3d(${deltaX}px, ${deltaY}px, 0px) scale(${scale})` },
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

            // Fallback: fade out if navbar element missing
            overlayRef.current.classList.add("is-fading-out");
            const t3 = setTimeout(cleanupAndFinish, 550);
            timers.push(t3);
          }, 1700);

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
      {/* Blueprint grid frame — 4 crosshair corners */}
      <div ref={blueprintRef} className="splash-blueprint">
        <span className="crosshair ch-tl" aria-hidden="true" />
        <span className="crosshair ch-tr" aria-hidden="true" />
        <span className="crosshair ch-bl" aria-hidden="true" />
        <span className="crosshair ch-br" aria-hidden="true" />
      </div>

      <div ref={stageRef} className="splash-stage">
        {/* Shockwave pulse ring — triggered by .is-locked on stage */}
        <div ref={pulseRef} className="splash-pulse-ring" aria-hidden="true" />

        {/* ── Dual-layer SVG: laser accent + ink stroke ── */}
        <svg
          ref={svgRef}
          className="splash-svg"
          viewBox="0 0 444 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Layer 1: Laser accent (teal/yellow glow, draws first) */}
          <g className="laser-layer">
            {/* Top-left Y arm */}
            <path
              pathLength="1"
              className="laser-path lp-1"
              d="M 110 77 L 156 77 Q 163 77 168 82 L 208 122 L 185 152 L 110 77 Z"
            />
            {/* Right Y arm + stem */}
            <path
              pathLength="1"
              className="laser-path lp-2"
              d="M 319 77 L 275 77 Q 268 77 262 83 L 201 148 Q 196 155 196 165 L 196 286 Q 196 292 203 285 L 234 252 L 234 172 Q 234 164 240 157 L 319 77 Z"
            />
            {/* Left bracket < */}
            <path
              pathLength="1"
              className="laser-path lp-3 bracket-left"
              d="M 171 151 L 122 201 L 171 251 L 171 224 L 149 201 L 171 178 Z"
            />
            {/* Right bracket > */}
            <path
              pathLength="1"
              className="laser-path lp-4 bracket-right"
              d="M 258 151 L 307 201 L 258 251 L 258 224 L 280 201 L 258 178 Z"
            />
          </g>

          {/* Layer 2: Ink stroke (solid black, follows 80ms behind laser) */}
          <g className="ink-layer">
            {/* Top-left Y arm */}
            <path
              pathLength="1"
              className="logo-path path-1"
              d="M 110 77 L 156 77 Q 163 77 168 82 L 208 122 L 185 152 L 110 77 Z"
            />
            {/* Right Y arm + stem */}
            <path
              pathLength="1"
              className="logo-path path-2"
              d="M 319 77 L 275 77 Q 268 77 262 83 L 201 148 Q 196 155 196 165 L 196 286 Q 196 292 203 285 L 234 252 L 234 172 Q 234 164 240 157 L 319 77 Z"
            />
            {/* Left bracket < (magnetic snap inward) */}
            <path
              pathLength="1"
              className="logo-path path-3 bracket-left"
              d="M 171 151 L 122 201 L 171 251 L 171 224 L 149 201 L 171 178 Z"
            />
            {/* Right bracket > (magnetic snap inward) */}
            <path
              pathLength="1"
              className="logo-path path-4 bracket-right"
              d="M 258 151 L 307 201 L 258 251 L 258 224 L 280 201 L 258 178 Z"
            />
          </g>
        </svg>

        {/* Original PNG logo — cross-fades in after SVG trace */}
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
