# CribSeekers Domain Model Specification v1.0

## Purpose

This Domain Model Specification is the source of truth for CribSeekers backend domain design. It defines the business domains, bounded contexts, aggregates, entities, value objects, domain services, domain events, repositories, policies, invariants, relationships, and module mapping for implementation.

This document is not an API specification, database migration plan, or application code. It describes the business model that future implementation must preserve.

## 1. Domain Overview

CribSeekers is a Nigerian real estate platform that connects property seekers with landlords, agents, agencies, and verified property listings. The platform supports discovery, verification, inspection booking, messaging, reviews, payments, wallets, escrow, notifications, administration, and analytics.

The core business problem is trust. Property seekers need accurate listings, verified owners or agents, safe inspection workflows, protected payments, and reliable communication. Landlords, agents, and agencies need controlled listing management, lead generation, inspection coordination, payment tracking, and reputation signals. Administrators need visibility, moderation, fraud controls, and operational auditability.

### Major Business Capabilities

- Identity and access management.
- User, landlord, agent, and agency verification.
- Property listing creation and management.
- Property media management.
- Property search, filtering, ranking, and recommendations.
- Inspection booking, scheduling, confirmation, and completion.
- Escrow-backed payment flows.
- Wallet credits, debits, withdrawals, and transaction history.
- Buyer, renter, landlord, agent, and admin communication.
- Notification delivery across email, SMS, push, and in-app channels.
- Review and rating collection after eligible interactions.
- Administrative moderation, approvals, disputes, and audit trails.
- Analytics for listings, users, payments, inspections, and engagement.

### Domain Interaction Summary

Identity provides authenticated actors and authorization signals to every protected domain. Property owns listings and listing lifecycle. Search consumes published property data and user intent to produce discovery results. Inspection coordinates physical or virtual property visits. Payment processes external payment intents and confirmations. Wallet owns ledger-backed balances. Communication enables conversations around listings, inspections, and support. Notification delivers domain messages triggered by events. Review records trust signals after completed business interactions. Media owns uploaded assets and processing status. Administration governs moderation, verification, disputes, and operational controls. Analytics observes domain events and produces metrics without owning transactional workflows.

## 2. Bounded Contexts

### Identity Context

Purpose: manage platform actors, authentication, roles, permissions, and verification state.

Responsibilities:

- Register and authenticate users.
- Manage user profiles.
- Manage roles and permissions.
- Track account status and verification state.
- Provide identity claims to other contexts.

Owned data:

- User.
- Role.
- Permission.
- UserRole.
- VerificationProfile.
- Session or refresh token records.

Dependencies:

- Notification for verification messages.
- Media for verification documents.
- Administration for manual approval decisions.

Public interfaces:

- User lookup by ID.
- Authenticated actor claims.
- Role and permission checks.
- Verification status queries.

### Property Context

Purpose: manage the lifecycle of property listings.

Responsibilities:

- Create, update, publish, unpublish, archive, and delete properties.
- Manage property ownership and representation.
- Maintain listing attributes, amenities, availability, and pricing.
- Enforce listing completeness and verification rules.

Owned data:

- Property.
- PropertyDetails.
- Amenity.
- PropertyAmenity.
- PropertyAvailability.
- PropertyOwnershipClaim.

Dependencies:

- Identity for owners, landlords, agents, and agencies.
- Media for listing images and videos.
- Administration for moderation and verification.
- Search for indexing published listings.

Public interfaces:

- Property read model for listing details.
- Property status changes.
- Ownership and representation checks.
- Published property feed for Search.

### Search Context

Purpose: provide property discovery, ranking, filtering, and future recommendations.

Responsibilities:

- Index searchable property data.
- Execute filtering, sorting, geospatial search, and keyword search.
- Rank results by relevance, quality, location, freshness, and trust.
- Track search intent and result engagement.

Owned data:

- SearchIndexEntry.
- SearchQueryLog.
- SavedSearch.
- SearchPreference.

Dependencies:

- Property for published listing data.
- Identity for user preferences.
- Analytics for engagement signals.

Public interfaces:

- Search properties.
- Suggest locations or filters.
- Save search criteria.
- Rebuild or refresh index entry.

### Inspection Context

Purpose: coordinate property inspection bookings and lifecycle.

Responsibilities:

- Book inspection requests.
- Validate time slots and property availability.
- Coordinate requester, property owner, agent, and optional admin.
- Track confirmation, cancellation, rescheduling, completion, and no-show state.

Owned data:

- InspectionBooking.
- InspectionParticipant.
- InspectionTimeSlot.
- InspectionStatusHistory.
- InspectionNote.

Dependencies:

- Identity for participants.
- Property for property eligibility.
- Payment for paid inspection fees where applicable.
- Notification for reminders and status updates.
- Review for post-inspection eligibility.

Public interfaces:

- Book inspection.
- Confirm inspection.
- Cancel or reschedule inspection.
- Complete inspection.
- Inspection eligibility check.

### Payment Context

Purpose: manage external payment attempts, provider integration, payment verification, and escrow funding triggers.

Responsibilities:

- Create payment intents.
- Verify provider callbacks.
- Record payment attempts and outcomes.
- Coordinate escrow funding.
- Maintain idempotency for external callbacks.

Owned data:

- Payment.
- PaymentAttempt.
- PaymentProviderReference.
- PaymentMethod.
- PaymentWebhookEvent.

Dependencies:

- Wallet for balance changes and ledger entries.
- Inspection for inspection fee payments.
- Property for listing-related payments.
- Notification for receipts.

Public interfaces:

- Initialize payment.
- Verify payment.
- Query payment status.
- Reconcile provider event.

### Wallet Context

Purpose: own user balances, escrow balances, withdrawals, and ledger integrity.

Responsibilities:

