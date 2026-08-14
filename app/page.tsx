"use client";

import { useMemo, useState, type CSSProperties } from "react";

type Approach = "clarify" | "pursue" | "pause";

const scenarios = [
  {
    kicker: "Scenario 01 · The quiet evening",
    title: "A text goes unanswered",
    prompt: "It has been three hours. You can see they were online.",
    him: "No answer probably means she needs space. Pushing could make it worse.",
    her: "No follow-up can feel like indifference. A small signal would settle the uncertainty.",
    insight: "The conflict often starts before anyone acts: the same silence can mean respect to one person and withdrawal to another.",
  },
  {
    kicker: "Scenario 02 · Plans change",
    title: "A date is postponed",
    prompt: "The message says: “Long day. Can we do this another time?”",
    him: "The practical problem is clear: reschedule, solve it, move on.",
    her: "The emotional question may still be open: are we okay, and do you still want this?",
    insight: "One person may answer the logistical question while the other is listening for reassurance about the relationship.",
  },
  {
    kicker: "Scenario 03 · A hard day",
    title: "Someone starts venting",
    prompt: "Work was awful. They tell you everything that went wrong.",
    him: "Finding the fix can be a way of showing care and restoring control.",
    her: "Being understood first can matter more than a solution that arrives too soon.",
    insight: "Advice and empathy are both forms of care. Friction appears when the offered form is not the one being requested.",
  },
];

const approaches: { id: Approach; label: string; note: string }[] = [
  { id: "clarify", label: "Ask directly", note: "low guesswork" },
  { id: "pursue", label: "Reach out again", note: "high connection" },
  { id: "pause", label: "Give it space", note: "high autonomy" },
];

function Person({ kind, small = false }: { kind: "him" | "her"; small?: boolean }) {
  return (
    <span className={`person ${kind} ${small ? "small" : ""}`} aria-hidden="true">
      <span className="hair" />
      <span className="head" />
      <span className="body" />
      <span className="face" />
    </span>
  );
}

