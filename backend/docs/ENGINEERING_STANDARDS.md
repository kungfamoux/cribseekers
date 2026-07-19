# CribSeekers Engineering Standards v1.0

## Purpose

This manual is the mandatory engineering standard for all CribSeekers development. It applies to every application, package, module, feature, API endpoint, database change, UI surface, worker, and integration in this repository.

CribSeekers is a commercial SaaS platform. Code must be consistent, secure, testable, observable, maintainable, and easy for future teams to extend without rewriting foundations.

These standards do not replace product requirements. They define how product requirements must be implemented.

## 1. Project Philosophy

### Core Principles

CribSeekers uses a modular monolith architecture inside a Turborepo monorepo. Each domain is built as a cohesive module with clear boundaries, explicit contracts, and shared infrastructure only where it improves consistency.

Every implementation must follow these principles:

- SOLID: classes and modules must have focused responsibilities, depend on abstractions where useful, and remain open to extension without unsafe modification.
- DRY: shared logic belongs in reusable services, helpers, schemas, UI components, or packages. Do not duplicate business rules across controllers, services, clients, and forms.
- KISS: prefer simple, readable implementations over clever abstractions. Add patterns only when they reduce real complexity.
- Clean Architecture: business rules must not depend on HTTP, database, queues, or UI details. Controllers and pages orchestrate; services own use cases; repositories own persistence.
- Modular Monolith: domains live together in one deployable backend while preserving strong boundaries. Cross-module calls must go through exported services, public interfaces, events, or shared packages.
- Separation of Concerns: validation, authorization, persistence, business rules, logging, and presentation must remain separate.
- Dependency Injection: NestJS providers must receive dependencies through constructors. Avoid global mutable state and direct construction of complex dependencies.
- Domain-Driven Design: modules should map to business domains such as authentication, properties, payments, wallet, chat, notifications, inspections, users, and admin.
- Composition over Inheritance: compose small functions, services, decorators, hooks, and components. Use inheritance only for framework requirements or stable base behavior.

### Engineering Priorities

Prioritize in this order:

1. Correctness and security.
2. Clear domain boundaries.
3. Maintainable implementation.
4. Testability and observability.
5. Performance and scalability.
6. Developer experience.

## 2. Module Structure

Every backend domain module must follow this standard structure when applicable:

```text
apps/api/src/modules/<domain>/
├─ controllers/
├─ services/
├─ repositories/
├─ dto/
├─ entities/
├─ validators/
├─ guards/
├─ decorators/
├─ events/
├─ listeners/
├─ interfaces/
├─ constants/
├─ types/
├─ tests/
├─ <domain>.module.ts
└─ README.md
```

### Folder Purpose

- `controllers/`: HTTP controllers only. They validate transport-level concerns, call services, and return DTO-shaped responses.
- `services/`: application use cases and business workflows. Services coordinate repositories, events, queues, and external clients.
- `repositories/`: database access through Prisma. Repositories must not contain HTTP or presentation logic.
- `dto/`: request and response DTOs, query DTOs, command DTOs, and Swagger input/output classes.
- `entities/`: domain entities or domain-facing data models. Do not expose raw persistence models when a stable entity shape is required.
- `validators/`: custom validators, reusable validation helpers, and module-specific Zod schemas when they are not shared.
- `guards/`: module-specific authorization guards. Shared guards belong in `apps/api/src/common/guards`.
- `decorators/`: module-specific decorators. Shared decorators belong in `apps/api/src/common/decorators`.
- `events/`: event names and event payload definitions emitted by the module.
- `listeners/`: event handlers and queue-facing listeners.
- `interfaces/`: public contracts, dependency abstractions, and adapter interfaces.
- `constants/`: module constants, limits, cache keys, event names, and default values.
- `types/`: module-local TypeScript aliases and utility types.
- `tests/`: module tests, fixtures, factories, and test helpers.
- `<domain>.module.ts`: NestJS module registration and exported public providers.
- `README.md`: module overview, dependencies, API surface, events, permissions, and operational notes.

### Omission Rules

