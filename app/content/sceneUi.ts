import type { Locale } from "./i18n";

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
};

export const sceneUi: Record<Locale, SceneCopy> = {
  en: { watch:"Watch the idea",interact:"Tap the scene",nearby:"Natural field",online:"Digital field",pool:"visible people",oneChoice:"one choice",expand:"Expand to 1,000",contract:"Return to 10",selected:"selected",politicsLead:"Two paths separate over time",valueLead:"Feedback changes with every life stage",age:"age",next:"Next scene",replay:"Replay",notes:"Explore the theses" },
  fr: { watch:"Observez l’idée",interact:"Touchez la scène",nearby:"Cadre naturel",online:"Cadre numérique",pool:"personnes visibles",oneChoice:"un choix",expand:"Passer à 1 000",contract:"Revenir à 10",selected:"sélectionné",politicsLead:"Deux trajectoires s’écartent avec le temps",valueLead:"Les retours changent à chaque étape de vie",age:"âge",next:"Scène suivante",replay:"Rejouer",notes:"Explorer les thèses" },
  de: { watch:"Idee ansehen",interact:"Szene antippen",nearby:"Natürliches Umfeld",online:"Digitales Umfeld",pool:"sichtbare Personen",oneChoice:"eine Wahl",expand:"Auf 1.000 erweitern",contract:"Zurück zu 10",selected:"ausgewählt",politicsLead:"Zwei Wege entfernen sich mit der Zeit",valueLead:"Rückmeldungen verändern sich in jeder Lebensphase",age:"Alter",next:"Nächste Szene",replay:"Wiederholen",notes:"Thesen erkunden" },
  ru: { watch:"Посмотрите идею",interact:"Коснитесь сцены",nearby:"Естественная среда",online:"Цифровая среда",pool:"видимых людей",oneChoice:"один выбор",expand:"Расширить до 1 000",contract:"Вернуться к 10",selected:"выбран",politicsLead:"Две траектории расходятся со временем",valueLead:"Обратная связь меняется на каждом этапе жизни",age:"возраст",next:"Следующая сцена",replay:"Повторить",notes:"Открыть тезисы" },
  ja: { watch:"アイデアを見る",interact:"シーンをタップ",nearby:"自然な環境",online:"デジタル環境",pool:"見える相手",oneChoice:"選ぶのは一人",expand:"1,000人に広げる",contract:"10人に戻す",selected:"選択",politicsLead:"二つの軌跡が時間とともに離れていく",valueLead:"人生の段階ごとに反応が変わる",age:"年齢",next:"次のシーン",replay:"もう一度",notes:"主張を見る" },
  ko: { watch:"아이디어 보기",interact:"장면을 탭하세요",nearby:"자연 환경",online:"디지털 환경",pool:"보이는 사람",oneChoice:"한 명을 선택",expand:"1,000명으로 확장",contract:"10명으로 돌아가기",selected:"선택됨",politicsLead:"두 경로가 시간이 지나며 갈라집니다",valueLead:"삶의 단계마다 사회적 반응이 달라집니다",age:"나이",next:"다음 장면",replay:"다시 보기",notes:"주장 살펴보기" },
  zh: { watch:"观看这个概念",interact:"轻触场景",nearby:"自然环境",online:"数字环境",pool:"可见的人",oneChoice:"只选择一人",expand:"扩展到 1,000 人",contract:"回到 10 人",selected:"已选择",politicsLead:"两条路径随时间逐渐分开",valueLead:"人生每个阶段收到的反馈都在变化",age:"年龄",next:"下一个场景",replay:"重播",notes:"查看论点" },
};
