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
import { claimStatusUi, claimsMenu, claimsUi, getClaims } from "@/app/content/claims";
import { sceneUi, type SceneCopy } from "@/app/content/sceneUi";
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

function SelectionAnimation({ gender, copy, reducedMotion }: { gender: Gender; copy: SceneCopy; reducedMotion: boolean }) {
  const [digital, setDigital] = useState(false);
  const visibleCount = digital ? 84 : 10;
  const candidateGender: Gender = gender === "female" ? "male" : "female";
  const toggle = () => setDigital((value) => !value);

  return (
    <div className={`selection-animation ${digital ? "digital" : "nearby"} ${reducedMotion ? "still" : ""}`} role="button" tabIndex={0} aria-label={digital ? copy.contract : copy.expand} onClick={toggle} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") toggle(); }}>
      <div className="selection-readout">
        <span>{digital ? copy.online : copy.nearby}</span>
        <strong>{digital ? "1,000" : "10"}</strong>
        <small>{copy.pool}</small>
      </div>
      <div className="candidate-field" aria-hidden="true">
        {Array.from({ length: visibleCount }).map((_, index) => {
          const x = digital ? 4 + ((index * 37) % 92) : 8 + index * 9.2;
          const y = digital ? 8 + ((index * 53) % 64) : 42 + Math.sin(index * 1.7) * 13;
          const chosen = index === (digital ? 46 : 4);
          return <span key={`${digital}-${index}`} className={`candidate ${candidateGender} ${chosen ? "chosen" : ""}`} style={{ "--x": `${x}%`, "--y": `${y}%`, "--delay": `${(index % 12) * 28}ms` } as CSSProperties}><i /><b /></span>;
        })}
      </div>
      <div className="choice-beam" aria-hidden="true" />
      <div className="selection-player"><Character gender={gender} large /><span>{copy.oneChoice}</span></div>
      <div className="chosen-label" aria-hidden="true"><i />{copy.selected}</div>
      <div className="scene-tap"><span>{copy.interact}</span><strong>{digital ? copy.contract : copy.expand}</strong><i>↗</i></div>
    </div>
  );
}

function PoliticsAnimation({ locale, ui, copy }: { locale: Locale; ui: AppCopy["ui"]; copy: SceneCopy }) {
  return (
    <div className="politics-animation">
      <div className="scene-statement"><span>{ui.observedPattern}</span><strong>{copy.politicsLead}</strong></div>
      <IdeologyChart country="US" data={ideologySeries.US} locale={locale} ui={ui} />
      <div className="politics-pulse" aria-hidden="true"><i className="female" /><i className="male" /></div>
    </div>
  );
}

function ValueAnimation({ gender, copy }: { gender: Gender; copy: SceneCopy }) {
  const values = gender === "male" ? [18, 22, 28, 39, 55, 72, 84, 88, 81, 72, 62] : [82, 89, 92, 88, 79, 67, 58, 52, 47, 43, 39];
  return (
    <div className={`value-animation ${gender}`}>
      <div className="scene-statement"><span>{copy.watch}</span><strong>{copy.valueLead}</strong></div>
      <div className="value-stage" aria-hidden="true">
        <div className="value-grid" />
        <div className="value-bars">{values.map((value, index) => <i key={index} style={{ "--value": `${value}%`, "--delay": `${index * 80}ms` } as CSSProperties}><b /></i>)}</div>
        <div className="value-person"><Character gender={gender} large /></div>
      </div>
      <div className="age-scale"><span>{copy.age} 18</span><span>30</span><span>45</span><span>60+</span></div>
    </div>
  );
}