Omit folders that are not needed. Do not create empty folders to satisfy the shape.

Examples:

- A read-only reference module may not need `events/` or `listeners/`.
- A simple internal module may not need `guards/` or `decorators/`.
- Shared schemas used by multiple apps should live in `packages/validation`, not a module-local `validators/` folder.
- Shared UI components should live in `packages/ui`; app-specific components should remain inside the relevant app.

## 3. Naming Conventions

### Files and Folders

- Use kebab-case for file and folder names: `property-search.service.ts`, `create-listing.dto.ts`.
- Use singular names for domain folders unless the business term is naturally plural: `auth`, `wallet`, `properties`.
- Test files must use `.spec.ts` for unit tests and `.e2e-spec.ts` for end-to-end tests.
- Keep one primary class, component, schema, or provider per file unless a small companion type is tightly coupled.

### Backend Classes

- Controllers: `PropertiesController`, file `properties.controller.ts`.
- Services: `PropertiesService`, file `properties.service.ts`.
- Repositories: `PropertiesRepository`, file `properties.repository.ts`.
- DTOs: `CreatePropertyDto`, `UpdatePropertyDto`, `PropertyResponseDto`.
- Entities: `PropertyEntity`, `WalletEntity`.
- Guards: `PropertyOwnerGuard`.
- Decorators: `CurrentUser`, `RequirePermissions`.
- Events: `PropertyCreatedEvent`, `PaymentConfirmedEvent`.
- Listeners: `PropertyEventsListener`, `PaymentEventsListener`.

### Types, Interfaces, Enums, and Constants

- Interfaces: use PascalCase and describe capability or shape, such as `PaymentGateway`, `AuthenticatedUser`.
- Types: use PascalCase, such as `PropertySearchFilters`.
- Enums: use PascalCase enum names and UPPER_SNAKE_CASE values.
- Constants: use UPPER_SNAKE_CASE for exported constants.
- Avoid `I` prefixes for interfaces.

### Frontend

- React components: PascalCase file names for component files when the file exports a single component, such as `PropertyCard.tsx`.
- Hooks: `use` prefix and camelCase file names, such as `usePropertySearch.ts`.
- Route folders: lowercase or kebab-case following Next.js App Router conventions.
- Client services: kebab-case files, such as `property-service.ts`.

### Prisma and Database

- Prisma models: PascalCase singular, such as `User`, `Property`, `WalletTransaction`.
- Database tables: snake_case plural through Prisma `@@map`, such as `users`, `properties`, `wallet_transactions`.
- Columns: snake_case in the database, camelCase in Prisma fields where mapped.
- Indexes: `idx_<table>_<columns>`, such as `idx_properties_city_status`.
- Unique constraints: `uq_<table>_<columns>`.
- Foreign keys: `fk_<source_table>_<target_table>`.

### Environment Variables

- Use UPPER_SNAKE_CASE.
- Prefix external services where helpful: `PAYSTACK_SECRET_KEY`, `CLOUDINARY_API_SECRET`.
- Never commit real secrets.
- Every required variable must be documented in `.env.example`.

### Git

- Branches: `feature/<short-description>`, `fix/<short-description>`, `hotfix/<short-description>`, `chore/<short-description>`, `docs/<short-description>`.
- Commit messages must follow Conventional Commits: `feat: add property search filters`.
- Keep commits focused. Do not mix formatting, refactors, and feature work unless required by the same change.

## 4. TypeScript Standards

### Strictness

- TypeScript strict mode is mandatory.
- Avoid `any`. Use `unknown` for unknown values and narrow safely.
- Do not suppress type errors unless there is a documented framework limitation.

### Interfaces vs Types

- Use interfaces for object shapes intended to be implemented or extended.
- Use types for unions, intersections, mapped types, utility types, and function signatures.
- Do not duplicate a type and interface for the same shape.

### Readonly and Immutability

- Use `readonly` for DTO-like objects and immutable configuration.
- Prefer immutable transformations over in-place mutation.
- Do not mutate function arguments unless the function exists specifically to do so.

### Enums and Literals

