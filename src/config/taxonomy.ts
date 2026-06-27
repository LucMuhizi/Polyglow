import type { Locale } from "./locales"

type LocalizedText = Record<Locale, string>

export type TaxonomyItem = {
  slug: string
  order: number
  labelByLocale: LocalizedText
  descriptionByLocale: LocalizedText
}

const localized = (text: LocalizedText): LocalizedText => text

const localizedSingle = (value: string): LocalizedText =>
  localized({
    en: value,
    zh: value,
    fr: value,
    es: value,
    ru: value,
    ja: value,
    ko: value,
    pt: value,
    de: value,
    id: value,
    ar: value,
  })

export const TAXONOMY = {
  categories: [
    {
      slug: "articles",
      order: 0,
      labelByLocale: localizedSingle("Articles"),
      descriptionByLocale: localizedSingle(
        "Long-form analysis and opinion essays on Agency, Authority, and Architecture."
      ),
    },
    {
      slug: "research",
      order: 1,
      labelByLocale: localizedSingle("Research"),
      descriptionByLocale: localizedSingle(
        "Original research, field reports, and quantitative work."
      ),
    },
    {
      slug: "policy",
      order: 2,
      labelByLocale: localizedSingle("Policy"),
      descriptionByLocale: localizedSingle(
        "Policy briefs, frameworks, and recommendations."
      ),
    },
    {
      slug: "speaking",
      order: 3,
      labelByLocale: localizedSingle("Speaking & Media"),
      descriptionByLocale: localizedSingle(
        "Talks, interviews, panels, podcasts, and press mentions."
      ),
    },
    {
      slug: "notes",
      order: 4,
      labelByLocale: localizedSingle("Notes"),
      descriptionByLocale: localizedSingle(
        "Brief notes and reflections."
      ),
    },
    {
      slug: "projects",
      order: 5,
      labelByLocale: localizedSingle("Projects"),
      descriptionByLocale: localizedSingle(
        "Consultancy and research projects. See the Projects collection."
      ),
    },
  ],
  tags: [
    {
      slug: "strategy",
      order: 1,
      labelByLocale: localized({
        zh: "策略",
        en: "Strategy",
        fr: "Stratégie",
        es: "Estrategia",
        ru: "Стратегия",
        ja: "戦略",
        ko: "전략",
        pt: "Estratégia",
        de: "Strategie",
        id: "Strategi",
        ar: "استراتيجية",
      }),
      descriptionByLocale: localized({
        zh: "策略思考。",
        en: "Strategic thinking.",
        fr: "Pensée stratégique.",
        es: "Pensamiento estratégico.",
        ru: "Стратегическое мышление.",
        ja: "戦略的思考。",
        ko: "전략적 사고.",
        pt: "Pensamento estratégico.",
        de: "Strategisches Denken.",
        id: "Pemikiran strategis.",
        ar: "تفكير استراتيجي.",
      }),
    },
    {
      slug: "risk",
      order: 2,
      labelByLocale: localized({
        zh: "风险",
        en: "Risk",
        fr: "Risque",
        es: "Riesgo",
        ru: "Риск",
        ja: "リスク",
        ko: "위험",
        pt: "Risco",
        de: "Risiko",
        id: "Risiko",
        ar: "مخاطر",
      }),
      descriptionByLocale: localized({
        zh: "风险与韧性。",
        en: "Risk and resilience.",
        fr: "Risque et résilience.",
        es: "Riesgo y resiliencia.",
        ru: "Риск и устойчивость.",
        ja: "リスクとレジリエンス。",
        ko: "위험과 회복력.",
        pt: "Risco e resiliência.",
        de: "Risiko und Resilienz.",
        id: "Risiko dan ketahanan.",
        ar: "المخاطر والمرونة.",
      }),
    },
    {
      slug: "market",
      order: 3,
      labelByLocale: localized({
        zh: "市场",
        en: "Market",
        fr: "Marché",
        es: "Mercado",
        ru: "Рынок",
        ja: "市場",
        ko: "시장",
        pt: "Mercado",
        de: "Markt",
        id: "Pasar",
        ar: "السوق",
      }),
      descriptionByLocale: localized({
        zh: "市场观察。",
        en: "Market observations.",
        fr: "Observations de marché.",
        es: "Observaciones de mercado.",
        ru: "Наблюдения за рынком.",
        ja: "市場観察。",
        ko: "시장 관찰.",
        pt: "Observações de mercado.",
        de: "Marktbeobachtungen.",
        id: "Pengamatan pasar.",
        ar: "ملاحظات حول السوق.",
      }),
    },
    {
      slug: "reflect",
      order: 4,
      labelByLocale: localized({
        zh: "反思",
        en: "Reflect",
        fr: "Réflexion",
        es: "Reflexión",
        ru: "Размышление",
        ja: "省察",
        ko: "성찰",
        pt: "Refletir",
        de: "Nachdenken",
        id: "Merenung",
        ar: "تأمل",
      }),
      descriptionByLocale: localized({
        zh: "反思札记。",
        en: "Reflective notes.",
        fr: "Notes réflexives.",
        es: "Notas reflexivas.",
        ru: "Рефлексивные заметки.",
        ja: "省察のメモ。",
        ko: "성찰 노트.",
        pt: "Notas reflexivas.",
        de: "Reflektierende Notizen.",
        id: "Catatan reflektif.",
        ar: "ملاحظات تأملية.",
      }),
    },
    {
      slug: "media",
      order: 5,
      labelByLocale: localized({
        zh: "媒体",
        en: "Media",
        fr: "Médias",
        es: "Medios",
        ru: "Медиа",
        ja: "メディア",
        ko: "미디어",
        pt: "Mídia",
        de: "Medien",
        id: "Media",
        ar: "إعلام",
      }),
      descriptionByLocale: localized({
        zh: "媒体与发布。",
        en: "Media and publishing.",
        fr: "Médias et publication.",
        es: "Medios y publicación.",
        ru: "Медиа и публикация.",
        ja: "メディアと発信。",
        ko: "미디어와 출판.",
        pt: "Mídia e publicação.",
        de: "Medien und Veröffentlichung.",
        id: "Media dan penerbitan.",
        ar: "الإعلام والنشر.",
      }),
    },
    {
      slug: "roam",
      order: 6,
      labelByLocale: localized({
        zh: "行走",
        en: "Roam",
        fr: "Errance",
        es: "Recorridos",
        ru: "Странствия",
        ja: "旅",
        ko: "여행",
        pt: "Percursos",
        de: "Unterwegs",
        id: "Mengembara",
        ar: "ترحال",
      }),
      descriptionByLocale: localized({
        zh: "行走与见闻。",
        en: "Travel and movement.",
        fr: "Voyages et déplacements.",
        es: "Viajes y movimiento.",
        ru: "Путешествия и движение.",
        ja: "旅と見聞。",
        ko: "여행과 이동.",
        pt: "Viagens e movimento.",
        de: "Reisen und Bewegung.",
        id: "Perjalanan dan pergerakan.",
        ar: "السفر والحركة.",
      }),
    },
    {
      slug: "allocation",
      order: 7,
      labelByLocale: localized({
        zh: "配置",
        en: "Allocation",
        fr: "Allocation",
        es: "Asignación",
        ru: "Распределение",
        ja: "配分",
        ko: "할당",
        pt: "Alocação",
        de: "Allokation",
        id: "Alokasi",
        ar: "تخصيص",
      }),
      descriptionByLocale: localized({
        zh: "资产配置。",
        en: "Capital allocation.",
        fr: "Allocation du capital.",
        es: "Asignación de capital.",
        ru: "Распределение капитала.",
        ja: "資本配分。",
        ko: "자본 배분.",
        pt: "Alocação de capital.",
        de: "Kapitalallokation.",
        id: "Alokasi modal.",
        ar: "تخصيص رأس المال.",
      }),
    },
    {
      slug: "innovation",
      order: 8,
      labelByLocale: localized({
        zh: "创新",
        en: "Innovation",
        fr: "Innovation",
        es: "Innovación",
        ru: "Инновация",
        ja: "革新",
        ko: "혁신",
        pt: "Inovação",
        de: "Innovation",
        id: "Inovasi",
        ar: "ابتكار",
      }),
      descriptionByLocale: localized({
        zh: "创新与产品。",
        en: "Innovation and products.",
        fr: "Innovation et produits.",
        es: "Innovación y productos.",
        ru: "Инновации и продукты.",
        ja: "革新とプロダクト。",
        ko: "혁신과 제품.",
        pt: "Inovação e produtos.",
        de: "Innovation und Produkte.",
        id: "Inovasi dan produk.",
        ar: "الابتكار والمنتجات.",
      }),
    },
    {
      slug: "model",
      order: 9,
      labelByLocale: localized({
        zh: "模型",
        en: "Model",
        fr: "Modèle",
        es: "Modelo",
        ru: "Модель",
        ja: "モデル",
        ko: "모델",
        pt: "Modelo",
        de: "Modell",
        id: "Model",
        ar: "نموذج",
      }),
      descriptionByLocale: localized({
        zh: "模型与框架。",
        en: "Models and frameworks.",
        fr: "Modèles et cadres.",
        es: "Modelos y marcos.",
        ru: "Модели и фреймворки.",
        ja: "モデルとフレームワーク。",
        ko: "모델과 프레임워크.",
        pt: "Modelos e estruturas.",
        de: "Modelle und Frameworks.",
        id: "Model dan kerangka kerja.",
        ar: "النماذج والأطر.",
      }),
    },
    {
      slug: "management",
      order: 10,
      labelByLocale: localized({
        zh: "管理",
        en: "Management",
        fr: "Gestion",
        es: "Gestión",
        ru: "Управление",
        ja: "管理",
        ko: "관리",
        pt: "Gestão",
        de: "Management",
        id: "Manajemen",
        ar: "إدارة",
      }),
      descriptionByLocale: localized({
        zh: "管理与运营。",
        en: "Management and operations.",
        fr: "Gestion et opérations.",
        es: "Gestión y operaciones.",
        ru: "Управление и операционная работа.",
        ja: "管理と運営。",
        ko: "관리와 운영.",
        pt: "Gestão e operações.",
        de: "Management und Betrieb.",
        id: "Manajemen dan operasional.",
        ar: "الإدارة والتشغيل.",
      }),
    },
    {
      slug: "governance",
      order: 11,
      labelByLocale: localizedSingle("Governance"),
      descriptionByLocale: localizedSingle(
        "Governance structures, processes, and reform."
      ),
    },
    {
      slug: "development",
      order: 12,
      labelByLocale: localizedSingle("Development"),
      descriptionByLocale: localizedSingle(
        "International and domestic development."
      ),
    },
    {
      slug: "policy",
      order: 13,
      labelByLocale: localizedSingle("Policy"),
      descriptionByLocale: localizedSingle(
        "Policy documents, briefs, and frameworks."
      ),
    },
    {
      slug: "education",
      order: 14,
      labelByLocale: localizedSingle("Education"),
      descriptionByLocale: localizedSingle(
        "Education systems and equity."
      ),
    },
    {
      slug: "health",
      order: 15,
      labelByLocale: localizedSingle("Health"),
      descriptionByLocale: localizedSingle(
        "Public health systems and access."
      ),
    },
    {
      slug: "technology",
      order: 16,
      labelByLocale: localizedSingle("Technology"),
      descriptionByLocale: localizedSingle(
        "Technology design and digital equity."
      ),
    },
    {
      slug: "africa",
      order: 17,
      labelByLocale: localizedSingle("Africa"),
      descriptionByLocale: localizedSingle(
        "Africa-focused analysis and reporting."
      ),
    },
    {
      slug: "uganda",
      order: 18,
      labelByLocale: localizedSingle("Uganda"),
      descriptionByLocale: localizedSingle(
        "Uganda-focused analysis and reporting."
      ),
    },
    {
      slug: "consultancy",
      order: 19,
      labelByLocale: localizedSingle("Consultancy"),
      descriptionByLocale: localizedSingle(
        "Independent consultancy engagements."
      ),
    },
    {
      slug: "research",
      order: 20,
      labelByLocale: localizedSingle("Research"),
      descriptionByLocale: localizedSingle(
        "Original research, methodology, and findings."
      ),
    },
    {
      slug: "leadership",
      order: 21,
      labelByLocale: localizedSingle("Leadership"),
      descriptionByLocale: localizedSingle(
        "Leadership and institutional change."
      ),
    },
  ],
} as const

