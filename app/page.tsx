"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { IconBuildingBank, IconHeartHandshake, IconLanguage, IconMan, IconMap2, IconTrendingUp, IconWoman } from "@tabler/icons-react";
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
import { Area, AreaChart, CartesianGrid, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTranslation, localeOptions, type Locale } from "@/app/content/i18n";
import { ideologySeries, type ExperienceSection, type ExperienceSectionId, type Gender, type IdeologyPoint } from "@/app/content/story";

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

type AppCopy = ReturnType<typeof getTranslation>;
type MapStage = { screen: Screen; label: string; detail: string };

const sectionIcons = {
  selection: IconHeartHandshake,
  politics: IconBuildingBank,
  value: IconTrendingUp,
};

type JourneyNodeData = {
  stage: MapStage;
  index: number;
  locked: boolean;
  current: boolean;
  done: boolean;
  mismatch: boolean;
  mismatchLabel: string;
  currentLabel: string;
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
          <small>{data.mismatch ? data.mismatchLabel : data.current ? data.currentLabel : data.stage.detail}</small>
        </span>
      </button>
      <Handle type="source" position={Position.Top} />
    </div>
  );
}

const journeyNodeTypes = { journey: JourneyStageNode };

function IdeologyChart({ country, data, locale, ui, compact = false }: { country: keyof typeof ideologySeries; data: IdeologyPoint[]; locale: Locale; ui: AppCopy["ui"]; compact?: boolean }) {
  const regionCode = { "South Korea": "KR", US: "US", Germany: "DE", UK: "GB" }[country];
  const countryName = new Intl.DisplayNames([locale], { type: "region" }).of(regionCode) ?? country;
  return (
    <section className={`ideology-chart ${compact ? "compact" : ""}`} aria-label={`${countryName}: ${ui.ideologyGap}`}>
      <header><strong>{countryName}</strong><span><i className="women-key" />{ui.women} <i className="men-key" />{ui.men}</span></header>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: compact ? -28 : -18 }}>
            <CartesianGrid vertical={false} stroke="rgba(37,50,67,.11)" />
            <ReferenceLine y={0} stroke="rgba(37,50,67,.48)" strokeWidth={1.5} />
            <XAxis dataKey="year" axisLine={false} tickLine={false} minTickGap={18} tick={{ fill: "#747d89", fontSize: compact ? 8 : 10, fontWeight: 800 }} />
            <YAxis domain={[-30, 50]} ticks={[-20, 0, 20, 40]} axisLine={false} tickLine={false} tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}`} tick={{ fill: "#747d89", fontSize: compact ? 8 : 10, fontWeight: 800 }} />
            <Tooltip labelFormatter={(year) => `${ui.year} ${year}`} formatter={(value, name) => [`${Number(value) > 0 ? "+" : ""}${value} ${ui.points}`, name === "women" ? ui.women : ui.men]} contentStyle={{ border: 0, borderRadius: 14, boxShadow: "0 8px 28px rgba(37,50,67,.16)", fontSize: 11, fontWeight: 800 }} />
            <Area type="monotone" dataKey="women" stroke="var(--female)" strokeWidth={compact ? 3 : 4} fill="var(--female)" fillOpacity={0.12} dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="men" stroke="var(--male)" strokeWidth={compact ? 3 : 4} dot={false} activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function VotingCharts({ locale, ui }: { locale: Locale; ui: AppCopy["ui"] }) {
  return (
    <section className="voting-data" aria-labelledby="ideology-gap-title">
      <header className="voting-data-heading">
        <span>{ui.observedPattern}</span>
        <h3 id="ideology-gap-title">{ui.ideologyGap}</h3>
        <p>{ui.ideologySubtitle}</p>
      </header>
      <IdeologyChart country="US" data={ideologySeries.US} locale={locale} ui={ui} />
      <div className="global-chart-grid">
        {(Object.keys(ideologySeries) as Array<keyof typeof ideologySeries>).map((country) => <IdeologyChart key={country} country={country} data={ideologySeries[country]} locale={locale} ui={ui} compact />)}
      </div>
      <footer className="chart-source">
        <p><strong>{ui.source}:</strong> {ui.chartReading}</p>
        <p>{ui.chartReconstruction} <a href="https://www.ft.com/content/29fd9b5c-2f35-41bf-9d4c-994db4e12998" target="_blank" rel="noreferrer">Financial Times ↗</a> · <a href="https://youngamericans.berkeley.edu/2024/02/are-the-ideologies-of-young-women-and-young-men-in-the-us-diverging/" target="_blank" rel="noreferrer">{ui.methodology} ↗</a></p>
      </footer>
    </section>
  );
}

function JourneyMap({ side, screen, selectedGender, visitedSections, sections, ui, onNavigate }: { side: Gender; screen: Screen; selectedGender: Gender | null; visitedSections: ExperienceSectionId[]; sections: ExperienceSection[]; ui: AppCopy["ui"]; onNavigate: (screen: Screen) => void }) {
  const mapStages: MapStage[] = [
    { screen: "menu", label: ui.origin, detail: ui.originDetail },
    { screen: "intro", label: ui.signals, detail: ui.signalsDetail },
    { screen: "choose", label: ui.perspective, detail: ui.perspectiveDetail },
    { screen: "experience", label: ui.experience, detail: ui.experienceDetail },
    ...sections.map((section) => ({ screen: section.id, label: section.mapLabel, detail: section.eyebrow })),
  ];
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
        mismatchLabel: ui.otherPath,
        currentLabel: ui.youAreHere,
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
      <header><Character gender={side} /><span><small>{side === "female" ? ui.female : ui.male} · {ui.map}</small><strong>{side === "female" ? ui.femaleMap : ui.maleMap}</strong></span></header>
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
      <p className="map-touch-hint">{ui.mapHint}</p>
    </section>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [screen, setScreen] = useState<Screen>("menu");
  const [slideIndex, setSlideIndex] = useState(0);
  const [gender, setGender] = useState<Gender | null>(null);
  const [visitedSections, setVisitedSections] = useState<ExperienceSectionId[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [recapOpen, setRecapOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [terminologyOpen, setTerminologyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [floodTone, setFloodTone] = useState<"male" | "female" | "neutral" | null>(null);
  const pointerStart = useRef<number | null>(null);
  const transitionLocked = useRef(false);
  const localeReady = useRef(false);
  const copy = getTranslation(locale);
  const { ui, slides, sections: experienceSections, terms: terminology } = copy;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("genderwar-language") as Locale | null;
      localeReady.current = true;
      if (saved && localeOptions.some((option) => option.id === saved)) setLocale(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!localeReady.current) return;
    window.localStorage.setItem("genderwar-language", locale);
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale;
  }, [locale]);

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
    setLanguageOpen(false);
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
  const currentLocale = localeOptions.find((option) => option.id === locale) ?? localeOptions[0];

  useEffect(() => {
    if (!autoAdvance || screen !== "intro" || reducedMotion) return;
    const timer = window.setTimeout(() => advanceSlide(), 3500);
    return () => window.clearTimeout(timer);
    // advanceSlide reads the current slide and is intentionally refreshed by slideIndex.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance, reducedMotion, screen, slideIndex]);

  return (
    <main className={`game-shell ${reducedMotion ? "reduce-motion" : ""}`}>
      <div className="noise" />
      <button className="map-dock" onClick={() => setMapOpen(true)} aria-label={ui.map}><IconMap2 stroke={2.4} /><span>{ui.map}</span></button>
      <button className="language-dock" onClick={() => setLanguageOpen(true)} aria-label={ui.language}><IconLanguage stroke={2.4} /><span>{currentLocale.short}</span></button>

      {screen === "menu" && (
        <section className="menu-screen screen-enter" aria-label="Gender War main menu">
          <div className="menu-world" aria-hidden="true">
            <div className="world-side world-male"><Character gender="male" large /></div>
            <div className="world-rift"><span /><span /><span /></div>
            <div className="world-side world-female"><Character gender="female" large /></div>
          </div>

          <header className="menu-header">
            <span>{ui.interactiveStory}</span>
            <span>v0.5 · {ui.prologue}</span>
          </header>

          <div className="menu-content">
            <p className="menu-kicker"><span /> {ui.perspectives}</p>
            <h1><Brand /></h1>
            <p className="menu-tagline">{ui.taglineA}<br />{ui.taglineB}</p>
            <nav className="game-menu" aria-label="Game menu">
              <button className="menu-action primary" onClick={startGame}>
                <span className="menu-index">01</span><strong>{ui.start}</strong><i>→</i>
              </button>
              <button className="menu-action" onClick={() => setSettingsOpen(true)}>
                <span className="menu-index">02</span><strong>{ui.settings}</strong><i>⌁</i>
              </button>
              <button className="menu-action" onClick={() => setRecapOpen(true)}>
                <span className="menu-index">03</span><strong>{ui.recap}</strong><i>↺</i>
              </button>
              <button className="menu-action" onClick={() => setMapOpen(true)}>
                <span className="menu-index">04</span><strong>{ui.map}</strong><i>⌖</i>
              </button>
              <button className="menu-action" onClick={() => setTerminologyOpen(true)}>
                <span className="menu-index">05</span><strong>{ui.terminology}</strong><i>≡</i>
              </button>
            </nav>
          </div>

          <footer className="menu-footer"><span>{currentLocale.nativeName}</span><span>{ui.perspectives}</span></footer>
        </section>
      )}

      {screen === "intro" && (
        <section className={`story-screen story-${slides[slideIndex].id}`} aria-live="polite">
          <header className="story-header">
            <button className="text-button" onClick={returnToMenu}>← {ui.menu}</button>
            <Brand compact />
            <button className="text-button" onClick={() => setScreen("choose")}>{ui.skipIntro}</button>
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
            aria-label={slideIndex === slides.length - 1 ? ui.tapChoose : ui.tapNext}
            onPointerDown={(event) => { pointerStart.current = event.clientX; }}
            onPointerUp={handleStoryPointerUp}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") advanceSlide();
              if (event.key === "ArrowLeft" && slideIndex > 0) moveToSlide(slideIndex - 1);
            }}
          />
          <div className="story-gesture-hint" aria-hidden="true">
            <span>{String(slideIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            <strong>{slideIndex === slides.length - 1 ? ui.tapChoose : ui.tapNext}</strong>
            <i>→</i>
          </div>
          {floodTone && <div className={`story-flood ${floodTone}`} aria-hidden="true"><span /><span /><span /></div>}
        </section>
      )}

      {screen === "choose" && (
        <section className="choose-screen screen-enter">
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("intro")}>← {ui.prologue}</button>
            <Brand compact />
            <span className="step-count">02 / 02</span>
          </header>

          <div className="choose-heading">
            <span>{ui.choosePerspective}</span>
            <h2>{ui.chooseCharacter}</h2>
            <p>{ui.chooseDescription}</p>
          </div>

          <div className="character-select" role="radiogroup" aria-label="Choose a character">
            <button className={`select-card male ${gender === "male" ? "selected" : ""}`} onClick={() => chooseGender("male")} role="radio" aria-checked={gender === "male"}>
              <span className="card-code">M · 01</span>
              <Character gender="male" large />
              <span className="card-copy"><small>{ui.playAs}</small><strong>{ui.male}</strong><i>{ui.maleExperience}</i></span>
              <span className="select-mark">{gender === "male" ? "✓" : "+"}</span>
            </button>
            <div className="versus"><span />{ui.or}<span /></div>
            <button className={`select-card female ${gender === "female" ? "selected" : ""}`} onClick={() => chooseGender("female")} role="radio" aria-checked={gender === "female"}>
              <span className="card-code">F · 02</span>
              <Character gender="female" large />
              <span className="card-copy"><small>{ui.playAs}</small><strong>{ui.female}</strong><i>{ui.femaleExperience}</i></span>
              <span className="select-mark">{gender === "female" ? "✓" : "+"}</span>
            </button>
          </div>

          <button className="begin-button" disabled={!gender} onClick={() => gender && setScreen("experience")}>
            <span>{gender ? ui.enterExperience.replace("{gender}", gender === "male" ? ui.maleExperience : ui.femaleExperience) : ui.selectCharacter}</span><i>→</i>
          </button>
        </section>
      )}

      {screen === "experience" && gender && (
        <section className={`experience-screen chapter-hub ${gender} screen-enter`}>
          <header className="story-header">
            <button className="text-button" onClick={() => setScreen("choose")}>← {ui.characterSelect}</button>
            <Brand compact />
            <button className="text-button" onClick={returnToMenu}>{ui.mainMenu}</button>
          </header>
          <div className="experience-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="experience-character"><Character gender={gender} large /></div>
          <div className="experience-copy experience-hub">
            <span>{ui.threeLenses}</span>
            <h2><em>{gender === "male" ? ui.male : ui.female}</em><br />{ui.experience}</h2>
            <p>{ui.experienceIntro}</p>
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
            <button className="text-button" onClick={() => setScreen("experience")}>← {ui.experience}</button>
            <Brand compact />
            <button className="text-button" onClick={returnToMenu}>{ui.mainMenu}</button>
          </header>
          <div className="chapter-number" aria-hidden="true">{activeSection.number}</div>
          <article className="chapter-content">
            <span className="chapter-eyebrow">{activeSection.eyebrow}</span>
            <h2>{activeSection.title}</h2>
            <p className="chapter-description">{activeSection.description}</p>
            <blockquote>{activeSection.prompt[gender]}</blockquote>
            {activeSection.id === "politics" && <VotingCharts locale={locale} ui={ui} />}
            <div className="chapter-lenses" aria-label={ui.topics}>
              {activeSection.lenses.map((lens, index) => <span key={lens}><b>{String(index + 1).padStart(2, "0")}</b>{lens}</span>)}
            </div>
            <footer>
              <span>{ui.frameworkReady}</span>
              <p>{ui.frameworkNote}</p>
              {experienceSections.findIndex((section) => section.id === activeSection.id) < experienceSections.length - 1 ? (
                <button onClick={() => enterSection(experienceSections[experienceSections.findIndex((section) => section.id === activeSection.id) + 1].id)}>{ui.nextChapter} <i>→</i></button>
              ) : (
                <button onClick={() => setScreen("experience")}>{ui.allChapters} <i>↺</i></button>
              )}
            </footer>
          </article>
        </section>
      )}

      {(settingsOpen || recapOpen || mapOpen || terminologyOpen || languageOpen) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget !== event.target) return; setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); setLanguageOpen(false); }}>
          <section className={`game-modal ${mapOpen ? "map-modal" : ""} ${terminologyOpen ? "terms-modal" : ""} ${languageOpen ? "language-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => { setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); setLanguageOpen(false); }} aria-label={ui.close}>×</button>
            {languageOpen ? (
              <>
                <span className="modal-kicker">{ui.system}</span><h2 id="modal-title">{ui.language}</h2>
                <div className="language-grid">
                  {localeOptions.map((option) => (
                    <button key={option.id} className={locale === option.id ? "selected" : ""} lang={option.id} onClick={() => setLocale(option.id)}>
                      <span>{option.short}</span><strong>{option.nativeName}</strong><i>{locale === option.id ? "✓" : ""}</i>
                    </button>
                  ))}
                </div>
              </>
            ) : terminologyOpen ? (
              <>
                <span className="modal-kicker">{ui.debateLanguage}</span><h2 id="modal-title">{ui.terminology}</h2>
                <p className="terms-intro">{ui.termsIntro}</p>
                <div className="terms-list">
                  {terminology.map((term) => (
                    <article className={`term-card ${term.id}`} key={term.id}>
                      <span className="term-dot" /><div><h3>{term.name}</h3><p>{term.shortDefinition}</p><small>{term.context}</small><a href={term.sources[0].url} target="_blank" rel="noreferrer">{ui.source}: {term.sources[0].label} ↗</a></div>
                    </article>
                  ))}
                </div>
              </>
            ) : mapOpen ? (
              <>
                <span className="modal-kicker">{ui.journey}</span><h2 id="modal-title">{ui.map}</h2>
                <div className="dual-map">
                  <JourneyMap side="female" screen={screen} selectedGender={gender} visitedSections={visitedSections} sections={experienceSections} ui={ui} onNavigate={navigateFromMap} />
                  <JourneyMap side="male" screen={screen} selectedGender={gender} visitedSections={visitedSections} sections={experienceSections} ui={ui} onNavigate={navigateFromMap} />
                </div>
              </>
            ) : settingsOpen ? (
              <>
                <span className="modal-kicker">{ui.system}</span><h2 id="modal-title">{ui.settings}</h2>
                <label className="setting-row" htmlFor="app-language"><span><strong>{ui.language}</strong><small>{ui.languageDetail}</small></span><select id="app-language" value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>{localeOptions.map((option) => <option key={option.id} value={option.id}>{option.nativeName}</option>)}</select></label>
                <label className="setting-row" htmlFor="auto-advance"><span><strong>{ui.autoAdvance}</strong><small>{ui.autoAdvanceDetail}</small></span><input id="auto-advance" aria-label={ui.autoAdvance} type="checkbox" checked={autoAdvance} onChange={(event) => setAutoAdvance(event.target.checked)} /></label>
                <label className="setting-row" htmlFor="reduce-motion"><span><strong>{ui.reduceMotion}</strong><small>{ui.reduceMotionDetail}</small></span><input id="reduce-motion" aria-label={ui.reduceMotion} type="checkbox" checked={reducedMotion} onChange={(event) => setReducedMotion(event.target.checked)} /></label>
              </>
            ) : (
              <>
                <span className="modal-kicker">{ui.journey}</span><h2 id="modal-title">{ui.recap}</h2>
                {gender ? <div className={`recap-character ${gender}`}><Character gender={gender} /><span><small>{ui.lastPath}</small><strong>{gender === "male" ? ui.maleExperience : ui.femaleExperience}</strong></span></div> : <p className="empty-recap">{ui.noJourney}</p>}
                <button className="modal-action" onClick={() => { setRecapOpen(false); if (gender) setScreen("experience"); else startGame(); }}>{gender ? ui.resume : ui.begin}<span>→</span></button>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
