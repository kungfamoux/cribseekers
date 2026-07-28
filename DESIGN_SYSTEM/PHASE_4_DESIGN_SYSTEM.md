# CribSeekers Design System
## Phase 4: Design System

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document defines the foundational design system for CribSeekers, establishing typography, color, spacing, grid, elevation, and other core design tokens. The system ensures consistency, scalability, and a premium user experience across all touchpoints.

**Design Philosophy:**  
- Elegant and premium  
- Minimal and modern  
- Accessible and inclusive  
- Nigerian context with global appeal  
- Mobile-first, responsive by default

**Inspiration:** Airbnb, Apple, Stripe, Linear, Notion, Zillow

---

# Typography System

## Font Families

### Primary Font: DM Sans
**Use:** Body text, UI elements, data, labels  
**Characteristics:** Modern, geometric, highly legible  
**Weights:** 400, 500, 600, 700

### Secondary Font: Playfair Display
**Use:** Headlines, display text, branding  
**Characteristics:** Elegant, serif, premium feel  
**Weights:** 500, 600, 700 (italic available)

### Monospace Font: JetBrains Mono
**Use:** Code, data, numbers, timestamps  
**Characteristics:** Clean, technical, consistent  
**Weights:** 400, 500

---

## Type Scale

### Display Scale (Headlines)

| Token | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| `display-hero` | 64px | 600 | 1.1 | -2.5px | Landing page hero |
| `display-xl` | 56px | 600 | 1.15 | -2px | Page titles |
| `display-lg` | 48px | 600 | 1.2 | -1.5px | Section headers |
| `display-md` | 40px | 600 | 1.25 | -1px | Subsection headers |
| `display-sm` | 32px | 600 | 1.3 | -0.5px | Card titles |

### Heading Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| `heading-xl` | 28px | 600 | 1.35 | -0.5px | Page headings |
| `heading-lg` | 24px | 600 | 1.4 | -0.25px | Section headings |
| `heading-md` | 20px | 600 | 1.45 | 0 | Card headings |
| `heading-sm` | 18px | 600 | 1.5 | 0 | Subheadings |
| `heading-xs` | 16px | 600 | 1.5 | 0 | Small headings |

### Body Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| `body-lg` | 18px | 400 | 1.6 | 0 | Lead paragraphs |
| `body-md` | 16px | 400 | 1.6 | 0 | Body text |
| `body-sm` | 14px | 400 | 1.6 | 0 | Secondary text |
| `body-xs` | 12px | 400 | 1.5 | 0.25px | Captions, labels |

### UI Scale

| Token | Size | Weight | Line Height | Letter Spacing | Use Case |
|-------|------|--------|-------------|----------------|----------|
| `ui-lg` | 16px | 500 | 1.5 | 0 | Buttons, links |
| `ui-md` | 14px | 500 | 1.5 | 0 | Small buttons |
| `ui-sm` | 12px | 500 | 1.5 | 0.25px | Tags, badges |
| `ui-xs` | 11px | 500 | 1.4 | 0.5px | Tiny labels |

---

## Typography Usage Guidelines

### Hierarchy Rules
1. **One H1 per page** - Use `display-xl` or `heading-xl`
2. **Logical progression** - Don't skip scale levels
3. **Contrast matters** - Lighter weights for secondary text
4. **Line height** - Increase for longer text blocks

### Font Weight Usage
- **400 (Regular)** - Body text, descriptions
- **500 (Medium)** - UI elements, emphasis
- **600 (Semi-bold)** - Headlines, important labels
- **700 (Bold)** - Rare, for strong emphasis only

### Letter Spacing
- **Negative** - Large headlines (tighter, more elegant)
- **Zero** - Most text (natural spacing)
- **Positive** - Small text (improved legibility)

---

# Color System

## Color Philosophy

**Primary Palette:** Forest greens inspired by Nigerian nature  
**Secondary Palette:** Warm golds for accents and CTAs  
**Neutral Palette:** Sophisticated grays for structure  
**Semantic Palette:** Clear meanings for actions and states

---

## Primary Colors

### Forest Green (Brand)

