# CribSeekers Design System
## Phase 3: User Flows

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document defines the key user flows for CribSeekers, mapping complete user journeys from entry to completion. Each flow includes decision points, alternative paths, error states, and success criteria.

**Total User Flows:** 12  
**Primary Flows:** 6  
**Secondary Flows:** 6  

---

# Flow 1: Property Discovery → Booking → Payment

## Flow Overview

**User Goal:** Find a property, schedule an inspection, and complete payment  
**Primary User:** Property seeker/tenant/buyer  
**Entry Points:** Landing page, Dashboard home, Direct property link  
**Success Criteria:** Inspection booked and payment confirmed  
**Estimated Time:** 15-30 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point Selection
  │   ├─→ Landing Page (/)
  │   ├─→ Dashboard Home (/dashboard/home)
  │   └─→ Direct Property Link (/dashboard/properties/[id])
  │
  ├─→ [If not authenticated]
  │   └─→ Authentication Flow
  │       ├─→ /auth/welcome
  │       ├─→ /auth/signup OR /auth/login
  │       ├─→ /auth/verify-email
  │       └─→ /auth/complete-profile
  │
  ├─→ Property Search
  │   ├─→ /dashboard/search/properties
  │   │   ├─→ Enter search criteria
  │   │   ├─→ Apply filters
  │   │   ├─→ View results
  │   │   ├─→ [No results] → Adjust filters
  │   │   └─→ Select property
  │   │
  │   └─→ /dashboard/properties/[id] (Direct)
  │
  ├─→ Property Details
  │   └─→ /dashboard/properties/[id]
  │       ├─→ View images
  │       ├─→ Read description
  │       ├─→ Check amenities
  │       ├─→ View location
  │       ├─→ [Save property] → /dashboard/favourites
  │       ├─→ [Contact owner] → /dashboard/messages/property/[id]
  │       └─→ Click "Book Inspection"
  │
  ├─→ Book Inspection
  │   └─→ /dashboard/bookings/new
  │       ├─→ Review property summary
  │       ├─→ Select date
  │       ├─→ Select time slot
  │       ├─→ Add notes (optional)
  │       ├─→ [Invalid date/time] → Show error
  │       ├─→ Confirm booking
  │       └─→ Proceed to payment
  │
  ├─→ Payment Flow
  │   └─→ /dashboard/payments/checkout
  │       ├─→ Review order summary
  │       ├─→ Select payment method
  │       │   ├─→ Wallet
  │       │   ├─→ Card
  │       │   └─→ Bank Transfer
  │       ├─→ [Insufficient wallet balance] → Add funds
  │       ├─→ Enter payment details
  │       ├─→ Confirm payment
  │       │   ├─→ Success → /dashboard/payments/success
  │       │   ├─→ Failed → /dashboard/payments/failed
  │       │   └─→ Pending → /dashboard/payments/pending
  │       └─→ View receipt
  │
  └─→ SUCCESS
      ├─→ Booking confirmed
      ├─→ Payment successful
      ├─→ Notification sent
      └─→ Redirect to /dashboard/bookings/[id]
```

---

## Decision Points

### DP1: Authentication Required
**Location:** Property search or details page  
**Decision:** Is user authenticated?  
**True:** Continue to property details  
**False:** Redirect to authentication flow  
**UI:** Modal overlay with "Sign up to continue" message

### DP2: Property Selection
**Location:** Search results page  
**Decision:** Does user select a property?  
**True:** Navigate to property details  
**False:** Continue browsing or refine search  
**UI:** Property cards with hover states

### DP3: Booking Availability
**Location:** Book inspection page  
**Decision:** Is the selected time slot available?  
**True:** Proceed to payment  
**False:** Show available alternatives  
**UI:** Calendar with available/unavailable slots

### DP4: Payment Method
**Location:** Checkout page  
**Decision:** Which payment method?  
**Options:** Wallet, Card, Bank Transfer  
**UI:** Payment method cards with selection state

### DP5: Payment Success
**Location:** Payment processing  
**Decision:** Was payment successful?  
**True:** Show success page  
**False:** Show error page with retry option  
**UI:** Success animation or error message

---

## Error States

### ES1: Authentication Failure
**Trigger:** Invalid credentials or account issue  
**Location:** Login/signup pages  
**Message:** "Unable to sign in. Please check your credentials."  
**Recovery:** Retry, forgot password, contact support

### ES2: No Search Results
**Trigger:** Search returns zero properties  
**Location:** Search results page  
**Message:** "No properties match your search. Try adjusting your filters."  
**Recovery:** Clear filters, expand search area, change criteria

### ES3: Booking Conflict
**Trigger:** Selected time slot already booked  
**Location:** Book inspection page  
**Message:** "This time slot is no longer available. Please select another."  
**Recovery:** Show available alternatives

### ES4: Payment Failure
**Trigger:** Payment declined or processing error  
**Location:** Checkout page  
**Message:** "Payment failed. Please try again or use a different payment method."  
**Recovery:** Retry, change payment method, contact support

### ES5: Insufficient Balance
**Trigger:** Wallet balance insufficient  
**Location:** Checkout page  
**Message:** "Insufficient wallet balance. Please add funds or use another payment method."  
**Recovery:** Add funds, change payment method

---

## Success States

### SS1: Property Found
**Trigger:** User selects property from search  
**Location:** Property details page  
**Feedback:** Property details loaded with smooth transition  
**Next Step:** Review property or book inspection

### SS2: Booking Confirmed
**Trigger:** Inspection booking successful  
**Location:** Booking confirmation page  
**Feedback:** Success animation, confirmation details  
**Next Step:** Proceed to payment

### SS3: Payment Successful
**Trigger:** Payment processed successfully  
**Location:** Payment success page  
**Feedback:** Success animation, receipt displayed  
**Next Step:** View booking details or return to dashboard

---

# Flow 2: AI-Powered Search

## Flow Overview

**User Goal:** Use AI to find properties matching natural language preferences  
**Primary User:** Property seeker unsure of specific criteria  
**Entry Points:** Dashboard home, AI Search page  
**Success Criteria:** User finds relevant properties through AI conversation  
**Estimated Time:** 5-15 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/home (AI Recommendations section)
  │   └─→ /dashboard/ai/search
  │
  ├─→ AI Search Interface
  │   └─→ /dashboard/ai/search
  │       ├─→ Welcome message from AI
  │       ├─→ User enters natural language query
  │       │   Examples:
  │       │   - "I need a 2-bedroom apartment in Lekki under ₦2M"
  │       │   - "Show me pet-friendly houses near good schools"
  │       │   - "Quiet area, budget ₦3-5M, 3 bedrooms"
  │       │
  │       ├─→ AI processes query
  │       │   ├─→ Extracts criteria
  │       │   ├─→ Searches database
  │       │   └─→ Ranks results
  │       │
  │       ├─→ AI presents results
  │       │   ├─→ Property cards
  │       │   ├─→ Match score
  │       │   └─→ Explanation of match
  │       │
  │       ├─→ User interaction
  │       │   ├─→ [Satisfied] → Select property
  │       │   ├─→ [Refine] → Provide feedback
  │       │   │   - "Too expensive"
  │       │   │   - "Need more bedrooms"
  │       │   │   - "Different location"
  │       │   └─→ [Start over] → New query
  │       │
  │       └─→ AI refines based on feedback
  │           └─→ Loop until satisfied
  │
  ├─→ Property Selection
  │   └─→ /dashboard/properties/[id]
  │       └─→ Continue with Flow 1
  │
  └─→ SUCCESS
      └─→ User finds matching property
```

