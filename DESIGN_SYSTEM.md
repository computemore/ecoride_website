# Ecoride Website Design System

## Purpose

This document defines the visual, structural, interaction, accessibility, and implementation rules for the Ecoride public website.

It exists to do four things:

1. Preserve consistency across Home, Ride, Drive, Corporate, About, and future public routes.
2. Translate the original product prompts into stable design-system rules.
3. Align design decisions with the actual implementation in Next.js App Router, TypeScript, and Tailwind CSS.
4. Provide a technical governance layer so future contributors can extend the site without drifting from the established language.

This is the source-of-truth document for public-site consistency. If a future change conflicts with this document, the conflict must be resolved intentionally and the document must be updated in the same change.

---

## 1. Design System North Star

The Ecoride website is a:

- Local-first public marketing platform for Malawi.
- Server-first, SEO-sensitive, App Router-based website.
- High-clarity, low-noise interface.
- Rounded, elevated, color-led design system.
- White-text dominant visual language.
- Mobile-first system with desktop expansion.

The system is not meant to be generic SaaS UI. It should feel specific, grounded, bold, and operationally credible.

### Core Principles

#### 1.1 Local-first clarity

The interface should feel rooted in real transport use cases in Malawi. Copy, layout, and hierarchy must prioritize practical trust over abstract marketing language.

#### 1.2 Server-first delivery

The public site should default to React Server Components and semantic HTML. Client-side logic should be limited to genuine interactivity such as navigation menus or dropdowns.

#### 1.3 Bold color identity

Every primary route has a strong single-color identity. Pages should feel immersive, not neutral.

#### 1.4 White-text system

Primary text should be white or white with opacity. Gray body text is not part of the visual system for primary surfaces.

#### 1.5 Rounded, elevated minimalism

The system favors rounded controls and cards with restrained depth. Elevation should support clarity, not decoration.

#### 1.6 Consistency over novelty

New components should be built from existing tokens and patterns before introducing new visual behaviors.

---

## 2. System Boundaries

This design system applies to:

- Public route shells.
- Shared layout and navigation.
- Shared typography rules.
- Shared buttons, cards, headings, and footer patterns.
- Route-specific page surfaces.
- Content structure and hierarchy expectations.
- Accessibility and SEO-sensitive markup.

This document does not define:

- Authenticated product UI.
- Dashboard UI.
- Internal admin tools.
- Native mobile app UI.

---

## 3. Source of Truth Hierarchy

The design system is implemented across these files and should remain aligned with them:

- `DESIGN_SYSTEM.md`: human-readable system definition.
- `src/styles/variables.css`: base design tokens.
- `src/styles/typography.css`: font and letter-spacing rules.
- `tailwind.config.ts`: Tailwind token exposure.
- `src/styles/main.css`: shared surface, motion, and gradient behaviors.
- `src/config/site-content.ts`: route themes, SEO copy, structured content arrays, and public navigation patterns.
- `src/config/app-settings.ts`: contact, download, and public business details.
- `src/layouts/public-layout.tsx`: page-surface application and global route shell.

If a token exists in both code and documentation, code is the executable source of truth and this document must describe that implementation accurately.

---

## 4. Design Tokens

### 4.1 Color Tokens

#### Core brand colors

Defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---:|---|
| `brand.red` | `#f0453d` | Home and Drive route identity |
| `brand.teal` | `#2c9c8e` | Ride route identity |
| `brand.blue` | `#2196F3` | Corporate route identity |

#### Text and surface tokens

Defined in `src/styles/variables.css`:

| Token | Value | Usage |
|---|---:|---|
| `--text-primary` | `rgba(255, 255, 255, 1)` | Primary text |
| `--text-secondary` | `rgba(255, 255, 255, 0.76)` | Secondary body copy |
| `--text-tertiary` | `rgba(255, 255, 255, 0.62)` | Lower-priority labels |
| `--surface-border` | `rgba(255, 255, 255, 0.18)` | Glass-card borders |
| `--surface-muted` | `rgba(255, 255, 255, 0.08)` | Low-emphasis overlays |
| `--surface-strong` | `rgba(255, 255, 255, 0.16)` | Stronger overlays |

