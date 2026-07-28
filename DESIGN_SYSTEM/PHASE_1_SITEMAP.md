# CribSeekers Design System
## Phase 1: Complete Sitemap

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This sitemap defines the complete information architecture for CribSeekers, Nigeria's enterprise-grade real estate collaboration platform. The sitemap encompasses all user-facing pages, authentication flows, and administrative interfaces required for a production-ready application.

**Total Pages:** 67  
**User Flows:** 12  
**Authentication States:** 8  
**Public Pages:** 10  
**Authenticated Pages:** 49  
**Admin Pages:** 8

---

# Sitemap Overview

```
cribseekers.com
├── / (Landing)
├── /about
├── /contact
├── /faq
├── /pricing
├── /careers
├── /blog
│   └── /blog/[slug]
├── /legal
│   ├── /legal/terms
│   ├── /legal/privacy
│   └── /legal/cookies
├── /help
│   └── /help/[category]
│       └── /help/[category]/[article]
├── /auth
│   ├── /auth/welcome
│   ├── /auth/signup
│   ├── /auth/login
│   ├── /auth/forgot-password
│   ├── /auth/reset-password
│   ├── /auth/verify-email
│   ├── /auth/verify-phone
│   ├── /auth/verify-otp
│   └── /auth/complete-profile
│       └── /auth/complete-profile/kyc
├── /dashboard
│   ├── /dashboard/home
│   ├── /dashboard/ai
│   │   ├── /dashboard/ai/recommendations
│   │   ├── /dashboard/ai/search
│   │   └── /dashboard/ai/filters
│   ├── /dashboard/search
│   │   ├── /dashboard/search/properties
│   │   ├── /dashboard/search/advanced
│   │   ├── /dashboard/search/map
│   │   └── /dashboard/search/saved
│   ├── /dashboard/properties
│   │   ├── /dashboard/properties/[id]
│   │   │   ├── /dashboard/properties/[id]/gallery
│   │   │   ├── /dashboard/properties/[id]/tour
│   │   │   ├── /dashboard/properties/[id]/amenities
│   │   │   ├── /dashboard/properties/[id]/nearby
│   │   │   ├── /dashboard/properties/[id]/timeline
│   │   │   ├── /dashboard/properties/[id]/documents
│   │   │   ├── /dashboard/properties/[id]/reviews
│   │   │   └── /dashboard/properties/[id]/analytics
│   ├── /dashboard/bookings
│   │   ├── /dashboard/bookings/new
│   │   ├── /dashboard/bookings/calendar
│   │   ├── /dashboard/bookings/[id]
│   │   ├── /dashboard/bookings/[id]/tracking
│   │   ├── /dashboard/bookings/[id]/qr
│   │   └── /dashboard/bookings/history
│   ├── /dashboard/messages
│   │   ├── /dashboard/messages
│   │   ├── /dashboard/messages/[id]
│   │   ├── /dashboard/messages/[id]/files
│   │   ├── /dashboard/messages/archived
│   │   └── /dashboard/messages/property/[propertyId]
│   ├── /dashboard/wallet
│   │   ├── /dashboard/wallet
│   │   ├── /dashboard/wallet/transactions
│   │   ├── /dashboard/wallet/deposit
│   │   ├── /dashboard/wallet/withdraw
│   │   ├── /dashboard/wallet/escrow
│   │   ├── /dashboard/wallet/receipts
│   │   └── /dashboard/wallet/invoices
│   ├── /dashboard/payments
│   │   ├── /dashboard/payments/checkout
│   │   ├── /dashboard/payments/success
│   │   ├── /dashboard/payments/failed
│   │   ├── /dashboard/payments/pending
│   │   └── /dashboard/payments/history
│   ├── /dashboard/notifications
│   │   ├── /dashboard/notifications
│   │   ├── /dashboard/notifications/[id]
│   │   └── /dashboard/notifications/preferences
│   ├── /dashboard/favourites
│   │   ├── /dashboard/favourites
│   │   ├── /dashboard/favourites/collections
│   │   └── /dashboard/favourites/compare
│   ├── /dashboard/profile
│   │   ├── /dashboard/profile
│   │   ├── /dashboard/profile/edit
│   │   ├── /dashboard/profile/verification
│   │   ├── /dashboard/profile/security
│   │   └── /dashboard/profile/connected
│   ├── /dashboard/settings
│   │   ├── /dashboard/settings/general
│   │   ├── /dashboard/settings/privacy
│   │   ├── /dashboard/settings/notifications
│   │   ├── /dashboard/settings/language
│   │   ├── /dashboard/settings/appearance
│   │   ├── /dashboard/settings/devices
│   │   └── /dashboard/settings/sessions
│   └── /dashboard/support
│       ├── /dashboard/support
│       ├── /dashboard/support/new
│       └── /dashboard/support/[id]
└── /admin
    ├── /admin/dashboard
    ├── /admin/users
    ├── /admin/properties
    ├── /admin/inspections
    ├── /admin/payments
    ├── /admin/analytics
    └── /admin/settings
```