---

## Decision Points

### DP1: Query Understanding
**Location:** AI Search page  
**Decision:** Does AI understand the query?  
**True:** Process and return results  
**False:** Ask clarifying questions  
**UI:** Chat interface with typing indicator

### DP2: Result Relevance
**Location:** AI Search results  
**Decision:** Are results relevant to user?  
**True:** User selects property  
**False:** User provides refinement feedback  
**UI:** Property cards with match scores

### DP3: Refinement Needed
**Location:** AI conversation  
**Decision:** Does user want to refine results?  
**True:** Continue conversation  
**False:** Select property or start over  
**UI:** Quick refinement chips

---

## Error States

### ES1: Query Too Vague
**Trigger:** AI cannot extract meaningful criteria  
**Location:** AI Search page  
**Message:** "I need a bit more information. Could you tell me about your budget, preferred location, or property type?"  
**Recovery:** Provide more specific details

### ES2: No Matches Found
**Trigger:** No properties match criteria  
**Location:** AI Search results  
**Message:** "I couldn't find properties matching all your criteria. Would you like me to relax some filters?"  
**Recovery:** Relax filters, change criteria

### ES3: AI Processing Error
**Trigger:** AI service unavailable or error  
**Location:** AI Search page  
**Message:** "I'm having trouble right now. Please try again or use regular search."  
**Recovery:** Retry, switch to regular search

---

## Success States

### SS1: Query Understood
**Trigger:** AI successfully processes query  
**Location:** AI Search page  
**Feedback:** "I found some properties that might work for you"  
**Next Step:** Review results

### SS2: Relevant Results
**Trigger:** User finds relevant property  
**Location:** AI Search results  
**Feedback:** Property cards with high match scores  
**Next Step:** Select property

---

# Flow 3: Property Comparison

## Flow Overview

**User Goal:** Compare multiple saved properties side-by-side  
**Primary User:** Property seeker evaluating options  
**Entry Points:** Favourites page, Property details  
**Success Criteria:** User makes informed decision or eliminates options  
**Estimated Time:** 5-10 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/favourites
  │   └─→ /dashboard/properties/[id] (Save property)
  │
  ├─→ Save Properties
  │   └─→ [Save multiple properties]
  │       ├─→ Property details page
  │       │   └─→ Click "Save" button
  │       └─→ Search results
  │           └─→ Click heart icon
  │
  ├─→ Navigate to Compare
  │   └─→ /dashboard/favourites/compare
  │       ├─→ Select properties to compare (2-4)
  │       ├─→ [Less than 2] → Show error
  │       └─→ [More than 4] → Show error
  │
  ├─→ Comparison View
  │   └─→ /dashboard/favourites/compare
  │       ├─→ Side-by-side comparison table
  │       │   ├─→ Images
  │       │   ├─→ Price
  │       │   ├─→ Location
  │       │   ├─→ Specifications
  │       │   │   ├── Bedrooms
  │       │   │   ├── Bathrooms
  │       │   │   ├── Parking
  │       │   │   └── Area
  │       │   ├─→ Amenities
  │       │   ├─→ Owner info
  │       │   └─→ Rating
  │       │
  │       ├─→ Highlight differences
  │       │   └─→ Visual indicators for unique features
  │       │
  │       ├─→ Remove from comparison
  │       │   └─→ Click "X" on property column
  │       │
  │       └─→ User decision
  │           ├─→ [Select property] → Navigate to details
  │           ├─→ [Remove property] → Update comparison
  │           └─→ [Add more] → Return to favourites
  │
  ├─→ Property Selection
  │   └─→ /dashboard/properties/[id]
  │       └─→ Continue with Flow 1
  │
  └─→ SUCCESS
      └─→ User makes informed decision
```

---

## Decision Points

### DP1: Property Selection
**Location:** Favourites page  
**Decision:** Which properties to compare?  
**Constraint:** 2-4 properties minimum/maximum  
**UI:** Property cards with checkboxes

### DP2: Comparison Criteria
**Location:** Comparison page  
**Decision:** Which criteria to display?  
**Options:** All, Price, Location, Specs, Amenities  
**UI:** Filter tabs for comparison criteria

### DP3: Decision Made
**Location:** Comparison page  
**Decision:** Has user made a choice?  
**True:** Navigate to selected property  
**False:** Continue comparing or add more  
**UI:** "View property" buttons

---

## Error States

### ES1: Insufficient Properties
**Trigger:** User selects less than 2 properties  
**Location:** Favourites page  
**Message:** "Please select at least 2 properties to compare"  
**Recovery:** Select more properties

### ES2: Too Many Properties
**Trigger:** User selects more than 4 properties  
**Location:** Favourites page  
**Message:** "You can compare up to 4 properties at a time"  
**Recovery:** Deselect some properties

### ES3: No Saved Properties
**Trigger:** No properties in favourites  
**Location:** Favourites page  
**Message:** "You haven't saved any properties yet"  
**Recovery:** Browse and save properties

---

## Success States

### SS1: Comparison Ready
**Trigger:** 2-4 properties selected  
**Location:** Comparison page  
**Feedback:** Side-by-side comparison displayed  
**Next Step:** Review comparison

### SS2: Decision Made
**Trigger:** User selects preferred property  
**Location:** Comparison page  
**Feedback:** Navigate to property details  
**Next Step:** Book inspection

---

# Flow 4: Inspection Management

## Flow Overview

**User Goal:** Schedule, track, and manage property inspections  
**Primary User:** Property seeker, landlord, agent  
**Entry Points:** Property details, Dashboard calendar  
**Success Criteria:** Inspection completed successfully  
**Estimated Time:** 5 minutes (booking) + 1 hour (inspection)

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/properties/[id] (Book inspection)
  │   └─→ /dashboard/bookings/calendar
  │
  ├─→ Book Inspection
  │   └─→ /dashboard/bookings/new
  │       ├─→ Review property summary
  │       ├─→ Select date from calendar
  │       ├─→ Select time slot
  │       ├─→ Add notes (optional)
  │       ├─→ Confirm booking
  │       └─→ Proceed to payment (Flow 1)
  │
  ├─→ View Calendar
  │   └─→ /dashboard/bookings/calendar
  │       ├─→ View month/week/day
  │       ├─→ See scheduled inspections
  │       ├─→ Click inspection to view details
  │       └─→ [Book new] → /dashboard/bookings/new
  │
  ├─→ Inspection Details
  │   └─→ /dashboard/bookings/[id]
  │       ├─→ View status
  │       │   ├── Pending
  │       │   ├── Confirmed
  │       │   ├── In Progress
  │       │   ├── Completed
  │       │   └── Cancelled
  │       │
  │       ├─→ View property info
  │       ├─→ View date/time
  │       ├─→ View participants
  │       ├─→ View notes
  │       │
  │       ├─→ Actions based on status
  │       │   ├─→ [Pending] → Confirm, Cancel, Reschedule
  │       │   ├─→ [Confirmed] → Cancel, Reschedule, View QR
  │       │   ├─→ [In Progress] → Track, View QR
  │       │   └─→ [Completed] → View feedback, Leave review
  │       │
  │       └─→ Navigate to sub-pages
  │           ├── /dashboard/bookings/[id]/tracking
  │           ├── /dashboard/bookings/[id]/qr
  │           └─→ /dashboard/messages/property/[propertyId]
  │
  ├─→ Track Inspection
  │   └─→ /dashboard/bookings/[id]/tracking
  │       ├─→ Real-time status updates
  │       ├─→ Timeline of events
  │       ├─── Inspector location (map)
  │       ├─→ ETA
  │       └─→ Check-in/check-out status
  │
  ├─→ QR Code Check-in
  │   └─→ /dashboard/bookings/[id]/qr
  │       ├─→ Display QR code
  │       ├─→ Show instructions
  │       ├─→ Download QR code
  │       └─→ [Scan at property]
  │
  ├─→ Reschedule Inspection
  │   └─→ [From inspection details]
  │       ├─→ Select new date/time
  │       ├─→ Add reason (optional)
  │       ├─→ Confirm reschedule
  │       └─→ [Notify participants]
  │
  ├─→ Cancel Inspection
  │   └─→ [From inspection details]
  │       ├─→ Select reason
  │       ├─→ Confirm cancellation
  │       └─→ [Refund processing]
  │
  ├─→ Inspection Complete
  │   └─→ [After inspection]
  │       ├─→ Submit feedback
  │       ├─→ Rate property
  │       ├─→ Rate inspector
  │       └─→ [Future] Leave review
  │
  └─→ SUCCESS
      └─→ Inspection completed and documented
```

