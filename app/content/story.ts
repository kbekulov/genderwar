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

export type GlossaryTerm = {
  id: "blue-pill" | "red-pill" | "black-pill";
  name: string;
  shortDefinition: string;
  context: string;
  sources: Array<{ label: string; url: string }>;
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

export const terminology: GlossaryTerm[] = [
  {
    id: "blue-pill",
    name: "Blue pill",
    shortDefinition: "A label used in red-pill and black-pill communities for people who reject their worldview or accept conventional ideas about gender and relationships.",
    context: "Usually an outside label rather than one coherent, self-defined ideology.",
    sources: [{ label: "Women and Gender Equality Canada", url: "https://www.canada.ca/en/women-gender-equality/funding/equality-action/manosphere.html" }],
  },
  {
    id: "red-pill",
    name: "Red pill",
    shortDefinition: "A Matrix-derived metaphor for supposedly waking up to a hidden truth. In manosphere spaces, it often means accepting claims that society and dating systems favour women over men.",
    context: "The term is used by many unrelated political and online communities, so context matters.",
    sources: [{ label: "ADL pill terminology guide", url: "https://www.adl.org/resources/article/extremist-medicine-cabinet-guide-online-pills" }],
  },
  {
    id: "black-pill",
    name: "Black pill",
    shortDefinition: "A fatalistic extension of red-pill thinking, common in incel spaces, which treats romantic outcomes as largely fixed by immutable traits and improvement as futile.",
    context: "It is associated with pessimism and hopelessness rather than a strategy for change.",
    sources: [{ label: "ADL incel backgrounder", url: "https://www.adl.org/resources/backgrounder/incels-involuntary-celibates" }],
  },
];
