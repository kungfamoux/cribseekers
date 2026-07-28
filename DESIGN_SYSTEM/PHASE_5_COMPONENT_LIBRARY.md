# CribSeekers Design System
## Phase 5: Component Library

**Version:** 1.0.0  
**Date:** July 20, 2026  
**Status:** Draft  
**Designer:** Head of Product Design

---

# Executive Summary

This document defines the complete component library for CribSeekers, establishing specifications for all reusable UI components. Each component includes anatomy, variants, states, usage guidelines, and accessibility requirements.

**Total Components:** 35  
**Categories:** 8  
- Navigation (4)
- Data Display (6)
- Forms (5)
- Feedback (4)
- Overlays (4)
- Layout (5)
- Media (4)
- Specialized (3)

---

# Component Categories

## 1. Navigation Components
- Button
- Link
- Tabs
- Breadcrumb

## 2. Data Display Components
- Card
- List
- Table
- Badge
- Tag
- Avatar

## 3. Form Components
- Input
- Select
- Checkbox
- Radio
- Toggle

## 4. Feedback Components
- Alert
- Toast
- Progress
- Skeleton

## 5. Overlay Components
- Modal
- Dropdown
- Tooltip
- Popover

## 6. Layout Components
- Container
- Grid
- Stack
- Divider
- Spacer

## 7. Media Components
- Image
- Icon
- Avatar Group
- Carousel

## 8. Specialized Components
- Property Card
- Search Bar
- Filter Sidebar

---

# 1. Navigation Components

## Button

### Purpose
Trigger actions or navigate to destinations.

### Anatomy
```
[Icon] [Label] [Icon]
```

### Variants

| Variant | Background | Text | Border | Use Case |
|---------|------------|------|--------|----------|
| Primary | `forest-900` | White | None | Primary actions |
| Secondary | `forest-100` | `forest-900` | None | Secondary actions |
| Tertiary | Transparent | `forest-900` | `forest-900` | Tertiary actions |
| Destructive | `error-500` | White | None | Destructive actions |
| Ghost | Transparent | `forest-900` | None | Low emphasis |
| Link | Transparent | `forest-500` | None | Link-like button |

### Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| xs | 28px | 4px 12px | 12px | 12px |
| sm | 32px | 6px 14px | 14px | 14px |
| md | 40px | 10px 20px | 16px | 16px |
| lg | 48px | 12px 24px | 18px | 20px |
| xl | 56px | 16px 32px | 20px | 24px |

### States

| State | Background | Text | Border | Shadow |
|-------|------------|------|--------|--------|
| Default | Variant | Variant | Variant | `elevation-2` |
| Hover | Darken 10% | Same | Same | `elevation-3` |
| Active | Darken 20% | Same | Same | `elevation-1` |
| Disabled | `gray-300` | `gray-500` | None | None |
| Loading | Variant | White | None | `elevation-2` + spinner |

### Usage Guidelines
- Use primary for main actions
- Use secondary for alternative actions
- Use destructive for irreversible actions
- Use ghost for low-emphasis actions
- Include icons for clarity
- Use descriptive labels

### Accessibility
- `aria-label` for icon-only buttons
- `aria-disabled` for disabled state
- Keyboard navigation (Enter, Space)
- Focus indicator visible

---

## Link

### Purpose
Navigate to different pages or sections.

### Anatomy
```
[Text] [Icon]
```

### Variants

| Variant | Color | Decoration | Underline | Use Case |
|---------|-------|------------|-----------|----------|
| Default | `forest-500` | None | Hover | Standard links |
| Inverse | White | None | Hover | On dark backgrounds |
| Muted | `gray-600` | None | Hover | Secondary links |
| Inline | `forest-500` | Underline | Always | Inline text |

### States

| State | Color | Decoration |
|-------|-------|------------|
| Default | Variant | Variant |
| Hover | `forest-900` | Underline |
| Active | `forest-900` | Underline |
| Visited | `forest-600` | None |
| Disabled | `gray-400` | None |

### Usage Guidelines
- Use descriptive link text
- Don't use "click here"
- Open external links in new tab
- Use icons for external links

### Accessibility
- `aria-label` for non-descriptive text
- `rel="noopener noreferrer"` for external
- Keyboard navigation (Enter)
- Focus indicator visible

---

## Tabs

### Purpose
Switch between related views or content.

### Anatomy
```
[Tab 1] [Tab 2] [Tab 3] [Active Tab]
```

### Variants

| Variant | Background | Active Background | Border | Use Case |
|---------|------------|-------------------|--------|----------|
| Line | Transparent | Transparent | Bottom line | Standard tabs |
| Pill | `gray-100` | `forest-900` | Rounded | Compact tabs |
| Underline | Transparent | Transparent | Bottom line | Minimal tabs |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 36px | 8px 16px | 14px |
| md | 44px | 12px 20px | 16px |
| lg | 52px | 16px 24px | 18px |

### States

| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | Transparent | `gray-600` | None |
| Hover | `gray-100` | `forest-900` | None |
| Active | `forest-900` | White | Bottom border |
| Disabled | Transparent | `gray-400` | None |

### Usage Guidelines
- Use for switching views
- Keep labels short
- Max 7 tabs per row
- Use icons for clarity
- Scrollable for many tabs