---

# Page Hierarchy & Structure

## Level 1: Root Pages (Public)

### 1. Landing Page (/)
- **Purpose:** Primary entry point for new users
- **Access:** Public
- **Key Sections:** Hero, Search, Featured Properties, Trust Signals, AI Preview, How It Works, Cities, Testimonials, Footer
- **Conversion Goals:** Sign up, Start search

### 2. About Us (/about)
- **Purpose:** Company information and mission
- **Access:** Public
- **Sections:** Story, Team, Values, Milestones

### 3. Contact (/contact)
- **Purpose:** Contact information and form
- **Access:** Public
- **Sections:** Contact form, Office locations, Email, Phone

### 4. FAQ (/faq)
- **Purpose:** Common questions and answers
- **Access:** Public
- **Sections:** Categories, Search, Expandable Q&A

### 5. Pricing (/pricing)
- **Purpose:** Service pricing (future ready)
- **Access:** Public
- **Sections:** Plans, Features, Comparison

### 6. Careers (/careers)
- **Purpose:** Job listings and company culture
- **Access:** Public
- **Sections:** Open positions, Culture, Benefits, Application form

### 7. Blog (/blog)
- **Purpose:** Content marketing and thought leadership
- **Access:** Public
- **Sections:** Article listing, Featured, Categories
- **Sub-pages:** Individual blog posts (/blog/[slug])

### 8. Legal (/legal/*)
- **Purpose:** Legal documentation
- **Access:** Public
- **Sub-pages:**
  - Terms of Service (/legal/terms)
  - Privacy Policy (/legal/privacy)
  - Cookie Policy (/legal/cookies)

### 9. Help Center (/help/*)
- **Purpose:** Self-service support documentation
- **Access:** Public
- **Sections:** Categories, Search, Popular articles
- **Sub-pages:** Category pages (/help/[category]), Article pages (/help/[category]/[article])

---

## Level 2: Authentication Flow (/auth/*)

### Authentication Entry Points

#### 1. Welcome (/auth/welcome)
- **Purpose:** Onboarding entry point
- **Access:** Public
- **User Types:** Property Seeker, Landlord, Agent
- **Next Steps:** Sign up or Login

#### 2. Sign Up (/auth/signup)
- **Purpose:** New user registration
- **Access:** Public
- **Fields:** Email, Password, Name, Phone, User Type
- **Next Steps:** Email verification

#### 3. Login (/auth/login)
- **Purpose:** Existing user authentication
- **Access:** Public
- **Methods:** Email/Password, Phone/OTP, Social (future)
- **Next Steps:** Dashboard

#### 4. Forgot Password (/auth/forgot-password)
- **Purpose:** Password recovery initiation
- **Access:** Public
- **Fields:** Email
- **Next Steps:** Email with reset link

#### 5. Reset Password (/auth/reset-password)
- **Purpose:** Password reset completion
- **Access:** Public (via email link)
- **Fields:** New Password, Confirm Password
- **Next Steps:** Login

#### 6. Email Verification (/auth/verify-email)
- **Purpose:** Email address verification
- **Access:** Public (via email link)
- **Next Steps:** Phone verification or Dashboard

#### 7. Phone Verification (/auth/verify-phone)
- **Purpose:** Phone number verification
- **Access:** Authenticated
- **Fields:** Phone, OTP
- **Next Steps:** Complete profile

