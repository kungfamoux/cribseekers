# CribSeekers Design System
## Phase 8: Responsive Designs

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document defines responsive design adaptations for all breakpoints, ensuring optimal user experience across devices. It specifies layout changes, component adjustments, and touch-optimized interactions for tablet and mobile views.

**Breakpoints:**
- Mobile Small: 320px-479px
- Mobile Large: 480px-639px
- Tablet Portrait: 640px-767px
- Tablet Landscape: 768px-1023px
- Desktop Small: 1024px-1279px
- Desktop: 1280px-1439px
- Desktop Large: 1440px+

---

# Responsive Strategy

## Mobile-First Approach

1. **Base Styles:** Define for mobile (320px+)
2. **Progressive Enhancement:** Add complexity at larger breakpoints
3. **Fluid Layouts:** Use percentages and flexbox
4. **Touch Optimization:** Larger touch targets, gestures
5. **Performance:** Optimize images, lazy loading

## Breakpoint System

| Breakpoint | Min Width | Max Width | Columns | Gutter | Container |
|------------|-----------|-----------|---------|--------|-----------|
| xs | 320px | 479px | 4 | 16px | 100% (16px margins) |
| sm | 480px | 639px | 4 | 16px | 100% (16px margins) |
| md | 640px | 767px | 8 | 24px | 100% (24px margins) |
| lg | 768px | 1023px | 8 | 24px | 100% (24px margins) |
| xl | 1024px | 1279px | 12 | 24px | 1200px max |
| 2xl | 1280px | 1439px | 12 | 32px | 1280px max |
| 3xl | 1440px+ | - | 12 | 32px | 1440px max |

---

# Component Responsive Specifications

## Navigation

### Desktop (1280px+)
- Top navigation bar
- Horizontal menu
- Logo left, nav center, actions right
- Height: 80px
- Padding: 0 80px

### Tablet Landscape (768px-1023px)
- Condensed top navigation
- Horizontal menu with fewer items
- Logo left, nav center, actions right
- Height: 80px
- Padding: 0 40px
- Some menu items move to dropdown

### Tablet Portrait (640px-767px)
- Top navigation with hamburger
- Logo left, actions right, menu button
- Height: 67px
- Padding: 0 24px
- Menu slides in from right

### Mobile (320px-639px)
- Top navigation with hamburger
- Logo left, notifications right, menu button
- Height: 67px
- Padding: 0 20px
- Menu slides in from right
- Bottom tab bar (5 items)

---

## Hero Section

### Desktop (1280px+)
- 2-column grid (1fr 1.06fr)
- Hero image: 1500px width
- Headline: 64px
- Padding: 76px 80px 48px
- Float cards: Absolute over image

### Tablet Landscape (768px-1023px)
- 2-column grid (1fr 1fr)
- Hero image: 1000px width
- Headline: 48px
- Padding: 64px 40px 32px
- Float cards: Stacked below

### Tablet Portrait (640px-767px)
- Stacked layout
- Hero image: 100% width
- Headline: 40px
- Padding: 48px 24px 32px
- Float cards: Hidden or simplified

### Mobile (320px-639px)
- Stacked layout
- Hero image: 100% width
- Headline: 32px
- Padding: 32px 20px 24px
- Float cards: Hidden

---

## Search Panel

### Desktop (1280px+)
- 4-column grid
- Full width
- Height: 56px
- Gap: 16px

### Tablet Landscape (768px-1023px)
- 3-column grid + filter button
- Full width
- Height: 56px
- Gap: 12px

### Tablet Portrait (640px-767px)
- 2-column grid + filter button
- Full width
- Height: 48px
- Gap: 12px

### Mobile (320px-639px)
- Stacked inputs
- Full width
- Height: auto
- Gap: 8px
- Filter button as drawer

---

## Property Grid

### Desktop (1280px+)
- 4 columns
- Gap: 24px
- Card height: auto

### Tablet Landscape (768px-1023px)
- 3 columns
- Gap: 20px
- Card height: auto

### Tablet Portrait (640px-767px)
- 2 columns
- Gap: 16px
- Card height: auto

### Mobile (320px-639px)
- 1 column (horizontal scroll)
- Gap: 12px
- Card width: 280px
- Snap scrolling

---

## Property Card

