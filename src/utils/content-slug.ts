const CONTENT_EXTENSION_RE = /\.(md|mdx|markdown)$/i

export function stripContentExtension(value: string): string {
  return value.replace(CONTENT_EXTENSION_RE, "")
}

export function normalizeContentSlug(value: string): string {
  return stripContentExtension(value)
}
