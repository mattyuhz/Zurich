# Zürich Field Guide — Microsite Design

> Design and interaction specification for the Zürich Field Guide.
>
> The microsite is a thin, mobile-first presentation layer over `zurich-guide.md`.
> It should help answer "what should I do right now?" with as little cognitive
> overhead as possible.

**Status:** Living design spec  
**Content source:** `zurich-guide.md`  
**Primary device:** Phone  
**Secondary device:** Desktop  
**Hosting target:** GitHub Pages

---

# 1. Product Principle

The site is a **field guide, not a travel website**.

It should feel:

- immediate
- compact
- calm
- utilitarian
- opinionated
- information-dense
- easy to scan
- deliberately simple

It should not feel:

- editorial
- promotional
- luxurious
- touristy
- image-driven
- app-like for the sake of being app-like

The content itself is the interface.

---

# 2. Primary Use Case

The primary scenario is:

> Standing somewhere unfamiliar in Zürich, holding a phone, possibly tired,
> hungry or jet-lagged, and needing a good next decision quickly.

The site should answer that in **~30 seconds or less**.

---

# 3. Design Direction

## Palette

Only:

- **Background:** black
- **Primary text:** white
- **Secondary information:** white with reduced opacity if needed
- **Dividers:** subtle white/gray

Avoid introducing a decorative color system.

Priority should be communicated through:

- symbols
- placement
- labels
- hierarchy

rather than red/yellow/green colors.

---

# 4. Typography

## Goal

Extremely restrained.

Use:

**1 typeface**  
**1 weight**  
**1–2 sizes**

No elaborate type scale.

---

## Recommended approach

### Primary

`16px`

Used for:

- body
- labels
- buttons
- navigation
- table content
- metadata
- place names

### Large

`24–28px`

Used sparingly for:

- page title
- major section headings

Potentially only two sizes across the entire website.

---

## Weight

One weight.

Recommended:

`400 / Regular`

Avoid relying on bold for hierarchy.

Use:

- spacing
- capitalization
- rules
- grid position
- size

instead.

---

## Typeface

Start with the system sans-serif stack.

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

Reasons:

- fast
- no font download
- excellent mobile rendering
- Swiss/modern character without cosplay
- durable
- simple

Do not introduce a custom webfont unless there is a strong reason later.

---

# 5. Swiss Design Influence

The site can quietly reference Swiss graphic design through:

- grid
- typography
- asymmetry
- disciplined spacing
- clarity
- reduction
- strong information hierarchy

Do **not** turn it into a Swiss Style costume.

Avoid:

- giant Helvetica for novelty
- red squares everywhere
- decorative grid lines
- faux 1960s poster styling
- excessive typographic experimentation

The influence should be structural.

---

# 6. Layout

## Mobile

Single primary column.

Content width:

`100%`

with approximately:

`16px`

horizontal page padding.

---

## Desktop

Do not simply stretch content across a giant screen.

Use a constrained content width or multi-column information grid.

Suggested maximum:

`1200px`

Desktop can expose more cards per row while preserving the same content structure.

---

# 7. Grid

Use CSS Grid for structured information.

Potential patterns:

### Two-column mobile grid

Useful for major decision buttons:

```text
┌──────────────────┬──────────────────┐
│ HUNGRY           │ COFFEE           │
├──────────────────┼──────────────────┤
│ 1 HOUR           │ 2–3 HOURS        │
├──────────────────┼──────────────────┤
│ RAINING          │ NEAR WORK        │
└──────────────────┴──────────────────┘
```

### Desktop

Could expand naturally to 3–4 columns.

---

# 8. Borders

Thin rules can do most structural work.

Suggested:

```css
border: 1px solid rgba(255,255,255,.25);
```

Use for:

- cards
- grid cells
- tables
- section separation

Avoid:

- shadows
- gradients
- floating surfaces
- glassmorphism
- excessive rounded cards

---

# 9. Corners

Prefer:

`0px`

or extremely small radius.

This should feel structured rather than bubbly.

---

# 10. Icons

Use sparingly.

Emoji may actually work well because they:

- require no icon library
- are recognizable
- add scanning anchors

Examples:

`🍴 EAT`

`☕ COFFEE`

`🎨 DESIGN`

`🛍 SHOP`

`🚶 WALK`

`🥾 OUTSIDE`

`📍 MAPS`

Do not decorate every metadata field with an icon.

---

# 11. Homepage

The homepage should immediately expose decisions.

Potential structure:

```text
ZÜRICH
FIELD GUIDE

AUG 2026

────────────────────────

RIGHT NOW

┌────────────────┬────────────────┐
│ HUNGRY         │ COFFEE         │
├────────────────┼────────────────┤
│ 1 HOUR         │ 2–3 HOURS      │
├────────────────┼────────────────┤
│ RAINING        │ NEAR WORK      │
├────────────────┼────────────────┤
│ WANT TO WALK   │ DESIGN         │
└────────────────┴────────────────┘

────────────────────────

DON'T LEAVE WITHOUT

01  ZÜRCHER GESCHNETZELTES
    Zürich's namesake dish.
    EAT → classic version with rösti

02  WIEDIKERLI
    Hyperlocal Wiedikon sausage.
    EAT → original

03  MAME
    Zürich's serious specialty-coffee stop.

04  MUSEUM FÜR GESTALTUNG
    Swiss design + visual communication.

05  PAVILLON LE CORBUSIER
    Le Corbusier's final completed building.

────────────────────────

EXPLORE

EAT
COFFEE
DESIGN
SHOP
WALK
OUTSIDE
```

No hero image.

No giant decorative masthead.

Get to useful information immediately.

---

# 12. Navigation

Prefer persistent simple navigation over a hamburger menu.

Potential mobile bottom navigation:

```text
START   EAT   COFFEE   DESIGN   MORE
```

However, this may already be unnecessary.

Alternative:

Use a simple sticky top row:

```text
START  EAT  COFFEE  DESIGN  SHOP  WALK  OUTSIDE
```

horizontally scrollable on mobile.

### Preference

Start with the **scrollable top navigation**.

Avoid implementing bottom navigation unless testing shows a need.

---

# 13. Right Now

This is potentially the site's most useful feature.

Buttons should represent actual traveler states rather than website taxonomy.

```text
HUNGRY
COFFEE
30 MIN
1 HOUR
2–3 HOURS
RAINING
NEAR WORK
WANT TO WANDER
```

Tapping one should reveal a **very small recommendation set**.

Not 20 results.

Target:

**3–6 options.**

---

# 14. Place Cards

Cards should be dense.

Example:

```text
──────────────────────────────

★ MUST
WIEDIKERLI

FOOD · WIEDIKON · $ · 15 MIN

Zürich's hyperlocal neighborhood
sausage, created by a Wiedikon
butcher in the 1990s.

GET
Original Wiedikerli

BEST FOR
Quick lunch while exploring Kreis 3.

[ OPEN IN GOOGLE MAPS ↗ ]

──────────────────────────────
```

---

# 15. Card Hierarchy

Each card should answer in this order:

1. **Priority**
2. **Name**
3. **Metadata**
4. **Why**
5. **What to do/order**
6. **Maps**

Optional:

7. short context/fun fact

Do not display every database field.

---

# 16. Priority

Use only three public levels.

## ★ MUST

Worth making a meaningful effort.

## + WORTH IT

Strong recommendation.

## · NEARBY

Good when convenient.

No numeric scores.

No 8.7/10.

No five-star rating system.

---

# 17. Metadata

Keep compact.

Example:

```text
FOOD · WIEDIKON · $ · 15 MIN
```

or:

```text
DESIGN · ZÜRICH WEST · $$ · 1–2 HR · RAIN OK
```

Do not display metadata that doesn't help make a decision.

---

# 18. Google Maps

Every physical destination should have:

```text
OPEN IN GOOGLE MAPS ↗
```

Use standard Google Maps URLs.

No Maps API.

No API key.

No embedded Google map unless a compelling need emerges.

---

# 19. Maps Behavior

On a phone:

Google Maps link should hand navigation off to Google Maps / browser.

The guide does not need to know:

- GPS position
- traffic
- transit schedules
- live business hours

Google handles those better.

---

# 20. Walking Routes

Neighborhood modules may have:

```text
OPEN ROUTE IN MAPS ↗
```

Example:

