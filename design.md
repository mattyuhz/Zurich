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
