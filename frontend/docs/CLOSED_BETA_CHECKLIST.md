# Closed Beta Checklist

**Project:** CribSeekers
**Version:** 1.0.0 (Closed Beta)
**Date:** July 28, 2026
**Tester:** _______________

---

## Overview

This checklist is used to verify all major user journeys during closed beta testing. Each journey should be tested with the provided test accounts and results recorded.

---

## Test Accounts Reference

### Buyer Accounts
- buyer1.beta@cribseekers.com / BetaTest123!
- buyer2.beta@cribseekers.com / BetaTest123!
- buyer3.beta@cribseekers.com / BetaTest123!
- buyer4.beta@cribseekers.com / BetaTest123!
- buyer5.beta@cribseekers.com / BetaTest123!

### Tenant Accounts
- tenant1.beta@cribseekers.com / BetaTest123!
- tenant2.beta@cribseekers.com / BetaTest123!
- tenant3.beta@cribseekers.com / BetaTest123!

### Landlord Accounts
- landlord1.beta@cribseekers.com / BetaTest123!
- landlord2.beta@cribseekers.com / BetaTest123!
- landlord3.beta@cribseekers.com / BetaTest123!

### Agent Accounts
- agent1.beta@cribseekers.com / BetaTest123!
- agent2.beta@cribseekers.com / BetaTest123!
- agent3.beta@cribseekers.com / BetaTest123!
- agent4.beta@cribseekers.com / BetaTest123!

---

## Journey Checklists

### 1. Registration Journey

**Test Account:** New user registration
**Test Data:**
- Email: test.beta@cribseekers.com
- Password: BetaTest123!
- Name: Test User
- Phone: +234 800 000 0000

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 1.1 | Navigate to registration page | Registration form loads | | ☐ | |
| 1.2 | Enter valid email | Email accepted | | ☐ | |
| 1.3 | Enter valid password (8+ chars, mixed) | Password accepted | | ☐ | |
| 1.4 | Enter name and phone | Fields accepted | | ☐ | |
| 1.5 | Select user role | Role selected | | ☐ | |
| 1.6 | Submit registration | Account created | | ☐ | |
| 1.7 | Receive verification email | Email received | | ☐ | |
| 1.8 | Click verification link | Account verified | | ☐ | |
| 1.9 | Redirect to login | Redirected successfully | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 2. Login Journey

**Test Account:** buyer1.beta@cribseekers.com / BetaTest123!

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 2.1 | Navigate to login page | Login form loads | | ☐ | |
| 2.2 | Enter valid email | Email accepted | | ☐ | |
| 2.3 | Enter valid password | Password accepted | | ☐ | |
| 2.4 | Click login button | Authentication successful | | ☐ | |
| 2.5 | Redirect to dashboard | Redirected successfully | | ☐ | |
| 2.6 | Check session persistence | Session persists on refresh | | ☐ | |
| 2.7 | Test remember me | Session persists after close | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 3. Email Verification Journey

**Test Account:** New unverified account

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 3.1 | Register new account | Account created, unverified | | ☐ | |
| 3.2 | Receive verification email | Email received | | ☐ | |
| 3.3 | Click verification link | Link works | | ☐ | |
| 3.4 | Account verified | Status updated to verified | | ☐ | |
| 3.5 | Login with verified account | Login successful | | ☐ | |
| 3.6 | Request new verification email | New email sent | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 4. Profile Completion Journey

**Test Account:** buyer1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 4.1 | Navigate to profile page | Profile page loads | | ☐ | |
| 4.2 | Update profile picture | Image uploaded | | ☐ | |
| 4.3 | Update bio/description | Text saved | | ☐ | |
| 4.4 | Update phone number | Number saved | | ☐ | |
| 4.5 | Update address | Address saved | | ☐ | |
| 4.6 | Upload KYC documents | Documents uploaded | | ☐ | |
| 4.7 | Save changes | Changes persisted | | ☐ | |
| 4.8 | View updated profile | Updates reflected | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 5. Property Search Journey

**Test Account:** buyer1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 5.1 | Navigate to search page | Search page loads | | ☐ | |
| 5.2 | View all properties | Properties displayed | | ☐ | |
| 5.3 | Search by keyword | Results filtered | | ☐ | |
| 5.4 | Search by location | Results filtered | | ☐ | |
| 5.5 | Filter by price range | Results filtered | | ☐ | |
| 5.6 | Filter by property type | Results filtered | | ☐ | |
| 5.7 | Filter by bedrooms | Results filtered | | ☐ | |
| 5.8 | Sort by price | Results sorted | | ☐ | |
| 5.9 | Sort by date | Results sorted | | ☐ | |
| 5.10 | Save search | Search saved | | ☐ | |
| 5.11 | View saved searches | Saved searches displayed | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 6. Property Details Journey

