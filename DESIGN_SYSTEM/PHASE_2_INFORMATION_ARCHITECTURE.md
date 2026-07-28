# CribSeekers Design System
## Phase 2: Information Architecture

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document defines the information architecture for CribSeekers, establishing content hierarchy, data models, navigation patterns, and information relationships. The IA ensures that users can intuitively find, understand, and interact with all platform features.

**Key Principles:**
- Progressive disclosure - Show essential information first, reveal details on demand
- Consistent patterns - Reusable information structures across modules
- Clear hierarchy - Visual and logical prioritization of content
- Contextual relevance - Information appears where and when needed
- Scalable structure - Architecture that grows with product evolution

---

# Content Models

## 1. Property Content Model

### Primary Property Object
```
Property
├── id: string (UUID)
├── title: string (required, max 100 chars)
├── slug: string (URL-friendly)
├── description: string (rich text, max 5000 chars)
├── type: enum
│   ├── apartment
│   ├── house
│   ├── duplex
│   ├── terrace
│   ├── bungalow
│   ├── penthouse
│   ├── studio
│   └── commercial
├── purpose: enum
│   ├── rent
│   ├── sale
│   └── shortlet
├── status: enum
│   ├── draft
│   ├── published
│   ├── rented
│   ├── sold
│   ├── archived
│   └── under_review
├── pricing
│   ├── amount: number (NGN)
│   ├── period: enum (year, month, week, day, one-time)
│   ├── currency: string (default: NGN)
│   ├── negotiable: boolean
│   └── paymentTerms: string
├── location
│   ├── address: string
│   ├── city: string
│   ├── state: string
│   ├── lga: string
│   ├── estate: string (optional)
│   ├── landmark: string (optional)
│   ├── coordinates
│   │   ├── latitude: number
│   │   └── longitude: number
│   └── neighborhood: string
├── specifications
│   ├── bedrooms: number (0-20)
│   ├── bathrooms: number (0-15)
│   ├── toilets: number (0-15)
│   ├── parkingSpaces: number (0-10)
│   ├── totalArea: number (sqm)
│   ├── coveredArea: number (sqm)
│   ├── floorNumber: number
│   ├── totalFloors: number
│   ├── yearBuilt: number
│   ├── furnishing: enum
│   │   ├── unfurnished
│   │   ├── semi-furnished
│   │   └── fully-furnished
│   └── condition: enum
│       ├── new
│       ├── renovated
│       ├── good
│       └── fair
├── amenities: array
│   ├── id: string
│   ├── name: string
│   ├── icon: string
│   └── category: string
├── media
│   ├── images: array
│   │   ├── id: string
│   │   ├── url: string
│   │   ├── thumbnail: string
│   │   ├── caption: string
│   │   ├── order: number
│   │   └── isPrimary: boolean
│   ├── videos: array
│   │   ├── id: string
│   │   ├── url: string
│   │   ├── thumbnail: string
│   │   └── duration: number
│   ├── virtualTour: object (optional)
│   │   ├── url: string
│   │   ├── type: enum (360, video, interactive)
│   │   └── provider: string
│   └── floorPlan: object (optional)
│       ├── url: string
│       └── thumbnail: string
├── owner
│   ├── id: string
│   ├── name: string
│   ├── type: enum (landlord, agent, developer)
│   ├── avatar: string
│   ├── verified: boolean
│   ├── rating: number (0-5)
│   └── responseRate: number (percentage)
├── availability
│   ├── availableFrom: date
│   ├── minimumStay: number (months)
│   ├── maximumStay: number (months)
│   ├── viewingHours: object
│   │   ├── weekdays: string (e.g., "9AM-6PM")
│   │   └── weekends: string (e.g., "10AM-4PM")
│   └── moveInDate: date
├── rules
│   ├── petsAllowed: boolean
│   ├── smokingAllowed: boolean
│   ├── guestsAllowed: boolean
│   ├── genderPreference: enum (any, male, female, family)
│   └── additionalRules: array of strings
├── verification
│   ├── isVerified: boolean
│   ├── verifiedAt: date
│   ├── verifiedBy: string
│   ├── documents: array
│   │   ├── type: string
│   │   └── url: string
│   └── status: enum (pending, verified, rejected)
├── analytics
│   ├── views: number
│   ├── inquiries: number
│   ├── bookings: number
│   ├── shares: number
│   ├── saves: number
│   └── lastViewed: date
├── tags: array of strings
├── features: array of strings
├── nearbyPlaces: array
│   ├── type: enum (school, hospital, mall, transit, restaurant, bank)
│   ├── name: string
│   ├── distance: number (meters)
│   └── duration: number (minutes)
├── timeline: array
│   ├── event: string
│   ├── date: date
│   └── description: string
├── documents: array
│   ├── type: string
│   ├── name: string
│   ├── url: string
│   └── uploadedAt: date
├── createdAt: date
├── updatedAt: date
└── publishedAt: date
```

