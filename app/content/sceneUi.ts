Exit code: 0
Wall time: 0.6 seconds
Output:
import type { Locale } from "./i18n";
import type { Gender } from "./story";

export type SceneCopy = {
  watch: string;
  interact: string;
  nearby: string;
  online: string;
  pool: string;
  oneChoice: string;
  expand: string;
  contract: string;
  selected: string;
  politicsLead: string;
  valueLead: string;
  age: string;
  next: string;
  replay: string;
  notes: string;
  riskLead: string;
  relationships: string;
  civic: string;
  exposedTo: string;
  riskItems: Record<"relationship" | "politics", Record<Gender, string[]>>;
  contributionLead: string;
  sharedSystem: string;
  contributionItems: Record<Gender, string[]>;
};

export const sceneUi: Record<Locale, SceneCopy> = {
  en: { watch:"Watch the idea",interact:"Tap the scene",nearby:"Natural field",online:"Digital field",pool:"visible people",oneChoice:"one choice",expand:"Expand to 1,000",contract:"Return to 10",selected:"selected",politicsLead:"Two paths separate over time",valueLead:"Feedback changes with every life stage",age:"age",next:"Next scene",replay:"Replay",notes:"Explore the theses",riskLead:"Different exposures, different calculations",relationships:"Relationships",civic:"Politics & civic life",exposedTo:"exposed to",riskItems:{relationship:{male:["Rejection","Loneliness","Provider pressure","Family separation"],female:["Coercion","Partner violence","Pregnancy burden","Abandonment"]},politics:{male:["Conscription","Hazardous work","Public-order violence","Economic displacement"],female:["Safety policy","Reproductive policy","Care burden","Political exclusion"]}},contributionLead:"Different work keeps one system alive",sharedSystem:"shared society",contributionItems:{male:["Policing","Infrastructure","Protection","Emergency response"],female:["Childbirth","Maternal investment","Care work","Community continuity"]} },
  fr: { watch:"Observez l’idée",interact:"Touchez la scène",nearby:"Cadre naturel",online:"Cadre numérique",pool:"personnes visibles",oneChoice:"un choix",expand:"Passer à 1 000",contract:"Revenir à 10",selected:"sélectionné",politicsLead:"Deux trajectoires s’écartent avec le temps",valueLead:"Les retours changent à chaque étape de vie",age:"âge",next:"Scène suivante",replay:"Rejouer",notes:"Explorer les thèses",riskLead:"Des expositions différentes, des calculs différents",relationships:"Relations",civic:"Politique et vie civique",exposedTo:"exposé à",riskItems:{relationship:{male:["Rejet","Solitude","Pression de pourvoir","Séparation familiale"],female:["Contrainte","Violence du partenaire","Charge de la grossesse","Abandon"]},politics:{male:["Conscription","Travail dangereux","Violence d’ordre public","Déplacement économique"],female:["Politique de sécurité","Politique reproductive","Charge du soin","Exclusion politique"]}},contributionLead:"Des tâches différentes font vivre un même système",sharedSystem:"société commune",contributionItems:{male:["Police","Infrastructures","Protection","Secours d’urgence"],female:["Accouchement","Investissement maternel","Travail de soin","Continuité communautaire"]} },
  de: { watch:"Idee ansehen",interact:"Szene antippen",nearby:"Natürliches Umfeld",online:"Digitales Umfeld",pool:"sichtbare Personen",oneChoice:"eine Wahl",expand:"Auf 1.000 erweitern",contract:"Zurück zu 10",selected:"ausgewählt",politicsLead:"Zwei Wege entfernen sich mit der Zeit",valueLead:"Rückmeldungen verändern sich in jeder Lebensphase",age:"Alter",next:"Nächste Szene",replay:"Wiederholen",notes:"Thesen erkunden",riskLead:"Andere Belastungen, andere Abwägungen",relationships:"Beziehungen",civic:"Politik und Gemeinwesen",exposedTo:"ausgesetzt",riskItems:{relationship:{male:["Zurückweisung","Einsamkeit","Versorgerdruck","Trennung von der Familie"],female:["Zwang","Partnergewalt","Schwangerschaftsbelastung","Verlassenwerden"]},politics:{male:["Wehrpflicht","Gefährliche Arbeit","Gewalt im Ordnungsdienst","Wirtschaftliche Verdrängung"],female:["Sicherheitspolitik","Reproduktionspolitik","Sorgebelastung","Politischer Ausschluss"]}},contributionLead:"Verschiedene Arbeit hält ein System am Leben",sharedSystem:"gemeinsame Gesellschaft",contributionItems:{male:["Polizei","Infrastruktur","Schutz","Notfallhilfe"],female:["Geburt","Mütterlicher Einsatz","Sorgearbeit","Gemeinschaftliche Kontinuität"]} },
  ru: { watch:"Посмотрите идею",interact:"Коснитесь сцены",nearby:"Естественная среда",online:"Цифровая среда",pool:"видимых людей",oneChoice:"один выбор",expand:"Расширить до 1 000",contract:"Вернуться к 10",selected:"выбран",politicsLead:"Две траектории расходятся со временем",valueLead:"Обратная связь меняется на каждом этапе жизни",age:"возраст",next:"Следующая сцена",replay:"Повторить",notes:"Открыть тезисы",riskLead:"Разная уязвимость — разные расчёты",relationships:"Отношения",civic:"Политика и общественная жизнь",exposedTo:"сталкивается с",riskItems:{relationship:{male:["Отвержение","Одиночество","Давление роли добытчика","Разлука с семьёй"],female:["Принуждение","Насилие партнёра","Бремя беременности","Оставление"]},politics:{male:["Воинская обязанность","Опасный труд","Насилие при охране порядка","Экономическое вытеснение"],female:["Политика безопасности","Репродуктивная политика","Бремя заботы","Политическое исключение"]}},contributionLead:"Разный труд поддерживает одну систему",sharedSystem:"общее общество",contributionItems:{male:["Полиция","Инфраструктура","Защита","Экстренная помощь"],female:["Роды","Материнский вклад","Забота","Преемственность сообщества"]} },
  ja: { watch:"アイデアを見る",interact:"シーンをタップ",nearby:"自然な環境",online:"デジタル環境",pool:"見える相手",oneChoice:"選ぶのは一人",expand:"1,000人に広げる",contract:"10人に戻す",selected:"選択",politicsLead:"二つの軌跡が時間とともに離れていく",valueLead:"人生の段階ごとに反応が変わる",age:"年齢",next:"次のシーン",replay:"もう一度",notes:"主張を見る",riskLead:"さらされる危険が違えば判断も変わる",relationships:"人間関係",civic:"政治と市民生活",exposedTo:"直面するもの",riskItems:{relationship:{male:["拒絶","孤独","扶養者としての圧力","家族との離別"],female:["強制","パートナーからの暴力","妊娠の負担","遺棄"]},politics:{male:["徴兵","危険労働","治安維持の暴力","経済的排除"],female:["安全政策","生殖に関する政策","ケア負担","政治的排除"]}},contributionLead:"異なる仕事が一つの仕組みを支える",sharedSystem:"共有する社会",contributionItems:{male:["警察","インフラ","防護","緊急対応"],female:["出産","母親としての投資","ケア労働","共同体の継続"]} },
  ko: { watch:"아이디어 보기",interact:"장면을 탭하세요",nearby:"자연 환경",online:"디지털 환경",pool:"보이는 사람",oneChoice:"한 명을 선택",expand:"1,000명으로 확장",contract:"10명으로 돌아가기",selected:"선택됨",politicsLead:"두 경로가 시간이 지나며 갈라집니다",valueLead:"삶의 단계마다 사회적 반응이 달라집니다",age:"나이",next:"다음 장면",replay:"다시 보기",notes:"주장 살펴보기",riskLead:"노출되는 위험이 다르면 판단도 달라집니다",relationships:"관계",civic:"정치와 시민 생활",exposedTo:"노출되는 위험",riskItems:{relationship:{male:["거절","외로움","부양 압박","가족과의 분리"],female:["강요","파트너 폭력","임신 부담","버림받음"]},politics:{male:["징병","위험 노동","공공질서 현장의 폭력","경제적 밀려남"],female:["안전 정책","재생산 정책","돌봄 부담","정치적 배제"]}},contributionLead:"서로 다른 노동이 하나의 시스템을 지탱합니다",sharedSystem:"공동 사회",contributionItems:{male:["치안","인프라","보호","긴급 대응"],female:["출산","모성 투자","돌봄 노동","공동체의 지속"]} },
  zh: { watch:"观看这个概念",interact:"轻触场景",nearby:"自然环境",online:"数字环境",pool:"可见的人",oneChoice:"只选择一人",expand:"扩展到 1,000 人",contract:"回到 10 人",selected:"已选择",politicsLead:"两条路径随时间逐渐分开",valueLead:"人生每个阶段收到的反馈都在变化",age:"年龄",next:"下一个场景",replay:"重播",notes:"查看论点",riskLead:"暴露不同，权衡也不同",relationships:"亲密关系",civic:"政治与公共生活",exposedTo:"面临",riskItems:{relationship:{male:["被拒绝","孤独","供养压力","与家庭分离"],female:["胁迫","伴侣暴力","怀孕负担","被抛弃"]},politics:{male:["兵役","危险工作","公共秩序中的暴力","经济排挤"],female:["安全政策","生育政策","照护负担","政治排斥"]}},contributionLead:"不同的劳动维持同一个系统",sharedSystem:"共同社会",contributionItems:{male:["治安维护","基础设施","保护","紧急响应"],female:["分娩","母职投入","照护劳动","社区延续"]} },
};