**Test Account:** buyer1.beta@cribseekers.com
**Test Property:** PROP-LAG-001

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 6.1 | Click property from search | Property details page loads | | ☐ | |
| 6.2 | View property images | Images displayed | | ☐ | |
| 6.3 | View image gallery | Gallery works | | ☐ | |
| 6.4 | View property videos | Videos play | | ☐ | |
| 6.5 | View floor plans | Floor plans displayed | | ☐ | |
| 6.6 | View property location | Map displayed | | ☐ | |
| 6.7 | View property amenities | Amenities listed | | ☐ | |
| 6.8 | View property description | Description displayed | | ☐ | |
| 6.9 | View contact information | Contact info displayed | | ☐ | |
| 6.10 | Save property | Property saved | | ☐ | |
| 6.11 | View saved properties | Property in saved list | | ☐ | |
| 6.12 | Share property | Share options work | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 7. Property Creation Journey

**Test Account:** landlord1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 7.1 | Navigate to dashboard | Dashboard loads | | ☐ | |
| 7.2 | Click "Add Property" | Property form loads | | ☐ | |
| 7.3 | Enter property title | Title accepted | | ☐ | |
| 7.4 | Enter property description | Description accepted | | ☐ | |
| 7.5 | Select property type | Type selected | | ☐ | |
| 7.6 | Enter price | Price accepted | | ☐ | |
| 7.7 | Enter location | Location accepted | | ☐ | |
| 7.8 | Enter bedrooms/bathrooms | Numbers accepted | | ☐ | |
| 7.9 | Enter property size | Size accepted | | ☐ | |
| 7.10 | Upload property images | Images uploaded | | ☐ | |
| 7.11 | Upload floor plan | Floor plan uploaded | | ☐ | |
| 7.12 | Select amenities | Amenities selected | | ☐ | |
| 7.13 | Save as draft | Draft saved | | ☐ | |
| 7.14 | View draft in dashboard | Draft displayed | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 8. Property Publishing Journey

**Test Account:** landlord1.beta@cribseekers.com
**Test Property:** Draft property

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 8.1 | Navigate to draft property | Draft loads | | ☐ | |
| 8.2 | Review property details | Details displayed | | ☐ | |
| 8.3 | Edit if needed | Edits saved | | ☐ | |
| 8.4 | Click "Publish" | Publish confirmation shown | | ☐ | |
| 8.5 | Confirm publish | Property published | | ☐ | |
| 8.6 | View in published properties | Property listed | | ☐ | |
| 8.7 | Search for property | Property appears in search | | ☐ | |
| 8.8 | Unpublish property | Property unpublished | | ☐ | |
| 8.9 | Archive property |Property archived | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 9. Inspection Booking Journey

**Test Account:** buyer1.beta@cribseekers.com
**Test Property:** PROP-LAG-001

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 9.1 | Navigate to property details | Details page loads | | ☐ | |
| 9.2 | Click "Book Inspection" | Inspection form loads | | ☐ | |
| 9.3 | Select date | Date selected | | ☐ | |
| 9.4 | Select time slot | Time slot selected | | ☐ | |
| 9.5 | Select inspection type | Type selected | | ☐ | |
| 9.6 | Add notes | Notes accepted | | ☐ | |
| 9.7 | Submit booking | Booking confirmed | | ☐ | |
| 9.8 | View in dashboard | Inspection listed | | ☐ | |
| 9.9 | Receive confirmation | Confirmation received | | ☐ | |
| 9.10 | Reschedule inspection | Rescheduled | | ☐ | |
| 9.11 | Cancel inspection | Cancelled | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 10. Wallet Funding Journey

**Test Account:** buyer1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 10.1 | Navigate to wallet | Wallet page loads | | ☐ | |
| 10.2 | View current balance | Balance displayed | | ☐ | |
| 10.3 | Click "Fund Wallet" | Funding form loads | | ☐ | |
| 10.4 | Enter amount | Amount accepted | | ☐ | |
| 10.5 | Select payment method | Method selected | | ☐ | |
| 10.6 | Add bank account | Account added | | ☐ | |
| 10.7 | Verify bank account | Verified | | ☐ | |
| 10.8 | Initiate funding | Payment initiated | | ☐ | |
| 10.9 | Complete payment | Payment successful | | ☐ | |
| 10.10 | View updated balance | Balance updated | | ☐ | |
| 10.11 | View transaction history | History displayed | | ☐ | |
| 10.12 | Request withdrawal | Withdrawal initiated | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 11. Escrow Journey

**Test Account:** buyer1.beta@cribseekers.com
**Test Property:** PROP-LAG-001

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 11.1 | Navigate to property details | Details page loads | | ☐ | |
| 11.2 | Click "Create Escrow" | Escrow form loads | | ☐ | |
| 11.3 | Select property | Property selected | | ☐ | |
| 11.4 | Enter amount | Amount accepted | | ☐ | |
| 11.5 | Add description | Description accepted | | ☐ | |
| 11.6 | Review escrow details | Details displayed | | ☐ | |
| 11.7 | Confirm escrow | Escrow created | | ☐ | |
| 11.8 | Fund escrow from wallet | Funds transferred | | ☐ | |
| 11.9 | View escrow in dashboard | Escrow listed | | ☐ | |
| 11.10 | View escrow status | Status displayed | | ☐ | |
| 11.11 | Request refund | Refund initiated | | ☐ | |
| 11.12 | Release funds | Funds released | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 12. Messaging Journey