### Property Display Hierarchy

**Hero Section (Top Priority)**
- Primary image
- Title
- Price + period
- Location (city, state)
- Status badge (verified, new, etc.)
- Save button

**Key Information (High Priority)**
- Bedrooms, bathrooms, parking
- Total area
- Property type
- Purpose (rent/sale)
- Owner name + avatar
- Response rate

**Details (Medium Priority)**
- Description
- Amenities
- Specifications
- Availability
- Rules
- Nearby places

**Extended Information (Low Priority)**
- Timeline
- Documents
- Analytics (for owners)
- Reviews (future)

---

## 2. User Content Model

### Primary User Object
```
User
├── id: string (UUID)
├── profile
│   ├── firstName: string (required)
│   ├── lastName: string (required)
│   ├── displayName: string
│   ├── avatar: string (URL)
│   ├── coverImage: string (URL)
│   ├── bio: string (max 500 chars)
│   ├── dateOfBirth: date
│   ├── gender: enum (male, female, other, prefer-not-to-say)
│   ├── nationality: string
│   └── languages: array of strings
├── contact
│   ├── email: string (required, unique)
│   ├── phone: string
│   ├── phoneVerified: boolean
│   ├── emailVerified: boolean
│   └── preferredContact: enum (email, phone, both)
├── location
│   ├── address: string
│   ├── city: string
│   ├── state: string
│   ├── country: string (default: Nigeria)
│   └── coordinates
│       ├── latitude: number
│       └── longitude: number
├── preferences
│   ├── propertyTypes: array of enums
│   ├── purposes: array of enums (rent, sale, shortlet)
│   ├── priceRange
│   │   ├── min: number
│   │   └── max: number
│   ├── preferredCities: array of strings
│   ├── preferredStates: array of strings
│   ├── amenities: array of strings
│   ├── moveInDate: date
│   ├── notifications
│   │   ├── email: boolean
│   │   ├── sms: boolean
│   │   ├── push: boolean
│   │   └── inApp: boolean
│   └── language: string (default: en)
├── role: enum
│   ├── user
│   ├── landlord
│   ├── agent
│   ├── inspector
│   ├── support_admin
│   └── super_admin
├── verification
│   ├── kycStatus: enum (not_started, pending, verified, rejected)
│   ├── kycSubmittedAt: date
│   ├── kycVerifiedAt: date
│   ├── identityType: enum (nin, passport, drivers_license)
│   ├── identityNumber: string
│   ├── identityDocument: string (URL)
│   ├── selfieDocument: string (URL)
│   └── verificationScore: number (0-100)
├── security
│   ├── passwordLastChanged: date
│   ├── twoFactorEnabled: boolean
│   ├── twoFactorMethod: enum (sms, app, email)
│   ├── loginAttempts: number
│   ├── lastLogin: date
│   ├── lastLoginIp: string
│   └── sessions: array
│       ├── id: string
│       ├── device: string
│       ├── browser: string
│       ├── os: string
│       ├── location: string
│       ├── ipAddress: string
│       └── lastActive: date
├── wallet
│   ├── id: string
│   ├── balance: number
│   ├── currency: string (NGN)
│   ├── status: enum (active, frozen, closed)
│   ├── frozenAt: date (if applicable)
│   ├── closedAt: date (if applicable)
│   └── createdAt: date
├── statistics
│   ├── propertiesViewed: number
│   ├── propertiesSaved: number
│   ├── inspectionsBooked: number
│   ├── inspectionsAttended: number
│   ├── messagesSent: number
│   ├── paymentsMade: number
│   └── accountAge: number (days)
├── connectedAccounts
│   ├── google: object (optional)
│   ├── facebook: object (optional)
│   └── apple: object (optional)
├── bankAccounts: array
│   ├── id: string
│   ├── bankName: string
│   ├── accountNumber: string
│   ├── accountName: string
│   ├── isDefault: boolean
│   └── verified: boolean
├── createdAt: date
├── updatedAt: date
└── lastActive: date
```