### Desktop (1280px+)
- Image height: 200px
- Padding: 16px
- Full details visible

### Tablet Landscape (768px-1023px)
- Image height: 180px
- Padding: 14px
- Full details visible

### Tablet Portrait (640px-767px)
- Image height: 160px
- Padding: 12px
- Reduced details

### Mobile (320px-639px)
- Image height: 140px
- Padding: 12px
- Minimal details
- Horizontal scroll in grid

---

## Property Details

### Desktop (1280px+)
- 2-column layout (gallery + info)
- Gallery: 400px height
- Info: 400px width
- Full tabs visible

### Tablet Landscape (768px-1023px)
- 2-column layout (gallery + info)
- Gallery: 300px height
- Info: auto width
- Full tabs visible

### Tablet Portrait (640px-767px)
- Stacked layout
- Gallery: 250px height
- Info: full width
- Tabs as horizontal scroll

### Mobile (320px-639px)
- Stacked layout
- Gallery: 200px height
- Info: full width
- Tabs as horizontal scroll
- Sticky footer for actions

---

## Filter Sidebar

### Desktop (1280px+)
- Fixed sidebar, 280px width
- Always visible
- Full filters expanded

### Tablet Landscape (768px-1023px)
- Collapsible sidebar, 240px width
- Toggle button
- Full filters expanded

### Tablet Portrait (640px-767px)
- Drawer from left, 280px width
- Triggered by filter button
- Full filters expanded

### Mobile (320px-639px)
- Drawer from bottom, 100% width
- Triggered by filter button
- Simplified filters
- Apply button sticky

---

## Messages

### Desktop (1280px+)
- 2-column layout (list + chat)
- List: 320px width
- Chat: flex 1
- Full features

### Tablet Landscape (768px-1023px)
- 2-column layout (list + chat)
- List: 280px width
- Chat: flex 1
- Full features

### Tablet Portrait (640px-767px)
- List view only
- Tap to open chat (full screen)
- Back navigation

### Mobile (320px-639px)
- List view only
- Tap to open chat (full screen)
- Back navigation
- Bottom sheet for actions

---

## Wallet

### Desktop (1280px+)
- Balance card: full width
- Quick actions: 4 columns
- Transactions: table view
- Cards: grid view

### Tablet Landscape (768px-1023px)
- Balance card: full width
- Quick actions: 4 columns
- Transactions: list view
- Cards: grid view

### Tablet Portrait (640px-767px)
- Balance card: full width
- Quick actions: 2 columns
- Transactions: list view
- Cards: list view

### Mobile (320px-639px)
- Balance card: full width
- Quick actions: 2 columns
- Transactions: list view
- Cards: horizontal scroll

---

## Dashboard

### Desktop (1280px+)
- Welcome header
- Quick actions: 4 columns
- AI recommendations: 4 columns
- Featured: 4 columns
- Activity: list view

### Tablet Landscape (768px-1023px)
- Welcome header
- Quick actions: 4 columns
- AI recommendations: 3 columns
- Featured: 3 columns
- Activity: list view

### Tablet Portrait (640px-767px)
- Welcome header
- Quick actions: 2 columns
- AI recommendations: 2 columns (horizontal scroll)
- Featured: 2 columns (horizontal scroll)
- Activity: list view

### Mobile (320px-639px)
- Welcome header
- Quick actions: 2 columns
- AI recommendations: horizontal scroll
- Featured: horizontal scroll
- Activity: list view (simplified)

---

## Forms

### Desktop (1280px+)
- 2-column layout for related fields
- Full width for single fields
- Submit button: right-aligned

### Tablet Landscape (768px-1023px)
- 2-column layout for related fields
- Full width for single fields
- Submit button: full width

### Tablet Portrait (640px-767px)
- Stacked layout
- Full width for all fields
- Submit button: full width

### Mobile (320px-639px)
- Stacked layout
- Full width for all fields
- Submit button: full width, sticky bottom
- Larger touch targets (48px min)

---

## Modals

### Desktop (1280px+)
- Max width: 600px
- Centered
- Full features
- Close button top-right

### Tablet Landscape (768px-1023px)
- Max width: 500px
- Centered
- Full features
- Close button top-right

### Tablet Portrait (640px-767px)
- Max width: 90%
- Centered
- Simplified features
- Close button top-right