- Prefer string literal unions for simple local choices.
- Use enums for shared domain concepts that benefit from stable named values.
- Keep enum values explicit strings.

### Generics and Utility Types

- Use generics when they improve reuse and preserve type information.
- Avoid generic abstractions that hide domain meaning.
- Use utility types such as `Pick`, `Omit`, `Partial`, `Readonly`, and `Record` when they keep types concise.

### Exports and Imports

- Export only public APIs from package entry points.
- Do not export internal module implementation details unless another module has a legitimate dependency.
- Prefer absolute workspace imports for shared packages, such as `@cribseekers/types`.
- Avoid deep imports across package boundaries.
- Order imports as: framework, third-party, workspace packages, local absolute imports, relative imports.

### Barrel Exports

- Barrel exports are allowed for package public APIs and component libraries.
- Avoid barrels inside complex backend modules when they obscure dependency direction or create circular imports.

### Null Safety

- Model nullable values explicitly.
- Validate inputs before use.
- Use optional chaining only when absence is expected.
- Avoid non-null assertions except in tests or after explicit guards.

## 5. Backend Standards (NestJS)

### Controllers

- Controllers must be thin.
- Controllers handle routing, request DTOs, authentication decorators, Swagger decorators, and response mapping.
- Controllers must not access Prisma directly.
- Controllers must not contain business rules.

### Services

- Services own use cases and business rules.
- Services should depend on repositories, queues, external-service abstractions, and other exported module services.
- Services must throw domain-appropriate exceptions instead of returning ambiguous failure values.

### Repositories

- Repositories are the only module layer that should access Prisma directly.
- Repositories must expose domain-specific methods, not generic database plumbing.
- Keep query construction readable and testable.
- Do not return sensitive fields unless explicitly required.

### Modules

- Every module must declare its providers explicitly.
- Export only providers that are part of the module public contract.
- Avoid circular module dependencies. Use events or shared abstractions if two modules need to communicate.

### DTOs and Validation

- Every request body, query, and route parameter must be validated.
- DTOs must be named by intent: `CreatePropertyDto`, `SearchPropertiesQueryDto`.
- Use Zod schemas in `packages/validation` for shared contracts and infer types where appropriate.
- Use NestJS validation pipes or a consistent Zod validation pipe at the boundary.

### Guards, Decorators, Middleware

- Authentication must be enforced by default unless an endpoint is explicitly public.
- Authorization must be explicit for protected resources.
- Use decorators to make route permissions readable.
- Middleware is for cross-cutting request concerns only, such as request IDs and raw request logging.

### Filters and Interceptors

- Use global exception filters for standard error responses.
- Use interceptors for response shaping, timing, and correlation metadata.
- Do not hide errors by converting all failures to success responses.

### Transactions

- Use Prisma transactions for multi-step writes that must succeed or fail together.
- Keep transaction blocks short.
- Do not perform slow external network calls inside a database transaction.

### Events and Queues

- Emit domain events after successful state changes.
- Event payloads must be typed.
- Queue jobs must be idempotent where possible.
- Job processors must log failures and include retry strategy.

### Logging

- Use the shared logger service.
- Include request ID, user ID when available, module, operation, and relevant resource IDs.
- Never log passwords, tokens, secrets, full payment card data, or private messages unless explicitly redacted.

### Swagger

- Every public API endpoint must have Swagger metadata.
- Document auth requirements, request DTOs, response DTOs, errors, and pagination.

## 6. Frontend Standards (Next.js)

### App Router

- Use the Next.js App Router for routes, layouts, loading states, errors, and not-found states.
- Keep route files focused on composition and data loading.
- Put reusable UI outside route files.

### Server and Client Components

- Prefer Server Components by default.
- Use Client Components only for interactivity, browser APIs, local state, effects, forms, and event handlers.
- Keep `"use client"` boundaries as small as possible.

### Layouts, Loading, and Errors

- Every major route group must provide consistent layouts.
- Use `loading.tsx` for meaningful loading states.
- Use `error.tsx` for recoverable route-level errors.
- Use `not-found.tsx` for missing resources.