```text
ZÜRICH WEST
2–3 HOURS

MUSEUM FÜR GESTALTUNG
↓
MAME
↓
VIADUKT
↓
FREITAG
```

Where possible, the Maps button can open a route containing the relevant stops.

---

# 21. Neighborhoods

Use a small geographic taxonomy.

```text
HB / EUROPAALLEE
OLD TOWN
KREIS 3 / WIEDIKON
KREIS 4
KREIS 5 / ZÜRICH WEST
SEEFELD / LAKE
OUTSIDE ZÜRICH
```

Avoid exposing every Kreis/neighborhood distinction.

The taxonomy exists to make decisions easier, not teach Zürich municipal geography.

---

# 22. Area Page

Example:

```text
KREIS 5
ZÜRICH WEST

Former industrial Zürich turned
design / food / creative district.

────────────────────────

IF YOU DO ONE THING

MAME → VIADUKT → FREITAG

[ OPEN ROUTE ↗ ]

────────────────────────

COFFEE

★ MAME
Serious specialty coffee.

────────────────────────

DESIGN

+ MUSEUM FÜR GESTALTUNG

+ FREITAG

────────────────────────

WANDER

JOSEFSTRASSE
VIADUKT
ZÜRICH WEST

────────────────────────
```

---

# 23. Food Page

Do not organize primarily by cuisine.

Organize around **food objectives**.

```text
EAT ZÜRICH

THE ESSENTIALS

★ ZÜRCHER GESCHNETZELTES
★ WIEDIKERLI
★ STERNEN GRILL

────────────────────────

TRY WHILE YOU'RE HERE

+ BIRCHERMÜESLI
+ LUXEMBURGERLI
+ CORDON BLEU
+ FONDUE / RACLETTE

────────────────────────

ONE GOOD DINNER

[ curated options ]

────────────────────────

SLEEPER HITS

[ only after research confirms them ]
```

This is much more useful than:

```text
Swiss
Italian
Japanese
Mexican
American
...
```

---

# 24. "Order This"

Food entries should strongly emphasize:

```text
GET
```

Examples:

```text
STERNEN GRILL

GET
St. Galler bratwurst
Gold Bürli
Sternen mustard
```

or:

```text
SPRÜNGLI

GET
Small mixed Luxemburgerli box.
Eat fresh.
```

This removes another decision when standing at the counter.

---

# 25. Coffee Page

Keep extremely curated.

Potential:

```text
COFFEE

★ MAME
Destination coffee.

★ COFFEE ADDICT
Coffee-nerd stop.

+ COLLECTIVE
Coffee + pastry.

+ MIRÓ
Serious roaster.

· BEAN BANK
Good near work.
```

The distinctions matter more than rankings.

---

# 26. Design Page

Potential:

```text
DESIGN

★ MUSEUM FÜR GESTALTUNG
Graphic / industrial / visual design.

★ PAVILLON LE CORBUSIER
Architecture.

+ FREITAG
Local product design + architecture.

+ VIADUKT
Urban reuse / retail.

+ ETH
Architecture + city context.

────────────────────────

SHOP

KEVIN IN THE WOODS
KITCHENER
[other curated stores]
```

---

# 27. Tables

Tables are encouraged when they genuinely improve scanning.

Example:

| HAVE | DO |
|---|---|
| 30 min | Coffee |
| 1 hr | Old Town mini-loop |
| 2–3 hr | Zürich West |
| Half day | Uetliberg |
| Rain | Design museum |

On narrow mobile layouts, traditional HTML tables may overflow.

For important tables:

- allow horizontal scroll, or
- convert to grid rows

Do not shrink text until it becomes difficult to read.

---

# 28. Lists

Bullets are preferred for:

- quick context
- what to order
- pairing suggestions
- practical information

Keep bullets short.

---

# 29. History / Fun Facts

Context is valuable but secondary.

Default:

**1–2 short sentences.**

Example:

```text
BIRCHERMÜESLI

Invented in Zürich by physician
Max Bircher-Benner around 1900.
```

Avoid expandable Wikipedia essays.

If deeper information is desired later, an optional:

```text
MORE +
```

could reveal it.

Do not build this initially.

---

# 30. Images

Default:

**No images.**

Reasons:

- faster
- cleaner
- less distraction
- easier maintenance
- better offline/weak-data behavior
- Maps already provides place photography
- text/grid aesthetic fits project

Potential future exception:

One highly functional image where visual identification genuinely matters.

Do not add imagery simply to make the site "look designed."

---

# 31. Animation

Default:

**None.**

Potentially allow browser-native/simple transitions for:

- expanding sections
- filter changes

No:

- page transitions
- parallax
- animated maps
- loading animations
- scroll effects
- decorative motion

---

# 32. Interaction

Use native web behaviors whenever possible.

Buttons should be obvious.

Minimum touch target:

approximately `44px`.

Avoid tiny inline links for primary actions.

---

# 33. Hover

Never depend on hover.

The primary device is touch.

Desktop hover states can be subtle enhancement only.

---

# 34. Accessibility

Minimum requirements:

- semantic HTML
- sufficient black/white contrast
- 16px minimum body text
- 44px touch targets
- visible keyboard focus
- proper heading hierarchy
- buttons are buttons
- links are links
- no information encoded only by color
- respect reduced-motion preference if motion is ever added

---

# 35. Responsive Behavior

## Mobile

Primary design target.

One column with occasional two-column decision grids.

## Tablet

2-column cards where useful.

## Desktop

Potential 2–4-column grids.

Do not change information architecture dramatically between devices.

---

# 36. Performance

The site should feel instant.

Targets:

- minimal JavaScript
- no large framework
- no webfonts initially
- no image payload initially
- no analytics initially
- no Maps SDK
- no external UI library

---

# 37. Technology

Start extremely simple.

Potential repository:

```text
zurich/
├── README.md
├── guide.md
├── microsite-design.md
├── index.html
├── styles.css
└── app.js
```

Possible later:

```text
data/
└── places.json
```

Only introduce structured data if it meaningfully improves filtering/maintenance.

---

# 38. Framework

Default:

**No React.**

Also probably no:

- Next.js
- Vue
- Svelte
- Tailwind
- component library

Plain:

- HTML
- CSS
- small amount of JavaScript

is enough.

### Reconsider only if

The interaction model becomes substantially more complex.

That is unlikely.

---

# 39. Content Architecture

`guide.md`

is the human-readable source of truth.

The website should surface a curated subset.

Do not make HTML the only location where recommendation content exists.

---

# 40. Possible Structured Content Later

If manual HTML becomes annoying, introduce something like:

```json
{
  "name": "Wiedikerli",
  "priority": "must",
  "category": "food",
  "area": "wiedikon",
  "duration": "15 min",
  "cost": "$",
  "why": "Zürich's hyperlocal neighborhood sausage.",
  "order": "Original Wiedikerli",
  "maps": "..."
}
```

But only when needed.

Do not build a content-management system.

---

# 41. Filtering

Potential filters:

## Intent

```text
EAT
COFFEE
DESIGN
SHOP
WALK
OUTSIDE
```

## Area

```text
NEAR WORK
OLD TOWN
WIEDIKON
KREIS 4
ZÜRICH WEST
SEEFELD
```

## Time

```text
30 MIN
1 HR
2–3 HR
HALF DAY
FULL DAY
```

## Situation

```text
RAIN
LOW ENERGY
GOOD WEATHER
```

---

# 42. Filter Complexity Guardrail

Do not build a complicated multi-dimensional search UI.

The user should not need to set:

> Food + Kreis 4 + $ + 45 minutes + raining + vegetarian + open now

That's Google Maps territory.

Prefer curated shortcuts.

---

# 43. Search

Do **not** build search initially.

The entire public dataset should be small enough to browse.

If the site eventually contains hundreds of items, curation has failed.

---

# 44. Open Now

Do **not** build live business-hours logic.

Use Google Maps.

Potential card text:

```text
CHECK CURRENT HOURS ↗
```

when hours are especially volatile.

---

# 45. Location / GPS

Do **not** request location permission initially.

"Near me" sounds useful but adds:

- permission friction
- implementation complexity
- privacy considerations
- geolocation logic

Use explicit area shortcuts instead.

Example:

```text
NEAR WORK
```

---

# 46. "Near Work" as a First-Class Shortcut