### Mobile (320px-639px)
- Full width
- Bottom sheet (slide up)
- Simplified features
- Close button top-left
- Backdrop dismiss

---

## Tables

### Desktop (1280px+)
- Full table view
- All columns visible
- Sortable headers
- Pagination

### Tablet Landscape (768px-1023px)
- Full table view
- Key columns visible
- Sortable headers
- Pagination

### Tablet Portrait (640px-767px)
- Card view instead of table
- Horizontal scroll for complex tables
- Simplified sorting

### Mobile (320px-639px)
- Card view instead of table
- Horizontal scroll for complex tables
- Minimal sorting
- Load more instead of pagination

---

## Typography Scaling

### Font Sizes by Breakpoint

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero Headline | 64px | 48px | 32px |
| Page Title | 56px | 40px | 28px |
| Section Header | 40px | 32px | 24px |
| Card Title | 32px | 24px | 20px |
| Body Large | 18px | 16px | 16px |
| Body | 16px | 16px | 14px |
| Body Small | 14px | 14px | 12px |
| Caption | 12px | 12px | 11px |

### Line Heights by Breakpoint

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Headlines | 1.1-1.2 | 1.2-1.3 | 1.3-1.4 |
| Body | 1.6 | 1.6 | 1.6 |
| Captions | 1.5 | 1.5 | 1.5 |

---

# Touch Optimization

## Touch Targets

### Minimum Sizes
- **Buttons:** 44px × 44px minimum
- **Links:** 44px height minimum
- **Checkboxes/Radios:** 44px × 44px tap area
- **Inputs:** 48px height minimum
- **Cards:** 44px minimum tap area

### Spacing
- **Between touch targets:** 8px minimum
- **From edges:** 16px minimum
- **Group spacing:** 16px minimum

## Gestures

### Supported Gestures
- **Tap:** Primary action
- **Long press:** Context menu
- **Swipe:** Navigate, dismiss
- **Pinch:** Zoom images
- **Scroll:** Standard scrolling

### Gesture Feedback
- **Visual:** Highlight, scale
- **Haptic:** Vibration (if supported)
- **Audio:** Sound effects (optional)

---

# Page-Specific Responsive Notes

## Landing Page

### Mobile (320px-639px)
- Hero: Stacked, simplified
- Search: Stacked inputs, filter drawer
- Trust strip: 2 columns
- Featured: Horizontal scroll
- AI section: Stacked or hidden
- How it works: Vertical stack
- Footer: Stacked columns

### Tablet Portrait (640px-767px)
- Hero: Stacked, full features
- Search: 3 columns
- Trust strip: 2 columns
- Featured: 3 columns
- AI section: Stacked
- How it works: 3 columns
- Footer: 2 columns

---

## Property Search

### Mobile (320px-639px)
- Search bar: Full width
- Filters: Bottom drawer
- Results: 1 column
- Sort: Dropdown
- Map: Toggle (full screen)

### Tablet Portrait (640px-767px)
- Search bar: Full width
- Filters: Left drawer
- Results: 2 columns
- Sort: Dropdown
- Map: Toggle (side panel)

---

## Property Details

### Mobile (320px-639px)
- Gallery: Horizontal scroll
- Tabs: Horizontal scroll
- Info: Stacked
- Agent: Card at bottom
- Actions: Sticky footer
- Map: Full screen modal

### Tablet Portrait (640px-767px)
- Gallery: Horizontal scroll
- Tabs: Horizontal scroll
- Info: 2-column where possible
- Agent: Inline
- Actions: Inline
- Map: Inline or modal

---

## Book Inspection

### Mobile (320px-639px)
- Property summary: Compact card
- Calendar: Month view
- Time slots: 2 columns
- Notes: Full width
- Fee: Sticky bottom
- Confirm: Full width button

### Tablet Portrait (640px-767px)
- Property summary: Full card
- Calendar: Month view
- Time slots: 3 columns
- Notes: Full width
- Fee: Inline
- Confirm: Full width button

---

## Messages

### Mobile (320px-639px)
- Conversation list: Full screen
- Chat: Full screen (slide in)
- Input: Full width
- Attachments: Bottom sheet
- Typing indicator: Visible

### Tablet Portrait (640px-767px)
- Conversation list: Full screen
- Chat: Full screen (slide in)
- Input: Full width
- Attachments: Inline
- Typing indicator: Visible

