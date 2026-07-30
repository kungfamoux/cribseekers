# CribSeekers — Design System

Direction: **warm, grounded, Nigerian real estate** — deep forest green as the trust colour, warm
sand as the surface, terracotta as the accent for money and urgency. Not another blue SaaS.

## Colour tokens (`src/styles.css`, oklch)

| Token | Light | Role |
| --- | --- | --- |
| `--background` | warm off-white sand | page |
| `--foreground` | near-black green-grey | body text |
| `--card` / `--popover` | white | surfaces |
| `--primary` | deep forest green | primary actions, brand |
| `--secondary` | pale sand | secondary surfaces |
| `--accent` | warm terracotta | money, highlights, urgency |
| `--muted` / `--muted-foreground` | sand / warm grey | supporting text |
| `--success` | green | verified, paid |
| `--warning` | amber | pending, due soon |
| `--destructive` | red | overdue, errors, delete |
| `--border` / `--input` / `--ring` | sand borders / green ring | |

A dark theme mirrors every token. Charts use `--chart-1…5` derived from the green/terracotta family.
Extra tokens: `--gradient-hero`, `--shadow-card`, `--shadow-elevated`.

**Rule:** components never use `text-white`, `bg-black` or arbitrary hex. Only semantic utilities
(`bg-primary`, `text-muted-foreground`, `border-border`, `bg-success/10`).

## Typography

Display/headings: **Sora**. Body/UI: **DM Sans**. Both loaded via `<link>` in `__root.tsx` and
registered as `--font-display` / `--font-sans` in `@theme`.

Scale: `display 3rem/1.05 · h1 2.25rem · h2 1.75rem · h3 1.375rem · body 1rem/1.6 · small 0.875rem ·
caption 0.75rem`. Headings `font-display` + tight tracking; body `font-sans`.

## Spacing, grid, radius, elevation

4 px base scale. Page gutters `1rem` mobile / `1.5rem` md / `2rem` lg. Content capped at
`max-w-screen-2xl`. Section rhythm `py-16` mobile, `py-24` lg.
Radius `--radius: 0.75rem` (`sm` 0.5, `lg` 0.75, `xl` 1, `2xl` 1.25 rem).
Elevation: `--shadow-card` for resting cards, `--shadow-elevated` for hover/dialogs; never both.

## Components

Buttons: `default` (primary), `accent`, `secondary`, `outline`, `ghost`, `destructive`;
sizes `sm | default | lg`; pending state shows a spinner and keeps the label width.
Cards: `bg-card`, `border-border`, `--shadow-card`, `rounded-xl`, `p-6`.
Inputs: `h-11`, `rounded-lg`, `border-input`, focus ring `ring-2 ring-ring/40`, error state
`border-destructive` plus a message.
Tables: sticky header, zebra-free, `border-b border-border` rows, stacked cards below `md`.
Badges: `verified` (success tint), `pending` (warning tint), `unverified` (muted), each with an icon.

## Motion

Durations 150 ms (micro) / 250 ms (transitions) / 400 ms (entrances), easing
`cubic-bezier(0.22, 1, 0.36, 1)`. Card hover lifts 2 px. Page and list entrances fade-and-rise 8 px,
staggered 40 ms. Skeletons pulse. Everything is disabled under `prefers-reduced-motion: reduce`.

## Dark mode

`.dark` class on `<html>`, all tokens re-declared. Contrast verified at AA in both themes.
