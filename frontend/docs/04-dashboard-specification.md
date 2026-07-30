# CribSeekers — Dashboard Specification

Every role dashboard uses the same skeleton: **page header → KPI row → primary content grid →
activity rail**. All widgets read from the single role dashboard endpoint
(`GET /{role}/dashboard`) plus their own list endpoints where the widget is deep-linked.

Shared widget rules:

- Loading → a skeleton with the widget's final dimensions (no collapse/expand jump).
- Empty → one sentence plus the action that fixes it ("No saved properties yet" → "Browse properties").
- Error → the widget shows a compact retry, the rest of the dashboard still renders.
- Every number is formatted: ₦ with thousands separators, dates as `d MMM yyyy`, relative times
  for activity ("2 hours ago").

---

## Buyer

- **KPIs:** Saved properties · Upcoming inspections · Active offers · Wallet balance.
- **Content:** Recommended for you (carousel, `/buyer/recommendations`) · Recently viewed ·
  Upcoming inspections table (date, property, agent, status, action) · Escrow summary card.
- **Quick actions:** Search properties · Book inspection · Fund wallet.
- **Activity:** saves, inspection status changes, offer responses, messages.

## Tenant

- **KPIs:** Next rent due (amount + countdown) · Lease ends in · Open maintenance tickets · Wallet balance.
- **Content:** Current lease card (property, landlord, term, documents) · Rent schedule table with
  paid/due/overdue badges · Maintenance requests list · Upcoming inspections.
- **Quick actions:** Pay rent · New maintenance request · Message landlord.
- **Rule:** overdue rent pins a destructive banner above the KPI row.

## Landlord

- **KPIs:** Total properties · Occupancy rate · Rent collected (month) · Arrears.
- **Content:** Portfolio table (property, status, verification, tenant, rent, next due) ·
  Views & enquiries line chart (30 days, Recharts) · Rent collection progress bar ·
  Pending inspections · Maintenance queue.
- **Quick actions:** Add property · Record payment · Review inspection requests.

## Agent

- **KPIs:** Active listings · New leads (7 days) · Appointments today · Commission earned (month).
- **Content:** Deals pipeline board (lead → contacted → viewing → offer → closed) · Listings
  performance table · Today's appointments · Lead inbox.
- **Quick actions:** Add listing · Log lead · Schedule viewing.

## Developer

- **KPIs:** Projects · Units sold / total · Reservation pipeline value · Revenue (month).
- **Content:** Project cards with construction progress bars · Unit inventory table
  (available / reserved / sold) · Sales trend chart · Reservations expiring soon.
- **Quick actions:** New project · Add units · Publish update.

## Admin

- **KPIs:** Total users · Properties pending moderation · Verifications pending · Escrow in dispute.
- **Content:** Moderation queue · New user signups chart · Platform GMV chart · Recent audit log ·
  System health strip.
- **Quick actions:** Review queue · Search user · Open audit log.
- **Rule:** every admin action opens a confirmation dialog and is written to the audit log.