### Feature Organization

Feature-specific frontend code should be organized by domain when it grows beyond a single route:

```text
src/features/<feature>/
├─ components/
├─ hooks/
├─ services/
├─ schemas/
├─ types/
└─ utils/
```

Small route-only components may live near the route until they become reusable.

### Hooks

- Hooks must start with `use`.
- Keep data-fetching hooks separate from presentation components.
- Do not hide critical side effects inside generic hooks.

### Forms

- Use React Hook Form for non-trivial forms.
- Use Zod for form schemas.
- Display field-level errors and form-level errors.
- Disable submit or show pending state while requests are in progress.

### API Services and React Query

- Use shared API clients where available.
- Use TanStack Query for server state, caching, retries, and invalidation.
- Query keys must be stable, structured, and domain-specific.
- Mutations must invalidate or update affected queries.

### Components

- Shared components belong in `packages/ui`.
- App-specific components belong in the app that owns them.
- Components must receive data through props and avoid implicit global dependencies.
- Keep visual components separate from data-fetching containers when complexity grows.

### State Management

- Server state belongs in TanStack Query.
- URL state belongs in route params or search params.
- Local UI state belongs in React state.
- Global client state must be justified and scoped.

## 7. Database Standards

### Prisma

- Prisma is the standard database access layer.
- Schema changes must be reviewed with the same care as application code.
- Do not bypass Prisma with raw SQL unless necessary for performance or unsupported features.
- Raw SQL must be parameterized.

### Migrations

- Use migrations for persistent schema changes.
- Migration names must be descriptive: `add_property_verification_status`.
- Never edit an applied production migration.
- Include rollback strategy in the pull request description when a migration is risky.

### Naming

- Prisma model names use PascalCase singular.
- Database tables use snake_case plural.
- Relation fields must be descriptive.

### IDs, Audit Fields, and Soft Deletes

- Use UUIDs for public-facing identifiers.
- Standard audit fields: `createdAt`, `updatedAt`.
- Use `deletedAt` for soft deletes where records must be recoverable or retained for audit.
- Never expose internal sequential IDs if they leak business-sensitive information.

### Indexes and Constraints

- Add indexes for foreign keys, frequent filters, search filters, and sort fields.
- Add unique constraints for business uniqueness, not just UI convenience.
- Avoid over-indexing write-heavy tables.

### Transactions

- Use transactions for writes that must remain consistent across multiple tables.
- Avoid long-running transactions.

### Seed Data

- Seed data must be deterministic.
- Do not include real user data or production secrets.
- Keep demo data realistic enough to support local testing.

## 8. API Standards

### REST Conventions

- Use nouns for resources: `/api/v1/properties`, `/api/v1/wallet/transactions`.
- Use HTTP methods correctly:
  - `GET` reads data.
  - `POST` creates resources or triggers commands.
  - `PATCH` partially updates resources.
  - `PUT` replaces resources only when full replacement is intended.
  - `DELETE` deletes or soft deletes resources.
- Avoid verbs in URLs unless modeling a domain command, such as `/api/v1/payments/verify`.

### Versioning

- All public API routes must be versioned under `/api/v1`.
- Breaking changes require a new version or a compatibility plan.

### Pagination, Filtering, Sorting, Searching

- Pagination must use standard query fields: `page`, `limit`.
- Filtering fields must be explicit and documented.
- Sorting must use `sortBy` and `sortOrder`.
- Search must use `q` unless a more specific name is required.
- Maximum `limit` must be enforced server-side.

### Response Format

Successful responses must follow a consistent envelope:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "meta": {
    "requestId": "request-id"
  }
}
```

Paginated responses must include pagination metadata:

```json
{
  "success": true,
  "message": "Resources fetched successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "requestId": "request-id"
  }
}
```

### Error Format

Errors must follow:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": []
  },
  "meta": {
    "requestId": "request-id"
  }
}
```

### Status Codes