---

## Decision Points

### DP1: Time Slot Selection
**Location:** Book inspection page  
**Decision:** Is time slot available?  
**True:** Proceed to confirmation  
**False:** Show available alternatives  
**UI:** Calendar with availability indicators

### DP2: Confirmation Required
**Location:** Inspection details page  
**Decision:** Does inspection need confirmation?  
**True:** Show confirm button  
**False:** Auto-confirmed  
**UI:** Status badge with action button

### DP3: Cancellation
**Location:** Inspection details page  
**Decision:** Should inspection be cancelled?  
**True:** Select reason and confirm  
**False:** Keep inspection  
**UI:** Cancel button with confirmation modal

### DP4: Reschedule
**Location:** Inspection details page  
**Decision:** Should inspection be rescheduled?  
**True:** Select new date/time  
**False:** Keep current schedule  
**UI:** Reschedule button with calendar

---

## Error States

### ES1: No Available Slots
**Trigger:** No time slots available on selected date  
**Location:** Book inspection page  
**Message:** "No time slots available on this date. Please select another date."  
**Recovery:** Select different date

### ES2: Cancellation Too Late
**Trigger:** Cancellation within 24 hours  
**Location:** Inspection details page  
**Message:** "Cancellations must be made at least 24 hours in advance. Contact support for assistance."  
**Recovery:** Contact support

### ES3: QR Code Expired
**Trigger:** QR code expired or used  
**Location:** QR code page  
**Message:** "This QR code has expired. Please refresh to get a new code."  
**Recovery:** Refresh QR code

---

## Success States

### SS1: Booking Confirmed
**Trigger:** Inspection booked successfully  
**Location:** Booking confirmation page  
**Feedback:** Success animation, confirmation details  
**Next Step:** View calendar or property details

### SS2: Check-in Successful
**Trigger:** QR code scanned successfully  
**Location:** Inspection tracking page  
**Feedback:** "Check-in successful" notification  
**Next Step**: Begin inspection

### SS3: Inspection Completed
**Trigger:** Inspection marked complete  
**Location:** Inspection details page  
**Feedback:** Status updated to "Completed"  
**Next Step:** Submit feedback

---

# Flow 5: Wallet & Payments

## Flow Overview

**User Goal:** Manage wallet funds and complete payments  
**Primary User:** All authenticated users  
**Entry Points:** Wallet dashboard, Checkout flow  
**Success Criteria:** Transaction completed successfully  
**Estimated Time:** 2-5 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/wallet
  │   └─→ /dashboard/payments/checkout
  │
  ├─→ Wallet Dashboard
  │   └─→ /dashboard/wallet
  │       ├─→ View balance
  │       ├─→ Quick actions
  │       │   ├── Deposit
  │       │   ├── Withdraw
  │       │   └── Transfer
  │       │
  │       ├─→ Recent transactions
  │       ├─── Linked cards
  │       └─── Bank accounts
  │
  ├─→ Deposit Funds
  │   └─→ /dashboard/wallet/deposit
  │       ├─→ Enter amount
  │       ├─→ Select payment method
  │       │   ├── Card
  │       │   └── Bank Transfer
  │       ├─→ Enter payment details
  │       ├─→ Confirm deposit
  │       └─→ [Success] → Balance updated
  │
  ├─→ Withdraw Funds
  │   └─→ /dashboard/wallet/withdraw
  │       ├─→ Enter amount
  │       ├─→ Select bank account
  │       │   └─→ [No account] → Add bank account
  │       ├─→ Confirm withdrawal
  │       └─→ [Success] → Balance updated
  │
  ├─→ Add Bank Account
  │   └─→ [From wallet settings]
  │       ├─→ Select bank
  │       ├─→ Enter account number
  │       ├─→ Verify account name
  │       ├─→ Set as default (optional)
  │       └─→ [Success] → Account linked
  │
  ├─→ Add Card
  │   └─→ [From wallet settings]
  │       ├─→ Enter card details
  │       │   ├── Card number
  │       │   ├── Expiry date
  │       │   └──── CVV
  │       ├─→ Save card (optional)
  │       ├─→ Set as default (optional)
  │       └─→ [Success] → Card added
  │
  ├─→ View Transactions
  │   └─→ /dashboard/wallet/transactions
  │       ├─→ Filter by type
  │       │   ├── All
  │       │   ├── Deposits
  │       │   ├── Withdrawals
  │       │   ├── Payments
  │       │   └──── Refunds
  │       ├─→ Filter by date range
  │       ├─→ Search by reference
  │       └─→ Export statement
  │
  ├─→ Payment Flow
  │   └─→ /dashboard/payments/checkout
  │       ├─→ Review order summary
  │       ├─→ Select payment method
  │       │   ├── Wallet
  │       │   ├── Card
  │       │   └─── Bank Transfer
  │       ├─→ [Wallet selected]
  │       │   ├─→ Check balance
  │       │   ├─→ [Insufficient] → Add funds
  │       │   └─→ Confirm payment
  │       │
  │       ├─→ [Card selected]
  │       │   ├─→ Select saved card
  │       │   │   └─→ [No card] → Add card
  │       │   ├─── Enter card details
  │       │   └─→ Confirm payment
  │       │
  │       └─→ [Bank transfer selected]
  │           ├─→ Display bank details
  │           ├─── Show reference number
  │           └─→ [Await payment] → Pending status
  │
  ├─→ Payment Processing
  │   ├─→ Success → /dashboard/payments/success
  │   ├─→ Failed → /dashboard/payments/failed
  │   └─→ Pending → /dashboard/payments/pending
  │
  ├─→ View Receipt
  │   └─→ [From payment success]
  │       ├─→ Display receipt
  │       ├─── Download PDF
  │       ├─── Email receipt
  │       └─── Share receipt
  │
  └─→ SUCCESS
      └─→ Transaction completed
