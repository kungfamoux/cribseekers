# CribSeekers — Frontend Product Specification (FPS)

## 1. Executive summary

**Vision.** CribSeekers is Nigeria's trust layer for property. Buyers, tenants, landlords, agents
and developers transact on one platform where every listing is verified, every inspection is
scheduled and tracked, and every naira moves through a wallet and escrow the platform can vouch for.

**Goals.** (1) Make discovery fast and honest. (2) Make inspections a real, bookable, verified
event. (3) Make money movement safe by default via escrow. (4) Give supply-side roles a real
operations console, not a listing form.

**Users.** Buyer, Tenant, Landlord, Agent, Developer, Admin.

**Platforms.** Responsive web, mobile-first. Breakpoints: `sm 640` · `md 768` · `lg 1024` ·
`xl 1280` · `2xl 1536`. Mobile gets bottom navigation; ≥ lg gets a persistent sidebar.

**Design principles.** Trust over decoration · one primary action per screen · never a blank
white screen (skeleton, empty state or error, always) · money and verification states are always
explicit · Nigerian context first (₦, states/LGAs, local phone formats).

**Tech stack.** TanStack Start + TanStack Router (file routes), TanStack Query, React Hook Form +
Zod, Tailwind v4 semantic tokens, shadcn/ui, Recharts, sonner.

**Performance goals.** LCP < 2.5 s on 4G, route-level code splitting, image lazy loading,
skeletons within 100 ms, list virtualisation past 100 rows.

**Accessibility goals.** WCAG 2.1 AA: 4.5:1 text contrast, full keyboard operability, visible
focus rings, labelled controls, `aria-live` for async status.

---

## 2. User roles

| Role | Core job | Home route |
| --- | --- | --- |
| Buyer | Find and secure a property to purchase | `/buyer` |
| Tenant | Rent, pay rent, get maintenance done | `/tenant` |
| Landlord | List, fill and monetise properties | `/landlord` |
| Agent | Work listings, leads and commissions | `/agent` |
| Developer | Sell units across projects | `/developer` |
| Admin | Moderate, analyse, govern | `/admin` |

**Buyer.** Search, save, compare, request inspections, make offers, fund a wallet, pay through
escrow, message sellers. Restricted from any property-management, admin or agent pipeline surface.
Dashboard widgets: saved count, upcoming inspections, active offers, escrow balance, recommendations.

**Tenant.** My rentals/leases, rent schedule and payments, maintenance requests, inspections,
wallet, escrow, messages. Restricted from listing creation and admin. Widgets: next rent due,
lease countdown, open maintenance tickets, wallet balance.

**Landlord.** Property CRUD and media, verification status, analytics (views, enquiries,
conversion), tenants, rent collection, maintenance queue, inspections, escrow, wallet.
Widgets: portfolio value, occupancy rate, rent collected this month, arrears, pending inspections.

**Agent.** Agency profile, listings, leads, clients, appointments, deals pipeline, commissions.
Widgets: active listings, new leads, appointments today, pipeline value, commission earned.

**Developer.** Projects, units inventory, construction progress, reservations, sales, marketing,
reports. Widgets: units sold vs available, reservation pipeline, revenue, construction milestones.

**Admin.** User management, property moderation queue, verification approvals, platform analytics,
audit logs, system settings, support. Every admin action is audit-logged.

**Permission model.** A single `role` on the user plus route-level gating. `/(role)` subtrees are
guarded; the sidebar renders only permitted items; a direct URL hit on a foreign role's route
renders the 403 state rather than redirecting (no loops).

---

## 3. Product modules

Authentication · Buyer Portal · Tenant Portal · Landlord Portal · Agent Portal · Developer Portal ·
Property Discovery · Search · Wallet · Escrow · Inspection · Messaging · Notifications · Analytics ·
Settings · Admin · Support.

---

## 4. Information architecture

```text
Public
  /                     Welcome / landing
  /about  /contact  /faq  /help  /legal
  /search               Property search
  /property/$id         Property details

Authentication
  /auth/role            Role selection
  /auth/signup/$role    buyer | tenant | landlord | agent | developer
  /auth/login
  /auth/forgot-password
  /auth/reset-password
  /auth/verify-email
  /auth/verify-phone

Buyer      /buyer  · /search · /saved · /inspections · /wallet · /escrow · /messages
                   · /notifications · /profile · /settings
Tenant     /tenant · /rentals · /rent · /wallet · /escrow · /maintenance · /inspections
                   · /messages · /notifications · /settings
Landlord   /landlord · /properties · /properties/new · /analytics · /tenants · /rent-collection
                   · /escrow · /wallet · /messages · /notifications · /settings
Agent      /agent · /listings · /leads · /clients · /appointments · /deals · /commissions · …
Developer  /developer · /projects · /units · /construction · /reservations · /sales · /reports · …
Admin      /admin · /users · /moderation · /analytics · /audit · /settings
```