### Accessibility
- `role="tablist"`
- `role="tab"` for each tab
- `aria-selected` for active tab
- Keyboard navigation (Arrow keys)

---

## Breadcrumb

### Purpose
Show user's location in hierarchy.

### Anatomy
```
Home > Properties > The Ivory House
```

### Variants

| Variant | Separator | Color | Use Case |
|---------|-----------|-------|----------|
| Default | / | `gray-600` | Standard |
| Chevron | > | `gray-600` | Modern |
| Arrow | → | `gray-600` | Minimal |

### Sizes

| Size | Font Size | Icon Size |
|------|-----------|-----------|
| sm | 12px | 12px |
| md | 14px | 14px |
| lg | 16px | 16px |

### States

| State | Color | Decoration |
|-------|-------|------------|
| Current | `forest-900` | None |
| Link | `forest-500` | Hover underline |
| Disabled | `gray-400` | None |

### Usage Guidelines
- Show full path
- Clickable except current
- Use on deep pages
- Keep labels short

### Accessibility
- `aria-label="Breadcrumb"`
- `nav` element
- Keyboard navigation

---

# 2. Data Display Components

## Card

### Purpose
Container for related content.

### Anatomy
```
┌─────────────────────────┐
│ [Header]         [Menu] │
├─────────────────────────┤
│                         │
│      [Content]          │
│                         │
├─────────────────────────┤
│      [Footer]           │
└─────────────────────────┘
```

### Variants

| Variant | Background | Border | Shadow | Radius | Use Case |
|---------|------------|--------|--------|--------|----------|
| Default | White | `border-default` | `elevation-2` | `radius-lg` | Standard |
| Elevated | White | None | `elevation-3` | `radius-lg` | Emphasized |
| Flat | `gray-50` | `border-default` | None | `radius-lg` | Subtle |
| Bordered | White | `border-strong` | None | `radius-lg` | Defined |
| Glass | Glass | Glass border | `elevation-2` | `radius-lg` | Modern |

### Sizes

| Size | Padding | Use Case |
|------|---------|----------|
| sm | 16px | Compact cards |
| md | 24px | Standard cards |
| lg | 32px | Large cards |
| xl | 48px | Hero cards |

### States

| State | Background | Border | Shadow |
|-------|------------|--------|--------|
| Default | Variant | Variant | Variant |
| Hover | White | `border-strong` | `elevation-3` |
| Active | `forest-50` | `border-focus` | `elevation-3` |
| Disabled | `gray-100` | `border-subtle` | `elevation-1` |

### Usage Guidelines
- Group related content
- Use consistent padding
- Add header for context
- Use footer for actions
- Keep content focused

### Accessibility
- `role="article"` for content cards
- Keyboard navigation
- Focus indicators

---

## List

### Purpose
Display items in a vertical sequence.

### Anatomy
```
• Item 1
• Item 2
• Item 3
```

### Variants

| Variant | Marker | Spacing | Use Case |
|---------|--------|---------|----------|
| Unordered | Bullet | 12px | Standard lists |
| Ordered | Number | 12px | Sequential lists |
| None | None | 12px | Custom lists |
| Icon | Custom icon | 12px | Feature lists |

### Sizes

| Size | Font Size | Marker Size | Spacing |
|------|-----------|-------------|---------|
| sm | 14px | 14px | 8px |
| md | 16px | 16px | 12px |
| lg | 18px | 18px | 16px |

### States

| State | Text Color | Marker Color |
|-------|------------|--------------|
| Default | `text-primary` | `forest-500` |
| Hover | `forest-900` | `forest-700` |
| Active | `forest-900` | `forest-900` |
| Disabled | `text-disabled` | `gray-400` |

### Usage Guidelines
- Use for related items
- Keep items short
- Use consistent spacing
- Limit to 7±2 items

### Accessibility
- `ul` or `ol` elements
- `role="list"`
- Keyboard navigation

---

## Table

### Purpose
Display structured data in rows and columns.

### Anatomy
```
┌──────┬──────┬──────┐
│ Header│Header│Header│
├──────┼──────┼──────┤
│ Cell │ Cell │ Cell │
│ Cell │ Cell │ Cell │
└──────┴──────┴──────┘
```

### Variants

| Variant | Header Background | Border | Striped | Use Case |
|---------|-------------------|--------|---------|----------|
| Default | `gray-50` | `border-default` | No | Standard |
| Striped | `gray-50` | `border-default` | Yes | Readability |
| Bordered | `gray-50` | `border-strong` | No | Defined |
| Minimal | Transparent | `border-subtle` | No | Clean |

### Sizes

| Size | Cell Padding | Font Size | Use Case |
|------|--------------|-----------|----------|
| sm | 8px 12px | 14px | Dense data |
| md | 12px 16px | 16px | Standard |
| lg | 16px 20px | 18px | Relaxed |

### States

| State | Background | Text |
|-------|------------|------|
| Default | White/Gray | `text-primary` |
| Hover | `forest-50` | `text-primary` |
| Selected | `forest-100` | `forest-900` |
| Disabled | `gray-100` | `text-disabled` |

### Usage Guidelines
- Use for tabular data
- Sortable columns
- Responsive on mobile
- Clear column headers
- Align data appropriately

### Accessibility
- `caption` for table title
- `scope` for headers
- Keyboard navigation
- Sort indicators