---

## Wallet

### Mobile (320px-639px)
- Balance: Large card
- Quick actions: 2 columns
- Transactions: List view
- Cards: Horizontal scroll
- Deposit/Withdraw: Modal

### Tablet Portrait (640px-767px)
- Balance: Large card
- Quick actions: 2 columns
- Transactions: List view
- Cards: Grid view
- Deposit/Withdraw: Modal or inline

---

## Profile

### Mobile (320px-639px)
- Header: Compact
- Statistics: 2 columns
- Settings: List view
- Edit: Modal
- Avatar: Tap to change

### Tablet Portrait (640px-767px)
- Header: Full
- Statistics: 4 columns
- Settings: Grid view
- Edit: Inline or modal
- Avatar: Tap to change

---

# Performance Optimization

## Image Optimization

### Responsive Images
- **Mobile:** 640px max width
- **Tablet:** 1024px max width
- **Desktop:** 1920px max width
- **Formats:** WebP with JPEG fallback
- **Compression:** 80% quality

### Lazy Loading
- **Below fold:** All images
- **Above fold:** Critical images only
- **Placeholder:** Skeleton or blur-up

## Code Splitting

### Route-Based Splitting
- **Landing:** Separate bundle
- **Dashboard:** Separate bundle
- **Auth:** Separate bundle
- **Admin:** Separate bundle

### Component-Based Splitting
- **Heavy components:** Dynamic import
- **Modals:** Lazy load
- **Charts:** Lazy load

---

# Accessibility in Responsive Design

## Responsive Accessibility

### Screen Readers
- **Mobile:** VoiceOver, TalkBack
- **Tablet:** VoiceOver, TalkBack
- **Desktop:** NVDA, JAWS

### Keyboard Navigation
- **Mobile:** External keyboard support
- **Tablet:** External keyboard support
- **Desktop:** Full keyboard navigation

### Touch Accessibility
- **Voice Control:** Mobile, tablet
- **Switch Access:** Mobile, tablet
- **Gesture Alternatives:** Buttons for all gestures

---

# Responsive Testing Checklist

## Mobile (320px-639px)
- [ ] All content accessible
- [ ] Touch targets 44px minimum
- [ ] Text readable without zoom
- [ ] Horizontal scroll minimal
- [ ] Bottom navigation works
- [ ] Modals fit screen
- [ ] Forms usable
- [ ] Images optimized

## Tablet Portrait (640px-767px)
- [ ] Layout adapts properly
- [ ] Touch targets adequate
- [ ] Text readable
- [ ] Navigation works
- [ ] Modals fit screen
- [ ] Forms usable
- [ ] Images optimized

## Tablet Landscape (768px-1023px)
- [ ] Desktop-like features
- [ ] Touch targets adequate
- [ ] Navigation works
- [ ] Multi-column layouts
- [ ] Modals fit screen
- [ ] Forms usable

## Desktop (1280px+)
- [ ] Full functionality
- [ ] Mouse interactions work
- [ ] Keyboard navigation
- [ ] High DPI support
- [ ] Full feature set

---

# Responsive Design Patterns

## Pattern 1: Container Queries

### Use Case
- Component-level responsiveness
- Independent of viewport

### Implementation
```css
@container (min-width: 400px) {
  /* Component styles */
}
```

## Pattern 2: Clamp() for Fluid Typography

### Use Case
- Smooth font scaling
- No media query jumps

### Implementation
```css
font-size: clamp(16px, 2vw + 12px, 24px);
```

## Pattern 3: CSS Grid Auto-Fit

### Use Case
- Responsive card grids
- No media queries needed

### Implementation
```css
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

## Pattern 4: Flexbox with Flex-Wrap

### Use Case
- Responsive button groups
- Natural wrapping

### Implementation
```css
display: flex;
flex-wrap: wrap;
gap: 12px;
```

## Pattern 5: Sticky Positioning

### Use Case
- Mobile sticky headers
- Mobile sticky footers

### Implementation
```css
position: sticky;
top: 0;
z-index: 100;
```

---

# Next Steps

**Phase 9:** Developer Handoff  
- Create implementation guide  
- Document component props  
- Define CSS architecture  
- Provide code examples  
- Create design tokens file  

---

**End of Phase 8: Responsive Designs**
