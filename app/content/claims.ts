import type { Locale } from "./i18n";
import type { ExperienceSectionId } from "./story";

export type Claim = {
  id: number;
  category: ExperienceSectionId;
  title: string;
  proposition: string;
  caution: "market-reduction" | "overgeneralization" | "biological-determinism" | "normative-leap";
};

const structure: Array<Pick<Claim, "id" | "category" | "caution">> = [
  { id: 1, category: "value", caution: "market-reduction" },
  { id: 2, category: "value", caution: "overgeneralization" },
  { id: 3, category: "selection", caution: "overgeneralization" },
  { id: 4, category: "selection", caution: "biological-determinism" },
  { id: 5, category: "selection", caution: "biological-determinism" },
  { id: 6, category: "selection", caution: "overgeneralization" },
  { id: 7, category: "selection", caution: "overgeneralization" },
  { id: 8, category: "selection", caution: "normative-leap" },
  { id: 9, category: "value", caution: "normative-leap" },
  { id: 10, category: "politics", caution: "normative-leap" },
];

const text: Record<Locale, Array<[string, string]>> = {
  en: [
    ["Market-defined value", "A person’s objective value is fixed by nature, the economy, and the market rather than by self-belief or personal standards."],
    ["Universal male advantage", "Men are claimed to surpass women across decisive physical, cognitive, and emotional domains, explaining their dominance in crisis institutions."],
    ["Irreplaceable contribution", "A woman’s uniquely unavailable contributions to a man are claimed to be sex, intimacy, gentleness, femininity, and children."],
    ["Achievement outside attraction", "Men are claimed not to value women’s status, wealth, career, politics, or education in mate choice because these do not serve reproduction."],
    ["Sexual-history aversion", "Male aversion to a female partner’s extensive sexual history is claimed to be innate biology rather than social learning."],
    ["Split relationship agency", "Women are claimed to control access to sex, while men control access to marriage."],
    ["Different affection signals", "Women are claimed to prioritize emotional security and men physical touch as different, compatible proofs of affection."],
    ["Success weakens monogamy", "A financially successful man with many options is claimed to have no economic or biological incentive to commit to one partner."],
    ["Solitary achievement is self-sustaining", "Something built or achieved alone is claimed not to require companionship in order to endure."],
    ["Reason sustains civilization", "A civilization guided by feeling rather than reason is claimed to be unable to survive severe historical crises."],
  ],
  fr: [
    ["Valeur définie par le marché","La valeur objective d’une personne serait fixée par la nature, l’économie et le marché, non par l’estime de soi ou des critères personnels."],
    ["Supériorité masculine universelle","Les hommes surpasseraient les femmes dans les domaines physiques, cognitifs et émotionnels décisifs, ce qui expliquerait leur domination des institutions de crise."],
    ["Contribution irremplaçable","Les seules contributions qu’un homme ne pourrait obtenir sans une femme seraient le sexe, l’intimité, la douceur, la féminité et les enfants."],
    ["La réussite hors de l’attirance","Dans le choix d’une partenaire, les hommes n’accorderaient pas de valeur au statut, à la richesse, à la carrière, aux opinions politiques ou aux études des femmes."],
    ["Aversion pour le passé sexuel","Le rejet masculin d’un passé sexuel féminin important serait biologique plutôt qu’acquis socialement."],
    ["Pouvoir relationnel partagé","Les femmes contrôleraient l’accès au sexe et les hommes l’accès au mariage."],
    ["Preuves d’affection différentes","Les femmes privilégieraient la sécurité émotionnelle et les hommes le contact physique comme preuves d’affection différentes mais compatibles."],
    ["La réussite affaiblit la monogamie","Un homme prospère disposant de nombreuses options n’aurait aucune raison économique ou biologique de s’engager avec une seule partenaire."],
    ["L’œuvre solitaire se suffit","Ce qui est construit ou accompli seul n’aurait pas besoin de compagnie pour durer."],
    ["La raison préserve la civilisation","Une civilisation guidée par les sentiments plutôt que par la raison ne pourrait survivre aux crises historiques majeures."],
  ],
  de: [
    ["Marktbestimmter Wert","Der objektive Wert eines Menschen werde von Natur, Wirtschaft und Markt bestimmt, nicht von Selbstbild oder persönlichen Maßstäben."],
    ["Universeller männlicher Vorsprung","Männer seien Frauen in entscheidenden körperlichen, geistigen und emotionalen Bereichen überlegen, was ihre Dominanz in Kriseninstitutionen erkläre."],
    ["Unersetzbarer Beitrag","Was ein Mann nur von einer Frau erhalten könne, seien Sex, Intimität, Sanftheit, Weiblichkeit und Kinder."],
    ["Leistung außerhalb der Anziehung","Status, Vermögen, Karriere, Politik und Bildung einer Frau spielten für männliche Partnerwahl keine Rolle, weil sie keiner Fortpflanzungsfunktion dienten."],
    ["Abneigung gegen sexuelle Vorgeschichte","Männliche Ablehnung einer umfangreichen sexuellen Vorgeschichte der Partnerin sei biologisch angeboren und nicht sozial erlernt."],
    ["Geteilte Beziehungsmacht","Frauen kontrollierten den Zugang zu Sex, Männer den Zugang zur Ehe."],
    ["Unterschiedliche Liebesbeweise","Frauen priorisierten emotionale Sicherheit, Männer körperliche Berührung als verschiedene, vereinbare Zeichen von Zuneigung."],
    ["Erfolg schwächt Monogamie","Ein finanziell erfolgreicher Mann mit vielen Optionen habe keinen wirtschaftlichen oder biologischen Grund, sich auf eine Partnerin festzulegen."],
    ["Allein Erreichtes trägt sich selbst","Was allein aufgebaut oder erreicht wurde, brauche keine Gemeinschaft, um fortzubestehen."],
    ["Vernunft erhält Zivilisation","Eine von Gefühlen statt Vernunft geleitete Zivilisation könne schwere historische Krisen nicht überstehen."],
  ],
  ru: [
    ["Ценность, заданная рынком","Объективная ценность человека якобы определяется природой, экономикой и рынком, а не самооценкой или личными стандартами."],
    ["Всеобщее мужское превосходство","Утверждается, что мужчины превосходят женщин в решающих физических, умственных и эмоциональных областях, чем объясняется их лидерство в кризисных институтах."],
    ["Незаменимый вклад","Утверждается, что только женщина может дать мужчине секс, близость, мягкость, женственность и детей, а всё остальное он способен получить сам."],
    ["Достижения вне влечения","Утверждается, что при выборе партнёрши мужчины не ценят её статус, богатство, карьеру, политику и образование, поскольку это не связано с размножением."],
    ["Неприятие сексуального прошлого","Мужское неприятие большого числа прежних партнёров женщины объявляется врождённой биологией, а не социальным обучением."],
    ["Разделённая власть в отношениях","Утверждается, что женщины решают, с кем заниматься сексом, а мужчины — с кем вступать в брак."],
    ["Разные знаки любви","Утверждается, что женщинам важнее эмоциональная безопасность, а мужчинам — физическое прикосновение как разные совместимые подтверждения любви."],
    ["Успех ослабляет моногамию","Успешный мужчина с большим выбором якобы не имеет экономического или биологического стимула связывать себя с одной партнёршей."],
    ["Достигнутое в одиночку самодостаточно","Утверждается, что созданному или достигнутому в одиночку не нужно общение, чтобы сохраниться."],
    ["Разум сохраняет цивилизацию","Утверждается, что цивилизация, руководимая чувствами вместо разума, не переживёт тяжёлые исторические кризисы."],
  ],
  ja: [
    ["市場が決める価値","人の客観的な価値は自己評価ではなく、自然・経済・市場によって決まるという主張です。"],
    ["男性の普遍的優位","重大な場面に必要な体力・知力・精神力で男性は女性を上回り、それが危機対応機関で男性が主導する理由だという主張です。"],
    ["代替できない貢献","男性が女性からしか得られないものは、性、親密さ、優しさ、女性らしさ、子どもだという主張です。"],
    ["魅力と実績は別","男性は生殖に結びつかないため、相手選びで女性の地位、財産、仕事、政治観、学歴を重視しないという主張です。"],
    ["性的履歴への嫌悪","女性の過去の性的パートナーが多いことへの男性の嫌悪は、社会的学習ではなく生物学的に備わるという主張です。"],
    ["関係における権限の分担","性関係の相手は女性が選び、結婚相手は男性が選ぶという主張です。"],
    ["異なる愛情の証し","女性は心の安心を、男性は身体的な触れ合いを、両立する別々の愛情の証しとして求めるという主張です。"],
    ["成功は一夫一婦制を弱める","経済的に成功し選択肢の多い男性には、一人の相手に限定する経済的・生物学的理由がないという主張です。"],
    ["一人で築いたものは自立する","一人で築き上げたものは、維持のために他者とのつながりを必要としないという主張です。"],
    ["理性が文明を支える","理性より感情に基づく文明は、歴史的な大危機を生き延びられないという主張です。"],
  ],
  ko: [
    ["시장이 정하는 가치","사람의 객관적 가치는 자기 믿음이 아니라 자연, 경제, 시장이 정한다는 주장입니다."],
    ["보편적인 남성 우위","남성이 결정적인 신체·인지·정서 영역에서 여성을 앞서며, 이것이 위기 대응 조직을 주도하는 이유라는 주장입니다."],
    ["대체할 수 없는 기여","남성이 여성에게서만 얻을 수 있는 것은 성, 친밀감, 부드러움, 여성성, 자녀뿐이라는 주장입니다."],
    ["매력과 성취의 분리","남성은 생식 기능과 관계없기 때문에 배우자를 고를 때 여성의 지위, 부, 경력, 정치관, 교육을 중요하게 여기지 않는다는 주장입니다."],
    ["성적 이력에 대한 거부감","여성 파트너의 많은 과거 성관계에 대한 남성의 거부감은 사회 학습이 아니라 타고난 생물학이라는 주장입니다."],
    ["관계 선택권의 분리","성관계 상대는 여성이, 결혼 상대는 남성이 선택한다는 주장입니다."],
    ["서로 다른 애정 신호","여성은 정서적 안정, 남성은 신체 접촉을 서로 다르지만 양립 가능한 애정의 증거로 원한다는 주장입니다."],
    ["성공은 일부일처제를 약화한다","경제적으로 성공하고 선택지가 많은 남성에게 한 사람에게 헌신할 경제적·생물학적 이유가 없다는 주장입니다."],
    ["혼자 이룬 것은 스스로 유지된다","혼자 만들거나 이룬 것은 지속하기 위해 동반자가 필요하지 않다는 주장입니다."],
    ["이성이 문명을 지탱한다","감정보다 이성에 기반하지 않은 문명은 거대한 역사적 위기를 견딜 수 없다는 주장입니다."],
  ],
  zh: [
    ["由市场定义的价值","这一主张认为，一个人的客观价值由自然、经济和市场决定，而非自我认同或个人标准。"],
    ["男性的普遍优势","这一主张认为，男性在关键的体能、认知和情绪承受力上全面超过女性，因此主导危机应对机构。"],
    ["不可替代的贡献","这一主张认为，女性能提供而男性无法自行获得的只有性、亲密、温柔、女性气质和子女。"],
    ["成就不影响吸引力","这一主张认为，男性择偶时不会重视女性的地位、财富、事业、政治观和教育，因为这些不具生殖功能。"],
    ["对性经历的排斥","这一主张认为，男性对女性伴侣较多过往性经历的排斥源自先天生物机制，而非社会学习。"],
    ["关系选择权的分工","这一主张认为，女性决定与谁发生性关系，男性决定与谁结婚。"],
    ["不同的情感证明","这一主张认为，女性需要情感安全，男性需要身体接触；两者是不同但可以并存的爱意证明。"],
    ["成功削弱一夫一妻动机","这一主张认为，经济成功且选择众多的男性没有经济或生物理由只与一位伴侣绑定。"],
    ["独自成就可以自我维持","这一主张认为，独自建立或取得的成果不需要陪伴也能持续。"],
    ["理性维系文明","这一主张认为，以感受而非理性为基础的文明无法承受重大的历史灾难。"],
  ],
};