- Maintain wallet accounts.
- Credit and debit balances.
- Hold escrow funds.
- Release or refund escrow.
- Process withdrawals.
- Maintain immutable ledger entries.

Owned data:

- Wallet.
- WalletAccount.
- WalletLedgerEntry.
- WalletTransaction.
- EscrowTransaction.
- WithdrawalRequest.

Dependencies:

- Identity for wallet owners.
- Payment for external funding and payout status.
- Administration for dispute and manual review.
- Notification for balance and transaction alerts.

Public interfaces:

- Get wallet balance.
- Credit wallet.
- Debit wallet.
- Fund escrow.
- Release escrow.
- Refund escrow.
- Request withdrawal.

### Communication Context

Purpose: manage conversations and messages between platform participants.

Responsibilities:

- Create conversations around properties, inspections, support, or disputes.
- Send and receive messages.
- Track read receipts and participant state.
- Enforce messaging eligibility and abuse limits.

Owned data:

- Conversation.
- ConversationParticipant.
- Message.
- MessageReceipt.
- MessageAttachment.

Dependencies:

- Identity for participants.
- Property for property-related conversations.
- Inspection for inspection-related conversations.
- Media for attachments.
- Notification for message alerts.

Public interfaces:

- Start conversation.
- Send message.
- Mark message read.
- List participant conversations.

### Notification Context

Purpose: deliver business notifications through supported channels.

Responsibilities:

- Create notification records.
- Render notification templates.
- Deliver email, SMS, push, and in-app notifications.
- Track delivery status and preferences.

Owned data:

- Notification.
- NotificationTemplate.
- NotificationDelivery.
- NotificationPreference.

Dependencies:

- Identity for recipients.
- All transactional contexts as event publishers.

Public interfaces:

- Send notification command.
- Subscribe to domain events.
- Manage notification preferences.
- Query notification history.

### Review Context

Purpose: manage reviews and ratings that build marketplace trust.

Responsibilities:

- Accept eligible reviews after completed inspections or transactions.
- Moderate reviews.
- Aggregate ratings for users, agents, agencies, and properties.
- Prevent duplicate or fraudulent reviews.

Owned data:

- Review.
- RatingSummary.
- ReviewModeration.
- ReviewReply.

Dependencies:

- Identity for reviewer and review subject.
- Property for reviewed property.
- Inspection for eligibility.
- Administration for moderation.

Public interfaces:

- Submit review.
- Moderate review.
- Query rating summary.
- Check review eligibility.

### Administration Context

Purpose: provide operational control, moderation, verification, dispute handling, and audit visibility.

Responsibilities:

- Verify users, agents, agencies, and properties.
- Moderate listings, reviews, conversations, and media.
- Handle disputes and escalations.
- Manage admin roles and operational actions.
- Record audit logs.

Owned data:

- AdminAction.
- AuditLog.
- ModerationCase.
- VerificationCase.
- DisputeCase.
- AdminNote.

Dependencies:

- Identity for admin users and subjects.
- Property, Media, Review, Wallet, Payment, and Communication for operational targets.
- Notification for decision messages.

Public interfaces:

- Create admin action.
- Record audit log.
- Approve or reject verification.
- Open and resolve dispute.

### Analytics Context

Purpose: observe platform activity and provide business intelligence without owning transactional state.

Responsibilities:

- Consume domain events.
- Aggregate metrics.
- Track listing performance, search behavior, conversion, revenue, and engagement.
- Provide reports for admin and business operations.

Owned data:

- AnalyticsEvent.
- MetricSnapshot.
- ListingMetric.
- UserActivityMetric.
- RevenueMetric.

Dependencies:

- All contexts as event sources.

Public interfaces:

- Track event.
- Query metrics.
- Generate reports.

### Media Context

Purpose: manage uploaded files, listing media, verification documents, and processing status.

Responsibilities:

- Accept and validate uploads.
- Store file metadata.
- Process images and videos.
- Track ownership, visibility, and moderation state.
- Provide safe access references.

Owned data:

- MediaAsset.
- MediaVariant.
- MediaProcessingJob.
- MediaModerationStatus.

Dependencies:

- Identity for upload owners.
- Property for listing media association.
- Administration for moderation.

Public interfaces:

- Register media asset.
- Attach media to domain object.
- Query processing status.
- Mark media approved or rejected.

## 3. Aggregates

### Identity Aggregates

Aggregate root: `User`.

Entities: `Role`, `Permission`, `UserRole`, `VerificationProfile`, `RefreshSession`.

Value objects: `Email`, `PhoneNumber`, `PasswordHash`, `PersonName`, `VerificationStatus`.

Repositories: `UserRepository`, `RoleRepository`, `VerificationRepository`.

Domain services: `AuthenticationDomainService`, `VerificationDomainService`, `PermissionDomainService`.

Factories: `UserFactory`, `VerificationProfileFactory`.

Specifications: `CanAuthenticateSpecification`, `CanReceiveRoleSpecification`.

Policies: password policy, account lock policy, verification policy.

Reason: `User` is the actor identity used by the platform. Role, permission, and verification decisions must remain consistent around the account lifecycle.

Ownership boundary: Identity owns authentication and user identity state. Other contexts may reference user IDs but must not mutate users directly.

### Property Aggregates

Aggregate root: `Property`.

Entities: `PropertyDetails`, `PropertyAvailability`, `Amenity`, `PropertyOwnershipClaim`.

Value objects: `Address`, `GeoLocation`, `Coordinates`, `PropertyPrice`, `PropertyDimensions`, `PropertyStatus`.

Repositories: `PropertyRepository`, `AmenityRepository`.

Domain services: `PropertyPublishingService`, `PropertyOwnershipService`, `PricingService`.

Factories: `PropertyFactory`.

Specifications: `CanPublishPropertySpecification`, `CanModifyPropertySpecification`.