Because Europaallee 8 is a recurring anchor, this deserves explicit treatment.

Example:

```text
NEAR WORK

30 MIN
Bean Bank
Quick Old Town walk

1 HR
Museum für Gestaltung
Lindenhof loop

2–3 HR
MAME → Viadukt → Zürich West
```

This is more useful than GPS because the starting point is predictable.

---

# 47. Weather

Do not integrate a weather API initially.

The user already knows whether it is raining.

Use simple manual entry points:

```text
RAINING
GOOD WEATHER
```

### RAINING

Surface:

- Museum für Gestaltung
- Kunsthaus
- Swiss National Museum
- coffee
- shopping
- restaurants
- short covered/urban modules

### GOOD WEATHER

Surface:

- Old Town walking
- Seefeld
- Pavillon Le Corbusier
- lakefront
- Zürich West
- Uetliberg
- outdoor excursions

No API required.

---

# 48. Homepage Information Density

The homepage should not contain the entire guide.

Recommended sequence:

```text
ZÜRICH
FIELD GUIDE

RIGHT NOW
[decision grid]

DON'T LEAVE WITHOUT
[5–8 essentials]

EXPLORE
[categories]

AREAS
[neighborhood shortcuts]

PRACTICAL
[small utility links]
```

That is enough.

---

# 49. Sticky Header

Potential:

```text
ZÜRICH                    ☰
```

But a menu icon may not even be necessary.

Better:

```text
ZÜRICH FIELD GUIDE

START  EAT  COFFEE  DESIGN  SHOP  WALK  OUTSIDE
```

with horizontal scrolling.

### Recommendation

Start without a complex header.

---

# 50. Section Headers

Use simple structural language.

Good:

```text
EAT ZÜRICH
```

```text
RIGHT NOW
```

```text
DON'T LEAVE WITHOUT
```

```text
NEAR WORK
```

```text
OLD TOWN
```

Avoid:

```text
Discover Zürich's Culinary Treasures
```

or:

```text
Embark on an Unforgettable Journey
```

The site should never sound like tourism marketing.

---

# 51. Copy Length

## Homepage card

~10–30 words of description.

## Standard place card

~25–60 words.

## History/context

~1–2 sentences.

## Neighborhood introduction

~30–60 words.

Anything substantially longer belongs in `guide.md`.

---

# 52. Tone

Direct.

Example:

```text
MAME

Serious specialty coffee. Worth going
deliberately rather than simply using
as a nearby caffeine stop.
```

Not:

```text
Nestled in Zürich's vibrant Kreis 5,
MAME offers an unforgettable coffee
experience for discerning coffee lovers.
```

---

# 53. Data Hierarchy

For every place:

```text
PRIORITY
NAME

CATEGORY · AREA · COST · TIME

WHY

GET / DO

MAPS
```

This should remain consistent.

Consistency reduces cognitive load.

---

# 54. Example — Food Card

```text
┌─────────────────────────────────┐
│ ★ MUST                          │
│                                 │
│ WIEDIKERLI                      │
│                                 │
│ FOOD · WIEDIKON · $ · 15 MIN    │
│                                 │
│ Zürich's hyperlocal neighborhood│
│ sausage, created here in the    │
│ 1990s.                          │
│                                 │
│ GET                             │
│ Original Wiedikerli             │
│                                 │
│ OPEN IN GOOGLE MAPS ↗           │
└─────────────────────────────────┘
```

---

# 55. Example — Coffee Card

```text
┌─────────────────────────────────┐
│ ★ MUST                          │
│                                 │
│ MAME JOSEF                      │
│                                 │
│ COFFEE · KREIS 5 · $$ · 30 MIN  │
│                                 │
│ Competition-level specialty     │
│ coffee and one of the city's    │
│ strongest coffee destinations.  │
│                                 │
│ DO                              │
│ Ask what's interesting today.   │
│                                 │
│ OPEN IN GOOGLE MAPS ↗           │
└─────────────────────────────────┘
```

---

# 56. Example — Design Card

```text
┌─────────────────────────────────┐
│ ★ MUST                          │
│                                 │
│ MUSEUM FÜR GESTALTUNG           │
│                                 │
│ DESIGN · KREIS 5 · 1–2 HR       │
│ RAIN OK                         │
│                                 │
│ Switzerland's major museum for  │
│ design and visual communication.│
│                                 │
│ LOOK FOR                        │
│ Graphic design, posters, type,  │
│ industrial design.              │
│                                 │
│ OPEN IN GOOGLE MAPS ↗           │
└─────────────────────────────────┘
```

---

# 57. Example — "Nearby" Card

Nearby recommendations should visually carry less emphasis.

```text
· NEARBY

BEAN BANK

COFFEE · EUROPAALLEE · $

Good specialty-coffee fallback when
you're already around work.

OPEN IN GOOGLE MAPS ↗
```

This prevents every recommendation from screaming for attention.

---

# 58. Routes vs Places

Routes should have a different structure.

Example:

```text
ZÜRICH WEST

2–3 HR · WALK + COFFEE + DESIGN

01  MUSEUM FÜR GESTALTUNG
    ↓
02  MAME
    ↓
03  VIADUKT
    ↓
04  FREITAG

A compact introduction to contemporary
Zürich: design, coffee, adaptive reuse
and independent retail.

OPEN ROUTE IN MAPS ↗
```

---

# 59. Route Philosophy

Routes are **suggested sequences**, not schedules.

Do not specify:

```text
14:00 Museum
15:17 MAME
15:52 Viadukt
```

unless there is a genuine timed constraint.

The user should be free to:

- stop
- skip
- linger
- reverse direction
- abandon route

---

# 60. Practical Page

Keep tiny.

Potential:

```text
PRACTICAL

TRANSIT
Use SBB Mobile.
EasyRide is the low-friction option.

MONEY
CHF. Cards widely accepted.

TIPPING
No American-style 20% expectation.
Round up / modest tip.

SUNDAY
Many normal shops close.
HB / airport retail are useful exceptions.

LANGUAGE
Swiss German locally. English is easy.

WATER
Public fountains are generally potable
unless marked otherwise.
```

This should fit on roughly one mobile screen or slightly more.

---

# 61. Emergency Information

Only include verified information.

Potential future section:

```text
NEED HELP
```

But do not clutter the primary interface with emergency data unless useful.

If included:

- verify numbers
- distinguish medical / police / fire
- note European emergency number if applicable

Never guess.

---

# 62. Offline Behavior

The site should naturally degrade well because it is mostly:

- HTML
- CSS
- text
- tiny JS

### Initial version

Do not build a complicated offline/PWA system.

Browser caching may already provide some resilience.

### Future

A minimal service worker could make the core guide available offline.

Only add after basic site works.

Google Maps obviously requires connectivity for full functionality.

---

# 63. Add to Home Screen

Potentially useful later.

A simple static site can already be bookmarked.

Do not build a full PWA merely to get an icon.

If repeated usage makes it valuable, add:

- manifest
- icon
- minimal service worker

later.

---

# 64. GitHub Pages

Good hosting choice because:

- free
- simple
- static
- version controlled
- easy to update
- no backend
- durable

Potential URL:

```text
username.github.io/zurich
```

or custom domain later if desired.

No custom domain needed initially.

---

# 65. Git Workflow

Keep simple.

```text
main
```

is enough.

Do not create elaborate:

- staging branches
- release pipelines
- CI/CD
- preview infrastructure

for a personal travel guide.

Commit when meaningful changes are made.

---

# 66. README

Repository `README.md` should explain:

- what the project is
- content/source relationship
- how to update it
- how to run locally
- GitHub Pages deployment

Keep it short.

---

# 67. Content Workflow

Recommended:

```text
NEW INFORMATION
      ↓
zurich-guide.md
      ↓
evaluate / classify
      ↓
publish-worthy?
   ↙        ↘
 NO         YES
 ↓           ↓
archive    microsite
```

The website should never become the primary notebook.

---

# 68. During-Trip Update Workflow

Example discovery:

> "I went to MAME. The pourover was incredible."

Update `zurich-guide.md`:

```text
Visited: 2026-08-XX
Personal rating: ★★★★★
Note: Pourover was standout.
```

Then, if useful, tighten site copy:

```text
MAME

Best coffee experience so far.
Ask about current pourover options.
```

Firsthand experience should gradually improve the guide.