```

---

## Decision Points

### DP1: Payment Method
**Location:** Checkout page  
**Decision:** Which payment method to use?  
**Options:** Wallet, Card, Bank Transfer  
**UI:** Payment method cards

### DP2: Wallet Balance
**Location:** Checkout page (wallet selected)  
**Decision:** Is wallet balance sufficient?  
**True:** Proceed to payment  
**False:** Prompt to add funds  
**UI:** Balance indicator with "Add funds" option

### DP3: Card Selection
**Location:** Checkout page (card selected)  
**Decision:** Use saved card or add new?  
**Options:** Saved cards, Add new card  
**UI:** Card list with "Add new" option

### DP4: Withdrawal Amount
**Location:** Withdraw page  
**Decision:** Is withdrawal amount valid?  
**True:** Proceed  
**False:** Show error (insufficient balance, below minimum)  
**UI:** Amount input with validation

---

## Error States

### ES1: Insufficient Balance
**Trigger:** Wallet balance insufficient for payment  
**Location:** Checkout page  
**Message:** "Insufficient wallet balance. Please add funds or use another payment method."  
**Recovery:** Add funds, change payment method

### ES2: Card Declined
**Trigger:** Payment card declined  
**Location:** Checkout page  
**Message:** "Your card was declined. Please try another card or contact your bank."  
**Recovery:** Try another card, use different payment method

### ES3: Withdrawal Limit
**Trigger:** Withdrawal exceeds daily/monthly limit  
**Location:** Withdraw page  
**Message:** "Withdrawal amount exceeds your daily limit. Please try a smaller amount or contact support."  
**Recovery:** Reduce amount, contact support

### ES4: Bank Account Not Verified
**Trigger:** Bank account not verified  
**Location:** Withdraw page  
**Message:** "Please verify your bank account before withdrawing."  
**Recovery:** Verify bank account

---

## Success States

### SS1: Deposit Successful
**Trigger:** Deposit completed  
**Location:** Wallet dashboard  
**Feedback:** Balance updated, success notification  
**Next Step:** Use funds for payment

### SS2: Payment Successful
**Trigger:** Payment processed  
**Location:** Payment success page  
**Feedback:** Success animation, receipt displayed  
**Next Step:** View receipt or return to dashboard

### SS3: Withdrawal Successful
**Trigger:** Withdrawal processed  
**Location:** Wallet dashboard  
**Feedback:** Balance updated, success notification  
**Next Step:** View transaction history

---

# Flow 6: Communication

## Flow Overview

**User Goal:** Communicate with property owners, agents, and support  
**Primary User:** All authenticated users  
**Entry Points:** Property details, Messages page, Support page  
**Success Criteria:** Message sent and response received  
**Estimated Time:** 2-10 minutes per conversation

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/properties/[id] (Contact owner)
  │   ├─→ /dashboard/messages
  │   └─→ /dashboard/support/new
  │
  ├─→ Start Conversation
  │   ├─→ From Property Details
  │   │   └─→ /dashboard/messages/property/[propertyId]
  │   │       ├─→ Property context displayed
  │   │       ├─── Pre-filled message
  │   │       ├─→ Send message
  │   │       └─→ Conversation created
  │   │
  │   └─→ From Messages Page
  │       └─→ /dashboard/messages
  │           ├─→ Click "New message"
  │           ├─→ Select recipient
  │           │   ├── Search users
  │           │   └─── Select from recent
  │           ├─→ Link property (optional)
  │           ├─→ Send message
  │           └─→ Conversation created
  │
  ├─→ View Conversation List
  │   └─→ /dashboard/messages
  │       ├─→ Filter conversations
  │       │   ├── All
  │       │   ├── Unread
  │       │   ├── Archived
  │       │   └─── Property chats
  │       ├─→ Search conversations
  │       ├─── View conversation preview
  │       │   ├── Participant avatars
  │       │   ├── Last message
  │       │   ├── Timestamp
  │       │   └─── Unread badge
  │       └─── Click to open conversation
  │
  ├─→ Chat Interface
  │   └─→ /dashboard/messages/[id]
  │       ├─→ Chat header
  │       │   ├── Participant info
  │       │   ├── Property link (if applicable)
  │       │   └─── Actions (call, archive, more)
  │       │
  │       ├─→ Message list
  │       │   ├── Grouped by date
  │       │   ├── Sent messages (right)
  │       │   ├── Received messages (left)
  │       │   ├── System messages (center)
  │       │   └─── Typing indicator
  │       │
  │       ├─→ Input area
  │       │   ├── Text field
  │       │   ├── Attachment button
  │       │   ├── Emoji button
  │       │   └─── Send button
  │       │
  │       └─→ Real-time updates
  │           ├── New messages
  │           ├── Read receipts
  │           ├── Typing status
  │           └─── Online status
  │
  ├─→ Send Message
  │   └─→ [From chat interface]
  │       ├─→ Type message
  │       ├─→ [Attach file] → Select file
  │       ├─→ [Send] → Message delivered
  │       └─── [Error] → Retry option
  │
  ├─── View Shared Files
  │   └─→ /dashboard/messages/[id]/files
  │       ├─→ File list
  │       ├─── Preview file
  │       ├─── Download file
  │       └─── Upload file
  │
  ├─→ Archive Conversation
  │   └─→ [From chat interface]
  │       ├─→ Click "More" menu
  │       ├─→ Select "Archive"
  │       └─→ Confirm
  │
  ├─→ Support Ticket
  │   └─→ /dashboard/support/new
  │       ├─→ Select category
  │       │   ├── Booking issue
  │       │   ├── Payment issue
  │       │   ├── Property issue
  │       │   ├── Account issue
  │       │   └─── Other
  │       ├─→ Enter subject
  │       ├─── Describe issue
  │       ├─── Attach files (optional)
  │       ├─→ Submit ticket
  │       └─→ [Success] → Ticket created
  │
  └─→ SUCCESS
      └─→ Communication established
```