Policies: listing completeness policy, ownership policy, property verification policy.

Reason: `Property` controls the listing lifecycle and all rules for whether a listing can appear in the marketplace.

Ownership boundary: Property owns listing truth. Search owns indexing copies, and Media owns binary asset metadata.

### Search Aggregates

Aggregate root: `SearchIndexEntry`.

Entities: `SavedSearch`, `SearchQueryLog`, `SearchPreference`.

Value objects: `SearchQuery`, `SearchFilters`, `SortOrder`, `GeoRadius`.

Repositories: `SearchIndexRepository`, `SavedSearchRepository`.

Domain services: `SearchRankingService`, `RecommendationService`, `PropertyMatchingService`.

Factories: `SearchIndexEntryFactory`.

Specifications: `SearchablePropertySpecification`.

Policies: ranking policy, saved search policy.

Reason: Search requires optimized read models and ranking behavior that must not pollute Property business rules.

Ownership boundary: Search owns discovery read models and user search preferences, not property lifecycle data.

### Inspection Aggregates

Aggregate root: `InspectionBooking`.

Entities: `InspectionParticipant`, `InspectionStatusHistory`, `InspectionNote`.

Value objects: `InspectionTimeSlot`, `InspectionStatus`, `CancellationReason`.

Repositories: `InspectionBookingRepository`.

Domain services: `InspectionSchedulingService`.

Factories: `InspectionBookingFactory`.

Specifications: `CanBookInspectionSpecification`, `CanCompleteInspectionSpecification`.

Policies: booking window policy, cancellation policy, no-show policy.

Reason: `InspectionBooking` coordinates multiple participants and must preserve lifecycle state transitions.

Ownership boundary: Inspection owns booking state. It references users and properties by ID.

### Payment Aggregates

Aggregate root: `Payment`.

Entities: `PaymentAttempt`, `PaymentWebhookEvent`, `PaymentProviderReference`.

Value objects: `Money`, `PaymentStatus`, `PaymentProvider`, `IdempotencyKey`.

Repositories: `PaymentRepository`, `PaymentWebhookRepository`.

Domain services: `PaymentProcessingService`, `PaymentReconciliationService`.

Factories: `PaymentFactory`.

Specifications: `CanVerifyPaymentSpecification`.

Policies: idempotency policy, provider verification policy.

Reason: Payment must model provider-facing lifecycle separately from wallet ledger state.

Ownership boundary: Payment owns external payment truth. Wallet owns internal balances and ledger entries.

### Wallet Aggregates

Aggregate root: `Wallet`.

Entities: `WalletAccount`, `WalletLedgerEntry`, `WalletTransaction`, `EscrowTransaction`, `WithdrawalRequest`.

Value objects: `Money`, `LedgerEntryType`, `WalletTransactionStatus`, `EscrowStatus`.

Repositories: `WalletRepository`, `LedgerRepository`, `EscrowRepository`.

Domain services: `EscrowService`, `WalletLedgerService`, `WithdrawalService`.

Factories: `WalletFactory`, `EscrowTransactionFactory`.

Specifications: `SufficientBalanceSpecification`, `CanReleaseEscrowSpecification`.

Policies: non-negative balance policy, escrow release policy, withdrawal policy.

Reason: Wallet protects financial correctness and must maintain an auditable ledger.

Ownership boundary: Wallet owns balances and escrow state. Payment only confirms external money movement.

### Communication Aggregates

Aggregate root: `Conversation`.

Entities: `ConversationParticipant`, `Message`, `MessageReceipt`, `MessageAttachment`.

Value objects: `MessageBody`, `ConversationType`, `ReadStatus`.

Repositories: `ConversationRepository`, `MessageRepository`.

Domain services: `MessagingEligibilityService`, `ConversationAccessService`.

Factories: `ConversationFactory`, `MessageFactory`.

Specifications: `CanSendMessageSpecification`.

Policies: messaging eligibility policy, abuse prevention policy.

Reason: Conversation controls participant membership and message eligibility.

Ownership boundary: Communication owns message history and conversation access.

### Notification Aggregates

Aggregate root: `Notification`.

Entities: `NotificationDelivery`, `NotificationTemplate`, `NotificationPreference`.

Value objects: `NotificationChannel`, `NotificationStatus`, `NotificationPayload`.

Repositories: `NotificationRepository`, `NotificationPreferenceRepository`.

Domain services: `NotificationDeliveryService`, `NotificationTemplateService`.

Factories: `NotificationFactory`.

Specifications: `CanDeliverNotificationSpecification`.

Policies: preference policy, retry policy, quiet-hours policy.

Reason: Notification coordinates delivery state across channels and user preferences.

Ownership boundary: Notification owns delivery records, not the business event that triggered delivery.

### Review Aggregates

Aggregate root: `Review`.

Entities: `ReviewReply`, `ReviewModeration`, `RatingSummary`.

Value objects: `Rating`, `ReviewBody`, `ModerationStatus`.

Repositories: `ReviewRepository`, `RatingSummaryRepository`.

Domain services: `ReviewEligibilityService`, `RatingAggregationService`.

Factories: `ReviewFactory`.

Specifications: `CanSubmitReviewSpecification`.

Policies: review eligibility policy, duplicate review policy, moderation policy.

Reason: Review preserves trust signals and must enforce eligibility and moderation.

Ownership boundary: Review owns ratings and review content. It references inspections and properties.

### Administration Aggregates

Aggregate root: `AdminAction`.

Entities: `AuditLog`, `ModerationCase`, `VerificationCase`, `DisputeCase`, `AdminNote`.

Value objects: `AdminActionType`, `AuditMetadata`, `DecisionReason`, `CaseStatus`.

Repositories: `AdminActionRepository`, `AuditLogRepository`, `CaseRepository`.

Domain services: `ModerationService`, `DisputeResolutionService`, `AuditService`.