| Token | Hex | RGB | HSL | Use Case |
|-------|-----|-----|-----|----------|
| `forest-900` | #0d2f27 | 13, 47, 39 | 165, 57%, 12% | Brand, primary actions |
| `forest-800` | #173b33 | 23, 59, 51 | 165, 44%, 16% | Dark brand elements |
| `forest-700` | #284b43 | 40, 75, 67 | 165, 31%, 22% | Hover states |
| `forest-600` | #3d665c | 61, 102, 92 | 165, 25%, 32% | Active states |
| `forest-500` | #4a7a6f | 74, 122, 111 | 165, 25%, 38% | Links, accents |
| `forest-400` | #6e8c82 | 110, 140, 130 | 165, 12%, 49% | Secondary accents |
| `forest-300` | #9ab5ab | 154, 181, 171 | 165, 15%, 66% | Tertiary accents |
| `forest-200` | #dce8d4 | 220, 232, 212 | 165, 27%, 87% | Light backgrounds |
| `forest-100` | #e8f2e8 | 232, 242, 232 | 165, 33%, 93% | Subtle backgrounds |
| `forest-50` | #f2f7f2 | 242, 247, 242 | 165, 20%, 96% | Very light backgrounds |

---

## Secondary Colors

### Gold (Accent)

| Token | Hex | RGB | HSL | Use Case |
|-------|-----|-----|-----|----------|
| `gold-900` | #8a5e2a | 138, 94, 42 | 35, 53%, 35% | Dark accents |
| `gold-700` | #b8823e | 184, 130, 62 | 35, 50%, 48% | Primary accents |
| `gold-500` | #e8a553 | 232, 165, 83 | 35, 77%, 62% | CTAs, highlights |
| `gold-300` | #f0c990 | 240, 201, 144 | 35, 78%, 75% | Light accents |
| `gold-100` | #fcf0e0 | 252, 240, 224 | 35, 79%, 93% | Subtle highlights |
| `gold-50` | #fef9f4 | 254, 249, 244 | 35, 100%, 98% | Very light highlights |

---

## Neutral Colors

### Gray Scale

| Token | Hex | RGB | HSL | Use Case |
|-------|-----|-----|-----|----------|
| `gray-900` | #1a1a1a | 26, 26, 26 | 0, 0%, 10% | Primary text |
| `gray-800` | #2d2d2d | 45, 45, 45 | 0, 0%, 18% | Headings |
| `gray-700` | #4a4a4a | 74, 74, 74 | 0, 0%, 29% | Secondary text |
| `gray-600` | #6e6e6e | 110, 110, 110 | 0, 0%, 43% | Tertiary text |
| `gray-500` | #9a9a9a | 154, 154, 154 | 0, 0%, 60% | Disabled text |
| `gray-400` | #b8b8b8 | 184, 184, 184 | 0, 0%, 72% | Borders |
| `gray-300` | #d4d4d4 | 212, 212, 212 | 0, 0%, 83% | Dividers |
| `gray-200` | #e8e8e8 | 232, 232, 232 | 0, 0%, 91% | Light borders |
| `gray-100` | #f5f5f5 | 245, 245, 245 | 0, 0%, 96% | Backgrounds |
| `gray-50` | #fafafa | 250, 250, 250 | 0, 0%, 98% | Subtle backgrounds |

---

## Semantic Colors

### Success (Green)

| Token | Hex | Use Case |
|-------|-----|----------|
| `success-500` | #10b981 | Success states, confirmations |
| `success-100` | #d1fae5 | Success backgrounds |

### Warning (Amber)

| Token | Hex | Use Case |
|-------|-----|----------|
| `warning-500` | #f59e0b | Warning states, alerts |
| `warning-100` | #fef3c7 | Warning backgrounds |

### Error (Red)

| Token | Hex | Use Case |
|-------|-----|----------|
| `error-500` | #ef4444 | Error states, destructive actions |
| `error-100` | #fee2e2 | Error backgrounds |

### Info (Blue)

| Token | Hex | Use Case |
|-------|-----|----------|
| `info-500` | #3b82f6 | Information states |
| `info-100` | #dbeafe | Info backgrounds |

---

## Background Colors

### Surface Colors

| Token | Hex | Use Case |
|-------|-----|----------|
| `surface-primary` | #fffefa | Primary surface (cream white) |
| `surface-secondary` | #f8f7f2 | Secondary surface |
| `surface-tertiary` | #f2f7f2 | Tertiary surface |
| `surface-elevated` | #ffffff | Elevated cards |
| `surface-overlay` | rgba(13, 47, 39, 0.95) | Modal overlays |

---

## Text Colors