---

## Decision Points

### DP1: Conversation Type
**Location:** New message page  
**Decision:** Is this a property-related conversation?  
**True:** Link property to conversation  
**False:** General conversation  
**UI:** Property selector with search

### DP2: Message Type
**Location:** Chat interface  
**Decision:** Send text or attachment?  
**Options:** Text, Image, File, Location  
**UI:** Input field with attachment button

### DP3: Support Category
**Location:** Support ticket page  
**Decision:** What is the issue category?  
**Options:** Booking, Payment, Property, Account, Other  
**UI:** Category cards with icons

---

## Error States

### ES1: Message Failed
**Trigger:** Message delivery failed  
**Location:** Chat interface  
**Message:** "Message failed to send. Tap to retry."  
**Recovery:** Retry message

### ES2: File Upload Failed
**Trigger:** File upload failed  
**Location:** Chat interface  
**Message:** "File upload failed. Please try again."  
**Recovery:** Retry upload, select different file

### ES3: Conversation Not Found
**Trigger:** Conversation ID invalid or deleted  
**Location:** Chat interface  
**Message:** "This conversation no longer exists."  
**Recovery:** Return to conversation list

---

## Success States

### SS1: Message Sent
**Trigger:** Message delivered successfully  
**Location:** Chat interface  
**Feedback:** Message appears in chat, checkmark indicator  
**Next Step:** Wait for response

### SS2: File Attached
**Trigger:** File uploaded successfully  
**Location:** Chat interface  
**Feedback:** File preview in chat  
**Next Step:** Send message

### SS3: Ticket Created
**Trigger:** Support ticket submitted  
**Location:** Support confirmation page  
**Feedback:** Success message, ticket number  
**Next Step:** View ticket details

---

# Flow 7: Profile Management

## Flow Overview

**User Goal:** Manage personal profile and account settings  
**Primary User:** All authenticated users  
**Entry Points:** Profile page, Settings page  
**Success Criteria:** Profile updated successfully  
**Estimated Time:** 5-15 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/profile
  │   └─→ /dashboard/settings
  │
  ├─→ View Profile
  │   └─→ /dashboard/profile
  │       ├─→ Profile header
  │       │   ├── Avatar
  │       │   ├── Name
  │       │   ├── Role badge
  │       │   └─── Verification status
  │       │
  │       ├─→ Contact information
  │       │   ├── Email
  │       │   ├── Phone
  │       │   └─── Location
  │       │
  │       ├─→ Preferences
  │       │   ├── Property preferences
  │       │   └─── Notification settings
  │       │
  │       ├─── Statistics
  │       │   ├── Properties viewed
  │       │   ├── Inspections booked
  │       │   └─── Payments made
  │       │
  │       └─→ Actions
  │           ├── Edit profile
  │           ├── Verification
  │           ├── Security
  │           └─── Settings
  │
  ├─→ Edit Profile
  │   └─→ /dashboard/profile/edit
  │       ├─→ Upload avatar
  │       ├─→ Update name
  │       ├─── Update bio
  │       ├─── Update contact info
  │       │   ├── Email
  │       │   ├── Phone
  │       │   └─── Location
  │       ├─── Update preferences
  │       │   ├── Property types
  │       │   ├── Price range
  │       │   └─── Preferred locations
  │       ├─→ Save changes
  │       └─── [Success] → Profile updated
  │
  ├─→ Identity Verification
  │   └─→ /dashboard/profile/verification
  │       ├─→ View verification status
  │       │   ├── Not started
  │       │   ├── Pending
  │       │   ├── Verified
  │       │   └─── Rejected
  │       │
  │       ├─→ [Not started/Pending]
  │       │   ├─→ Select ID type
  │       │   │   ├── NIN
  │       │   │   ├── Passport
  │       │   │   └─── Driver's License
  │       │   ├─→ Enter ID number
  │       │   ├─→ Upload ID document
  │       │   ├─→ Upload selfie
  │       │   ├─→ Submit for verification
  │       │   └─→ [Pending] → Under review
  │       │
  │       └─→ [Rejected]
  │           ├─→ View rejection reason
  │           ├─→ Correct information
  │           └─→ Resubmit
  │
  ├─→ Security Settings
  │   └─→ /dashboard/profile/security
  │       ├─→ Change password
  │       │   ├── Enter current password
  │       │   ├── Enter new password
  │       │   ├── Confirm new password
  │       │   └─── Update password
  │       │
  │       ├─→ Two-factor authentication
  │       │   ├── View status
  │       │   ├── [Disabled] → Enable 2FA
  │       │   │   ├── Select method (SMS/App)
  │       │   │   ├── Verify phone/app
  │       │   │   └─── 2FA enabled
  │       │   └─── [Enabled] → Disable 2FA
  │       │
  │       ├─→ Login history
  │       │   ├── View recent logins
  │       │   ├── Device info
  │       │   ├── Location
  │       │   └─── IP address
  │       │
  │       └─── Active sessions
  │           ├── View active sessions
  │           ├── Revoke session
  │           └─── Sign out all devices
  │
  ├─→ Connected Accounts
  │   └─→ /dashboard/profile/connected
  │       ├─→ View connected accounts
  │       │   ├── Google
  │       │   ├── Facebook
  │       │   └─── Apple
  │       ├─── Connect account
  │       │   └─→ OAuth flow
  │       └─── Disconnect account
  │
  └─→ SUCCESS
      └─→ Profile updated