### 4.2 Route Surface Rules

Route themes are applied through `pageThemes` in `src/config/site-content.ts` and injected into `public-layout.tsx` as `--page-color`.

The `page-surface` class in `src/styles/main.css` creates the page background using a diagonal intensity treatment:

```css
linear-gradient(
  135deg,
  color-mix(in srgb, var(--page-color) 95%, black) 0%,
  var(--page-color) 50%,
  color-mix(in srgb, var(--page-color) 95%, black) 100%
)
```

This yields the required subtle diagonal curve from slightly darker to full-color to slightly darker. That gradient behavior is part of the system and must not be replaced with flat fills unless intentionally re-scoped.

### 4.3 Radius Tokens

Defined in both `variables.css` and `tailwind.config.ts`:

| Token | Value | Usage |
|---|---:|---|
| `--radius-pill` / `rounded-pill` | `20px` | Buttons, pills, dropdown items, small chips |
| `--radius-card` / `rounded-card` | `28px` | Cards, hero panels, surface blocks |

### 4.4 Layout Tokens

| Token | Value | Usage |
|---|---:|---|
| `--content-max-width` | `86rem` | Main route container width |
| `max-w-content-wide` | `86rem` | Shared content shell utility |

### 4.5 Shadow Tokens

Defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---:|---|
| `shadow-float` | `0 18px 40px rgba(15, 23, 42, 0.18)` | Elevated cards on hover |
| `shadow-glow` | `0 12px 30px rgba(255, 255, 255, 0.12)` | Reserved accent glow usage |

---

## 5. Typography System

### 5.1 Type Family

The site uses Poppins via `next/font/google` and applies it through the `--font-poppins` CSS variable.

Implementation references:

- `src/app/layout.tsx`
- `src/styles/typography.css`
- `tailwind.config.ts`

### 5.2 Type Behavior

Defined in `src/styles/typography.css`:

- `html` and `body` use `var(--font-poppins)`.
- `body` uses `letter-spacing: -0.01em`.
- `h1`, `h2`, `h3`, and `h4` use `letter-spacing: -0.04em`.

### 5.3 Typography Rules

#### Headings

- Headings should feel compact and high-contrast.
- Heading line lengths should be controlled using `max-width` and `text-balance` where appropriate.
- Large hero headings should prioritize impact first, not density of information.

#### Body copy

- Body copy should stay concise and scannable.
- Primary marketing paragraphs should generally use `text-white/76` or equivalent secondary white-opacity.
- Copy should be split into meaningful paragraphs rather than long blocks.

#### Labels and eyebrows

- Eyebrow text is uppercase, tightly tracked, and lower-opacity white.
- It functions as structure, not decoration.

### 5.4 Type Scale Expectations

The current implementation uses responsive Tailwind sizing rather than a centralized scale map. Contributors should follow these working rules:

- Hero H1: `text-5xl` to `text-7xl` or larger on large screens.
- Section H2: approximately `text-3xl` to `text-5xl` responsive.
- Card H3: approximately `text-xl` to `text-2xl` responsive.
- Body copy: `text-[15px]` to `text-lg` depending on hierarchy.

### 5.5 Mobile type reduction rule

Below `768px`, the public website should intentionally step typography down by one level from the desktop reading scale.

Rules:

- Hero headlines should reduce from the desktop-first `text-5xl` pattern to a mobile-first `text-4xl` baseline unless a tighter headline requires an even smaller starting size.
- Section headings should start at `text-2xl` on mobile before expanding upward at `sm` and `lg` breakpoints.
- Shared body copy in marketing sections should default to `text-sm` or `text-base` on mobile rather than `text-lg`.
- Shared support copy, card bullets, and footer/meta text should default to `text-xs` or `text-sm` on mobile before scaling up.
- Button text should also reduce by one step on mobile so CTA groups do not force premature wrapping or horizontal crowding.

---

## 6. Spatial System

### 6.1 Spacing philosophy

Spacing should communicate hierarchy before decoration does. The site should feel open and deliberate, especially on public marketing pages.

### 6.2 Container rhythm

The standard public page shell uses:

- `px-4` on mobile
- `md:px-6`
- `lg:px-8`

