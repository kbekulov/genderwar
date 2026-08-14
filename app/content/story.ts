export type Gender = "male" | "female";

export type ExperienceSectionId = "selection" | "politics" | "value";

export type ExperienceSection = {
  id: ExperienceSectionId;
  number: string;
  mapLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  lenses: string[];
  prompt: Record<Gender, string>;
};

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

// The two character paths share a chapter structure so each new realization
// can be compared without forcing both perspectives to reach the same answer.
export const experienceSections: ExperienceSection[] = [
  {
    id: "selection",
    number: "01",
    mapLabel: "Selection",
    eyebrow: "Mates · demands · expectations",
    title: "Selection logic",
    description: "How the available choice set changes attraction, filtering, approach, commitment, and expectations toward a partner.",
    lenses: ["Choice set", "Partner filters", "Commitment"],
    prompt: {
      male: "What shapes whom men approach, consider attainable, and commit to—and what do they expect in return?",
      female: "What shapes whom women notice, consider desirable, and commit to—and what do they expect in return?",
    },
  },
  {
    id: "politics",
    number: "02",
    mapLabel: "Politics",
    eyebrow: "Voting · priorities · institutions",
    title: "Voting logic",
    description: "How lived pressures, incentives, risk, values, and trust in institutions can shape political priorities and voting choices.",
    lenses: ["Priorities", "Risk & security", "Institutional trust"],
    prompt: {
      male: "Which experiences and incentives make a political choice feel protective of men’s interests or view of society?",
      female: "Which experiences and incentives make a political choice feel protective of women’s interests or view of society?",
    },
  },
  {
    id: "value",
    number: "03",
    mapLabel: "Value & age",
    eyebrow: "Age · feedback · opportunity",
    title: "Personal value",
    description: "How self-worth and perceived social or romantic value change across life stages—and why those measures may diverge.",
    lenses: ["Life stage", "Social feedback", "Opportunity"],
    prompt: {
      male: "How do age, health, competence, relationships, resources, and social standing change perceived value over time?",
      female: "How do age, health, competence, relationships, resources, and social standing change perceived value over time?",
    },
  },
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