---

# 69. Editing From Phone

Because the artifact is living, consider ease of edits.

GitHub's mobile web interface is sufficient for occasional Markdown changes.

Do not optimize the entire architecture around phone editing initially.

Most changes can happen through:

- GitHub
- desktop
- ChatGPT/Codex

---

# 70. No CMS

Do not add:

- Contentful
- Sanity
- Firebase
- Supabase
- WordPress
- database

The content volume does not justify it.

Markdown + Git is enough.

---

# 71. No Accounts

No authentication.

No profiles.

No sync system.

No saved favorites backend.

This is a personal guide.

---

# 72. Favorites

Do not implement initially.

The priority system already functions as editorial favorites.

During the trip, visited/favorite status can remain in Markdown.

---

# 73. Checkboxes

Potentially useful for the private Markdown.

Probably **not** useful on the public-facing site.

Avoid turning travel into a completion checklist.

---

# 74. Visual Density

Aim for moderate-to-high information density.

The user explicitly likes:

- tables
- grids
- bullets
- glanceability

Therefore do not create enormous cards with excessive whitespace.

Example mobile spacing:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 16px;
--space-4: 24px;
--space-5: 40px;
```

Five spacing values are plenty.

---

# 75. Suggested CSS Tokens

Keep tiny.

```css
:root {
  --bg: #000;
  --fg: #fff;
  --fg-muted: rgba(255,255,255,.65);
  --line: rgba(255,255,255,.25);

  --text: 16px;
  --display: 26px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 40px;
}
```

That's nearly the entire design system.

---

# 76. Suggested Base CSS

```css
* {
  box-sizing: border-box;
}

html {
  background: var(--bg);
  color: var(--fg);
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Helvetica Neue",
    Helvetica,
    Arial,
    sans-serif;
  font-size: var(--text);
  font-weight: 400;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
}

a {
  color: inherit;
}

button {
  font: inherit;
}
```

Avoid resets/frameworks unless needed.

---

# 77. Link Style

Links should remain obvious without introducing blue.

Potential:

```text
OPEN IN GOOGLE MAPS ↗
```

with:

- underline
- border
- full-width button treatment

Primary Maps actions should be easy to tap.

---

# 78. Maps Button

Potential style:

```text
┌────────────────────────────────┐
│ OPEN IN GOOGLE MAPS ↗          │
└────────────────────────────────┘
```

Full width on mobile.

No filled white button necessary.

Border + text is enough.

---

# 79. Selected State

If filters are implemented:

Unselected:

```text
┌──────────────┐
│ COFFEE       │
└──────────────┘
```

Selected:

```text
████████████████
█ COFFEE       █
████████████████
```

Conceptually:

- selected = white background / black text
- unselected = black / white border

This is one of the few places inversion can provide strong state feedback.

---

# 80. Light Mode

Do not build initially.

The requested visual direction is explicitly:

**black background / white text.**

If later needed for bright sunlight/accessibility, reconsider.

Do not add complexity preemptively.

---

# 81. Dark Background Outdoors

Potential issue:

Black UI can be harder to see under extremely bright outdoor conditions if screen brightness is low.

Mitigation:

- true white text
- sufficient size
- no ultra-thin fonts
- strong borders
- high contrast

Do not use faint gray for important information.

---

# 82. Type Weight

One weight means hierarchy cannot rely on bold.

Use:

```text
MAME

COFFEE · KREIS 5

Serious specialty coffee.
```

Hierarchy comes from:

- size
- uppercase
- spacing
- position

This can look extremely clean.

---

# 83. Uppercase

Use uppercase selectively for:

- navigation
- metadata
- utility labels
- section labels

Example:

```text
GET
Original Wiedikerli
```

Do not uppercase paragraphs.

---

# 84. Numbers

Numbers can create useful route hierarchy.

Example:

```text
01  MUSEUM FÜR GESTALTUNG
02  MAME
03  VIADUKT
04  FREITAG
```

This aligns well with the structured aesthetic.

---

# 85. Dividers

Horizontal rules should be common but subtle.

They create hierarchy without requiring:

- cards
- shadows
- colored backgrounds
- multiple font weights

---

# 86. Card Question

We may not actually need traditional cards.

Alternative:

```text
★ MUST

WIEDIKERLI
FOOD · WIEDIKON · $ · 15 MIN

Zürich's hyperlocal sausage.

GET
Original Wiedikerli

OPEN IN GOOGLE MAPS ↗

────────────────────────────────
```

This may be better.

### Recommendation

Prefer **flat sections separated by rules** over boxed cards.

Use boxed grids primarily for interactive decision buttons.

This is cleaner and more information-dense.

---

# 87. Homepage Wireframe

```text
ZÜRICH
FIELD GUIDE                         AUG 2026

────────────────────────────────────────

RIGHT NOW

┌──────────────────┬───────────────────┐
│ HUNGRY           │ COFFEE            │
├──────────────────┼───────────────────┤
│ 1 HOUR           │ 2–3 HOURS         │
├──────────────────┼───────────────────┤
│ RAINING          │ NEAR WORK         │
├──────────────────┼───────────────────┤
│ WANDER           │ DESIGN            │
└──────────────────┴───────────────────┘

────────────────────────────────────────

DON'T LEAVE WITHOUT

01
ZÜRCHER GESCHNETZELTES
Zürich's namesake dish.
GET · Classic version + rösti

────────────────────────────────────────

02
WIEDIKERLI
Hyperlocal Wiedikon sausage.
GET · Original

────────────────────────────────────────

03
MAME
Serious specialty coffee.

────────────────────────────────────────

04
MUSEUM FÜR GESTALTUNG
Swiss design and visual communication.

────────────────────────────────────────

05
PAVILLON LE CORBUSIER
Le Corbusier's final completed building.

────────────────────────────────────────

EXPLORE

EAT        COFFEE
DESIGN     SHOP
WALK       OUTSIDE

────────────────────────────────────────

AREAS

HB / WORK
OLD TOWN
WIEDIKON
KREIS 4
ZÜRICH WEST
SEEFELD

────────────────────────────────────────

PRACTICAL
Transit · Sunday · Money · Tipping
```

---

# 88. Food Page Wireframe

```text
← ZÜRICH

EAT

────────────────────────────────────────

THE ZÜRICH LIST

★ MUST

ZÜRCHER GESCHNETZELTES
Zürich's namesake veal-and-cream dish.

GET
Classic + rösti

WHERE
[primary restaurant]

MAPS ↗

────────────────────────────────────────

★ MUST

WIEDIKERLI
Wiedikon's local sausage, created in
the neighborhood in the 1990s.

GET
Original

MAPS ↗

────────────────────────────────────────

★ MUST

STERNEN GRILL
An iconic Zürich sausage stop.

GET
St. Galler bratwurst
Gold Bürli
Sternen mustard

MAPS ↗

────────────────────────────────────────

+ TRY

BIRCHERMÜESLI
Invented in Zürich around 1900.

────────────────────────────────────────

+ TRY

LUXEMBURGERLI
Tiny Sprüngli macarons with a very
Zürich history despite the name.

MAPS ↗

────────────────────────────────────────

ONE PROPER DINNER

[2–4 carefully selected options]

────────────────────────────────────────

SWISS, NOT SPECIFICALLY ZÜRICH

FONDUE / RACLETTE
Do this once during Switzerland.

────────────────────────────────────────
```

---

# 89. Right-Now Result Wireframe

Example after tapping:

`HUNGRY`

```text
← RIGHT NOW

HUNGRY

────────────────────────────────────────

QUICK

★ STERNEN GRILL
Bratwurst + Bürli + mustard.
OLD TOWN / BELLEVUE
MAPS ↗

────────────────────────────────────────

LOCAL

★ WIEDIKERLI
Original Wiedikerli.
WIEDIKON
MAPS ↗

────────────────────────────────────────

PROPER MEAL

★ ZÜRCHER GESCHNETZELTES
Classic + rösti
MAPS ↗

────────────────────────────────────────

COMFORT FOOD

+ GERTRUDHOF
Cordon bleu.
WIEDIKON
BOOK / MAPS ↗

────────────────────────────────────────

SWEET

+ SPRÜNGLI
Small mixed Luxemburgerli box.
PARADEPLATZ
MAPS ↗
```

The page should stop there.

Five good answers are more useful than twenty acceptable ones.

---

# 90. "Near Work" Wireframe

```text
← RIGHT NOW

