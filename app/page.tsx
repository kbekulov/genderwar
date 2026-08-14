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
  const current = scenarios[scenario];

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

      <section className="closing">
        <span className="closing-symbol">≠</span>
        <p>Patterns are not rules.</p>
        <h2>Understanding difference is not choosing a side.</h2>
        <p className="closing-note">People vary more than categories can capture. This demo explores common communication tendencies—not biological destiny, moral value, or a verdict on any individual.</p>
      </section>
    </main>
  );
}