export const claimsUi: Record<Locale, { menu: string; title: string; intro: string; hypothesis: string; evidence: string; assumptions: string; counterexample: string; back: string; related: Record<ExperienceSectionId, string>; caution: Record<Claim["caution"], string> }> = {
  en:{menu:"Ten claims",title:"Claims lab",intro:"Starting propositions—not settled laws. Open one to inspect its assumptions, counterexamples, and evidence burden.",hypothesis:"Hypothesis",evidence:"Evidence pending",assumptions:"Which assumptions must be true?",counterexample:"What evidence would disprove or narrow this claim?",back:"All claims",related:{selection:"Selection",politics:"Politics",value:"Value & age"},caution:{"market-reduction":"Market reduction","overgeneralization":"Overgeneralization","biological-determinism":"Biological determinism","normative-leap":"Normative leap"}},
  fr:{menu:"Dix thèses",title:"Laboratoire des thèses",intro:"Des propositions de départ, pas des lois établies. Ouvrez-en une pour examiner ses présupposés, contre-exemples et exigences de preuve.",hypothesis:"Hypothèse",evidence:"Preuves à réunir",assumptions:"Quelles conditions doivent être vraies ?",counterexample:"Quelles preuves pourraient réfuter ou limiter cette thèse ?",back:"Toutes les thèses",related:{selection:"Sélection",politics:"Politique",value:"Valeur et âge"},caution:{"market-reduction":"Réduction au marché","overgeneralization":"Généralisation excessive","biological-determinism":"Déterminisme biologique","normative-leap":"Saut normatif"}},
  de:{menu:"Zehn Thesen",title:"Thesenlabor",intro:"Ausgangsthesen, keine feststehenden Gesetze. Öffne eine These, um Annahmen, Gegenbeispiele und Belegbedarf zu prüfen.",hypothesis:"Hypothese",evidence:"Belege ausstehend",assumptions:"Welche Annahmen müssen zutreffen?",counterexample:"Welche Belege würden die These widerlegen oder eingrenzen?",back:"Alle Thesen",related:{selection:"Partnerwahl",politics:"Politik",value:"Wert und Alter"},caution:{"market-reduction":"Marktreduktion","overgeneralization":"Übergeneralisierung","biological-determinism":"Biologischer Determinismus","normative-leap":"Normativer Sprung"}},
  ru:{menu:"Десять тезисов",title:"Лаборатория тезисов",intro:"Это исходные положения, а не доказанные законы. Откройте тезис, чтобы проверить предпосылки, контрпримеры и требования к доказательствам.",hypothesis:"Гипотеза",evidence:"Доказательства ожидаются",assumptions:"Какие предпосылки должны быть верны?",counterexample:"Какие данные опровергнут или сузят тезис?",back:"Все тезисы",related:{selection:"Выбор партнёра",politics:"Политика",value:"Ценность и возраст"},caution:{"market-reduction":"Сведение к рынку","overgeneralization":"Чрезмерное обобщение","biological-determinism":"Биологический детерминизм","normative-leap":"Нормативный скачок"}},
  ja:{menu:"10の主張",title:"主張ラボ",intro:"確定した法則ではなく、検討の出発点です。前提、反例、必要な根拠を一つずつ確認します。",hypothesis:"仮説",evidence:"根拠を検証中",assumptions:"成立に必要な前提は何か？",counterexample:"どんな証拠が主張を否定・限定するか？",back:"すべての主張",related:{selection:"パートナー選び",politics:"政治",value:"価値と年齢"},caution:{"market-reduction":"市場への還元","overgeneralization":"過度な一般化","biological-determinism":"生物学的決定論","normative-leap":"規範への飛躍"}},
  ko:{menu:"10가지 주장",title:"주장 연구실",intro:"확정된 법칙이 아니라 검토를 위한 출발점입니다. 전제, 반례, 필요한 근거를 하나씩 살펴보세요.",hypothesis:"가설",evidence:"근거 검토 중",assumptions:"어떤 전제가 참이어야 할까요?",counterexample:"어떤 증거가 주장을 반박하거나 범위를 좁힐까요?",back:"모든 주장",related:{selection:"파트너 선택",politics:"정치",value:"가치와 나이"},caution:{"market-reduction":"시장으로 환원","overgeneralization":"과도한 일반화","biological-determinism":"생물학적 결정론","normative-leap":"규범적 비약"}},
  zh:{menu:"十项主张",title:"主张实验室",intro:"这些是讨论的起点，并非已经确立的定律。打开一项，检查其前提、反例和证据要求。",hypothesis:"假设",evidence:"证据待补",assumptions:"哪些前提必须成立？",counterexample:"哪些证据会反驳或缩小这项主张的适用范围？",back:"全部主张",related:{selection:"择偶",politics:"政治",value:"价值与年龄"},caution:{"market-reduction":"市场还原论","overgeneralization":"过度概括","biological-determinism":"生物决定论","normative-leap":"规范性跳跃"}},
};

export function getClaims(locale: Locale): Claim[] {
  return structure.map((item, index) => ({ ...item, title: text[locale][index][0], proposition: text[locale][index][1] }));
}