---

## Badge

### Purpose
Display status or category information.

### Anatomy
```
[Icon] [Label]
```

### Variants

| Variant | Background | Text | Use Case |
|---------|------------|------|----------|
| Default | `gray-100` | `gray-700` | Neutral |
| Primary | `forest-100` | `forest-900` | Primary |
| Success | `success-100` | `success-500` | Success |
| Warning | `warning-100` | `warning-500` | Warning |
| Error | `error-100` | `error-500` | Error |
| Info | `info-100` | `info-500` | Info |

### Sizes

| Size | Height | Padding | Font Size | Radius |
|------|--------|---------|-----------|--------|
| xs | 20px | 2px 8px | 10px | `radius-sm` |
| sm | 24px | 4px 10px | 12px | `radius-sm` |
| md | 28px | 6px 12px | 14px | `radius-md` |
| lg | 32px | 8px 14px | 16px | `radius-md` |

### States

| State | Opacity | Cursor |
|-------|---------|--------|
| Default | 100% | Default |
| Hover | 90% | Pointer |
| Disabled | 50% | Not allowed |

### Usage Guidelines
- Use for status indicators
- Keep labels short
- Use appropriate colors
- Limit badges per item

### Accessibility
- `aria-label` for icons
- Color not only indicator
- Screen reader friendly

---

## Tag

### Purpose
Display categories or labels.

### Anatomy
```
[Label] [×]
```

### Variants

| Variant | Background | Text | Border | Use Case |
|---------|------------|------|--------|----------|
| Default | `gray-100` | `gray-700` | None | Standard |
| Primary | `forest-100` | `forest-900` | None | Primary |
| Outline | Transparent | `forest-900` | `forest-900` | Minimal |
| Removable | `gray-100` | `gray-700` | None | With remove |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 24px | 4px 10px | 12px |
| md | 28px | 6px 12px | 14px |
| lg | 32px | 8px 14px | 16px |

### States

| State | Background | Cursor |
|-------|------------|--------|
| Default | Variant | Default |
| Hover | Darken 10% | Pointer |
| Active | Darken 20% | Pointer |

### Usage Guidelines
- Use for categorization
- Removable for filters
- Keep labels concise
- Group related tags

### Accessibility
- `aria-label` for remove button
- Keyboard navigation
- Focus indicators

---

## Avatar

### Purpose
Display user or entity image.

### Anatomy
```
┌─────┐
│ IMG │
└─────┘
```

### Variants

| Variant | Shape | Border | Use Case |
|---------|-------|--------|----------|
| Circle | Circular | None | Users |
| Square | Rounded | None | Entities |
| Rounded | `radius-lg` | None | Mixed |
| Bordered | Circular | 2px white | Over images |

### Sizes

| Size | Width | Height | Font Size |
|------|-------|--------|-----------|
| xs | 24px | 24px | 10px |
| sm | 32px | 32px | 12px |
| md | 40px | 40px | 14px |
| lg | 48px | 48px | 16px |
| xl | 64px | 64px | 20px |
| 2xl | 96px | 96px | 28px |

### States

| State | Border | Opacity |
|-------|--------|---------|
| Default | Variant | 100% |
| Hover | `forest-500` | 100% |
| Active | `forest-900` | 100% |
| Offline | Gray border | 70% |

### Usage Guidelines
- Use initials for missing images
- Consistent sizing in context
- Group with avatar group
- Show status indicator

### Accessibility
- `alt` text for images
- `aria-label` for initials
- Color contrast for initials

---

# 3. Form Components

## Input

### Purpose
Collect user input.

### Anatomy
```
┌─────────────────────────┐
│ [Label]                  │
│ [Icon] [Placeholder]     │
└─────────────────────────┘
   [Helper/Error Text]
```

### Variants

| Variant | Background | Border | Radius | Use Case |
|---------|------------|--------|--------|----------|
| Default | White | `border-default` | `radius-md` | Standard |
| Filled | `gray-100` | None | `radius-md` | Modern |
| Underline | Transparent | Bottom only | None | Minimal |
| Search | White | `border-default` | `radius-md` | With icon |

### Sizes

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| sm | 32px | 6px 12px | 14px | 14px |
| md | 40px | 10px 16px | 16px | 16px |
| lg | 48px | 12px 20px | 18px | 20px |

### States

| State | Background | Text | Border | Focus Ring |
|-------|------------|------|--------|------------|
| Default | White | `text-primary` | `border-default` | None |
| Hover | White | `text-primary` | `border-strong` | None |
| Focus | White | `text-primary` | `border-focus` | `forest-200` |
| Error | `error-100` | `text-primary` | `error-500` | `error-200` |
| Disabled | `gray-100` | `text-disabled` | `border-subtle` | None |

### Usage Guidelines
- Always provide labels
- Use placeholders for hints
- Show helper text
- Validate on blur
- Clear error messages

### Accessibility
- Associated label
- `aria-describedby` for helper
- `aria-invalid` for errors
- Keyboard navigation
- Focus indicators

---

## Select

### Purpose
Select from predefined options.

### Anatomy
```
┌─────────────────────────┐
│ [Label]                  │
│ [Selected Option]    [▼] │
└─────────────────────────┘
```

### Variants