This should remain the default route-level padding pattern unless a scoped component requires otherwise.

### 6.3 Section rhythm

Typical vertical rhythm:

- Hero sections: `pt-20` to `pt-24`, with route-aware responsive adjustment
- Mid-page sections: `pb-12` to `pb-14`
- Final sections before footer: `pb-24`

### 6.4 Scroll anchoring

Anchored sections should use the `section-anchor` class so in-page navigation lands below the sticky header.

### 6.5 Split scrolling for legal pages

Legal document layouts may use split scrolling on desktop when the section index is long enough to exceed the viewport height.

Rules:

- The legal sidebar should remain sticky below the header.
- The legal sidebar should be independently scrollable within the viewport so users can browse the local section index without losing their article position.
- The main legal article should continue to scroll as part of the page itself rather than becoming a second nested article scroller.
- This split-scroll behavior is scoped to long-form legal/navigation layouts and should not be treated as a default pattern for marketing pages.

---

## 7. Layout System

### 7.1 Page shell

Every public route should render inside `PublicLayout`, which is responsible for:

- Applying the route-specific `--page-color`
- Rendering the shared `IndexHeader`
- Rendering the shared `SiteFooter`
- Preserving the `page-surface` background system

### 7.2 Header model

The header is:

- Sticky
- Transparent with blur
- Route-aware via `pageKey`
- Left anchored on the Ecoride wordmark
- Centered for route-specific navigation
- Right aligned for primary utility actions

#### Header invariants

- Wordmark remains white.
- Download Apps stays a white button with black text.
- Login stays a white button with black text in the current resolved system.
- Dropdown items use `rounded-pill` styling.

#### Mobile header behavior

Below `768px`, the shared header follows these rules:

- The wordmark should shrink substantially on mobile to preserve horizontal space for the menu toggle. The current implementation reduces the logo width to roughly 40% of the desktop width.
- The menu toggle should open a full-width panel directly beneath the sticky header rather than a floating side drawer.
- Navigation groups belong at the top of that mobile panel.
- Utility and download actions belong at the bottom of that mobile panel, separated from the navigation links by a divider.
- The mobile panel may scroll vertically inside the viewport, but it must not introduce horizontal scrolling.

### 7.3 Footer model

The footer is a shared informational structure, not a marketing experiment zone.

It should always support:

- Brand statement
- Contact information
- Route-level exploration links
- Public connection/download access

### 7.4 Route identity model

Each route has its own identity but must still feel like the same system.

| Route | Surface identity | Narrative role |
|---|---|---|
| Home | Red | Brand entry and route selection |
| Ride | Teal | Safety, confidence, convenience |
| Drive | Red | Earning, readiness, support |
| Corporate | Blue | Pricing clarity, oversight, sustainability |
| About | Red | Platform explanation and anchored narrative |

### 7.5 Legal document layout

Legal routes under About may adopt a light-surface reading layout instead of the saturated brand-surface treatment used by the main marketing routes.

Legal layout rules:

- The left rail presents the local legal context, route selector, and in-page heading index.
- The left rail may scroll independently on desktop if its content exceeds the available viewport height.
- The right column remains the primary reading surface and scrolls with the page.
- Metadata rows such as Effective Date and Last Updated should be presented as simple structured text, not elevated cards, unless the legal page introduces a materially different information hierarchy.

---

## 8. Component System

### 8.1 Shared component philosophy

Reusable components should absorb repeated behaviors so new pages do not re-implement layout, interaction, or typography rules ad hoc.

### 8.2 Core shared components

#### `BaseButton`

Responsibilities:

- Shared CTA shape
- Shared weight and spacing
- Internal vs external link resolution
- Hover lift behavior
- Accessible focus handling

Rules:

- Buttons are bold.
- Buttons use `rounded-pill`.
- Primary button variants must remain visually readable on saturated route backgrounds.

#### `MarketingCard`

Responsibilities:

- Shared elevated card language
- Optional bullet lists
- Optional internal or external CTA links

Rules:

- Card content must remain concise.
- Cards may contain CTA links, but should not become mini-pages.
- Cards must preserve the glass/elevated surface language.

#### `SectionHeading`

Responsibilities:

- Shared eyebrow, heading, and supporting copy pattern
- Optional centered alignment