export const PRIMARY_CATEGORY_SLUGS = [
  "articles",
  "research",
  "policy",
  "speaking",
  "notes",
  "projects",
] as const

export const TAGS_BY_CATEGORY: Record<string, readonly string[]> = {
  articles: ["reflect", "strategy", "model"],
  research: ["strategy", "model", "innovation"],
  policy: ["strategy", "model", "management"],
  speaking: ["media", "strategy", "model"],
  notes: ["reflect", "roam", "model"],
  projects: ["innovation", "model", "management"],
}

export function getCategory(slug: string): TaxonomyItem | undefined {
  return TAXONOMY.categories.find((item) => item.slug === slug)
}

export function getTag(slug: string): TaxonomyItem | undefined {
  return TAXONOMY.tags.find((item) => item.slug === slug)
}

const normalizeKey = (value: string): string =>
  value.trim().toLowerCase().replace(/[\s_]+/g, "-")

const categoryAliases: Record<string, string> = {}

const tagAliases: Record<string, string> = {}

function buildTaxonomyLookup(
  items: readonly TaxonomyItem[],
  aliases: Record<string, string>
): Map<string, string> {
  const lookup = new Map<string, string>()

  for (const item of items) {
    lookup.set(normalizeKey(item.slug), item.slug)
    lookup.set(normalizeKey(item.labelByLocale.en), item.slug)
  }

  for (const [alias, slug] of Object.entries(aliases)) {
    lookup.set(normalizeKey(alias), slug)
  }

  return lookup
}

const categoryLookup = buildTaxonomyLookup(TAXONOMY.categories, categoryAliases)
const tagLookup = buildTaxonomyLookup(TAXONOMY.tags, tagAliases)

export function normalizeCategorySlug(value: string): string {
  return categoryLookup.get(normalizeKey(value)) ?? normalizeKey(value)
}

export function normalizeTagSlug(value: string): string {
  return tagLookup.get(normalizeKey(value)) ?? normalizeKey(value)
}

export function getPrimaryCategories(): TaxonomyItem[] {
  return PRIMARY_CATEGORY_SLUGS.map((slug) => getCategory(slug)).filter(
    (item): item is TaxonomyItem => Boolean(item)
  )
}

export function getTagsForCategory(slug: string): TaxonomyItem[] {
  const tagSlugs = TAGS_BY_CATEGORY[slug] ?? []
  return tagSlugs
    .map((tagSlug) => getTag(tagSlug))
    .filter((item): item is TaxonomyItem => Boolean(item))
}