export default function Home() {
  const [scenario, setScenario] = useState(0);
  const [choice, setChoice] = useState<Approach | null>(null);
  const [clarity, setClarity] = useState(38);
  const [poolSize, setPoolSize] = useState<10 | 1000>(10);
  const [selectionRun, setSelectionRun] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(4);
  const [isScanning, setIsScanning] = useState(false);
  const current = scenarios[scenario];
  const visibleProfiles = poolSize === 10 ? 10 : 72;

  const result = useMemo(() => {
    if (!choice) return null;
    const outcomes = {
      clarify: { score: 86, title: "The guesswork drops", text: "A direct, warm question makes the hidden need visible without assuming intent." },
      pursue: { score: 62, title: "Connection rises", text: "Reaching out can reassure, but may feel like pressure when the other person is regulating alone." },
      pause: { score: 54, title: "Autonomy rises", text: "Space can lower pressure, but without context it may accidentally amplify uncertainty." },
    };
    return outcomes[choice];
  }, [choice]);

  function nextScenario() {
    setScenario((value) => (value + 1) % scenarios.length);
    setChoice(null);
    setClarity(38);
  }

  function changePool(size: 10 | 1000) {
    setPoolSize(size);
    setSelectedProfile(size === 10 ? 4 : 47);
    setSelectionRun((value) => value + 1);
    setIsScanning(false);
  }

  function runSelection() {
    setIsScanning(true);
    setSelectionRun((value) => value + 1);
    const next = poolSize === 10
      ? (selectionRun * 3 + 7) % 10
      : (selectionRun * 17 + 31) % visibleProfiles;
    window.setTimeout(() => {
      setSelectedProfile(next);
      setIsScanning(false);
    }, 900);
  }

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Common Ground home">
          <span className="brand-mark"><span /><span /></span>
          common ground
        </a>
        <div className="nav-meta">
          <span className="lesson">Lesson {scenario + 1} of {scenarios.length}</span>
          <button className="icon-button" aria-label="About this experience">?</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> A small experiment in understanding</div>
        <h1>Same moment.<br /><em>Different maps.</em></h1>
        <p className="intro">Explore how two people can read the same signal differently—and how a little clarity can change the whole story.</p>
        <div className="hero-people" aria-label="Two recurring characters, him and her">
          <div className="character-card male-card">
            <Person kind="him" />
            <div><span>meet</span><strong>Alex</strong></div>
          </div>
          <div className="connection"><span className="connection-line" /><span className="spark">✦</span></div>
          <div className="character-card female-card">
            <Person kind="her" />
            <div><span>meet</span><strong>Maya</strong></div>
          </div>
        </div>
        <a className="start-link" href="#experiment">Start the experiment <span>↓</span></a>
      </section>

      <section className="experiment" id="experiment">
        <header className="scenario-header">
          <div>
            <p>{current.kicker}</p>
            <h2>{current.title}</h2>
          </div>
          <div className="dots" aria-label={`Scenario ${scenario + 1} of ${scenarios.length}`}>
            {scenarios.map((_, index) => <span key={index} className={index === scenario ? "active" : ""} />)}
          </div>
        </header>

        <div className="scenario-grid">
          <div className="phone-card">
            <div className="phone-top"><span>9:41</span><span className="phone-pill" /><span>● ●</span></div>
            <div className="chat-person"><Person kind="her" small /><div><strong>Maya</strong><span>online earlier</span></div></div>
            <div className="message received">Hope your day’s going okay :)</div>
            <div className="message sent">Long one. I’ll tell you later</div>
            <div className="typing"><span /><span /><span /></div>
            <p className="situation">{current.prompt}</p>
          </div>

          <div className="interpretations">
            <div className="lens lens-him">
              <div className="lens-title"><Person kind="him" small /><div><span>Alex’s map</span><strong>Protect the space</strong></div></div>
              <blockquote>“{current.him}”</blockquote>
              <div className="signal"><span>Signal read as</span><strong>pressure</strong></div>
            </div>
            <div className="lens lens-her">
              <div className="lens-title"><Person kind="her" small /><div><span>Maya’s map</span><strong>Protect the bond</strong></div></div>
              <blockquote>“{current.her}”</blockquote>
              <div className="signal"><span>Signal read as</span><strong>distance</strong></div>
            </div>
          </div>
        </div>

        <div className="decision-panel">
          <div className="decision-copy">
            <span className="step-label">Your move</span>
            <h3>What would reduce the friction?</h3>
            <p>There is no perfect move. Choose what you would naturally do.</p>
          </div>
          <div className="choices" role="group" aria-label="Choose your response">
            {approaches.map((approach) => (
              <button key={approach.id} onClick={() => setChoice(approach.id)} className={choice === approach.id ? "selected" : ""}>
                <span className="choice-icon">{approach.id === "clarify" ? "?" : approach.id === "pursue" ? "+" : "···"}</span>
                <strong>{approach.label}</strong><small>{approach.note}</small>
              </button>
            ))}
          </div>
        </div>

        <div className={`outcome ${result ? "visible" : ""}`} aria-live="polite">
          {result ? (
            <>
              <div className="outcome-score" style={{ "--score": `${result.score}%` } as CSSProperties}>
                <span>{result.score}</span><small>clarity</small>
              </div>
              <div className="outcome-copy"><span>What shifts</span><h3>{result.title}</h3><p>{result.text}</p></div>
              <div className="mini-chart" aria-label={`Clarity score ${result.score} out of 100`}>
                {[28, 44, 35, 60, result.score].map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}
              </div>
            </>
          ) : <p className="outcome-placeholder">Choose a response to reveal the pattern.</p>}
        </div>

        <div className="clarity-lab">
          <div><span className="step-label">Try the dial</span><h3>How clear was the signal?</h3></div>
          <input aria-label="Signal clarity" type="range" min="0" max="100" value={clarity} onChange={(event) => setClarity(Number(event.target.value))} style={{ "--value": `${clarity}%` } as CSSProperties} />
          <div className="dial-labels"><span>Mostly assumed</span><strong>{clarity}% explicit</strong><span>Said directly</span></div>
          <p>{clarity < 50 ? "Low clarity leaves more room for old experiences and expectations to fill in the blanks." : clarity < 80 ? "As clarity rises, both people spend less energy decoding and more energy responding." : "Clear signals do not erase differences—but they stop differences from becoming stories about intent."}</p>
        </div>

        <footer className="lesson-footer">
          <div className="takeaway"><span>Key idea</span><p>{current.insight}</p></div>
          <button onClick={nextScenario}>Next scenario <span>→</span></button>
        </footer>
      </section>

      <section className="choice-expansion" id="choice-expansion">
        <header className="choice-heading">
          <div>
            <p>Chapter 04 · Choice expansion</p>
            <h2>What changes when<br />the room becomes a feed?</h2>
          </div>
          <p className="choice-intro">In a local setting, Maya may encounter a small group. A digital feed can place hundreds of possible partners into the same comparison set—even though her attention still lands on one person at a time.</p>
        </header>

        <div className="environment-switch" role="group" aria-label="Choose an environment">
          <button onClick={() => changePool(10)} className={poolSize === 10 ? "active" : ""} aria-pressed={poolSize === 10}>
            <span className="switch-number">10</span>
            <span><strong>Local circle</strong><small>people she might realistically meet</small></span>
          </button>
          <button onClick={() => changePool(1000)} className={poolSize === 1000 ? "active" : ""} aria-pressed={poolSize === 1000}>
            <span className="switch-number">1,000</span>
            <span><strong>Digital feed</strong><small>profiles within reach of a swipe</small></span>
          </button>
        </div>

        <div className={`choice-stage ${poolSize === 1000 ? "digital" : "local"} ${isScanning ? "scanning" : ""}`}>
          <div className="stage-topline">
            <span>{poolSize === 10 ? "A room-sized choice set" : "An algorithm-sized choice set"}</span>
            <span>{poolSize === 1000 ? "72 shown · 928 implied" : "all 10 shown"}</span>
          </div>
          <div className="profile-field" aria-label={`${poolSize} possible profiles, one selected`}>
            {Array.from({ length: visibleProfiles }).map((_, index) => (
              <span
                key={`${poolSize}-${index}`}
                className={`profile-dot ${index === selectedProfile && !isScanning ? "chosen" : ""}`}
                style={{ "--delay": `${(index % 12) * 24}ms` } as CSSProperties}
                aria-hidden="true"
              >
                <i /><b />
              </span>
            ))}
            {poolSize === 1000 && <span className="more-profiles">+928</span>}
            <span key={selectionRun} className="selection-beam" />
          </div>
          <div className="observer">
            <span className="attention-cone" />
            <div className="maya-observer"><Person kind="her" /><span>Maya</span></div>
          </div>
        </div>

        <div className="choice-controls">
          <button className="run-choice" onClick={runSelection} disabled={isScanning}>
            <span>{isScanning ? "Scanning" : "Run selection"}</span><i>{isScanning ? "···" : "→"}</i>
          </button>
          <div className="choice-metrics" aria-live="polite">
            <div><span>Choice set</span><strong>{poolSize.toLocaleString()}</strong><small>candidates in view</small></div>
            <div><span>One profile’s share</span><strong>{poolSize === 10 ? "10%" : "0.1%"}</strong><small>of this comparison set</small></div>
            <div><span>Result</span><strong>1</strong><small>person receives attention</small></div>
          </div>
        </div>

        <div className="choice-explanation">
          <div className="explanation-number">{poolSize === 10 ? "10×" : "1,000×"}</div>
          <div>
            <span className="step-label">The mechanism</span>
            <h3>{poolSize === 10 ? "A smaller set makes each person more visible." : "More options change the reference point—not the amount of attention."}</h3>
            <p>{poolSize === 10 ? "With ten people in the comparison set, individual qualities are easier to notice and the idea of the “best available” is bounded by a real social environment." : "A feed expands who appears available. That can raise comparison pressure and make each profile easier to replace, even though time and attention have not expanded with the pool."}</p>
          </div>
        </div>

        <p className="model-note"><strong>Important:</strong> this is a model of how choice architecture can shape perception, not a claim that all women rank partners the same way. Digital abundance can affect anyone; this chapter explores the female-side example from the sketch.</p>
      </section>

      <section className="closing">
        <span className="closing-symbol">≠</span>
        <p>Patterns are not rules.</p>
        <h2>Understanding difference is not choosing a side.</h2>
        <p className="closing-note">People vary more than categories can capture. This demo explores common communication tendencies—not biological destiny, moral value, or a verdict on any individual.</p>
      </section>
    </main>
  );
}
