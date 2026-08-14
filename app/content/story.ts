export type Gender = "male" | "female";

export type PrologueSlide = {
  id: "retreat" | "depression" | "fertility" | "crime" | "question";
  label: string;
  text: string;
  note: string;
};

export type InsightConfidence = "hypothesis" | "observed-pattern" | "evidence-backed";

export type ScenarioChoice = {
  id: string;
  label: string;
  consequence: string;
};

export type Scenario = {
  id: string;
  title: string;
  perspective: Gender | "both";
  insight: string;
  confidence: InsightConfidence;
  setup: string;
  mechanic: "choose" | "compare" | "simulate" | "reveal";
  choices: ScenarioChoice[];
  takeaway: string;
  evidence: Array<{ label: string; url: string }>;
};

export const prologueSlides: PrologueSlide[] = [
  { id: "retreat", label: "01", text: "men are retreating from society", note: "Connection is thinning." },
  { id: "depression", label: "02", text: "women are falling into depression", note: "Wellbeing is under pressure." },
  { id: "fertility", label: "03", text: "fertility rates are dropping", note: "Fewer families are forming." },
  { id: "crime", label: "04", text: "crime rates are increasing", note: "Social trust is fraying." },
  { id: "question", label: "05", text: "what’s happening?", note: "To understand the conflict, choose a perspective." },
];

// New realizations become self-contained scenario records here. The UI can then
// render them without changing navigation, character selection, or global state.
export const scenarios: Scenario[] = [];
