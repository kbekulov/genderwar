"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Screen = "menu" | "intro" | "choose" | "experience";
type Gender = "male" | "female";

const slides = [
  { id: "retreat", label: "01", text: "men are retreating from society", note: "Connection is thinning." },
  { id: "depression", label: "02", text: "women are falling into depression", note: "Wellbeing is under pressure." },
  { id: "fertility", label: "03", text: "fertility rates are dropping", note: "Fewer families are forming." },
  { id: "crime", label: "04", text: "crime rates are increasing", note: "Social trust is fraying." },
  { id: "question", label: "05", text: "what’s happening?", note: "To understand the conflict, choose a perspective." },
] as const;

function Character({ gender, large = false }: { gender: Gender; large?: boolean }) {
  return (
    <span className={`game-character ${gender} ${large ? "large" : ""}`} aria-hidden="true">
      <span className="character-orbit orbit-one" />
      <span className="character-orbit orbit-two" />
      <span className="character-head" />
      <span className="character-hair" />
      <span className="character-body" />
      <span className="character-face" />
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

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [slideIndex, setSlideIndex] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!autoAdvance || screen !== "intro" || reducedMotion) return;
    const timer = window.setTimeout(() => {
      if (slideIndex < slides.length - 1) setSlideIndex((value) => value + 1);
      else setScreen("choose");
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, reducedMotion, screen, slideIndex]);

  function startGame() {
    setSlideIndex(0);
    setGender(null);
    setScreen("intro");
  }

  function advanceSlide() {
    if (slideIndex < slides.length - 1) setSlideIndex((value) => value + 1);
    else setScreen("choose");
  }

  function returnToMenu() {
    setSettingsOpen(false);
    setRecapOpen(false);
    setScreen("menu");
  }

  return (
    <main className={`game-shell ${reducedMotion ? "reduce-motion" : ""}`}>
      <div className="noise" />

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

          <div className="story-controls">
            <div className="story-progress" aria-label={`Slide ${slideIndex + 1} of ${slides.length}`}>
              {slides.map((slide, index) => (
                <button key={slide.id} onClick={() => setSlideIndex(index)} className={index === slideIndex ? "active" : index < slideIndex ? "seen" : ""} aria-label={`Go to slide ${index + 1}`}>
                  <span /><small>{slide.label}</small>
                </button>
              ))}
            </div>
            <button className="continue-button" onClick={advanceSlide}>
              <span>{slideIndex === slides.length - 1 ? "Choose a character" : "Continue"}</span><i>→</i>
            </button>
          </div>
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

      {(settingsOpen || recapOpen) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => { setSettingsOpen(false); setRecapOpen(false); }}>
          <section className="game-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => { setSettingsOpen(false); setRecapOpen(false); }} aria-label="Close">×</button>
            {settingsOpen ? (
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
