# Voice & Style Guide

This is the foundational document for [PUBLICATION NAME]'s editorial voice. It lives in the Claude Project as the system context for every drafting and editing session, and it lives in your head as the standard you write toward.

---

## Core Principles

1. **Be specific.** Concrete nouns, particular places, named people. Generic = AI tells. The hotel is not "a Boston hotel." It is the Liberty.
2. **Be intelligent without being academic.** Assume the reader is smart. Don't explain a reference more than once.
3. **Sentence rhythm matters.** Vary length. Short sentence after a long one to land a point. Read aloud at the editing pass.
4. **Earn your conclusions.** No declared insights without supporting observation. The reader should arrive at the idea slightly before you state it.
5. **Don't moralize.** This is a publication of observation and ideas, not advocacy. The reader does the judging.
6. **Resist nostalgia.** When writing about the past or about practices in decline, complicate the easy narrative. Things weren't necessarily better. They were different.
7. **Trust the reader.** Don't summarize. Don't reassure. Don't restate the thesis at the end.

---

## Three Registers

The publication uses three voice registers depending on the piece. Pick one before drafting.

### Gladwell — narrative, accessible, anecdote-led

**Use for:** shorter essays (1,400–2,000 words), pieces with one strong central idea, pieces that need to move quickly. Profiles where the subject's story is the engine.

**Hallmarks:**
- Open with a particular person, scene, or moment
- Bring in research or theory only after the reader is hooked
- Build toward one clear, surprising thesis
- Short paragraphs, propulsive
- Earned "There is a reason for this..." moments

**Pitfalls:** Gladwell at his weakest is glib. Don't oversimplify. Don't cherry-pick the study. Don't leave the reader feeling smarter than they should.

### Atlantic Essay — measured, literary, idea-led

**Use for:** longer essays (2,000–2,800 words), pieces with multiple interlocking ideas, pieces that draw on history or theory substantially.

**Hallmarks:**
- Open with an observation, not a scene
- Patience with complexity
- Argument that can hold counter-argument inside it
- Allusion permitted; explanation of allusions is not (the reader either gets it or googles it)
- Paragraphs that breathe; willingness to develop a single point over a page

**Pitfalls:** pomposity, throat-clearing openings, conclusions that retreat into hedge.

### New Yorker Profile — patient, observational, character-led

**Use for:** profiles, reportage where a single person or place anchors the piece.

**Hallmarks:**
- Open in scene, with sensory detail
- Subject's voice early and often
- Biographical context introduced obliquely, in service of the present moment
- Other voices around the subject — colleagues, family, customers
- Willingness to let the subject be themselves rather than serve a thesis
- Endings that don't summarize; endings that resonate

**Pitfalls:** preciousness, over-quotation, the profile that mistakes access for insight.

---

## Sentence-Level Guidance

### Do

- Use the active voice by default
- Use specific verbs ("she wedged the box" not "she put the box")
- Trust the reader with one good word; don't pile on adjectives
- Use semicolons; they imply you know what you're doing
- Vary sentence opening — not every sentence should start with the subject
- Cut the first sentence of any paragraph that begins with throat-clearing
- When in doubt, cut

### Don't

- Begin paragraphs with "In today's world..."
- Use "leverage" as a verb (you're not in a deck anymore)
- Use "delve," "dive into," "navigate," "unpack" — AI-default verbs
- Use "moreover," "furthermore," "additionally" — connective tissue that doesn't add
- Use "it's worth noting" or "interestingly" — if it's interesting, demonstrate it
- Use em-dashes as a tic. Two per piece, max, and they should land.
- Begin a piece with a question. Almost always weak.
- Conclude with "ultimately" or "at the end of the day"

---

## AI-Tells to Hunt and Kill

In every Claude draft, search and revise:

- "It's important to note"
- "In conclusion"
- "Whether X or Y, one thing is clear"
- Any sentence that starts "But beyond [X]..."
- Triplets ("the texture, the rhythm, the tone of...") — Claude loves these. One per piece, max.
- Generic openers: "In today's fast-paced world," "More than ever," "We live in an age of"
- Em-dash overuse
- The word "ultimately"
- Any sentence containing both "navigate" and "landscape"
- "Not only... but also..."
- "Stands as a testament to"
- Ending a piece with "And perhaps that is the point."

The lint command in `pubcli` will scan for the worst of these automatically. The rest you catch by reading the piece aloud.

---

## Reference Texts

### Read or reread before writing in the publication's register

- **John McPhee**, *Annals of the Former World* — sentence-level density and patience
- **Joan Didion**, *The White Album* — the observing intelligence
- **Janet Malcolm**, *The Journalist and the Murderer* — moral seriousness in reportage
- **Tracy Kidder**, *The Soul of a New Machine* — technical-world reportage with humanity
- **John Jeremiah Sullivan**, *Pulphead* — voice across a range of subjects
- **Adrian Nicole LeBlanc**, *Random Family* — long observation, sustained attention

### For the publication's specific concerns

- **Marcel Mauss**, *The Gift* — the foundational text on reciprocity
- **David Graeber**, *Debt: The First 5,000 Years* — commerce as deeply human
- **Robert Caro**, *The Power Broker* — relationships and power, sustained over decades
- **Studs Terkel**, *Working* — the texture of jobs, in the workers' own voices
- **Erving Goffman**, *The Presentation of Self in Everyday Life* — social interaction as performance
- **William H. Whyte**, *The Social Life of Small Urban Spaces* — observation as method

You don't need to have read all of these. You should have read three.

---

## Claude Project Setup

Create a Claude Project named "[PUBLICATION NAME] — Editorial." Load these files into the Project knowledge:

1. This voice guide
2. The editorial standards page
3. The beat document
4. 2–3 of your own published pieces, once you have them, as voice samples
5. The Gladwell-style data privacy draft (existing voice sample)
6. A `current-state.md` you update weekly: in flight, queued, source pipeline
7. A `sources.yaml` of contacts

### Project instructions (paste at top of Project)

> You are an editorial collaborator for [PUBLICATION NAME], a publication about the human texture of business. Your job is to help with research, drafting, and editing.
>
> Always preserve the editor's voice — refer to the voice guide. Drafts should be specific, concrete, and avoid the AI-tells listed in the guide. When you don't know something, say so. When asked to draft, produce a real first draft, not a sketch. When asked to critique, be specific and constructive. Quote the line you're critiquing.
>
> You are not the writer. The editor is the writer. You are a research assistant, a drafting partner, and a sharp first reader. The piece is theirs.

---

## Drafting Loop (per piece)

1. **Outline session.** Talk through the piece with Claude. End with a tight outline: key beats, opening scene/observation, intended argument, ending.

2. **First draft.** Claude produces a complete first draft from the outline plus reporting notes.

3. **Critique session.** Claude critiques the draft as a sharp first reader, citing specific lines and looking for weak claims, unsupported assertions, AI-tells from the voice guide, structural issues, and places where the argument loses energy.

4. **Revise.** Claude applies the critique.

5. **Lint and publish.** `pubcli lint` then `pubcli publish`.

---

## The One Test

Before publishing anything, ask: *Could this have been written by anyone?*

If yes, it's not done.

If no — if there's at least one observation, one sentence, one specific that only you would have written — publish it.