NEAR WORK
EUROPAALLEE

────────────────────────────────────────

30 MIN

COFFEE
· BEAN BANK
Good nearby specialty coffee.
MAPS ↗

────────────────────────────────────────

1 HR

DESIGN
★ MUSEUM FÜR GESTALTUNG
Swiss design + visual communication.
MAPS ↗

────────────────────────────────────────

1 HR

WALK
HB → BAHNHOFSTRASSE → LINDENHOF
Quick historic-Zürich loop.
ROUTE ↗

────────────────────────────────────────

2–3 HR

COFFEE + DESIGN + WALK
MAME → VIADUKT → ZÜRICH WEST

A compact contemporary-Zürich module.
ROUTE ↗
```

---

# 91. Rain Wireframe

```text
← RIGHT NOW

RAINING

────────────────────────────────────────

BEST ANSWER

★ MUSEUM FÜR GESTALTUNG
1–2 HR · DESIGN · INDOOR
MAPS ↗

────────────────────────────────────────

ART

+ KUNSTHAUS
1–3 HR · INDOOR
MAPS ↗

────────────────────────────────────────

HISTORY

+ SWISS NATIONAL MUSEUM
1–2 HR · NEXT TO HB
MAPS ↗

────────────────────────────────────────

LOW ENERGY

MAME
→ shops
→ good dinner

────────────────────────────────────────

DON'T OVERREACT TO RAIN

Short Old Town walks, coffee, food and
shopping still work perfectly well.
```

---

# 92. Mobile Interaction Model

The ideal interaction depth is:

```text
HOME
 ↓
ONE TAP
 ↓
3–6 ANSWERS
 ↓
MAPS
```

Example:

```text
HOME
→ HUNGRY
→ WIEDIKERLI
→ GOOGLE MAPS
```

Avoid:

```text
HOME
→ FOOD
→ SWISS
→ CASUAL
→ KREIS 3
→ SAUSAGE
→ WIEDIKERLI
→ DETAILS
→ DIRECTIONS
```

That is unnecessary navigation.

---

# 93. Page Depth

Target:

**maximum ~2 internal levels before leaving for Maps.**

Primary pages:

```text
/
 /eat
 /coffee
 /design
 /shop
 /walk
 /outside
 /practical
```

Potential contextual pages:

```text
/now/hungry
/now/rain
/now/near-work
/area/old-town
/area/zurich-west
```

Individual place pages are probably unnecessary.

---

# 94. Individual Place Pages

Do not build initially.

A place card already contains:

- why
- what to do
- context
- Maps

If more detail is needed, Google Maps or `guide.md` can provide it.

Avoid creating dozens of nearly empty URLs.

---

# 95. URL Structure

Keep human-readable.

Good:

```text
/eat
/coffee
/design
/area/zurich-west
```

Avoid:

```text
/category?id=4&filter=2
```

For a tiny static site, anchors may even be sufficient:

```text
/#eat
/#coffee
/#design
```

### Recommendation

Start as **one page with sections and filtering**.

Only introduce multiple pages if the single document becomes unwieldy.

---

# 96. One-Page Architecture

This may be the simplest implementation.

```text
INDEX.HTML

HEADER
RIGHT NOW
ESSENTIALS
EAT
COFFEE
DESIGN
SHOP
WALK
OUTSIDE
AREAS
PRACTICAL
```

JavaScript can:

- hide/show categories
- filter cards
- jump to sections

Advantages:

- extremely fast
- trivial GitHub Pages deployment
- easy browser caching
- no routing
- no build process
- easier maintenance

This should be the default implementation.

---

# 97. Progressive Enhancement

The site should remain useful if JavaScript fails.

Without JavaScript:

- all content remains visible
- anchor navigation works
- Maps links work

With JavaScript:

- filters work
- Right Now shortcuts work
- irrelevant content can be hidden

This is preferable to requiring JavaScript to render the guide.

---

# 98. HTML Philosophy

Use semantic HTML.

Potential:

```html
<header>
<nav>
<main>
<section>
<article>
<table>
<footer>
```

Do not create:

```html
<div class="container">
  <div class="wrapper">
    <div class="card">
```

unless structurally necessary.

---

# 99. JavaScript Scope

Potentially only responsible for:

1. filtering by category
2. filtering by area
3. Right Now shortcuts
4. optionally storing the last selected view

Likely achievable in well under a few hundred lines.

If `app.js` starts becoming a substantial application, reassess.

---

# 100. State Persistence

Optional.

Could use:

```text
localStorage
```

for:

- last selected section
- maybe visited places later

Not necessary for v1.

Do not build account-based persistence.

---

# 101. Visited State

Potential future enhancement:

```text
○ MAME
```

tap →

```text
✓ MAME
```

Could be stored locally.

### Recommendation

Do not implement initially.

Travel should not become a checklist.

Firsthand notes belong in `guide.md`.

---

# 102. External Links

Open Maps links in a way that works naturally on mobile.

Potential HTML:

```html
<a
  href="GOOGLE_MAPS_URL"
  target="_blank"
  rel="noopener"
>
  OPEN IN GOOGLE MAPS ↗
