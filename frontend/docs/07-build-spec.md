# CribSeekers — Build Specification

## Folder structure

```text
src/
  routes/                    file-based routes (see docs/02 §4)
  components/
    ui/                      shadcn primitives
    layout/                  SiteHeader, SiteFooter, AuthLayout, AppShell, PageHeader
    property/                PropertyCard, PropertyGallery, FilterBar
    common/                  EmptyState, ErrorState, LoadingState, StatCard, SubmitButton
    forms/                   PasswordInput, PhoneInput, OtpInput
  lib/
    api/
      client.ts              fetch wrapper: base URL, auth header, refresh, error normalisation
      types.ts               shared DTOs
      auth.ts                auth endpoint functions
      properties.ts          property + search endpoint functions
    auth/
      auth-context.tsx       AuthProvider, useAuth
      storage.ts             token persistence (client-only)
      roles.ts               role list, labels, home routes
    validation/
      auth-schemas.ts        Zod schemas for every auth form
    format.ts                currency, date, number helpers
  hooks/                     useLogin, useRegister, useProperties, …
```

## API conventions

- Base URL from `import.meta.env.VITE_API_BASE_URL`, defaulting to
  `https://cribseekers.onrender.com/api/v1`.
- One `apiFetch<T>` entry point: JSON headers, bearer token, unwraps `{ success, data }`, throws a
  typed `ApiError { status, message, errors }`.
- A 401 triggers exactly one `POST /auth/refresh` and a single retry; a second failure clears the
  session and dispatches a logout.
- Endpoint functions are thin and typed; components never call `fetch` directly.

## Query conventions

Keys: `['auth','me']`, `['properties','list',params]`, `['properties','detail',id]`,
`['reference','categories']`. GETs retry twice (never on 4xx); mutations never retry.
`staleTime`: reference `Infinity`, lists 60 s, dashboards 30 s, messages 0.
Every mutation invalidates its list and detail keys and fires a toast.

## Forms

React Hook Form + `zodResolver`, `mode: 'onBlur'`. Server 422 errors are mapped back onto fields via
`setError`. Submit buttons are disabled while pending and show a spinner.

## Auth wiring

`AuthProvider` in `__root.tsx` reads tokens after mount (never during SSR render), hydrates via
`GET /auth/me`, and exposes `{ user, status, login, register, logout }`. Role routes are gated by a
`RequireRole` guard that renders the 403 state rather than redirecting between roles.

## Route rules

Every route defines `head()` with a unique title, description, `og:title`, `og:description`.
Dynamic segments use `$param` and `<Link to params>` — never string interpolation. Filters and
pagination live in URL search params.

## State coverage checklist (per page)

Loading skeleton matching the final layout · empty state with a primary action · error state with
retry · permission gate · mobile layout at 375 px · keyboard operable · unique metadata.