Factories: `AdminActionFactory`, `ModerationCaseFactory`.

Specifications: `CanPerformAdminActionSpecification`.

Policies: admin permission policy, audit policy, dispute policy.

Reason: Administration governs sensitive operational decisions and must leave an audit trail.

Ownership boundary: Administration owns operational cases and audit records, not target domain state.

### Analytics Aggregates

Aggregate root: `AnalyticsEvent`.

Entities: `MetricSnapshot`, `ListingMetric`, `UserActivityMetric`, `RevenueMetric`.

Value objects: `MetricName`, `MetricPeriod`, `EventSource`.

Repositories: `AnalyticsEventRepository`, `MetricRepository`.

Domain services: `AnalyticsAggregationService`, `ReportGenerationService`.

Factories: `AnalyticsEventFactory`.

Specifications: `TrackableEventSpecification`.

Policies: data retention policy, aggregation policy.

Reason: Analytics consumes events into reporting models without affecting transactional workflows.

Ownership boundary: Analytics owns reporting data only.

### Media Aggregates

Aggregate root: `MediaAsset`.

Entities: `MediaVariant`, `MediaProcessingJob`.

Value objects: `FileMetadata`, `MediaDuration`, `MediaType`, `StorageKey`, `MediaVisibility`.

Repositories: `MediaAssetRepository`.

Domain services: `MediaProcessingService`, `MediaValidationService`.

Factories: `MediaAssetFactory`.

Specifications: `AcceptableMediaSpecification`.

Policies: upload policy, file safety policy, moderation policy.

Reason: Media centralizes file ownership, processing, and safety rules.

Ownership boundary: Media owns file metadata and processing state. Other contexts attach media by reference.

## 4. Entity Definitions

### User

Purpose: represents a person or organization account on CribSeekers.

Responsibilities: authentication identity, account status, profile ownership, role assignment anchor, verification anchor.

Lifecycle: registered, pending verification, active, suspended, deleted.

Relationships: owns roles, verification profile, wallet, properties, conversations, reviews, notifications.

Business identity: user ID plus unique email or phone number.

Ownership: Identity.

### Role

Purpose: groups permissions for platform actors.

Responsibilities: define coarse access categories such as seeker, landlord, agent, agency admin, support admin, super admin.

Lifecycle: created, updated, deprecated.

Relationships: assigned to users; contains permissions.

Business identity: role key.

Ownership: Identity.

### Permission

Purpose: represents a specific allowed action.

Responsibilities: authorize sensitive use cases and admin operations.

Lifecycle: created, assigned to roles, deprecated.

Relationships: attached to roles and checked by protected contexts.

Business identity: permission key.

Ownership: Identity.

### VerificationProfile

Purpose: tracks identity, agent, agency, landlord, or document verification.

Responsibilities: hold verification state and evidence references.

Lifecycle: pending, under review, approved, rejected, expired, revoked.

Relationships: belongs to a user; may reference media; reviewed by Administration.

Business identity: verification profile ID.

Ownership: Identity.

### Property

Purpose: represents a marketplace listing.

Responsibilities: listing lifecycle, ownership, pricing, availability, publication status, verification state.

Lifecycle: draft, submitted, under review, verified, published, unpublished, archived, deleted.

Relationships: belongs to one owner or representing agent; has details, amenities, media references, inspections, reviews.

Business identity: property ID and optional public listing slug/reference.

Ownership: Property.

### PropertyImage

Purpose: represents an image attached to a property.

Responsibilities: ordering, display intent, alt text, moderation state.

Lifecycle: uploaded, processing, approved, rejected, removed.

Relationships: references `MediaAsset`; attached to one property.

Business identity: property image ID.

Ownership: Property owns attachment; Media owns file metadata.

### PropertyVideo

Purpose: represents a video attached to a property.

Responsibilities: listing tour, ordering, moderation state.

Lifecycle: uploaded, processing, approved, rejected, removed.

Relationships: references `MediaAsset`; attached to one property.

Business identity: property video ID.

Ownership: Property owns attachment; Media owns file metadata.

### Amenity

Purpose: represents a feature available at a property.

Responsibilities: normalize listing features such as parking, electricity, water, security, furnished, elevator.

Lifecycle: active, deprecated.

Relationships: linked to properties.

Business identity: amenity key.

Ownership: Property.

### InspectionBooking

Purpose: represents a scheduled property inspection.

Responsibilities: schedule, participant agreement, status transitions, cancellation, completion.

Lifecycle: requested, pending confirmation, confirmed, rescheduled, cancelled, completed, no-show, expired.

Relationships: references property, requester, owner or agent, payment when required, review eligibility after completion.

Business identity: inspection booking ID.

Ownership: Inspection.

### Wallet

Purpose: represents a financial account container for a user or platform-controlled escrow account.

Responsibilities: hold available, pending, and escrow-related balances through ledger entries.

Lifecycle: created, active, restricted, closed.

Relationships: belongs to one wallet owner; has transactions and ledger entries.

Business identity: wallet ID.

Ownership: Wallet.

### WalletLedgerEntry

Purpose: immutable financial record for a balance movement.

Responsibilities: preserve debit, credit, balance effect, reason, and correlation ID.

Lifecycle: created only; never updated except safe metadata correction through audited process.

Relationships: belongs to wallet and transaction.

Business identity: ledger entry ID.

Ownership: Wallet.

### EscrowTransaction

Purpose: represents held funds for a property-related transaction.

Responsibilities: hold, release, refund, dispute, and settlement tracking.

Lifecycle: initiated, funded, held, release pending, released, refund pending, refunded, disputed, cancelled.

Relationships: funded by payment or wallet; tied to payer, payee, property, and optional inspection.

Business identity: escrow transaction ID.

Ownership: Wallet.

### Payment