Rules:

- This should be the default entry point for any new major page section.
- Avoid creating page-specific heading structures unless there is a clear compositional reason.

#### `IndexHeader`

Responsibilities:

- Route-aware navigation
- Desktop dropdown behavior
- Mobile menu behavior
- Primary CTA access

#### `SiteFooter`

Responsibilities:

- Public route continuity
- Brand and contact persistence
- Cross-route discoverability

---

## 9. Surface and Motion System

### 9.1 Surface language

The site uses translucent, elevated surfaces over saturated route backgrounds.

`surface-card` currently provides:

- Border using `--surface-border`
- Vertical translucent gradient fill
- Backdrop blur
- Elevated shadow
- Hover shadow enhancement

### 9.2 Motion language

Motion should be restrained and meaningful.

Current shared interaction rules:

- Buttons: `180ms` transitions, slight lift on hover
- Cards: restrained hover lift and shadow shift
- Dropdown icons: rotation transitions

### 9.3 Motion constraints

Do not introduce:

- Long easing curves for basic interactions
- Large spatial movement
- Decorative looping motion for marketing surfaces
- Motion that obscures reading or scanning

---

## 10. Imagery and Illustration System

### 10.1 Imagery philosophy

Imagery should support clarity, route identity, and credibility. It must not overpower copy or degrade performance.

### 10.2 Asset rules

- Raster images must use `next/image`.
- SVGs may be used as static public assets where appropriate.
- Decorative imagery should reinforce the route narrative.
- Media should always preserve layout stability.

### 10.3 Current illustration direction

- The corporate route uses a desktop-only hero illustration.
- Illustration treatment should remain tasteful and secondary to the headline.
- On small screens, imagery may be hidden if it improves clarity and hierarchy.

---

## 11. Content System

### 11.1 Content architecture

The site is intentionally config-driven.

Content should be centralized in:

- `src/config/site-content.ts`
- `src/config/app-settings.ts`

This enables:

- Reuse across multiple page sections
- Safer SEO updates
- Better consistency of tone and route messaging
- Easier future governance

### 11.2 Content rules

- Do not scatter major marketing copy across many components if it can live in config.
- Prefer arrays of structured content objects for repeated card sections.
- Keep copy lean, specific, and operationally believable.
- Prefer clear claims over vague brand language.

### 11.3 Tone

The site voice should be:

- Confident
- Local
- Practical
- Trust-building
- Conversion-aware without sounding inflated

Avoid:

- Generic startup phrases
- Excessive hype language
- Long abstract paragraphs
- Feature dumping without narrative framing

---

## 12. Responsive Design Rules

### 12.1 Mobile-first implementation

All layouts should be designed mobile-first and progressively enhanced upward.

### 12.2 Responsive priorities

When adapting a section for smaller screens, prioritize in this order:

1. Readability
2. CTA clarity
3. Section rhythm
4. Image preservation
5. Decorative enhancement

### 12.3 Responsive heuristics

- Hide non-essential illustration if it compromises hierarchy on mobile.
- Center hero content on mobile when the layout shifts from split to stacked.
- Collapse multi-column card grids cleanly before content becomes cramped.
- Maintain touch-friendly hit areas for buttons and nav items.

### 12.4 Horizontal overflow prevention

The public website should treat horizontal scrolling on mobile as a defect unless a component is explicitly designed as a horizontal scroller.

Rules:

- `html` and `body` should prevent accidental horizontal overflow at the global level.
- Route surfaces should clip incidental horizontal overflow caused by shadows, translated elements, or long strings.
- Long contact strings such as email addresses must wrap or break cleanly on small screens.
- Shared components should avoid fixed-width mobile assumptions when the same intent can be achieved with responsive widths or wrapping behavior.

---

## 13. Accessibility Rules

### 13.1 Baseline requirements

Every public component must support:

- Keyboard-accessible interactions
- Clear focus states
- Semantic HTML
- Text readability against saturated backgrounds
- Meaningful link and button labeling

### 13.2 Interaction rules

- Buttons must use native button or anchor semantics.
- Menus and dropdowns must remain keyboard reachable.
- Decorative text must never replace meaningful structure.