```

---

## Decision Points

### DP1: Profile Section
**Location:** Profile page  
**Decision:** Which section to edit?  
**Options:** Basic info, Contact, Preferences, Verification, Security  
**UI:** Tabbed interface or section cards

### DP2: Verification Method
**Location:** Verification page  
**Decision:** Which ID type to use?  
**Options:** NIN, Passport, Driver's License  
**UI:** ID type cards with icons

### DP3: 2FA Method
**Location:** Security page  
**Decision:** Which 2FA method to use?  
**Options:** SMS, Authenticator app  
**UI:** Method cards with selection state

---

## Error States

### ES1: Invalid File Format
**Trigger:** Uploaded file format not supported  
**Location:** Verification page  
**Message:** "Please upload a valid image file (JPG, PNG)."  
**Recovery:** Upload correct file format

### ES2: File Too Large
**Trigger:** Uploaded file exceeds size limit  
**Location:** Verification page  
**Message:** "File size exceeds 5MB limit. Please upload a smaller file."  
**Recovery:** Upload smaller file

### ES3: Password Mismatch
**Trigger:** New passwords don't match  
**Location:** Security page  
**Message:** "Passwords do not match. Please try again."  
**Recovery:** Re-enter passwords

### ES4: Weak Password
**Trigger:** New password doesn't meet requirements  
**Location:** Security page  
**Message:** "Password must be at least 8 characters with uppercase, lowercase, and numbers."  
**Recovery:** Enter stronger password

---

## Success States

### SS1: Profile Updated
**Trigger:** Profile changes saved  
**Location:** Profile page  
**Feedback:** Success notification, updated information displayed  
**Next Step:** Continue using platform

### SS2: Verification Submitted
**Trigger:** KYC documents submitted  
**Location:** Verification page  
**Feedback:** "Verification submitted. We'll review within 24-48 hours."  
**Next Step:** Wait for verification

### SS3: Password Changed
**Trigger:** Password updated successfully  
**Location:** Security page  
**Feedback:** Success notification  
**Next Step:** Re-login with new password

---

# Flow 8: Saved Properties

## Flow Overview

**User Goal:** Save, organize, and manage favourite properties  
**Primary User:** Property seekers  
**Entry Points:** Property details, Search results  
**Success Criteria:** Properties saved and organized  
**Estimated Time:** 1-5 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/properties/[id] (Save property)
  │   └─→ /dashboard/search/properties (Save property)
  │
  ├─→ Save Property
  │   └─→ [From property details or search]
  │       ├─→ Click heart icon
  │       ├─→ [Not authenticated] → Prompt to sign up
  │       ├─→ [Authenticated] → Property saved
  │       └─── [Optional] → Add to collection
  │
  ├─→ View Saved Properties
  │   └─→ /dashboard/favourites
  │       ├─→ Property grid
  │       │   ├── Property cards
  │       │   ├── Remove button
  │       │   └─── Add to collection
  │       │
  │       ├─→ Filter options
  │       │   ├── All
  │       │   ├── By collection
  │       │   └─── Recently added
  │       │
  │       └─── Sort options
  │           ├── Recently added
  │           ├── Price (low to high)
  │           ├── Price (high to low)
  │           └─── Most viewed
  │
  ├─→ Create Collection
  │   └─→ [From favourites page]
  │       ├─→ Click "Create collection"
  │       ├─→ Enter collection name
  │       ├─── Select properties to add
  │       ├─→ Save collection
  │       └─── [Success] → Collection created
  │
  ├─→ Manage Collections
  │   └─→ /dashboard/favourites/collections
  │       ├─→ View collections
  │       │   ├── Collection name
  │       │   ├── Property count
  │       │   └─── Thumbnail
  │       │
  │       ├─→ Edit collection
  │       │   ├── Rename
  │       │   ├── Add/remove properties
  │       │   └─── Delete collection
  │       │
  │       └─── Delete collection
  │           └─→ Confirm deletion
  │
  ├─→ Compare Properties
  │   └─→ /dashboard/favourites/compare
  │       └─→ Continue with Flow 3
  │
  └─→ SUCCESS
      └─→ Properties saved and organized
```

---

## Decision Points

### DP1: Save Action
**Location:** Property card or details  
**Decision:** Save to favourites or specific collection?  
**Options:** Favourites, Existing collection, New collection  
**UI:** Heart icon with collection dropdown

### DP2: Collection Management
**Location:** Collections page  
**Decision:** Create, edit, or delete collection?  
**Options:** Create new, Edit existing, Delete  
**UI:** Collection cards with action buttons

---

## Error States

### ES1: Authentication Required
**Trigger:** User not authenticated  
**Location:** Property details or search  
**Message:** "Sign up to save properties"  
**Recovery:** Sign up or log in

### ES2: Collection Limit
**Trigger:** Maximum collections reached  
**Location:** Collections page  
**Message:** "You've reached the maximum number of collections. Delete some to create more."  
**Recovery:** Delete existing collection

---

## Success States

### SS1: Property Saved
**Trigger:** Property added to favourites  
**Location:** Property details or search  
**Feedback:** Heart icon filled, success notification  
**Next Step:** View favourites or continue browsing

### SS2: Collection Created
**Trigger:** New collection created  
**Location:** Collections page  
**Feedback:** Collection appears in list  
**Next Step**: Add properties to collection

---

# Flow 9: Notification Management

## Flow Overview

**User Goal:** View and manage notifications  
**Primary User:** All authenticated users  
**Entry Points:** Notification bell, Notifications page  
**Success Criteria:** Notifications reviewed and preferences set  
**Estimated Time:** 1-5 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ Notification bell (header)
  │   └─→ /dashboard/notifications
  │
  ├─→ View Notifications
  │   └─→ /dashboard/notifications
  │       ├─→ Notification list
  │       │   ├── Type icon
  │       │   ├── Title
  │       │   ├── Body preview
  │       │   ├── Timestamp
  │       │   └─── Unread indicator
  │       │
  │       ├─→ Filter notifications
  │       │   ├── All
  │       │   ├── Unread
  │       │   ├── Inspection
  │       │   ├── Payment
  │       │   └─── Message
  │       │
  │       ├─→ Mark all as read
  │       └─── Click notification to view details
  │
  ├─→ Notification Details
  │   └─→ /dashboard/notifications/[id]
  │       ├─→ Full message
  │       ├─── Related content
  │       │   ├── Property link
  │       │   ├── Inspection link
  │       │   └─── Message link
  │       ├─── Action buttons
  │       │   ├── View property
  │       │   ├── Confirm inspection
  │       │   └─── Make payment
  │       └─── Mark as read
  │
  ├─→ Notification Preferences
  │   └─→ /dashboard/notifications/preferences
  │       ├─→ Channel settings
  │       │   ├── Email
  │       │   ├── SMS
  │       │   ├── Push
  │       │   └─── In-app
  │       │
  │       ├─→ Category settings
  │       │   ├── Inspections
  │       │   ├── Messages
  │       │   ├── Payments
  │       │   ├── Recommendations
  │       │   └─── System updates
  │       │
  │       └─── Save preferences
  │
  └─→ SUCCESS
      └─→ Notifications managed