Purpose: represents an external payment workflow.

Responsibilities: initialize, verify, reconcile, and expose payment status.

Lifecycle: initialized, pending, completed, failed, abandoned, reversed.

Relationships: may fund wallet, escrow, inspection fee, listing fee, subscription, or future services.

Business identity: payment ID and provider reference.

Ownership: Payment.

### PaymentAttempt

Purpose: records each provider attempt against a payment.

Responsibilities: track attempt status, provider response, failure reason, and idempotency.

Lifecycle: initiated, provider pending, succeeded, failed.

Relationships: belongs to payment.

Business identity: payment attempt ID.

Ownership: Payment.

### Conversation

Purpose: groups messages among participants.

Responsibilities: participant membership, conversation type, access rules, activity state.

Lifecycle: opened, active, archived, closed, restricted.

Relationships: has participants and messages; may reference property, inspection, dispute, or support case.

Business identity: conversation ID.

Ownership: Communication.

### Message

Purpose: represents a message sent inside a conversation.

Responsibilities: content, sender, timestamps, status, attachments.

Lifecycle: sent, delivered, read, edited, deleted, moderated.

Relationships: belongs to conversation and sender; may reference media attachments.

Business identity: message ID.

Ownership: Communication.

### Notification

Purpose: represents a message to be delivered to a user through one or more channels.

Responsibilities: payload, recipient, type, channel, delivery status.

Lifecycle: created, queued, delivered, failed, read, dismissed.

Relationships: belongs to recipient; may reference source domain event.

Business identity: notification ID.

Ownership: Notification.

### Review

Purpose: captures eligible feedback and rating.

Responsibilities: score, written feedback, target, moderation status.

Lifecycle: submitted, published, hidden, rejected, removed.

Relationships: belongs to reviewer and review subject; references property and inspection when applicable.

Business identity: review ID.

Ownership: Review.

### ReviewReply

Purpose: allows an eligible reviewed party to respond.

Responsibilities: reply content and moderation state.

Lifecycle: submitted, published, hidden, removed.

Relationships: belongs to review and replying user.

Business identity: review reply ID.

Ownership: Review.

### AdminAction

Purpose: records an intentional administrative operation.

Responsibilities: actor, action type, target, reason, outcome.

Lifecycle: created and immutable.

Relationships: performed by admin user; targets a domain entity.

Business identity: admin action ID.

Ownership: Administration.

### AuditLog

Purpose: immutable operational and security record.

Responsibilities: record who did what, when, where, and why.

Lifecycle: created and immutable.

Relationships: linked to actor, target, request ID, and optional admin action.

Business identity: audit log ID.

Ownership: Administration.

### MediaAsset

Purpose: stores metadata for an uploaded file.

Responsibilities: file identity, storage key, type, size, checksum, processing state, visibility.

Lifecycle: registered, uploaded, processing, ready, rejected, deleted.

Relationships: owned by uploader; attached by reference to properties, messages, verification profiles, or admin cases.

Business identity: media asset ID.

Ownership: Media.

### SearchIndexEntry

Purpose: optimized searchable representation of a published property.

Responsibilities: searchable fields, ranking fields, freshness, status.

Lifecycle: created, refreshed, disabled, removed.

Relationships: references property ID.

Business identity: property ID in Search context.

Ownership: Search.

### SavedSearch

Purpose: stores a user's reusable search criteria.

Responsibilities: filters, location preferences, alert preferences.

Lifecycle: created, updated, paused, deleted.

Relationships: belongs to a user.

Business identity: saved search ID.

Ownership: Search.

## 5. Value Objects

Value objects are immutable, validated by construction, compared by value, and have no independent lifecycle.

### Email

Validation: valid email format, normalized lowercase domain and local part where appropriate.

Equality: normalized address equality.

### PhoneNumber

Validation: Nigerian and international format support, normalized to E.164 where possible.

Equality: normalized phone number equality.

### PasswordHash

Validation: must be generated by approved hashing algorithm.

Equality: never plain equality against raw password; compare through hashing service.

### Money

Validation: currency required, amount cannot use floating-point arithmetic, minor units preferred.

Equality: same currency and same amount.

### Coordinates

Validation: latitude between -90 and 90, longitude between -180 and 180.

Equality: exact numeric equality after normalization.

### GeoLocation

Validation: coordinates plus optional human label and geohash.

Equality: coordinates and label when label participates in identity.

### Address

Validation: required country, state, city or local government area, and street-level details when needed.

Equality: normalized address fields.

### PropertyDimensions

Validation: positive numeric values with unit.

Equality: same dimensions and unit.

### Rating

Validation: bounded scale, usually 1 to 5.

Equality: same numeric value.

### PropertyPrice

Validation: money amount plus pricing period where relevant, such as yearly rent, monthly rent, sale price, or short-let nightly rate.

Equality: same amount, currency, and period.

### InspectionTimeSlot

Validation: start time before end time, future time for new bookings, duration within policy.

Equality: same start and end instant.

### NotificationPreference

Validation: supported channel, enabled flag, quiet-hour constraints.

Equality: same recipient, channel, and preference attributes.

### FileMetadata

Validation: allowed MIME type, extension, byte size, checksum where available.

Equality: checksum and storage key.

### MediaDuration

Validation: non-negative duration within allowed limit.

Equality: same duration unit and value.

### IdempotencyKey

Validation: non-empty, bounded length, unique per operation scope.

Equality: same key and same operation scope.

## 6. Domain Services

### AuthenticationDomainService

Authenticates credentials, applies account status rules, and issues identity decisions.

### VerificationDomainService

Evaluates user, landlord, agent, agency, and document verification state.

### PermissionDomainService

Determines whether an actor has required roles or permissions.

### PropertyPublishingService

Determines whether a property can move from draft or verified state into published marketplace state.