| Token | Hex | Use Case |
|-------|-----|----------|
| `text-primary` | #173b33 | Primary text |
| `text-secondary` | #4a4a4a | Secondary text |
| `text-tertiary` | #6e6e6e | Tertiary text |
| `text-disabled` | #9a9a9a | Disabled text |
| `text-inverse` | #ffffff | Text on dark backgrounds |
| `text-link` | #284b43 | Link text |
| `text-link-hover` | #0d2f27 | Link hover |

---

## Border Colors

| Token | Hex | Use Case |
|-------|-----|----------|
| `border-default` | #e4e6de | Default borders |
| `border-strong` | #d4d4d4 | Strong borders |
| `border-subtle` | #f0f0f0 | Subtle borders |
| `border-focus` | #0d2f27 | Focus borders |
| `border-error` | #ef4444 | Error borders |

---

## Color Usage Guidelines

### Contrast Ratios (WCAG AA)
- **Normal text (14px+):** 4.5:1 minimum
- **Large text (18px+):** 3:1 minimum
- **UI components:** 3:1 minimum

### Color Combinations
- **Primary actions:** `forest-900` on white
- **Secondary actions:** `forest-500` on white
- **Destructive actions:** `error-500` on white
- **Success states:** `success-500` on white
- **Warning states:** `warning-500` on white

### Dark Mode Considerations
- Invert light/dark values
- Maintain contrast ratios
- Adjust saturation for readability
- Preserve brand identity

---

# Spacing System

## 8pt Grid System

All spacing values are multiples of 8px to ensure consistency and rhythm.

### Spacing Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `space-0` | 0px | No spacing |
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Extra small spacing |
| `space-3` | 12px | Small spacing |
| `space-4` | 16px | Base spacing |
| `space-5` | 20px | Medium spacing |
| `space-6` | 24px | Large spacing |
| `space-8` | 32px | Extra large spacing |
| `space-10` | 40px | Section spacing |
| `space-12` | 48px | Component spacing |
| `space-16` | 64px | Section separation |
| `space-20` | 80px | Major sections |
| `space-24` | 96px | Page sections |
| `space-32` | 128px | Hero sections |

---

## Spacing Usage Guidelines

### Component Internal Spacing
- **Buttons:** `space-3` (12px) horizontal, `space-2` (8px) vertical
- **Cards:** `space-6` (24px) padding
- **Inputs:** `space-3` (12px) padding
- **Modals:** `space-8` (32px) padding

### Component External Spacing
- **Between cards:** `space-4` (16px)
- **Between sections:** `space-12` (48px)
- **Between form fields:** `space-4` (16px)
- **Between list items:** `space-3` (12px)

### Layout Spacing
- **Page margins:** `space-6` (24px) mobile, `space-12` (48px) desktop
- **Section margins:** `space-16` (64px)
- **Container padding:** `space-6` (24px) mobile, `space-12` (48px) desktop

---

# Border Radius System

## Radius Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `radius-none` | 0px | Sharp corners |
| `radius-sm` | 4px | Small elements |
| `radius-md` | 8px | Buttons, inputs |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Large cards |
| `radius-2xl` | 24px | Modals |
| `radius-3xl` | 32px | Hero elements |
| `radius-full` | 9999px | Circular elements |

---

## Radius Usage Guidelines

### Component Radius
- **Buttons:** `radius-md` (8px)
- **Inputs:** `radius-md` (8px)
- **Cards:** `radius-lg` (12px)
- **Modals:** `radius-2xl` (24px)
- **Avatars:** `radius-full` (circular)
- **Badges:** `radius-sm` (4px)
- **Tooltips:** `radius-sm` (4px)

### Consistency Rules
- Use same radius for similar components
- Larger radius for larger elements
- Smaller radius for compact elements
- Avoid mixing radius values in same context

---

# Shadow & Elevation System

## Elevation Scale

| Token | Shadow | Use Case |
|-------|--------|----------|
| `elevation-0` | none | Base level |
| `elevation-1` | 0 1px 3px rgba(13, 47, 39, 0.12) | Hover states |
| `elevation-2` | 0 4px 6px rgba(13, 47, 39, 0.10) | Cards |
| `elevation-3` | 0 10px 15px rgba(13, 47, 39, 0.10) | Raised cards |
| `elevation-4` | 0 20px 25px rgba(13, 47, 39, 0.15) | Modals |
| `elevation-5` | 0 25px 50px rgba(13, 47, 39, 0.25) | Dropdowns |