### User Display Hierarchy

**Profile Header (Top Priority)**
- Avatar
- Display name
- Role badge
- Verification status
- Response rate (for landlords/agents)

**Contact Information (High Priority)**
- Email
- Phone
- Location

**Preferences (Medium Priority)**
- Property preferences
- Notification settings
- Language

**Account Information (Low Priority)**
- Account age
- Statistics
- Connected accounts
- Security settings

---

## 3. Inspection Content Model

### Primary Inspection Object
```
Inspection
├── id: string (UUID)
├── propertyId: string
├── property: object (summary)
│   ├── id: string
│   ├── title: string
│   ├── images: array (first 3)
│   ├── location: object
│   └── pricing: object
├── requestedBy: string (userId)
├── requester: object (summary)
│   ├── id: string
│   ├── name: string
│   ├── avatar: string
│   └── phone: string
├── assignedTo: array
│   ├── userId: string
│   ├── role: enum (inspector, agent, landlord)
│   └── status: enum (pending, accepted, declined)
├── scheduledAt: date
├── duration: number (minutes, default: 60)
├── status: enum
│   ├── pending
│   ├── confirmed
│   ├── in_progress
│   ├── completed
│   ├── cancelled
│   ├── no_show
│   └── rescheduled
├── timezone: string (default: Africa/Lagos)
├── notes: string
├── cancellationReason: string (if cancelled)
├── rescheduledFrom: string (inspectionId, if rescheduled)
├── rescheduledTo: date (if rescheduled)
├── otpCode: string (generated for check-in)
├── otpExpiresAt: date
├── qrCode: string (base64 or URL)
├── checkIn
│   ├── checkedInAt: date
│   ├── checkedInBy: string (userId)
│   ├── method: enum (otp, qr, manual)
│   └── location: object (coordinates)
├── checkOut
│   ├── checkedOutAt: date
│   ├── checkedOutBy: string (userId)
│   └── location: object (coordinates)
├── feedback
│   ├── rating: number (1-5)
│   ├── comments: string
│   ├── submittedBy: string (userId)
│   └── submittedAt: date
├── reminderSent: array of dates
├── documents: array
│   ├── type: string
│   ├── name: string
│   ├── url: string
│   └── uploadedAt: date
├── timeline: array
│   ├── event: string
│   ├── description: string
│   ├── timestamp: date
│   └── actor: string (userId)
├── createdAt: date
├── updatedAt: date
└── completedAt: date
```

### Inspection Display Hierarchy

**Inspection Card (List View)**
- Property image + title
- Date and time
- Status badge
- Location
- Action buttons

**Inspection Details (Detail View)**
- Property information (top)
- Status and timeline
- Date/time details
- Participants
- Notes
- QR code/OTP
- Actions (confirm, cancel, reschedule)

---

## 4. Message Content Model

### Primary Message Object
```
Conversation
├── id: string (UUID)
├── participants: array
│   ├── userId: string
│   ├── role: enum (sender, receiver)
│   ├── joinedAt: date
│   ├── lastReadAt: date
│   └── isTyping: boolean
├── propertyId: string (optional)
├── property: object (summary, if linked)
├── type: enum (direct, property, group, support)
├── status: enum (active, archived, blocked)
├── lastMessage: object
│   ├── id: string
│   ├── content: string
│   ├── senderId: string
│   ├── timestamp: date
│   └── type: enum (text, image, file, system)
├── unreadCount: number (per participant)
├── pinned: boolean
├── muted: boolean
├── mutedUntil: date
├── createdAt: date
└── updatedAt: date

Message
├── id: string (UUID)
├── conversationId: string
├── senderId: string
├── sender: object (summary)
├── content: string
├── type: enum
│   ├── text
│   ├── image
│   ├── video
│   ├── file
│   ├── audio
│   ├── location
│   ├── contact
│   └── system
├── attachments: array
│   ├── id: string
│   ├── type: string
│   ├── name: string
│   ├── url: string
│   ├── size: number (bytes)
│   └── thumbnail: string
├── replyTo: string (messageId, if reply)
├── reactions: array
│   ├── emoji: string
│   ├── userId: string
│   └── timestamp: date
├── readBy: array
│   ├── userId: string
│   └── readAt: date
├── deliveredAt: date
├── edited: boolean
├── editedAt: date
├── deleted: boolean
├── deletedAt: date
├── createdAt: date
└── updatedAt: date
```

