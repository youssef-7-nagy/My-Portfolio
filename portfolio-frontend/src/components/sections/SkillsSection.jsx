import { useState, useEffect, useRef, useCallback } from 'react';
import { Code } from 'lucide-react';
import {
  technicalExpertise,
  developerToolkit
} from '../../data/skillsData';
import dbStackImg from '../../assets/logos/DB.png';
import './SkillsSection.css';

const BASE_COMPOSITION_WIDTH = 820;

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const compositionViewportRef = useRef(null);
  const compositionCanvasRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(() => technicalExpertise.backend.skills[0]); // Default to Node.js
  const [hoveredCard, setHoveredCard] = useState(null);
  const [compositionScale, setCompositionScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(null);

  // Measure available width & canvas height to scale the desktop composition proportionally below 960px
  const updateCompositionScale = useCallback(() => {
    const viewportEl = compositionViewportRef.current;
    const canvasEl = compositionCanvasRef.current;
    if (!viewportEl || !canvasEl) return;

    const availableWidth = viewportEl.clientWidth;
    if (availableWidth <= 0) return;

    if (availableWidth < BASE_COMPOSITION_WIDTH) {
      const nextScale = availableWidth / BASE_COMPOSITION_WIDTH;
      const canvasHeight = canvasEl.offsetHeight;
      setCompositionScale(nextScale);
      setScaledHeight(Math.ceil(canvasHeight * nextScale));
    } else {
      setCompositionScale(1);
      setScaledHeight(null);
    }
  }, []);

  useEffect(() => {
    const viewportEl = compositionViewportRef.current;
    const canvasEl = compositionCanvasRef.current;
    if (!viewportEl || !canvasEl) return;

    let rafId = window.requestAnimationFrame(updateCompositionScale);

    const handleResize = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateCompositionScale);
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(viewportEl);
      resizeObserver.observe(canvasEl);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateCompositionScale]);

  // Re-measure scaled height when selectedSkill changes (e.g. description length changes)
  useEffect(() => {
    const rafId = window.requestAnimationFrame(updateCompositionScale);
    return () => window.cancelAnimationFrame(rafId);
  }, [selectedSkill, updateCompositionScale]);

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`section skills-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Technical Skills and Developer Toolkit"
    >
      {/* Background Ambient Glow Accents */}
      <div className="skills-bg-glow skills-bg-glow--teal" aria-hidden="true" />
      <div className="skills-bg-glow skills-bg-glow--yellow" aria-hidden="true" />
      <div className="skills-bg-grid" aria-hidden="true" />

      <div className="container skills-container">
        {/* ====================================================================
            PART 1: TECHNICAL EXPERTISE SECTION
            ==================================================================== */}
        <div className="skills-header">
          <div className="skills-pill-badge">
            <Code size={14} className="skills-pill-badge__icon" />
            <span>Technical Skills</span>
          </div>

          <h2 className="section-title skills-title">
            My Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle skills-subtitle">
            A complete development ecosystem — from frontend interfaces to scalable backend APIs and database architecture.
          </p>
        </div>

        {/* Responsive Composition Viewport: scales the desktop wide-box layout proportionally below 960px */}
        <div
          className="skills-composition-viewport"
          ref={compositionViewportRef}
          style={scaledHeight !== null ? { height: `${scaledHeight}px` } : undefined}
        >
          <div
            className={`skills-composition-canvas ${compositionScale < 1 ? 'is-scaled' : ''}`}
            ref={compositionCanvasRef}
            style={
              compositionScale < 1
                ? {
                    width: `${BASE_COMPOSITION_WIDTH}px`,
                    transform: `scale(${compositionScale})`,
                    transformOrigin: 'top left',
                  }
                : undefined
            }
          >
            {/* 3-Column Interactive Architecture Layout: Left Cards + Center 3D Stack + Right Primary Backend */}
            <div className="skills-ecosystem-grid">
          {/* ----- Left Column: Frontend & Databases Cards ----- */}
          <div className="skills-col skills-col--left">
            {/* Frontend Development Card */}
            <div
              className={`skill-card skill-card--frontend ${hoveredCard === 'frontend' ? 'is-card-hovered' : ''
                }`}
              onMouseEnter={() => setHoveredCard('frontend')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="skill-card__header">
                <div className="skill-card__icon-box skill-card__icon-box--teal">
                  <technicalExpertise.frontend.icon size={20} />
                </div>
                <div className="skill-card__header-text">
                  <h3 className="skill-card__title">{technicalExpertise.frontend.title}</h3>
                  <p className="skill-card__subtitle">{technicalExpertise.frontend.subtitle}</p>
                </div>
              </div>

              <div className="skill-card__items-grid">
                {technicalExpertise.frontend.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkill?.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={`skill-item-pill ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      title={`${skill.name} (${skill.level})`}
                    >
                      <div
                        className="skill-item-pill__icon"
                        style={{ '--brand-color': skill.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="skill-item-pill__name">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Databases Card */}
            <div
              className={`skill-card skill-card--database ${hoveredCard === 'database' ? 'is-card-hovered' : ''
                }`}
              onMouseEnter={() => setHoveredCard('database')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="skill-card__header">
                <div className="skill-card__icon-box skill-card__icon-box--green">
                  <technicalExpertise.databases.icon size={20} />
                </div>
                <div className="skill-card__header-text">
                  <h3 className="skill-card__title">{technicalExpertise.databases.title}</h3>
                  <p className="skill-card__subtitle">{technicalExpertise.databases.subtitle}</p>
                </div>
              </div>

              <div className="skill-card__items-grid skill-card__items-grid--db">
                {technicalExpertise.databases.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkill?.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={`skill-item-pill ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      title={`${skill.name} (${skill.level})`}
                    >
                      <div
                        className="skill-item-pill__icon"
                        style={{ '--brand-color': skill.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="skill-item-pill__name">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ----- Center Column: 3D Stack Architecture Visual (DB.png) ----- */}
          <div className="skills-col skills-col--center">
            <div className="skills-center-stack-wrapper">
              <img
                src={dbStackImg}
                alt="3D Stacked Architecture Model (Frontend, Backend, Database)"
                className="skills-center-stack-img"
                draggable={false}
                onLoad={updateCompositionScale}
              />
            </div>
          </div>

          {/* ----- Right Column: Backend Development (Primary Specialization) ----- */}
          <div className="skills-col skills-col--right">
            <div
              className={`skill-card skill-card--backend skill-card--primary-highlight ${hoveredCard === 'backend' ? 'is-card-hovered' : ''
                }`}
              onMouseEnter={() => setHoveredCard('backend')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="skill-card__header">
                <div className="skill-card__icon-box skill-card__icon-box--primary">
                  <technicalExpertise.backend.icon size={22} />
                </div>
                <div className="skill-card__header-text">
                  <h3 className="skill-card__title">{technicalExpertise.backend.title}</h3>
                  <p className="skill-card__subtitle">{technicalExpertise.backend.subtitle}</p>
                </div>
              </div>

              <div className="skill-card__items-grid skill-card__items-grid--backend">
                {technicalExpertise.backend.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isSelected = selectedSkill?.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      className={`skill-item-pill ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={() => setSelectedSkill(skill)}
                      title={`${skill.name} (${skill.level})`}
                    >
                      <div
                        className="skill-item-pill__icon"
                        style={{ '--brand-color': skill.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="skill-item-pill__name">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Skill Spotlight Card / Details Drawer */}
        {selectedSkill && (
          <div className="skill-spotlight-bar" role="status" aria-live="polite">
            <div className="skill-spotlight-bar__left">
              <div
                className="skill-spotlight-bar__icon-wrapper"
                style={{ '--spotlight-color': selectedSkill.color }}
              >
                <selectedSkill.icon size={26} />
              </div>
              <div className="skill-spotlight-bar__meta">
                <div className="skill-spotlight-bar__title-row">
                  <h4 className="skill-spotlight-bar__name">{selectedSkill.name}</h4>
                  <span className="skill-spotlight-bar__level">{selectedSkill.level}</span>
                  <span className="skill-spotlight-bar__cat-badge">
                    {selectedSkill.category.toUpperCase()}
                  </span>
                </div>
                <p className="skill-spotlight-bar__desc">{selectedSkill.desc}</p>
              </div>
            </div>

            {selectedSkill.projects && selectedSkill.projects.length > 0 && (
              <div className="skill-spotlight-bar__right">
                <span className="skill-spotlight-bar__projects-label">Applied in Projects:</span>
                <div className="skill-spotlight-bar__projects-pills">
                  {selectedSkill.projects.map((proj) => (
                    <span key={proj} className="skill-spotlight-bar__project-pill">
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
          </div>
        </div>

        {/* ====================================================================
            PART 2: DEVELOPER TOOLKIT & ENGINEERING WORKFLOW
            ==================================================================== */}
        <div className="developer-toolkit-wrapper">
          <div className="skills-header toolkit-header">
            <h3 className="section-title toolkit-title">
              Developer Toolkit & <span className="gradient-text">Engineering Workflow</span>
            </h3>
            <p className="section-subtitle toolkit-subtitle">
              The tools, containerization pipelines, and architectural standards I use to build, deploy, and scale applications.
            </p>
          </div>

          {/* 4 Connected Cards Pipeline + Laptop Perspective Display */}
          <div className="toolkit-workflow-container">
            <div className="toolkit-cards-flow">
              {developerToolkit.map((step, index) => {
                const StepIcon = step.icon;
                const isLast = index === developerToolkit.length - 1;

                return (
                  <div key={step.id} className="toolkit-step-item">
                    <div className="toolkit-card" style={{ '--step-accent': step.accent }}>
                      <div className="toolkit-card__top">
                        <div className="toolkit-card__icon-box">
                          <StepIcon size={20} />
                        </div>
                        <span className="toolkit-card__number">{step.stepNumber}</span>
                      </div>

                      <h4 className="toolkit-card__title">{step.title}</h4>
                      <p className="toolkit-card__subtitle">{step.subtitle}</p>

                      <div className="toolkit-card__tools-list">
                        {step.tools.map((tool) => {
                          const ToolIcon = tool.icon;
                          return (
                            <span key={tool.name} className="toolkit-tool-tag">
                              <ToolIcon size={14} style={{ color: tool.color }} />
                              <span>{tool.name}</span>
                            </span>
                          );
                        })}
                      </div>

                      <p className="toolkit-card__desc">{step.desc}</p>
                    </div>

                    {/* Animated Golden Multi-Chevron Arrows Between Workflow Steps */}
                    {!isLast && (
                      <div className="toolkit-flow-connector" aria-hidden="true">
                        <svg
                          className="golden-more-arrows"
                          viewBox="0 0 66 76"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon
                            className="golden-arrow golden-arrow-top"
                            points="27.9,37.6 1.3,1.8 0,3.3 25.3,37.6 0,71.9 1.3,73.7"
                          />
                          <polygon
                            className="golden-arrow golden-arrow-middle"
                            points="45.8,37.6 18.7,0.8 16.4,4.4 41.2,37.6 16.4,71.2 18.7,74.5"
                          />
                          <polygon
                            className="golden-arrow golden-arrow-bottom"
                            points="64,37.6 36.1,0 32.8,5.1 56.8,37.6 32.8,70.4 36.1,75.5"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Integrated Code Terminal & Laptop Display Visual */}
            <div className="toolkit-laptop-display" aria-hidden="true">
              <div className="toolkit-laptop-screen">
                <div className="laptop-screen-header">
                  <span className="laptop-dot laptop-dot--red" />
                  <span className="laptop-dot laptop-dot--yellow" />
                  <span className="laptop-dot laptop-dot--green" />
                  <span className="laptop-screen-title">terminal — youssef@dev: ~/portfolio</span>
                </div>
                <div className="laptop-screen-body">
                  <p className="laptop-code-line">
                    <span className="laptop-code-prompt">&gt;</span> git status
                  </p>
                  <p className="laptop-code-output">On branch main. Ready to ship to production.</p>
                  <p className="laptop-code-line">
                    <span className="laptop-code-prompt">&gt;</span> docker compose up -d
                  </p>
                  <p className="laptop-code-success">
                    ✔ Container api-cluster [Running on port 5000]
                  </p>
                  <p className="laptop-code-success">✔ MongoDB Replica [Health: OK]</p>
                  <div className="laptop-screen-brackets">
                    <span>&lt; / &gt;</span>
                  </div>
                </div>
              </div>
              <div className="toolkit-laptop-base" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
