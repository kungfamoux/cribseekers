# CribSeekers Design System
## Phase 7: High Fidelity UI

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document applies the design system to the wireframes, defining the high-fidelity visual design for all key pages. It specifies exact colors, typography, spacing, shadows, and visual hierarchy for each component and layout.

**Design Principles Applied:**
- Forest green primary palette (#0d2f27)
- Gold accent palette (#e8a553)
- DM Sans body, Playfair Display headings
- 8pt spacing grid
- Soft shadows and rounded corners
- Premium, elegant aesthetic

---

# Visual Design Specifications

## 1. Landing Page (/)

### Hero Section

**Layout:**
- Background: Linear gradient from `#f9f7f0` (55%) to `#e7eee1` (45%)
- Container: Max width 1440px, centered
- Grid: 2-column (1fr 1.06fr)
- Padding: 76px top, 48px bottom

**Typography:**
- Headline: Playfair Display, 64px, weight 600, letter-spacing -2.5px, line-height 1.1
  - Color: `#173b33`
  - "Find a place that" in regular weight
  - "feels like you" in italic, weight 500
- Subhead: DM Sans, 18px, weight 400, line-height 1.6
  - Color: `#4a4a4a`
- Eyebrow: DM Sans, 10px, weight 700, uppercase, letter-spacing 1.25px
  - Color: `#6b805e`
  - Icon: Sparkles, 15px

**Hero Image:**
- Size: 1500px width, auto height
- Border-radius: 12px top-right, 12px bottom-left
- Shadow: `0 15px 45px rgba(25,58,49,0.10)`
- Object-fit: cover

**Float Cards:**
- Background: White
- Border-radius: 18px
- Shadow: `0 15px 45px rgba(25,58,49,0.10)`
- Padding: 20px
- Icon: Circle, 20px, `#0d2f27`
- Text: DM Sans, 14px for small, 16px for strong
- Position: Absolute over hero image

**CTA Button:**
- Background: `#0d2f27`
- Text: White, DM Sans, 16px, weight 600
- Padding: 12px 24px
- Border-radius: 10px
- Shadow: `0 4px 6px rgba(13,47,39,0.10)`
- Hover: Background `#173b33`, shadow `0 10px 15px rgba(13,47,39,0.10)`

**Social Proof:**
- Avatars: 4 circular avatars, 32px each, stacked -8px
- Text: DM Sans, 16px, weight 500 for number, 400 for label
- Color: `#173b33`

---

### Search Panel

**Background:** `#fffefa`
**Border:** 1px solid `#e4e6de`
**Border-radius:** 18px
**Padding:** 24px
**Shadow:** `0 4px 6px rgba(13,47,39,0.05)`

**Search Fields:**
- Grid: 4 columns (1fr 1fr 1fr 120px)
- Gap: 16px
- Height: 56px
- Background: White
- Border: 1px solid `#e4e6de`
- Border-radius: 12px
- Padding: 16px
- Icon: 20px, `#6e7c76`
- Label: DM Sans, 10px, weight 500, uppercase, letter-spacing 0.5px
  - Color: `#6e7c76`
- Button: DM Sans, 14px, weight 500
  - Color: `#4a4a4a`
  - Chevron: 15px

**Search Button:**
- Background: `#0d2f27`
- Text: White, DM Sans, 16px, weight 600
- Icon: Search, 19px
- Padding: 16px 24px
- Border-radius: 10px

**Filter Button:**
- Background: `#f8f7f2`
- Icon: SlidersHorizontal, 20px
- Padding: 16px
- Border-radius: 10px

---

### Trust Strip

**Layout:**
- Grid: 4 columns
- Gap: 32px
- Padding: 48px 0
- Background: `#fffefa`

**Trust Items:**
- Icon: 24px, `#0d2f27`
- Text: DM Sans, 14px weight 500 for strong, 400 for span
- Color: `#173b33`
- Flex layout: Icon + text, gap 12px

---

### Featured Properties Section

**Section Header:**
- Eyebrow: DM Sans, 10px, weight 700, uppercase, letter-spacing 1.25px
  - Color: `#6b805e`
- Heading: Playfair Display, 40px, weight 600, letter-spacing -1.5px
  - Color: `#173b33`
- Link: DM Sans, 16px, weight 500
  - Color: `#0d2f27`
  - Icon: ArrowRight, 16px

**Property Grid:**
- Grid: 4 columns
- Gap: 24px
- Padding: 32px 0

**Property Card:**
- Background: White
- Border-radius: 18px
- Shadow: `0 4px 6px rgba(13,47,39,0.05)`
- Overflow: hidden
- Hover: Shadow `0 10px 15px rgba(13,47,39,0.10)`

**Property Image:**
- Height: 200px
- Object-fit: cover
- Position: relative

**Tag:**
- Position: Absolute, top 12px, left 12px
- Background: `rgba(255,255,255,0.9)`
- Padding: 4px 12px
- Border-radius: 20px
- Font: DM Sans, 11px, weight 500
- Icon: ShieldCheck, 13px
- Color: `#0d2f27` for verified, `#e8a553` for new

**Heart Button:**
- Position: Absolute, top 12px, right 12px
- Background: White
- Border-radius: 50%
- Size: 36px
- Icon: Heart, 18px
- Color: `#6e7c76`
- Saved: Color `#0d2f27`, fill current

**Property Content:**
- Padding: 16px

**Location:**
- Icon: MapPin, 14px, `#6e7c76`
- Text: DM Sans, 14px, weight 400
- Color: `#4a4a4a`

**Title:**
- Font: DM Sans, 18px, weight 600
- Color: `#173b33`
- Margin: 8px 0

**Details:**
- Flex row, gap 16px
- Icon: BedDouble, Bath, 16px, `#6e7c76`
- Text: DM Sans, 14px, weight 400
- Color: `#4a4a4a`

**Footer:**
- Flex row, justify-between, align-center
- Margin-top: 12px

**Price:**
- Font: DM Sans, 20px, weight 600
- Color: `#173b33`
- Small: DM Sans, 12px, weight 400
- Color: `#6e7c76`

**Arrow Button:**
- Background: `#0d2f27`
- Border-radius: 50%
- Size: 40px
- Icon: ArrowRight, 17px, white

---

### AI Section

**Background:** Linear gradient from `#f9f7f0` to `#e7eee1`
**Border-radius:** 24px
**Padding:** 64px
**Position:** Relative

**AI Shapes:**
- Background: `#dce8d4`
- Border-radius: 50%
- Position: absolute
- Opacity: 0.5

**AI Content:**
- Eyebrow: DM Sans, 10px, weight 700, uppercase, letter-spacing 1.25px
  - Color: `#6b805e`
- Heading: Playfair Display, 48px, weight 600, letter-spacing -2px
  - Color: `#173b33`
- Description: DM Sans, 18px, weight 400, line-height 1.6
  - Color: `#4a4a4a`

**AI Button:**
- Background: Transparent
- Border: 1px solid `#0d2f27`
- Text: `#0d2f27`, DM Sans, 16px, weight 600
- Padding: 12px 24px
- Border-radius: 10px

**AI Card:**
- Background: White
- Border-radius: 18px
- Shadow: `0 15px 45px rgba(25,58,49,0.10)`
- Padding: 24px
- Position: Absolute, right 48px, top 48px
- Width: 320px

**AI Card Top:**
- Flex row, align-center, gap 8px
- Background: `#f8f7f2`
- Padding: 8px 16px
- Border-radius: 20px
- Icon: Sparkles, 18px, `#0d2f27`
- Text: DM Sans, 14px, weight 600
- Color: `#173b33`

**AI Quote:**
- Font: DM Sans, 16px, weight 400, italic
- Color: `#4a4a4a`
- Line-height: 1.6

**AI Result:**
- Flex row, gap 12px
- Margin-top: 16px
- Background: `#f8f7f2`
- Padding: 12px
- Border-radius: 12px

**AI Result Image:**
- Width: 60px, height: 60px
- Border-radius: 8px
- Object-fit: cover

**AI Result Text:**
- Strong: DM Sans, 14px, weight 600
- Color: `#173b33`
- Span: DM Sans, 12px, weight 400
- Color: `#6e7c76`

**Check Icon:**
- CircleCheck, 18px, `#0d2f27`

---

### How It Works Section

**Section Header:**
- Centered
- Eyebrow: DM Sans, 10px, weight 700, uppercase, letter-spacing 1.25px
  - Color: `#6b805e`
- Heading: Playfair Display, 40px, weight 600, letter-spacing -1.5px
  - Color: `#173b33`
- Description: DM Sans, 18px, weight 400
  - Color: `#4a4a4a`

**Steps Grid:**
- Grid: 3 columns
- Gap: 48px
- Padding: 48px 0

**Step Card:**
- Text-align: center
- Padding-left: 75px
- Position: relative

**Step Number:**
- Position: absolute, left 0, top 0
- Font: DM Sans, 48px, weight 600
- Color: `#dce8d4`
- Line-height: 1

**Step Icon:**
- Position: absolute, left 12px, top 8px
- Size: 24px
- Color: `#0d2f27`

**Step Title:**
- Font: DM Sans, 20px, weight 600
- Color: `#173b33`
- Margin-bottom: 8px

**Step Description:**
- Font: DM Sans, 16px, weight 400
- Color: `#4a4a4a`
- Line-height: 1.6

---

### Footer

**Background:** `#fffefa`
**Border-top:** 1px solid `#e4e6de`
**Padding:** 64px 0

**Footer Top:**
- Flex row, justify-between, align-center
- Margin-bottom: 48px

**Brand:**
- Font: DM Sans, 21px, weight 700
- Letter-spacing: -1.3px
- Color: `#0d2f27`

**Join Button:**
- Background: `#0d2f27`
- Text: White, DM Sans, 16px, weight 600
- Icon: ArrowRight, 16px
- Padding: 12px 24px
- Border-radius: 10px

**Footer Links:**
- Grid: 4 columns
- Gap: 48px

**Link Column:**
- Strong: DM Sans, 14px, weight 600
  - Color: `#173b33`
  - Margin-bottom: 16px
- Links: DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
  - Margin-bottom: 12px
  - Hover: Color `#0d2f27`

**Newsletter:**
- Strong: DM Sans, 14px, weight 600
  - Color: `#173b33`
  - Margin-bottom: 8px
- Text: DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
  - Margin-bottom: 16px
- Input: Background white, border 1px solid `#e4e6de`
  - Padding: 12px 16px
  - Border-radius: 8px
  - Width: 100%
- Button: Background `#0d2f27`, white, ArrowRight icon

**Footer Bottom:**
- Flex row, justify-between
- Padding-top: 32px
- Border-top: 1px solid `#e4e6de`

**Copyright:**
- DM Sans, 14px, weight 400
- Color: `#6e7c76`

**Nigeria Dot:**
- Width: 8px, height: 8px
- Background: `#0d2f27`
- Border-radius: 50%

---

## 2. Authentication Pages

### Login Page

**Container:**
- Max width: 480px
- Centered
- Padding: 64px 24px

**Header:**
- Flex row, justify-between
- Margin-bottom: 48px

**Logo:**
- Font: DM Sans, 21px, weight 700
- Color: `#0d2f27`

**Sign Up Link:**
- DM Sans, 14px, weight 500
- Color: `#0d2f27`

**Form Card:**
- Background: White
- Border-radius: 24px
- Padding: 48px
- Shadow: `0 15px 45px rgba(25,58,49,0.10)`

**Welcome Text:**
- Font: Playfair Display, 32px, weight 600
- Color: `#173b33`
- Text-align: center
- Margin-bottom: 8px

**Subhead:**
- DM Sans, 16px, weight 400
- Color: `#4a4a4a`
- Text-align: center
- Margin-bottom: 32px

**Input Fields:**
- Label: DM Sans, 12px, weight 500
  - Color: `#6e7c76`
  - Margin-bottom: 8px
- Input: Background white, border 1px solid `#e4e6de`
  - Padding: 12px 16px
  - Border-radius: 8px
  - Height: 48px
  - Font: DM Sans, 16px
  - Focus: Border `#0d2f27`, ring `#dce8d4`
- Forgot Password: DM Sans, 12px, weight 500
  - Color: `#0d2f27`
  - Text-align: right
  - Margin-top: 8px

**Submit Button:**
- Background: `#0d2f27`
- Text: White, DM Sans, 16px, weight 600
- Padding: 12px 24px
- Border-radius: 10px
- Width: 100%
- Height: 48px
- Margin-top: 24px

**Divider:**
- Flex row, align-center, gap 16px
- Margin: 32px 0
- Line: 1px solid `#e4e6de`, flex 1
- Text: DM Sans, 12px, weight 400
  - Color: `#6e7c76`

**Social Buttons:**
- Grid: 3 columns
- Gap: 16px
- Margin-top: 24px

**Social Button:**
- Background: White
- Border: 1px solid `#e4e6de`
- Border-radius: 8px
- Height: 48px
- Flex center
- Icon: 24px
- Hover: Background `#f8f7f2`

---

## 3. Dashboard Pages

### Dashboard Navigation

**Top Bar:**
- Height: 80px
- Background: `rgba(255,254,250,0.9)`
- Backdrop-filter: blur(14px)
- Border-bottom: 1px solid `#e4e6de`
- Padding: 0 80px
- Flex row, justify-between, align-center

**Logo:**
- Font: DM Sans, 21px, weight 700
- Color: `#0d2f27`
- Letter-spacing: -1.3px

**Nav Links:**
- DM Sans, 14px, weight 500
- Color: `#3e5550`
- Gap: 33px
- Hover: Color `#0d2f27`

**Nav Actions:**
- Flex row, gap: 20px

**Search Icon:**
- Icon: Search, 19px, `#0d2f27`
- Background: `#f8f7f2`
- Border-radius: 8px
- Padding: 10px

**Login Link:**
- DM Sans, 14px, weight 500
- Color: `#3e5550`

**Join Button:**
- Background: `#0d2f27`
- Text: White, DM Sans, 13px, weight 600
- Padding: 12px 17px
- Border-radius: 10px

---

### Home Dashboard

**Welcome Section:**
- Padding: 48px 80px 32px

**Welcome Text:**
- Font: Playfair Display, 40px, weight 600
- Color: `#173b33`
- Letter-spacing -1.5px

**Quick Actions:**
- Grid: 4 columns
- Gap: 24px
- Margin: 32px 0

**Action Card:**
- Background: White
- Border-radius: 18px
- Padding: 24px
- Shadow: `0 4px 6px rgba(13,47,39,0.05)`
- Hover: Shadow `0 10px 15px rgba(13,47,39,0.10)`

**Action Icon:**
- Background: `#f8f7f2`
- Border-radius: 12px
- Size: 48px
- Flex center
- Icon: 24px, `#0d2f27`
- Margin-bottom: 16px

**Action Title:**
- DM Sans, 16px, weight 600
- Color: `#173b33`
- Margin-bottom: 4px

**Action Subtitle:**
- DM Sans, 14px, weight 400
- Color: `#6e7c76`

**AI Recommendations:**
- Section header with Refresh link
- Property grid: 4 columns, gap 24px

**AI Property Card:**
- Same as featured property card
- Plus: Match badge
  - Background: `#e8a553`
  - Text: White, DM Sans, 12px, weight 600
  - Padding: 4px 12px
  - Border-radius: 20px

**Recent Activity:**
- List layout
- Item: DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
- Timestamp: DM Sans, 12px, weight 400
  - Color: `#6e7c76`

---

### Property Search

**Search Bar:**
- Background: White
- Border: 1px solid `#e4e6de`
- Border-radius: 12px
- Padding: 16px 24px
- Flex row, align-center
- Gap: 16px
- Shadow: `0 4px 6px rgba(13,47,39,0.05)`

**Search Input:**
- Flex 1
- Border: none
- Font: DM Sans, 16px
- Placeholder: `#6e7c76`

**Advanced Link:**
- DM Sans, 14px, weight 500
  - Color: `#0d2f27`

**Filter Sidebar:**
- Width: 280px
- Background: White
- Border-right: 1px solid `#e4e6de`
- Padding: 24px

**Filter Section:**
- Margin-bottom: 24px

**Filter Header:**
- DM Sans, 14px, weight 600
  - Color: `#173b33`
  - Margin-bottom: 12px

**Checkbox:**
- DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
  - Gap: 8px
  - Margin-bottom: 8px

**Slider:**
- Background: `#e4e6de`
  - Height: 4px
  - Border-radius: 2px
- Thumb: `#0d2f27`
  - Size: 16px

**Apply Button:**
- Background: `#0d2f27`
  - Text: White, DM Sans, 14px, weight 600
  - Padding: 12px 24px
  - Border-radius: 8px
  - Width: 100%

**Reset Button:**
- Background: Transparent
  - Text: `#6e7c76`, DM Sans, 14px, weight 500
  - Padding: 12px 24px
  - Border-radius: 8px
  - Width: 100%
  - Margin-top: 8px

---

### Property Details

**Gallery:**
- Height: 400px
- Background: `#f8f7f2`
- Border-radius: 18px
- Overflow: hidden
- Position: relative

**Main Image:**
- Width: 100%, height: 100%
- Object-fit: cover

**Thumbnails:**
- Position: absolute, bottom 16px, left 50%
- Transform: translateX(-50%)
- Flex row, gap: 8px

**Thumbnail:**
- Width: 80px, height: 60px
- Border-radius: 8px
- Object-fit: cover
- Border: 2px solid white
  - Active: `#0d2f27`

**Property Info:**
- Padding: 24px
- Background: White
  - Border-radius: 18px
  - Shadow: `0 4px 6px rgba(13,47,39,0.05)`

**Price:**
- Font: DM Sans, 32px, weight 600
  - Color: `#173b33`

**Verified Badge:**
- Background: `#dce8d4`
  - Text: `#0d2f27`, DM Sans, 12px, weight 600
  - Padding: 4px 12px
  - Border-radius: 20px
  - Icon: ShieldCheck, 13px

**Location:**
- DM Sans, 16px, weight 400
  - Color: `#4a4a4a`
  - Icon: MapPin, 16px, `#6e7c76`

**Specs Grid:**
- Grid: 4 columns
  - Gap: 16px
  - Margin: 16px 0

**Spec Item:**
- Icon: 20px, `#6e7c76`
- Text: DM Sans, 14px, weight 400
  - Color: `#4a4a4a`

**Agent Info:**
- Flex row, align-center, gap: 12px
  - Margin: 24px 0
  - Padding-top: 24px
  - Border-top: 1px solid `#e4e6de`

**Agent Avatar:**
- Width: 48px, height: 48px
  - Border-radius: 50%

**Agent Name:**
- DM Sans, 16px, weight 600
  - Color: `#173b33`

**Agent Role:**
- DM Sans, 14px, weight 400
  - Color: `#6e7c76`

**Agent Rating:**
- DM Sans, 14px, weight 500
  - Color: `#e8a553`

**Action Buttons:**
- Flex row, gap: 12px
  - Margin-top: 16px

**Contact Button:**
- Background: `#f8f7f2`
  - Text: `#0d2f27`, DM Sans, 14px, weight 600
  - Padding: 12px 24px
  - Border-radius: 8px
  - Flex 1

**Book Button:**
- Background: `#0d2f27`
  - Text: White, DM Sans, 14px, weight 600
  - Padding: 12px 24px
  - Border-radius: 8px
  - Flex 1

**Tabs:**
- Flex row, gap: 32px
  - Border-bottom: 1px solid `#e4e6de`
  - Padding: 16px 0

**Tab:**
- DM Sans, 14px, weight 500
  - Color: `#6e7c76`
  - Padding-bottom: 16px
  - Border-bottom: 2px solid transparent
  - Active: Color `#0d2f27`, border `#0d2f27`

---

### Book Inspection

**Property Summary:**
- Background: White
  - Border-radius: 18px
  - Padding: 24px
  - Shadow: `0 4px 6px rgba(13,47,39,0.05)`
  - Flex row, gap: 16px
  - Margin-bottom: 32px

**Property Image:**
- Width: 120px, height: 90px
  - Border-radius: 12px
  - Object-fit: cover

**Property Info:**
- Title: DM Sans, 18px, weight 600
  - Color: `#173b33`
- Location: DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
- Price: DM Sans, 16px, weight 600
  - Color: `#173b33`

**Calendar Widget:**
- Background: White
  - Border: 1px solid `#e4e6de`
  - Border-radius: 18px
  - Padding: 24px
  - Margin-bottom: 32px

**Calendar Header:**
- DM Sans, 18px, weight 600
  - Color: `#173b33`
  - Text-align: center
  - Margin-bottom: 16px

**Calendar Grid:**
- Grid: 7 columns
  - Gap: 8px

**Calendar Day:**
- DM Sans, 14px, weight 400
  - Color: `#4a4a4a`
  - Width: 40px, height: 40px
  - Flex center
  - Border-radius: 8px
  - Hover: Background `#f8f7f2`
  - Selected: Background `#0d2f27`, color white
  - Disabled: Color `#9a9a9a`

**Time Slots:**
- Grid: 4 columns
  - Gap: 12px
  - Margin-bottom: 32px

**Time Slot:**
- Background: White
  - Border: 1px solid `#e4e6de`
  - Border-radius: 8px
  - Padding: 12px
  - Text-align: center
  - DM Sans, 14px, weight 500
  - Color: `#4a4a4a`
  - Hover: Border `#0d2f27`, color `#0d2f27`
  - Selected: Background `#0d2f27`, color white

**Notes Field:**
- Label: DM Sans, 14px, weight 500
  - Color: `#6e7c76`
  - Margin-bottom: 8px
- Textarea: Background white, border 1px solid `#e4e6de`
  - Padding: 12px 16px
  - Border-radius: 8px
  - Height: 120px
  - Font: DM Sans, 16px
  - Resize: none

**Fee Display:**
- Flex row, justify-between
  - Margin: 32px 0
  - Padding: 16px 0
  - Border-top: 1px solid `#e4e6de`

**Fee Label:**
- DM Sans, 16px, weight 500
  - Color: `#4a4a4a`

**Fee Amount:**
- DM Sans, 20px, weight 600
  - Color: `#173b33`

**Confirm Button:**
- Background: `#0d2f27`
  - Text: White, DM Sans, 16px, weight 600
  - Padding: 16px 32px
  - Border-radius: 10px
  - Width: 100%

---

### Messages

**Conversation List:**
- Width: 320px
  - Background: White
  - Border-right: 1px solid `#e4e6de`

**Search Input:**
- Background: `#f8f7f2`
  - Border: none
  - Padding: 12px 16px
  - Border-radius: 8px
  - Margin: 16px

**Filter Tabs:**
- Flex row, gap: 16px
  - Padding: 0 16px 16px

**Filter Tab:**
- DM Sans, 14px, weight 500
  - Color: `#6e7c76`
  - Active: Color `#0d2f27`

**Conversation Item:**
- Padding: 16px
  - Border-bottom: 1px solid `#e4e6de`
  - Hover: Background `#f8f7f2`
  - Cursor: pointer

**Conversation Header:**
- Flex row, gap: 8px
  - Margin-bottom: 4px

**Avatars:**
- Stacked, -8px
  - Width: 32px, height: 32px
  - Border-radius: 50%
  - Border: 2px solid white

**Conversation Name:**
- DM Sans, 14px, weight 600
  - Color: `#173b33`

**Conversation Preview:**
- DM Sans, 12px, weight 400
  - Color: `#6e7c76`
  - Truncate: 1 line

**Conversation Time:**
- DM Sans, 11px, weight 400
  - Color: `#9a9a9a`

**Chat Window:**
- Flex 1
  - Background: `#f8f7f2`
  - Display: flex
  - Flex-direction: column

**Chat Header:**
- Background: White
  - Padding: 16px 24px
  - Border-bottom: 1px solid `#e4e6de`

**Chat Header Info:**
- Flex row, align-center, gap: 12px

**Chat Avatar:**
- Width: 40px, height: 40px
  - Border-radius: 50%

**Chat Name:**
- DM Sans, 16px, weight 600
  - Color: `#173b33`

**Chat Status:**
- DM Sans, 12px, weight 400
  - Color: `#6e7c76`

**Property Link:**
- DM Sans, 12px, weight 500
  - Color: `#0d2f27`
  - Margin-top: 4px

**Messages List:**
- Flex 1
  - Padding: 24px
  - Overflow-y: auto

**Message Bubble:**
- Max-width: 70%
  - Padding: 12px 16px
  - Border-radius: 18px
  - Margin-bottom: 16px

**Sent Message:**
- Background: `#0d2f27`
  - Color: white
  - Margin-left: auto

**Received Message:**
- Background: white
  - Color: `#173b33`
  - Shadow: `0 2px 4px rgba(13,47,39,0.05)`

**Message Text:**
- DM Sans, 14px, weight 400
  - Line-height: 1.5

**Message Time:**
- DM Sans, 11px, weight 400
  - Color: `#6e7c76`
  - Margin-top: 4px

**Input Area:**
- Background: white
  - Padding: 16px 24px
  - Border-top: 1px solid `#e4e6de`

**Input Field:**
- Background: `#f8f7f2`
  - Border: none
  - Padding: 12px 16px
  - Border-radius: 24px
  - Flex 1
  - Font: DM Sans, 16px

**Input Actions:**
- Flex row, gap: 12px
  - Margin-left: 12px

**Input Icon:**
- Size: 20px
  - Color: `#6e7c76`
  - Cursor: pointer

**Send Button:**
- Background: `#0d2f27`
  - Color: white
  - Size: 40px
  - Border-radius: 50%
  - Flex center

---

### Wallet

**Balance Card:**
- Background: `#0d2f27`
  - Border-radius: 24px
  - Padding: 48px
  - Margin-bottom: 32px

**Balance Label:**
- DM Sans, 16px, weight 500
  - Color: `#dce8d4`

**Balance Amount:**
- Font: DM Sans, 56px, weight 600
  - Color: white
  - Letter-spacing -2px

**Quick Actions:**
- Grid: 4 columns
  - Gap: 16px
  - Margin-bottom: 32px

**Action Card:**
- Background: white
  - Border: 1px solid `#e4e6de`
  - Border-radius: 18px
  - Padding: 24px
  - Text-align: center
  - Hover: Border `#0d2f27`

**Action Icon:**
- Background: `#f8f7f2`
  - Border-radius: 12px
  - Size: 48px
  - Flex center
  - Icon: 24px, `#0d2f27`
  - Margin: 0 auto 16px

**Action Title:**
- DM Sans, 14px, weight 600
  - Color: `#173b33`

**Transaction Item:**
- Flex row, justify-between, align-center
  - Padding: 16px 0
  - Border-bottom: 1px solid `#e4e6de`

**Transaction Icon:**
- Background: `#f8f7f2`
  - Border-radius: 12px
  - Size: 40px
  - Flex center
  - Icon: 20px, `#0d2f27`

**Transaction Details:**
- Title: DM Sans, 14px, weight 600
    - Color: `#173b33`
  - Time: DM Sans, 12px, weight 400
    - Color: `#6e7c76`

**Transaction Amount:**
- DM Sans, 16px, weight 600
  - Positive: `#10b981`
  - Negative: `#173b33`

**Card Item:**
- Background: white
  - Border: 1px solid `#e4e6de`
  - Border-radius: 12px
  - Padding: 16px
  - Flex row, justify-between, align-center
  - Margin-bottom: 12px

**Card Brand:**
- DM Sans, 14px, weight 600
  - Color: `#173b33`

**Card Number:**
- DM Sans, 16px, weight 400
  - Color: `#4a4a4a`

**Default Badge:**
- Background: `#dce8d4`
  - Text: `#0d2f27`, DM Sans, 11px, weight 600
  - Padding: 4px 8px
  - Border-radius: 12px

---

### Profile

**Profile Header:**
- Background: white
  - Border-radius: 24px
  - Padding: 48px
  - Shadow: `0 4px 6px rgba(13,47,39,0.05)`
  - Text-align: center
  - Margin-bottom: 32px

**Profile Avatar:**
- Width: 120px, height: 120px
  - Border-radius: 50%
  - Border: 4px solid `#dce8d4`
  - Margin-bottom: 16px

**Profile Name:**
- Font: Playfair Display, 32px, weight 600
  - Color: `#173b33`
  - Margin-bottom: 4px

**Profile Email:**
- DM Sans, 16px, weight 400
  - Color: `#6e7c76`
  - Margin-bottom: 16px

**Verified Badge:**
- Background: `#dce8d4`
  - Text: `#0d2f27`, DM Sans, 12px, weight 600
  - Padding: 4px 12px
  - Border-radius: 20px
  - Icon: ShieldCheck, 13px

**Edit Button:**
- Background: `#0d2f27`
  - Text: White, DM Sans, 14px, weight 600
  - Padding: 12px 24px
  - Border-radius: 8px

**Statistics Grid:**
- Grid: 4 columns
  - Gap: 16px
  - Margin-bottom: 32px

**Stat Card:**
- Background: white
  - Border: 1px solid `#e4e6de`
  - Border-radius: 18px
  - Padding: 24px
  - Text-align: center

**Stat Number:**
- Font: DM Sans, 32px, weight 600
  - Color: `#0d2f27`

**Stat Label:**
- DM Sans, 14px, weight 400
  - Color: `#6e7c76`
  - Margin-top: 4px

**Settings Links:**
- Grid: 2 columns
  - Gap: 16px

**Settings Card:**
- Background: white
  - Border: 1px solid `#e4e6de`
  - Border-radius: 18px
  - Padding: 24px
  - Flex row, align-center, gap: 16px
  - Hover: Border `#0d2f27`

**Settings Icon:**
- Background: `#f8f7f2`
  - Border-radius: 12px
  - Size: 40px
  - Flex center
  - Icon: 20px, `#0d2f27`

**Settings Title:**
- DM Sans, 16px, weight 600
  - Color: `#173b33`

---

# Color Application Summary

## Primary Colors Usage

- **Brand Primary (`#0d2f27`):** Buttons, links, headings, icons, accents
- **Brand Secondary (`#173b33`):** Text, headings, borders
- **Brand Accent (`#284b43`):** Hover states, active states
- **Brand Light (`#4a7a6f`):** Links, secondary accents
- **Brand Pale (`#dce8d4`):** Backgrounds, badges, highlights
- **Brand Very Pale (`#e8f2e8`):** Subtle backgrounds

## Accent Colors Usage

- **Gold Primary (`#e8a553`):** CTAs, highlights, ratings, badges
- **Gold Light (`#f0c990`):** Light accents
- **Gold Pale (`#fcf0e0`):** Subtle highlights

## Neutral Colors Usage

- **Text Primary (`#173b33`):** Headings, important text
- **Text Secondary (`#4a4a4a`):** Body text, descriptions
- **Text Tertiary (`#6e7c76`):** Labels, helpers, timestamps
- **Text Disabled (`#9a9a9a`):** Disabled states, placeholders
- **Border Default (`#e4e6de`):** Default borders, dividers
- **Border Strong (`#d4d4d4`):** Strong borders
- **Background Primary (`#fffefa`):** Main surface
- **Background Secondary (`#f8f7f2`):** Secondary surface, inputs

## Semantic Colors Usage

- **Success (`#10b981`):** Positive amounts, success states
- **Error (`#ef4444`):** Negative amounts, error states
- **Warning (`#f59e0b`):** Warning states, alerts
- **Info (`#3b82f6`):** Information states

---

# Typography Application Summary

## Font Families

- **Headings:** Playfair Display
  - Hero: 64px, weight 600
  - Page titles: 56px, weight 600
  - Section headers: 40px, weight 600
  - Card titles: 32px, weight 600
  - Subheadings: 24px, weight 600

- **Body:** DM Sans
  - Large body: 18px, weight 400
  - Body: 16px, weight 400
  - Small body: 14px, weight 400
  - Captions: 12px, weight 400

- **UI:** DM Sans
  - Buttons: 16px, weight 600
  - Labels: 14px, weight 500
  - Tags: 12px, weight 500

## Letter Spacing

- **Large headings:** -2.5px to -1.5px
- **Medium headings:** -1px to -0.5px
- **Small headings:** 0px
- **Body text:** 0px
- **UI text:** 0px
- **Captions:** 0.25px to 0.5px
- **Uppercase:** 1.25px

---

# Spacing Application Summary

## Component Spacing

- **Buttons:** 12px 24px (padding)
- **Cards:** 24px (padding)
- **Inputs:** 12px 16px (padding)
- **Modals:** 32px (padding)
- **Sections:** 48px (margin)
- **Grid gaps:** 16px-24px

## Layout Spacing

- **Page margins:** 24px (mobile), 48px (desktop)
- **Section margins:** 48px-64px
- **Container padding:** 24px (mobile), 48px (desktop)

---

# Shadow Application Summary

## Elevation Levels

- **Base:** None
- **Hover:** `0 4px 6px rgba(13,47,39,0.05)`
- **Cards:** `0 4px 6px rgba(13,47,39,0.05)`
- **Raised:** `0 10px 15px rgba(13,47,39,0.10)`
- **Float:** `0 15px 45px rgba(25,58,49,0.10)`
- **Modals:** `0 20px 25px rgba(13,47,39,0.15)`

---

# Border Radius Application Summary

## Component Radius

- **Buttons:** 10px
- **Inputs:** 8px
- **Cards:** 18px
- **Modals:** 24px
- **Avatars:** 50% (circular)
- **Badges:** 20px
- **Tags:** 12px

---

# Next Steps

**Phase 8:** Responsive Designs  
- Tablet adaptations (768px-1023px)  
- Mobile adaptations (320px-767px)  
- Breakpoint-specific adjustments  
- Touch-optimized interactions  

---

**End of Phase 7: High Fidelity UI**
