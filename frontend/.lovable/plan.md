## CribSeekers — Phase 1 & 2

Two stages: write the blueprint documents into the repo, then build the Public + Auth slice against your existing `/api/v1` backend.

### Stage 1 — Specification documents (`/docs`)

Written as markdown in the project so they stay versioned alongside the code.

1. `docs/01-endpoint-inventory.md` — every endpoint from your audit as a table: method, route, purpose, auth/role, request, response, validation, frontend page, loading/error/success handling.
2. `docs/02-frontend-product-spec.md` — the FPS: product vision, the six roles (Buyer, Tenant, Landlord, Agent, Developer, Admin) with permissions and allowed pages, product modules, full sitemap/information architecture, navigation system, auth flow, business rules, state management, error handling, notifications, performance, security, accessibility, responsive breakpoints.
3. `docs/03-page-specification.md` — per page: purpose, route, API endpoints, components, actions, permissions, loading/error/empty/success states, responsive layout, acceptance criteria. Ordered by role portal.
4. `docs/04-dashboard-specification.md` — widgets, KPIs, tables, charts, quick actions and recent activity per role dashboard.
5. `docs/05-component-library.md` — every reusable component with props, variants, states, accessibility, responsive behaviour.
6. `docs/06-design-system.md` — colors, typography, spacing, radius, elevation, motion, dark mode, all expressed as the tokens the app actually uses.
7. `docs/07-build-spec.md` — the consolidated build instructions (folder structure, API conventions, hooks, permissions, animations) that drives implementation.

These are written densely and precisely rather than padded to a page count — the goal is that every later page can be built from them without guessing. They will be produced across several passes since the volume is large; Stage 2 does not wait on documents 3–7 being exhaustive for non-auth roles.

### Stage 2 — Public + Auth implementation

Routes (TanStack Router, file-based under `src/routes/`):

```text
/                     Welcome / landing (replaces placeholder)
/about  /contact  /faq  /help  /legal
/search               Public property search
/property/$id         Public property details
/auth/role            Role selection
/auth/signup/$role    Buyer | Tenant | Landlord | Agent | Developer
/auth/login
/auth/forgot-password
/auth/reset-password
/auth/verify-email
/auth/verify-phone
```

Each route gets its own `head()` with unique title, description and OG tags.

Foundation built in this stage:

- Design system tokens in `src/styles.css` (real estate palette, typography scale, radius, motion) — no hardcoded colors in components.
- Shared layout shell: top nav, mobile drawer, footer, auth split-screen layout.
- Typed API client in `src/lib/api/` reading `VITE_API_BASE_URL`, with `/api/v1` prefixing, bearer-token attachment, refresh-token retry on 401, and normalized error shape.
- React Query hooks per endpoint (`useLogin`, `useRegister`, `useVerifyEmail`, …) with loading, error and success handling wired to toasts.
- Zod schemas per form, shared with the FPS validation rules; inline field errors, disabled/pending submit states.
- Auth context + token storage, role-based post-login routing to the correct dashboard path, session-expiry handling.
- Skeleton loaders, empty states and error states for search and property details.

### Technical notes

- Backend base URL comes from `VITE_API_BASE_URL`; I'll default it to your API host once you confirm it — until then it points at a configurable placeholder and every call goes through the single client.
- No Lovable Cloud: auth state is JWT from your backend held in memory + refresh token in storage.
- Role dashboards (Buyer, Tenant, Landlord, Agent, Developer, Admin) are Stage 3+, one portal per follow-up, built from documents 3 and 4.
- Since your pasted spec was truncated, the endpoint inventory will be complete for auth/public and marked `TBD` where the source document cut off; paste or upload the remaining parts and I'll fill them in.  
the backend url [https://cribseekers.onrender.com/api/v1/](https://cribseekers.onrender.com/api/v1/)