#### 8. OTP Verification (/auth/verify-otp)
- **Purpose:** One-time password verification
- **Access:** Authenticated
- **Fields:** OTP code
- **Use Cases:** Phone verification, Two-factor auth

#### 9. Complete Profile (/auth/complete-profile)
- **Purpose:** Profile completion
- **Access:** Authenticated
- **Fields:** Profile photo, Bio, Location, Preferences
- **Sub-page:** KYC Verification (/auth/complete-profile/kyc)
- **Next Steps:** Dashboard

---

## Level 3: Dashboard (/dashboard/*)

### Dashboard Navigation Structure

#### Primary Navigation
- Home
- Search
- Bookings
- Messages
- Wallet
- Favourites
- Profile
- Support

#### Secondary Navigation
- AI Recommendations
- Notifications
- Settings

---

### 3.1 Home Dashboard (/dashboard/home)

**Purpose:** Main user dashboard and activity hub  
**Access:** Authenticated  
**User Goal:** Quick access to key actions and personalized content

**Sections:**
- Welcome header with user name
- Quick actions (Search, Book inspection, Check wallet)
- AI Recommendations carousel
- Featured Properties grid
- Recently Viewed properties
- Saved Searches
- Trending Properties
- Nearby Properties
- Activity feed

**Key Components:**
- Welcome Banner
- Quick Action Cards
- Recommendation Carousel
- Property Card Grid
- Activity Feed Widget

---

### 3.2 AI Module (/dashboard/ai/*)

#### 3.2.1 AI Recommendations (/dashboard/ai/recommendations)
- **Purpose:** AI-powered property recommendations
- **Access:** Authenticated
- **Sections:** Personalized feed, Similar properties, Budget matches, Location-based
- **Components:** Recommendation Card, Filter chips, Refresh button

#### 3.2.2 AI Search (/dashboard/ai/search)
- **Purpose:** Natural language property search
- **Access:** Authenticated
- **Sections:** Chat interface, Search results, Refinement options
- **Components:** AI Chat Card, Property Results, Suggestion chips

#### 3.2.3 AI Smart Filters (/dashboard/ai/filters)
- **Purpose:** AI-optimized filter suggestions
- **Access:** Authenticated
- **Sections:** Recommended filters, Applied filters, Save filter set
- **Components:** Filter Card, Toggle switches, Save button

---

### 3.3 Search Module (/dashboard/search/*)

#### 3.3.1 Property Search (/dashboard/search/properties)
- **Purpose:** Main property search interface
- **Access:** Authenticated
- **Sections:** Search bar, Filters, Results grid, Map toggle
- **Components:** Search Bar, Filter Sidebar, Property Card, Map Toggle, Pagination

#### 3.3.2 Advanced Search (/dashboard/search/advanced)
- **Purpose:** Detailed property search with all filters
- **Access:** Authenticated
- **Sections:** All filter categories, Results preview
- **Components:** Advanced Filter Form, Results Preview, Save Search

#### 3.3.3 Map Search (/dashboard/search/map)
- **Purpose:** Map-based property discovery
- **Access:** Authenticated
- **Sections:** Interactive map, Property markers, Filter sidebar
- **Components:** Map Card, Property Marker, Filter Sidebar, Property Preview

#### 3.3.4 Saved Searches (/dashboard/search/saved)
- **Purpose:** Manage saved search queries
- **Access:** Authenticated
- **Sections:** Saved search list, Edit, Delete, Run search
- **Components:** Saved Search Card, Action buttons, Search count

---

### 3.4 Property Module (/dashboard/properties/*)

#### 3.4.1 Property Details (/dashboard/properties/[id])
- **Purpose:** Comprehensive property information
- **Access:** Authenticated
- **Sections:** Hero, Gallery, Description, Amenities, Location, Reviews, Book inspection
- **Components:** Property Hero, Gallery Carousel, Info Cards, Action Buttons

#### 3.4.2 Property Gallery (/dashboard/properties/[id]/gallery)
- **Purpose:** Full-screen image gallery
- **Access:** Authenticated
- **Sections:** Image grid, Lightbox, Thumbnails
- **Components:** Gallery Grid, Lightbox, Thumbnail strip

#### 3.4.3 360 Tour (/dashboard/properties/[id]/tour)
- **Purpose:** Virtual property tour (placeholder)
- **Access:** Authenticated
- **Sections:** Tour viewer, Controls, Floor plan
- **Components:** Tour Viewer, Control Bar, Floor Plan Toggle