---

## Shadow Usage Guidelines

### Elevation Hierarchy
1. **Base:** No shadow (inline elements)
2. **Hover:** `elevation-1` (interactive elements)
3. **Cards:** `elevation-2` (content cards)
4. **Raised:** `elevation-3` (important cards)
5. **Overlays:** `elevation-4` (modals, drawers)
6. **Floating:** `elevation-5` (dropdowns, tooltips)

- Use shadows to establish hierarchy
- Don't overuse shadows in same context
- Consider ambient light direction
- Test on dark backgrounds

---

# Grid System

## Container System

### Breakpoints

| Breakpoint | Min Width | Max Width | Columns | Gutter | Use Case |
|------------|-----------|-----------|---------|--------|----------|
| `xs` | 320px | 479px | 4 | 16px | Mobile small |
| `sm` | 480px | 639px | 4 | 16px | Mobile large |
| `md` | 640px | 767px | 8 | 24px | Tablet portrait |
| `lg` | 768px | 1023px | 8 | 24px | Tablet landscape |
| `xl` | 1024px | 1279px | 12 | 24px | Desktop small |
| `2xl` | 1280px | 1439px | 12 | 32px | Desktop |
| `3xl` | 1440px+ | - | 12 | 32px | Desktop large |

### Container Widths

| Breakpoint | Container Width |
|------------|----------------|
| `xs` - `sm` | 100% (16px margins) |
| `md` - `lg` | 100% (24px margins) |
| `xl` | 1200px max |
| `2xl` | 1280px max |
| `3xl` | 1440px max |

---

## Column System

### 12-Column Grid

| Columns | Span | Percentage | Use Case |
|---------|------|------------|----------|
| 1 | 1/12 | 8.33% | Tiny elements |
| 2 | 2/12 | 16.67% | Small elements |
| 3 | 3/12 | 25% | Quarter width |
| 4 | 4/12 | 33.33% | Third width |
| 5 | 5/12 | 41.67% | Custom |
| 6 | 6/12 | 50% | Half width |
| 7 | 7/12 | 58.33% | Custom |
| 8 | 8/12 | 66.67% | Two-thirds |
| 9 | 9/12 | 75% | Three-quarters |
| 10 | 10/12 | 83.33% | Custom |
| 11 | 11/12 | 91.67% | Custom |
| 12 | 12/12 | 100% | Full width |

---

## Grid Usage Guidelines

### Responsive Behavior
- **Mobile first:** Start with single column
- **Progressive enhancement:** Add columns at breakpoints
- **Fluid widths:** Use percentages for flexibility
- **Max widths:** Constrain on large screens

### Common Patterns
- **2-column:** 6/12 + 6/12 (desktop)
- **3-column:** 4/12 + 4/12 + 4/12 (desktop)
- **4-column:** 3/12 + 3/12 + 3/12 + 3/12 (desktop)
- **Sidebar + Content:** 3/12 + 9/12 (desktop)
- **Asymmetric:** 4/12 + 8/12 (desktop)

---

# Icon System

## Icon Library

**Primary:** Lucide React  
**Characteristics:** Consistent stroke width, modern style, scalable

### Icon Sizes

| Token | Size | Use Case |
|-------|------|----------|
| `icon-xs` | 12px | Tiny icons, badges |
| `icon-sm` | 16px | Small icons, buttons |
| `icon-md` | 20px | Medium icons, labels |
| `icon-lg` | 24px | Large icons, cards |
| `icon-xl` | 32px | Extra large icons |
| `icon-2xl` | 48px | Display icons |

### Icon Weights

| Token | Stroke Width | Use Case |
|-------|-------------|----------|
| `icon-thin` | 1.5px | Subtle icons |
| `icon-regular` | 2px | Default icons |
| `icon-bold` | 2.5px | Emphasized icons |

---

## Icon Usage Guidelines

### Color Guidelines
- **Primary icons:** `forest-900` or `text-primary`
- **Secondary icons:** `gray-600` or `text-secondary`
- **Action icons:** `forest-500` or `gold-500`
- **Success icons:** `success-500`
- **Error icons:** `error-500`
- **Warning icons:** `warning-500`

### Spacing Guidelines
- **Icon + text:** `space-2` (8px) gap
- **Icon only:** No extra spacing
- **Icon groups:** `space-3` (12px) gap