function ExperienceAnimation({ section, gender, locale, ui, copy, reducedMotion, onBack, onMenu, onNext, onClaims }: { section: ExperienceSection; gender: Gender; locale: Locale; ui: AppCopy["ui"]; copy: SceneCopy; reducedMotion: boolean; onBack: () => void; onMenu: () => void; onNext: () => void; onClaims: () => void }) {
  return (
    <section className={`animated-chapter ${gender} screen-enter`}>
      <header className="story-header">
        <button className="text-button" onClick={onBack}>← {ui.experience}</button>
        <Brand compact />
        <button className="text-button" onClick={onMenu}>{ui.mainMenu}</button>
      </header>
      <div className="animated-chapter-heading"><span>{section.number} · {copy.watch}</span><h2>{section.title}</h2></div>
      <div className="animation-stage">
        {section.id === "selection" && <SelectionAnimation gender={gender} copy={copy} reducedMotion={reducedMotion} />}
        {section.id === "politics" && <PoliticsAnimation locale={locale} ui={ui} copy={copy} />}
        {section.id === "value" && <ValueAnimation gender={gender} copy={copy} />}
      </div>
      <footer className="animation-controls">
        <button className="notes-control" onClick={onClaims}>{copy.notes}</button>
        <div className="scene-progress" aria-label={`${section.number} / 03`}><i className={section.id === "selection" ? "active" : ""} /><i className={section.id === "politics" ? "active" : ""} /><i className={section.id === "value" ? "active" : ""} /></div>
        <button className="next-control" onClick={onNext}>{section.id === "value" ? ui.allChapters : copy.next}<i>→</i></button>
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
  const [claimsOpen, setClaimsOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<number | null>(null);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [floodTone, setFloodTone] = useState<"male" | "female" | "neutral" | null>(null);
  const pointerStart = useRef<number | null>(null);
  const transitionLocked = useRef(false);
  const localeReady = useRef(false);
  const copy = getTranslation(locale);
  const { ui, slides, sections: experienceSections, terms: terminology } = copy;
  const claims = getClaims(locale);
  const claimCopy = claimsUi[locale];
  const claimMenu = claimsMenu[locale];
  const claimStatus = claimStatusUi[locale];
  const sceneCopy = sceneUi[locale];

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
    setClaimsOpen(false);
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
  const selectedClaim = claims.find((claim) => claim.id === selectedClaimId) ?? null;
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
              <button className="menu-action" onClick={() => { setSelectedClaimId(null); setClaimsOpen(true); }}>
                <span className="menu-index">06</span><strong>{claimMenu}</strong><i>◇</i>
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
        <ExperienceAnimation
          section={activeSection}
          gender={gender}
          locale={locale}
          ui={ui}
          copy={sceneCopy}
          reducedMotion={reducedMotion}
          onBack={() => setScreen("experience")}
          onMenu={returnToMenu}
          onClaims={() => { setSelectedClaimId(null); setClaimsOpen(true); }}
          onNext={() => {
            const index = experienceSections.findIndex((section) => section.id === activeSection.id);
            if (index < experienceSections.length - 1) enterSection(experienceSections[index + 1].id);
            else setScreen("experience");
          }}
        />
      )}

      {(settingsOpen || recapOpen || mapOpen || terminologyOpen || languageOpen || claimsOpen) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget !== event.target) return; setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); setLanguageOpen(false); setClaimsOpen(false); }}>
          <section className={`game-modal ${mapOpen ? "map-modal" : ""} ${terminologyOpen ? "terms-modal" : ""} ${languageOpen ? "language-modal" : ""} ${claimsOpen ? "claims-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => { setSettingsOpen(false); setRecapOpen(false); setMapOpen(false); setTerminologyOpen(false); setLanguageOpen(false); setClaimsOpen(false); }} aria-label={ui.close}>×</button>
            {claimsOpen ? (
              <>
                <span className="modal-kicker">{claimCopy.hypothesis} · {claimCopy.evidence}</span><h2 id="modal-title">{claimCopy.title}</h2>
                {selectedClaim ? (
                  <article className="claim-detail">
                    <button className="claim-back" onClick={() => setSelectedClaimId(null)}>← {claimCopy.back}</button>
                    <header><span>{String(selectedClaim.id).padStart(2, "0")}</span><div><small>{claimCopy.related[selectedClaim.category]}</small><h3>{selectedClaim.title}</h3></div></header>
                    <p>{selectedClaim.proposition}</p>
                    <div className="claim-caution"><span>{claimStatus[selectedClaim.status]}</span><strong>{claimCopy.caution[selectedClaim.caution]}</strong><i>{selectedClaim.sources?.length ? `${selectedClaim.sources.length} ${ui.source}` : claimCopy.evidence}</i></div>
                    {selectedClaim.sources?.length ? <div className="claim-evidence">{selectedClaim.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer"><span>{ui.source}</span><strong>{source.label}</strong><i>↗</i></a>)}</div> : null}
                    <div className="claim-questions"><p><b>?</b>{claimCopy.assumptions}</p><p><b>↯</b>{claimCopy.counterexample}</p></div>
                  </article>
                ) : (
                  <><p className="claims-intro">{claimCopy.intro}</p><div className="claims-grid">{claims.map((claim) => (
                    <button key={claim.id} onClick={() => setSelectedClaimId(claim.id)}><span>{String(claim.id).padStart(2, "0")}</span><small>{claimCopy.related[claim.category]}</small><strong>{claim.title}</strong><i>{claimCopy.caution[claim.caution]}</i></button>
                  ))}</div></>
                )}
              </>
            ) : languageOpen ? (
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