#### 3.4.4 Amenities (/dashboard/properties/[id]/amenities)
- **Purpose:** Property amenities and features
- **Access:** Authenticated
- **Sections:** Categories, Icons, Descriptions
- **Components:** Amenity Card, Category headers, Search amenities

#### 3.4.5 Nearby Places (/dashboard/properties/[id]/nearby)
- **Purpose:** Nearby points of interest
- **Access:** Authenticated
- **Sections:** Map, Categories (Schools, Hospitals, Transit, Shopping)
- **Components:** Map Card, POI Card, Category filter

#### 3.4.6 Property Timeline (/dashboard/properties/[id]/timeline)
- **Purpose:** Property history and status
- **Access:** Authenticated
- **Sections:** Timeline events, Status badges, Dates
- **Components:** Timeline Card, Status Badge, Date indicator

#### 3.4.7 Property Documents (/dashboard/properties/[id]/documents)
- **Purpose:** Property-related documents
- **Access:** Authenticated
- **Sections:** Owner documents, Legal documents, Inspection reports
- **Components:** Document Card, Download button, Preview

#### 3.4.8 Property Reviews (/dashboard/properties/[id]/reviews)
- **Purpose:** Property reviews and ratings (future)
- **Access:** Authenticated
- **Sections:** Reviews list, Rating summary, Write review
- **Components:** Review Card, Rating Summary, Review Form

#### 3.4.9 Property Analytics (/dashboard/properties/[id]/analytics)
- **Purpose:** Property performance metrics
- **Access:** Authenticated (owner/agent only)
- **Sections:** Views, Inquiries, Bookings, Engagement
- **Components:** Stats Cards, Charts, Date range picker

---

### 3.5 Bookings Module (/dashboard/bookings/*)

#### 3.5.1 Book Inspection (/dashboard/bookings/new)
- **Purpose:** Schedule property inspection
- **Access:** Authenticated
- **Sections:** Property summary, Date/time picker, Notes, Confirmation
- **Components:** Property Card, Calendar Widget, Time Slots, Notes Field, Confirm Button

#### 3.5.2 Inspection Calendar (/dashboard/bookings/calendar)
- **Purpose:** View all inspections in calendar view
- **Access:** Authenticated
- **Sections:** Month/Week/Day views, Inspection cards, Filters
- **Components:** Calendar Widget, Inspection Card, View Toggle, Filter Bar

#### 3.5.3 Inspection Details (/dashboard/bookings/[id])
- **Purpose:** View inspection details
- **Access:** Authenticated
- **Sections:** Status, Property info, Date/time, Participants, Notes, Actions
- **Components:** Status Badge, Property Card, Info Cards, Action Buttons

#### 3.5.4 Inspection Tracking (/dashboard/bookings/[id]/tracking)
- **Purpose:** Real-time inspection tracking
- **Access:** Authenticated
- **Sections:** Live status, Timeline, Location, ETA
- **Components:** Status Tracker, Timeline Card, Map Preview, ETA Card

#### 3.5.5 Inspection QR (/dashboard/bookings/[id]/qr)
- **Purpose:** Generate inspection QR code
- **Access:** Authenticated
- **Sections:** QR code display, Instructions, Download
- **Components:** QR Card, Instructions, Download Button

#### 3.5.6 Inspection History (/dashboard/bookings/history)
- **Purpose:** View past inspections
- **Access:** Authenticated
- **Sections:** List view, Filters, Status, Search
- **Components:** Inspection Card, Filter Bar, Search Bar, Pagination

---

### 3.6 Messages Module (/dashboard/messages/*)

#### 3.6.1 Conversation List (/dashboard/messages)
- **Purpose:** View all conversations
- **Access:** Authenticated
- **Sections:** Conversation list, Search, Filter, Unread indicator
- **Components:** Conversation Card, Search Bar, Filter Tabs, Unread Badge

#### 3.6.2 Chat Window (/dashboard/messages/[id])
- **Purpose:** Real-time messaging interface
- **Access:** Authenticated
- **Sections:** Chat header, Message list, Input area, Attachments
- **Components:** Chat Header, Message Bubble, Typing Indicator, Input Field, Attachment Button

