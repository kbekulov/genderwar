import type { Locale } from "./i18n";
import type { ExperienceSectionId } from "./story";

export type Claim = {
  id: number;
  category: ExperienceSectionId;
  title: string;
  proposition: string;
  caution: "market-reduction" | "overgeneralization" | "biological-determinism" | "normative-leap";
  status: "thesis" | "mixed-evidence" | "observed-pattern" | "systems-principle";
  sources?: Array<{ label: string; url: string }>;
};

const structure: Array<Omit<Claim, "title" | "proposition">> = [
  { id: 1, category: "value", caution: "market-reduction", status: "thesis" },
  { id: 2, category: "value", caution: "overgeneralization", status: "thesis" },
  { id: 3, category: "selection", caution: "overgeneralization", status: "thesis" },
  { id: 4, category: "selection", caution: "biological-determinism", status: "thesis" },
  { id: 5, category: "selection", caution: "biological-determinism", status: "thesis" },
  { id: 6, category: "selection", caution: "overgeneralization", status: "thesis" },
  { id: 7, category: "selection", caution: "overgeneralization", status: "thesis" },
  { id: 8, category: "selection", caution: "normative-leap", status: "thesis" },
  { id: 9, category: "value", caution: "normative-leap", status: "thesis" },
  { id: 10, category: "politics", caution: "normative-leap", status: "thesis" },
  { id: 11, category: "politics", caution: "overgeneralization", status: "thesis" },
  { id: 12, category: "selection", caution: "overgeneralization", status: "thesis" },
  { id: 13, category: "politics", caution: "overgeneralization", status: "mixed-evidence", sources: [
    { label: "Milner et al. (2018)", url: "https://pubmed.ncbi.nlm.nih.gov/29550631/" },
    { label: "Elwer et al. (2014)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3974025/" },
  ] },
  { id: 14, category: "selection", caution: "overgeneralization", status: "observed-pattern", sources: [
    { label: "Rosenfeld — Who Wants the Breakup?", url: "https://web.stanford.edu/~mrosenfe/Rosenfeld_gender_of_breakup.pdf" },
  ] },
  { id: 15, category: "politics", caution: "normative-leap", status: "thesis" },
  { id: 16, category: "politics", caution: "normative-leap", status: "systems-principle" },
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
    ["Systems as stewardship", "Men are claimed to see social systems as things to build, repair, or defend, while women are claimed to treat them as given environments in which to secure individual comfort."],
    ["Responsibility for shared structures", "The thesis claims that men respond to failing institutions and relationships by trying to repair them, while women more often distance themselves from responsibility and prioritize personal benefit."],
    ["Gender mix at work", "The proposition is that both sexes fare better in male-dominated workplaces and that female-dominated teams create more interpersonal conflict. Existing studies show more complicated, context-dependent patterns."],
    ["Who ends relationships", "Women are claimed to initiate most heterosexual divorces and female same-sex marriages to dissolve much more often than male same-sex marriages. Some datasets show a gap, but its size and meaning vary by country, cohort, and measure."],
    ["Feminism as institutional instability", "The thesis argues that feminism transfers presumed female inconsistency into public institutions and therefore should not hold decision-making power."],
    ["Runaway feedback", "A volatile system without stabilizing constraints can amplify its own disturbances, producing oscillation, collapse, or self-destruction."],
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
    ["Les systèmes comme responsabilité", "La thèse affirme que les hommes voient les systèmes sociaux comme des structures à construire, réparer ou défendre, tandis que les femmes les considèrent comme des cadres acquis où rechercher leur confort individuel."],
    ["Responsabilité des structures communes", "Selon cette thèse, face à des institutions ou relations défaillantes, les hommes chercheraient à les réparer, tandis que les femmes s'en dégageraient plus souvent et privilégieraient leur intérêt personnel."],
    ["Mixité au travail", "La proposition veut que les deux sexes aillent mieux dans des milieux dominés par les hommes et que les équipes féminisées génèrent davantage de conflits. Les études existantes décrivent des effets plus complexes et dépendants du contexte."],
    ["Qui met fin aux relations", "Les femmes initieraient la majorité des divorces hétérosexuels et les mariages entre femmes se dissoudraient bien plus souvent que ceux entre hommes. Certains jeux de données montrent un écart, mais son ampleur et son sens varient selon le pays, la cohorte et la mesure."],
    ["Le féminisme comme instabilité institutionnelle", "La thèse soutient que le féminisme transpose une supposée inconsistance féminine dans les institutions publiques et ne devrait donc pas détenir de pouvoir de décision."],
    ["Emballement de la rétroaction", "Un système volatil dépourvu de contraintes stabilisatrices peut amplifier ses propres perturbations jusqu'à l'oscillation, l'effondrement ou l'autodestruction."],
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
    ["Systeme als Verantwortung", "Die These besagt, Männer sähen gesellschaftliche Systeme als etwas, das gebaut, repariert oder verteidigt werden müsse, während Frauen sie als gegebenen Rahmen betrachteten, in dem individueller Komfort zu sichern sei."],
    ["Verantwortung für gemeinsame Strukturen", "Männer würden auf zerfallende Institutionen und Beziehungen mit Reparaturversuchen reagieren, Frauen sich dagegen häufiger der Verantwortung entziehen und den eigenen Nutzen priorisieren."],
    ["Geschlechtermix am Arbeitsplatz", "Beide Geschlechter sollen sich in männlich dominierten Arbeitsumgebungen wohler fühlen, während frauendominierte Teams mehr Konflikte erzeugten. Vorliegende Studien zeigen komplexere, kontextabhängige Muster."],
    ["Wer Beziehungen beendet", "Frauen sollen die meisten heterosexuellen Scheidungen initiieren, und Ehen zwischen Frauen sollen deutlich häufiger zerbrechen als Ehen zwischen Männern. Manche Datensätze zeigen eine Lücke, deren Größe und Bedeutung jedoch nach Land, Kohorte und Messmethode variiert."],
    ["Feminismus als institutionelle Instabilität", "Die These behauptet, Feminismus übertrage eine angenommene weibliche Inkonsistenz auf öffentliche Institutionen und solle deshalb keine Entscheidungsmacht besitzen."],
    ["Selbstverstärkende Rückkopplung", "Ein volatiles System ohne stabilisierende Begrenzungen kann eigene Störungen verstärken und dadurch Schwingungen, Zusammenbruch oder Selbstzerstörung auslösen."],
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
    ["Системы как ответственность", "Согласно тезису, мужчины воспринимают общественные системы как то, что нужно строить, чинить и защищать, а женщины — как готовую среду, где следует найти удобное место для себя."],
    ["Ответственность за общие структуры", "Утверждается, что при распаде институтов и отношений мужчины стремятся их восстановить, тогда как женщины чаще снимают с себя ответственность и ставят личную выгоду выше общего дела."],
    ["Гендерный состав на работе", "Предполагается, что оба пола чувствуют себя лучше в коллективах с преобладанием мужчин, а женские коллективы создают больше конфликтов. Имеющиеся исследования показывают более сложную картину, зависящую от контекста."],
    ["Кто завершает отношения", "Утверждается, что женщины инициируют большинство гетеросексуальных разводов, а браки двух женщин распадаются заметно чаще браков двух мужчин. В некоторых данных разрыв есть, но его величина и смысл зависят от страны, поколения и способа измерения."],
    ["Феминизм как институциональная нестабильность", "Тезис состоит в том, что феминизм переносит предполагаемую женскую непоследовательность в государственные институты и потому не должен обладать правом принимать решения."],
    ["Разгон положительной обратной связи", "Нестабильная система без сдерживающих механизмов может усиливать собственные возмущения, вызывая колебания, крах или саморазрушение."],
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
    ["システムを担う責任", "男性は社会システムを構築・修復・防衛すべきものと捉え、女性は個人の居心地を確保するための既存環境として捉える、という主張です。"],
    ["共有構造への責任", "制度や関係が崩れると男性は修復を試みる一方、女性は責任から距離を置き、個人の利益を優先しやすいという仮説です。"],
    ["職場の性別構成", "男女とも男性中心の職場で良好な状態になり、女性中心のチームでは対人葛藤が増えるという主張です。既存研究は、より複雑で状況に左右される傾向を示しています。"],
    ["関係を終わらせるのは誰か", "異性婚の離婚は女性が多く始め、女性同士の婚姻は男性同士より大幅に解消されやすいという主張です。一部のデータには差がありますが、大きさと意味は国・世代・測定法で変わります。"],
    ["制度的不安定性としてのフェミニズム", "フェミニズムは女性に想定される一貫性のなさを公的制度へ持ち込み、意思決定権を持つべきではない、という主張です。"],
    ["暴走するフィードバック", "安定化の制約を欠く不安定なシステムは、変動を自己増幅し、振動・崩壊・自己破壊に至る可能性があります。"],
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
    ["시스템을 돌보는 책임", "남성은 사회 시스템을 구축·수리·방어할 대상으로 보고, 여성은 개인의 안락한 자리를 찾는 주어진 환경으로 본다는 주장입니다."],
    ["공동 구조에 대한 책임", "제도나 관계가 무너질 때 남성은 고치려 하지만 여성은 책임에서 물러나 개인적 이익을 우선하는 경향이 있다는 가설입니다."],
    ["직장의 성별 구성", "남녀 모두 남성 중심 직장에서 더 나은 상태를 보이고 여성 중심 팀에서는 갈등이 늘어난다는 주장입니다. 기존 연구는 맥락에 따라 달라지는 더 복잡한 양상을 보여 줍니다."],
    ["누가 관계를 끝내는가", "이성 결혼의 이혼은 여성이 대부분 시작하고 여성 동성 결혼은 남성 동성 결혼보다 훨씬 자주 해소된다는 주장입니다. 일부 자료에는 차이가 있지만 그 크기와 의미는 국가, 세대, 측정 방식에 따라 달라집니다."],
    ["제도적 불안정으로서의 페미니즘", "페미니즘이 여성에게 있다고 가정한 비일관성을 공공 제도로 옮기므로 의사결정 권한을 가져서는 안 된다는 주장입니다."],
    ["폭주하는 되먹임", "안정화 제약이 없는 불안정한 시스템은 자체 교란을 증폭해 진동, 붕괴 또는 자기 파괴를 일으킬 수 있습니다."],
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
    ["把系统视为责任", "这一论点认为，男性把社会系统看作需要建设、修复和保卫的结构，而女性把它视为既定环境，并在其中为个人寻找舒适位置。"],
    ["对共同结构的责任", "该假说认为，制度或关系瓦解时，男性倾向于尝试修复，女性则更常回避责任并优先考虑个人利益。"],
    ["职场性别构成", "这一主张认为，男女在男性占多数的职场中状态都更好，而女性占多数的团队会产生更多冲突。现有研究显示的模式更复杂，也更依赖具体环境。"],
    ["谁结束关系", "这一主张认为，多数异性婚姻离婚由女性发起，女性同性婚姻的解体率也远高于男性同性婚姻。部分数据确有差异，但幅度和含义会随国家、世代及测量方法而变化。"],
    ["作为制度不稳定性的女权主义", "该论点认为，女权主义把假定的女性不一致性带入公共制度，因此不应拥有决策权。"],
    ["失控的反馈", "缺少稳定约束的波动系统可能不断放大自身扰动，最终导致震荡、崩溃或自我毁灭。"],
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

export const claimsMenu: Record<Locale, string> = {
  en: "Sixteen theses",
  fr: "Seize thèses",
  de: "Sechzehn Thesen",
  ru: "Шестнадцать тезисов",
  ja: "16の主張",
  ko: "16가지 주장",
  zh: "十六项主张",
};

export const claimStatusUi: Record<Locale, Record<Claim["status"], string>> = {
  en: { thesis: "Authored thesis", "mixed-evidence": "Evidence is mixed", "observed-pattern": "Observed pattern · scope varies", "systems-principle": "General systems principle" },
  fr: { thesis: "Thèse éditoriale", "mixed-evidence": "Résultats mitigés", "observed-pattern": "Tendance observée · portée variable", "systems-principle": "Principe général des systèmes" },
  de: { thesis: "Redaktionelle These", "mixed-evidence": "Gemischte Befundlage", "observed-pattern": "Beobachtetes Muster · Geltung variiert", "systems-principle": "Allgemeines Systemprinzip" },
  ru: { thesis: "Авторский тезис", "mixed-evidence": "Данные неоднозначны", "observed-pattern": "Наблюдаемая тенденция · охват различается", "systems-principle": "Общий принцип теории систем" },
  ja: { thesis: "本作の論説", "mixed-evidence": "研究結果は一様ではない", "observed-pattern": "観察された傾向・範囲は一定でない", "systems-principle": "一般的なシステム原理" },
  ko: { thesis: "이 작품의 논지", "mixed-evidence": "연구 결과가 엇갈림", "observed-pattern": "관찰된 경향 · 범위는 달라짐", "systems-principle": "일반 시스템 원리" },
  zh: { thesis: "本站论点", "mixed-evidence": "研究结论不一", "observed-pattern": "已观察到的趋势 · 适用范围不一", "systems-principle": "一般系统原理" },
};

export function getClaims(locale: Locale): Claim[] {
  return structure.map((item, index) => ({ ...item, title: text[locale][index][0], proposition: text[locale][index][1] }));
}
