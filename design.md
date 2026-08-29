# DESIGN SYSTEM

## Purpose

This document defines the visual and interaction design direction for the CEO Malaya Driving School website. It is intended as the single design reference for implementing a professional, trustworthy, premium-feeling driving-school experience.

## Design Philosophy

Create a polished, confident and approachable website that feels designed by an experienced human designer—not by a generic AI website generator.

Priorities:
- clarity before decoration
- trust before visual novelty
- strong hierarchy before effects
- restrained motion before excessive animation
- consistent systems before one-off styling
- authentic imagery before generic visual tricks
- responsive behavior as a first-class requirement
- both light and dark themes must feel intentionally designed

The visual language should feel established, credible and locally relevant while remaining modern enough to compete with high-quality professional service websites.

## Human-Designed / Anti-AI Direction

The interface must never rely on predictable AI-generated design patterns merely to appear modern.

Avoid by default:
- excessive gradients
- excessive glassmorphism
- neon/glow effects
- meaningless blobs or floating shapes
- excessive rounded cards
- excessive pills
- black-and-gold luxury clichés
- oversized headings used everywhere
- unnecessary 3D decoration
- repetitive card grids
- decorative elements without purpose
- excessive shadows
- animation on every section
- visually noisy backgrounds

Every visual treatment must have a clear purpose related to hierarchy, trust, usability or brand expression.

The final result should make a visitor think: “A highly experienced website designer created this for a real driving school.”

## Visual Personality

The website should communicate:
- trustworthy
- professional
- confident
- approachable
- safety-conscious
- competent
- modern
- locally credible

Do not make the brand feel overly corporate, childish, flashy or artificially luxurious.

## Theme System

The website supports two fully designed visual themes:

- **Light Theme** — the primary/default presentation: clean, bright, professional and highly readable.
- **Dark Theme** — a deliberate premium alternative: deep navy/charcoal surfaces, controlled contrast and comfortable readability.

Dark mode must NOT be implemented as a simple color inversion. Each semantic token must have a considered light and dark value.

### Theme behavior

- Respect the user's system preference on first visit when no saved preference exists.
- Provide a clear manual theme toggle button in the site header/navigation on desktop and in the mobile navigation/menu on smaller screens.
- The toggle must be visible, discoverable and reachable without opening an unrelated settings panel.
- Persist the user's selected theme across page loads.
- Never cause a flash of the wrong theme during initial rendering where technically possible.
- Keep the toggle accessible by keyboard and screen readers.
- Use an understandable icon + accessible text/label; never rely on an icon alone.
- Theme switching should be subtle and should not animate excessively.
- Respect `prefers-reduced-motion`.

### Theme Toggle Button — Required UI Component

A real, clickable **Light/Dark Theme Toggle Button** is mandatory. This is not merely a documentation concept.

#### Desktop placement

Place the theme toggle in the primary header/navigation area, visually separated from the main navigation links but aligned with the existing action controls.

Recommended order:

`Navigation → Theme Toggle → Primary CTA`

Do not allow the theme toggle to compete visually with the primary business CTA.

#### Mobile placement

Place the same theme toggle inside the mobile navigation/menu in an obvious location. It must remain easy to find without adding unnecessary header clutter.

#### Toggle behavior

The button must:

1. Show the current theme clearly.
2. Allow one click/tap to switch between Light and Dark.
3. Update the entire interface immediately.
4. Persist the selected preference.
5. Respect system preference when the user has not manually selected a theme.
6. Provide an accessible name such as `Switch to dark theme` when Light is active and `Switch to light theme` when Dark is active.
7. Expose the current state using an appropriate accessible state such as `aria-pressed` or an equivalent accessible pattern.
8. Have visible hover, focus-visible, active and disabled states where applicable.

#### Visual treatment

Use a refined compact control rather than a large decorative switch.

Preferred visual language:
- sun icon for Light
- moon icon for Dark
- optional short text label such as `Light` / `Dark` where space allows
- subtle border or surface treatment
- clear focus ring
- no neon glow
- no excessive glassmorphism
- no oversized animated toggle

The icon should change meaningfully when the theme changes, but the transition must remain subtle.

#### Theme toggle states

Define and visually support:
- Light / default
- Dark / default
- Hover
- Focus-visible
- Active/pressed
- Disabled, if ever required

#### Implementation rule

The theme toggle must control a single global theme state. Do not create separate theme toggles for individual sections or components.