### PropertyOwnershipService

Validates owner, agent, agency, and delegated listing authority.

### PropertyMatchingService

Matches seeker intent against listing attributes, location, price, and availability.

### SearchRankingService

Ranks published listings using relevance, trust, freshness, engagement, and business rules.

### RecommendationService

Produces personalized property suggestions from preferences and behavior.

### PricingService

Validates pricing structures and supports future pricing intelligence.

### InspectionSchedulingService

Validates availability, participant eligibility, time slot rules, and lifecycle transitions.

### EscrowService

Controls escrow funding, holding, release, refund, and dispute-sensitive state transitions.

### WalletLedgerService

Applies double-entry or ledger-safe balance changes and prevents negative available balances.

### PaymentProcessingService

Coordinates payment initialization, provider communication, and payment state changes.

### PaymentReconciliationService

Reconciles provider webhooks and internal payment records idempotently.

### NotificationDeliveryService

Selects channels, applies preferences, and records delivery outcomes.

### MessagingEligibilityService

Determines whether participants may start or continue a conversation.

### ReviewEligibilityService

Determines whether a user may review a property, agent, landlord, or agency.

### RatingAggregationService

Maintains aggregate rating summaries after review lifecycle changes.

### MediaProcessingService

Coordinates resizing, transcoding, thumbnailing, safety checks, and processing status.

### MediaValidationService

Applies file type, size, extension, duration, and safety policies before use.

### ModerationService

Applies admin moderation decisions to listings, media, reviews, conversations, and users.

### DisputeResolutionService

Coordinates dispute state, evidence, admin decisions, escrow release, or refunds.

### AnalyticsAggregationService

Transforms domain events into business metrics and reporting snapshots.

## 7. Domain Events

Domain events represent completed business facts. Event names use past tense.

| Event | Publisher | Subscribers | Business Purpose |
| --- | --- | --- | --- |
| `UserRegistered` | Identity | Notification, Analytics | Welcome user and track acquisition. |
| `UserVerified` | Identity/Admin | Notification, Analytics | Inform user and enable verified capabilities. |
| `UserSuspended` | Identity/Admin | Notification, Communication, Analytics | Restrict access and record risk signal. |
| `RoleAssigned` | Identity/Admin | Audit, Analytics | Track authorization changes. |
| `PropertyCreated` | Property | Analytics | Track listing supply creation. |
| `PropertySubmittedForReview` | Property | Administration, Notification | Trigger moderation workflow. |
| `PropertyVerified` | Administration/Property | Notification, Search, Analytics | Make listing eligible for publishing. |
| `PropertyPublished` | Property | Search, Notification, Analytics | Add property to marketplace discovery. |
| `PropertyUnpublished` | Property | Search, Notification, Analytics | Remove listing from discovery. |
| `PropertyArchived` | Property | Search, Analytics | Retire listing from active marketplace. |
| `MediaUploaded` | Media | Media Processing, Analytics | Begin processing and moderation workflow. |
| `MediaProcessed` | Media | Property, Notification | Mark asset ready for use. |
| `MediaRejected` | Media/Admin | Notification, Property | Prevent unsafe or invalid media use. |
| `InspectionBooked` | Inspection | Notification, Analytics | Notify participants and track demand. |
| `InspectionConfirmed` | Inspection | Notification, Analytics | Confirm schedule. |
| `InspectionRescheduled` | Inspection | Notification, Analytics | Inform participants of changes. |
| `InspectionCancelled` | Inspection | Payment, Notification, Analytics | Trigger refund rules if applicable. |
| `InspectionCompleted` | Inspection | Review, Notification, Analytics | Unlock review eligibility. |
| `PaymentInitialized` | Payment | Analytics | Track payment attempt start. |
| `PaymentCompleted` | Payment | Wallet, Notification, Analytics | Apply funds and issue receipt. |
| `PaymentFailed` | Payment | Notification, Analytics | Inform payer and track failure. |
| `EscrowFunded` | Wallet | Notification, Analytics | Record funds held. |
| `EscrowReleased` | Wallet | Notification, Analytics | Settle payee funds. |
| `EscrowRefunded` | Wallet | Notification, Analytics | Return funds to payer. |
| `WalletCredited` | Wallet | Notification, Analytics | Notify balance increase. |
| `WalletDebited` | Wallet | Notification, Analytics | Notify balance decrease. |
| `WithdrawalRequested` | Wallet | Administration, Notification | Trigger payout review. |
| `WithdrawalCompleted` | Wallet | Notification, Analytics | Confirm payout completion. |
| `ConversationStarted` | Communication | Notification, Analytics | Inform participants and track engagement. |
| `MessageSent` | Communication | Notification, Analytics | Deliver message alerts. |
| `MessageRead` | Communication | Analytics | Track engagement. |
| `ReviewSubmitted` | Review | Administration, Notification, Analytics | Trigger moderation or publish flow. |
| `ReviewPublished` | Review | Property, Identity, Analytics | Update trust summaries. |
| `NotificationDelivered` | Notification | Analytics | Track delivery success. |
| `AdminActionRecorded` | Administration | Audit, Analytics | Preserve operational accountability. |
| `DisputeOpened` | Administration | Notification, Wallet, Analytics | Freeze or review related flows. |
| `DisputeResolved` | Administration | Wallet, Notification, Analytics | Apply settlement decision. |

## 8. Business Policies

### Property Publishing Rules

- Property must have a valid owner or authorized representative.
- Required listing fields must be complete.
- Required media must be approved.
- Property must pass verification before public publishing.
- Suspended users cannot publish properties.

### Inspection Booking Rules

- Property must be published and inspection-enabled.
- Requester must be authenticated and active.
- Time slot must be available and in the future.
- Duplicate bookings for the same requester, property, and time slot are not allowed.
- Paid inspections must complete payment before confirmation when payment is required.