### Message Display Hierarchy

**Conversation List Item**
- Participant avatars (stacked)
- Participant names
- Last message preview
- Timestamp
- Unread badge
- Property link (if applicable)

**Chat Window**
- Header: Participants, property link, actions
- Message list: Grouped by date, sender
- Input area: Text field, attachment, send button
- Typing indicator

---

## 5. Wallet Content Model

### Primary Wallet Object
```
Wallet
├── id: string (UUID)
├── userId: string
├── balance: number
├── currency: string (NGN)
├── status: enum
│   ├── active
│   ├── frozen
│   ├── closed
│   └── suspended
├── frozenAt: date (if frozen)
├── frozenBy: string (userId)
├── freezeReason: string
├── closedAt: date (if closed)
├── closedBy: string (userId)
├── closeReason: string
├── dailyLimit: number
├── monthlyLimit: number
├── transactions: array
│   ├── id: string
│   ├── type: enum
│   │   ├── deposit
│   │   ├── withdrawal
│   │   ├── transfer
│   │   ├── payment
│   │   ├── refund
│   │   ├── escrow_hold
│   │   ├── escrow_release
│   │   └── fee
│   ├── amount: number
│   ├── balanceAfter: number
│   ├── description: string
│   ├── reference: string
│   ├── status: enum (pending, completed, failed, cancelled)
│   ├── metadata: object
│   ├── createdAt: date
│   └── completedAt: date
├── cards: array
│   ├── id: string
│   ├── type: enum (visa, mastercard, verve)
│   ├── last4: string
│   ├── expiryMonth: number
│   ├── expiryYear: number
│   ├── isDefault: boolean
│   └── addedAt: date
├── bankAccounts: array
│   ├── id: string
│   ├── bankName: string
│   ├── accountNumber: string
│   ├── accountName: string
│   ├── isDefault: boolean
│   └── verified: boolean
├── createdAt: date
└── updatedAt: date

Escrow
├── id: string (UUID)
├── transactionId: string
├── propertyId: string
├── amount: number
├── currency: string (NGN)
├── status: enum
│   ├── pending
│   ├── held
│   ├── released
│   ├── refunded
│   └── disputed
├── heldAt: date
├── releaseRequestedAt: date
├── releasedAt: date
├── refundedAt: date
├── releaseCondition: string
├── buyerId: string
├── sellerId: string
├── inspectionId: string (optional)
└── createdAt: date
```

### Wallet Display Hierarchy

**Wallet Dashboard**
- Balance card (large, prominent)
- Quick actions (deposit, withdraw, transfer)
- Recent transactions (list)
- Cards carousel

**Transaction List Item**
- Type icon + name
- Amount (positive/negative)
- Date
- Status badge
- Reference

---

## 6. Notification Content Model

### Primary Notification Object
```
Notification
├── id: string (UUID)
├── userId: string
├── type: enum
│   ├── inspection_scheduled
│   ├── inspection_confirmed
│   ├── inspection_cancelled
│   ├── inspection_reminder
│   ├── message_received
│   ├── payment_received
│   ├── payment_failed
│   ├── escrow_released
│   ├── property_saved
│   ├── price_change
│   ├── new_property
│   ├── recommendation
│   ├── system_update
│   └── support_response
├── title: string
├── body: string
├── data: object
│   ├── propertyId: string (optional)
│   ├── inspectionId: string (optional)
│   ├── messageId: string (optional)
│   ├── transactionId: string (optional)
│   └── actionUrl: string (optional)
├── priority: enum (low, normal, high, urgent)
├── channels: array
│   ├── inApp: boolean
│   ├── email: boolean
│   ├── sms: boolean
│   └── push: boolean
├── read: boolean
├── readAt: date
├── clicked: boolean
├── clickedAt: date
├── expiresAt: date (optional)
├── createdAt: date
└── sentAt: date
```