All components must inherit the active semantic theme tokens rather than receiving manually inverted colors.

### Light theme

The light theme should feel:
- clean
- trustworthy
- spacious
- crisp
- approachable

Use warm/neutral whites and very light surfaces rather than harsh visual contrast everywhere.

### Dark theme

The dark theme should feel:
- premium
- calm
- focused
- sophisticated
- comfortable for extended viewing

Do not use pure black as the default page background. Prefer deep navy/charcoal tones with clearly separated surfaces.

Do not use pure white for large text blocks. Use an off-white primary text color and softer muted text.

Accent colors should remain controlled and should not become neon against dark surfaces.

## Color System

Use semantic design tokens so components never depend on hard-coded visual assumptions.

### Light theme tokens

```css
:root,
[data-theme="light"] {
  --color-background: #FFFFFF;
  --color-surface: #F7F8FA;
  --color-surface-elevated: #FFFFFF;
  --color-surface-subtle: #F1F4F7;
  --color-primary: #123B63;
  --color-primary-hover: #0E2F50;
  --color-primary-active: #0A2743;
  --color-accent: #E3A72F;
  --color-accent-hover: #C99120;
  --color-text: #17202A;
  --color-text-muted: #66717F;
  --color-text-subtle: #7B8794;
  --color-text-inverse: #FFFFFF;
  --color-border: #E3E7EC;
  --color-border-strong: #CBD2DA;
  --color-success: #2E7D5B;
  --color-error: #B42318;
  --color-warning: #A15C00;
  --color-focus: #2563A8;
}
```

### Dark theme tokens

```css
[data-theme="dark"] {
  --color-background: #0D1622;
  --color-surface: #142131;
  --color-surface-elevated: #192A3D;
  --color-surface-subtle: #101C2A;
  --color-primary: #6FA7D8;
  --color-primary-hover: #86B8E3;
  --color-primary-active: #A0C8EA;
  --color-accent: #E9B84A;
  --color-accent-hover: #F1C766;
  --color-text: #F2F5F8;
  --color-text-muted: #AEB9C6;
  --color-text-subtle: #8794A3;
  --color-text-inverse: #0D1622;
  --color-border: #2A394A;
  --color-border-strong: #3A4B5E;
  --color-success: #63B58A;
  --color-error: #F08A83;
  --color-warning: #E4A65C;
  --color-focus: #8CC4F4;
}
```

Do not introduce arbitrary colors outside the semantic system unless a genuine content requirement demands it.

Accent colors should be used sparingly for emphasis, important actions, highlights and selected states—not as large decorative fills throughout the page.

### Theme-specific rules

- Never hard-code `#FFFFFF` or near-white as a large surface in dark theme.
- Never hard-code dark text colors on dark surfaces.
- Never hard-code dark backgrounds behind components that must work in light theme.
- Images should remain natural in both themes; avoid global dark overlays that make photography muddy.
- Borders must remain visible but subtle in both themes.
- Shadows should be lighter/subtler in dark theme and should not create artificial glowing edges.
- Form controls must use theme-aware surfaces, borders, placeholder colors and focus states.
- Buttons must maintain sufficient contrast in both themes.

## Typography

Use one primary sans-serif family with a strong professional character and excellent screen readability. A suitable implementation may use Inter, Manrope, or another comparable modern sans-serif; do not mix multiple unrelated typefaces.

Suggested hierarchy:

- Display: clamp(2.5rem, 5vw, 4.5rem), 700–800 weight, tight line-height
- H1: clamp(2.25rem, 4vw, 3.75rem), 700–800
- H2: clamp(1.8rem, 3vw, 2.75rem), 700
- H3: clamp(1.35rem, 2vw, 1.75rem), 650–700
- H4: 1.15rem–1.35rem, 650–700
- Body large: 1.0625rem–1.125rem
- Body: 1rem
- Body small: 0.875rem–0.9375rem
- Caption: 0.75rem–0.8125rem

Body text should generally use a line-height around 1.55–1.7. Headings should use tighter line-height around 1.1–1.25.

Do not use excessive font weights or decorative typography.

## Spacing System

Use a consistent spacing scale instead of arbitrary values.

```text
4px   — micro
8px   — xs
12px  — sm
16px  — md
24px  — lg
32px  — xl
48px  — 2xl
64px  — 3xl
80px  — 4xl
96px  — 5xl
128px — 6xl
```

Not every value must be used. Choose spacing according to hierarchy and content density.

