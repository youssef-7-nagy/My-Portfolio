# Permanent Design System & Responsive Architecture Rules

---

## 🎨 Permanent Official Color Palette & Design System

### 1. Mandatory Core Rule
This website has a permanent, immutable color identity based on **ONLY six official colors**.  
ALL developers, contributors, and AI coding agents MUST strictly follow this design system whenever:
- Creating a new page or section.
- Building, editing, or styling a component.
- Updating buttons, cards, typography, navigation, or animations.
- Adding any new feature or visual element.

**Never introduce random HEX/RGB/HSL values or foreign colors into component styles.**  
Always use the centralized design tokens defined in `src/index.css` and documented in `DESIGN_SYSTEM.md`.

### 2. The 6 Official Colors
| Color Name | HEX Code | RGB Channels | Intended Usage |
|---|---|---|---|
| **Warm Yellow** | `#F4D35E` | `244, 211, 94` | Primary accents, highlights, active states, important details |
| **Ocean Teal** | `#3C6E71` | `60, 110, 113` | Secondary sections, buttons, visual accents, links |
| **Deep Steel Blue** | `#284B63` | `40, 75, 99` | Primary brand color, dark sections, headings, cards |
| **Light Gray** | `#D9D9D9` | `217, 217, 217` | Subtle backgrounds, borders, dividers, secondary surfaces |
| **Black** | `#000000` | `0, 0, 0` | Main text (light mode), deep background (dark mode) |
| **White** | `#FFFFFF` | `255, 255, 255` | Main background (light mode), text on dark surfaces |

### 3. Token Reference
Use `var(--color-warm-yellow)`, `var(--color-ocean-teal)`, `var(--color-deep-steel-blue)`, `var(--color-light-gray)`, `var(--color-black)`, and `var(--color-white)`.  
For translucent surfaces, glassmorphism, or borders, use RGB variables with alpha:
- `rgba(var(--color-ocean-teal-rgb), 0.15)`
- `rgba(var(--color-warm-yellow-rgb), 0.35)`
- `rgba(var(--color-deep-steel-blue-rgb), 0.2)`
- `rgba(var(--color-light-gray-rgb), 0.14)`

---

# Responsive Portfolio Design — Permanent Rule

## Purpose

This is a permanent project-wide rule for this portfolio.

The portfolio must ALWAYS be designed and implemented as a fully responsive, fluid, adaptive website.

Responsive design is NOT an optional feature and must NOT be treated as a final polishing step.

Every new component, page, section, feature, modification, and UI element MUST follow these responsive design rules automatically.

---

## Core Rule

Whenever you create, edit, refactor, or modify ANY UI in this project, you MUST consider how it behaves across:

* Large desktop monitors
* 2K / 4K displays
* Ultrawide monitors
* TV-sized screens
* Standard desktop screens
* Laptops
* Tablets
* iPads
* Mobile phones
* Small mobile screens

Do not build a component for one screen size and fix responsiveness later.

Build it responsively from the beginning.

---

## Responsive Philosophy

Use a fluid layout rather than designing around specific devices.

Do NOT create device-specific hacks such as:

* "iPhone 14 fix"
* "iPhone 15 fix"
* "iPad fix"
* "1920px fix"

unless there is a genuine technical reason.

Prefer responsive rules based on available space.

The website should work at widths that were never explicitly tested.

---

## Large Screens

The website must work correctly on:

* 1920px
* 2560px
* 3440px
* 3840px and larger

On very large screens:

* Keep the main content centered.
* Use sensible max-width containers.
* Do not allow paragraphs to become extremely wide.
* Scale typography appropriately.
* Maintain visual hierarchy.
* Prevent cards and UI elements from looking unnecessarily small.
* Avoid excessive empty space.
* Preserve the intended design proportions.

---

## Desktop & Laptop

Support common widths such as:

* 1280px
* 1366px
* 1440px
* 1600px
* 1920px

Layouts should naturally transition between these widths.

Never assume that every desktop has the same resolution.

---

## Tablet

Support:

* iPad
* iPad Mini
* iPad Air
* iPad Pro
* Android tablets

Support both:

* Portrait
* Landscape

When necessary:

* Reduce grid columns.
* Adjust spacing.
* Resize typography.
* Reorganize content.
* Change navigation behavior.

---

## Mobile

Support:

* Small phones
* Standard phones
* Large phones
* iPhone
* Android

The UI must work starting from approximately 320px wide.

Mobile requirements:

* No horizontal scrolling.
* No clipped content.
* No overlapping elements.
* No text overflowing containers.
* Buttons must remain accessible.
* Touch targets must be comfortable.
* Images must scale correctly.
* Cards must fit naturally.
* Forms must work correctly with mobile keyboards.
* Navigation must adapt appropriately.
* Content must remain readable without zooming.

---

## Layout

Prefer:

* CSS Grid
* Flexbox
* Fluid containers
* `minmax()`
* `clamp()`
* `min()`
* `max()`
* responsive units
* percentage-based sizing
* `rem`
* `em`
* `vw`
* `vh`

Avoid unnecessary fixed dimensions.

Do NOT use fixed widths for major layout containers when a fluid solution is possible.

---

## Typography

Typography must be responsive.

For major headings and important text, prefer fluid sizing such as:

```css
font-size: clamp(...);
```

Do not use one fixed font size for every screen.

Maintain:

* readability
* hierarchy
* consistent proportions
* appropriate line length

---

## Containers

Use a responsive content container.

Example concept:

```css
width: min(100% - 2rem, 1200px);
margin-inline: auto;
```

The exact values may change depending on the design.

The important rule is:

Large screens should not stretch the content unnecessarily.

---

## Grids

Never force a grid to remain at the same number of columns on every screen.

Example behavior:

Large desktop:
3–4 columns when appropriate.

Desktop/laptop:
2–3 columns.

Tablet:
2 columns when appropriate.

Mobile:
1 column unless a 2-column layout genuinely improves usability.

Use flexible grid techniques where appropriate, for example:

```css
grid-template-columns: repeat(auto-fit, minmax(...));
```

---

## Images

All images must be responsive.

Use:

* `width: 100%`
* `max-width: 100%`
* appropriate aspect ratios
* `object-fit`
* responsive containers

Never allow images to overflow their parent container.

---

## Navigation

Navigation must adapt according to available space.

Desktop:

* Full navigation
* Proper spacing
* Clear CTA

Mobile:

* Mobile navigation
* Hamburger/menu when necessary
* No overflowing navigation links

Do not base navigation behavior only on a specific phone model.

---

## Components

Every component must be responsive independently.

This includes:

* Navbar
* Hero
* About
* Skills
* Tech stack
* Projects
* Project cards
* Experience
* Education
* Services
* Contact
* Forms
* Footer
* Buttons
* Modals
* Images
* Animations
* Any future component

When creating a new component, ALWAYS ask internally:

1. How does this look on mobile?
2. How does this look on tablet?
3. How does this look on laptop?
4. How does this look on desktop?
5. How does this look on very large screens?
6. What happens at widths between the normal breakpoints?

---

## Breakpoints

Do not create excessive breakpoints.

Prefer a small number of meaningful breakpoints.

Breakpoints should be based on where the layout actually needs to change, not on individual device models.

Never create unnecessary media queries just to fix one specific device.

---

## Overflow Protection

The website MUST NOT have accidental horizontal scrolling.

Always check for:

* oversized elements
* fixed widths
* large margins
* absolute-positioned elements
* oversized text
* images
* animations
* transforms
* navigation elements

Do not solve overflow problems by blindly adding:

```css
overflow-x: hidden;
```

First identify and fix the actual cause.

---

## Responsive Testing

Whenever you create or significantly modify UI, mentally or visually verify the design at approximately:

320px, 360px, 375px, 390px, 414px, 430px, 768px, 820px, 1024px, 1280px, 1366px, 1440px, 1600px, 1920px, 2560px, 3840px

Also consider widths between these values.

---

## Existing Design Preservation

When modifying an existing component:

DO NOT destroy the existing visual design just to make it responsive.

Preserve:

* visual identity
* spacing hierarchy
* typography hierarchy
* animations
* component purpose
* desktop appearance

Improve the implementation so that it adapts naturally to smaller and larger screens.

---

## Before Completing Any UI Task

Before considering a UI task complete, verify:

* Desktop layout works.
* Laptop layout works.
* Tablet layout works.
* Mobile layout works.
* Large screens work.
* No horizontal overflow exists.
* No text is clipped.
* No buttons are clipped.
* No images overflow.
* No elements overlap.
* Navigation works.
* Spacing remains visually balanced.
* Typography remains readable.
* The component behaves correctly at intermediate widths.

---

## Priority

When making UI decisions, follow this priority:

1. Responsive behavior
2. Usability
3. Accessibility
4. Visual hierarchy
5. Performance
6. Aesthetic details

Responsive behavior must always be considered part of the implementation, not an afterthought.

---

## Permanent Instruction

This rule applies to the ENTIRE portfolio project.

Whenever the agent works on this project in the future, automatically apply these responsive rules without requiring the user to repeat them.

Every new UI feature must be responsive by default.