### Notification Display Hierarchy

**Notification List Item**
- Type icon
- Title
- Body preview
- Timestamp
- Unread indicator
- Action button (if applicable)

---

# Navigation Patterns

## Global Navigation Structure

### Desktop Navigation (1280px+)

**Primary Navigation Bar (Top)**
```
[Logo] [Search] [Bookings] [Messages] [Wallet] [Favourites] [Profile ▼]
```

**Secondary Navigation (Right side)**
```
[AI] [🔔 Notifications] [⚙️ Settings]
```

**Breadcrumb Trail**
```
Dashboard > Properties > The Ivory House
```

### Tablet Navigation (768px-1023px)

**Condensed Navigation Bar**
```
[Logo] [Search] [Bookings] [Messages] [Wallet] [≡ Menu]
```

**Menu Drawer (Slide-in)**
- Favourites
- Profile
- AI
- Notifications
- Settings

### Mobile Navigation (320px-767px)

**Top Bar**
```
[Logo] [🔔] [Profile]
```

**Bottom Tab Bar**
```
[Home] [Search] [Bookings] [Messages] [Profile]
```

**Menu Drawer (Hamburger)**
- Wallet
- Favourites
- AI
- Settings
- Support

---

## Module-Specific Navigation

### Property Module

**Property Details Navigation**
```
[Overview] [Gallery] [Amenities] [Nearby] [Timeline] [Documents]
```

**Property Actions (Sticky)**
```
[Save] [Share] [Book Inspection] [Contact]
```

### Search Module

**Search Navigation**
```
[List View] [Map View] [Advanced Filters] [Saved Searches]
```

**Filter Categories (Sidebar)**
```
[Location] [Price] [Type] [Bedrooms] [Amenities] [More]
```

### Messages Module

**Conversation Navigation**
```
[All] [Unread] [Archived] [Property Chats]
```

**Chat Actions**
```
[Call] [Video] [Files] [Property Info] [More]
```

### Wallet Module

**Wallet Navigation**
```
[Overview] [Transactions] [Escrow] [Cards] [Bank Accounts]
```

### Settings Module

**Settings Navigation**
```
[General] [Privacy] [Notifications] [Security] [Appearance]
```

---

# Information Hierarchy

## Visual Hierarchy Levels

### Level 1: Critical (Always Visible)
- Logo/Brand
- Primary navigation
- Current page title
- Critical actions (Save, Book, Pay)
- Status indicators (verified, online)
- Notifications badge

### Level 2: Important (Above Fold)
- Search bar
- Property images
- Price information
- Key specifications (beds, baths)
- User avatars
- Action buttons
- Filter controls

### Level 3: Secondary (Scroll to View)
- Descriptions
- Detailed specifications
- Amenities lists
- Transaction history
- Message content
- Timeline events

### Level 4: Supplementary (Expand/Click to View)
- Extended descriptions
- Terms and conditions
- Help text
- Optional information
- Historical data
- Analytics details

---

## Content Prioritization by Page Type

### Landing Page
1. Hero value proposition
2. Search functionality
3. Featured properties
4. Trust signals
5. Social proof

### Property Details
1. Property images
2. Price
3. Key specifications
4. Location
5. Description
6. Amenities
7. Owner information
8. Booking action

### Search Results
1. Property cards (image, price, key specs)
2. Filters
3. Sort options
4. Map toggle
5. Pagination

### Dashboard
1. Welcome message
2. Quick actions
3. Recommendations
4. Recent activity
5. Notifications

### Messages
1. Conversation list
2. Active chat
3. Typing indicators
4. Unread counts
5. Attachment previews

### Wallet
1. Balance
2. Quick actions
3. Recent transactions
4. Cards/bank accounts

---

# Content Relationships

## Property Relationships

