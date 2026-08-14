"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { IconMan, IconMap2, IconWoman } from "@tabler/icons-react";
import { prologueSlides as slides, type Gender } from "@/app/content/story";

type Screen = "menu" | "intro" | "choose" | "experience";
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
  { screen: "experience", label: "Experience", detail: "Enter the first chapter" },
];

function JourneyMap({ side, screen, selectedGender, onNavigate }: { side: Gender; screen: Screen; selectedGender: Gender | null; onNavigate: (screen: Screen) => void }) {
  const progress = mapStages.findIndex((stage) => stage.screen === screen);
  return (
    <section className={`journey-map ${side}`} aria-label={`${side} journey map`}>
      <header><Character gender={side} /><span><small>{side} map</small><strong>The {side} path</strong></span></header>
      <ol>
        {mapStages.map((stage, index) => {
          const pathMismatch = stage.screen === "experience" && selectedGender !== side;
          const locked = index > progress || pathMismatch;
          const current = stage.screen === screen && (!pathMismatch || screen !== "experience");
          return (
            <li key={stage.screen} className={`${current ? "current" : ""} ${index < progress && !pathMismatch ? "done" : ""} ${locked ? "locked" : ""}`}>
              <button disabled={locked} onClick={() => onNavigate(stage.screen)}>
                <span className="map-node">{index < progress && !pathMismatch ? "✓" : index + 1}</span>
                <span className="map-stage-copy"><strong>{stage.label}</strong><small>{locked && pathMismatch ? `Choose ${side} to unlock` : stage.detail}</small></span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [slideIndex, setSlideIndex] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
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
    setScreen("menu");
  }

  function navigateFromMap(nextScreen: Screen) {
    setMapOpen(false);
    setScreen(nextScreen);
  }

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
            <button className={`select-card male ${gender === "male" ? "selected" : ""}`} onClick={() => setGender("male")} role="radio" aria-checked={gender === "male"}>
              <span className="card-code">M · 01</span>
              <Character gender="male" large />
              <span className="card-copy"><small>Play as</small><strong>Male</strong><i>the male experience</i></span>
              <span className="select-mark">{gender === "male" ? "✓" : "+"}</span>
            </button>
            <div className="versus"><span />or<span /></div>
            <button className={`select-card female ${gender === "female" ? "selected" : ""}`} onClick={() => setGender("female")} role="radio" aria-checked={gender === "female"}>
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
        <section className={`experience-screen ${gender} screen-enter`}>
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("choose")}>← Character select</button>
            <Brand compact />
            <button className="text-button" onClick={returnToMenu}>Main menu</button>
          </header>
          <div className="experience-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="experience-character"><Character gender={gender} large /></div>
          <div className="experience-copy">
            <span>Chapter one</span>
            <h2>The <em>{gender}</em><br />experience</h2>
            <p>Your path is chosen. The first scenario for this perspective is coming next.</p>
            <button disabled><span>Continue soon</span><i>···</i></button>
          </div>
        </section>
      )}

      {(settingsOpen || recapOpen || mapOpen) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => { setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); }}>
          <section className={`game-modal ${mapOpen ? "map-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => { setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); }} aria-label="Close">×</button>
            {mapOpen ? (
              <>
                <span className="modal-kicker">Your journey</span><h2 id="modal-title">Map</h2>
                <div className="dual-map">
                  <JourneyMap side="female" screen={screen} selectedGender={gender} onNavigate={navigateFromMap} />
                  <JourneyMap side="male" screen={screen} selectedGender={gender} onNavigate={navigateFromMap} />
                </div>
              </>
            ) : settingsOpen ? (
              <>
                <span className="modal-kicker">System</span><h2 id="modal-title">Settings</h2>
                <label className="setting-row"><span><strong>Auto-advance</strong><small>Move through prologue slides every 3.5 seconds</small></span><input type="checkbox" checked={autoAdvance} onChange={(event) => setAutoAdvance(event.target.checked)} /></label>
                <label className="setting-row"><span><strong>Reduce motion</strong><small>Minimize scene and interface animation</small></span><input type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /></label>
              </>
            ) : (
              <>
                <span className="modal-kicker">Your journey</span><h2 id="modal-title">Recap</h2>
                {gender ? <div className={`recap-character ${gender}`}><Character gender={gender} /><span><small>Last path</small><strong>The {gender} experience</strong></span></div> : <p className="empty-recap">No journey recorded yet.<br />Start the prologue and choose a character.</p>}
                <button className="modal-action" onClick={() => { setRecapOpen(false); gender ? setScreen("experience") : startGame(); }}>{gender ? "Resume" : "Begin"}<span>→</span></button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
