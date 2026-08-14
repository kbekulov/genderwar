"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { IconBuildingBank, IconHeartHandshake, IconMan, IconMap2, IconTrendingUp, IconWoman } from "@tabler/icons-react";
import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { experienceSections, prologueSlides as slides, terminology, type ExperienceSectionId, type Gender } from "@/app/content/story";

type Screen = "menu" | "intro" | "choose" | "experience" | ExperienceSectionId;
function Character({ gender, large = false }: { gender: Gender; large?: boolean }) {
  const Icon = gender === "male" ? IconMan : IconWoman;
  return (
    <span className={`game-character ${gender} ${large ? "large" : ""}`} aria-hidden="true">
      <span className="character-orbit orbit-one" />
      <span className="character-orbit orbit-two" />
      <Icon className="character-glyph" stroke={1.35} />
    </span>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`game-brand ${compact ? "compact" : ""}`}>
      <span className="brand-gender">gender</span>
      <span className="brand-slash" />
      <span className="brand-war">war</span>
    </span>
  );
}

const mapStages: Array<{ screen: Screen; label: string; detail: string }> = [
  { screen: "menu", label: "Origin", detail: "Begin the journey" },
  { screen: "intro", label: "The signals", detail: "Five changes in society" },
  { screen: "choose", label: "Perspective", detail: "Choose whose path to follow" },
  { screen: "experience", label: "Experience", detail: "Three lenses on the path" },
  ...experienceSections.map((section) => ({ screen: section.id, label: section.mapLabel, detail: section.eyebrow })),
];

const sectionIcons = {
  selection: IconHeartHandshake,
  politics: IconBuildingBank,
  value: IconTrendingUp,
};

type JourneyNodeData = {
  stage: (typeof mapStages)[number];
  index: number;
  locked: boolean;
  current: boolean;
  done: boolean;
  mismatch: boolean;
  onNavigate: (screen: Screen) => void;
};

type JourneyNode = Node<JourneyNodeData, "journey">;

function JourneyStageNode({ data }: NodeProps<JourneyNode>) {
  return (
    <div className={`path-stage ${data.current ? "current" : ""} ${data.done ? "done" : ""} ${data.locked ? "locked" : ""}`}>
      <Handle type="target" position={Position.Bottom} />
      <button disabled={data.locked} onClick={() => data.onNavigate(data.stage.screen)}>
        <span className="path-checkpoint">{data.done ? "✓" : data.index + 1}</span>
        <span className="path-label">
          <strong>{data.stage.label}</strong>
          <small>{data.mismatch ? "Other path" : data.current ? "You are here" : data.stage.detail}</small>
        </span>
      </button>
      <Handle type="source" position={Position.Top} />
    </div>
  );
}

const journeyNodeTypes = { journey: JourneyStageNode };

