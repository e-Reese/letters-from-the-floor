Variables — filled in
PUBLICATION_NAME = Letters from the Floor
PUBLICATION_SLUG = letters-from-the-floor
DOMAIN           = lettersfromthefloor.com
AUTHOR_NAME      = Ethan Reese
AUTHOR_EMAIL     = ethan@overclocksystems.com
GITHUB_REPO      = letters-from-the-floor
GITHUB_USER is whatever account I cloned this repo from — read it from git remote -v or gh repo view.
Prerequisites I've already done

Domain purchased and DNS pointed at GitHub Pages (A records to GitHub's IPs, plus CNAME for www)
Empty GitHub repo created at [GITHUB_USER]/[GITHUB_REPO] and cloned to this directory
gh CLI installed and authenticated (gh auth status confirms login)
Git configured locally with my user.name and user.email
Push authentication working (SSH key registered with GitHub, or gh is providing HTTPS auth)
Node.js 20+ and pnpm installed
ANTHROPIC_API_KEY exported in shell env
The four reference docs are in /docs/ of this repo:

docs/publication-plan.md
docs/editorial-package.md
docs/beat-and-calendar.md
docs/voice-guide.md



One important context note about my GitHub setup
My GitHub account already hosts a personal site ([GITHUB_USER].github.io) on a different repo. This publication is a separate project site on this repo, served at the custom domain [DOMAIN] — not at the default [GITHUB_USER].github.io/[GITHUB_REPO] path.
What this means for you: GitHub Pages routes by CNAME, so getting the public/CNAME file right is what makes this work. Don't set any base path in astro.config.mjs — the apex domain serves from root. Don't touch the personal site repo. If anything in the deploy setup looks like it would conflict with the existing personal Pages deployment, stop and ask me.

The Task
Scaffold a complete publication infrastructure for [PUBLICATION_NAME] — a static site, deploy pipeline, and authoring CLI — ready for me to write the launch trio of articles in. Work through the phases in order. After each phase, run the verification step before moving to the next.
The four reference docs in /docs/ are authoritative for editorial content (page copy, voice, beat). For technical decisions not specified below, choose the simplest defensible option and note it in commit messages — don't stop to ask.
Use TypeScript throughout. Use pnpm for package management. Make small, well-titled commits as you go.

Tech Stack (use exactly these)

Astro (latest stable) initialized from the official blog starter template (pnpm create astro@latest -- --template blog --typescript strict)
GitHub Pages for hosting, with custom domain [DOMAIN]
GitHub Actions for CI/CD on push to main
MDX for any rich content (already included in the blog template)
@astrojs/rss for the RSS feed (included)
pubcli — Node.js + TypeScript CLI in /pubcli/, using commander, @anthropic-ai/sdk, gray-matter, simple-git, zod, chalk

No email service. No analytics yet. No comments. RSS feed only for distribution.

Repository Structure (target)
/
├── .github/workflows/deploy.yml
├── .pub/                       # gitignored except templates
│   ├── sources.yaml.example
│   ├── ideas.md
│   └── current-state.md
├── docs/                       # editorial reference (already exists)
├── public/
│   ├── CNAME                   # contains DOMAIN
│   └── favicon.svg
├── pubcli/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.ts
│   │   ├── commands/
│   │   │   ├── new.ts
│   │   │   ├── critique.ts
│   │   │   ├── lint.ts
│   │   │   ├── preview.ts
│   │   │   ├── publish.ts
│   │   │   ├── announce.ts
│   │   │   ├── source-add.ts
│   │   │   ├── ideas.ts
│   │   │   └── weekly.ts
│   │   └── lib/
│   │       ├── claude.ts       # wraps Anthropic SDK; loads voice guide as system prompt
│   │       ├── git.ts
│   │       ├── paths.ts
│   │       └── tells.ts        # AI-tell regex list from voice-guide.md
│   └── README.md
├── src/
│   ├── content/
│   │   ├── posts/
│   │   │   └── _placeholder.md.example
│   │   └── config.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── PostCard.astro
│   ├── pages/
│   │   ├── index.astro         # archive / homepage
│   │   ├── about.astro
│   │   ├── editorial-standards.astro
│   │   ├── disclosure.astro
│   │   ├── pitch.astro
│   │   ├── rss.xml.ts
│   │   └── posts/[slug].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md                   # private operational notes

Phase 1 — Astro initialization

Initialize Astro using the blog starter into the current directory (don't create a subfolder).
Strip the placeholder content (sample posts, default copy) but keep the working content collections setup.
Configure astro.config.mjs with site: 'https://[DOMAIN]'.
Add public/CNAME containing [DOMAIN].
Update package.json name and description to match the publication.
Run pnpm install and pnpm run build to confirm clean baseline.

Verify: pnpm run dev starts a local server with no errors, serving an empty archive page.

Phase 2 — Editorial pages
Create the four publication-facing pages using exact copy from docs/editorial-package.md. Substitute:

[PUBLICATION NAME] → Letters from the Floor
[NAME] / [AUTHOR_NAME] / [LAST NAME] → Ethan Reese
Email placeholders → editor@lettersfromthefloor.com for the primary, and pitches@lettersfromthefloor.com / tips@lettersfromthefloor.com / press@lettersfromthefloor.com for the topic-specific addresses on /pitch and /about. (These don't need real inboxes yet — I'll set up email forwarding later. Use them as written.)
[DATE] on the Disclosure page → today's date

Pages: /about, /editorial-standards, /disclosure, /pitch.
Use a single BaseLayout.astro for all four; the body copy is markdown-style content rendered cleanly. No widgets, no cards, no callouts. Pure prose with semantic headings.
Verify: All four pages render at their slugs locally, links between them work, internal links match the routes.

Phase 3 — Design and homepage
Design direction: literary, restrained, intentional. Think New Yorker masthead crossed with a small literary quarterly. Not techy.

Type: A serif for body and headings (Iowan Old Style, Source Serif 4, or similar — choose one and use it consistently). System sans only for UI affordances (date stamps, tags). Generous line height (1.6+ on body), comfortable max-width (~640px reading column).
Color: Off-white background (#FBFAF7 or similar warm white), near-black text (#1A1A1A), one restrained accent (a deep ink blue or burgundy) used sparingly for links.
Layout: Centered single-column reading experience. No sidebars. Generous vertical rhythm.
No: drop shadows, gradients, rounded-everything, emoji, decorative icons, "modern SaaS" energy.

The homepage is the archive: publication name + tagline at top, then a chronological list of posts, each item showing title, date, dek (subtitle), and estimated read time. Footer with links to /about, /editorial-standards, /disclosure, /pitch, RSS.
Verify: Homepage renders with empty archive gracefully ("First pieces publishing soon."), then add one placeholder post to verify the listing works, then delete it.

Phase 4 — Content collection schema
In src/content/config.ts, define the post schema with these fields:
typescript{
  title: string,
  dek: string,                    // subtitle / one-line summary
  publishDate: date,
  register: enum(['atlantic', 'gladwell', 'newyorker', 'mixed']),
  form: enum(['essay', 'profile', 'reportage', 'history', 'capstone']),
  wordTarget: number,             // intended length
  draft: boolean (default true),
  sources: array of strings (optional),  // names of sources interviewed
  corrections: array of {date, note} (optional),
}
Add a Zod refinement: draft: false requires non-empty body and a publishDate ≤ today.
The post detail layout (src/pages/posts/[slug].astro) renders: title, dek, publish date, register tag, byline, body, then a footer with disclosure footer ("[AUTHOR_NAME] is the editor of [PUBLICATION_NAME]. Disclosures: /disclosure") and corrections list if any.
Verify: Create a sample post in src/content/posts/_test.md with full frontmatter, confirm it renders, then delete it.

Phase 5 — GitHub Actions deploy
Create .github/workflows/deploy.yml that on push to main:

Checks out, sets up pnpm and Node 20
Installs dependencies
Runs pnpm run build
Deploys to GitHub Pages using actions/deploy-pages@v4

Use the standard Astro GitHub Pages workflow from Astro's docs. Because [DOMAIN] is the apex custom domain and routing is handled by public/CNAME, do not set a base path in astro.config.mjs — leaving it default (root) is correct.
Enable Pages for this repo
Use gh for any GitHub-side configuration so I don't have to click through the web UI. Specifically:

If the remote isn't yet set in this clone, configure it with gh repo set-default [GITHUB_USER]/[GITHUB_REPO] and git remote add origin using the URL gh returns
Enable GitHub Pages on this repo with gh api repos/[GITHUB_USER]/[GITHUB_REPO]/pages -X POST -f build_type=workflow (or the equivalent gh command if available — handle the case where Pages is already enabled and the call returns 409)
Confirm the personal site repo ([GITHUB_USER].github.io) is untouched — never run any gh command against that repo
After first deploy, verify with gh api repos/[GITHUB_USER]/[GITHUB_REPO]/pages that the custom domain shows as [DOMAIN] and HTTPS is enabled (may need a gh api ... -X PUT call to set cname to [DOMAIN] and https_enforced to true)

Verify: Push to main triggers the action and deploys successfully. Run gh run watch on the latest run to confirm green. [DOMAIN] serves the live site (if DNS hasn't propagated yet, that's a wait, not a failure — note it in the final summary).

Phase 6 — pubcli
Build the CLI in /pubcli/. Set up as a separate package with its own package.json, with a bin entry so pnpm link --global makes pubcli available.
Commands
pubcli new "<title>"

Prompts for register, form, wordTarget (with sensible defaults)
Creates src/content/posts/<slug>.md with full frontmatter, draft: true, empty body with section comments (<!-- LEDE -->, <!-- BODY -->, <!-- KICKER -->)
Slug: lowercase, hyphenated, max 60 chars
Opens the file in $EDITOR if set

pubcli critique <slug>

Loads the post body
Loads docs/voice-guide.md as system context
Sends to Claude (claude-opus-4-7) with prompt: "You are a sharp first reader for [PUBLICATION_NAME]. Critique this draft using the voice guide loaded as your standards. Quote specific lines. Look for: weak claims, unsupported assertions, AI-tells, structural issues, places where argument loses energy. Output a numbered list."
Prints the critique with line-quote highlighting

pubcli lint <slug>

Validates frontmatter against schema (use the same Zod schema as Astro)
Checks links resolve (HEAD request, 5s timeout each)
Scans body for AI-tells from lib/tells.ts — print each match with line number and the tell pattern matched
Confirms post ends with the disclosure footer or has it set up via layout (it should be in the layout, so just confirm layout renders disclosure)
Exit code 0 if clean, 1 if any issue

pubcli preview <slug>

Sets the post to draft: false temporarily (in memory only — don't write)
Starts astro dev with that post visible

pubcli publish <slug>

Runs lint first; aborts on failure
Sets draft: false and confirms publishDate is today (or asks)
git add, git commit -m "Publish: <title>", git push origin main
Prints the live URL once the workflow completes (use gh run watch to track the latest run, then print the URL)

pubcli announce <slug>

Generates LinkedIn and X post drafts using Claude
Saves to .pub/announcements/<slug>.md for human review and manual posting
Does NOT auto-post

pubcli source-add <name>

Interactively appends a source entry to .pub/sources.yaml
Fields: name, role, organization, contact (email/linkedin), expertise tags, notes, last-contacted

pubcli ideas

Loads docs/beat-and-calendar.md and .pub/ideas.md
Asks Claude to propose 5 fresh story angles within the beat, avoiding overlap with existing pieces and ideas
Appends approved ideas to .pub/ideas.md

pubcli weekly

Reads content collection, source list, and ideas backlog
Prints a weekly status report: published this week, drafts in flight, source pipeline, idea backlog, suggested next move

lib/tells.ts
Extract the AI-tell list from docs/voice-guide.md ("AI-Tells to Hunt and Kill" section). Convert to a Tell[] array with {pattern: RegExp, name: string, severity: 'warn'|'error'}. Phrase patterns are error; stylistic patterns (em-dash overuse, triplets) are warn.
lib/claude.ts
Wraps Anthropic SDK. Has one function critique(systemPrompt: string, userContent: string): Promise<string> and one generate(systemPrompt, userContent). Uses model claude-opus-4-7. Streams to stdout. Reads ANTHROPIC_API_KEY from env.
Verify: All commands run without errors. pubcli new "Test Post" creates a valid post. pubcli lint <slug> runs clean on the test post. Delete the test post when done.

Phase 7 — Repo documentation
Write README.md (private operational notes — repo is public-readable since GitHub Pages is public, but the README is for the editor):

One-paragraph what-this-is
Quick-start: how to write a post, how to publish
Pointers to /docs/ for editorial standards
pubcli command reference (concise)
Deployment notes

Add .pub/current-state.md with empty sections: "In flight", "Queued", "Source pipeline", "Idea backlog". This is the file I'll update weekly.
Add .pub/sources.yaml.example with one fake-data example showing schema.
Update .gitignore to exclude .pub/sources.yaml (real one) but keep .example, current-state.md, and ideas.md tracked.

Phase 8 — Final verification
Run through this checklist and report status of each:

pnpm run build exits clean
pnpm run dev serves the site, all four editorial pages render
Pushing to main deploys successfully via Actions
[DOMAIN] (or staging URL if DNS still propagating) serves the live site
RSS feed at /rss.xml validates
pubcli new, pubcli lint, and pubcli critique all run successfully on a temporary test post
The test post is deleted before final commit
Final commit message: "Initial publication infrastructure"

Print a summary at the end:

What's deployed and where
Any decisions you made that weren't specified above (and why)
Anything that needs my attention before I start writing
The exact commands I'll use to start writing Piece 1


What I'll do after this is done
Open a fresh Claude Project with the four /docs/ files loaded, then run pubcli new "The Long Memory of Strangers" to start the launch trio.
Begin.