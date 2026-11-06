import { useState, useEffect, useRef, useCallback } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import "./SplashScreen.css";
import logoSrc from "../../assets/logos/y.png";

/**
 * Premium Splash-to-Navbar Transition
 * 
 * 1. 0.0s – 1.1s: Center architectural pen contour drawing & SVG mask reveal
 * 2. 1.1s – 1.6s: Solid logo forms and holds in screen center
 * 3. 1.6s – 2.4s: THE SPLASH ANIMATION FINISHES ->
 *                 - The portfolio OPENS (white backdrop fades out revealing Hero & Navbar)
 *                 - WHILE the logo FLIES and scales down into the navbar logo slot!
 * 4. 2.4s:        Landing handoff -> Navbar logo visible, brand text unfurls, splash unmounts
 */
export default function SplashScreen({
  onComplete,
  onFinish,
  oncePerSession = false,
  storageKey = "youssef_portfolio_splash_seen",
}) {
  const { theme } = usePortfolio();
  const isDarkTheme = theme === "dark";

  const onCompleteRef = useRef(onComplete);
  const onFinishRef = useRef(onFinish);
  const stageRef = useRef(null);

  const [stage, setStage] = useState(() => {
    if (typeof window !== "undefined" && oncePerSession) {
      try {
        if (sessionStorage.getItem(storageKey) === "true") {
          return "completed";
        }
      } catch {
        // Ignore storage errors in private browsing
      }
    }
    return "drawing";
  });

  const [isOpening, setIsOpening] = useState(false);
  const isOpeningRef = useRef(false);

  const finish = useCallback(() => {
    try {
      if (oncePerSession && typeof window !== "undefined") {
        sessionStorage.setItem(storageKey, "true");
      }
    } catch {
      // Ignore storage errors
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setStage("completed");
    onCompleteRef.current?.();
    onFinishRef.current?.();
  }, [oncePerSession, storageKey]);

  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });

  useEffect(() => {
    // Lock page scroll and ensure at top of page for pristine coordinate measurement
    window.scrollTo(0, 0);
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Gentle reduced-motion fallback
      const tFade = setTimeout(() => {
        setIsOpening(true);
        isOpeningRef.current = true;
      }, 600);
      const tDone = setTimeout(() => finishRef.current?.(), 1000);
      return () => {
        clearTimeout(tFade);
        clearTimeout(tDone);
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }

    // --- Master Uninterrupted Sequence ---

    // 1. Stage 1 -> 2: Form solid original logo
    const tForming = setTimeout(() => {
      setStage("forming");
    }, 1100);

    // 2. Stage 2 -> 3: Brief hold
    const tHolding = setTimeout(() => {
      setStage("holding");
    }, 1500);

    // 3. Stage 3 -> 4: Splash animation finishes -> OPEN PORTFOLIO & FLY LOGO TO NAVBAR!
    let rafId;
    const tOpenAndFly = setTimeout(() => {
      window.scrollTo(0, 0);

      // Trigger the opening of the portfolio (white backdrop dissolves)
      setIsOpening(true);
      isOpeningRef.current = true;
      setStage("flying");

      const sourceEl = stageRef.current;
      const targetEl =
        document.getElementById("navbar-target-logo") ||
        document.querySelector('[data-navbar-logo="true"]');

      if (!sourceEl || !targetEl) {
        finishRef.current?.();
        return;
      }

      // Exact coordinate measurement
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const targetWidth = targetRect.width > 5 ? targetRect.width : 53.4;
      const targetHeight = targetRect.height > 5 ? targetRect.height : 38;

      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetWidth / 2;
      const targetCenterY = targetRect.top + targetHeight / 2;

      const deltaX = targetCenterX - sourceCenterX;
      const deltaY = targetCenterY - sourceCenterY;
      const scale = targetWidth / sourceRect.width;

      // Lock center transform origin and commit initial transform
      sourceEl.style.transformOrigin = "50% 50%";
      sourceEl.style.transform = "translate3d(0px, 0px, 0) scale(1)";
      sourceEl.style.transition = "none";

      // Force synchronous reflow so browser commits starting state
      void sourceEl.offsetWidth;

      // Launch silky 60fps GPU flight directly onto the navbar logo
      rafId = requestAnimationFrame(() => {
        sourceEl.style.transition =
          "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";
        sourceEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`;
      });
    }, 1750);

    // 4. Logo lands in navbar -> Seamless handoff & unmount
    const tLanding = setTimeout(() => {
      finishRef.current?.();
    }, 1750 + 820);

    // Clean handoff if resized during flight
    const handleResize = () => {
      if (isOpeningRef.current) {
        finishRef.current?.();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(tForming);
      clearTimeout(tHolding);
      clearTimeout(tOpenAndFly);
      clearTimeout(tLanding);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []); // Run ONCE on mount

  if (stage === "completed") return null;

  const isFormed =
    stage === "forming" || stage === "holding" || stage === "flying";

  return (
    <div
      className="splash-screen"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* 
        Backdrop Layer:
        Fades out at ~1.7s when the splash animation finishes,
        opening the portfolio underneath while the logo flies!
      */}
      <div
        className={`splash-screen__backdrop ${
          isOpening ? "splash-screen__backdrop--fading" : ""
        }`}
      />

      {/* 
        Flying Logo Stage:
        Translates and scales down directly to the navbar logo slot
      */}
      <div
        ref={stageRef}
        className={`splash-screen__stage ${
          isOpening ? "splash-screen__stage--flying" : ""
        } ${isDarkTheme ? "splash-screen__stage--dark" : "splash-screen__stage--light"}`}
      >
        {/* Drawing & mask layer */}
        <svg
          className={`splash-screen__svg ${
            isFormed ? "splash-screen__svg--hidden" : ""
          }`}
          viewBox="0 0 444 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <mask
              id="logo-progressive-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="444"
              height="316"
            >
              <rect width="444" height="316" fill="black" />
              <path
                className="mask-reveal-stroke mask-stroke-1"
                d="M 118 72 L 198 142"
              />
              <path
                className="mask-reveal-stroke mask-stroke-2"
                d="M 310 72 L 215 162 L 215 292"
              />
              <path
                className="mask-reveal-stroke mask-stroke-3"
                d="M 174 156 L 132 201 L 174 246"
              />
              <path
                className="mask-reveal-stroke mask-stroke-4"
                d="M 255 156 L 297 201 L 255 246"
              />
            </mask>
          </defs>

          {/* Masked Original PNG */}
          <image
            href={logoSrc}
            width="444"
            height="316"
            preserveAspectRatio="xMidYMid meet"
            mask="url(#logo-progressive-mask)"
          />

          {/* Architectural pen-sketch outlines */}
          <g className="sketch-contours">
            <path
              className="sketch-path sketch-path-1"
              d="M 110 77 L 156 77 Q 163 77 168 82 L 208 122 L 185 152 L 110 77 Z"
            />
            <path
              className="sketch-path sketch-path-2"
              d="M 319 77 L 275 77 Q 268 77 262 83 L 201 148 Q 196 155 196 165 L 196 286 Q 196 292 203 285 L 234 252 L 234 172 Q 234 164 240 157 L 319 77 Z"
            />
            <path
              className="sketch-path sketch-path-3"
              d="M 171 151 L 122 201 L 171 251 L 171 224 L 149 201 L 171 178 Z"
            />
            <path
              className="sketch-path sketch-path-4"
              d="M 258 151 L 307 201 L 258 251 L 258 224 L 280 201 L 258 178 Z"
            />
          </g>
        </svg>

        {/* Solid original logo */}
        <img
          src={logoSrc}
          alt="Logo"
          width="444"
          height="316"
          decoding="sync"
          fetchPriority="high"
          className={`splash-screen__original-logo ${
            isFormed ? "splash-screen__original-logo--visible" : ""
          } ${
            stage === "holding" || isOpening
              ? "splash-screen__original-logo--settled"
              : ""
          }`}
        />
      </div>
    </div>
  );
}
