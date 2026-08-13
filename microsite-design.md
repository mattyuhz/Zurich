# Zürich Guide Microsite — Design and Interaction Specification

## Purpose

Create a lightweight, mobile-first field guide generated from `zurich-guide.md`. It should help someone make a good decision in a few seconds while standing in an unfamiliar part of Zürich.

The microsite should answer:

- What should I do right now?
- What Zürich-specific food should I try?
- Where can I get serious coffee or a good pastry?
- What is worth doing near my current neighborhood?
- What fits the time, weather, and energy I have?
- How do I open the place directly in Google Maps?

It should feel like a compact field manual, not a travel blog, magazine, booking platform, map application, or custom travel app.

## Source-of-truth boundary

- `zurich-guide.md` is the only editable source for travel knowledge and copy.
- This file defines presentation, interaction, accessibility, and implementation behavior only.
- Do not duplicate or independently maintain descriptions in HTML or JavaScript.
- Generated HTML or JSON may be committed for GitHub Pages, but it remains derived output.
- Normal site content includes only records marked `Publish: yes` or deliberately selected `conditional` records.
- Records marked `no` remain in the Markdown archive and never appear in default results.
- Records marked `research` remain unpublished until reviewed.
- Missing optional metadata must not break rendering.

## Design principles

1. **Glanceable** — A useful answer should appear within seconds.
2. **Low stress** — Lead with one strong default and few alternatives.
3. **Mobile first** — Optimize for one-handed phone use while moving.
4. **Decisive** — Lead with what to order, see, buy, or do.
5. **Quiet** — Let structure, spacing, and rules create hierarchy.
6. **Honest** — Distinguish verified facts, editorial judgment, and volatile details.
7. **Direct handoff** — Google Maps handles navigation and live place details.
8. **Resilient** — Core guide content and links work without JavaScript.

## Visual direction

### Palette

| Role | Value |
|---|---|
| Background | `#000000` |
| Primary text | `#FFFFFF` |
| Secondary text | `#B3B3B3` or lighter if needed for AA contrast |
| Dividers / borders | approximately `#333333` |
| Focus indicator | solid white, clearly offset |

- Do not add accent colors unless usability testing reveals a specific need.
- Never communicate status or selection through color alone.
- No light-mode requirement for version 1.

### Typography

Use the system sans-serif stack:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

- One font weight only: `400`.
- No more than two visible type sizes.
- Display/title: approximately `24–28px`, line height `1.1–1.2`.
- Reading/UI: approximately `16–18px`, line height `1.4–1.5`.
- Use spacing, alignment, capitalization, position, borders, and labels—not bold weight or many sizes—to create hierarchy.
- Preserve Zürich names and diacritics.

### Graphic language

- Square or minimally rounded corners.
- Thin rules and borders.
- Disciplined whitespace, not oversized editorial spacing.
- Tables and grids when they improve scanning.
- Bullets for short, parallel information.
- No shadows, gradients, textures, decorative photography, illustrations, or ornamental icons.
- No hero image or skyline.
- No animated entrances, parallax, carousel, auto-advance, or decorative motion.
- Emoji may supplement a label but must never carry meaning alone.

## Information architecture

### Default page order

1. `ZÜRICH`
2. Compact “last reviewed” date
3. Quick-intent controls
4. `DON’T LEAVE WITHOUT` shortlist
5. Situation defaults / `JUST TELL ME WHAT TO DO`
6. Food objectives and restaurants
7. Coffee and bakeries
8. Design, architecture, museums, and retail
9. Neighborhood modules
10. Outdoors and day trips
11. Practical “don’t think about it” tips
12. Link to the complete source guide, if the archive is public

No filter selection should be required before the page becomes useful.

### Primary navigation

Use a visible, wrapping row of anchor links or filter buttons:

- Essentials
- Eat
- Coffee
- Design
- Neighborhoods
- Outside

Do not hide core navigation in a hamburger menu.

### Quick intents

Initial intent options:

- I’m hungry
- I need coffee
- I have 1 hour
- I have 2–3 hours
- It’s raining
- It’s sunny
- I’m tired
- I’m near work / Europaallee
- I want to wander
- I want design
- I want outdoors

Labels should be direct language, not icon-only controls.

## Layout

### Small screens

- One content column.
- Approximately `16px` page padding.
- Full-width recommendation rows/cards.
- Metadata in a wrapping grid, normally two columns.
- Controls wrap rather than shrink below readable/tappable size.
- Never require horizontal scrolling.
- Avoid wide Markdown-style tables in rendered mobile content; transform them into stacked rows or CSS grids.

### Wider screens