</a>
```

Test on:

- iPhone Safari
- Android Chrome
- desktop

Do not assume identical Maps-app behavior everywhere.

---

# 103. Google Maps URL Format

Prefer durable Google Maps search/place URLs rather than coordinates alone.

Potential pattern:

```text
https://www.google.com/maps/search/?api=1&query=PLACE
```

or a verified place URL.

For directions:

```text
https://www.google.com/maps/dir/?api=1&destination=...
```

Potential waypoint routes can be added where useful.

### Important

Verify every generated Maps link before trip use.

---

# 104. Hours

Do not hard-code routine hours into prominent site content.

Why:

- hours change
- holidays happen
- temporary closures happen

Instead:

```text
CHECK HOURS / MAPS ↗
```

### Exception

Surface operational constraints when they materially affect planning:

```text
CLOSED SUNDAY
```

```text
BOOK AHEAD
```

```text
SEASONAL
```

These are decision-critical.

---

# 105. Last Verified

Potential small metadata in source, not necessarily visible by default:

```text
VERIFIED 2026-08-13
```

Useful during maintenance.

Could appear on site only if information is particularly volatile.

---

# 106. Reservations

If a destination should be booked:

```text
BOOK AHEAD
```

should appear prominently near its Maps/action area.

Potential future second button:

```text
RESERVE ↗
```

Only if a stable official reservation URL is available.

Do not make users hunt for booking information.

---

# 107. Action Hierarchy

A card should generally have one primary action:

```text
OPEN IN GOOGLE MAPS ↗
```

Possible secondary action only when valuable:

```text
RESERVE ↗
```

Avoid:

```text
WEBSITE
MENU
INSTAGRAM
YELP
TRIPADVISOR
MAPS
CALL
SHARE
```

Too much choice.

---

# 108. Content Freshness vs Durability

The microsite should emphasize durable editorial information.

Durable:

- why MAME matters
- what Wiedikerli is
- what to order at Sternen
- why Le Corbusier pavilion matters

Volatile:

- Tuesday closing time
- current star rating
- today's tram disruption

Let external services own volatile data.

---

# 109. Ratings

Do not display Google star ratings.

Reasons:

- noisy
- constantly changing
- not aligned with personal curation
- creates false precision
- duplicates Maps

The editorial priority system is enough.

---

# 110. Review Counts

Do not display.

No value for this guide.

---

# 111. User Reviews

Do not reproduce.

The guide itself is the editorial layer.

---

# 112. Price

Use approximate category only where useful:

```text
$
$$
$$$
$$$$
```

Potential Zürich-relative interpretation:

```text
$     snack / inexpensive
$$    casual meal
$$$   proper dinner
$$$$  expensive destination
```

No need to publish the scale unless confusion arises.

---

# 113. Swiss Franc Display

For specific iconic items, a current approximate price may occasionally be useful.

Example:

```text
~CHF 10
```

But avoid maintaining prices for every place.

---

# 114. Accessibility vs Minimalism

Minimalism cannot justify:

- tiny text
- low contrast
- ambiguous interactions
- microscopic tap targets
- hidden navigation

Utility comes first.

---

# 115. Text Wrapping

Avoid overly wide lines.

Desktop body text should generally stay around:

`60–75 characters`

where practical.

Grid cards can naturally be narrower.

---

# 116. Desktop Experience

Desktop should feel like a **reference dashboard**, not an enlarged phone.

Potential:

```text
┌─────────────────────────────────────────────┐
│ ZÜRICH FIELD GUIDE                         │
├──────────────┬──────────────┬───────────────┤
│ RIGHT NOW    │ ESSENTIALS   │ AREAS         │
├──────────────┴──────────────┴───────────────┤
│ EAT                                         │
│ [item]        [item]        [item]          │
├─────────────────────────────────────────────┤
│ COFFEE                                      │
│ [item]        [item]        [item]          │
└─────────────────────────────────────────────┘
```

Still simple.

---

# 117. Desktop Tables

Desktop is a good place to expose compact comparison tables.

Example:

| PLACE | WHY | AREA | TIME |
|---|---|---|---|
| MAME | Destination coffee | Kreis 5 | 30m |
| Collective | Pastry + coffee | Wiedikon | 30m |
| Bean Bank | Near work | Europaallee | 15m |

Mobile can transform these into stacked rows.

---

# 118. Print

Not a primary goal.

However, semantic HTML and simple black/white styling should make a print stylesheet easy later.

Potential print mode:

- white background
- black text
- hide interactive controls
- show raw URLs only if useful

Do not build for v1.

---

# 119. Sharing

No social-sharing UI.

The URL itself is enough.

---

# 120. Analytics

None initially.

No need to track personal travel-guide behavior.

---

# 121. Cookies

None.

---

# 122. Privacy

No:

- account
- tracking
- GPS
- analytics
- advertising
- third-party scripts beyond links

This also keeps implementation extremely clean.

---

# 123. GitHub Repository Philosophy

The repo itself should remain understandable at a glance.

Potential:

```text
zurich-guide/
│
├── README.md
├── guide.md
├── microsite-design.md
│
├── index.html
├── styles.css
└── app.js
```

That is enough for v1.

---

# 124. Possible Future Data Separation

Only after content stabilizes:

```text
zurich-guide/
│
├── content/
│   ├── places.json
│   ├── routes.json
│   └── practical.json
│
├── docs/
│   ├── guide.md
│   └── microsite-design.md
│
├── index.html
├── styles.css
└── app.js
```

Do not start here unless manual content duplication becomes a real problem.

---

# 125. Markdown Rendering Question

There are two viable approaches.

## A. Manual curated HTML

`guide.md`
→ human source

`index.html`
→ manually curated publish subset

### Pros

- simplest runtime
- total layout control
- no Markdown parser
- site can be much smaller than source document

### Cons

- content duplicated

---

## B. Structured Markdown → generated site

### Pros

- one content source
- less duplication

### Cons

- requires parsing/build logic
- harder to distinguish private archive from published material
- Markdown structure starts serving software instead of humans

### Recommendation

For v1:

**Manual curated HTML.**

The site is small enough that duplication is acceptable.

`guide.md` remains the research brain.

The microsite remains the intentionally reduced field guide.

Do not compromise the Markdown knowledge base just to make it machine-readable.

---

# 126. Why Manual Curation Is Valuable

Publishing should require an explicit decision.

A new entry in `guide.md` should **not automatically appear on the website**.

That protects the site from recommendation creep.

The workflow becomes:

```text
Interesting place discovered
        ↓
Add to guide.md
        ↓
Evaluate
        ↓
Worth publishing?
        ↓
Explicitly add to site
```

This friction is useful.

---

# 127. V1 Feature Set

Build only:

- black/white visual system
- responsive layout
- homepage
- Right Now shortcuts
- curated food section
- curated coffee section
- design section
- shopping section
- walks/neighborhoods
- outside section
- practical section
- Google Maps links
- basic category filtering/jump navigation

Nothing else.

---

# 128. Explicitly NOT V1

No:

- GPS
- live weather
- live hours
- Maps API
- account
- favorites
- reviews
- comments
- database
- CMS
- custom backend
- search
- PWA
- offline service worker
- notifications
- itinerary generator
- AI chatbot
- image gallery
- animations
- custom font
- dark/light toggle
- social sharing
- analytics

Any one of these can be reconsidered if an actual need emerges.

---

# 129. Build Order

## Phase 1 — Content

Finish:

- `guide.md`
- recommendation audit
- critical research
- final publish shortlist

## Phase 2 — Static Skeleton

Build:

- `index.html`
- `styles.css`

No JavaScript initially.

Test actual information hierarchy.

## Phase 3 — Maps

Add and verify every Maps link.

## Phase 4 — Small Interactions

Add `app.js` only for interactions that demonstrably improve mobile use.

## Phase 5 — GitHub Pages

Publish.

## Phase 6 — Use It

Actual Zürich use becomes usability testing.

Fix what is annoying.

---

# 130. V1 Design Acceptance Criteria

Before calling the site ready:

### Visual

- [ ] Black background
- [ ] White text
- [ ] One typeface
- [ ] One weight
- [ ] No more than two primary type sizes
- [ ] No decorative color system
- [ ] No unnecessary imagery
- [ ] No shadows/gradients
- [ ] Strong grid/rule structure

### Mobile

- [ ] Comfortable at phone width
- [ ] Primary actions ≥ ~44px
- [ ] No accidental horizontal overflow
- [ ] Tables remain usable
- [ ] Maps links easy to tap
- [ ] Important text readable outdoors

### Information

- [ ] Homepage answers "what now?"
- [ ] ≤ ~12 homepage essentials
- [ ] Food emphasizes dishes over restaurant taxonomy
- [ ] Coffee is heavily curated
- [ ] Design is first-class
- [ ] Neighborhoods reduce cross-city travel
- [ ] Deprioritized recommendations remain off site
- [ ] History/context remains concise

### Technical

- [ ] Static GitHub Pages compatible
- [ ] No backend
- [ ] No API keys
- [ ] No required JavaScript for core content
- [ ] Fast load
- [ ] Maps links tested
- [ ] Works on mobile Safari
- [ ] Works on Chrome

---

# 131. V1 Content Acceptance Criteria

Every published recommendation must answer:

- [ ] Why is this here?
- [ ] Is it worth traveling for or only nearby?
- [ ] What should I order/do?
- [ ] What area is it in?
- [ ] Roughly how much time does it take?
- [ ] Does it have a working Maps link?

If an entry cannot answer **why it belongs**, remove it.

---

# 132. Real-World Usability Test

Imagine:

> It's 17:40.
> Work just ended.
> You're tired.
> You're standing at Europaallee.
> You don't know Zürich well.
> You have maybe two hours.
> You don't want to research.

Within seconds the site should produce:

```text
NEAR WORK
2–3 HOURS

01 MAME
02 VIADUKT
03 ZÜRICH WEST

or

01 OLD TOWN
02 STERNEN GRILL
03 LAKE

OPEN ROUTE ↗
```

If instead it produces 37 nearby attractions, the product has failed.

---

# 133. Another Usability Test

Imagine:

> It's raining heavily and you're hungry.

The site should quickly produce:

```text
RAINING + HUNGRY

GERTRUDHOF
Swiss comfort food.

ZUNFTHAUS ZUR WAAG
Proper Zürich meal.