#### 3.6.3 Shared Files (/dashboard/messages/[id]/files)
- **Purpose:** View shared files in conversation
- **Access:** Authenticated
- **Sections:** File list, Preview, Download
- **Components:** File Card, Preview Modal, Download Button

#### 3.6.4 Archived Chats (/dashboard/messages/archived)
- **Purpose:** View archived conversations
- **Access:** Authenticated
- **Sections:** Archived list, Restore, Delete
- **Components:** Conversation Card, Restore Button, Delete Button

#### 3.6.5 Property Chat (/dashboard/messages/property/[propertyId])
- **Purpose:** Chat specific to a property
- **Access:** Authenticated
- **Sections:** Property context, Chat interface, Participants
- **Components:** Property Card, Chat Window, Participant List

---

### 3.7 Wallet Module (/dashboard/wallet/*)

#### 3.7.1 Wallet Dashboard (/dashboard/wallet)
- **Purpose:** Main wallet overview
- **Access:** Authenticated
- **Sections:** Balance, Quick actions, Recent transactions, Cards
- **Components:** Balance Card, Action Buttons, Transaction List, Card Carousel

#### 3.7.2 Transactions (/dashboard/wallet/transactions)
- **Purpose:** View all transactions
- **Access:** Authenticated
- **Sections:** Transaction list, Filters, Search, Export
- **Components:** Transaction Card, Filter Bar, Search Bar, Export Button

#### 3.7.3 Deposit (/dashboard/wallet/deposit)
- **Purpose:** Add funds to wallet
- **Access:** Authenticated
- **Sections:** Amount, Payment method, Confirmation
- **Components:** Amount Input, Payment Method Card, Confirm Button

#### 3.7.4 Withdraw (/dashboard/wallet/withdraw)
- **Purpose:** Withdraw funds from wallet
- **Access:** Authenticated
- **Sections:** Amount, Bank account, Confirmation
- **Components:** Amount Input, Bank Card, Confirm Button

#### 3.7.5 Escrow (/dashboard/wallet/escrow)
- **Purpose:** View escrow transactions
- **Access:** Authenticated
- **Sections:** Active escrows, History, Release requests
- **Components:** Escrow Card, Status Badge, Release Button

#### 3.7.6 Receipts (/dashboard/wallet/receipts)
- **Purpose:** View payment receipts
- **Access:** Authenticated
- **Sections:** Receipt list, Download, Email
- **Components:** Receipt Card, Download Button, Email Button

#### 3.7.7 Invoices (/dashboard/wallet/invoices)
- **Purpose:** View invoices
- **Access:** Authenticated
- **Sections:** Invoice list, Status, Pay, Download
- **Components:** Invoice Card, Status Badge, Pay Button, Download Button

---

### 3.8 Payments Module (/dashboard/payments/*)

#### 3.8.1 Checkout (/dashboard/payments/checkout)
- **Purpose:** Complete payment flow
- **Access:** Authenticated
- **Sections:** Order summary, Payment method, Card details, Confirm
- **Components:** Order Summary, Payment Method Card, Card Input, Confirm Button

#### 3.8.2 Payment Success (/dashboard/payments/success)
- **Purpose:** Payment confirmation
- **Access:** Authenticated
- **Sections:** Success message, Receipt, Next steps
- **Components:** Success Icon, Receipt Card, Action Buttons

#### 3.8.3 Payment Failed (/dashboard/payments/failed)
- **Purpose:** Payment failure handling
- **Access:** Authenticated
- **Sections:** Error message, Retry options, Support link
- **Components:** Error Icon, Retry Button, Support Link

#### 3.8.4 Pending Payment (/dashboard/payments/pending)
- **Purpose:** Payment in progress
- **Access:** Authenticated
- **Sections:** Processing status, Estimated time, Cancel option
- **Components:** Loading Spinner, Status Text, Cancel Button

#### 3.8.5 Payment History (/dashboard/payments/history)
- **Purpose:** View all payments
- **Access:** Authenticated
- **Sections:** Payment list, Filters, Status, Search
- **Components:** Payment Card, Filter Bar, Search Bar, Pagination

---

### 3.9 Notifications Module (/dashboard/notifications/*)