- Constrain content to a comfortable maximum width.
- Recommendation collections may become two or three columns.
- Preserve reading order and information density.
- Do not add desktop-only navigation, giant headings, or empty presentation space.

### Tables versus grids

- Use semantic `<table>` only for genuinely tabular comparisons that remain understandable on narrow screens.
- Use CSS Grid for card metadata and repeated field/value pairs.
- On small screens, transform comparison tables into labeled stacked records when necessary.

## Recommendation component

Every published recommendation should support:

- Name
- Plain-text priority label
- Category
- Neighborhood / area
- Directive: what to order, see, buy, or do
- One concise reason
- Approximate time
- Approximate cost when useful
- Relevant situational tags
- Important constraint, if any
- `Open in Google Maps` link
- Optional last-reviewed date for volatile details

### Visual order

1. Name
2. Directive
3. Why it matters
4. Compact metadata grid
5. Constraint or caveat, when essential
6. Google Maps action

The microsite description should normally be one or two short sentences. Research history, rejected alternatives, provenance, and long critical notes stay in `zurich-guide.md`.

### Priority language

Use plain text:

- Must
- Strong pick
- Good nearby
- Optional

Do not rely on stars, color, or icon position.

### Example

```text
STERNEN GRILL
Must · Bellevue · Quick · CHF

GET
St. Galler bratwurst + Gold Bürli + hot mustard.

WHY
A famous Zürich sausage-eating institution; fast and central.

[Open in Google Maps]
```

## Food-objective presentation

The primary food interface should begin with foods, not an undifferentiated restaurant list.

```text
EAT THIS               WHY                    DEFAULT PLACE
Züri Gschnätzlets      The Zürich main dish   [chosen venue]
Wiedikerli             Hyperlocal sausage     Metzgerei Keller
Sternen bratwurst      City institution       Sternen Grill
Birchermüesli          Invented here           [chosen source]
Luxemburgerli          Zürich creation         Sprüngli
```

Each food should link to one default and at most one useful backup. Do not expose four equivalent fondue restaurants as if the visitor must compare all four.

## Filters and browsing

### Filter groups

- Intent / category
- Neighborhood
- Time available
- Priority
- Situation: rain, sun, low energy, morning, after work

### Logic

- Values within one group act as alternatives (`OR`).
- Different groups combine (`AND`).
- The unfiltered view begins with curated best bets.
- Show the result count.
- Always show `Clear filters` when a filter is active.
- Preserve the user’s current scroll position when filters change where practical.
- Provide a plain-language empty state with one reset action.
- Do not hide essential information behind hover.
- Filter controls are real `<button>` elements with an accessible pressed state.

### MVP exclusions

Do not include initially:

- Free-text search
- GPS or “near me” detection
- Accounts or saved favorites
- Personalized rankings
- Shareable filter URLs
- Drag-and-drop itineraries

These may be evaluated only after real trip use demonstrates a need.

## Neighborhood modules

Neighborhoods are a first-class browsing mode because they reduce stressful transit and cross-city zigzagging.

Initial modules:

- Old Town / central orientation
- Europaallee / HB / work
- Zürich West / Viadukt
- Wiedikon / Kreis 3–4
- Seefeld / lakefront architecture

Each module should contain:

- A two- or three-sentence “why this area” summary
- A flexible sequence, not a timed itinerary
- Approximate total time
- Three to six stops maximum
- One route link only after it has been tested
- A visible escape hatch: “Short on time? Just do this.”

## Google Maps handoff

Every place-based entry should offer a clearly labeled normal link:

`Open in Google Maps`

Generic pattern:

```text
https://www.google.com/maps/search/?api=1&query=<URL-encoded place name and Zürich>
```

For routes:

```text
https://www.google.com/maps/dir/?api=1&origin=<...>&destination=<...>&waypoints=<...>&travelmode=walking
```

### Rules

- Prefer a verified direct place link when available.
- Keep a readable Maps query in the Markdown even when a direct link is stored.
- No Maps API, API key, embedded map, or custom route engine.
- Do not request location permission.
- Links work without JavaScript.
- Let the device choose the Maps app or website.
- Do not render a Maps action for an unresolved/ambiguous place.
- Google Maps is the handoff for routing, live hours, and temporary closure information—not the guide’s content source.
- Important seasonal closures or reservation requirements still appear in the guide with a review date.

## Content transformation contract

The eventual build step should understand these fields:

- Stable ID
- Record type
- Publication status
- Name
- Category
- Priority
- Area
- Time
- Cost
- Tags / conditions
- Directive / `Get`
- Short rationale / `Why`
- Constraint / caveat
- Maps query or URL
- Confidence / verification
- Last reviewed

### Publication behavior