### 13.3 Content rules

- Headings must remain hierarchical.
- Links must communicate destination or purpose.
- Supporting text opacity must remain readable against route surfaces.

---

## 14. SEO and Semantic System Rules

The design system is inseparable from the website’s SEO architecture.

### 14.1 Rendering rules

- Default to server-rendered route content.
- Use client components only when interaction is required.

### 14.2 Semantic structure rules

- Prefer `header`, `main`, `section`, `article`, `nav`, and `footer` over generic wrappers where meaningful.
- Avoid unstructured `div` hierarchies for major content regions.

### 14.3 Metadata rules

- Route metadata should remain aligned with `pageSeo` in `src/config/site-content.ts`.
- Internal linking should support crawlable navigation paths.
- Public content must remain indexable unless explicitly blocked.

### 14.4 Performance rules

- Preserve layout stability for images and illustrations.
- Avoid unnecessary client JavaScript in marketing routes.
- Keep interaction components light and localized.

---

## 15. Implementation Rules for Contributors

### 15.1 When adding a new public section

Default sequence:

1. Add or extend structured content in `src/config/site-content.ts`.
2. Reuse `SectionHeading`.
3. Reuse `MarketingCard` if content is card-like.
4. Reuse `BaseButton` for CTAs.
5. Preserve current route surface identity.

### 15.2 When adding a new public route

You must update:

1. `pageThemes`
2. `pageSeo`
3. `headerNavigation` if route discoverability changes
4. `sitemap.ts` if needed
5. This document if the design system gains a new route-level identity

### 15.3 When changing a shared token

You must verify:

1. Home, Ride, Drive, Corporate, and About still feel visually related.
2. Text contrast remains acceptable.
3. Hover and focus behaviors remain consistent.
4. Responsive layouts still hold.
5. The change does not contradict this document.

---

## 16. Explicit Do / Do Not Rules

### Do

- Use route color identities intentionally.
- Use white and white-opacity text for public surfaces.
- Keep buttons rounded and bold.
- Keep cards elevated and restrained.
- Keep copy short, specific, and useful.
- Reuse config-driven content structures.
- Preserve semantic markup and server-first rendering.

### Do not

- Introduce gray body text on primary route surfaces.
- Add one-off component styles when a shared token already exists.
- Flatten the system into colorless SaaS patterns.
- Overload pages with dense text blocks.
- Add noisy animation.
- Introduce visual styles that break route identity.
- Move public route-level composition back into a Pages Router pattern.

---

## 17. Governance and Change Management

### 17.1 Change categories

Changes should be treated as one of the following:

- Token change
- Component-system change
- Route-identity change
- Content-structure change
- Accessibility or semantic correction
- Performance or SEO correction

### 17.2 Required process for design-system changes

If a change affects shared visual language, contributors should:

1. Update the implementation.
2. Validate lint and build.
3. Check core public routes.
4. Update this document if a rule or token changed.

### 17.3 Regression rule

Do not make broad shared changes without considering route-level regressions. Shared components and shared content structures have systemic impact and must be treated carefully.

---

## 18. Validation Checklist

Before shipping public-site changes, verify:

- Buttons still match the shared CTA system.
- Header and footer remain route-consistent.
- Route colors still map correctly.
- White-text hierarchy remains intact.
- Card elevation still feels restrained.
- Mobile spacing and hierarchy remain readable.
- Internal links still support meaningful user and crawler pathways.
- Public pages still build successfully.
- The design system document still matches the implementation.

---

## 19. Current Resolved System Decisions

These decisions are considered active and settled unless intentionally changed:

- Next.js App Router is the rendering foundation.
- The site is server-first and SEO-sensitive.
- Rounded UI is the chosen direction.
- Buttons and dropdowns use `20px` pill radii.
- Cards use a larger rounded radius and restrained elevation.
- Home and Drive use red route identity.
- Ride uses teal route identity.
- Corporate uses blue route identity.
- Light and dark mode should remain visually aligned.
- Marketing content should be config-driven wherever practical.

---

## 20. Final Rule

If a future change improves one page but weakens the system, the change is incomplete.

The Ecoride design system should optimize for route-specific strength and system-wide consistency at the same time.
