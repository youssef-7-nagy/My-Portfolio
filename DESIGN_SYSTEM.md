# Permanent Global Design System & Official Color Palette

> **PERMANENT ARCHITECTURAL STANDARD (Single Source of Truth)**  
> This document establishes the official and permanent visual identity of Youssef Nagy's personal portfolio website.  
> ALL developers, contributors, and AI coding agents MUST strictly follow these specifications for every new page, section, component, widget, modal, and animation.

---

## 1. The 6 Official Colors (Immutable Palette)

The foundation of the entire website consists of **ONLY** these six official colors.  
These HEX values are permanent and immutable. **Never approximate, modify, replace, or introduce alternative shades.**

| Color Name | HEX Code | RGB Channels | Intended Usage |
|---|---|---|---|
| **Warm Yellow** | `#F4D35E` | `244, 211, 94` | Primary accents, highlights, active states, important details, notifications |
| **Ocean Teal** | `#3C6E71` | `60, 110, 113` | Secondary sections, interactive buttons, visual accents, icons, links |
| **Deep Steel Blue** | `#284B63` | `40, 75, 99` | Primary brand color, dark sections, headings, cards, elevated surfaces |
| **Light Gray** | `#D9D9D9` | `217, 217, 217` | Subtle backgrounds, borders, dividers, secondary text surfaces, muted tracks |
| **Black** | `#000000` | `0, 0, 0` | Main text (light mode), deep background (dark mode), high contrast elements |
| **White** | `#FFFFFF` | `255, 255, 255` | Main background (light mode), text on dark surfaces, clean negative spaces |

---

## 2. Centralized CSS Variables & Design Tokens

All colors are declared in [`src/index.css`](file:///src/index.css) at `:root` and scoped for light mode in `[data-theme='light']`.

### Base Color Tokens
```css
:root {
  --color-warm-yellow: #F4D35E;
  --color-ocean-teal: #3C6E71;
  --color-deep-steel-blue: #284B63;
  --color-light-gray: #D9D9D9;
  --color-black: #000000;
  --color-white: #FFFFFF;

  /* RGB variants for transparent glassmorphic overlays and drop-shadows */
  --color-warm-yellow-rgb: 244, 211, 94;
  --color-ocean-teal-rgb: 60, 110, 113;
  --color-deep-steel-blue-rgb: 40, 75, 99;
  --color-light-gray-rgb: 217, 217, 217;
  --color-black-rgb: 0, 0, 0;
  --color-white-rgb: 255, 255, 255;
}
```

### Semantic Design Tokens
Always consume semantic variables rather than hardcoding hex values:

| Semantic Token | Dark Mode Mapping | Light Mode Mapping |
|---|---|---|
| `--color-primary` | `var(--color-deep-steel-blue)` | `var(--color-deep-steel-blue)` |
| `--color-secondary` | `var(--color-ocean-teal)` | `var(--color-ocean-teal)` |
| `--color-accent` | `var(--color-warm-yellow)` | `var(--color-warm-yellow)` |
| `--color-background` | `var(--color-black)` | `var(--color-white)` |
| `--color-surface` | `rgba(var(--color-deep-steel-blue-rgb), 0.18)` | `rgba(var(--color-light-gray-rgb), 0.45)` |
| `--color-surface-hover` | `rgba(var(--color-ocean-teal-rgb), 0.22)` | `rgba(var(--color-ocean-teal-rgb), 0.08)` |
| `--color-text` | `var(--color-white)` | `var(--color-black)` |
| `--color-text-muted` | `var(--color-light-gray)` | `rgba(var(--color-deep-steel-blue-rgb), 0.78)` |
| `--color-border` | `rgba(var(--color-light-gray-rgb), 0.16)` | `rgba(var(--color-light-gray-rgb), 0.85)` |
| `--color-border-accent` | `rgba(var(--color-warm-yellow-rgb), 0.4)` | `rgba(var(--color-ocean-teal-rgb), 0.4)` |

---

## 3. Mandatory Rules for Developers & AI Agents

1. **Zero Foreign Colors**: Never use random hex, rgb, or hsl values like `#10b981`, `#06b6d4`, `#8b5cf6`, `#ff5f56`, `#25d366`, etc.
2. **Opacity & Overlays**: If a lighter or darker variation of a color is needed, achieve it strictly through alpha blending using the RGB channels (e.g. `rgba(var(--color-ocean-teal-rgb), 0.15)`).
3. **Component Hover & Active States**:
   - Primary interactive elements (buttons, active nav links, pills) highlight with `var(--color-warm-yellow)` or `var(--color-ocean-teal)`.
   - Cards and containers elevate with borders using `var(--color-border-accent)` and shadows with `var(--shadow-glow)`.
4. **Theme Compatibility**: All components must look pristine in both Dark mode (default) and Light mode (`[data-theme='light']`).
5. **No Layout or Structural Regressions**: Preserving responsiveness (from 320px mobile to 4K ultrawide) and animations is mandatory.