#### 3.9.1 All Notifications (/dashboard/notifications)
- **Purpose:** View all notifications
- **Access:** Authenticated
- **Sections:** Notification list, Filters, Mark all read
- **Components:** Notification Card, Filter Tabs, Mark Read Button

#### 3.9.2 Notification Details (/dashboard/notifications/[id])
- **Purpose:** View notification details
- **Access:** Authenticated
- **Sections:** Full message, Action buttons, Related content
- **Components:** Notification Card, Action Buttons, Related Content

#### 3.9.3 Preferences (/dashboard/notifications/preferences)
- **Purpose:** Manage notification settings
- **Access:** Authenticated
- **Sections:** Email, SMS, Push, In-app toggles
- **Components:** Toggle Switch, Category headers, Save Button

---

### 3.10 Favourites Module (/dashboard/favourites/*)

#### 3.10.1 Saved Properties (/dashboard/favourites)
- **Purpose:** View saved properties
- **Access:** Authenticated
- **Sections:** Property grid, Filters, Collections, Remove
- **Components:** Property Card, Filter Bar, Collection Dropdown, Remove Button

#### 3.10.2 Collections (/dashboard/favourites/collections)
- **Purpose:** Manage property collections
- **Access:** Authenticated
- **Sections:** Collection list, Create, Edit, Delete
- **Components:** Collection Card, Create Button, Edit Modal, Delete Button

#### 3.10.3 Compare Properties (/dashboard/favourites/compare)
- **Purpose:** Compare multiple properties
- **Access:** Authenticated
- **Sections:** Comparison table, Remove, Add more
- **Components:** Comparison Table, Remove Button, Add Button

---

### 3.11 Profile Module (/dashboard/profile/*)

#### 3.11.1 My Profile (/dashboard/profile)
- **Purpose:** View user profile
- **Access:** Authenticated
- **Sections:** Profile photo, Name, Bio, Contact info, Stats
- **Components:** Profile Card, Info Cards, Stats Cards, Edit Button

#### 3.11.2 Edit Profile (/dashboard/profile/edit)
- **Purpose:** Edit profile information
- **Access:** Authenticated
- **Sections:** Photo upload, Name, Bio, Contact, Preferences
- **Components:** Photo Upload, Input Fields, Save Button

#### 3.11.3 Identity Verification (/dashboard/profile/verification)
- **Purpose:** KYC verification status
- **Access:** Authenticated
- **Sections:** Verification status, Document upload, Progress
- **Components:** Status Badge, Document Upload, Progress Bar

#### 3.11.4 Security (/dashboard/profile/security)
- **Purpose:** Account security settings
- **Access:** Authenticated
- **Sections:** Password, 2FA, Login history, Sessions
- **Components:** Password Input, 2FA Toggle, Session List, Revoke Button

#### 3.11.5 Connected Accounts (/dashboard/profile/connected)
- **Purpose:** Manage connected accounts
- **Access:** Authenticated
- **Sections:** Social accounts, Bank accounts, Disconnect
- **Components:** Account Card, Disconnect Button, Connect Button

---

### 3.12 Settings Module (/dashboard/settings/*)

#### 3.12.1 General (/dashboard/settings/general)
- **Purpose:** General account settings
- **Access:** Authenticated
- **Sections:** Language, Timezone, Currency, Email preferences
- **Components:** Dropdown Selects, Toggle Switches, Save Button

#### 3.12.2 Privacy (/dashboard/settings/privacy)
- **Purpose:** Privacy settings
- **Access:** Authenticated
- **Sections:** Profile visibility, Data sharing, Activity status
- **Components:** Toggle Switches, Radio Buttons, Save Button

#### 3.12.3 Notifications (/dashboard/settings/notifications)
- **Purpose:** Notification preferences
- **Access:** Authenticated
- **Sections:** Push, Email, SMS, In-app categories
- **Components:** Toggle Switches, Category headers, Save Button

#### 3.12.4 Language (/dashboard/settings/language)
- **Purpose:** Language and region settings
- **Access:** Authenticated
- **Sections:** Language, Region, Date format, Number format
- **Components:** Language Select, Region Select, Save Button

#### 3.12.5 Appearance (/dashboard/settings/appearance)
- **Purpose:** App appearance settings
- **Access:** Authenticated
- **Sections:** Theme (light/dark), Font size, Density
- **Components:** Theme Toggle, Font Size Slider, Density Select

