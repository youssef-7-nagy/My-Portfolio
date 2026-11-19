import { useState, useEffect, useRef } from 'react';
import {
  Code,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import {
  technicalExpertise,
  developerToolkit
} from '../../data/skillsData';
import './SkillsSection.css';

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(() => technicalExpertise.backend.skills[0]); // Default to Node.js
  const [hoveredCard, setHoveredCard] = useState(null);

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

        {/* 3-Column Interactive Architecture Layout: Left Cards + Center 3D Stack + Right Primary Backend */}
        <div className="skills-ecosystem-grid">
          {/* ----- Left Column: Frontend & Databases Cards ----- */}
          <div className="skills-col skills-col--left">
            {/* Frontend Development Card */}
            <div
              className={`skill-card skill-card--frontend ${
                hoveredCard === 'frontend' ? 'is-card-hovered' : ''
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
              className={`skill-card skill-card--database ${
                hoveredCard === 'database' ? 'is-card-hovered' : ''
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

          {/* ----- Center Column: 3D Isometric Ecosystem Architecture Stack ----- */}
          <div className="skills-col skills-col--center">
            <div className="ecosystem-stack-wrapper">
              {/* Isometric Slabs Container */}
              <div className="stack-isometric-layers" role="region" aria-label="Architecture Stack">
                {/* Slab 1: Frontend */}
                <div
                  className="stack-slab stack-slab--frontend"
                >
                  <div className="stack-slab__top">
                    <span className="stack-slab__label">Frontend</span>
                    <span className="stack-slab__tech-tag">React • Next.js • UI</span>
                  </div>
                  <div className="stack-slab__front" />
                  <div className="stack-slab__side" />
                </div>

                {/* Connecting Pulse Line Between Tiers */}
                <div className="stack-connector-pulse stack-connector-pulse--top" />

                {/* Slab 2: Backend (PRIMARY - Bright Glowing Core) */}
                <div
                  className="stack-slab stack-slab--backend is-primary-core"
                >
                  <div className="stack-slab__top">
                    <span className="stack-slab__label">Backend</span>
                    <span className="stack-slab__tech-tag">Node.js • Express • REST APIs</span>
                  </div>
                  <div className="stack-slab__front" />
                  <div className="stack-slab__side" />
                  <div className="stack-slab__glow-aura" />
                </div>

                {/* Connecting Pulse Line Between Tiers */}
                <div className="stack-connector-pulse stack-connector-pulse--bottom" />

                {/* Slab 3: Database */}
                <div
                  className="stack-slab stack-slab--database"
                >
                  <div className="stack-slab__top">
                    <span className="stack-slab__label">Database</span>
                    <span className="stack-slab__tech-tag">MongoDB • MySQL • SQL</span>
                  </div>
                  <div className="stack-slab__front" />
                  <div className="stack-slab__side" />
                </div>
              </div>

              {/* Circuit SVG Lines Radiating outward to cards */}
              <svg
                className="stack-circuit-wires"
                viewBox="0 0 400 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Left wire to Frontend */}
                <path
                  d="M 120 70 C 50 70, 20 60, 0 50"
                  className="wire-path wire-path--teal"
                />
                <circle cx="10" cy="52" r="3" className="wire-node" />

                {/* Left wire to Databases */}
                <path
                  d="M 120 250 C 60 250, 20 260, 0 270"
                  className="wire-path wire-path--teal"
                />
                <circle cx="10" cy="268" r="3" className="wire-node" />

                {/* Right wires to Backend */}
                <path
                  d="M 280 155 C 330 155, 370 155, 400 155"
                  className="wire-path wire-path--bright"
                />
                <circle cx="390" cy="155" r="4" className="wire-node wire-node--bright" />
              </svg>
            </div>
          </div>

          {/* ----- Right Column: Backend Development (Primary Specialization) ----- */}
          <div className="skills-col skills-col--right">
            <div
              className={`skill-card skill-card--backend skill-card--primary-highlight ${
                hoveredCard === 'backend' ? 'is-card-hovered' : ''
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

                      {/* Animated Connector Arrow Between Workflow Steps */}
                      {!isLast && (
                        <div className="toolkit-flow-connector" aria-hidden="true">
                          <div className="toolkit-connector-line" />
                          <div className="toolkit-connector-arrow">
                            <ArrowRight size={18} className="arrow-horizontal" />
                            <ArrowDown size={18} className="arrow-vertical" />
                          </div>
                          <span className="toolkit-flow-pulse" />
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