---

# Animation System

## Animation Principles

- **Purposeful:** Animations should serve a function
- **Subtle:** Avoid distracting or jarring motions
- **Consistent:** Use similar timing across the app
- **Performant:** Use transforms and opacity
- **Respectful:** Honor user's motion preferences

---

## Timing Functions

| Token | Duration | Use Case |
|-------|----------|----------|
| `duration-instant` | 100ms | Instant feedback |
| `duration-fast` | 200ms | Quick transitions |
| `duration-normal` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Deliberate transitions |
| `duration-slower` | 700ms | Complex animations |

### Easing Functions

| Token | Easing | Use Case |
|-------|--------|----------|
| `ease-linear` | linear | Continuous motion |
| `ease-in` | cubic-bezier(0.4, 0, 1, 1) | Entering |
| `ease-out` | cubic-bezier(0, 0, 0.2, 1) | Exiting |
| `ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Both |
| `ease-bounce` | custom | Playful |

---

## Animation Types

### Transitions
- **Fade in/out:** Opacity change
- **Slide:** Transform translate
- **Scale:** Transform scale
- **Rotate:** Transform rotate

### Micro-interactions
- **Button press:** Scale down 0.95
- **Hover:** Scale up 1.05 or shadow increase
- **Focus:** Ring expansion
- **Loading:** Spinner or skeleton

### Page Transitions
- **Enter:** Fade in + slide up
- **Exit:** Fade out
- **Shared:** Shared element transition

---

## Animation Usage Guidelines

### Performance
- Use `transform` and `opacity` for 60fps
- Avoid animating `width`, `height`, `left`, `top`
- Use `will-change` sparingly
- Test on low-end devices

### Accessibility
- Respect `prefers-reduced-motion`
- Provide alternatives for motion-sensitive users
- Don't rely on animation for critical information
- Keep animations under 5 seconds

---

# Component States

## Button States

| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| Default | `forest-900` | White | None | `elevation-2` |
| Hover | `forest-800` | White | None | `elevation-3` |
| Active | `forest-700` | White | None | `elevation-1` |
| Disabled | `gray-300` | `gray-500` | None | None |
| Loading | `forest-900` | White | None | `elevation-2` |

## Input States

| State | Background | Text | Border | Focus Ring |
|-------|------------|------|--------|------------|
| Default | White | `text-primary` | `border-default` | None |
| Hover | White | `text-primary` | `border-strong` | None |
| Focus | White | `text-primary` | `border-focus` | `forest-200` |
| Error | `error-100` | `text-primary` | `error-500` | `error-200` |
| Disabled | `gray-100` | `text-disabled` | `border-subtle` | None |

## Card States

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| Default | White | `border-default` | `elevation-2` |
| Hover | White | `border-strong` | `elevation-3` |
| Active | `forest-50` | `border-focus` | `elevation-3` |
| Disabled | `gray-100` | `border-subtle` | `elevation-1` |

---

# Z-Index Scale

## Elevation Layers

| Token | Value | Use Case |
|-------|-------|----------|
| `z-dropdown` | 1000 | Dropdowns |
| `z-sticky` | 1020 | Sticky headers |
| `z-fixed` | 1030 | Fixed elements |
| `z-modal-backdrop` | 1040 | Modal backdrop |
| `z-modal` | 1050 | Modal content |
| `z-popover` | 1060 | Popovers |
| `z-tooltip` | 1070 | Tooltips |
| `z-notification` | 1080 | Notifications |
| `z-max` | 9999 | Maximum elevation |

---

# Glassmorphism

## Glass Effect Tokens

| Token | Background | Blur | Border | Use Case |
|-------|------------|------|--------|----------|
| `glass-light` | rgba(255, 255, 255, 0.7) | 20px | rgba(255, 255, 255, 0.3) | Light glass |
| `glass-medium` | rgba(255, 255, 255, 0.85) | 20px | rgba(255, 255, 255, 0.5) | Medium glass |
| `glass-dark` | rgba(13, 47, 39, 0.8) | 20px | rgba(255, 255, 255, 0.1) | Dark glass |

---

## Glassmorphism Usage Guidelines

### When to Use
- Over complex backgrounds
- Navigation overlays
- Floating elements
- Modal backdrops

### When NOT to Use
- Over solid backgrounds
- For critical information
- On low-performance devices
- When accessibility is compromised

---

# Dark Mode

## Dark Mode Tokens

### Background Colors

| Token | Light | Dark |
|-------|-------|------|
| `surface-primary` | #fffefa | #1a1a1a |
| `surface-secondary` | #f8f7f2 | #2d2d2d |
| `surface-tertiary` | #f2f7f2 | #4a4a4a |
| `surface-elevated` | #ffffff | #3d3d3d |

### Text Colors

| Token | Light | Dark |
|-------|-------|------|
| `text-primary` | #173b33 | #f5f5f5 |
| `text-secondary` | #4a4a4a | #d4d4d4 |
| `text-tertiary` | #6e6e6e | #9a9a9a |

### Border Colors

| Token | Light | Dark |
|-------|-------|------|
| `border-default` | #e4e6de | #4a4a4a |
| `border-strong` | #d4d4d4 | #6e6e6e |
| `border-subtle` | #f0f0f0 | #3d3d3d |

---

## Dark Mode Guidelines

### Implementation
- Use CSS custom properties for theming
- Test all components in both modes
- Maintain contrast ratios
- Preserve brand identity

### Transition
- Smooth transition between modes (300ms)
- Respect system preference
- Provide manual toggle
- Persist user choice

---

# Accessibility

## Focus States

### Focus Indicators

| Token | Outline | Offset | Use Case |
|-------|---------|--------|----------|
| `focus-ring` | 2px solid `forest-900` | 2px | Default focus |
| `focus-ring-inset` | 2px solid `forest-900` | -2px | Inset focus |
| `focus-ring-error` | 2px solid `error-500` | 2px | Error focus |

---

## Screen Reader Support

### ARIA Labels
- All interactive elements need labels
- Icon-only buttons need `aria-label`
- Form fields need associated labels
- Live regions for dynamic content

### Semantic HTML
- Use proper heading hierarchy
- Use landmarks (header, main, nav, footer)
- Use list semantics
- Use button/link semantics correctly

---

## Keyboard Navigation

### Tab Order
- Logical left-to-right, top-to-bottom
- Skip navigation link
- Focus traps in modals
- Visible focus indicators

### Keyboard Shortcuts
- **Escape:** Close modals/dropdowns
- **Enter:** Submit forms/activate buttons
- **Space:** Toggle checkboxes/buttons
- **Arrow keys:** Navigate lists/grids

---

# Design Tokens Summary

## Token Categories

1. **Typography:** Font families, sizes, weights, line heights, letter spacing
2. **Color:** Primary, secondary, neutral, semantic, backgrounds, text, borders
3. **Spacing:** 8pt grid scale, component spacing, layout spacing
4. **Border Radius:** Radius scale for rounded corners
5. **Shadows:** Elevation scale for depth
6. **Grid:** Breakpoints, containers, columns
7. **Icons:** Sizes, weights, colors
8. **Animation:** Durations, easing functions, types
9. **States:** Button, input, card states
10. **Z-Index:** Elevation layers
11. **Glassmorphism:** Glass effect tokens
12. **Dark Mode:** Color mappings
13. **Accessibility:** Focus states, ARIA, keyboard

---

## Token Naming Convention

### Format
`{category}-{variant}-{modifier}`

### Examples
- `color-forest-900`
- `spacing-space-4`
- `font-size-heading-lg`
- `border-radius-lg`
- `shadow-elevation-2`
- `animation-duration-normal`

---

# Implementation Guidelines

## CSS Custom Properties

### Root Variables
```css
:root {
  /* Colors */
  --color-forest-900: #0d2f27;
  --color-forest-500: #4a7a6f;
  --color-gold-500: #e8a553;
  
  /* Spacing */
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  
  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-size-heading-xl: 28px;
  
  /* Border Radius */
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Shadows */
  --shadow-2: 0 4px 6px rgba(13, 47, 39, 0.10);
  --shadow-3: 0 10px 15px rgba(13, 47, 39, 0.10);
}
```

---

## Design System Maintenance

### Version Control
- Semantic versioning (MAJOR.MINOR.PATCH)
- Document all changes
- Communicate breaking changes
- Provide migration guides

### Governance
- Design system team ownership
- Regular review cycles
- Community contribution process
- Adoption metrics tracking

---

# Next Steps

**Phase 5:** Component Library  
- Define component specifications  
- Create component documentation  
- Establish component patterns  
- Document component states  

---

**End of Phase 4: Design System**