```
Property
├── Owner (User)
├── Images (Media)
├── Amenities (Taxonomy)
├── Location (Geography)
├── Inspections (Booking)
├── Messages (Communication)
├── Reviews (Feedback - Future)
├── Documents (Files)
└── Analytics (Metrics)
```

## User Relationships

```
User
├── Properties (Owned/Listed)
├── Inspections (Booked/Assigned)
├── Messages (Conversations)
├── Wallet (Financial)
├── Favourites (Saved)
├── Notifications (Alerts)
├── Reviews (Given/Received - Future)
└── Support (Tickets)
```

## Inspection Relationships

```
Inspection
├── Property (Subject)
├── Requester (User)
├── Assignees (Users)
├── Messages (Related chat)
├── OTP/QR (Verification)
├── Feedback (Post-inspection)
├── Documents (Reports)
└── Timeline (Events)
```

## Transaction Relationships

```
Transaction
├── Wallet (Source/Destination)
├── User (Owner)
├── Property (Related - optional)
├── Inspection (Related - optional)
├── Escrow (If applicable)
├── Payment Method (Card/Bank)
└── Receipt (Document)
```

---

# Taxonomy & Categorization

## Property Types

**Residential**
- Apartment
- House
- Duplex
- Terrace
- Bungalow
- Penthouse
- Studio

**Commercial**
- Office Space
- Retail Space
- Warehouse
- Land

**Special Purpose**
- Shortlet
- Serviced Apartment
- Shared Space

## Property Purposes

- Rent
- Sale
- Shortlet

## Property Status

- Draft
- Published
- Rented
- Sold
- Archived
- Under Review

## Amenity Categories

**General**
- Security
- Parking
- Power
- Water
- Internet

**Living**
- Air Conditioning
- Furnished
- Balcony
- Garden
- Pool

**Kitchen**
- Fitted Kitchen
- Gas Cooker
- Refrigerator
- Microwave

**Utilities**
- Generator
- Inverter
- Solar
- Borehole

**Location**
- Gated Estate
- Security Guard
- CCTV
- Intercom

## Nigerian States (Primary Markets)

**Lagos**
- Ikeja
- Lekki
- Victoria Island
- Ikoyi
- Surulere
- Yaba
- Ajah
- Ikorodu

**Abuja**
- Maitama
- Asokoro
- Wuse
- Gwarinpa
- Apo
- Lugbe

**Other States**
- Rivers (Port Harcourt)
- Oyo (Ibadan)
- Kano
- Kaduna
- Enugu

---

# Content States

## Empty States

### No Properties Found
- Illustration
- Message: "No properties match your search"
- Action: "Clear filters" or "Expand search area"

### No Messages
- Illustration
- Message: "No conversations yet"
- Action: "Start a conversation"

### No Transactions
- Illustration
- Message: "No transaction history"
- Action: "Make a payment" or "Add funds"

### No Inspections
- Illustration
- Message: "No inspections scheduled"
- Action: "Book an inspection"

### No Favourites
- Illustration
- Message: "No saved properties"
- Action: "Explore properties"

## Loading States

### Skeleton Loading
- Property cards: Image skeleton, text lines
- Lists: Row skeletons
- Details: Section skeletons

### Progress Indicators
- Linear progress bar
- Circular spinner
- Step indicator

### Optimistic Updates
- Show success immediately
- Revert on error

## Error States

### Network Error
- Illustration
- Message: "Connection lost"
- Action: "Retry"

### Server Error
- Illustration
- Message: "Something went wrong"
- Action: "Try again" or "Contact support"

### Not Found
- Illustration
- Message: "Page not found"
- Action: "Go home" or "Back"

### Permission Denied
- Illustration
- Message: "You don't have access"
- Action: "Contact support" or "Go back"

---

# Content Grouping

## Card-Based Grouping

### Property Card
- Image (top)
- Content (middle)
- Footer (bottom - price, action)

### Inspection Card
- Property info (left)
- Date/time (right)
- Status badge (top right)

### Transaction Card
- Icon (left)
- Details (middle)
- Amount (right)

### Notification Card
- Icon (left)
- Content (middle)
- Timestamp (right)

## Section-Based Grouping

### Property Details Sections
- Hero (image, title, price)
- Overview (description, specs)
- Amenities (grid)
- Location (map, nearby)
- Actions (sticky footer)