| Variant | Background | Border | Radius | Use Case |
|---------|------------|--------|--------|----------|
| Default | White | `border-default` | `radius-md` | Standard |
| Filled | `gray-100` | None | `radius-md` | Modern |

### Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| sm | 32px | 6px 12px | 14px |
| md | 40px | 10px 16px | 16px |
| lg | 48px | 12px 20px | 18px |

### States

| State | Background | Border |
|-------|------------|--------|
| Default | White | `border-default` |
| Hover | White | `border-strong` |
| Focus | White | `border-focus` |
| Disabled | `gray-100` | `border-subtle` |

### Usage Guidelines
- Provide clear options
- Group related options
- Use "Select..." as placeholder
- Show selected value clearly

### Accessibility
- Associated label
- `aria-expanded` for dropdown
- Keyboard navigation
- Focus indicators

---

## Checkbox

### Purpose
Select multiple options.

### Anatomy
```
☑ [Label]
```

### Variants

| Variant | Box Color | Check Color | Use Case |
|---------|-----------|-------------|----------|
| Default | `forest-900` | White | Standard |
| Primary | `forest-500` | White | Primary |
| Error | `error-500` | White | Error state |

### Sizes

| Size | Box Size | Font Size | Spacing |
|------|----------|-----------|---------|
| sm | 16px | 14px | 8px |
| md | 20px | 16px | 12px |
| lg | 24px | 18px | 16px |

### States

| State | Box | Check | Cursor |
|-------|------|-------|--------|
| Unchecked | Border | None | Pointer |
| Checked | Filled | Visible | Pointer |
| Indeterminate | Filled | Dash | Pointer |
| Disabled | Gray | Gray | Not allowed |

### Usage Guidelines
- Use for multiple selections
- Clear label text
- Group related checkboxes
- Indeterminate for partial selection

### Accessibility
- Associated label
- `aria-checked` state
- Keyboard navigation
- Focus indicators

---

## Radio

### Purpose
Select single option from group.

### Anatomy
```
○ [Label]
```

### Variants

| Variant | Circle Color | Dot Color | Use Case |
|---------|--------------|-----------|----------|
| Default | `forest-900` | `forest-900` | Standard |
| Primary | `forest-500` | `forest-500` | Primary |

### Sizes

| Size | Circle Size | Font Size | Spacing |
|------|-------------|-----------|---------|
| sm | 16px | 14px | 8px |
| md | 20px | 16px | 12px |
| lg | 24px | 18px | 16px |

### States

| State | Circle | Dot | Cursor |
|-------|--------|-----|--------|
| Unchecked | Border | None | Pointer |
| Checked | Border | Visible | Pointer |
| Disabled | Gray | Gray | Not allowed |

### Usage Guidelines
- Use for single selection
- Same name for group
- Clear label text
- Default selection recommended

### Accessibility
- Associated label
- `aria-checked` state
- Keyboard navigation
- Focus indicators

---

## Toggle

### Purpose
Switch between two states.

### Anatomy
```
○── [Label]
```

### Variants

| Variant | Off Color | On Color | Use Case |
|---------|-----------|----------|----------|
| Default | `gray-300` | `forest-500` | Standard |
| Primary | `gray-300` | `gold-500` | Accent |
| Success | `gray-300` | `success-500` | Success |

### Sizes

| Size | Width | Height | Font Size |
|------|-------|--------|-----------|
| sm | 36px | 20px | 14px |
| md | 44px | 24px | 16px |
| lg | 52px | 28px | 18px |

### States

| State | Background | Cursor |
|-------|------------|--------|
| Off | `gray-300` | Pointer |
| On | Variant | Pointer |
| Disabled | `gray-200` | Not allowed |

### Usage Guidelines
- Use for binary settings
- Clear on/off labels
- Immediate action
- Visual feedback

### Accessibility
- Associated label
- `aria-checked` state
- Keyboard navigation
- Focus indicators

---

# 4. Feedback Components

## Alert

### Purpose
Display important messages.

### Anatomy
```
[Icon] [Title]
[Message]
[Action]
```

### Variants

| Variant | Background | Border | Icon | Use Case |
|---------|------------|--------|------|----------|
| Info | `info-100` | `info-500` | Info | Information |
| Success | `success-100` | `success-500` | Check | Success |
| Warning | `warning-100` | `warning-500` | Alert | Warning |
| Error | `error-100` | `error-500` | X | Error |

### Sizes

| Size | Padding | Font Size | Icon Size |
|------|---------|-----------|-----------|
| sm | 12px 16px | 14px | 16px |
| md | 16px 20px | 16px | 20px |
| lg | 20px 24px | 18px | 24px |

### States

| State | Opacity | Dismissible |
|-------|---------|-------------|
| Default | 100% | Yes |
| Dismissed | 0% | No |

### Usage Guidelines
- Use for important messages
- Clear title and message
- Dismissible for non-critical
- Appropriate color for type

### Accessibility
- `role="alert"`
- `aria-live` for dynamic
- Keyboard dismiss
- Focus management

---

## Toast

### Purpose
Show temporary notifications.

### Anatomy
```
[Icon] [Message] [×]
```

### Variants

| Variant | Background | Border | Position | Use Case |
|---------|------------|--------|----------|----------|
| Default | `gray-900` | None | Top-right | Standard |
| Success | `success-500` | None | Top-right | Success |
| Error | `error-500` | None | Top-right | Error |
| Info | `info-500` | None | Top-right | Info |

