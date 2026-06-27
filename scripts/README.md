# Migration scripts

## `migrate-from-wix.mjs`

One-shot importer for content from a legacy **Wix** site into this Blog / Astro content-collection structure. The script is safe by default: it never writes anything until you pass both `--live` and `--confirm`.

It produces:

- **Posts** as `src/content/posts/{YYYY-MM-DD}-{slug}.mdx`, matching the schema in `src/content.config.ts`.
- **Authors** as `src/content/authors/{slug}.mdx`.
- **Cover images** as `public/uploads/migrated/{slug}-hero.{ext}`.
- **Plan, dump, and human-readable report** under `scripts/.migration/` (gitignored).

### Before you run

1. Generate a **Wix Headless API Key** in your Wix Headless project dashboard. Scope it to **read** blog content. **Rotate** the key after the migration completes — anything posted in plain text on the open web is compromised.
2. Add the key to `.env.local` at the repo root (which is gitignored):

   ```dotenv
   WIX_API_KEY=your-api-key
   WIX_SITE_ID=optional-site-id
   ```

   If your Wix account has multiple sites, set `WIX_SITE_ID` so the script filters to the correct one. The site id is visible in your Wix dashboard URL (the hex string after `/site-overview/`).

3. Make sure your terminal has Node 22+ (the `package.json` engine field requires it). The npm scripts use `--env-file-if-exists=.env.local`, which Node 22 ships natively, so secrets are picked up automatically if the file exists.

### Three steps

```bash
# 1. Fetch the Wix content and save a dump.
pnpm migrate:fresh
# (reads .env.local via `node --env-file`. Adds --fresh so it always re-fetches.)

# 2. Review the report.
code scripts/.migration/report.md
code scripts/.migration/plan.json   # full plan, if you want to inspect mapping per post

# Adjust the mapping tables at the top of scripts/migrate-from-wix.mjs
# (CATEGORY_ALIAS_MAP, KNOWN_TAG_SLUGS) if any category or tag should land
# differently. Re-run pnpm migrate:fresh after edits.

# 3. Write the MDX files.
pnpm migrate:live
# (this requires both --live and --confirm internally. Existing MDX files are
# preserved; pass --force to overwrite.)
```

### Modes

| Flag | Behaviour |
|---|---|
| `--dump` | Only fetch from the Wix API and save `dump.json`. |
| `--plan` (default) | Fetch (or reuse dump) and write `plan.json` + `report.md`. **Writes nothing else.** |
| `--live` | Read the plan and write MDX files. Requires `--confirm`. |
| `--force` | Overwrite MDX files that already exist (only meaningful with `--live`). |
| `--confirm` | Required to actually write files with `--live`. |
| `--fresh` | Refetch from the Wix API even if `dump.json` already exists. |
| `--verbose` | Log every API call and every file write. |

### What the script does NOT do

- It does **not** delete anything. Existing MDX files are kept unless `--force` is passed.
- It does **not** push to GitHub. After the live run, you `git add` and commit yourself.
- It does **not** scrape **pages** from the Wix site. The Wix Posts API only covers posts. Use the editor onboarding doc (`src/content/pages/editor.mdx`) for about / contact / services / values content.
- It does **not** translate anything. Blog is single-locale English, so the migrated posts are written in English only.
- It does **not** publish to Cloudflare. That happens automatically when you push the resulting commits.

### Verifying after a live run

```bash
pnpm build
pnpm test:upgrade
```

The new MDX files are validated by `astro check` during `pnpm build`. Anything that fails frontmatter validation produces a build error pointing at the offending file. The most common cause is a category or tag that maps to a slug not in `src/config/taxonomy.ts`.

---

## `migrate-from-wix-playwright.mjs`

Public-site scraping fallback for when the Wix Headless API key doesn't have the Blog scope, or the Wix Blog app isn't connected to your Headless project. Drives a real Chromium via Playwright so it works against the Wix React SPA (a plain HTTP fetch returns the empty SPA shell, never the posts).

Produces the SAME outputs as the API script:
- `scripts/.migration/{dump.json, plan.json, report.md}`
- `src/content/posts/*.mdx`
- `public/uploads/migrated/{slug}-hero.{ext}` plus inline image binaries

### Install (one-time)

```bash
pnpm add -D playwright
pnpm add turndown
npx playwright install chromium      # ~300 MB
```

Then put the Wix site's public URL in `.env.local`:

```dotenv
WIX_SITE_URL=https://yourname.wixsite.com/yourname
WIX_LIST_PATH=/blog-1        # optional; defaults to /blog-1
```

### Run

```bash
pnpm migrate:scrape:fresh          # scrape + plan + report
code scripts/.migration/report.md  # review
pnpm migrate:scrape:live           # write MDX files (requires --confirm internally)
```

### How it extracts content

- **Post list**: parses `https://<site>/sitemap.xml` first; falls back to scanning the index page (`/blog-1` by default) if the sitemap is missing.
- **Per-post metadata**: prefers JSON-LD `BlogPosting`, falls back to og:* meta tags, then DOM selectors (`h1`, `[data-testid="richTextElement"]`, etc.).
- **Body**: extracts the `<article>` or `[data-testid="richTextElement"]` container, downloads every inline `<img>` to `public/uploads/migrated/`, rewrites the HTML src to the local path, then runs Turndown for HTML → Markdown.
- **Tags/Categories**: scraped from `<a>` tags whose href contains `/category/` or `/tag/`, plus visible footers.

### Differences from the API script

- The `dump.json` lists post URLs but not full content until the second phase runs (Playwright visits each URL).
- `categories`, `tags`, and `authors` arrays in `dump.json` are usually empty — Wix blog posts embed tags/categories inline, not in a separate collection.
- All migrated posts default to `draft: true`. Flip `draft: false` in Pages CMS when you're ready to publish.
- Bot-detection risks: if the public site blocks headless Chromium (rare on Wix), run with `--headed` once to capture an interactive session and adjust `--concurrency` if rate-limited.

### When to use which script

| Path | Use when |
|---|---|
| `pnpm migrate:fresh` (API) | The Wix Headless API key reads posts without 403. |
| `pnpm migrate:scrape:fresh` (Playwright) | The API returns 403 / 404 / RATELIMIT, OR you don't have a Headless project at all and just need to lift content off the live Wix site. |