- `200`: successful read or update.
- `201`: successful creation.
- `204`: successful action with no body.
- `400`: malformed request or validation failure.
- `401`: unauthenticated.
- `403`: authenticated but not authorized.
- `404`: resource not found.
- `409`: conflict with current state.
- `422`: semantically invalid input.
- `429`: rate limit exceeded.
- `500`: unexpected server failure.

### Authentication and Idempotency

- Use `Authorization: Bearer <token>` for JWT authentication.
- Mutating payment and wallet endpoints must support idempotency keys.
- Idempotency keys should use the `Idempotency-Key` header.

## 9. Validation Standards

### Zod Usage

- Shared schemas belong in `packages/validation`.
- Backend DTOs and frontend forms should reuse the same schema when the contract is shared.
- Use schema inference to reduce duplicated TypeScript types.

### DTO Validation

- Validate all request bodies, params, and queries.
- Trim and normalize strings where appropriate.
- Enforce maximum lengths, numeric ranges, enum values, and required fields.

### Input Sanitization

- Sanitize user-generated HTML.
- Normalize emails and phone numbers consistently.
- Reject unexpected fields for sensitive operations.

### Output Validation

- Do not return raw database records from controllers.
- Shape responses through response DTOs or mappers.
- Remove sensitive fields before returning data.

### Error Messages

- Validation messages must be specific and safe.
- Do not reveal internal implementation details.
- Use consistent field names matching API contracts.

## 10. Error Handling

### Strategy

Errors must be explicit, typed where practical, logged with context, and returned in the standard API error format.

### Error Categories

- Validation errors: return `400` or `422` with field-level details.
- Business errors: return `409`, `422`, or domain-appropriate status codes.
- Authentication errors: return `401`.
- Authorization errors: return `403`.
- Not found errors: return `404` without leaking whether hidden resources exist.
- Database errors: map known constraint failures to `409` or `400`; unexpected failures become `500`.
- External service errors: return a safe message and log provider context.
- Queue errors: log job ID, job name, payload identifiers, attempt count, and failure reason.

### Rules

- Never expose stack traces to clients.
- Never swallow errors silently.
- Use domain-specific error codes.
- Preserve request IDs across error responses and logs.

## 11. Logging

### Log Levels

- `debug`: local troubleshooting and non-production detail.
- `info`: normal lifecycle events, startup, completed operations.
- `warn`: recoverable problems and suspicious behavior.
- `error`: failed operations requiring attention.
- `fatal`: unrecoverable process-level failures.

### Required Context

Logs should include:

- `requestId`
- `userId` when available
- `module`
- `operation`
- relevant resource IDs
- elapsed time for external calls and expensive operations

### Request Logging

- Log incoming request method, path, status, duration, and request ID.
- Do not log full request bodies by default.

### Audit Logging

Audit security-sensitive and financially sensitive actions:

- login and logout
- password changes
- role and permission changes
- property approval decisions
- wallet transactions
- payment verification
- admin actions

### Sensitive Data Masking

Mask or omit:

- passwords
- JWTs and refresh tokens
- API keys and secrets
- OTPs
- payment card data
- private message contents unless explicitly required and redacted

## 12. Security

### Authentication

- Use short-lived JWT access tokens.
- Use refresh tokens with rotation and revocation.
- Store refresh tokens securely and hash server-side token identifiers when persisted.

### Passwords

- Hash passwords with a strong adaptive algorithm such as Argon2 or bcrypt.
- Never log passwords.
- Enforce minimum password strength.

### Authorization

- Use RBAC as the baseline.
- Use permission checks for sensitive actions.
- Resource ownership must be verified server-side.
- Admin routes must require admin-specific authorization.

### API Security

- Enable CORS only for trusted origins.
- Use Helmet or equivalent secure headers.
- Apply rate limiting to authentication, OTP, payment, upload, and search-heavy endpoints.
- Validate and sanitize all inputs.
- Prevent SQL injection by using Prisma and parameterized raw SQL.
- Prevent XSS by escaping output and sanitizing user-generated content.
- Use CSRF protection where cookie-based authentication or sensitive browser flows are introduced.

### File Uploads

- Validate file type, size, and extension.
- Store files outside the application runtime where possible.
- Scan or reject dangerous formats.
- Use signed URLs for private assets.

