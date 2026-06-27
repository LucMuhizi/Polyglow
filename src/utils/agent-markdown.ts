import { DEFAULT_LOCALE, LOCALE_META } from "@/config/locales"
import { SITE_CONFIG } from "@/config/site"
import { getCategory, getTag } from "@/config/taxonomy"
import {
  postCategorySlug,
  postTagSlugs,
  postUrl,
  type PostEntry,
} from "@/utils/posts"

function canonicalPostUrl(post: PostEntry): string {
  return `${SITE_CONFIG.url}${postUrl(post)}`
}

function localeLabel(locale: keyof typeof LOCALE_META): string {
  const localeMeta = LOCALE_META[locale]
  return `${localeMeta.nativeName} (${locale})`
}

function siteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const looksLikeAsset = /\.[a-z0-9]+$/i.test(normalized)
  if (looksLikeAsset) return `${SITE_CONFIG.url}${normalized}`
  return `${SITE_CONFIG.url}${normalized.endsWith("/") ? normalized : `${normalized}/`}`
}

export function renderLlmsTxt(posts: readonly PostEntry[]): string {
  const latestPosts = posts.slice(0, 12)

  return [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.description}. A concise index for site structure, recent content, and official entry points.`,
    "",
    `- Repository: ${SITE_CONFIG.repository}`,
    `- Default locale: ${localeLabel(DEFAULT_LOCALE)}`,
    "",
    "## Core",
    "",
    `- [Home](${siteUrl("/")})`,
    `- [About](${siteUrl("/about/")})`,
    `- [All posts](${siteUrl("/posts/")})`,
    `- [Contact](${siteUrl("/contact/")})`,
    `- [llms-full.txt](${siteUrl("llms-full.txt")}): Full post index with categories, tags, and publication dates.`,
    "",
    "## Content endpoints",
    "",
    `- [RSS](${siteUrl("rss.xml")})`,
    `- [Sitemap](${siteUrl("sitemap-index.xml")})`,
    `- [Robots](${siteUrl("robots.txt")})`,
    "",
    "## Recent posts",
    "",
    ...latestPosts.map(
      (post) =>
        `- [${post.data.title}](${canonicalPostUrl(post)}): ${post.data.description}`
    ),
    "",
  ].join("\n")
}

export function renderLlmsFullTxt(posts: readonly PostEntry[]): string {
  const lines = [
    `# ${SITE_CONFIG.name} llms-full.txt`,
    "",
    `Site: ${SITE_CONFIG.url}`,
    `Generated from ${posts.length} published posts.`,
    `Repository: ${SITE_CONFIG.repository}`,
    "",
    "## Core references",
    `- [Home](${siteUrl("/")})`,
    `- [llms.txt](${siteUrl("llms.txt")}): Concise index summary`,
    "",
    "## All posts",
    "",
  ]

  const localePosts = posts.filter((post) => post.data.locale === "en" || post.data.locale === DEFAULT_LOCALE)
  if (localePosts.length === 0) {
    lines.push(`### ${localeLabel(DEFAULT_LOCALE)}`, "", "_No posts published yet._", "")
  } else {
    lines.push(`### ${localeLabel(DEFAULT_LOCALE)}`, "")
    for (const post of localePosts) {
      const locale = post.data.locale
      const categorySlug = postCategorySlug(post)
      const category = getCategory(categorySlug)
      const tags = postTagSlugs(post)
        .map((tag) => getTag(tag)?.labelByLocale[locale] ?? tag)
        .join(", ")
      lines.push(
        `- [${post.data.title}](${canonicalPostUrl(post)})`,
        `  - Description: ${post.data.description}`,
        `  - Category: ${category?.labelByLocale[locale] ?? categorySlug}`,
        `  - Tags: ${tags || "None"}`,
        `  - Published: ${post.data.pubDate.toISOString().slice(0, 10)}`
      )
    }
    lines.push("")
  }

  lines.push("## Optional")
  lines.push(`- [Sitemap](${siteUrl("sitemap-index.xml")})`)

  return lines.join("\n")
}
