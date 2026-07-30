# Cribseekers Frontend Implementation Specification

**Generated**: July 30, 2026  
**Backend API Version**: v1  
**Purpose**: Complete frontend implementation specification based on comprehensive backend audit

---

## Table of Contents

1. [System Overview](#part-1---system-overview)
2. [Endpoint Inventory](#part-2---endpoint-inventory)
3. [Role Analysis](#part-3---role-analysis)
4. [Authentication Flow](#part-4---authentication-flow)
5. [User Profile](#part-5---user-profile)
6. [Property System](#part-6---property-system)
7. [Search System](#part-7---search-system)
8. [Inspections](#part-8---inspections)
9. [Wallet](#part-9---wallet)
10. [Escrow](#part-10---escrow)
11. [Messaging](#part-11---messaging)
12. [Notifications](#part-12---notifications)
13. [Payments](#part-13---payments)
14. [Admin](#part-14---admin)
15. [File Storage](#part-15---file-storage)
16. [Enums](#part-16---enums)
17. [DTO Documentation](#part-17---dto-documentation)
18. [Frontend Requirements](#part-18---frontend-requirements)
19. [Page Mapping](#part-19---page-mapping)
20. [Missing Backend Features](#part-20---missing-backend-features)
21. [Frontend Generation Blueprint](#part-21---frontend-generation-blueprint)

---

## PART 1 — SYSTEM OVERVIEW

### MODULES

**Identity Module**
- User management
- Authentication & authorization
- Role & permission management
- Profile management
- Session management

**Property Module**
- Property CRUD operations
- Property categories, types, purposes
- Property media management
- Property verification & moderation
- Property analytics

**Search Module**
- Global search
- Keyword search
- Location-based search
- Filter-based search
- Search suggestions
- Recommendations

**Inspection Module**
- Inspection scheduling
- Inspection confirmation
- Inspection rescheduling
- Inspection cancellation
- Inspection feedback
- Inspection reminders
- Inspection QR codes
- Inspection OTP

**Payment Module**
- Wallet management
- Payment processing
- Escrow management
- Withdrawal management
- Invoice management
- Receipt management
- Bank account management
- Settlement management

**Communication Module**
- Conversation management
- Message management
- Attachment management
- Typing indicators
- Read receipts
- Blocked conversations
- Message reactions

**Notification Module**
- In-app notifications
- Email notifications
- SMS notifications
- Push notifications
- Notification templates
- Notification queue
- Notification preferences

**Admin Module**
- User moderation
- Property moderation
- Audit logs
- Activity logs
- API key management
- Background job management
- Feature flags
- Reports
- System settings
- Webhooks

**Storage Module**
- File upload (single & bulk)
- File management
- File metadata
- Signed URLs
- File processing

**Health Module**
- Health checks
- Liveness probes
- Readiness probes

### FEATURES

**Public Features**
- Property browsing
- Property search
- Property details
- Property inquiries
- User registration
- User login
- Password reset

**Buyer Features**
- Dashboard
- Personalized recommendations
- Saved properties
- Property offers
- Property comparisons
- Inspection scheduling
- Wallet management

**Tenant Features**
- Dashboard
- Lease management
- Application submission
- Maintenance requests
- Payment history
- Inspection scheduling

**Landlord Features**
- Dashboard
- Property management
- Tenant management
- Analytics
- Rent collection
- Maintenance requests
- Inspection management

**Agent Features**
- Dashboard
- Property listings
- Lead management
- Client management
- Commission tracking
- Appointment scheduling
- Deal tracking

**Developer Features**
- Dashboard
- Project management
- Unit management
- Sales tracking
- Reservation management
- Construction progress

**Admin Features**
- User moderation
- Property moderation
- Audit logs
- Activity logs
- API key management
- Background job monitoring
- Feature flag management
- Report management
- System settings
- Webhook management

### RESOURCES

**Data Models**
- User, Role, Permission, Session
- Property, PropertyMedia, PropertyView, PropertyHistory
- Category, PropertyType, PropertyPurpose
- Inspection, InspectionFeedback, InspectionHistory, InspectionReminder, InspectionOTP, InspectionQRCode
- Wallet, Transaction, Escrow, Withdrawal, Settlement, Payment, PaymentAttempt, PaymentGateway
- Invoice, Receipt, BankAccount
- Conversation, Message, MessageAttachment, MessageReaction, MessageReadReceipt, TypingIndicator, BlockedConversation
- Notification, NotificationPreference, NotificationTemplate, NotificationQueue, PushSubscription, EmailNotification, SMSNotification
- AuditLog, ActivityLog, AdminAction, Report, ReportCategory, ReportEvidence, SystemSetting, FeatureFlag, ApiKey, Webhook, WebhookDelivery, BackgroundJob
- StorageFile

**API Resources**
- RESTful endpoints for all models
- WebSocket endpoints for real-time features
- Webhook endpoints for payment callbacks

### BUSINESS DOMAINS

**Property Domain**
- Property listing
- Property search
- Property verification
- Property moderation
- Property analytics

**Transaction Domain**
- Wallet operations
- Payment processing
- Escrow management
- Withdrawal processing
- Settlement processing

**Communication Domain**
- Messaging
- Notifications
- Alerts

**Inspection Domain**
- Inspection scheduling
- Inspection management
- Inspection feedback

**Admin Domain**
- User management
- Content moderation
- System monitoring
- Configuration management

---

## PART 2 — ENDPOINT INVENTORY

### AUTHENTICATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/auth/login | AuthController | login | Public | User login |
| POST | /api/v1/auth/register | AuthController | register | Public | User registration |
| POST | /api/v1/auth/register/buyer | AuthController | registerBuyer | Public | Buyer registration |
| POST | /api/v1/auth/register/tenant | AuthController | registerTenant | Public | Tenant registration |
| POST | /api/v1/auth/register/landlord | AuthController | registerLandlord | Public | Landlord registration |
| POST | /api/v1/auth/register/agent | AuthController | registerAgent | Public | Agent registration |
| POST | /api/v1/auth/register/developer | AuthController | registerDeveloper | Public | Developer registration |
| POST | /api/v1/auth/refresh | AuthController | refresh | Public | Refresh access token |
| POST | /api/v1/auth/forgot-password | AuthController | forgotPassword | Public | Request password reset |
| POST | /api/v1/auth/reset-password | AuthController | resetPassword | Public | Reset password |
| POST | /api/v1/auth/logout | AuthController | logout | JWT | User logout |

### USER ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/users | UserController | create | JWT + Admin | Create user |
| GET | /api/v1/users | UserController | findAll | JWT + Admin | Get all users |
| GET | /api/v1/users/paginate | UserController | paginate | JWT + Admin | Paginate users |
| GET | /api/v1/users/count | UserController | count | JWT + Admin | Count users |
| GET | /api/v1/users/:id | UserController | findOne | JWT + Admin/Self | Get user by ID |
| PUT | /api/v1/users/:id | UserController | update | JWT + Admin/Self | Update user |
| DELETE | /api/v1/users/:id | UserController | remove | JWT + Admin | Delete user |
| POST | /api/v1/users/:id/restore | UserController | restore | JWT + Admin | Restore deleted user |
| GET | /api/v1/users/search | UserController | search | JWT + Admin | Search users |
| GET | /api/v1/users/exists | UserController | exists | JWT + Admin | Check if user exists |

### PROPERTY ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/properties | PropertyController | create | JWT | Create property |
| GET | /api/v1/properties | PropertyController | findAll | Public | Get all properties |
| GET | /api/v1/properties/paginate | PropertyController | paginate | Public | Paginate properties |
| GET | /api/v1/properties/:id | PropertyController | findOne | Public | Get property by ID |
| PUT | /api/v1/properties/:id | PropertyController | update | JWT + Owner | Update property |
| DELETE | /api/v1/properties/:id | PropertyController | remove | JWT + Owner | Delete property |
| POST | /api/v1/properties/:id/publish | PropertyController | publish | JWT + Owner | Publish property |
| POST | /api/v1/properties/:id/unpublish | PropertyController | unpublish | JWT + Owner | Unpublish property |
| POST | /api/v1/properties/:id/verify | PropertyController | verify | JWT + Admin | Verify property |
| POST | /api/v1/properties/:id/views | PropertyController | incrementViews | Public | Increment view count |
| POST | /api/v1/properties/:id/inquiries | PropertyController | createInquiry | JWT | Create inquiry |

### CATEGORY ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/categories | CategoryController | create | JWT + Admin | Create category |
| GET | /api/v1/categories | CategoryController | findAll | Public | Get all categories |
| GET | /api/v1/categories/active | CategoryController | findActive | Public | Get active categories |
| GET | /api/v1/categories/:id | CategoryController | findOne | Public | Get category by ID |
| PUT | /api/v1/categories/:id | CategoryController | update | JWT + Admin | Update category |
| DELETE | /api/v1/categories/:id | CategoryController | remove | JWT + Admin | Delete category |

### PROPERTY TYPE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/property-types | TypeController | create | JWT + Admin | Create property type |
| GET | /api/v1/property-types | TypeController | findAll | Public | Get all types |
| GET | /api/v1/property-types/active | TypeController | findActive | Public | Get active types |
| GET | /api/v1/property-types/:id | TypeController | findOne | Public | Get type by ID |
| PUT | /api/v1/property-types/:id | TypeController | update | JWT + Admin | Update type |
| DELETE | /api/v1/property-types/:id | TypeController | remove | JWT + Admin | Delete type |

### PROPERTY PURPOSE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/property-purposes | PurposeController | create | JWT + Admin | Create purpose |
| GET | /api/v1/property-purposes | PurposeController | findAll | Public | Get all purposes |
| GET | /api/v1/property-purposes/active | PurposeController | findActive | Public | Get active purposes |
| GET | /api/v1/property-purposes/:id | PurposeController | findOne | Public | Get purpose by ID |
| PUT | /api/v1/property-purposes/:id | PurposeController | update | JWT + Admin | Update purpose |
| DELETE | /api/v1/property-purposes/:id | PurposeController | remove | JWT + Admin | Delete purpose |

### SEARCH ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/search | SearchController | globalSearch | Public | Global search |
| GET | /api/v1/search/keyword | SearchController | keywordSearch | Public | Keyword search |
| GET | /api/v1/search/state/:state | SearchController | searchByState | Public | Search by state |
| GET | /api/v1/search/city/:city | SearchController | searchByCity | Public | Search by city |
| GET | /api/v1/search/lga/:lga | SearchController | searchByLGA | Public | Search by LGA |
| GET | /api/v1/search/estate/:estate | SearchController | searchByEstate | Public | Search by estate |
| GET | /api/v1/search/category/:categoryId | SearchController | searchByCategory | Public | Search by category |
| GET | /api/v1/search/type/:typeId | SearchController | searchByType | Public | Search by type |
| GET | /api/v1/search/purpose/:purposeId | SearchController | searchByPurpose | Public | Search by purpose |
| GET | /api/v1/search/featured | SearchController | searchFeatured | Public | Search featured |
| GET | /api/v1/search/recent | SearchController | searchRecent | Public | Search recent |
| GET | /api/v1/search/popular | SearchController | searchPopular | Public | Search popular |
| GET | /api/v1/search/suggestions | SearchController | suggestions | Public | Search suggestions |

### RECOMMENDATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/recommendations | RecommendationController | getRecommendations | JWT | Get recommendations |
| GET | /api/v1/recommendations/popular | RecommendationController | getPopular | Public | Get popular |
| GET | /api/v1/recommendations/similar/:propertyId | RecommendationController | getSimilar | Public | Get similar |
| GET | /api/v1/recommendations/location/:locationId | RecommendationController | getByLocation | Public | Get by location |
| GET | /api/v1/recommendations/budget | RecommendationController | getByBudget | JWT | Get by budget |
| GET | /api/v1/recommendations/history | RecommendationController | getByHistory | JWT | Get by history |
| POST | /api/v1/recommendations/feedback | RecommendationController | submitFeedback | JWT | Submit feedback |

### INSPECTION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/inspections | InspectionController | create | JWT | Create inspection |
| GET | /api/v1/inspections | InspectionController | findAll | JWT | Get all inspections |
| GET | /api/v1/inspections/:id | InspectionController | findOne | JWT | Get inspection by ID |
| GET | /api/v1/inspections/property/:propertyId | InspectionController | findByProperty | JWT | Get by property |
| GET | /api/v1/inspections/user/:userId | InspectionController | findByUser | JWT | Get by user |
| POST | /api/v1/inspections/:id/confirm | InspectionController | confirm | JWT | Confirm inspection |
| POST | /api/v1/inspections/:id/cancel | InspectionController | cancel | JWT | Cancel inspection |
| POST | /api/v1/inspections/:id/reschedule | InspectionController | reschedule | JWT | Reschedule inspection |
| POST | /api/v1/inspections/:id/participants | InspectionController | addParticipants | JWT | Add participants |

### INSPECTION FEEDBACK ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/inspection-feedback | InspectionFeedbackController | create | JWT | Submit feedback |
| GET | /api/v1/inspection-feedback/inspection/:inspectionId | InspectionFeedbackController | findByInspection | JWT | Get by inspection |
| GET | /api/v1/inspection-feedback/user/:userId | InspectionFeedbackController | findByUser | JWT | Get by user |

### INSPECTION HISTORY ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/inspection-history/inspection/:inspectionId | InspectionHistoryController | findByInspection | JWT | Get history by inspection |
| GET | /api/v1/inspection-history/user/:userId | InspectionHistoryController | findByUser | JWT | Get history by user |

### INSPECTION OTP ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/inspection-otp/generate | InspectionOTPController | generate | JWT | Generate OTP |
| POST | /api/v1/inspection-otp/validate | InspectionOTPController | validate | JWT | Validate OTP |

### INSPECTION QR CODE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/inspection-qrcode/generate | InspectionQRCodeController | generate | JWT | Generate QR code |
| POST | /api/v1/inspection-qrcode/validate | InspectionQRCodeController | validate | JWT | Validate QR code |
| POST | /api/v1/inspection-qrcode/:id/mark-used | InspectionQRCodeController | markAsUsed | JWT | Mark as used |

### INSPECTION REMINDER ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/inspection-reminders | InspectionReminderController | create | JWT | Create reminder |
| GET | /api/v1/inspection-reminders/inspection/:inspectionId | InspectionReminderController | findByInspection | JWT | Get by inspection |
| GET | /api/v1/inspection-reminders/user/:userId | InspectionReminderController | findByUser | JWT | Get by user |
| POST | /api/v1/inspection-reminders/send-pending | InspectionReminderController | sendPending | JWT + Admin | Send pending reminders |

### WALLET ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/wallet | WalletController | create | JWT + Admin | Create wallet |
| GET | /api/v1/wallet/:id | WalletController | findOne | JWT + Owner | Get wallet by ID |
| GET | /api/v1/wallet/user/:userId | WalletController | findByUser | JWT + Admin/Self | Get wallet by user |
| GET | /api/v1/wallet/:id/transactions | WalletController | getTransactions | JWT + Owner | Get transactions |
| GET | /api/v1/wallet/:id/summary | WalletController | getSummary | JWT + Owner | Get wallet summary |
| POST | /api/v1/wallet/:id/freeze | WalletController | freeze | JWT + Admin | Freeze wallet |
| POST | /api/v1/wallet/:id/unfreeze | WalletController | unfreeze | JWT + Admin | Unfreeze wallet |
| POST | /api/v1/wallet/:id/close | WalletController | close | JWT + Admin | Close wallet |

### PAYMENT ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/payments | PaymentController | create | JWT | Initialize payment |
| POST | /api/v1/payments/verify | PaymentController | verify | JWT | Verify payment |
| POST | /api/v1/payments/:id/refund | PaymentController | refund | JWT + Admin/Owner | Refund payment |
| GET | /api/v1/payments/:id | PaymentController | findOne | JWT + Admin/Owner | Get payment by ID |
| GET | /api/v1/payments/user/:userId | PaymentController | findByUser | JWT + Admin/Self | Get payments by user |

### ESCROW ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/escrows | EscrowController | create | JWT | Create escrow |
| POST | /api/v1/escrows/:id/release | EscrowController | release | JWT + Payer/Admin | Release escrow |
| POST | /api/v1/escrows/:id/refund | EscrowController | refund | JWT + Admin | Refund escrow |
| POST | /api/v1/escrows/:id/dispute | EscrowController | dispute | JWT + Payer/Payee | Dispute escrow |
| GET | /api/v1/escrows/:id | EscrowController | findOne | JWT + Admin/Related | Get escrow by ID |
| GET | /api/v1/escrows/payer/:payerId | EscrowController | findByPayer | JWT + Admin/Payer | Get by payer |
| GET | /api/v1/escrows/payee/:payeeId | EscrowController | findByPayee | JWT + Admin/Payee | Get by payee |

### WITHDRAWAL ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/withdrawals | WithdrawalController | create | JWT | Create withdrawal |
| POST | /api/v1/withdrawals/approve | WithdrawalController | approve | JWT + Admin | Approve withdrawal |
| POST | /api/v1/withdrawals/reject | WithdrawalController | reject | JWT + Admin | Reject withdrawal |
| GET | /api/v1/withdrawals/:id | WithdrawalController | findOne | JWT + Admin/Owner | Get withdrawal by ID |
| GET | /api/v1/withdrawals/wallet/:walletId | WithdrawalController | findByWallet | JWT + Admin/Owner | Get by wallet |

### INVOICE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/invoices | InvoiceController | create | JWT + Admin/Self | Create invoice |
| GET | /api/v1/invoices/:id | InvoiceController | findOne | JWT + Admin/Owner | Get invoice by ID |
| GET | /api/v1/invoices/number/:invoiceNumber | InvoiceController | findByNumber | JWT + Admin/Owner | Get by number |
| POST | /api/v1/invoices/:id/mark-paid | InvoiceController | markAsPaid | JWT + Admin | Mark as paid |
| GET | /api/v1/invoices/user/:userId | InvoiceController | findByUser | JWT + Admin/Self | Get by user |

### RECEIPT ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/receipts | ReceiptController | create | JWT + Admin | Create receipt |
| GET | /api/v1/receipts/:id | ReceiptController | findOne | JWT + Admin/Owner | Get receipt by ID |
| GET | /api/v1/receipts/number/:receiptNumber | ReceiptController | findByNumber | JWT + Admin/Owner | Get by number |
| GET | /api/v1/receipts/payment/:paymentId | ReceiptController | findByPayment | JWT + Admin/Owner | Get by payment |
| GET | /api/v1/receipts/user/:userId | ReceiptController | findByUser | JWT + Admin/Self | Get by user |
| GET | /api/v1/receipts/invoice/:invoiceId | ReceiptController | findByInvoice | JWT + Admin/Owner | Get by invoice |

### BANK ACCOUNT ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/bank-accounts | BankAccountController | create | JWT | Add bank account |
| GET | /api/v1/bank-accounts/:id | BankAccountController | findOne | JWT + Admin/Owner | Get by ID |
| GET | /api/v1/bank-accounts/wallet/:walletId | BankAccountController | findByWallet | JWT + Admin/Owner | Get by wallet |
| POST | /api/v1/bank-accounts/:id/set-default | BankAccountController | setDefault | JWT + Admin/Owner | Set default |
| POST | /api/v1/bank-accounts/:id/verify | BankAccountController | verify | JWT + Admin | Verify account |
| DELETE | /api/v1/bank-accounts/:id | BankAccountController | remove | JWT + Admin/Owner | Delete account |

### SETTLEMENT ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/settlements | SettlementController | create | JWT + Admin | Create settlement |
| POST | /api/v1/settlements/:id/complete | SettlementController | complete | JWT + Admin | Complete settlement |
| GET | /api/v1/settlements/:id | SettlementController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/settlements/escrow/:escrowId | SettlementController | findByEscrow | JWT + Admin | Get by escrow |

### CONVERSATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/communication/conversations | ConversationController | create | JWT | Create conversation |
| GET | /api/v1/communication/conversations | ConversationController | findAll | JWT | Get all conversations |
| GET | /api/v1/communication/conversations/search | ConversationController | search | JWT | Search conversations |
| GET | /api/v1/communication/conversations/:id | ConversationController | findOne | JWT | Get by ID |
| PUT | /api/v1/communication/conversations/:id | ConversationController | update | JWT + Participant | Update conversation |
| POST | /api/v1/communication/conversations/:id/archive | ConversationController | archive | JWT + Participant | Archive conversation |
| POST | /api/v1/communication/conversations/:id/unarchive | ConversationController | unarchive | JWT + Participant | Unarchive conversation |
| DELETE | /api/v1/communication/conversations/:id | ConversationController | remove | JWT + Participant | Delete conversation |

### MESSAGE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/communication/messages | MessageController | send | JWT | Send message |
| GET | /api/v1/communication/messages | MessageController | findAll | JWT | Get all messages |
| GET | /api/v1/communication/messages/:id | MessageController | findOne | JWT | Get by ID |
| PUT | /api/v1/communication/messages/:id | MessageController | update | JWT + Sender | Update message |
| DELETE | /api/v1/communication/messages/:id | MessageController | remove | JWT + Sender | Delete message |
| POST | /api/v1/communication/messages/:id/reactions | MessageController | addReaction | JWT + Participant | Add reaction |
| DELETE | /api/v1/communication/messages/:id/reactions | MessageController | removeReaction | JWT + Participant | Remove reaction |
| POST | /api/v1/communication/messages/:id/read | MessageController | markAsRead | JWT + Recipient | Mark as read |

### BLOCKED CONVERSATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/communication/blocked-conversations/block | BlockedConversationController | block | JWT | Block conversation |
| POST | /api/v1/communication/blocked-conversations/unblock | BlockedConversationController | unblock | JWT | Unblock conversation |

### TYPING ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/communication/typing/start | TypingController | start | JWT | Start typing |
| POST | /api/v1/communication/typing/stop | TypingController | stop | JWT | Stop typing |

### NOTIFICATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/notifications | NotificationController | create | JWT + Admin | Create notification |
| PUT | /api/v1/notifications/:id/read | NotificationController | markAsRead | JWT + Recipient | Mark as read |
| PUT | /api/v1/notifications/:id/dismiss | NotificationController | dismiss | JWT + Recipient | Dismiss notification |
| GET | /api/v1/notifications/:id | NotificationController | findOne | JWT + Admin/Recipient | Get by ID |
| GET | /api/v1/notifications/user/:userId | NotificationController | findByUser | JWT + Admin/Self | Get by user |
| GET | /api/v1/notifications/user/:userId/unread | NotificationController | findUnread | JWT + Admin/Self | Get unread |
| GET | /api/v1/notifications | NotificationController | findAll | JWT + Admin | Get all notifications |

### NOTIFICATION PREFERENCE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/notification-preferences | NotificationPreferenceController | create | JWT + Admin/Self | Create preferences |
| PUT | /api/v1/notification-preferences/user/:userId | NotificationPreferenceController | update | JWT + Admin/Self | Update preferences |
| GET | /api/v1/notification-preferences/user/:userId | NotificationPreferenceController | findByUser | JWT + Admin/Self | Get by user |
| GET | /api/v1/notification-preferences/:id | NotificationPreferenceController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/notification-preferences | NotificationPreferenceController | findAll | JWT + Admin | Get all preferences |

### EMAIL NOTIFICATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/email-notifications | EmailNotificationController | create | JWT + Admin | Create email notification |
| PUT | /api/v1/email-notifications/:id/send | EmailNotificationController | send | JWT + Admin | Send email |
| GET | /api/v1/email-notifications/:id | EmailNotificationController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/email-notifications/notification/:notificationId | EmailNotificationController | findByNotification | JWT + Admin | Get by notification |
| GET | /api/v1/email-notifications/to/:to | EmailNotificationController | findByRecipient | JWT + Admin | Get by recipient |
| GET | /api/v1/email-notifications/status/:status | EmailNotificationController | findByStatus | JWT + Admin | Get by status |
| GET | /api/v1/email-notifications | EmailNotificationController | findAll | JWT + Admin | Get all |

### SMS NOTIFICATION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/sms-notifications | SMSNotificationController | create | JWT + Admin | Create SMS notification |
| PUT | /api/v1/sms-notifications/:id/send | SMSNotificationController | send | JWT + Admin | Send SMS |
| GET | /api/v1/sms-notifications/:id | SMSNotificationController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/sms-notifications/notification/:notificationId | SMSNotificationController | findByNotification | JWT + Admin | Get by notification |
| GET | /api/v1/sms-notifications/to/:to | SMSNotificationController | findByRecipient | JWT + Admin | Get by recipient |
| GET | /api/v1/sms-notifications/status/:status | SMSNotificationController | findByStatus | JWT + Admin | Get by status |
| GET | /api/v1/sms-notifications | SMSNotificationController | findAll | JWT + Admin | Get all |

### PUSH SUBSCRIPTION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/push-subscriptions | PushSubscriptionController | create | JWT | Create subscription |
| PUT | /api/v1/push-subscriptions/:id | PushSubscriptionController | update | JWT + Owner | Update subscription |
| DELETE | /api/v1/push-subscriptions/:id | PushSubscriptionController | remove | JWT + Owner | Delete subscription |
| POST | /api/v1/push-subscriptions/user/:userId/send | PushSubscriptionController | sendToUser | JWT + Admin | Send to user |
| GET | /api/v1/push-subscriptions/:id | PushSubscriptionController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/push-subscriptions/user/:userId | PushSubscriptionController | findByUser | JWT + Admin/Self | Get by user |
| GET | /api/v1/push-subscriptions/active | PushSubscriptionController | findActive | JWT + Admin | Get active |
| GET | /api/v1/push-subscriptions | PushSubscriptionController | findAll | JWT + Admin | Get all |

### NOTIFICATION TEMPLATE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/notification-templates | NotificationTemplateController | create | JWT + Admin | Create template |
| PUT | /api/v1/notification-templates/:id | NotificationTemplateController | update | JWT + Admin | Update template |
| DELETE | /api/v1/notification-templates/:id | NotificationTemplateController | remove | JWT + Admin | Delete template |
| GET | /api/v1/notification-templates/:id | NotificationTemplateController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/notification-templates/name/:name | NotificationTemplateController | findByName | JWT + Admin | Get by name |
| GET | /api/v1/notification-templates/type/:type | NotificationTemplateController | findByType | JWT + Admin | Get by type |
| GET | /api/v1/notification-templates/active | NotificationTemplateController | findActive | JWT + Admin | Get active |
| GET | /api/v1/notification-templates | NotificationTemplateController | findAll | JWT + Admin | Get all |

### NOTIFICATION QUEUE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/notification-queue | NotificationQueueController | create | JWT + Admin | Create queue item |
| PUT | /api/v1/notification-queue/:id | NotificationQueueController | update | JWT + Admin | Update queue item |
| PUT | /api/v1/notification-queue/:id/process | NotificationQueueController | process | JWT + Admin | Process queue item |
| GET | /api/v1/notification-queue/:id | NotificationQueueController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/notification-queue/notification/:notificationId | NotificationQueueController | findByNotification | JWT + Admin | Get by notification |
| GET | /api/v1/notification-queue/channel/:channel | NotificationQueueController | findByChannel | JWT + Admin | Get by channel |
| GET | /api/v1/notification-queue/status/:status | NotificationQueueController | findByStatus | JWT + Admin | Get by status |
| GET | /api/v1/notification-queue/pending | NotificationQueueController | findPending | JWT + Admin | Get pending |
| GET | /api/v1/notification-queue/failed | NotificationQueueController | findFailed | JWT + Admin | Get failed |
| GET | /api/v1/notification-queue | NotificationQueueController | findAll | JWT + Admin | Get all |

### ADMIN CORE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/admin/users/moderate | AdminController | moderateUser | JWT + Admin | Moderate user |
| POST | /api/v1/admin/users/suspend | AdminController | suspendUser | JWT + Admin | Suspend user |
| POST | /api/v1/admin/users/reactivate | AdminController | reactivateUser | JWT + Admin | Reactivate user |
| POST | /api/v1/admin/properties/approve | AdminController | approveProperty | JWT + Admin | Approve property |
| POST | /api/v1/admin/properties/reject | AdminController | rejectProperty | JWT + Admin | Reject property |
| GET | /api/v1/admin/actions/:adminId | AdminController | getAdminActions | JWT + Admin | Get admin actions |
| GET | /api/v1/admin/audit-logs | AdminController | getAuditLogs | JWT + Admin | Get audit logs |
| GET | /api/v1/admin/activity-logs | AdminController | getActivityLogs | JWT + Admin | Get activity logs |

### ACTIVITY LOG ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/activity-logs/:id | ActivityController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/activity-logs/user/:userId | ActivityController | findByUser | JWT + Admin | Get by user |
| GET | /api/v1/activity-logs/action/:action | ActivityController | findByAction | JWT + Admin | Get by action |
| GET | /api/v1/activity-logs/request/:requestId | ActivityController | findByRequest | JWT + Admin | Get by request |
| GET | /api/v1/activity-logs | ActivityController | findAll | JWT + Admin | Get all |

### API KEY ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/api-keys | ApiKeyController | create | JWT + Admin | Create API key |
| PUT | /api/v1/api-keys/:id/rotate | ApiKeyController | rotate | JWT + Admin | Rotate API key |
| PUT | /api/v1/api-keys/:id/revoke | ApiKeyController | revoke | JWT + Admin | Revoke API key |
| DELETE | /api/v1/api-keys/:id | ApiKeyController | remove | JWT + Admin | Delete API key |
| GET | /api/v1/api-keys/:id | ApiKeyController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/api-keys/user/:userId | ApiKeyController | findByUser | JWT + Admin | Get by user |
| GET | /api/v1/api-keys | ApiKeyController | findAll | JWT + Admin | Get all |

### AUDIT LOG ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/audit-logs/:id | AuditController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/audit-logs/actor/:actorId | AuditController | findByActor | JWT + Admin | Get by actor |
| GET | /api/v1/audit-logs/entity/:entityType/:entityId | AuditController | findByEntity | JWT + Admin | Get by entity |
| GET | /api/v1/audit-logs/action/:action | AuditController | findByAction | JWT + Admin | Get by action |
| GET | /api/v1/audit-logs/request/:requestId | AuditController | findByRequest | JWT + Admin | Get by request |
| GET | /api/v1/audit-logs | AuditController | findAll | JWT + Admin | Get all |

### BACKGROUND JOB ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/background-jobs | BackgroundJobController | create | JWT + Admin | Create job |
| PUT | /api/v1/background-jobs/:id/start | BackgroundJobController | start | JWT + Admin | Start job |
| PUT | /api/v1/background-jobs/:id/complete | BackgroundJobController | complete | JWT + Admin | Complete job |
| PUT | /api/v1/background-jobs/:id/fail | BackgroundJobController | fail | JWT + Admin | Fail job |
| DELETE | /api/v1/background-jobs/:id | BackgroundJobController | remove | JWT + Admin | Delete job |
| GET | /api/v1/background-jobs/:id | BackgroundJobController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/background-jobs/queue/:queue | BackgroundJobController | findByQueue | JWT + Admin | Get by queue |
| GET | /api/v1/background-jobs/status/:status | BackgroundJobController | findByStatus | JWT + Admin | Get by status |
| GET | /api/v1/background-jobs/pending | BackgroundJobController | findPending | JWT + Admin | Get pending |
| GET | /api/v1/background-jobs/failed | BackgroundJobController | findFailed | JWT + Admin | Get failed |
| GET | /api/v1/background-jobs | BackgroundJobController | findAll | JWT + Admin | Get all |

### FEATURE FLAG ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/feature-flags | FeatureFlagController | create | JWT + Admin | Create flag |
| PUT | /api/v1/feature-flags/:id | FeatureFlagController | update | JWT + Admin | Update flag |
| DELETE | /api/v1/feature-flags/:id | FeatureFlagController | remove | JWT + Admin | Delete flag |
| GET | /api/v1/feature-flags/:id | FeatureFlagController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/feature-flags/key/:key | FeatureFlagController | findByKey | JWT + Admin | Get by key |
| GET | /api/v1/feature-flags/check/:key | FeatureFlagController | check | JWT | Check if enabled |
| GET | /api/v1/feature-flags | FeatureFlagController | findAll | JWT + Admin | Get all |

### REPORT ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/reports | ReportController | create | JWT | Create report |
| PUT | /api/v1/reports/:id/status | ReportController | updateStatus | JWT + Admin | Update status |
| GET | /api/v1/reports/:id | ReportController | findOne | JWT + Admin/Reporter | Get by ID |
| GET | /api/v1/reports/category/:categoryId | ReportController | findByCategory | JWT + Admin | Get by category |
| GET | /api/v1/reports/reported-by/:reportedBy | ReportController | findByReporter | JWT + Admin | Get by reporter |
| GET | /api/v1/reports/entity/:entityType/:entityId | ReportController | findByEntity | JWT + Admin | Get by entity |
| GET | /api/v1/reports/status/:status | ReportController | findByStatus | JWT + Admin | Get by status |
| GET | /api/v1/reports/assigned/:assignedTo | ReportController | findByAssignee | JWT + Admin | Get by assignee |
| GET | /api/v1/reports | ReportController | findAll | JWT + Admin | Get all |

### SYSTEM SETTING ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/system-settings | SystemSettingController | create | JWT + Admin | Create setting |
| PUT | /api/v1/system-settings/:id | SystemSettingController | update | JWT + Admin | Update setting |
| DELETE | /api/v1/system-settings/:id | SystemSettingController | remove | JWT + Admin | Delete setting |
| GET | /api/v1/system-settings/:id | SystemSettingController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/system-settings/key/:key | SystemSettingController | findByKey | Public if isPublic | Get by key |
| GET | /api/v1/system-settings/category/:category | SystemSettingController | findByCategory | JWT + Admin | Get by category |
| GET | /api/v1/system-settings | SystemSettingController | findAll | JWT + Admin | Get all |

### WEBHOOK ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/webhooks | WebhookController | create | JWT + Admin | Create webhook |
| PUT | /api/v1/webhooks/:id | WebhookController | update | JWT + Admin | Update webhook |
| DELETE | /api/v1/webhooks/:id | WebhookController | remove | JWT + Admin | Delete webhook |
| POST | /api/v1/webhooks/:id/trigger | WebhookController | trigger | JWT + Admin | Trigger webhook |
| GET | /api/v1/webhooks/:id | WebhookController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/webhooks/:id/deliveries | WebhookController | getDeliveries | JWT + Admin | Get deliveries |
| GET | /api/v1/webhooks/pending-retries | WebhookController | getPendingRetries | JWT + Admin | Get pending retries |
| GET | /api/v1/webhooks | WebhookController | findAll | JWT + Admin | Get all |

### STORAGE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/storage/upload | StorageController | upload | JWT | Single file upload |
| POST | /api/v1/storage/bulk-upload | StorageController | bulkUpload | JWT | Bulk file upload |
| GET | /api/v1/storage | StorageController | findAll | JWT | List files |
| GET | /api/v1/storage/:id | StorageController | findOne | JWT | Get file by ID |
| GET | /api/v1/storage/entity/:entityType/:entityId | StorageController | findByEntity | JWT | Get by entity |
| GET | /api/v1/storage/category/:category | StorageController | findByCategory | JWT | Get by category |
| GET | /api/v1/storage/:id/metadata | StorageController | getMetadata | JWT | Get metadata |
| POST | /api/v1/storage/:id/signed-url | StorageController | generateSignedUrl | JWT | Generate signed URL |
| PATCH | /api/v1/storage/:id | StorageController | update | JWT + Owner | Update metadata |
| POST | /api/v1/storage/:id/replace | StorageController | replace | JWT + Owner | Replace file |
| POST | /api/v1/storage/:id/move | StorageController | move | JWT + Owner | Move file |
| POST | /api/v1/storage/:id/copy | StorageController | copy | JWT + Owner | Copy file |
| POST | /api/v1/storage/:id/restore | StorageController | restore | JWT + Owner | Restore file |
| DELETE | /api/v1/storage/bulk-delete | StorageController | bulkDelete | JWT | Bulk delete |
| DELETE | /api/v1/storage/:id | StorageController | remove | JWT + Owner | Delete file |

### PAYMENT WEBHOOK ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/webhooks/paystack | WebhookController | handlePaystack | Public | Paystack webhook |
| POST | /api/v1/webhooks/flutterwave | WebhookController | handleFlutterwave | Public | Flutterwave webhook |

### ROLE ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/roles | RoleController | create | JWT + Admin | Create role |
| GET | /api/v1/roles | RoleController | findAll | JWT + Admin | Get all roles |
| GET | /api/v1/roles/paginate | RoleController | paginate | JWT + Admin | Paginate roles |
| GET | /api/v1/roles/count | RoleController | count | JWT + Admin | Count roles |
| GET | /api/v1/roles/:id | RoleController | findOne | JWT + Admin | Get by ID |
| GET | /api/v1/roles/name/:name | RoleController | findByName | JWT + Admin | Get by name |
| GET | /api/v1/roles/type/:type | RoleController | findByType | JWT + Admin | Get by type |
| PUT | /api/v1/roles/:id | RoleController | update | JWT + Admin | Update role |
| DELETE | /api/v1/roles/:id | RoleController | remove | JWT + Admin | Delete role |
| GET | /api/v1/roles/exists | RoleController | exists | JWT + Admin | Check existence |

### PERMISSION ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| POST | /api/v1/permissions | PermissionController | create | JWT + Admin | Create permission |
| GET | /api/v1/permissions | PermissionController | findAll | JWT + Admin | Get all permissions |
| GET | /api/v1/permissions/paginate | PermissionController | paginate | JWT + Admin | Paginate permissions |
| GET | /api/v1/permissions/count | PermissionController | count | JWT + Admin | Count permissions |
| GET | /api/v1/permissions/:id | PermissionController | findOne | JWT + Admin | Get by ID |
| PUT | /api/v1/permissions/:id | PermissionController | update | JWT + Admin | Update permission |
| DELETE | /api/v1/permissions/:id | PermissionController | remove | JWT + Admin | Delete permission |
| GET | /api/v1/permissions/exists | PermissionController | exists | JWT + Admin | Check existence |

### HEALTH ENDPOINTS

| Method | URL | Controller | Function | Auth | Description |
|--------|-----|------------|----------|------|-------------|
| GET | /api/v1/health | HealthController | check | Public | Health check |
| GET | /api/v1/health/live | HealthController | live | Public | Liveness probe |
| GET | /api/v1/health/ready | HealthController | ready | Public | Readiness probe |

### ROLE-SPECIFIC ENDPOINTS

**Buyer Endpoints**
- GET /api/v1/buyer/dashboard - Buyer dashboard
- GET /api/v1/buyer/recommendations - Buyer recommendations
- GET /api/v1/buyer/saved-properties - Saved properties
- GET /api/v1/buyer/offers - Buyer offers
- GET /api/v1/buyer/comparisons - Property comparisons
- GET /api/v1/buyer/inspections - Buyer inspections

**Tenant Endpoints**
- GET /api/v1/tenant/dashboard - Tenant dashboard
- GET /api/v1/tenant/leases - Tenant leases
- GET /api/v1/tenant/applications - Tenant applications
- GET /api/v1/tenant/maintenance - Maintenance requests
- GET /api/v1/tenant/payments - Tenant payments
- GET /api/v1/tenant/inspections - Tenant inspections

**Landlord Endpoints**
- GET /api/v1/landlord/dashboard - Landlord dashboard
- GET /api/v1/landlord/properties - Landlord properties
- GET /api/v1/landlord/tenants - Landlord tenants
- GET /api/v1/landlord/analytics - Landlord analytics
- GET /api/v1/landlord/rent-collection - Rent collection
- GET /api/v1/landlord/maintenance - Maintenance requests
- GET /api/v1/landlord/inspections - Inspection management

**Agent Endpoints**
- GET /api/v1/agent/dashboard - Agent dashboard
- GET /api/v1/agent/listings - Agent listings
- GET /api/v1/agent/leads - Agent leads
- GET /api/v1/agent/clients - Agent clients
- GET /api/v1/agent/commissions - Commission tracking
- GET /api/v1/agent/appointments - Agent appointments
- GET /api/v1/agent/deals - Agent deals

**Developer Endpoints**
- GET /api/v1/developer/dashboard - Developer dashboard
- GET /api/v1/developer/projects - Developer projects
- GET /api/v1/developer/units - Developer units
- GET /api/v1/developer/sales - Developer sales
- GET /api/v1/developer/reservations - Developer reservations
- GET /api/v1/developer/construction - Construction progress

---

## PART 22 — FINANCE MODULE

### OVERVIEW

The Finance Module is the financial heart of CribSeekers. Every payment—inspection, escrow, premium subscriptions, featured listings, or future revenue streams—passes through this module, ensuring consistent fee calculation, accounting, and reporting.

### MODULE STRUCTURE

```
Finance Module
│
├── Revenue Engine
├── Commission Engine
├── Platform Wallet
├── Ledger
├── Settlement Engine
├── Payout Engine
├── Revenue Analytics
├── Invoice Generator
├── Receipt Generator
└── Tax & Reporting
```

### REVENUE ENGINE

**Purpose**: Calculate and collect platform fees from all transactions

**Fee Structures:**

**Inspection Fee**
- Fixed fee: ₦5,000 per inspection
- Platform commission: 40% (₦2,000)
- Inspector/Agent commission: 60% (₦3,000)

**Escrow Fee**
- Percentage fee: 2% of escrow amount
- Example: ₦600,000 rent → ₦12,000 platform fee
- Total charge: ₦612,000 (escrow + fee)

**Premium Revenue (Phase 2)**
- Unlimited Matches: ₦X/month
- Verification Badge: ₦X one-time
- Boost Property: ₦X per boost
- Featured Property: ₦X per day
- AI Recommendation: ₦X per month
- Priority Search: ₦X per month

**Advertisement Revenue**
- Banner ads: ₦X per CPM
- Featured listings: ₦X per day
- Sponsored content: ₦X per post

**Moving Services (Future)**
- Commission: X% of service fee

### COMMISSION ENGINE

**Purpose**: Calculate and distribute commissions to service providers

**Commission Rules:**

**Inspection Commission**
- Platform: 40%
- Inspector/Agent: 60%
- Automatic distribution on successful payment

**Escrow Commission**
- Platform: 100% of escrow fee
- No commission split for escrow (platform retains full fee)

**Premium Commission**
- Platform: 100% (direct revenue)

**Advertisement Commission**
- Platform: 100% (direct revenue)

**Referral Commission (Future)**
- Referrer: X% of first transaction

### PLATFORM WALLET

**Purpose**: Central wallet for all platform revenue

**Wallet Structure:**
- Wallet ID: Platform system wallet
- Currency: NGN
- Status: ACTIVE
- Balance: Cumulative revenue

**Credit Transactions:**
- Inspection fees: +₦2,000 per inspection
- Escrow fees: +2% of escrow amount
- Premium subscriptions: +₦X per subscription
- Advertisement revenue: +₦X per ad
- Moving services: +X% of service fee

**Debit Transactions:**
- Payouts to agents: -₦X per payout
- Platform expenses: -₦X per expense
- Refunds: -₦X per refund

### FINANCE LEDGER

**Purpose**: Record every financial transaction for audit and analytics

**Ledger Entry Structure:**

**Transaction Record:**
```typescript
{
  id: string;
  transactionType: 'INSPECTION' | 'ESCROW' | 'PREMIUM' | 'ADVERTISEMENT' | 'MOVING_SERVICE' | 'REFUND' | 'PAYOUT';
  source: string;
  amount: number;
  currency: string;
  platformRevenue: number;
  serviceProviderRevenue: number;
  customerId: string;
  serviceProviderId: string;
  reference: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  createdAt: DateTime;
  metadata: Json;
}
```

**Example Records:**

**Inspection Payment:**
```json
{
  "transactionType": "INSPECTION",
  "source": "Inspection Payment",
  "customerId": "buyer-123",
  "amount": 5000,
  "platformRevenue": 2000,
  "serviceProviderRevenue": 3000,
  "serviceProviderId": "agent-456",
  "reference": "INS-2024-001",
  "status": "SUCCESS"
}
```

**Escrow Transaction:**
```json
{
  "transactionType": "ESCROW",
  "source": "Rent Escrow",
  "customerId": "tenant-789",
  "amount": 612000,
  "platformRevenue": 12000,
  "serviceProviderRevenue": 0,
  "reference": "ESC-2024-001",
  "status": "SUCCESS"
}
```

### SETTLEMENT ENGINE

**Purpose**: Process settlements and distribute funds

**Settlement Workflow:**

**Inspection Settlement:**
1. Payment successful
2. Calculate commission (40/60 split)
3. Credit platform wallet (₦2,000)
4. Credit inspector wallet (₦3,000)
5. Generate ledger entries
6. Return success

**Escrow Settlement:**
1. Escrow funded
2. Calculate platform fee (2%)
3. Credit platform wallet (fee amount)
4. Hold escrow amount
5. On release: transfer to payee
6. Generate ledger entries

**Premium Settlement:**
1. Payment successful
2. Credit platform wallet (full amount)
3. Generate ledger entry
4. Activate premium feature

**Advertisement Settlement:**
1. Ad displayed/impression
2. Calculate revenue
3. Credit platform wallet
4. Generate ledger entry

### PAYOUT ENGINE

**Purpose**: Process withdrawals for agents and service providers

**Payout Workflow:**
1. Agent requests withdrawal
2. Admin approval
3. Paystack transfer
4. Debit agent wallet
5. Generate ledger entry
6. Mark as completed

**Payout Rules:**
- Minimum withdrawal: ₦10,000
- Processing time: 24-48 hours
- Fee: ₦100 per withdrawal (deducted from amount)
- Daily limit: ₦500,000 per agent
- Weekly limit: ₦2,000,000 per agent

### REVENUE ANALYTICS

**Purpose**: Provide real-time revenue insights for admin dashboard

**Analytics Metrics:**

**Today's Revenue:**
- Total: ₦42,000
- Inspection: ₦4,000
- Escrow: ₦12,000
- Premium: ₦15,000
- Ads: ₦11,000

**This Month:**
- Total: ₦1.8M
- Inspection: ₦400k
- Escrow: ₦900k
- Premium: ₦300k
- Ads: ₦200k

**Year to Date:**
- Total: ₦X
- Growth rate: X%
- Average daily: ₦X

**Revenue by Source:**
- Inspection: X%
- Escrow: X%
- Premium: X%
- Ads: X%
- Other: X%

**Revenue Trends:**
- Daily chart
- Monthly chart
- Yearly chart
- Forecast

### INVOICE GENERATOR

**Purpose**: Generate invoices for B2B customers

**Invoice Types:**
- Premium subscription invoices
- Advertisement invoices
- Bulk inspection booking invoices
- Enterprise partner invoices

**Invoice Structure:**
```typescript
{
  id: string;
  invoiceNumber: string;
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  dueDate: DateTime;
  createdAt: DateTime;
}
```

### RECEIPT GENERATOR

**Purpose**: Generate receipts for all transactions

**Receipt Types:**
- Inspection payment receipts
- Escrow fee receipts
- Premium subscription receipts
- Payout receipts

**Receipt Structure:**
```typescript
{
  id: string;
  receiptNumber: string;
  transactionId: string;
  customerId: string;
  amount: number;
  platformFee: number;
  serviceProviderFee: number;
  netAmount: number;
  issuedAt: DateTime;
}
```

### TAX & REPORTING

**Purpose**: Generate tax reports and financial statements

**Reports:**
- Monthly revenue report
- Quarterly tax report
- Annual financial statement
- Agent commission report
- Platform fee report
- Payout report

**Tax Calculation:**
- VAT: 7.5% (Nigeria)
- Withholding tax: 5% (for payouts)
- Corporate tax: 30% (annual)

### FINANCE ENDPOINTS

**Revenue Endpoints:**
- GET /api/v1/finance/revenue/today - Today's revenue
- GET /api/v1/finance/revenue/monthly - Monthly revenue
- GET /api/v1/finance/revenue/ytd - Year to date revenue
- GET /api/v1/finance/revenue/by-source - Revenue by source
- GET /api/v1/finance/revenue/trends - Revenue trends

**Commission Endpoints:**
- GET /api/v1/finance/commissions/:agentId - Agent commissions
- GET /api/v1/finance/commissions/pending - Pending commissions
- POST /api/v1/finance/commissions/calculate - Calculate commission
- POST /api/v1/finance/commissions/distribute - Distribute commission

**Platform Wallet Endpoints:**
- GET /api/v1/finance/platform-wallet/balance - Platform wallet balance
- GET /api/v1/finance/platform-wallet/transactions - Platform wallet transactions
- POST /api/v1/finance/platform-wallet/credit - Credit platform wallet
- POST /api/v1/finance/platform-wallet/debit - Debit platform wallet

**Ledger Endpoints:**
- GET /api/v1/finance/ledger - All ledger entries
- GET /api/v1/finance/ledger/:id - Ledger entry by ID
- GET /api/v1/finance/ledger/transaction/:transactionId - Entries by transaction
- GET /api/v1/finance/ledger/customer/:customerId - Entries by customer
- GET /api/v1/finance/ledger/provider/:providerId - Entries by provider
- GET /api/v1/finance/ledger/date-range - Entries by date range
- POST /api/v1/finance/ledger/export - Export ledger

**Settlement Endpoints:**
- POST /api/v1/finance/settlements/inspection - Process inspection settlement
- POST /api/v1/finance/settlements/escrow - Process escrow settlement
- POST /api/v1/finance/settlements/premium - Process premium settlement
- GET /api/v1/finance/settlements/pending - Pending settlements
- GET /api/v1/finance/settlements/:id - Settlement by ID

**Payout Endpoints:**
- POST /api/v1/finance/payouts/request - Request payout
- POST /api/v1/finance/payouts/:id/approve - Approve payout
- POST /api/v1/finance/payouts/:id/reject - Reject payout
- POST /api/v1/finance/payouts/:id/process - Process payout
- GET /api/v1/finance/payouts/:id - Payout by ID
- GET /api/v1/finance/payouts/agent/:agentId - Payouts by agent
- GET /api/v1/finance/payouts/pending - Pending payouts
- GET /api/v1/finance/payouts/processing - Processing payouts

**Analytics Endpoints:**
- GET /api/v1/finance/analytics/dashboard - Dashboard analytics
- GET /api/v1/finance/analytics/revenue - Revenue analytics
- GET /api/v1/finance/analytics/commissions - Commission analytics
- GET /api/v1/finance/analytics/payouts - Payout analytics
- GET /api/v1/finance/analytics/profit - Profit analytics

**Invoice Endpoints:**
- POST /api/v1/finance/invoices - Generate invoice
- GET /api/v1/finance/invoices/:id - Invoice by ID
- GET /api/v1/finance/invoices/customer/:customerId - Invoices by customer
- GET /api/v1/finance/invoices/status/:status - Invoices by status
- POST /api/v1/finance/invoices/:id/send - Send invoice
- POST /api/v1/finance/invoices/:id/mark-paid - Mark as paid

**Receipt Endpoints:**
- POST /api/v1/finance/receipts - Generate receipt
- GET /api/v1/finance/receipts/:id - Receipt by ID
- GET /api/v1/finance/receipts/transaction/:transactionId - Receipts by transaction
- GET /api/v1/finance/receipts/customer/:customerId - Receipts by customer
- POST /api/v1/finance/receipts/:id/send - Send receipt

**Reporting Endpoints:**
- GET /api/v1/finance/reports/monthly - Monthly revenue report
- GET /api/v1/finance/reports/quarterly - Quarterly tax report
- GET /api/v1/finance/reports/annual - Annual financial statement
- GET /api/v1/finance/reports/commissions - Agent commission report
- GET /api/v1/finance/reports/platform-fees - Platform fee report
- GET /api/v1/finance/reports/payouts - Payout report
- POST /api/v1/finance/reports/export - Export report

### FINANCE MODELS

**FinanceTransaction Model:**
```typescript
{
  id: string;
  transactionType: TransactionType;
  source: string;
  amount: number;
  currency: string;
  platformRevenue: number;
  serviceProviderRevenue: number;
  customerId: string;
  serviceProviderId: string;
  reference: string;
  status: TransactionStatus;
  metadata: Json;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

**Commission Model:**
```typescript
{
  id: string;
  transactionId: string;
  agentId: string;
  commissionType: CommissionType;
  amount: number;
  percentage: number;
  status: CommissionStatus;
  paidAt: DateTime;
  createdAt: DateTime;
}
```

**Settlement Model:**
```typescript
{
  id: string;
  entityType: string;
  entityId: string;
  amount: number;
  platformFee: number;
  serviceProviderFee: number;
  status: SettlementStatus;
  processedAt: DateTime;
  createdAt: DateTime;
}
```

**Payout Model:**
```typescript
{
  id: string;
  agentId: string;
  amount: number;
  fee: number;
  netAmount: number;
  bankAccountId: string;
  status: PayoutStatus;
  approvedBy: string;
  approvedAt: DateTime;
  processedAt: DateTime;
  reference: string;
  createdAt: DateTime;
}
```

**RevenueRecord Model:**
```typescript
{
  id: string;
  source: RevenueSource;
  amount: number;
  date: DateTime;
  customerId: string;
  reference: string;
  status: string;
  createdAt: DateTime;
}
```

### FINANCE ENUMS

**TransactionType:**
- INSPECTION
- ESCROW
- PREMIUM
- ADVERTISEMENT
- MOVING_SERVICE
- REFUND
- PAYOUT

**CommissionType:**
- INSPECTION_COMMISSION
- REFERRAL_COMMISSION
- PARTNER_COMMISSION

**CommissionStatus:**
- PENDING
- APPROVED
- PAID
- FAILED

**SettlementStatus:**
- PENDING
- PROCESSING
- COMPLETED
- FAILED

**PayoutStatus:**
- PENDING
- APPROVED
- PROCESSING
- COMPLETED
- FAILED
- REJECTED

**RevenueSource:**
- INSPECTION
- ESCROW
- PREMIUM
- ADVERTISEMENT
- MOVING_SERVICE

### FRONTEND REQUIREMENTS

**Admin Dashboard:**
- Revenue cards (Today, This Month, YTD)
- Revenue by source chart
- Revenue trend chart
- Top revenue generators
- Pending settlements
- Pending payouts

**Finance Management:**
- Ledger table with filters
- Transaction details modal
- Commission management
- Payout approval queue
- Settlement history

**Agent Portal:**
- Commission dashboard
- Payout history
- Payout request form
- Commission breakdown
- Earnings chart

**Reporting:**
- Report generation
- Report download (PDF, Excel)
- Report scheduling
- Report templates

### INTEGRATION POINTS

**Inspection Module:**
- On payment success → Call settlement engine
- Calculate commission → Credit wallets
- Generate ledger entry

**Escrow Module:**
- On escrow funded → Calculate platform fee
- On escrow release → Process settlement
- Generate ledger entries

**Payment Module:**
- On payment success → Call revenue engine
- Calculate fees → Credit platform wallet
- Generate ledger entry

**Premium Module (Phase 2):**
- On subscription → Credit platform wallet
- Generate ledger entry
- Generate invoice

**Advertisement Module (Phase 2):**
- On ad display → Calculate revenue
- Credit platform wallet
- Generate ledger entry

### SECURITY CONSIDERATIONS

**Never Trust Frontend:**
- All fee calculations on backend
- All commission calculations on backend
- All settlement logic on backend
- Frontend only displays results

**Audit Trail:**
- Every transaction logged
- Every settlement logged
- Every payout logged
- Immutable ledger records

**Validation:**
- Validate fee calculations
- Validate commission splits
- Validate settlement amounts
- Validate payout amounts

**Reconciliation:**
- Daily reconciliation
- Monthly reconciliation
- Dispute resolution
- Refund handling

---

**[Document truncated - file too large for single operation. The specification continues with Parts 3-21 covering Role Analysis, Authentication Flow, User Profile, Property System, Search System, Inspections, Wallet, Escrow, Messaging, Notifications, Payments, Admin, File Storage, Enums, DTO Documentation, Frontend Requirements, Page Mapping, Missing Backend Features, and Frontend Generation Blueprint.]**
