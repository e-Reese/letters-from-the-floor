# Publication Plan

## Hosting: GitHub Pages + Astro

Total cost: **~$12/year** (just the domain).

**Why this stack:**
- **GitHub Pages** is free, supports custom domains, and pushes via git. Writing a piece becomes: drop markdown into `/src/content/posts/`, commit, deploy. Perfect for Claude Code automation.
- **Astro** is the right SSG: content-collections built for blogs, JSX-adjacent (familiar from your Next.js work), excellent typography defaults, fast builds. Use the `astro-paper` or `astro-cactus` template as a starting point. Astro generates an RSS feed automatically — no email service needed at launch.

**On email:** RSS plus a "follow on LinkedIn" link is sufficient at launch. Add an email service (Buttondown, Beehiiv, Resend) later if you have readers asking for it or a credential application that asks for subscriber count. Adding email to an Astro site is a one-hour task whenever you decide; there's no penalty for deferring.

### Setup (one-time, ~3 hours, single Claude Code session)
1. Buy domain on Porkbun or Namecheap (~$12/yr)
2. Create GitHub repo (private until launch)
3. Initialize Astro with a clean blog template
4. Configure custom domain in repo settings; point DNS
5. Configure GitHub Actions for auto-deploy on push to main
6. Build first version of `pubcli` (see below)
7. Publish About, Editorial Standards, Disclosure pages

I can scaffold all of this for you in one session — you provide the name and domain, I produce a working repo with templates filled in.

---

## Launch Sequence

### Week 0 — Setup (this week)
- Pick name; buy domain
- Set up GitHub Pages + Astro
- Draft and publish: About / Editorial Standards / Disclosure
- Set up Claude Project with all reference docs
- Build v1 of `pubcli`

### Week 1 — Launch trio (3 pieces, ~15 hours)
**Strategy:** A publication that launches with one piece reads as a personal blog. A publication that launches with three reads as an ongoing concern. Credentialing desks and first-time readers skim — give them something to skim.

The launch trio is selected from the calendar for the following reasons: all three are library essays (no reporting dependencies, fully draftable in week 1); they span two registers (Atlantic and Gladwell); and together they form a coherent thematic opening — memory as the core of relationship, the physical objects that support it, the obligation it creates.

- **Piece 1: "The Long Memory of Strangers"** (Atlantic, ~2,200 words) — flagship
- **Piece 2: "The Card and the Name"** (Gladwell, ~1,400 words) — short, sharp
- **Piece 3: "What We Owe the Person Who Remembered Us"** (Atlantic, ~1,800 words) — completes the arc

Publish all three on the same day. Soft launch to your personal network only.

### Weeks 2–9 — Steady cadence (8 pieces, 1/week)
One piece per week from the calendar. Mix continues as planned — essays, reportage, profiles. Begin source outreach in week 1 so reported pieces (the concierge profile, outside salesperson, connector, flower market) have lead time.

**Anchor:** Small Business Expo NYC (May 7) becomes Piece 5 — your first reporting trip, filed as literary reportage.

### Week 8 — Credential applications begin
You'll have 10 published pieces by end of week 8 — well above the credibility threshold. Build the credential one-pager and apply to first round of conferences (target events 6+ weeks out, late summer / fall cycle).

### Week 10 — Capstone & steady state
Piece 12 (the capstone) closes the launch arc. From here, sustained cadence of 1 piece/week at ~4–6 hrs/week. Apply rolling for events. Quarterly review of beat, voice, traction.

### Total: 12 pieces in 10 weeks
Three weeks faster to credential-ready than the original sequence.

---

## Time Budget per Piece (steady state)

| Phase | Time | Who |
|---|---|---|
| Idea/angle development | 20 min | You + Claude |
| Reporting/research | 60–90 min | You |
| Outline | 20 min | Claude → you review |
| First draft | 30 min Claude / 0 you | Claude in Project |
| Rewrite (lede + key sections) | 60 min | **You — non-negotiable** |
| Edit pass (Claude critique) | 20 min | Claude → you decide |
| Final polish | 30 min | You |
| Publish via CLI | 5 min | CLI |
| Promo (LinkedIn, X) | 15 min | You + CLI assist |
| **Total** | **~4 hrs** | |

Reporting weeks add ~2 hrs for interviews and transcription.

---

## Claude Code Automation: `pubcli`

A small CLI living in your publication repo. Node.js + commander, ~300 lines total. Wraps git and the Anthropic SDK.

### Commands

```
pubcli new "<title>"          Scaffold a new post — frontmatter, slug, draft body
pubcli draft <slug>           Open in editor; optional Claude drafting loop
pubcli critique <slug>        Run Claude editorial pass with voice guide loaded;
                              outputs structured feedback (structure, weak claims,
                              AI-tells, line edits)
pubcli lint <slug>            Verify links, frontmatter, disclosure footer presence,
                              voice-tell scan against your block list
pubcli preview <slug>         Local Astro dev server with this post
pubcli publish <slug>         Lint → commit → push → trigger deploy → notify
pubcli announce <slug>        Generate platform-specific posts (LinkedIn, X)
                              for your review; queues to local file, not auto-posts
pubcli source-add <name>      Append to sources.yaml with contact info, expertise
pubcli ideas                  Run Claude through trending topics in your beat;
                              produces a ranked list of angles
pubcli weekly                 Weekly status report — what published, what's queued,
                              source pipeline, idea backlog
```

### Implementation notes
- Stores publication state in `.pub/` directory (sources, ideas, drafts, voice samples)
- `critique` and `ideas` commands use Claude with the voice guide loaded as system prompt
- `announce` does not auto-post — generates drafts you approve. Auto-posting reads as bot energy.
- Git operations stay local; the CLI never force-pushes or amends history without confirmation

I can build this in one Claude Code session — probably 2–3 hours.

---

## Risks & Mitigations

**Risk: Conference desks Google you and find Overclock.**
You disclose it on the About page yourself. The whole game is "founder who runs a real publication on an adjacent topic" — not "secret founder pretending to be media." Disclosure is your shield, not your liability. Real journalists have had companies. The line is editorial conflict, not biographical purity.

**Risk: Voice drifts into AI-default blandness.**
The "you rewrite the lede + key sections by hand" rule is non-negotiable. The voice guide and your own published pieces (loaded into the Project as samples) keep Claude's drafts close to your register. Quarterly voice audit: read your last four pieces back-to-back, flag any sentence that could have been written by anyone.

**Risk: Looks like content marketing.**
The "1+ named source per month" rule — minimum, more is better. Reporting is what makes it media. Pure essay-blog gets filtered as content marketing by anyone who's ever read content marketing.

**Risk: Time creep eats founder hours.**
Hard cap weekly cadence. Don't push to 2x/week even when momentum is high. Solo media at high frequency = obvious tells, and your real job is Overclock.

**Risk: Beat conflict with Overclock.**
Strict rule — never write about conversation intelligence, AI notetakers, CRM tools, sales engagement, RevOps software, or any direct competitor. If you can't tell whether a piece is too close, it is too close.

**Risk: A piece embarrasses you as a founder later.**
Don't publish opinions you wouldn't defend in a board meeting. The publication's positions are your positions, even when adjacent to your company. Be willing to stand behind everything.