#### 3.12.6 Devices (/dashboard/settings/devices)
- **Purpose:** Manage connected devices
- **Access:** Authenticated
- **Sections:** Device list, Remove device, Current device
- **Components:** Device Card, Remove Button, Current Badge

#### 3.12.7 Sessions (/dashboard/settings/sessions)
- **Purpose:** Manage active sessions
- **Access:** Authenticated
- **Sections:** Session list, Revoke, Sign out all
- **Components:** Session Card, Revoke Button, Sign Out All Button

---

### 3.13 Support Module (/dashboard/support/*)

#### 3.13.1 Help Center (/dashboard/support)
- **Purpose:** Self-service support
- **Access:** Authenticated
- **Sections:** Categories, Search, Popular articles, Contact support
- **Components:** Category Card, Search Bar, Article Card, Contact Button

#### 3.13.2 Create Ticket (/dashboard/support/new)
- **Purpose:** Submit support ticket
- **Access:** Authenticated
- **Sections:** Category, Subject, Description, Attachments, Submit
- **Components:** Category Select, Input Fields, File Upload, Submit Button

#### 3.13.3 Ticket Details (/dashboard/support/[id])
- **Purpose:** View and manage support ticket
- **Access:** Authenticated
- **Sections:** Ticket info, Messages, Status, Close ticket
- **Components:** Ticket Info Card, Message List, Status Badge, Close Button

---

## Level 4: Admin Dashboard (/admin/*)

**Note:** Admin dashboard is out of scope for this design phase. Will be designed separately.

### Admin Pages
- Admin Dashboard (/admin/dashboard)
- Users Management (/admin/users)
- Properties Management (/admin/properties)
- Inspections Management (/admin/inspections)
- Payments Management (/admin/payments)
- Analytics (/admin/analytics)
- System Settings (/admin/settings)

---

# User Flow Mapping

## Primary User Flows

### Flow 1: Property Discovery → Booking → Payment
```
/ → /auth/welcome → /auth/signup → /auth/verify-email → 
/auth/complete-profile → /dashboard/home → /dashboard/search/properties → 
/dashboard/properties/[id] → /dashboard/bookings/new → /dashboard/payments/checkout → 
/dashboard/payments/success
```

### Flow 2: AI-Powered Search
```
/dashboard/home → /dashboard/ai/search → /dashboard/ai/recommendations → 
/dashboard/properties/[id] → /dashboard/bookings/new
```

### Flow 3: Property Comparison
```
/dashboard/search/properties → [Save multiple] → /dashboard/favourites/compare → 
/dashboard/properties/[id] → /dashboard/bookings/new
```

### Flow 4: Inspection Management
```
/dashboard/bookings/calendar → /dashboard/bookings/[id] → 
/dashboard/bookings/[id]/tracking → /dashboard/bookings/[id]/qr
```

### Flow 5: Wallet & Payments
```
/dashboard/wallet → /dashboard/wallet/deposit → /dashboard/payments/checkout → 
/dashboard/wallet/transactions
```

### Flow 6: Communication
```
/dashboard/properties/[id] → /dashboard/messages/property/[propertyId] → 
/dashboard/messages/[id] → /dashboard/messages/[id]/files
```

### Flow 7: Profile Management
```
/dashboard/profile → /dashboard/profile/edit → /dashboard/profile/verification → 
/dashboard/profile/security
```

### Flow 8: Saved Properties
```
/dashboard/properties/[id] → [Save] → /dashboard/favourites → 
/dashboard/favourites/collections → /dashboard/favourites/compare
```

### Flow 9: Notification Management
```
[Receive notification] → /dashboard/notifications → /dashboard/notifications/[id] → 
/dashboard/notifications/preferences
```

### Flow 10: Settings Management
```
/dashboard/profile → /dashboard/settings/general → /dashboard/settings/privacy → 
/dashboard/settings/appearance
```

### Flow 11: Support Flow
```
/dashboard/support → /dashboard/support/new → /dashboard/support/[id]
```

### Flow 12: Escrow Transaction
```
/dashboard/properties/[id] → /dashboard/bookings/new → /dashboard/payments/checkout → 
/dashboard/wallet/escrow → [Release funds]
```

