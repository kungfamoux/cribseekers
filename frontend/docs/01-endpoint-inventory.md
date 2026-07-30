# CribSeekers — Backend Endpoint Inventory

**Base URL:** `https://cribseekers.onrender.com/api/v1`
**Auth:** `Authorization: Bearer <accessToken>` on all non-public routes.
**Envelope (assumed, normalised by the client):**

```jsonc
{ "success": true, "data": { /* payload */ }, "message": "…" }
{ "success": false, "message": "…", "errors": { "field": ["…"] }, "statusCode": 422 }
```

Status legend: **Confirmed** = present in the backend audit. **TBD** = the pasted audit was
truncated; shape must be confirmed against the live API before wiring.

---

## 1. Health (public)

| Method | Route | Purpose | Frontend page |
| --- | --- | --- | --- |
| GET | `/health` | Service health | — (dev only) |
| GET | `/health/live` | Liveness probe | — |
| GET | `/health/ready` | Readiness probe | — |

---

## 2. Authentication

### POST `/auth/register`

- **Purpose:** Create an account for a selected role.
- **Auth:** Public.
- **Frontend page:** `/auth/signup/$role` (Buyer, Tenant, Landlord, Agent, Developer).
- **Request:** `{ firstName, lastName, email, phone, password, role, acceptedTerms }`
  plus role extras — Landlord: `{ propertyCount? }`; Agent: `{ agencyName, licenseNumber? }`;
  Developer: `{ companyName, rcNumber? }`.
- **Response:** `{ user, accessToken?, refreshToken?, requiresEmailVerification, requiresPhoneVerification }`.
- **Validation:** names 2–50; email RFC + max 255; phone Nigerian format `+234XXXXXXXXXX` or
  `0XXXXXXXXXX`; password ≥ 8 with upper, lower, digit; `confirmPassword` must match;
  `acceptedTerms` must be true.
- **Loading:** submit button shows spinner + "Creating account…", all fields disabled.
- **Errors:** 409 duplicate email/phone → inline field error; 422 → map `errors` onto fields;
  network/5xx → destructive toast with retry.
- **Success:** store tokens if returned → navigate to `/auth/verify-email?email=…`.

### POST `/auth/login`

- **Purpose:** Authenticate an existing user.
- **Auth:** Public.
- **Frontend page:** `/auth/login`.
- **Request:** `{ email, password, rememberMe? }`.
- **Response:** `{ user: { id, firstName, lastName, email, phone, role, emailVerified, phoneVerified, avatarUrl }, accessToken, refreshToken, expiresIn }`.
- **Validation:** email required + format; password required.
- **Loading:** disabled form, spinner on submit.
- **Errors:** 401 → "Incorrect email or password" above the form (never reveal which field);
  403 unverified → redirect to the matching verification page; 429 → "Too many attempts, try again in a moment".
- **Success:** persist session → route by role (see `docs/02`, §Role routing).

### POST `/auth/logout`

Auth required. Clears the server session. Frontend clears tokens and query cache regardless of
the response, then navigates to `/auth/login`.

### POST `/auth/refresh`

- **Request:** `{ refreshToken }` → **Response:** `{ accessToken, refreshToken, expiresIn }`.
- Called automatically by the API client on a 401, once per request; a second failure forces logout
  and a "Your session expired" toast.

### POST `/auth/forgot-password`

Public. `{ email }` → `{ message }`. Page `/auth/forgot-password`. Always renders the same
success state whether or not the email exists (no account enumeration).

### POST `/auth/reset-password`

Public. `{ token, password, confirmPassword }` → `{ message }`. Page `/auth/reset-password`
(token read from the `token` search param). 400/410 invalid or expired token → error state with a
link back to `/auth/forgot-password`. Success → toast + redirect to `/auth/login`.

### POST `/auth/verify-email`

`{ email, code }` (6-digit OTP) → `{ verified: true }`. Page `/auth/verify-email`.
Errors: 400 wrong code → shake the OTP field, clear it; 410 expired → prompt resend.
Success → `/auth/verify-phone` if the phone is unverified, otherwise the role dashboard.

### POST `/auth/resend-email-code`

`{ email }` → `{ message }`. 60-second cooldown enforced client-side on the resend button.

### POST `/auth/verify-phone` · POST `/auth/resend-phone-code`

Same contract as the email pair, keyed on `phone`. Page `/auth/verify-phone`.
Success → role dashboard.

### GET `/auth/me`

Auth required. Returns the current user. Used to hydrate the session on app boot; a 401 clears
tokens silently and leaves the user logged out (no error toast on boot).