### Escrow Rules

- Escrow can only be funded from a completed payment or sufficient wallet balance.
- Escrow release requires an eligible settlement condition.
- Disputed escrow cannot be released except through dispute resolution.
- Escrow release and refund must be idempotent.

### Review Rules

- Reviews require an eligible completed inspection or transaction.
- A reviewer may not review the same eligible interaction more than once.
- Users cannot review themselves.
- Reviews may be moderated before publication.

### Messaging Rules

- Participants must have a valid reason to communicate, such as property inquiry, inspection, transaction, or support case.
- Blocked, suspended, or deleted users cannot send messages.
- Attachments must use approved media rules.
- Abuse patterns may restrict messaging.

### Wallet Rules

- Available balance cannot become negative.
- Every balance movement must have a ledger entry.
- Ledger entries are immutable.
- Withdrawals require sufficient available balance and may require review.

### Verification Rules

- Verification requires required evidence.
- Rejected verification must include a reason safe to show to the user.
- Expired or revoked verification removes verified capabilities.
- Admin verification actions must be audited.

### Agent Verification Policies

- Agent verification must prove identity and authorization to represent listings.
- Agency-linked agents must be approved by the agency or admin policy.
- Verified agent status can be revoked for fraud, abuse, or expired evidence.

### Fraud Prevention

- High-risk transactions, suspicious listing patterns, repeated failed payments, and unusual messaging behavior may trigger admin review.
- Fraud flags must not automatically expose sensitive risk logic to users.
- Administrative overrides must be audited.

## 9. Business Invariants

The following rules must never be violated:

- A deleted user cannot authenticate.
- A suspended user cannot publish properties, book inspections, send messages, or withdraw funds.
- A property must belong to exactly one owner or owner organization.
- A property cannot be published unless verified.
- A property cannot be published without required approved media.
- A property cannot be modified by a user who is neither owner, authorized agent, agency admin, nor platform admin.
- Search must not expose unpublished, archived, deleted, or rejected properties.
- Inspection cannot be booked for unpublished properties.
- Inspection cannot be completed unless it was confirmed.
- Inspection cannot be completed by an unauthorized participant.
- Inspection cannot be rescheduled after completion or final cancellation.
- Reviews can only be submitted after completed eligible inspections or transactions.
- A user cannot submit duplicate reviews for the same eligible interaction.
- A user cannot review themselves.
- Escrow cannot be released twice.
- Escrow cannot be both released and refunded.
- Disputed escrow cannot be settled without dispute resolution.
- Wallet available balance cannot become negative.
- Every wallet transaction must have ledger entries.
- Ledger entries cannot be deleted.
- Payment provider webhook processing must be idempotent.
- A completed payment cannot be changed back to pending.
- A failed payment cannot credit a wallet.
- Messages cannot be sent to conversations where the sender is not a participant.
- Notifications must belong to exactly one recipient.
- Media cannot be attached to a public listing until approved or allowed by policy.
- Admin actions that affect users, properties, money, reviews, or verification must produce audit logs.
- Audit logs must be immutable.

## 10. Domain Relationships

### Context Map

```text
Identity
  -> Property
  -> Inspection
  -> Wallet
  -> Communication
  -> Notification
  -> Administration

Property
  -> Search
  -> Inspection
  -> Review
  -> Analytics
  -> Media

Inspection
  -> Payment
  -> Review
  -> Notification

Payment
  -> Wallet
  -> Notification
  -> Analytics

Wallet
  -> Administration
  -> Notification
  -> Analytics

Communication
  -> Notification
  -> Administration

Administration
  -> Identity
  -> Property
  -> Media
  -> Review
  -> Wallet
  -> Communication

All transactional contexts
  -> Analytics
```

### Upstream and Downstream Dependencies

- Identity is upstream for actor identity and access claims.
- Property is upstream for Search, Inspection, and property-related Review.
- Payment is upstream for Wallet when external funds are confirmed.
- Wallet is upstream for escrow settlement and financial availability.
- Inspection is upstream for Review eligibility.
- Administration is upstream for moderation and operational decisions.
- Notification and Analytics are downstream consumers of domain events.

### Shared Kernel

The shared kernel may include:

- Common value objects such as `Money`, `Email`, `PhoneNumber`, `Coordinates`.
- Shared enums such as user role keys, property status, payment status, and notification channels.
- Shared validation schemas.

Shared kernel changes must be conservative because they affect many contexts.

### Customer/Supplier Relationships

- Search is a customer of Property publication data.
- Review is a customer of Inspection completion facts.
- Wallet is a customer of Payment completion facts.
- Notification is a customer of all event-producing contexts.
- Analytics is a customer of all measurable domain events.

### Anti-Corruption Layers

Use anti-corruption layers for:

- Payment provider integrations.
- SMS, email, and push providers.
- Media storage and processing providers.
- Future government verification APIs.
- Future mortgage, insurance, or rent collection integrations.

External provider terminology must not leak into core domain models except as provider reference value objects.

## 11. Domain Ownership

Each entity has exactly one owning bounded context:

| Entity or Concept | Owning Context |
| --- | --- |
| Users | Identity |
| Roles | Identity |
| Permissions | Identity |
| Verification profiles | Identity |
| Properties | Property |
| Amenities | Property |
| Property listing lifecycle | Property |
| Search indexes | Search |
| Saved searches | Search |
| Inspection bookings | Inspection |
| Payments | Payment |
| Payment attempts | Payment |
| Wallets | Wallet |
| Ledger entries | Wallet |
| Escrow transactions | Wallet |
| Conversations | Communication |
| Messages | Communication |
| Notifications | Notification |
| Notification preferences | Notification |
| Reviews | Review |
| Rating summaries | Review |
| Media assets | Media |
| Media processing jobs | Media |
| Admin actions | Administration |
| Audit logs | Administration |
| Moderation cases | Administration |
| Analytics events and metrics | Analytics |