**Test Account:** buyer1.beta@cribseekers.com
**Recipient:** agent1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 12.1 | Navigate to messages | Messages page loads | | ☐ | |
| 12.2 | View conversation list | Conversations displayed | | ☐ | |
| 12.3 | Start new conversation | New conversation created | | ☐ | |
| 12.4 | Select recipient | Recipient selected | | ☐ | |
| 12.5 | Send text message | Message sent | | ☐ | |
| 12.6 | View message in conversation | Message displayed | | ☐ | |
| 12.7 | Receive message | Message received | | ☐ | |
| 12.8 | View typing indicator | Indicator shown | | ☐ | |
| 12.9 | Send image | Image sent | | ☐ | |
| 12.10 | Send file | File sent | | ☐ | |
| 12.11 | Search conversations | Results filtered | | ☐ | |
| 12.12 | Archive conversation | Conversation archived | | ☐ | |
| 12.13 | Delete conversation | Conversation deleted | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 13. Dashboard Journey

**Test Account:** buyer1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 13.1 | Navigate to dashboard | Dashboard loads | | ☐ | |
| 13.2 | View user stats | Stats displayed | | ☐ | |
| 13.3 | View recent activity | Activity displayed | | ☐ | |
| 13.4 | View notifications | Notifications displayed | | ☐ | |
| 13.5 | Click notification | Notification opened | | ☐ | |
| 13.6 | Mark as read | Status updated | | ☐ | |
| 13.7 | View recommendations | Recommendations displayed | | ☐ | |
| 13.8 | Click quick action | Action executed | | ☐ | |
| 13.9 | Navigate to properties | Properties page loads | | ☐ | |
| 13.10 | Navigate to inspections | Inspections page loads | | ☐ | |
| 13.11 | Navigate to wallet | Wallet page loads | | ☐ | |
| 13.12 | Navigate to messages | Messages page loads | | ☐ | |
| 13.13 | Navigate to profile | Profile page loads | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

### 14. Logout Journey

**Test Account:** buyer1.beta@cribseekers.com

| Step | Description | Expected Result | Actual Result | Status | Notes |
|------|-------------|-----------------|---------------|--------|-------|
| 14.1 | Click logout button | Logout confirmation shown | | ☐ | |
| 14.2 | Confirm logout | Logged out | | ☐ | |
| 14.3 | Redirect to home | Redirected successfully | | ☐ | |
| 14.4 | Try to access protected route | Redirected to login | | ☐ | |
| 14.5 | Check localStorage cleared | Tokens cleared | | ☐ | |
| 14.6 | Login again | Login successful | | ☐ | |

**Overall Status:** ☐ PASS ☐ FAIL

---

## Summary Results

### Journey Results

| Journey | Status | Pass Rate | Issues |
|---------|--------|----------|--------|
| Registration | ☐ PASS ☐ FAIL | __/9 | |
| Login | ☐ PASS ☐ FAIL | __/7 | |
| Email Verification | ☐ PASS ☐ FAIL | __/6 | |
| Profile Completion | ☐ PASS ☐ FAIL | __/8 | |
| Property Search | ☐ PASS ☐ FAIL | __/11 | |
| Property Details | ☐ PASS ☐ FAIL | __/12 | |
| Property Creation | ☐ PASS ☐ FAIL | __/14 | |
| Property Publishing | ☐ PASS ☐ FAIL | __/9 | |
| Inspection Booking | ☐ PASS ☐ FAIL | __/11 | |
| Wallet Funding | ☐ PASS ☐ FAIL | __/12 | |
| Escrow | ☐ PASS ☐ FAIL | __/12 | |
| Messaging | ☐ PASS ☐ FAIL | __/13 | |
| Dashboard | ☐ PASS ☐ FAIL | __/13 | |
| Logout | ☐ PASS ☐ FAIL | __/6 | |

### Overall Statistics

- **Total Journeys:** 14
- **Journeys Passed:** __
- **Journeys Failed:** __
- **Total Steps:** 133
- **Steps Passed:** __
- **Steps Failed:** __
- **Overall Pass Rate:** __%

### Critical Issues

| Issue ID | Journey | Step | Description | Severity |
|----------|---------|------|-------------|----------|
| | | | | |

### Recommendations

1. __________________________________________________________________
2. __________________________________________________________________
3. __________________________________________________________________

---

## Tester Information

**Tester Name:** _______________
**Date:** _______________
**Browser:** _______________
**Device:** _______________
**OS:** _______________

---

## Sign-Off

**Tester Signature:** _______________

**QA Review:** _______________

**Approved for Beta:** ☐ YES ☐ NO

**Date:** _______________

---

**End of Closed Beta Checklist**