### POST `/auth/change-password`

Auth required. `{ currentPassword, password, confirmPassword }`. Page `Settings → Security`.

---

## 3. Public property & search

| Method | Route | Purpose | Frontend page | Notes |
| --- | --- | --- | --- | --- |
| GET | `/properties` | Paginated listings | `/search` | Query: `page, limit, q, city, state, minPrice, maxPrice, bedrooms, bathrooms, type, purpose, category, sort` |
| GET | `/properties/:id` | Single property | `/property/$id` | 404 → `notFound()` |
| GET | `/properties/featured` | Featured carousel | `/` | Cached 5 min |
| GET | `/search` | Global search | `/search` | |
| GET | `/search/suggestions` | Typeahead | Search bar | Debounced 300 ms, min 2 chars |
| GET | `/search/locations` | Location lookup | Search filters | |
| GET | `/properties/categories` · `/types` · `/purposes` | Filter reference data | `/search` | Cached 1 h, `staleTime: Infinity` |

Search list contract: `{ items: Property[], total, page, limit, totalPages }`.
Loading → 9 property-card skeletons. Empty → "No properties match these filters" + "Clear filters".
Error → inline retry card, filters stay intact.

---

## 4. Role-scoped dashboards (authenticated)

All require a bearer token and the matching role; a 403 renders the shared "You don't have access
to this area" state.

**Buyer:** `GET /buyer/dashboard`, `/buyer/recommendations`, `/buyer/saved-properties`,
`/buyer/offers`, `/buyer/comparisons`, `/buyer/inspections`.

**Tenant:** `GET /tenant/dashboard`, `/tenant/leases`, `/tenant/applications`,
`/tenant/maintenance`, `/tenant/payments`, `/tenant/inspections`.

**Landlord:** `GET /landlord/dashboard`, `/landlord/properties`, `/landlord/tenants`,
`/landlord/analytics`, `/landlord/rent-collection`, `/landlord/maintenance`,
`/landlord/inspections`.

**Agent:** `GET /agent/dashboard`, `/agent/listings`, `/agent/leads`, `/agent/clients`,
`/agent/commissions`, `/agent/appointments`, `/agent/deals`.

**Developer:** `GET /developer/dashboard`, `/developer/projects`, `/developer/units`,
`/developer/sales`, `/developer/reservations`, `/developer/construction`.

**Admin:** users, moderation, analytics, audit logs, system settings — **TBD**.

---

## 5. Shared modules

| Module | Endpoints | Frontend surface |
| --- | --- | --- |
| Profile | `GET/PATCH /users/me`, `POST /users/me/avatar` | Profile, Settings |
| Properties (write) | `POST /properties`, `PATCH /properties/:id`, `DELETE /properties/:id`, `POST /properties/:id/media` | Create/Edit Property |
| Saved | `POST/DELETE /properties/:id/save` | Property card heart, Saved page |
| Inspections | `POST /inspections`, `GET /inspections`, `PATCH /inspections/:id/confirm|reschedule|cancel`, `POST /inspections/:id/feedback`, `GET /inspections/:id/qr`, `POST /inspections/:id/otp` | Inspections |
| Wallet | `GET /wallet`, `GET /wallet/transactions`, `POST /wallet/fund`, `POST /wallet/withdraw`, bank accounts CRUD | Wallet |
| Escrow | `GET /escrow`, `GET /escrow/:id`, `POST /escrow`, `POST /escrow/:id/release|dispute` | Escrow |
| Payments | `POST /payments/initialize`, `GET /payments/verify/:reference`, invoices, receipts | Wallet, Rent, Escrow |
| Messaging | `GET /conversations`, `GET /conversations/:id/messages`, `POST /messages`, attachments, typing, read receipts, reactions, block | Messages |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read`, `POST /notifications/read-all`, preferences | Notifications |
| Files | `POST /files/upload`, `DELETE /files/:id` | Any upload |

Exact request/response shapes for §5 are **TBD** pending the untruncated audit; the API client
exposes them through typed module files so filling them in is a single-file change per module.

---

## 6. Cross-cutting conventions

- **Retry:** GET requests retry twice with exponential backoff; mutations never retry.
- **Cache:** reference data `staleTime: Infinity`; dashboards 30 s; lists 60 s; messages/notifications 0 with polling.
- **401:** one silent refresh, then forced logout.
- **403:** permission-denied state, no redirect loop.
- **404:** `notFound()` on detail routes.
- **429:** surfaces the `Retry-After` header in the toast copy.
- **Offline / network failure:** "You appear to be offline" banner + retry button.