---

## 5. Navigation system

- **Public top nav:** logo, Search, About, Help, "Log in", "Get started" (primary). Collapses to a
  sheet drawer below `md`.
- **App sidebar (≥ lg):** role-filtered items with icons, active state from the current pathname,
  collapsible to an icon rail, sign-out pinned at the bottom.
- **Mobile bottom nav (< lg):** the five highest-value items for the role; the rest live behind "More".
- **App header:** breadcrumbs, global search, notification bell with unread dot, profile menu
  (Profile, Settings, Sign out).
- **Quick actions:** role-specific primary CTA in the header (Landlord "Add property", Buyer
  "Book inspection").

---

## 6. Authentication flow

```text
Welcome → Choose role → Register → Verify email → Verify phone → Role dashboard
Login → (unverified? → verification) → Role dashboard
Forgot password → email sent → Reset password → Login
Session: access token in memory + storage, refresh token in storage.
401 → single silent refresh → retry; second failure → clear session → /auth/login + "Session expired".
Logout → cancel queries → clear cache → clear tokens → /auth/login (history replace).
```

Role routing after auth: `buyer → /buyer`, `tenant → /tenant`, `landlord → /landlord`,
`agent → /agent`, `developer → /developer`, `admin → /admin`.

---

## 7. State management

- **Server state:** TanStack Query only. Query keys namespaced `['module', 'resource', params]`.
- **Session:** React context (`AuthProvider`) holding user + tokens, hydrated from storage after
  mount (never during SSR render) and refreshed via `GET /auth/me`.
- **UI state:** local `useState`; filters and pagination live in URL search params so views are
  shareable and back/forward works.
- **Forms:** React Hook Form, Zod resolver, no global form state.

---

## 8. Business rules

Properties are only publicly visible once `status = published` **and** `verification = verified`.
Escrow releases require both parties' confirmation or an admin ruling. Wallet withdrawals require a
verified bank account and a verified phone. Inspections can be rescheduled twice, then must be
cancelled and rebooked. Messaging is only permitted between parties with a shared property context.
Rent is overdue the day after the due date and triggers an arrears state on both dashboards.

---

## 9. Error handling

| Case | UI |
| --- | --- |
| 400 / 422 | Field-level messages from `errors`, form scrolls to the first invalid field |
| 401 | Silent refresh, then forced logout with "Session expired" toast |
| 403 | Full-page "You don't have access to this area" + link to the user's dashboard |
| 404 | Route `notFoundComponent` with a relevant back-link |
| 429 | Toast quoting `Retry-After`, submit disabled for the interval |
| 500 | Error boundary card with "Try again" (invalidate + reset) |
| Offline | Sticky banner + queued retry once online |

---

## 10. Notifications

In-app bell (polled every 60 s, unread dot), toast for the result of every mutation, plus
email/SMS/push handled by the backend. Preferences per channel live in Settings.

---

## 11. Performance · security · accessibility · responsive

**Performance:** route-level splitting, `loading="lazy"` + explicit dimensions on images, infinite
scroll on search, prefetch on link intent, skeletons everywhere, cached reference data.

**Security:** tokens never logged; no secrets in the client bundle beyond `VITE_API_BASE_URL`;
all input Zod-validated before submit; uploads restricted by MIME and size; sensitive values
(bank accounts, BVN) masked in the UI; no PII in URLs.

**Accessibility:** semantic landmarks, one `h1` per page, keyboard-reachable dialogs with focus
trap and restore, `aria-live="polite"` on loading/success regions, no colour-only status encoding.

**Responsive:** mobile single column + bottom nav; tablet two columns; laptop sidebar + content;
desktop sidebar + content + right rail; large desktop capped at `max-w-screen-2xl`.

---

## 12. Beta acceptance criteria

Every feature ships with: functional requirements met, states covered (loading / empty / error /
success), keyboard operable, AA contrast, mobile layout verified at 375 px, and no console errors.