MUSEUM FÜR GESTALTUNG
Then MAME / dinner nearby.
```

No itinerary-building required.

---

# 134. Another Usability Test

Imagine:

> You just ate and have 45 minutes before something else.

The site should not recommend:

- Rigi
- a three-hour museum
- destination dinner
- cross-city transit

It should expose:

- nearby walk
- coffee
- small sight
- shop
- quick architecture

Time context matters.

---

# 135. Design North Star

The interface should feel closer to:

**a beautifully structured personal field manual**

than:

**a tourism website.**

The visual system should disappear quickly enough that the information becomes the experience.

---

# 136. Product North Star

The microsite is successful when it makes the traveler feel:

> "I don't need to research this. I know what my good options are."

The objective is not maximizing information.

It is maximizing **confidence per glance**.

---

# 137. Relationship Between the Two Artifacts

## `zurich-guide.md`

The brain.

Contains:

- research
- source recommendations
- personal preferences
- reasoning
- rejected options
- history
- practical knowledge
- uncertainties
- TODOs
- firsthand notes
- future discoveries

It can be long.

---

## Microsite

The field tool.

Contains:

- best options
- immediate decisions
- short context
- what to order/do
- neighborhood
- Maps link

It must remain small.

---

## `microsite-design.md`

The rules.

Contains:

- visual system
- interaction principles
- information architecture
- implementation constraints
- publishing rules

It prevents the microsite from gradually becoming bloated.

---

# 138. Content Decision Rule

Before publishing anything from `zurich-guide.md`, ask:

### 1. Is it good?

If no → don't publish.

### 2. Is it relevant to this traveler?

If no → don't publish.

### 3. Is it distinctive enough to use limited Zürich time?

If no → probably don't publish.

### 4. Does it help make a decision?

If no → source document only.

### 5. Is something already published that serves the same purpose better?

If yes → keep the stronger option.

This should aggressively constrain growth.

---

# 139. Recommendation Budget

Treat interface space as scarce.

Suggested maximums for V1:

| Surface | Maximum |
|---|---:|
| Homepage essentials | 8–12 |
| Hungry results | 5–6 |
| Coffee | 5–8 |
| Zürich food objectives | 8–12 |
| Proper dinner shortlist | 4–6 |
| Design | 6–10 |
| Shopping | 8–12 |
| Neighborhoods | 5–7 |
| Individual neighborhood highlights | 5–10 |
| Rain recommendations | 5–8 |
| Outside Zürich | 6–10 |

These are ceilings, not targets.

Fewer excellent recommendations are preferable.

---

# 140. Recommendation Replacement

When a better option is discovered:

Do not automatically add it.

Ask whether it should **replace** something.

Example:

```text
Coffee list:

MAME
Coffee Addict
Collective
Miró
Bean Bank
```

If Lamassu proves exceptional:

Possible action:

```text
MAME
Coffee Addict
Lamassu
Collective
Bean Bank
```

rather than simply expanding to six.

The site should improve through substitution.

---

# 141. Destination vs Nearby

This distinction should influence almost every recommendation.

## DESTINATION

Worth deliberately traveling to.

Examples:

```text
★ MAME
★ Museum für Gestaltung
★ Pavillon Le Corbusier
```

## NEARBY

Good answer when already in the area.

Example:

```text
· Bean Bank
```

### Why

A recommendation without geographic opportunity cost is incomplete.

---

# 142. Homepage Essentials Standard

Something belongs under:

```text
DON'T LEAVE WITHOUT
```

only if missing it would meaningfully weaken the Zürich experience.

This is deliberately stricter than:

> "I liked this."

Potential V1:

```text
01 ZÜRCHER GESCHNETZELTES
02 WIEDIKERLI
03 MAME
04 MUSEUM FÜR GESTALTUNG
05 PAVILLON LE CORBUSIER
06 OLD TOWN
07 ZÜRICH WEST
```

Sternen Grill may appear under food/right-now rather than consuming another homepage slot.

---

# 143. Context Standard

The user likes history and fun facts.

Therefore context should not be stripped so aggressively that the guide becomes sterile.

The ideal card contains:

**UTILITY**
+
**ONE MEMORABLE IDEA**

Example:

```text
WIEDIKERLI

GET
Original Wiedikerli

Zürich's neighborhood sausage, created
by a Wiedikon butcher in the 1990s.
```

The second sentence gives the experience warmth.

---

# 144. Context Quality

Prefer facts that change how a place is perceived.

Good:

> Birchermüesli was invented in Zürich.

Good:

> Le Corbusier's Zürich pavilion was his final completed building.

Good:

> Freitag began in Zürich with bags cut from used truck tarps.

Good:

> Lindenhof sits over layers of Zürich history reaching back to Roman Turicum.

Weak:

> Zürich is Switzerland's largest city.

Weak facts don't earn interface space merely because they're true.

---

# 145. Avoid Trivia Overload

Do not add a:

```text
FUN FACT
```

box to every recommendation.

That turns context into a gimmick.

Instead, integrate one worthwhile detail naturally into the description.

---

# 146. Personalization Without UI Complexity

The site is already personalized through editorial choices.

There is no need for:

- preference settings
- onboarding questionnaire
- recommendation algorithm

The absence of:

- bars
- nightlife
- swimming
- generic ramen
- generic burgers

is itself personalization.

---

# 147. No Generic Tourism Taxonomy

Avoid navigation like:

```text
ATTRACTIONS
RESTAURANTS
HOTELS
NIGHTLIFE
SHOPPING
THINGS TO DO
```

That would recreate Google/Tripadvisor.

Instead:

```text
EAT
COFFEE
DESIGN
SHOP
WALK
OUTSIDE
```

This reflects actual interests.

---

# 148. "Outside" Definition

`OUTSIDE` means:

- local hiking
- Uetliberg
- nearby nature
- worthwhile excursions
- mountain access

It does not mean:

- outdoor restaurant seating
- swimming
- parks for their own sake

Potential subgroups:

```text
2–3 HR
HALF DAY
FULL DAY
ALPINE
```

---

# 149. Mountain Scope

Do not put detailed:

- Breithorn planning
- Hörnlihütte logistics
- mountaineering equipment
- glacier travel

inside the Zürich microsite.

The site can link conceptually to:

```text
ZERMATT / MOUNTAINS
```

later if another guide exists.

Keep Zürich focused.

---

# 150. Potential Multi-City Future

If the system proves useful:

```text
/
├── zurich/
├── zermatt/
├── tokyo/
└── ...
```

But do not architect this now.

The first site can simply be Zürich.

Avoid premature abstraction.

---

# 151. GitHub Pages Path

Potential structure:

```text
https://USERNAME.github.io/zurich-guide/
```

The exact repository name is not important.

Short is preferable.

Possible names:

```text
zurich
zurich-guide
zh-guide
```

Recommendation:

`zurich-guide`

Clear beats clever.

---

# 152. Site Title

Preferred:

```text
ZÜRICH
FIELD GUIDE
```

Alternative:

```text
ZÜRICH
```

Avoid branding it like a startup.

No logo needed.

---

# 153. Browser Title

```html
<title>Zürich Field Guide</title>
```

Enough.

---

# 154. Favicon

Optional.

If added:

simple:

```text
ZH
```

or another minimal mark.

Do not spend meaningful project time designing a logo.

---

# 155. Footer

Keep tiny.

Potential:

```text
ZÜRICH FIELD GUIDE
LAST UPDATED 13 AUG 2026

SOURCE → GUIDE.MD
```

If repository is private/unpublished, source link may be omitted.

No elaborate footer navigation.

---

# 156. Last Updated

Useful because the content contains businesses.

Display:

```text
UPDATED 13 AUG 2026
```

somewhere unobtrusive.

This creates confidence that recommendations aren't from 2018.

---

# 157. Source Visibility

The full `guide.md` contains:

- personal context
- rejected recommendations
- trip reasoning

If the GitHub repository is public, consider whether all of that should also be public.

### Important architecture question

A public GitHub Pages repository normally exposes repository content.

Potential options:

## Option A — Public everything

Simplest.

Fine if personal context is intentionally written at a comfortable public level.

## Option B — Public microsite, private research repo

More complexity.

Probably unnecessary unless privacy becomes a concern.

## Option C — Sanitize `guide.md`

Keep travel-relevant preferences without unnecessary personal information.

### Recommendation

Before publishing publicly, audit `guide.md`.

The source file should contain useful preference context but **not unnecessary private information**.

---

# 158. Privacy Rule for Source Markdown

Useful:

```text
Does not drink alcohol.
Not interested in nightlife.
Interested in design, specialty coffee and local food.
```

Unnecessary:

- employer-sensitive information
- detailed personal schedule
- private financial information
- identifying travel documents
- reservation confirmation numbers
- hotel room numbers
- flight confirmation codes

Do not put secrets in a public GitHub repository.

---

# 159. Work Location Privacy

`Europaallee 8` is useful for the private guide.

Before making the repository public, decide whether to expose:

```text
NEAR WORK
```

with an exact work address.

Potential public-safe alternative:

```text
NEAR EUROPAALLEE / HB
```

The functionality remains nearly identical.

---

# 160. Repository Visibility Decision

Before GitHub Pages deployment:

- [ ] Decide public vs private source
- [ ] Audit personal context
- [ ] Remove unnecessary work-specific details
- [ ] Remove booking data
- [ ] Remove anything sensitive

Do this before first public push, not afterward.

---

# 161. Accessibility Labeling

Emoji cannot be the only category indicator.

Good:

```text
☕ COFFEE
```

Not:

```text
☕
```

The text remains primary.

---

# 162. German Characters

The site must correctly support:

- Zürich
- Zürcher
- Geschnetzeltes
- Rösti
- Zürichhorn
- Zürich West
- Museum für Gestaltung

Use UTF-8.

```html
<meta charset="utf-8">
```

Do not transliterate unnecessarily.

---

# 163. Viewport

Required:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1"
>
```

