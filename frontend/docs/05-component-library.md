# CribSeekers — Component Library

Base primitives come from shadcn/ui in `src/components/ui`. This document covers the CribSeekers
composites built on top. Every component: **props · variants · states · accessibility · responsive.**

## Layout

| Component | Notes |
| --- | --- |
| `SiteHeader` | Public top nav. Props: none. Sticky, blurred background on scroll, sheet drawer below `md`. |
| `SiteFooter` | Link columns, legal row, social. |
| `AuthLayout` | Split-screen wrapper. Props: `title`, `subtitle`, `children`, `footer`. Brand panel hidden below `lg`. |
| `AppShell` | Sidebar + header + content for role portals. Props: `role`, `children`. |
| `PageHeader` | Props: `title`, `description?`, `action?`, `breadcrumbs?`. |
| `Section` | Consistent vertical rhythm wrapper. Props: `id?`, `className?`. |

## Content

| Component | Props | Notes |
| --- | --- | --- |
| `PropertyCard` | `property`, `saved?`, `onToggleSave?`, `variant: 'grid' \| 'list'` | Image (lazy, 4:3), price, title, location, bed/bath/area, verification badge, heart. Hover lifts 2 px. |
| `PropertyCardSkeleton` | — | Matches `PropertyCard` dimensions exactly. |
| `PropertyGallery` | `images`, `title` | Main image + thumbnails, lightbox dialog, arrow-key navigation. |
| `StatCard` | `label`, `value`, `icon`, `trend?`, `tone?` | Dashboard KPI. |
| `ChartCard` | `title`, `children`, `action?` | Recharts container with a fixed aspect ratio. |
| `DataTable` | `columns`, `rows`, `loading`, `empty` | Sortable headers; below `md` each row renders as a stacked card. |
| `VerificationBadge` | `status: verified \| pending \| unverified` | Icon + label; never colour-only. |
| `PriceTag` | `amount`, `period?` | ₦ formatting via `Intl.NumberFormat('en-NG')`. |
| `EmptyState` | `icon`, `title`, `description`, `action?` | |
| `ErrorState` | `title?`, `description?`, `onRetry` | |
| `LoadingState` | `variant: 'page' \| 'card' \| 'list'` | |

## Forms

| Component | Props | Notes |
| --- | --- | --- |
| `FormField` | shadcn form wrapper | Label, control, description, error; error is `aria-describedby`-linked. |
| `PasswordInput` | `strength?` | Show/hide toggle with an accessible label; optional strength meter. |
| `PhoneInput` | | `+234` prefix, normalises `0…` to `+234…`. |
| `OtpInput` | `length = 6`, `onComplete` | Auto-advance, paste support, clears on error. |
| `RoleCard` | `role`, `title`, `description`, `icon` | Link card with focus ring. |
| `SubmitButton` | `pending`, `children` | Spinner + disabled + `aria-busy`. |
| `FilterBar` | `values`, `onChange` | Sticky on desktop; opens a sheet below `md`. |

## Feedback

`toast` from sonner — success, error, and info variants; error toasts include a retry action where
the mutation is safely repeatable. `ConfirmDialog` for destructive actions
(`title`, `description`, `confirmLabel`, `onConfirm`, `destructive?`).

## Rules

- No hardcoded colour utilities — semantic tokens only.
- Every interactive element has a visible `focus-visible` ring.
- Every image has meaningful `alt`; decorative images use `alt=""`.
- Animations respect `prefers-reduced-motion`.