## Layout & Containers

Use a centered content container with a comfortable maximum width, approximately 1200–1280px depending on content.

Maintain consistent horizontal gutters:
- desktop: approximately 32–48px
- tablet: approximately 24–32px
- mobile: approximately 16–20px

Sections should have intentional vertical rhythm. Avoid both cramped layouts and excessive empty space.

Prefer varied but controlled compositions rather than repeating the same centered text + three-card pattern in every section.

## Border Radius

Use restrained radii:
- small controls: 6–8px
- cards: 10–14px
- prominent media: 12–16px
- pills: reserved for tags/statuses only

Do not round every element.

## Elevation & Shadows

Use elevation sparingly.

Prefer subtle shadows that establish hierarchy rather than dramatic floating effects.

Cards should generally rely on a combination of surface contrast, border and restrained elevation.

Avoid stacking multiple shadows or using strong shadows on every element.

Dark theme should use reduced shadow intensity and stronger surface differentiation rather than heavy black shadows.

## Navigation

The navigation should immediately communicate brand identity and provide clear access to the most important destinations.

Requirements:
- simple hierarchy
- clear active state
- strong contrast in both themes
- obvious primary contact/action
- consistent spacing
- accessible keyboard focus
- mobile navigation that does not obstruct content
- clearly accessible theme toggle button

Do not overload the navigation with too many links.

## Hero Section

The hero should establish trust within seconds.

It should clearly communicate:
1. what CEO Malaya Driving School offers
2. who the service is for
3. the main benefit or differentiator
4. the primary action

Use authentic, high-quality driving-school imagery. The hero visual should support the message rather than compete with it.

Recommended structure:
- concise supporting label where useful
- strong headline
- short value proposition
- primary CTA
- secondary action only when genuinely useful
- trust/supporting information
- strong visual focal point

Avoid placing excessive text, badges or decorative elements over the hero image.

Hero text and overlays must remain readable in both themes. Do not make dark-theme hero imagery artificially dark merely to force contrast; use an intentional localized overlay where necessary.

## Buttons

Use a clear hierarchy:

### Primary
For the main conversion action such as enquiry, booking or contacting the school.

### Secondary
For important but lower-priority actions.

### Tertiary
Text/link actions for low-emphasis navigation.

### Theme Toggle
The Light/Dark Theme Toggle is a utility control, not a marketing CTA. It must remain visually distinct from primary business actions while being easy to discover.

Buttons must have:
- clear label
- adequate touch target
- hover state
- focus-visible state
- active state
- disabled state where relevant
- consistent height and padding
- sufficient contrast in both themes

Do not create many visually competing CTA styles.

## Cards

Cards should be used only where grouping information improves scanning.

Avoid turning every piece of content into a card.

Card hierarchy should be based on:
- content importance
- image/content relationship
- surface contrast
- spacing
- concise metadata

Cards should not all look identical when their purposes differ.

Dark-theme cards should use elevated surfaces and subtle borders rather than excessive glow.

## Forms

Forms must feel simple, trustworthy and easy to complete in both themes.

Requirements:
- visible labels
- clear field purpose
- sensible grouping
- appropriate input types
- clear required/optional treatment
- validation feedback
- error state
- success feedback
- keyboard accessibility
- theme-aware input backgrounds, borders and placeholder text

Do not request unnecessary information.

Primary form actions should be visually obvious without becoming aggressive.

## Trust & Social Proof

Use genuine trust signals where available:
- instructor experience
- training approach
- certifications or credentials when accurate
- learner testimonials
- course information
- contact/location information
- clear service details

Do not invent statistics, ratings, certifications, awards or claims.

Trust should come from clarity and evidence, not decorative badges.

## Imagery

Image direction should feel authentic to a real driving school.

Prefer:
- real instructors
- real learners where available
- training vehicles
- classroom/theory environments
- driving practice
- driving ground/training areas
- realistic local context

Avoid generic luxury-car imagery that does not represent the actual service.

Maintain consistent aspect ratios and intentional cropping.

Images must not be stretched or awkwardly cropped.

Use responsive image behavior and avoid relying on decorative imagery that is essential for understanding content.

## Iconography

Use one coherent icon family.

Icons should support recognition and hierarchy, not act as decoration everywhere.

Avoid mixing unrelated icon styles, weights or visual metaphors.

Icons must remain legible against both light and dark surfaces.

## Motion & Interaction

Motion should be subtle and purposeful.