```

---

## Decision Points

### DP1: Notification Action
**Location:** Notification details  
**Decision:** What action to take?  
**Options:** View related content, Dismiss, Mark unread  
**UI:** Action buttons based on notification type

### DP2: Preference Category
**Location:** Preferences page  
**Decision:** Which category to configure?  
**Options:** Inspections, Messages, Payments, Recommendations, System  
**UI:** Category sections with toggles

---

## Error States

### ES1: Notification Not Found
**Trigger:** Notification ID invalid or expired  
**Location:** Notification details page  
**Message:** "This notification no longer exists."  
**Recovery:** Return to notifications list

---

## Success States

### SS1: Notification Read
**Trigger:** Notification marked as read  
**Location:** Notifications page  
**Feedback:** Unread indicator removed  
**Next Step:** Continue browsing

### SS2: Preferences Saved
**Trigger:** Notification preferences updated  
**Location:** Preferences page  
**Feedback:** Success notification  
**Next Step**: Continue using platform

---

# Flow 10: Settings Management

## Flow Overview

**User Goal:** Configure account and app settings  
**Primary User:** All authenticated users  
**Entry Points:** Settings page, Profile page  
**Success Criteria:** Settings updated successfully  
**Estimated Time:** 5-10 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   └─→ /dashboard/settings
  │
  ├─→ Settings Navigation
  │   └─→ /dashboard/settings
  │       ├─→ General
  │       ├─→ Privacy
  │       ├─→ Notifications
  │       ├─→ Security
  │       ├─→ Appearance
  │       ├── Devices
  │       └─── Sessions
  │
  ├─→ General Settings
  │   └─→ /dashboard/settings/general
  │       ├─→ Language
  │       │   ├── English
  │       │   ├── Pidgin
  │       │   └─── [Future] Other languages
  │       │
  │       ├─→ Timezone
  │       │   └─── Africa/Lagos (default)
  │       │
  │       ├─→ Currency
  │       │   └─── NGN (default)
  │       │
  │       └─── Save changes
  │
  ├─→ Privacy Settings
  │   └─→ /dashboard/settings/privacy
  │       ├─→ Profile visibility
  │       │   ├── Public
  │       │   ├── Private
  │       │   └─── Connections only
  │       │
  │       ├─→ Activity status
  │       │   ├── Show online status
  │       │   └─── Show last seen
  │       │
  │       ├─→ Data sharing
  │       │   ├── Analytics
  │       │   └─── Recommendations
  │       │
  │       └─→ Save changes
  │
  ├─→ Notification Settings
  │   └─→ /dashboard/settings/notifications
  │       └─→ [Similar to Flow 9 preferences]
  │
  ├─→ Appearance Settings
  │   └─→ /dashboard/settings/appearance
  │       ├─→ Theme
  │       │   ├── Light
  │       │   ├── Dark
  │       │   └─── System
  │       │
  │       ├─→ Font size
  │       │   ├── Small
  │       │   ├── Medium
  │       │   └─── Large
  │       │
  │       └─── Save changes
  │
  ├─→ Device Management
  │   └─→ /dashboard/settings/devices
  │       ├─→ View connected devices
  │       │   ├── Device name
  │       │   ├── Device type
  │       │   ├── Last active
  │       │   └─── Current device badge
  │       │
  │       └─→ Remove device
  │           └─→ Confirm removal
  │
  ├─→ Session Management
  │   └─→ /dashboard/settings/sessions
  │       ├─→ View active sessions
  │       │   ├── Device
  │       │   ├── Browser
  │       │   ├── Location
  │       │   ├── IP address
  │       │   └─── Last active
  │       │
  │       ├─→ Revoke session
  │       └─→ Sign out all devices
  │
  └─→ SUCCESS
      └─→ Settings updated
```

---

## Decision Points

### DP1: Settings Category
**Location:** Settings page  
**Decision:** Which settings category to configure?  
**Options:** General, Privacy, Notifications, Security, Appearance, Devices, Sessions  
**UI:** Sidebar navigation

### DP2: Theme Selection
**Location:** Appearance settings  
**Decision:** Which theme to use?  
**Options:** Light, Dark, System  
**UI:** Theme cards with preview

---

## Error States

### ES1: Session Revocation Failed
**Trigger:** Unable to revoke session  
**Location:** Sessions page  
**Message:** "Unable to revoke session. Please try again."  
**Recovery:** Retry, contact support

---

## Success States

### SS1: Settings Saved
**Trigger:** Settings changes saved  
**Location:** Settings page  
**Feedback:** Success notification  
**Next Step**: Continue using platform

### SS2: Session Revoked
**Trigger:** Session successfully revoked  
**Location:** Sessions page  
**Feedback:** Session removed from list  
**Next Step**: Continue managing sessions

---

# Flow 11: Support Flow

## Flow Overview

**User Goal:** Get help with platform issues  
**Primary User:** All authenticated users  
**Entry Points:** Help Center, Support page, Contact link  
**Success Criteria:** Issue resolved or ticket created  
**Estimated Time:** 5-15 minutes

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /help (Public help center)
  │   ├─→ /dashboard/support
  │   └─→ [Contact link] in footer
  │
  ├─→ Help Center
  │   └─→ /help OR /dashboard/support
  │       ├─→ Search help articles
  │       ├─→ Browse categories
  │       │   ├── Getting started
  │       │   ├── Account
  │       │   ├── Properties
  │       │   ├── Bookings
  │       │   ├── Payments
  │       │   └─── Technical issues
  │       │
  │       ├─→ View article
  │       │   ├── Article content
  │       │   ├── Related articles
  │       │   └─── Was this helpful?
  │       │
  │       └─→ [Issue not resolved] → Create ticket
  │
  ├─→ Create Support Ticket
  │   └─→ /dashboard/support/new
  │       ├─→ Select category
  │       │   ├── Booking issue
  │       │   ├── Payment issue
  │       │   ├── Property issue
  │       │   ├── Account issue
  │       │   ├── Technical issue
  │       │   └─── Other
  │       │
  │       ├─→ Enter subject
  │       ├─→ Describe issue
  │       ├─── Select priority
  │       │   ├── Low
  │       │   ├── Normal
  │       │   └─── High
  │       │
  │       ├─── Attach files (optional)
  │       ├─→ Submit ticket
  │       └─→ [Success] → Ticket created
  │
  ├─→ View Ticket Details
  │   └─→ /dashboard/support/[id]
  │       ├─→ Ticket information
  │       │   ├── Ticket number
  │       │   ├── Category
  │       │   ├── Status
  │       │   ├── Priority
  │       │   └──── Created at
  │       │
  │       ├─── Message thread
  │       │   ├── User messages
  │       │   ├── Support responses
  │       │   └─── System updates
  │       │
  │       ├─── Send message
  │       │   └─→ [Similar to Flow 6]
  │       │
  │       └─── Actions
  │           ├── Close ticket
  │           ├── Reopen ticket
  │           └─── Escalate
  │
  └─→ SUCCESS
      └─→ Issue resolved or ticket created