### Sizes

| Size | Width | Padding | Font Size |
|------|-------|---------|-----------|
| sm | 280px | 12px 16px | 14px |
| md | 320px | 16px 20px | 16px |
| lg | 400px | 20px 24px | 18px |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Enter | Slide in | 300ms |
| Exit | Slide out | 300ms |
| Auto-dismiss | Fade out | 5000ms |

### Usage Guidelines
- Use for temporary feedback
- Auto-dismiss after delay
- Clear, concise messages
- Stack multiple toasts

### Accessibility
- `role="status"`
- `aria-live="polite"`
- Keyboard dismiss
- Focus management

---

## Progress

### Purpose
Show completion status.

### Variants

| Variant | Type | Use Case |
|---------|------|----------|
| Linear | Bar | Standard progress |
| Circular | Spinner | Loading |
| Determinate | Percentage | Known progress |
| Indeterminate | Animation | Unknown progress |

### Linear Progress

| Size | Height | Radius |
|------|--------|--------|
| sm | 4px | `radius-full` |
| md | 8px | `radius-full` |
| lg | 12px | `radius-full` |

### Circular Progress

| Size | Stroke Width | Use Case |
|------|--------------|----------|
| sm | 2px | Inline |
| md | 3px | Standard |
| lg | 4px | Prominent |

### Colors

| Variant | Track | Fill |
|---------|-------|------|
| Default | `gray-200` | `forest-500` |
| Success | `gray-200` | `success-500` |
| Error | `gray-200` | `error-500` |

### Usage Guidelines
- Show percentage when known
- Use indeterminate for loading
- Clear visual feedback
- Accessible text alternatives