Recommended:
- short hover transitions
- restrained entrance animation
- small state transitions
- subtle image movement only where useful
- restrained theme transition

Typical transition range: 150–300ms.

Avoid:
- continuous decorative animation
- excessive parallax
- animation on every component
- long entrance delays
- distracting page transitions

Respect `prefers-reduced-motion` and provide a reduced-motion experience.

The website must remain visually strong when motion is disabled.

## Responsive Design

Responsive behavior must be intentionally defined, not treated as simple desktop shrinking.

### Desktop
Use the full grid, generous whitespace and balanced media/text compositions.

### Tablet
Reduce column count and spacing while preserving hierarchy.

### Mobile
Prioritize:
- readable typography
- single-column flow where appropriate
- clear CTA hierarchy
- comfortable touch targets
- simplified navigation
- reduced decorative effects
- sensible image cropping
- accessible theme toggle

Avoid horizontal overflow at every viewport width.

## Accessibility

The design should follow WCAG 2.2 principles where applicable.

Requirements:
- sufficient text/background contrast in BOTH themes
- visible keyboard focus
- meaningful labels
- semantic heading hierarchy
- touch targets large enough for comfortable interaction
- errors communicated without relying only on color
- motion reduction support
- readable text sizes
- clear link/button distinction
- accessible theme switcher
- theme state communicated to assistive technology

Accessibility should be part of the design rather than an afterthought.

## Performance-Aware Visual Design

Premium design must not require unnecessarily expensive effects.

Prefer:
- optimized imagery
- restrained video use
- lightweight transitions
- limited blur/backdrop effects
- no unnecessary continuous animations

Large hero video or complex visual effects should only be used when their value clearly justifies their cost.

Reserve animation and visual complexity for moments that improve understanding or interaction.

Theme switching must not require loading an entirely separate visual asset set unless necessary.

## Section Composition

Do not force every section into the same visual structure.

Use controlled variation such as:
- text + image
- image + text
- feature list
- course comparison
- process/timeline
- instructor profiles
- testimonials
- statistics
- FAQ
- CTA

Variation should create rhythm while shared tokens preserve consistency.

## Content Density

Keep copy concise and scannable.

Avoid long blocks of text when the same information can be communicated with headings, short paragraphs, lists or structured content.

Headings should communicate meaning, not merely sound promotional.

## Component States

Interactive components should define, where applicable:
- default
- hover
- focus-visible
- active
- disabled
- loading
- error
- success

State styling must remain consistent across the system and remain distinguishable in both themes.

## Page-Level Consistency

Every page should feel like part of the same product.

Reuse:
- typography
- semantic color tokens
- spacing
- button hierarchy
- radius language
- image treatment
- interaction behavior
- theme behavior

Do not create a completely different visual language for individual pages without a strong content reason.

## Design Do / Don't

### DO
- use authentic imagery
- maintain strong hierarchy
- use whitespace intentionally
- keep the CTA system simple
- create visual rhythm
- use restrained motion
- make mobile behavior intentional
- preserve accessibility
- favor consistency
- use evidence-based trust signals
- design dark mode as a complete visual system
- test important components in both themes
- provide a clearly discoverable Light/Dark theme toggle

### DON'T
- overload sections with effects
- use arbitrary colors
- make every element rounded
- animate everything
- create fake urgency
- invent credentials or claims
- use decorative elements without purpose
- sacrifice readability for style
- rely on trendy effects to communicate quality
- make the website resemble a generic AI-generated template
- simply invert light-theme colors to create dark mode
- use pure black backgrounds or excessive neon/glow in dark mode
- allow theme-specific components to drift into a different design language
- hide the theme control inside an unnecessarily deep settings flow
- make the theme toggle larger or more visually dominant than the primary business CTA

## Final Design Standard

The finished website should feel:

**Professional. Trustworthy. Modern. Human-designed. Confident. Approachable. Refined.**

Both themes must feel like intentional expressions of the same brand—not two unrelated designs.

The light theme should be the clean, bright professional experience. The dark theme should provide a sophisticated, comfortable alternative without becoming flashy or overly futuristic.

The theme switch must be an actual, discoverable, accessible button that lets users move between Light and Dark modes with one click/tap.

The design should not try to impress users by showing how many effects it can produce. It should impress them through the quality of its decisions.

The final visual result must look like the work of an experienced web designer and frontend developer who understood the business, audience and real-world service before designing the interface.