```

---

## Decision Points

### DP1: Help vs. Ticket
**Location:** Help center  
**Decision:** Can issue be resolved with self-help?  
**True:** Browse help articles  
****False:** Create support ticket  
**UI:** Search bar with "Contact support" option

### DP2: Ticket Category
**Location:** Create ticket page  
**Decision:** What is the issue category?  
**Options:** Booking, Payment, Property, Account, Technical, Other  
**UI:** Category cards with icons

### DP3: Ticket Priority
**Location:** Create ticket page  
**Decision:** What is the issue priority?  
**Options:** Low, Normal, High  
**UI:** Priority selector with descriptions

---

## Error States

### ES1: No Articles Found
**Trigger:** Search returns no results  
**Location:** Help center  
**Message:** "No articles found. Try different keywords or create a support ticket."  
**Recovery**: Try different search, create ticket

---

## Success States

### SS1: Article Helpful
**Trigger:** User marks article as helpful  
**Location:** Article page  
**Feedback:** Thank you message  
**Next Step**: Continue browsing or close

### SS2: Ticket Created
**Trigger:** Support ticket submitted  
**Location:** Ticket confirmation page  
**Feedback:** Success message, ticket number  
**Next Step**: View ticket details

---

# Flow 12: Escrow Transaction

## Flow Overview

**User Goal:** Complete secure payment through escrow  
**Primary User:** Property buyers, landlords  
**Entry Points:** Property purchase flow, Payment checkout  
**Success Criteria:** Funds held and released appropriately  
**Estimated Time:** 1-7 days (transaction lifecycle)

---

## Flow Diagram

```
START
  │
  ├─→ Entry Point
  │   ├─→ /dashboard/properties/[id] (Purchase property)
  │   └─→ /dashboard/payments/checkout
  │
  ├─→ Initiate Escrow
  │   └─→ [From property purchase]
  │       ├─→ Select escrow payment method
  │       ├─→ Review escrow terms
  │       │   ├── Hold period
  │       │   ├── Release conditions
  │       │   └─── Fees
  │       │
  │       ├─→ Confirm escrow payment
  │       └─→ [Payment processed] → Funds held
  │
  ├─→ Escrow Held
  │   └─→ /dashboard/wallet/escrow
  │       ├─→ View active escrows
  │       │   ├── Property info
  │       │   ├── Amount held
  │       │   ├── Hold start date
  │       │   ├── Release conditions
  │       │   └─── Status
  │       │
  │       ├─→ [Inspection completed]
  │       │   └─→ Ready for release
  │       │
  │       └─── [Issue with property]
  │           └─→ Request refund
  │
  ├─→ Release Funds
  │   └─→ [From escrow details]
  │       ├─→ Buyer requests release
  │       │   ├─→ Confirm release
  │       │   ├─── Funds transferred to seller
  │       │   └─── Transaction complete
  │       │
  │       └─→ Seller requests release
  │           ├─→ Buyer confirms
  │           ├─── [Confirmed] → Funds released
  │           └─── [Disputed] → Escalate
  │
  ├─→ Request Refund
  │   └─→ [From escrow details]
  │       ├─→ Select reason
  │       │   ├── Property not as described
  │       │   ├── Inspection failed
  │       │   ├── Seller unresponsive
  │       │   └─── Other
  │       │
  │       ├─→ Provide evidence
  │       │   ├── Attach photos
  │       │   ├── Attach documents
  │       │   └─── Description
  │       │
  │       ├─→ Submit refund request
  │       └─→ [Under review]
  │
  ├─→ Escalation
  │   └─→ [From disputed escrow]
  │       ├─→ Support review
  │       ├─→ Evidence collection
  │       ├─→ Decision made
  │       │   ├── Release to buyer (refund)
  │       │   ├── Release to seller
  │       │   └─── Partial refund
  │       │
  │       └─→ [Decision final]
  │
  └─→ SUCCESS
      └─→ Escrow transaction complete
```

---

## Decision Points

### DP1: Escrow Initiation
**Location:** Checkout page  
**Decision:** Use escrow or direct payment?  
**Options:** Escrow, Direct payment  
**UI:** Payment method selection with escrow benefits

### DP2: Release Request
**Location:** Escrow details page  
**Decision:** Who requests release?  
**Options:** Buyer, Seller, Mutual  
**UI:** Release request buttons with confirmation

### DP3: Dispute Resolution
**Location:** Escalated escrow  
**Decision:** How to resolve dispute?  
**Options:** Full refund, Full release, Partial refund  
**UI:** Support decision interface

---

## Error States

### ES1: Escrow Not Available
**Trigger:** Escrow not available for transaction type  
**Location:** Checkout page  
**Message:** "Escrow is not available for this transaction type."  
**Recovery:** Use direct payment

### ES2: Release Conditions Not Met
**Trigger:** Release conditions not satisfied  
**Location:** Escrow details page  
**Message:** "Release conditions not yet met. Please complete inspection or wait for hold period."  
**Recovery**: Complete conditions or wait

---

## Success States

### SS1: Escrow Initiated
**Trigger:** Escrow payment processed  
**Location:** Wallet escrow page  
**Feedback:** Escrow appears in active list  
**Next Step**: Complete conditions for release

### SS2: Funds Released
**Trigger:** Escrow release processed  
**Location:** Escrow details page  
**Feedback:** Status updated to "Released"  
**Next Step**: Transaction complete

### SS3: Refund Processed
**Trigger:** Refund approved and processed  
**Location:** Escrow details page  
**Feedback:** Status updated to "Refunded"  
**Next Step**: Funds returned to wallet

---

# Flow Summary

## Flow Complexity Matrix

| Flow | Steps | Decision Points | Error States | Success States | Complexity |
|------|-------|-----------------|--------------|----------------|------------|
| 1. Property Discovery → Payment | 8 | 5 | 5 | 3 | High |
| 2. AI-Powered Search | 5 | 3 | 3 | 2 | Medium |
| 3. Property Comparison | 5 | 3 | 3 | 2 | Medium |
| 4. Inspection Management | 9 | 4 | 3 | 3 | High |
| 5. Wallet & Payments | 8 | 4 | 4 | 3 | High |
| 6. Communication | 7 | 3 | 3 | 3 | Medium |
| 7. Profile Management | 7 | 3 | 4 | 3 | Medium |
| 8. Saved Properties | 5 | 2 | 2 | 2 | Low |
| 9. Notification Management | 4 | 2 | 1 | 2 | Low |
| 10. Settings Management | 7 | 2 | 1 | 2 | Low |
| 11. Support Flow | 5 | 3 | 1 | 2 | Low |
| 12. Escrow Transaction | 6 | 3 | 2 | 3 | Medium |

## Critical Flows (MVP Priority)

1. **Flow 1: Property Discovery → Payment** (Core user journey)
2. **Flow 4: Inspection Management** (Key differentiator)
3. **Flow 5: Wallet & Payments** (Revenue critical)
4. **Flow 6: Communication** (User engagement)

## Secondary Flows (V2 Priority)

5. **Flow 2: AI-Powered Search** (AI feature)
6. **Flow 3: Property Comparison** (User convenience)
7. **Flow 7: Profile Management** (Account management)
8. **Flow 8: Saved Properties** (User retention)

## Tertiary Flows (V3+ Priority)

9. **Flow 9: Notification Management** (User experience)
10. **Flow 10: Settings Management** (User control)
11. **Flow 11: Support Flow** (Customer service)
12. **Flow 12: Escrow Transaction** (Advanced payment)

---

# Next Steps

**Phase 4:** Design System  
- Define typography scale  
- Establish color system  
- Create spacing system  
- Define grid system  
- Establish elevation/shadow system  

---

**End of Phase 3: User Flows**
