import { useEffect, useRef, useState } from "react";
import "./SplashScreen.css";
import logoSrc from "../../assets/logos/y.png";

/**
 * SplashScreen — Flicker-Free Shared-Element Logo Transition
 *
 * Architecture:
 * - The splash `stageRef` div is the SINGLE visible logo during the entire
 *   loading + flight sequence. The navbar <img> is kept `visibility:hidden`
 *   (so we can still measure its position) until the very last frame.
 * - On flight finish:
 *   1. The navbar <img> switches to `visibility:visible` synchronously.
 *   2. The splash stage switches to `visibility:hidden` in the SAME rAF
 *      callback — the browser composites both changes in one single paint pass.
 *      Zero gap. Zero flicker.
 * - React state (`isRemoved`) only flips AFTER the compositor has finished
 *   the handoff frame, so no React reconciliation interferes.
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

    // Lock scrolling during splash
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Keep the navbar logo INVISIBLE via `visibility` (not opacity/display),
    // so it still occupies layout space and getBoundingClientRect() is accurate,
    // but the user never sees it during the splash flight.
    const navbarLogo = document.querySelector("[data-navbar-logo]");
    if (navbarLogo) {
      navbarLogo.style.visibility = "hidden";
      navbarLogo.style.transition = "none"; // disable transitions for instant switch
      navbarLogo.style.opacity = "1";
    }

    const revealAndFinish = () => {
      if (isCancelled) return;

      // ── The critical handoff: both changes happen synchronously before paint ──
      // Browser will batch them into ONE composite frame → zero flicker gap.
      if (navbarLogo) {
        navbarLogo.style.visibility = "visible";
        navbarLogo.style.transition = ""; // restore CSS transitions
      }
      if (stageRef.current) {
        stageRef.current.style.visibility = "hidden";
      }

      // Restore scroll
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;

      try {
        if (oncePerSession) sessionStorage.setItem(storageKey, "true");
      } catch {
        // ignore private browsing errors
      }

      // Unmount splash on the NEXT frame — after the browser has painted the handoff
      requestAnimationFrame(() => {
        if (!isCancelled) {
          setIsRemoved(true);
          onComplete?.();
        }
      });
    };

    const emergencyCleanup = () => {
      if (navbarLogo) {
        navbarLogo.style.visibility = "visible";
        navbarLogo.style.transition = "";
        navbarLogo.style.opacity = "";
      }
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };

    const startSequence = async () => {
      // Pre-decode the logo PNG before the first animation frame
      try {
        const preloadImg = new Image();
        preloadImg.src = logoSrc;
        if (preloadImg.decode) {
          await Promise.race([
            preloadImg.decode(),
            new Promise((res) => setTimeout(res, 500)),
          ]);
        }
      } catch {
        // Continue even if pre-decode fails
      }

      if (isCancelled) return;

      // Reduced motion: skip drawing, quick fade
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (imgRef.current) imgRef.current.classList.add("is-visible");
        if (svgRef.current) svgRef.current.classList.add("is-hidden");
        const t = setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.transition = "opacity 0.25s ease";
            overlayRef.current.style.opacity = "0";
          }
          setTimeout(revealAndFinish, 260);
        }, 350);
        timers.push(t);
        return;
      }

      // Double rAF: guarantees the browser has fully committed the initial paint
      // before we start the CSS animation (prevents first-frame jank).
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isCancelled || !stageRef.current) return;

          // ── Stage 1: SVG stroke-drawing animation ──
          stageRef.current.classList.add("start-drawing");

          // ── Stage 2: Crossfade SVG → raster PNG ──
          const t1 = setTimeout(() => {
            if (isCancelled) return;
            if (imgRef.current) imgRef.current.classList.add("is-visible");
            if (svgRef.current) svgRef.current.classList.add("is-hidden");
          }, 1150);

          // ── Stage 3: FLIP flight to navbar position ──
          const t2 = setTimeout(() => {
            if (isCancelled || !stageRef.current || !overlayRef.current) return;

            const targetEl = document.querySelector("[data-navbar-logo]");

            if (targetEl && stageRef.current.animate) {
              const sourceRect = stageRef.current.getBoundingClientRect();
              const targetRect = targetEl.getBoundingClientRect();

              if (targetRect.width > 0 && sourceRect.width > 0) {
                // Centre-to-centre translation + proportional scale
                const sourceCX = sourceRect.left + sourceRect.width / 2;
                const sourceCY = sourceRect.top + sourceRect.height / 2;
                const targetCX = targetRect.left + targetRect.width / 2;
                const targetCY = targetRect.top + targetRect.height / 2;

                const dx = targetCX - sourceCX;
                const dy = targetCY - sourceCY;
                const scaleX = targetRect.width / sourceRect.width;
                const scaleY = targetRect.height / sourceRect.height;

                // Fade out the white backdrop while the logo flies
                overlayRef.current.classList.add("bg-transparent");

                // Apply the navbar logo's CSS filter to the stage during flight
                // so it visually matches the moment it lands.
                const theme =
                  document.documentElement.getAttribute("data-theme") || "dark";
                if (theme === "dark") {
                  stageRef.current.style.filter =
                    "invert(1) drop-shadow(0 0 10px rgba(244,211,94,0.4))";
                  stageRef.current.style.transition = "filter 0.5s ease";
                } else {
                  stageRef.current.style.filter =
                    "drop-shadow(0 2px 8px rgba(60,110,113,0.25))";
                  stageRef.current.style.transition = "filter 0.5s ease";
                }

                // Execute FLIP flight purely on the GPU compositor thread
                const flight = stageRef.current.animate(
                  [
                    { transform: "translate3d(0,0,0) scale(1,1)" },
                    {
                      transform: `translate3d(${dx}px,${dy}px,0) scale(${scaleX},${scaleY})`,
                    },
                  ],
                  {
                    duration: 700,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                    fill: "forwards",
                  }
                );

                flight.onfinish = revealAndFinish;
                return;
              }
            }

            // ── Fallback: simple fade-out ──
            if (overlayRef.current) {
              overlayRef.current.style.transition = "opacity 0.4s ease";
              overlayRef.current.style.opacity = "0";
            }
            const t3 = setTimeout(revealAndFinish, 420);
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
      emergencyCleanup();
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
        {/* Layer 1: Hardware-accelerated SVG contour drawing */}
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

        {/* Layer 2: Original pixel-perfect raster logo */}
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