Other contexts may reference foreign IDs, consume events, or hold read models, but they must not become co-owners.

## 12. Module Mapping

Planned NestJS module structure:

```text
apps/api/src/modules/
├─ identity/
├─ property/
├─ search/
├─ inspection/
├─ payment/
├─ wallet/
├─ communication/
├─ notification/
├─ review/
├─ administration/
├─ analytics/
└─ media/
```

### identity

Purpose: authentication, users, roles, permissions, verification state.

Responsibilities: register users, authenticate, issue claims, enforce account status, expose user lookup.

Dependencies: notification, media, administration.

Public services: `IdentityService`, `AuthenticationService`, `PermissionService`, `VerificationService`.

Internal services: password hashing, token rotation, session management.

### property

Purpose: listing lifecycle and property ownership.

Responsibilities: create listings, update listings, publish, unpublish, verify readiness, manage amenities.

Dependencies: identity, media, administration, search.

Public services: `PropertyService`, `PropertyOwnershipService`, `PropertyPublishingService`.

Internal services: listing completeness checker, property mapper, amenity manager.

### search

Purpose: discovery and ranking.

Responsibilities: index published properties, execute search queries, save searches, rank results.

Dependencies: property, identity, analytics.

Public services: `SearchService`, `SavedSearchService`, `RecommendationService`.

Internal services: index sync, ranking strategy, query parser.

### inspection

Purpose: booking and completing inspections.

Responsibilities: book, confirm, reschedule, cancel, complete inspections.

Dependencies: identity, property, payment, notification, review.

Public services: `InspectionService`, `InspectionSchedulingService`.

Internal services: availability checker, status transition manager.

### payment

Purpose: external payment processing.

Responsibilities: initialize payments, verify provider callbacks, reconcile status, emit completion events.

Dependencies: wallet, notification, analytics.

Public services: `PaymentService`, `PaymentProcessingService`, `PaymentReconciliationService`.

Internal services: provider adapters, webhook parser, idempotency tracker.

### wallet

Purpose: balances, ledger, escrow, withdrawals.

Responsibilities: credit, debit, hold escrow, release escrow, refund escrow, process withdrawal requests.

Dependencies: identity, payment, administration, notification.

Public services: `WalletService`, `EscrowService`, `WalletLedgerService`, `WithdrawalService`.

Internal services: ledger writer, balance calculator, withdrawal reviewer.

### communication

Purpose: conversations and messages.

Responsibilities: create conversations, send messages, manage participants, track receipts.

Dependencies: identity, property, inspection, media, notification, administration.

Public services: `ConversationService`, `MessageService`.

Internal services: eligibility checker, participant access checker.

### notification

Purpose: notification creation, preference handling, and delivery.

Responsibilities: subscribe to events, create notifications, render templates, send through channels.

Dependencies: identity.

Public services: `NotificationService`, `NotificationPreferenceService`.

Internal services: delivery adapters, template renderer, retry scheduler.

### review

Purpose: reviews and ratings.

Responsibilities: check eligibility, submit reviews, moderate reviews, aggregate ratings.

Dependencies: identity, property, inspection, administration.

Public services: `ReviewService`, `ReviewEligibilityService`, `RatingAggregationService`.

Internal services: duplicate review checker, moderation queue publisher.

### administration

Purpose: operational control and audit.

Responsibilities: verification decisions, moderation, disputes, admin actions, audit logs.

Dependencies: identity, property, media, review, wallet, communication, notification.

Public services: `AdministrationService`, `ModerationService`, `DisputeResolutionService`, `AuditService`.

Internal services: case assignment, decision workflow, audit writer.

### analytics

Purpose: metrics and reporting.

Responsibilities: consume events, aggregate metrics, produce reports.

Dependencies: event publishers across contexts.

Public services: `AnalyticsService`, `ReportService`.

Internal services: aggregation scheduler, metric snapshot builder.

### media

Purpose: file metadata, upload validation, processing, and moderation state.

Responsibilities: register uploads, process images/videos, manage variants, expose safe references.

Dependencies: identity, administration.

Public services: `MediaService`, `MediaProcessingService`, `MediaValidationService`.

Internal services: storage adapter, thumbnail generator, transcoding coordinator.

## 13. Future Extensibility

### AI Property Recommendations

Supported by Search, Analytics, and Recommendation services. Recommendations can consume saved searches, listing engagement, location preferences, and review signals without changing Property ownership.

### Mortgage Integration

Can be added as a Finance or Lending context using anti-corruption layers for banks and lenders. It can reference users, properties, and payments without owning them.

### Rent Collection

Can extend Payment and Wallet with recurring obligations, scheduled invoices, landlord settlement, tenant receipts, and arrears policies.

### Property Auctions

Can be introduced as an Auction context that references Property and Wallet escrow while owning bids, auction lifecycle, reserve price, and winner selection.

### Subscription Plans

Can be added as a Billing or Subscription context for agents, agencies, premium seekers, promoted listings, and SaaS-style plan entitlements.

### Insurance

Can be integrated as an Insurance context that references properties, users, and payments while using provider anti-corruption layers.

### Third-Party APIs

Provider integrations must be isolated behind adapters and anti-corruption layers. Core domain models should use platform terms, not provider-specific language.

### Government Verification

Government verification can extend Identity and Administration verification workflows through an external verification adapter without redesigning users or verification profiles.

### Mobile Applications

Mobile clients can consume the same domain-backed APIs. Notification preferences already support future push notifications, device tokens, and mobile-specific delivery behavior.

### Expansion Rule

Future capabilities must either extend an existing bounded context where ownership is clear or introduce a new bounded context with explicit ownership, public interfaces, events, and anti-corruption boundaries.