### Accessibility
- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`
- `aria-label`

---

## Skeleton

### Purpose
Show loading placeholder.

### Variants

| Variant | Animation | Use Case |
|---------|-----------|----------|
| Pulse | Fade | Standard |
| Wave | Shimmer | Modern |
| None | Static | Minimal |

### Components

| Component | Height | Radius |
|-----------|--------|--------|
| Text | 16px | `radius-sm` |
| Heading | 24px | `radius-sm` |
| Avatar | 40px | `radius-full` |
| Image | 200px | `radius-md` |
| Card | Variable | `radius-lg` |

### Colors

| Variant | Background | Highlight |
|---------|------------|-----------|
| Light | `gray-200` | `gray-300` |
| Dark | `gray-700` | `gray-600` |

### Usage Guidelines
- Match content structure
- Use during loading
- Smooth animations
- Don't overuse

### Accessibility
- `aria-busy="true"`
- `aria-hidden="true"`
- Screen reader text

---

# 5. Overlay Components

## Modal

### Purpose
Focus user attention on specific content.

### Anatomy
```
┌─────────────────────────┐
│ [Header]         [Close] │
├─────────────────────────┤
│                         │
│      [Content]          │
│                         │
├─────────────────────────┤
│      [Actions]          │
└─────────────────────────┘
```

### Variants

| Variant | Size Animation | Backdrop | Use Case |
|---------|----------------|----------|----------|
| Default | Fade + Scale | `rgba(0,0,0,0.5)` | Standard |
| Fullscreen | Fade | `rgba(0,0,0,0.9)` | Full screen |
| Drawer | Slide | `rgba(0,0,0,0.5)` | Side panel |

### Sizes

| Size | Max Width | Padding | Use Case |
|------|-----------|---------|----------|
| sm | 400px | 24px | Small dialogs |
| md | 600px | 32px | Standard modals |
| lg | 800px | 32px | Large modals |
| xl | 1000px | 40px | Extra large |
| full * | 100% | 24px | Fullscreen |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Enter | Fade in + Scale up | 300ms |
| Exit | Fade out + Scale down | 200ms |

### Usage Guidelines
- Clear title and purpose
- Dismissible with ESC
- Focus trap inside
- Action buttons in footer

### Accessibility
- `role="dialog"`
- `aria-modal="true"`
- Focus trap
- ESC to close
- Focus management

---

## Dropdown

### Purpose
Show list of actions or options.

### Anatomy
```
┌─────────────────────────┐
│ [Option 1]              │
│ [Option 2]              │
│ [Option 3]              │
└─────────────────────────┘
```

### Variants

| Variant | Position | Animation | Use Case |
|---------|----------|-----------|----------|
| Default | Bottom | Fade + Slide | Standard |
| Top | Above trigger | Fade + Slide | Limited space |
| Menu | Right of trigger | Fade + Slide | Context menu |

### Sizes

| Size | Min Width | Item Height | Font Size |
|------|-----------|-------------|-----------|
| sm | 160px | 32px | 14px |
| md | 200px | 40px | 16px |
| lg | 240px | 48px | 18px |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Enter | Fade in + Slide | 200ms |
| Exit | Fade out + Slide | 150ms |

### Usage Guidelines
- Click outside to close
- Keyboard navigation
- Clear option labels
- Group related options
- Icons for clarity

### Accessibility
- `role="menu"`
- `role="menuitem"`
- Keyboard navigation
- Focus management

---

## Tooltip

### Purpose
Show additional information on hover.

### Anatomy
```
[Tooltip Text]
```

### Variants

| Variant | Position | Arrow | Use Case |
|---------|----------|-------|----------|
| Default | Top | Yes | Standard |
| Bottom | Below | Yes | Below element |
| Left | Left side | Yes | Left of element |
| Right | Right side | Yes | Right of element |

### Sizes

| Size | Padding | Font Size | Max Width |
|------|---------|-----------|-----------|
| sm | 4px 8px | 12px | 200px |
| md | 6px 12px | 14px | 250px |
| lg | 8px 16px | 16px | 300px |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Enter | Fade in | 150ms |
| Exit | Fade out | 100ms |

### Usage Guidelines
- Brief, helpful text
- Don't repeat visible info
- Use for clarifications
- Avoid critical info
- Consistent positioning

### Accessibility
- `role="tooltip"`
- Keyboard trigger
- `aria-describedby`
- Screen reader support

---

## Popover

### Purpose
Show rich content in overlay.

### Anatomy
```
┌─────────────────────────┐
│ [Header]                │
├─────────────────────────┤
│      [Content]          │
└─────────────────────────┘
```

### Variants

| Variant | Position | Close | Use Case |
|---------|----------|-------|----------|
| Default | Top | Click outside | Standard |
| Card | Center | X button | Rich content |
| Menu | Right | Click outside | Context |

### Sizes

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| sm | 280px | Auto | Small content |
| md | 360px | Auto | Standard |
| lg | 480px | Auto | Large content |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Enter | Fade in + Scale | 200ms |
| Exit | Fade out + Scale | 150ms |

### Usage Guidelines
- Click outside to close
- Focus trap for complex
- Clear close button
- Rich content support
- Consistent styling

### Accessibility
- `role="dialog"`
- Focus trap
- ESC to close
- Focus management

---

# 6. Layout Components

## Container

### Purpose
Constrain content width.

### Variants

| Variant | Max Width | Centered | Use Case |
|---------|-----------|----------|----------|
| xs | 100% | Yes | Mobile |
| sm | 640px | Yes | Small |
| md | 768px | Yes | Tablet |
| lg | 1024px | Yes | Desktop |
| xl | 1280px | Yes | Large |
| 2xl | 1440px | Yes | Extra large |
| fluid | 100% | Yes | Full width |

### Padding

| Breakpoint | Padding |
|------------|---------|
| Mobile | 16px |
| Tablet | 24px |
| Desktop | 32px |

### Usage Guidelines
- Use for page layout
- Responsive breakpoints
- Center content
- Consistent margins

---

## Grid

### Purpose
Create column-based layouts.

### Variants

| Variant | Columns | Gap | Use Case |
|---------|---------|-----|----------|
| 2 | 2 | 24px | 2-column |
| 3 | 3 | 24px | 3-column |
| 4 | 4 | 24px | 4-column |
| 6 | 6 | 16px | 6-column |
| 12 | 12 | 24px | 12-column |

### Responsive

| Breakpoint | Columns |
|------------|---------|
| Mobile | 1-2 |
| Tablet | 2-4 |
| Desktop | 4-12 |

### Usage Guidelines
- Use flexbox or CSS grid
- Responsive breakpoints
- Consistent gaps
- Mobile-first approach

---

## Stack

### Purpose
Stack elements vertically or horizontally.

### Variants

| Variant | Direction | Gap | Use Case |
|---------|-----------|-----|----------|
| Vertical | Column | 16px | Vertical stack |
| Horizontal | Row | 16px | Horizontal stack |
| Wrap | Row wrap | 16px | Wrapping stack |

### Spacing

| Size | Gap |
|------|-----|
| xs | 8px |
| sm | 12px |
| md | 16px |
| lg | 24px |
| xl | 32px |

### Usage Guidelines
- Use for consistent spacing
- Responsive direction
- Align items appropriately
- Wrap when needed

---

## Divider

### Purpose
Separate content sections.

### Variants

| Variant | Orientation | Thickness | Color | Use Case |
|---------|-------------|------------|-------|----------|
| Horizontal | Horizontal | 1px | `border-default` | Standard |
| Vertical | Vertical | 1px | `border-default` | Vertical |
| Dashed | Horizontal | 1px | `border-default` | Dashed |
| Strong | Horizontal | 2px | `border-strong` | Emphasized |

### Usage Guidelines
- Use for section separation
- Don't overuse
- Consistent spacing
- Appropriate thickness

---

## Spacer

### Purpose
Add consistent spacing.

### Variants

| Size | Value | Use Case |
|------|-------|----------|
| xs | 8px | Tight spacing |
| sm | 12px | Small spacing |
| md | 16px | Base spacing |
| lg | 24px | Large spacing |
| xl | 32px | Extra large |
| 2xl | 48px | Section spacing |
| 3xl | 64px | Major spacing |

### Usage Guidelines
- Use for consistent gaps
- Responsive sizing
- Don't nest excessively
- Consider margin vs padding

---

# 7. Media Components

## Image

### Purpose
Display images with consistent styling.

### Variants

| Variant | Radius | Object Fit | Use Case |
|---------|--------|------------|----------|
| Default | `radius-md` | Cover | Standard |
| Rounded | `radius-lg` | Cover | Rounded |
| Circle | `radius-full` | Cover | Avatar |
| Fluid | None | Contain | Responsive |

### Sizes

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| xs | 32px | 32px | Tiny |
| sm | 64px | 64px | Small |
| md | 128px | 128px | Medium |
| lg | 256px | 256px | Large |
| xl | 512px | 512px | Extra large |
| fluid | 100% | Auto | Responsive |

### States

| State | Opacity | Cursor |
|-------|---------|--------|
| Default | 100% | Default |
| Hover | 90% | Pointer |
| Loading | 50% | Wait |
| Error | 0% | Default |

### Usage Guidelines
- Lazy load below fold
- Responsive images
- Alt text required
- Fallback for errors
- Optimize file size

### Accessibility
- Descriptive alt text
- Decorative images hidden
- Loading state feedback
- Error handling

---

## Icon

### Purpose
Display consistent icons.

### Variants

| Variant | Fill | Stroke | Use Case |
|---------|------|--------|----------|
| Outline | None | 2px | Standard |
| Filled | Current | None | Emphasized |
| Duotone | Light | 2px | Modern |

### Sizes

| Size | Width | Height | Use Case |
|------|-------|--------|----------|
| xs | 12px | 12px | Tiny |
| sm | 16px | 16px | Small |
| md | 20px | 20px | Medium |
| lg | 24px | 24px | Large |
| xl | 32px | 32px | Extra large |
| 2xl | 48px | 48px | Display |

### Colors

| Variant | Color | Use Case |
|---------|-------|----------|
| Default | `text-primary` | Standard |
| Muted | `text-secondary` | Subtle |
| Accent | `forest-500` | Accent |
| Success | `success-500` | Success |
| Error | `error-500` | Error |

### Usage Guidelines
- Consistent sizing
- Appropriate colors
- Use with labels
- Don't overuse
- Align properly

### Accessibility
- `aria-hidden="true"`
- `aria-label` for standalone
- Focus indicators
- Color contrast

---

## Avatar Group

### Purpose
Display multiple avatars.

### Anatomy
```
┌───┐ ┌───┐ ┌───┐ ┌───┐
│IMG│ │IMG│ │IMG│ │+3 │
└───┘ └───┘ └───┘ └───┘
```

### Variants

| Variant | Overlap | Border | Use Case |
|---------|---------|--------|----------|
| Default | -8px | 2px white | Standard |
| Stacked | -12px | 2px white | Compact |
| Loose | -4px | 2px white | Spaced |

### Sizes

| Size | Avatar Size | Max Visible | Font Size |
|------|-------------|-------------|-----------|
| sm | 24px | 5 | 10px |
| md | 32px | 5 | 12px |
| lg | 40px | 4 | 14px |
| xl | 48px | 4 | 16px |

### States

| State | Opacity | Cursor |
|-------|---------|--------|
| Default | 100% | Pointer |
| Hover | 90% | Pointer |

### Usage Guidelines
- Max 5 visible
- Show count for more
- Consistent ordering
- Tooltip for names

### Accessibility
- `aria-label` for group
- `aria-label` for each
- Keyboard navigation
- Focus indicators

---

## Carousel

### Purpose
Display multiple items in scrollable view.

### Anatomy
```
[<] [Item 1] [Item 2] [Item 3] [>]
```

### Variants

| Variant | Navigation | Pagination | Use Case |
|---------|------------|------------|----------|
| Default | Arrows | Dots | Standard |
| Snap | Swipe | None | Touch |
| Auto | Auto | Dots | Auto-play |

### Sizes

| Size | Item Width | Gap | Use Case |
|------|------------|-----|----------|
| sm | 200px | 16px | Compact |
| md | 300px | 24px | Standard |
| lg | 400px | 32px | Large |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Slide | Transform | 300ms |
| Fade | Opacity | 300ms |

### Usage Guidelines
- Clear navigation
- Touch support
- Keyboard navigation
- Auto-play optional
- Pause on hover

### Accessibility
- `role="carousel"`
- `aria-label` for navigation
- Keyboard navigation
- Focus indicators
- Screen reader support

---

# 8. Specialized Components

## Property Card

### Purpose
Display property information in card format.

### Anatomy
```
┌─────────────────────────┐
│ [Image]        [Heart]  │
│ [Verified]               │
├─────────────────────────┤
│ [Location]              │
│ [Title]                 │
│ [Beds] [Baths] [Area]   │
├─────────────────────────┤
│ [Price] [Period]  [→]   │
└─────────────────────────┘
```

### Variants

| Variant | Image Height | Layout | Use Case |
|---------|--------------|--------|----------|
| Default | 200px | Vertical | Standard |
| Horizontal | 120px | Horizontal | List |
| Compact | 160px | Vertical | Grid |
| Featured | 240px | Vertical | Featured |

### Sizes

| Size | Width | Image Height | Use Case |
|------|-------|--------------|----------|
| sm | 280px | 160px | Small grid |
| md | 320px | 200px | Standard |
| lg | 400px | 240px | Large |
| xl | 480px | 280px | Extra large |

### States

| State | Border | Shadow | Cursor |
|-------|--------|--------|--------|
| Default | `border-default` | `elevation-2` | Pointer |
| Hover | `border-strong` | `elevation-3` | Pointer |
| Saved | `forest-500` | `elevation-2` | Pointer |

### Usage Guidelines
- High-quality images
- Clear pricing
- Key specs visible
- Save functionality
- Verified badge

### Accessibility
- `role="article"`
- `aria-label` for property
- Keyboard navigation
- Focus indicators
- Alt text for images

---

## Search Bar

### Purpose
Search properties with filters.

### Anatomy
```
┌─────────────────────────┐
│ [📍] [Location]         │
├─────────────────────────┤
│ [🏠] [Type]      [▼]    │
├─────────────────────────┤
│ [💳] [Budget]     [▼]    │
├─────────────────────────┤
│ [⚙️] [Search]           │
└─────────────────────────┘
```

### Variants

| Variant | Layout | Filters | Use Case |
|---------|--------|---------|----------|
| Inline | Horizontal | Collapsed | Compact |
| Expanded | Vertical | Expanded | Full |
| Minimal | Horizontal | Hidden | Simple |

### Sizes

| Size | Height | Input Size | Use Case |
|------|--------|------------|----------|
| sm | 40px | 14px | Compact |
| md | 48px | 16px | Standard |
| lg | 56px | 18px | Large |

### States

| State | Border | Shadow | Focus Ring |
|-------|--------|--------|------------|
| Default | `border-default` | `elevation-2` | None |
| Focus | `border-focus` | `elevation-3` | `forest-200` |
| Error | `error-500` | `elevation-2` | `error-200` |

### Usage Guidelines
- Clear placeholder text
- Expandable filters
- Location first
- Quick search button
- Mobile responsive

### Accessibility
- `role="search"`
- `aria-label` for inputs
- Keyboard navigation
- Focus indicators
- Screen reader support

---

## Filter Sidebar

### Purpose
Advanced property filtering.

### Anatomy
```
┌─────────────────────────┐
│ [Filters]        [Clear] │
├─────────────────────────┤
│ [Location]              │
│   [City] [State]        │
├─────────────────────────┤
│ [Price Range]            │
│   [Slider]              │
├─────────────────────────┤
│ [Property Type]          │
│   ☑ Apartment           │
│   ☑ House               │
├─────────────────────────┤
│ [Apply] [Reset]         │
└─────────────────────────┘
```

### Variants

| Variant | Position | Collapsible | Use Case |
|---------|----------|-------------|----------|
| Default | Left | Yes | Desktop |
| Drawer | Slide | Yes | Mobile |
| Modal | Center | No | Full screen |

### Sizes

| Size | Width | Padding | Use Case |
|------|-------|---------|----------|
| sm | 280px | 20px | Compact |
| md | 320px | 24px | Standard |
| lg | 400px | 32px | Large |

### States

| State | Animation | Duration |
|-------|-----------|----------|
| Expand | Slide down | 300ms |
| Collapse | Slide up | 200ms |

### Usage Guidelines
- Group related filters
- Clear section headers
- Apply/Reset buttons
- Mobile drawer
- Save filters

### Accessibility
- `role="complementary"`
- `aria-expanded` for sections
- Keyboard navigation
- Focus indicators
- Screen reader support

---

# Component Usage Summary

## Component Selection Guide

### Navigation
- **Button:** Primary actions
- **Link:** Page navigation
- **Tabs:** View switching
- **Breadcrumb:** Hierarchy

### Data Display
- **Card:** Content grouping
- **List:** Item sequences
- **Table:** Tabular data
- **Badge:** Status indicators
- **Tag:** Categories
- **Avatar:** User images

### Forms
- **Input:** Text entry
- **Select:** Option selection
- **Checkbox:** Multiple choice
- **Radio:** Single choice
- **Toggle:** Binary settings

### Feedback
- **Alert:** Important messages
- **Toast:** Temporary notifications
- **Progress:** Completion status
- **Skeleton:** Loading states

### Overlays
- **Modal:** Focused content
- **Dropdown:** Action menus
- **Tooltip:** Additional info
- **Popover:** Rich overlays

### Layout
- **Container:** Width constraint
- **Grid:** Column layouts
- **Stack:** Element spacing
- **Divider:** Section separation
- **Spacer:** Consistent gaps

### Media
- **Image:** Visual content
- **Icon:** Symbolic graphics
- **AvatarGroup:** Multiple users
- **Carousel:** Item scrolling

### Specialized
- **PropertyCard:** Property display
- **SearchBar:** Property search
- **FilterSidebar:** Advanced filters

---

# Component Accessibility Checklist

## General Requirements
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast (4.5:1)
- [ ] Screen reader support
- [ ] Error handling
- [ ] Loading states

## Component-Specific
- [ ] Buttons: `aria-label` for icons
- [ ] Links: Descriptive text
- [ ] Forms: Associated labels
- [ ] Modals: Focus trap
- [ ] Dropdowns: Keyboard nav
- [ ] Tabs: Arrow key nav
- [ ] Carousels: Pause on hover
- [ ] Images: Alt text

---

# Component Performance Guidelines

## Best Practices
- Lazy load images
- Use CSS transforms for animations
- Avoid layout thrashing
- Minimize reflows
- Use will-change sparingly
- Optimize images
- Code splitting
- Tree shaking

## Measurement
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

---

# Next Steps

**Phase 6:** Low Fidelity Wireframes  
- Create structural layouts for all pages  
- Establish component placement  
- Define information hierarchy  
- Map user flows to screens  

---

**End of Phase 5: Component Library**