Mobile is the primary experience.

---

# 164. Theme Color

Optional:

```html
<meta name="theme-color" content="#000000">
```

This can make browser chrome fit the site.

---

# 165. Selection

Default browser text selection is fine.

No need to customize.

---

# 166. Scroll Position

If using category filters, consider preserving scroll position naturally.

Do not introduce fancy scroll behavior.

Anchor links:

```text
#eat
#coffee
#design
```

are sufficient.

---

# 167. Smooth Scrolling

Optional.

If used:

```css
html {
  scroll-behavior: smooth;
}
```

Respect reduced motion if this becomes more elaborate.

Not essential.

---

# 168. Back Behavior

Browser back must behave predictably.

Avoid JavaScript navigation that breaks it.

Another reason to prefer:

- anchors
- normal links
- minimal state

---

# 169. Loading State

There should essentially be none.

The page is static.

If the user sees a spinner, something has gone wrong architecturally.

---

# 170. Error State

External Maps links may fail or change.

The place name should remain selectable/copyable so it can be manually searched.

Do not make navigation dependent on opaque buttons.

---

# 171. Offline Failure

If Maps is unavailable:

The site should still tell the user:

```text
MAME JOSEF
JOSEFSTRASSE
KREIS 5
```

Enough geographic context should exist to search later.

---

# 172. Address Display

Do not display full postal addresses on every card by default.

Area is more useful for scanning.

Google Maps owns exact addresses.

Exception:

A location with ambiguous branches may need a street identifier:

```text
MAME
JOSEFSTRASSE
```

---

# 173. Multiple Locations

If a business has several branches, the guide should select the branch that best fits the recommendation.

Example:

```text
MAME JOSEF
```

rather than:

```text
MAME
[choose from 4 locations]
```

Decision reduction applies here too.

---

# 174. Branch Strategy

Choose based on:

- quality
- atmosphere
- neighborhood pairing
- convenience
- whether the branch represents the intended experience

The site should make the branch decision where possible.

---

# 175. Restaurant Menu Strategy

Do not link full menus by default.

Instead tell the traveler:

```text
GET
Zürcher Geschnetzeltes + rösti
```

Menus are useful only when dietary/logistical questions arise.

---

# 176. Food Photography

No food photography initially.

Reasons:

- slows site
- creates visual noise
- quickly becomes stale
- Maps already provides photos
- can bias decisions based on photography quality

The recommendation should stand on judgment.

---

# 177. Ratings After Visiting

Personal ratings could eventually influence editorial copy but should not become visible numeric ratings.

Instead:

Before:

```text
+ WORTH IT
```

After an exceptional firsthand experience:

```text
★ MUST
```

Editorial priority absorbs the learning.

---

# 178. "Favorite" Language

Potentially use:

```text
★ FAVORITE
```

after firsthand experience.

But avoid adding another permanent priority tier unless it helps.

Simpler:

`★ MUST`

remains enough.

---

# 179. Temporary Trip Notes

Do not clutter microsite with:

```text
Maybe go Tuesday after meeting.
```

Those belong in:

- trip plan
- private Markdown
- calendar

The microsite should remain generally useful throughout the trip.

---

# 180. Date-Specific Events

A small:

```text
THIS WEEK
```

section may be worthwhile if research finds:

- important design exhibition
- food market
- cultural event
- unusual temporary experience

### Rule

Only include unusually relevant events.

Remove after trip/date passes.

---

# 181. Event Maintenance

Every temporary event needs:

```text
START
END
```

in source data.

Do not let expired events remain on the site.

---

# 182. Homepage "This Week"

Only add if there is something worth showing.

Do not create an empty permanent section.

---

# 183. Search Engine Optimization

Not a priority.

Basic semantic HTML and title metadata are sufficient.

This is a personal utility, not a content-marketing project.

---

# 184. Social Preview

Optional later.

No need to create Open Graph artwork for v1.

---

# 185. Code Comments

Comment architectural decisions, not obvious CSS.

Good:

```css
/* Flat rules instead of cards to keep mobile density high. */
```

Unnecessary:

```css
/* Set background to black. */
background: #000;
```

---

# 186. Dependencies

Ideal number:

**0**

Every dependency creates maintenance cost.

Vanilla HTML/CSS/JS is appropriate.

---

# 187. Browser Support

Target modern:

- Safari
- Chrome
- Firefox

No need to support obsolete browsers.

---

# 188. Testing Devices

Minimum:

- iPhone-sized viewport
- Android-sized viewport
- desktop ~1440px

Most important:

**actual phone outdoors.**

A design that looks beautiful in a desktop browser but is annoying while walking has failed.

---

# 189. Outdoor Test

Before trip:

1. Open site on phone.
2. Go outside in bright daylight.
3. Hold phone one-handed.
4. Try to find:
   - coffee
   - food
   - Maps
5. Do not zoom.
6. Do not carefully read.

If difficult:

increase:

- text size
- contrast
- tap area

before adding anything decorative.

---

# 190. Jet-Lag Test

Pretend cognitive capacity is low.

Can the interface answer:

> food?

without remembering how the navigation works?

If not, simplify.

---

# 191. Thumb Test

Primary actions should be comfortably reachable and large.

Do not put tiny:

```text
↗
```

icons at the far right as the only Maps control.

Use text:

```text
OPEN IN GOOGLE MAPS ↗
```

with a large tap region.

---

# 192. Glance Test

Look at a screen for two seconds.

You should be able to identify:

- section
- recommendation name
- priority
- category
- action

without reading paragraphs.

---

# 193. Screenshot Test

A screenshot of any useful section should remain understandable without surrounding context.

This encourages:

- clear section labels
- clear place names
- compact metadata

Useful while traveling if something is saved offline.

---

# 194. Design Review Question

For every visual element ask:

> What information problem is this solving?

If the answer is:

> It makes the site look more designed.

remove it.

---

# 195. Content Review Question

For every recommendation ask:

> What decision does this improve?

If unclear:

keep it in `guide.md`.

---

# 196. Engineering Review Question

For every feature ask:

> What travel problem does this solve that the current static page does not?

If the answer is weak:

do not build it.

---

# 197. Measurement Presentation

Where measurements matter, include both imperial and metric units, especially for weather, wind, distance, elevation, and temperature.

- Present imperial as the primary reading for this traveler.
- Place the metric equivalent immediately alongside it in smaller, muted type so it remains easy to communicate with people locally.
- Keep units explicit; do not rely on unlabeled conversions.
- Treat the pair as one data point rather than duplicating labels or adding a separate conversion row.

---

# 198. Final V1 Philosophy

The first version should almost feel **too simple**.

That is desirable.

A successful V1 may only be:

```text
~1 HTML file
~1 CSS file
~1 tiny JS file
~30–50 published recommendations
~10 routes/modules
Google Maps links
```

That is enough to dramatically outperform a giant saved Google Maps list for this use case.

---

# 199. Final Visual Principle

> BLACK.
>
> WHITE.
>
> GRID.
>
> TYPE.
>
> INFORMATION.

Everything else has to justify itself.

---

# 200. Final Interaction Principle

> ONE QUESTION.
>
> A FEW GOOD ANSWERS.
>
> ONE TAP TO MAPS.

---

# 201. Final Editorial Principle

> THE MARKDOWN REMEMBERS EVERYTHING.
>
> THE WEBSITE SHOWS ONLY WHAT MATTERS.

---

# 202. Final Product Principle

The Zürich Field Guide should make an unfamiliar city feel **legible** without making it feel predetermined.

It should provide enough judgment to eliminate bad decisions while leaving enough freedom to:

- wander
- discover
- change plans
- follow weather
- stop somewhere unexpectedly good

The objective is not to optimize every hour.

It is to remove unnecessary uncertainty.