---

# Navigation Structure

## Global Navigation (Authenticated)

### Primary Navigation (Desktop)
- Logo
- Search
- Bookings
- Messages
- Wallet
- Favourites
- Profile dropdown

### Secondary Navigation
- AI Recommendations
- Notifications bell
- Settings

### Mobile Navigation
- Bottom tab bar: Home, Search, Bookings, Messages, Profile
- Top bar: Logo, Notifications, Profile

---

## Breadcrumb Hierarchy

### Level 1: Dashboard
`Dashboard`

### Level 2: Module
`Dashboard > Properties`

### Level 3: Detail
`Dashboard > Properties > The Ivory House`

### Level 4: Sub-detail
`Dashboard > Properties > The Ivory House > Gallery`

---

# Page Priority Matrix

## High Priority (MVP)
1. Landing Page (/)
2. Authentication Flow (/auth/*)
3. Home Dashboard (/dashboard/home)
4. Property Search (/dashboard/search/properties)
5. Property Details (/dashboard/properties/[id])
6. Book Inspection (/dashboard/bookings/new)
7. Inspection Calendar (/dashboard/bookings/calendar)
8. Conversation List (/dashboard/messages)
9. Chat Window (/dashboard/messages/[id])
10. Wallet Dashboard (/dashboard/wallet)
11. Checkout (/dashboard/payments/checkout)
12. Profile (/dashboard/profile)

## Medium Priority (V2)
13. AI Recommendations (/dashboard/ai/recommendations)
14. AI Search (/dashboard/ai/search)
15. Advanced Search (/dashboard/search/advanced)
16. Map Search (/dashboard/search/map)
17. Saved Properties (/dashboard/favourites)
18. Property Gallery (/dashboard/properties/[id]/gallery)
19. Inspection Tracking (/dashboard/bookings/[id]/tracking)
20. Transactions (/dashboard/wallet/transactions)
21. Notifications (/dashboard/notifications)

## Low Priority (V3+)
22. Property Reviews (/dashboard/properties/[id]/reviews)
23. 360 Tour (/dashboard/properties/[id]/tour)
24. Property Analytics (/dashboard/properties/[id]/analytics)
25. Collections (/dashboard/favourites/collections)
26. Compare Properties (/dashboard/favourites/compare)
27. Escrow (/dashboard/wallet/escrow)
28. Settings (/dashboard/settings/*)
29. Support (/dashboard/support/*)
30. Public pages (About, FAQ, Blog, etc.)

---

# Technical Considerations

## URL Structure
- Base: `https://cribseekers.com`
- Dashboard: `https://cribseekers.com/dashboard`
- Auth: `https://cribseekers.com/auth`
- Admin: `https://cribseekers.com/admin`

## Dynamic Routes
- Property ID: `/dashboard/properties/[id]`
- Booking ID: `/dashboard/bookings/[id]`
- Message ID: `/dashboard/messages/[id]`
- Notification ID: `/dashboard/notifications/[id]`
- Support Ticket ID: `/dashboard/support/[id]`
- Blog Post: `/blog/[slug]`
- Help Article: `/help/[category]/[article]`

## Query Parameters
- Search filters: `?city=Lagos&priceMin=1000000&priceMax=5000000`
- Pagination: `?page=1&limit=20`
- Sorting: `?sortBy=price&sortOrder=asc`
- Date ranges: `?startDate=2026-07-01&endDate=2026-07-31`

---

# Accessibility Requirements

## WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios (4.5:1 for text, 3:1 for UI)
- Focus indicators
- Skip navigation links
- Alt text for images
- Form error handling

---

# Responsive Breakpoints

## Desktop
- 1440px+ (Large desktop)
- 1280px - 1439px (Desktop)
- 1024px - 1279px (Small desktop)

## Tablet
- 768px - 1023px (Tablet landscape)
- 640px - 767px (Tablet portrait)

## Mobile
- 480px - 639px (Mobile large)
- 320px - 479px (Mobile small)

---

# Next Steps

**Phase 2:** Information Architecture  
- Define content hierarchy for each page  
- Establish content models  
- Create user journey maps  
- Define navigation patterns  

---

**End of Phase 1: Complete Sitemap**