| Status | Site behavior |
|---|---|
| `yes` | Eligible for default and filtered views. |
| `conditional` | Lower in defaults or visible only in relevant contexts. |
| `research` | Omitted until verified and editorially promoted. |
| `no` | Never included in public results. |

Do not expose source confidence labels to the traveler unless uncertainty materially affects the choice.

## Accessibility

Target WCAG 2.2 AA.

- Semantic landmarks, headings, lists, links, tables, and buttons.
- Logical heading order.
- Normal text at least `16px`.
- Tap targets at least `44 × 44px`.
- Strong text/background contrast.
- Text links underlined or otherwise distinguished without color dependence.
- Visible keyboard focus outline.
- Entire interface usable by keyboard.
- Filter buttons expose `aria-pressed` or equivalent state.
- Changing result counts use a polite live region.
- No placeholder as the only label.
- No meaning conveyed by emoji, icon, color, or position alone.
- Page language set to English while preserving German/Swiss place names.
- Browser zoom to 200% without loss or overlap.
- Respect `prefers-reduced-motion`; ideally include no nonessential motion.

## Performance and resilience

- Static GitHub Pages hosting.
- Plain semantic HTML and CSS.
- Minimal vanilla JavaScript only for filters and small enhancements.
- No React or other framework.
- No database, authentication, CMS, analytics, ads, cookies, or third-party fonts.
- No required network calls to render guide content.
- No service worker or PWA for version 1.
- Keep initial output small enough for a weak mobile connection.
- Core recommendations and Maps links remain visible if JavaScript is unavailable.
- Use native lazy behavior only if images are ever introduced later; version 1 should have none.

## Privacy

- No geolocation request.
- No behavioral tracking.
- No account, profile, or cloud-saved preferences.
- No embedded third-party maps, video, or social content.
- External destinations must be clear from link labels.

## Writing rules

- Directive first: `Get`, `See`, `Walk`, `Buy`, or `Do`.
- One useful “why should I care?” line.
- At most one history/fun-fact line, only when memorable.
- Avoid travel-blog adjectives and generic praise.
- Avoid hard-coded hours except critical constraints; include review date when used.
- Distinguish “worth crossing town for” from “good if nearby.”
- Use Swiss spellings/diacritics correctly.
- Do not call a place a hidden gem without evidence.
- Do not expose the user to raw recommendation volume.
- Where measurements matter, show both imperial and metric units. Give imperial the primary reading weight and place the metric equivalent immediately alongside it in smaller, muted type; do not duplicate labels or create a separate conversion row.

## Explicit non-goals

Version 1 is not:

- A complete rendering of the archive
- A minute-by-minute itinerary
- A restaurant-review site
- A booking service
- A live transit or hours tracker
- A map application
- A photo-heavy city guide
- A social recommendation product
- A CMS
- A native mobile app
- A personalized recommendation engine

## Suggested implementation footprint

```text
zurich-guide/
├── zurich-guide.md          # canonical content
├── microsite-design.md      # this specification
├── index.html               # generated or thin shell
├── styles.css
└── script.js                # optional filters only
```

If a parser proves unnecessarily fragile, introduce a small generated JSON artifact during the build. Never edit the JSON independently.

## Acceptance checklist

### Content

- [ ] Every visible recommendation originates in `zurich-guide.md`.
- [ ] `no` and `research` records are absent from public results.
- [ ] The default view is useful without filters.
- [ ] Food objectives lead to decisive venue choices.
- [ ] No bar, nightlife, or swimming recommendation leaks into default content.
- [ ] Every public place link has been tested on a phone.
- [ ] Volatile details show a review date or are delegated to Maps.

### Mobile and interaction

- [ ] Useful at `320px`, `375px`, and `430px` widths.
- [ ] No horizontal page scrolling.
- [ ] Primary choice and Maps link are reachable one-handed.
- [ ] Controls remain at least 44px in both dimensions.
- [ ] Filters have visible and programmatic selected states.
- [ ] Empty results explain what happened and offer reset.
- [ ] JavaScript-disabled view remains useful.

### Accessibility and quality

- [ ] Keyboard-only operation works.
- [ ] Screen-reader heading order and filter semantics are coherent.
- [ ] Result changes are announced without interrupting.
- [ ] 200% browser zoom works.
- [ ] Contrast passes WCAG AA.
- [ ] No meaning depends on color or icons.
- [ ] No decorative imagery, unnecessary animation, tracking, or broken links.

## Deferred decisions

- Exact Markdown parser or generation approach.
- Whether `conditional` entries appear in the default page or only after filtering.
- Whether a tested offline snapshot is worth adding after the trip begins.
- Whether neighborhood route URLs remain reliable enough for publication.
- Whether the complete archive should be public or repository-only.