### Secrets

- Secrets must come from environment variables or a secure secret manager.
- `.env.example` may contain placeholder values only.
- Rotate secrets after exposure.

## 13. Testing

### Test Types

- Unit tests: service methods, validators, pure functions, guards, mappers, and components.
- Integration tests: repositories, module flows, API-client behavior, and database-backed use cases.
- End-to-end tests: critical user journeys and API flows.

### Standards

- Tests must be deterministic.
- Tests must not depend on production services.
- Mock external providers at the boundary.
- Prefer factories over repeated inline test objects.
- Use fixtures for realistic multi-entity scenarios.

### Naming and Structure

- Unit tests: `<file>.spec.ts`.
- E2E tests: `<feature>.e2e-spec.ts`.
- Test descriptions must state expected behavior.
- Module tests belong in the module `tests/` folder or beside the file when the local convention requires it.

### Coverage Expectations

- Critical business modules require meaningful coverage before merge.
- Authentication, authorization, payments, wallet, and property verification require unit and integration coverage.
- Coverage numbers do not replace high-quality assertions.

## 14. Documentation

Every module must include a `README.md` covering:

- module purpose
- public API endpoints
- key services and exported providers
- permissions and roles
- events emitted and consumed
- database models touched
- external services used
- operational risks and known limitations

Every public endpoint must have Swagger documentation.

Architecture notes are required when:

- a module introduces a new domain concept
- data consistency is non-trivial
- external providers are involved
- security or payment behavior changes
- background jobs or events are introduced

Examples must be included for complex API requests and expected responses.

## 15. Definition of Done

A module or feature is complete only when all applicable items are satisfied:

- Code builds successfully.
- Lint passes.
- Type checking passes.
- Tests pass.
- Swagger documentation is updated.
- Module documentation is updated.
- Input validation is implemented.
- Output shaping is implemented.
- Authorization is implemented.
- Logging is added.
- Error handling follows project standards.
- Database migrations are included when required.
- API responses follow the standard response format.
- Sensitive data is protected.
- Observability is sufficient for production support.
- Frontend loading, empty, error, and success states are handled.
- Accessibility is considered for user-facing UI.

## 16. Code Review Checklist

Every pull request must satisfy this checklist before merge:

### Architecture

- The change belongs in the correct app, package, and module.
- Module boundaries are respected.
- Business logic is not placed in controllers, pages, or UI components.
- Shared logic is extracted only when reuse is real.
- No circular dependencies are introduced.

### Backend

- Controllers are thin.
- Services own use cases.
- Repositories own persistence.
- DTOs validate all inputs.
- Auth and permissions are explicit.
- Transactions are used where consistency requires them.
- Events and queues are typed and idempotent where possible.

### Frontend

- Server and Client Component boundaries are appropriate.
- Forms use schema validation.
- API calls use the standard client and query patterns.
- Loading, empty, error, and success states are present.
- Components are reusable where appropriate and not over-abstracted.

### Database

- Migration is included for schema changes.
- Indexes and constraints are justified.
- Data retention and soft delete requirements are considered.
- No production data or secrets are included in seeds.

### API

- URL, method, status codes, and response shape follow standards.
- Pagination, filtering, sorting, and search are consistent.
- Error responses use standard codes and format.
- Swagger docs are complete.

### Security

- Inputs are validated and sanitized.
- Sensitive data is never returned or logged.
- Authorization covers resource ownership and roles.
- Rate limits are added for abuse-prone endpoints.
- Secrets are not committed.

### Testing

- Unit tests cover business rules.
- Integration tests cover database-backed behavior where needed.
- E2E tests cover critical flows where appropriate.
- External services are mocked at boundaries.
- Tests are deterministic and meaningful.

### Operations

- Logs include request IDs and useful context.
- Errors are observable without exposing internals.
- Background jobs have retry and failure handling.
- Documentation explains operational concerns.

### Final Verification

- `npm run build` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- The pull request description explains scope, risks, migration impact, and rollback notes where relevant.