function JourneyMap({ side, screen, selectedGender, visitedSections, onNavigate }: { side: Gender; screen: Screen; selectedGender: Gender | null; visitedSections: ExperienceSectionId[]; onNavigate: (screen: Screen) => void }) {
  const progress = mapStages.findIndex((stage) => stage.screen === screen);
  const mirrored = side === "male";
  const nodes: JourneyNode[] = mapStages.map((stage, index) => {
    const isExperienceStage = index >= 3;
    const pathMismatch = isExperienceStage && selectedGender !== null && selectedGender !== side;
    const waitingForChoice = isExperienceStage && selectedGender === null;
    const onboardingLocked = progress < 3 && index > progress;
    const locked = pathMismatch || waitingForChoice || onboardingLocked;
    const current = stage.screen === screen && !pathMismatch;
    const sectionVisited = index >= 4 && visitedSections.includes(stage.screen as ExperienceSectionId);
    const goesRight = (index % 2 === 0) !== mirrored;
    return {
      id: `${side}-${stage.screen}`,
      type: "journey",
      position: { x: goesRight ? 92 : 0, y: 516 - index * 84 },
      data: {
        stage,
        index,
        locked,
        current,
        done: !pathMismatch && (index < Math.min(progress, 4) || sectionVisited),
        mismatch: pathMismatch,
        onNavigate,
      },
      draggable: false,
      selectable: !locked,
    };
  });
  const edges: Edge[] = mapStages.slice(0, -1).map((stage, index) => {
    const next = mapStages[index + 1];
    const targetVisited = index + 1 < Math.min(progress + 1, 4) || (index + 1 >= 4 && visitedSections.includes(next.screen as ExperienceSectionId));
    return {
      id: `${side}-${stage.screen}-${next.screen}`,
      source: `${side}-${stage.screen}`,
      target: `${side}-${next.screen}`,
      type: "bezier",
      animated: targetVisited && next.screen === screen,
      className: targetVisited ? "path-edge reached" : "path-edge",
    };
  });

  return (
    <section className={`journey-map ${side}`} aria-label={`${side} journey map`}>
      <header><Character gender={side} /><span><small>{side} map</small><strong>The {side} path</strong></span></header>
      <div className="journey-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={journeyNodeTypes}
          fitView
          fitViewOptions={{ padding: 0.08, maxZoom: 1 }}
          minZoom={0.72}
          maxZoom={1.18}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnDrag
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomOnPinch
          preventScrolling
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.2} />
        </ReactFlow>
      </div>
      <p className="map-touch-hint">Drag to explore · pinch to zoom · tap a level</p>
    </section>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [slideIndex, setSlideIndex] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [visitedSections, setVisitedSections] = useState<ExperienceSectionId[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [terminologyOpen, setTerminologyOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [floodTone, setFloodTone] = useState<"male" | "female" | "neutral" | null>(null);
  const pointerStart = useRef<number | null>(null);
  const transitionLocked = useRef(false);

  useEffect(() => {
    if (!autoAdvance || screen !== "intro" || reducedMotion) return;
    const timer = window.setTimeout(() => {
      advanceSlide();
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, reducedMotion, screen, slideIndex]);

  function startGame() {
    setSlideIndex(0);
    setGender(null);
    setVisitedSections([]);
    setScreen("intro");
  }

  function toneForSlide(index: number): "male" | "female" | "neutral" {
    const id = slides[index]?.id;
    if (id === "retreat") return "male";
    if (id === "depression") return "female";
    return "neutral";
  }

  function moveToSlide(index: number | "choose") {
    if (transitionLocked.current) return;
    transitionLocked.current = true;
    setFloodTone(index === "choose" ? "neutral" : toneForSlide(index));
    window.setTimeout(() => {
      if (index === "choose") setScreen("choose");
      else setSlideIndex(index);
    }, reducedMotion ? 0 : 520);
    window.setTimeout(() => {
      setFloodTone(null);
      transitionLocked.current = false;
    }, reducedMotion ? 30 : 1040);
  }

  function advanceSlide() {
    if (slideIndex < slides.length - 1) moveToSlide(slideIndex + 1);
    else moveToSlide("choose");
  }

  function handleStoryPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (start === null) return;
    const distance = event.clientX - start;
    if (distance > 48 && slideIndex > 0) moveToSlide(slideIndex - 1);
    else advanceSlide();
  }

  function returnToMenu() {
    setSettingsOpen(false);
    setRecapOpen(false);
    setMapOpen(false);
    setTerminologyOpen(false);
    setScreen("menu");
  }

  function navigateFromMap(nextScreen: Screen) {
    setMapOpen(false);
    if (nextScreen === "selection" || nextScreen === "politics" || nextScreen === "value") {
      setVisitedSections((visited) => visited.includes(nextScreen) ? visited : [...visited, nextScreen]);
    }
    setScreen(nextScreen);
  }

  function chooseGender(nextGender: Gender) {
    if (gender !== nextGender) setVisitedSections([]);
    setGender(nextGender);
  }

  function enterSection(section: ExperienceSectionId) {
    setVisitedSections((visited) => visited.includes(section) ? visited : [...visited, section]);
    setScreen(section);
  }

  const activeSection = experienceSections.find((section) => section.id === screen);

  return (
    <main className={`game-shell ${reducedMotion ? "reduce-motion" : ""}`}>
      <div className="noise" />
      <button className="map-dock" onClick={() => setMapOpen(true)} aria-label="Open journey map"><IconMap2 stroke={2.4} /><span>Map</span></button>

      {screen === "menu" && (
        <section className="menu-screen screen-enter" aria-label="Gender War main menu">
          <div className="menu-world" aria-hidden="true">
            <div className="world-side world-male"><Character gender="male" large /></div>
            <div className="world-rift"><span /><span /><span /></div>
            <div className="world-side world-female"><Character gender="female" large /></div>
          </div>

          <header className="menu-header">
            <span>an interactive story</span>
            <span>v0.3 · prologue</span>
          </header>

          <div className="menu-content">
            <p className="menu-kicker"><span /> two perspectives · one society</p>
            <h1><Brand /></h1>
            <p className="menu-tagline">Choose a side.<br />Understand both.</p>
            <nav className="game-menu" aria-label="Game menu">
              <button className="menu-action primary" onClick={startGame}>
                <span className="menu-index">01</span><strong>Start</strong><i>→</i>
              </button>
              <button className="menu-action" onClick={() => setSettingsOpen(true)}>
                <span className="menu-index">02</span><strong>Settings</strong><i>⌁</i>
              </button>
              <button className="menu-action" onClick={() => setRecapOpen(true)}>
                <span className="menu-index">03</span><strong>Recap</strong><i>↺</i>
              </button>
              <button className="menu-action" onClick={() => setMapOpen(true)}>
                <span className="menu-index">04</span><strong>Map</strong><i>⌖</i>
              </button>
              <button className="menu-action" onClick={() => setTerminologyOpen(true)}>
                <span className="menu-index">05</span><strong>Terminology</strong><i>≡</i>
              </button>
            </nav>
          </div>

          <footer className="menu-footer">
            <span>Best experienced with sound off and attention on.</span>
            <span>Scroll not required</span>
          </footer>
        </section>
      )}

      {screen === "intro" && (
        <section className={`story-screen story-${slides[slideIndex].id}`} aria-live="polite">
          <header className="story-header">
            <button className="text-button" onClick={returnToMenu}>← Menu</button>
            <Brand compact />
            <button className="text-button" onClick={() => setScreen("choose")}>Skip intro</button>
          </header>

          <div className="story-visual" key={`visual-${slideIndex}`} aria-hidden="true">
            <div className="visual-grid" />
            {Array.from({ length: 18 }).map((_, index) => <span className="signal-particle" key={index} style={{ "--i": index } as CSSProperties} />)}
            <div className="trend-lines">
              {Array.from({ length: 7 }).map((_, index) => <span key={index} style={{ "--bar": index } as CSSProperties} />)}
            </div>
            <div className="question-rings"><span /><span /><span /><b>?</b></div>
          </div>

          <div className="story-copy" key={`copy-${slideIndex}`}>
            <span className="story-number">{slides[slideIndex].label}</span>
            <h2>{slides[slideIndex].text}</h2>
            <p>{slides[slideIndex].note}</p>
          </div>

          <button
            className="story-tap-layer"
            aria-label={slideIndex === slides.length - 1 ? "Continue to character selection" : "Continue to next story slide"}
            onPointerDown={(event) => { pointerStart.current = event.clientX; }}
            onPointerUp={handleStoryPointerUp}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") advanceSlide();
              if (event.key === "ArrowLeft" && slideIndex > 0) moveToSlide(slideIndex - 1);
            }}
          />
          <div className="story-gesture-hint" aria-hidden="true">
            <span>{String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            <strong>{slideIndex === slides.length - 1 ? "Tap to choose your character" : "Tap or swipe to continue"}</strong>
            <i>→</i>
          </div>
          {floodTone && <div className={`story-flood ${floodTone}`} aria-hidden="true"><span /><span /><span /></div>}
        </section>
      )}

      {screen === "choose" && (
        <section className="choose-screen screen-enter">
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("intro")}>← Prologue</button>
            <Brand compact />
            <span className="step-count">Step 02 / 02</span>
          </header>

          <div className="choose-heading">
            <span>Your perspective</span>
            <h2>Choose your character</h2>
            <p>You will see the same world through a different set of pressures, incentives, and expectations.</p>
          </div>

          <div className="character-select" role="radiogroup" aria-label="Choose a character">
            <button className={`select-card male ${gender === "male" ? "selected" : ""}`} onClick={() => chooseGender("male")} role="radio" aria-checked={gender === "male"}>
              <span className="card-code">M · 01</span>
              <Character gender="male" large />
              <span className="card-copy"><small>Play as</small><strong>Male</strong><i>the male experience</i></span>
              <span className="select-mark">{gender === "male" ? "✓" : "+"}</span>
            </button>
            <div className="versus"><span />or<span /></div>
            <button className={`select-card female ${gender === "female" ? "selected" : ""}`} onClick={() => chooseGender("female")} role="radio" aria-checked={gender === "female"}>
              <span className="card-code">F · 02</span>
              <Character gender="female" large />
              <span className="card-copy"><small>Play as</small><strong>Female</strong><i>the female experience</i></span>
              <span className="select-mark">{gender === "female" ? "✓" : "+"}</span>
            </button>
          </div>

          <button className="begin-button" disabled={!gender} onClick={() => gender && setScreen("experience")}>
            <span>{gender ? `Enter the ${gender} experience` : "Select a character"}</span><i>→</i>
          </button>
        </section>
      )}

      {screen === "experience" && gender && (
        <section className={`experience-screen chapter-hub ${gender} screen-enter`}>
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("choose")}>← Character select</button>
            <Brand compact />
            <button className="text-button" onClick={returnToMenu}>Main menu</button>
          </header>
          <div className="experience-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="experience-character"><Character gender={gender} large /></div>
          <div className="experience-copy experience-hub">
            <span>Your three lenses</span>
            <h2>The <em>{gender}</em><br />experience</h2>
            <p>Explore the same three forces from this perspective. Each chapter will grow as new findings and evidence are added.</p>
            <div className="chapter-grid">
              {experienceSections.map((section) => {
                const Icon = sectionIcons[section.id];
                return (
                  <button key={section.id} className="chapter-card" onClick={() => enterSection(section.id)}>
                    <span className="chapter-icon"><Icon stroke={2.25} /></span>
                    <small>{section.number} · {section.eyebrow}</small>
                    <strong>{section.title}</strong>
                    <i>→</i>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {activeSection && gender && (
        <section className={`chapter-screen ${gender} screen-enter`}>
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("experience")}>← Experience</button>
            <Brand compact />
            <button className="text-button" onClick={returnToMenu}>Main menu</button>
          </header>
          <div className="chapter-number" aria-hidden="true">{activeSection.number}</div>
          <article className="chapter-content">
            <span className="chapter-eyebrow">{activeSection.eyebrow}</span>
            <h2>{activeSection.title}</h2>
            <p className="chapter-description">{activeSection.description}</p>
            <blockquote>{activeSection.prompt[gender]}</blockquote>
            <div className="chapter-lenses" aria-label="Topics in this chapter">
              {activeSection.lenses.map((lens, index) => <span key={lens}><b>{String(index + 1).padStart(2, "0")}</b>{lens}</span>)}
            </div>
            <footer>
              <span>Framework ready</span>
              <p>Interactive scenarios and evidence will live inside this chapter.</p>
              {experienceSections.findIndex((section) => section.id === activeSection.id) < experienceSections.length - 1 ? (
                <button onClick={() => enterSection(experienceSections[experienceSections.findIndex((section) => section.id === activeSection.id) + 1].id)}>Next chapter <i>→</i></button>
              ) : (
                <button onClick={() => setScreen("experience")}>All chapters <i>↺</i></button>
              )}
            </footer>
          </article>
        </section>
      )}

      {(settingsOpen || recapOpen || mapOpen || terminologyOpen) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget !== event.target) return; setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); }}>
          <section className={`game-modal ${mapOpen ? "map-modal" : ""} ${terminologyOpen ? "terms-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => { setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); }} aria-label="Close">×</button>
            {terminologyOpen ? (
              <>
                <span className="modal-kicker">Language of the debate</span><h2 id="modal-title">Terminology</h2>
                <p className="terms-intro">These labels change across communities. The glossary describes common usage without endorsing the worldview behind it.</p>
                <div className="terms-list">
                  {terminology.map((term) => (
                    <article className={`term-card ${term.id}`} key={term.id}>
                      <span className="term-dot" /><div><h3>{term.name}</h3><p>{term.shortDefinition}</p><small>{term.context}</small><a href={term.sources[0].url} target="_blank" rel="noreferrer">Source: {term.sources[0].label} ↗</a></div>
                    </article>
                  ))}
                </div>
              </>
            ) : mapOpen ? (
              <>
                <span className="modal-kicker">Your journey</span><h2 id="modal-title">Map</h2>
                <div className="dual-map">
                  <JourneyMap side="female" screen={screen} selectedGender={gender} visitedSections={visitedSections} onNavigate={navigateFromMap} />
                  <JourneyMap side="male" screen={screen} selectedGender={gender} visitedSections={visitedSections} onNavigate={navigateFromMap} />
                </div>
              </>
            ) : settingsOpen ? (
              <>
                <span className="modal-kicker">System</span><h2 id="modal-title">Settings</h2>
                <label className="setting-row" htmlFor="auto-advance"><span><strong>Auto-advance</strong><small>Move through prologue slides every 3.5 seconds</small></span><input id="auto-advance" aria-label="Auto-advance" type="checkbox" checked={autoAdvance} onChange={(event) => setAutoAdvance(event.target.checked)} /></label>
                <label className="setting-row" htmlFor="reduce-motion"><span><strong>Reduce motion</strong><small>Minimize scene and interface animation</small></span><input id="reduce-motion" aria-label="Reduce motion" type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /></label>
              </>
            ) : (
              <>
                <span className="modal-kicker">Your journey</span><h2 id="modal-title">Recap</h2>
                {gender ? <div className={`recap-character ${gender}`}><Character gender={gender} /><span><small>Last path</small><strong>The {gender} experience</strong></span></div> : <p className="empty-recap">No journey recorded yet.<br />Start the prologue and choose a character.</p>}
                <button className="modal-action" onClick={() => { setRecapOpen(false); if (gender) setScreen("experience"); else startGame(); }}>{gender ? "Resume" : "Begin"}<span>→</span></button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