### Dashboard Sections
- Welcome (header)
- Quick Actions (grid)
- Recommendations (carousel)
- Activity (list)

---

# Progressive Disclosure Strategy

## Level 1: Immediate (No Interaction)
- Property image
- Price
- Location
- Key specs (beds, baths)

## Level 2: One Click (Expand/Tab)
- Full description
- All amenities
- Gallery
- Map

## Level 3: Two Clicks (Modal/Drawer)
- Owner details
- Property documents
- Timeline
- Analytics

## Level 4: Three Clicks (Separate Page)
- Booking flow
- Payment flow
- Support ticket

---

# Search & Filter Architecture

## Search Categories

### Quick Filters (Always Visible)
- Location
- Price range
- Property type
- Bedrooms

### Advanced Filters (Expandable)
- Bathrooms
- Parking
- Furnishing
- Amenities
- Year built
- Minimum stay
- Move-in date
- Pet-friendly
- Verified only

### Saved Filters
- User-created filter combinations
- Named and reusable
- Quick access from filter bar

## Filter UI Patterns

### Range Sliders
- Price range
- Area range
- Year built

### Multi-select
- Amenities
- Cities
- Property types

### Single Select
- Property purpose
- Furnishing status
- Sort order

### Toggle Switches
- Verified only
- Pet-friendly
- New listings

---

# Content Accessibility

## Semantic HTML Structure

### Headings
```
H1: Page title (one per page)
H2: Section titles
H3: Subsection titles
H4: Component titles
```

### Lists
```
<ol> for ordered steps
<ul> for unordered items
<dl> for definition lists (key-value pairs)
```

### Landmarks
```
<header>: Navigation and branding
<main>: Primary content
<aside>: Sidebars and supplementary content
<footer>: Footer information
<nav>: Navigation regions
```

## ARIA Labels

### Interactive Elements
- Buttons: `aria-label` for icon-only buttons
- Links: `aria-label` for descriptive text
- Inputs: `aria-label` for form fields
- Modals: `aria-modal="true"`, `role="dialog"`

### Live Regions
- Notifications: `aria-live="polite"`
- Errors: `aria-live="assertive"`
- Loading: `aria-busy="true"`

---

# Content Localization

## Supported Languages

**Phase 1 (MVP)**
- English (en) - Primary

**Phase 2**
- Pidgin (pcm)
- Yoruba (yo)
- Igbo (ig)
- Hausa (ha)

## Localization Considerations

- Date formats (DD/MM/YYYY vs MM/DD/YYYY)
- Number formats (1,000.00 vs 1.000,00)
- Currency symbols (₦ vs NGN)
- Text direction (LTR for all supported languages)
- Character limits (may vary by language)
- Image text (avoid text in images)

---

# Content Performance

## Content Loading Strategy

### Critical Path (First Paint)
- Logo
- Navigation
- Hero content
- Primary CTA

### Secondary Path (After First Paint)
- Property images (lazy load)
- Lists (pagination)
- Maps (on demand)

### Tertiary Path (User Interaction)
- Modals
- Drawers
- Secondary pages

## Image Optimization

### Responsive Images
- Multiple sizes (320px, 640px, 1280px, 1920px)
- WebP format with JPEG fallback
- Lazy loading below fold
- Progressive JPEGs

### Image Priorities
- Hero images: High priority, preload
- Property cards: Medium priority, lazy load
- Thumbnails: Low priority, lazy load

---

# Content Governance

## Content Standards

### Writing Style
- Clear, concise, scannable
- Active voice
- Second person ("You")
- Nigerian English spelling
- Avoid jargon

### Character Limits
- Property title: 100 characters
- Property description: 5,000 characters
- User bio: 500 characters
- Message: 5,000 characters
- Notification title: 100 characters
- Notification body: 500 characters

### Image Guidelines
- Minimum resolution: 1200x800px
- Maximum file size: 5MB
- Aspect ratio: 3:2 or 16:9
- No watermarks
- Professional quality

---

# Next Steps

**Phase 3:** User Flows  
- Document key user journeys  
- Create flow diagrams  
- Define interaction patterns  
- Map decision points  

---

**End of Phase 2: Information Architecture**
