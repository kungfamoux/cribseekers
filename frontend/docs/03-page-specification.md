# CribSeekers — Page Specification

Format per page: **Purpose · Route · Endpoints · Components · Actions · Permissions · States ·
Responsive · Acceptance criteria.**

Stage 2 covers the Public and Authentication pages in full. Role-portal pages are specified at
portal level here and expanded to page level as each portal is built.

---

## PUBLIC

### Welcome / Landing

- **Route:** `/` · **Permissions:** public.
- **Endpoints:** `GET /properties/featured`, `GET /properties/categories`.
- **Components:** Hero with headline + inline search bar, trust strip (verified listings, escrow,
  inspections), featured property grid, "How it works" 3-step, role cards linking to
  `/auth/signup/$role`, testimonial band, CTA band, footer.
- **Actions:** search submit → `/search?q=…`; role card → signup; "Get started" → `/auth/role`.
- **States:** featured grid → 6 skeleton cards; empty → hide the section entirely; error → hide the
  section, never block the page.
- **Responsive:** hero text centres and shrinks below `md`; featured grid 1 / 2 / 3 columns.
- **Acceptance:** unique `head()` metadata, single `h1`, search reaches `/search` with the query
  preserved, no layout shift when featured data lands.

### Search

- **Route:** `/search` · state in URL search params (`q, city, state, minPrice, maxPrice, bedrooms,
  bathrooms, type, purpose, sort, page`).
- **Endpoints:** `GET /properties`, `GET /search/suggestions`, `GET /properties/categories|types|purposes`.
- **Components:** sticky filter bar, filter sheet on mobile, result count, sort select, property
  card grid, pagination, saved-search CTA.
- **States:** loading → 9 card skeletons (filters stay interactive); empty → illustration +
  "No properties match these filters" + "Clear all filters"; error → retry card.
- **Acceptance:** every filter change writes to the URL; back restores the previous result set;
  filters persist across reload.

### Property details

- **Route:** `/property/$id` · **Endpoints:** `GET /properties/:id`, save toggle, inspection create.
- **Components:** gallery with lightbox, title/price/location header, verification badge, key facts
  grid, description, amenities, map placeholder, agent/landlord card, "Book inspection" and
  "Message" CTAs, similar properties.
- **Permissions:** public read; save and inspection CTAs redirect unauthenticated users to
  `/auth/login?redirect=<current>`.
- **States:** loading → gallery + text skeleton; 404 → `notFound()` with "Browse properties".
- **Acceptance:** metadata includes the property title and the primary image as `og:image`.

### About · Contact · FAQ · Help · Legal

Static content routes, each with unique `head()`, a single `h1`, and prose styling. Contact has a
Zod-validated form (name, email, subject, message) with a success state replacing the form.

---

## AUTHENTICATION

Shared layout: split screen — brand/imagery panel on `lg+`, form card centred on mobile; back link
to `/`; footer legal links.

### Role selection — `/auth/role`

Five role cards (icon, title, one-line value prop) → `/auth/signup/$role`. Keyboard-navigable,
cards are links not divs. Footer: "Already have an account? Log in".

### Signup — `/auth/signup/$role`

- **Endpoint:** `POST /auth/register`.
- **Fields:** first name, last name, email, phone, password, confirm password, terms checkbox,
  plus role extras (Agent: agency name, license; Developer: company name, RC number; Landlord:
  property count).
- **Validation:** per `docs/01` §Authentication. Password strength meter; show/hide toggle.
- **States:** submitting → disabled form + spinner; 409 → inline "This email is already registered"
  with a login link; 422 → field errors; success → `/auth/verify-email?email=…`.
- **Acceptance:** invalid `$role` param renders `notFound()`; role is displayed in the heading.

### Login — `/auth/login`

Email, password, remember me, forgot-password link. Honors `?redirect=`. Errors surface above the
form. Success routes by role.

### Forgot password — `/auth/forgot-password`

Email field → success panel ("If an account exists, we've sent a reset link") regardless of result.
Resend disabled for 60 s.

### Reset password — `/auth/reset-password?token=…`

New password + confirm, strength meter. Missing/expired token → error state linking back to forgot
password. Success → toast + `/auth/login`.

### Verify email — `/auth/verify-email` · Verify phone — `/auth/verify-phone`

6-digit OTP input (auto-advance, paste support), resend with a 60 s cooldown, "change email/phone"
link back to signup. Wrong code clears the field and announces the error via `aria-live`.
Email success → phone verification (if pending) → dashboard.

---

## ROLE PORTALS (portal-level spec; expanded per build phase)

Shared shell for all six: sidebar (role-filtered), header (breadcrumbs, search, bell, profile menu),
mobile bottom nav, content area with a page header (title, description, primary action).

| Portal | Pages |
| --- | --- |
| Buyer | Dashboard, Search, Property details, Saved, Inspections, Wallet, Escrow, Messages, Notifications, Profile, Settings |
| Tenant | Dashboard, My rentals, Rent payments, Wallet, Escrow, Maintenance, Inspections, Messages, Notifications, Settings |
| Landlord | Dashboard, My properties, Create property, Analytics, Tenants, Rent collection, Escrow, Wallet, Messages, Notifications, Settings |
| Agent | Dashboard, Listings, Leads, Clients, Appointments, Deals, Commissions, Messages, Notifications, Settings |
| Developer | Dashboard, Projects, Units, Construction, Reservations, Sales, Reports, Messages, Notifications, Settings |
| Admin | Dashboard, Users, Moderation, Verifications, Analytics, Audit logs, Settings, Support |

Every portal page must define: purpose, its endpoint set from `docs/01`, loading skeleton matching
the final layout, an empty state with a primary action, an error state with retry, permission
gating, and a mobile layout.
