# Visual Hierarchy & Design Reference

**Status:** Reference Document for Enhancement Implementation
**Date:** December 8, 2025

---

## Design System Visual Hierarchy

```
ATMOSPHERIC LAYER
├─ Backdrop-filter blur (10px)
├─ Inset glow shadows
└─ Ambient light effects

    ↓

MATERIAL LAYER
├─ Multi-layer box-shadows (depth)
├─ Gradient backgrounds
└─ Hairline borders

    ↓

INTERACTIVE LAYER
├─ Hover states (scale + glow)
├─ Focus indicators (outlines)
└─ Active states (darker + more glow)

    ↓

CONTENT LAYER
├─ Typography (with text-shadow)
├─ Colors (cyan, purple, teal)
└─ Icons & UI elements
```

---

## Component Depth Map

```
HIGH DEPTH                      LOW DEPTH
┌──────────────────────────────────────────┐
│                                          │
│  Header/Footer       CTA Buttons         │
│  Modals             Cards                │
│  Popovers           Links                │
│                     Text                 │
│                                          │
└──────────────────────────────────────────┘
  ↓
  Box-shadow depth: 24-40px (header/footer)
  Box-shadow depth: 8-12px (cards)
  Box-shadow depth: 0-8px (buttons/links)
  Box-shadow depth: 0 (text only)
```

---

## Glow Intensity Mapping

### Resting State (Subtle)
```scss
// Light glow - barely perceptible
box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
// Used on: Cards (resting), Links, Badges
```

### Hover State (Medium)
```scss
// Medium glow - clearly visible
box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
// Used on: Buttons (hover), Cards (hover), Interactive elements
```

### Active State (Strong)
```scss
// Strong glow - prominent and dramatic
box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
// Used on: Primary CTA (hover), Focus indicators
```

### Focus State (Accessible)
```scss
// Outline + glow for keyboard accessibility
outline: 2px solid var(--color-cyan);
box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
// Used on: All interactive elements (keyboard nav)
```

---

## Color Application Rules

### Cyan (#00ffff) - Primary Action
**Usage:**
- Primary CTA buttons
- Link hover states
- Focus outlines
- Primary glow effects
- Input borders (focus)

**Don't Use For:**
- Backgrounds (too bright)
- Body text (hard to read)
- Disabled states

**Example:**
```html
<button class="btn-primary">Download Game ➜</button>
<!-- Primary button with cyan gradient + glow -->
```

---

### Purple (#b740d9) - Secondary/Hover
**Usage:**
- Primary button hover state
- Secondary accents
- Layered glow (with cyan)
- Premium feature indicators
- Alternative CTAs

**Don't Use For:**
- Disabled elements
- Muted text
- Small text

**Example:**
```scss
button:hover {
  background: linear-gradient(135deg, var(--color-purple), #a02ecb);
  box-shadow: var(--shadow-glow-purple-strong);
}
```

---

### Teal (#00d9d9) - Technical/System
**Usage:**
- Stats and numbers
- Code/technical text
- Version labels
- System indicators
- Data readouts

**Don't Use For:**
- Primary text
- Large headings
- Warnings/alerts

**Example:**
```html
<span class="stat-value">2,450</span>
<!-- Displayed in teal for technical feel -->
```

---

### Gold (#ffc700) - Premium/Rare
**Usage:**
- Premium features
- Rare items
- Achievement indicators
- Important notices
- Secondary warnings

**Don't Use For:**
- Backgrounds
- Primary actions
- Small text

**Example:**
```scss
.badge-rare {
  background: rgba(255, 199, 0, 0.15);
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
}
```

---

### Red (#ff4444) - Danger/Destructive
**Usage:**
- Delete buttons
- Error states
- Danger warnings
- Critical alerts
- Stop/cancel actions

**Don't Use For:**
- Neutral elements
- Success states
- Backgrounds

**Example:**
```html
<button class="btn-danger">Delete Ship</button>
<!-- High-contrast red for destructive action -->
```

---

## Typography Hierarchy

```
HERO TITLE (Home-V2)
├─ Font: Space Grotesk
├─ Size: 64px (or 6vw)
├─ Weight: 900
├─ Letter-spacing: -0.02em
├─ Text-shadow: 5-layer cyan-purple glow
└─ Use: Single page hero sections

    ↓

SECTION TITLE (H2)
├─ Font: Space Grotesk
├─ Size: 32px (clamp to 24-32px)
├─ Weight: 800
├─ Letter-spacing: -0.01em
├─ Text-shadow: Subtle cyan glow
└─ Use: Section headers, page titles

    ↓

SUBSECTION TITLE (H3)
├─ Font: Space Grotesk
├─ Size: 24px (clamp to 18-24px)
├─ Weight: 700
├─ Letter-spacing: 0
├─ Text-shadow: Very subtle glow
└─ Use: Card titles, subsections

    ↓

BODY TEXT (P)
├─ Font: Space Grotesk
├─ Size: 15px
├─ Weight: 400
├─ Letter-spacing: 0.01em
├─ Line-height: 1.6
└─ Use: Main content

    ↓

SMALL TEXT (Caption)
├─ Font: Space Grotesk
├─ Size: 13px
├─ Weight: 500
├─ Letter-spacing: 0.02em
└─ Use: Labels, captions

    ↓

TECHNICAL TEXT (Code/Stats)
├─ Font: JetBrains Mono
├─ Size: 12-16px (depending on use)
├─ Weight: 600-700
├─ Letter-spacing: 0.01em
├─ Color: Teal (#00d9d9)
└─ Use: Stats, IDs, code, version info
```

---

## Spacing Rhythm

```
LARGE SECTIONS
└─ Margin-bottom: 48px
   └─ Medium screens: 36px
   └─ Small screens: 28px

COMPONENT SECTIONS
└─ Margin-bottom: 24px
   └─ Medium screens: 20px
   └─ Small screens: 16px

ELEMENT SPACING
├─ Gap/Margin: 16px (default)
├─ Tight spacing: 8px
└─ Extra loose: 32px

HEADING TO CONTENT
└─ Margin-bottom: 16px
   └─ Tight coupling: -8px (h + p)
```

---

## Shadow Layering Strategy

### Level 1: Subtle Depth (Cards at rest)
```scss
box-shadow:
  0 4px 12px rgba(0, 0, 0, 0.7),
  0 0 20px rgba(0, 255, 255, 0.08);
```

### Level 2: Clear Depth (Cards on hover)
```scss
box-shadow:
  0 12px 40px rgba(0, 0, 0, 0.7),
  0 0 30px rgba(0, 255, 255, 0.3),
  inset 0 0 20px rgba(0, 255, 255, 0.05);
```

### Level 3: Atmospheric (Header/Footer)
```scss
box-shadow:
  0 8px 32px rgba(0, 0, 0, 0.5),
  0 0 20px rgba(0, 255, 255, 0.05);
```

### Level 4: Strong Glow (Buttons on hover)
```scss
box-shadow:
  0 0 30px rgba(0, 255, 255, 0.6),
  0 0 60px rgba(0, 255, 255, 0.3),
  0 0 90px rgba(0, 255, 255, 0.15);
```

---

## Animation Timings

```
QUICK FEEDBACK (Hover effects)
└─ 150-200ms
   └─ Used for: Button hover, border highlight

NORMAL INTERACTION (State changes)
└─ 300ms
   └─ Used for: Card lift, color change, glow transition

SLOW REVEAL (Page loads, transitions)
└─ 500-800ms
   └─ Used for: Slide-in, fade-in, modal open

AMBIENT (Continuous)
└─ 6000ms (6 seconds)
   └─ Used for: Nebula glow pulse, breathing effects
```

---

## Border Treatment Guide

### Hairline Accents (Cinematic)
```scss
// Top border accent
border-top: 1px solid transparent;
background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);

// On hover, increase opacity
border-top-color: rgba(0, 255, 255, 0.6);
```

### Visible Borders (Interactive)
```scss
// Rest state - subtle
border: 1px solid rgba(0, 255, 255, 0.2);

// Hover state - bright
border: 1px solid var(--color-cyan);
```

### Focus State (Accessibility)
```scss
// Keyboard navigation indicator
outline: 2px solid var(--color-cyan);
outline-offset: 2px;
```

---

## Responsive Design Breakpoints

### Desktop (1024px and up)
- Full card grids (3-4 columns)
- Desktop-only navigation
- Maximum shadow depth
- Larger typography

### Tablet (768px - 1023px)
- 2-column grids
- Hybrid navigation
- Medium shadow depth
- Optimized typography

### Mobile (640px - 767px)
- Single-column layout
- Mobile hamburger menu
- Reduced shadow depth
- Scaled-down typography

### Small Mobile (Under 640px)
- Single column, full-width
- Simplified navigation
- Minimal shadows
- Mobile-optimized text

---

## Accessibility Considerations

### Color Contrast
```
✓ Cyan on dark background: PASS (>7:1)
✓ White on dark background: PASS (>14:1)
✓ Purple on dark background: PASS (>4.5:1)
✓ Teal on dark background: PASS (>6:1)
```

### Focus Indicators
```scss
// Always provide visible focus for keyboard users
button:focus-visible {
  outline: 2px solid var(--color-cyan);
  outline-offset: 2px;
}
```

### Reduced Motion
```scss
// Respect user's motion preferences
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Text Readability
```scss
// Ensure text is readable even with text-shadow
text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
// Shadow is subtle (0.2 opacity), not obstructing

// Avoid on-dark text with heavy shadows
p {
  text-shadow: none; // Only on headings/CTA
}
```

---

## Before & After Examples

### Card Component

**BEFORE:**
```scss
.card {
  background: linear-gradient(180deg, #0e141a, #0a0f13);
  border: 1px solid var(--vds-border);
  box-shadow: var(--vds-shadow-1);
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
}
```
*Feels: Generic, flat, minimal hover feedback*

**AFTER:**
```scss
.card {
  background: linear-gradient(180deg, rgba(13, 20, 37, 0.7), rgba(10, 14, 26, 0.9));
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(0, 255, 255, 0.08);
}
.card:hover {
  transform: translateY(-8px);
  border-color: var(--color-cyan);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.7),
    0 0 30px rgba(0, 255, 255, 0.3);
}
```
*Feels: Premium, cinematic, responsive*

---

### Button Component

**BEFORE:**
```scss
.button {
  background: var(--color-cyan);
  border: 1px solid var(--color-cyan);
  padding: 10px 20px;
}
.button:hover {
  background: darker;
  transform: scale(1.02);
}
```
*Feels: Basic, minimal feedback*

**AFTER:**
```scss
.button {
  background: linear-gradient(135deg, var(--color-cyan), #00dddd);
  border: 1px solid var(--color-cyan);
  padding: 12px 24px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}
.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--duration-normal);
}
.button:hover {
  background: linear-gradient(135deg, var(--color-purple), #a02ecb);
  box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
  transform: scale(1.05);
}
.button:hover::before {
  left: 100%;
}
```
*Feels: Premium, sophisticated, interactive*

---

## Quick Reference Cheat Sheet

### Most Used Box-Shadow Combinations

```scss
// Depth only (cards at rest)
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

// Depth + light glow (cards default)
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 255, 255, 0.08);

// Depth + medium glow (cards hover)
box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(0, 255, 255, 0.3);

// Strong glow (buttons hover)
box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);

// Atmospheric depth (header/footer)
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.05);
```

### Most Used Gradients

```scss
// Card gradient
background: linear-gradient(180deg, rgba(13, 20, 37, 0.7), rgba(10, 14, 26, 0.9));

// Button gradient
background: linear-gradient(135deg, var(--color-cyan), #00dddd);

// Hairline border gradient
background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.4), transparent);

// Glow gradient (radial)
background: radial-gradient(circle, rgba(183, 64, 217, 0.2), transparent 60%);
```

### Most Used Transitions

```scss
// Default - all properties
transition: all 250ms var(--easing-ease);

// Specific properties
transition:
  transform 250ms var(--easing-ease),
  box-shadow 250ms var(--easing-ease),
  border-color 250ms var(--easing-ease);

// Quick for hover feedback
transition: 200ms var(--easing-ease);

// Slow for ambient effects
transition: 6s ease-in-out infinite;
```

---

## Testing Checklist

After implementing visual enhancements:

- [ ] **Depth**: Elements clearly sit above background
- [ ] **Glow**: Glow effects are visible but not overwhelming
- [ ] **Interactions**: Hover states feel responsive and smooth
- [ ] **Typography**: Hierarchy is clear and readable
- [ ] **Colors**: Consistent with palette throughout
- [ ] **Responsive**: All breakpoints work correctly
- [ ] **Performance**: Smooth at 60fps (check DevTools)
- [ ] **Accessibility**: Focus indicators visible, contrast good
- [ ] **Consistency**: Same treatment applied to similar elements

---

**Document Status:** Reference Guide - Ready for Development
**Last Updated:** December 8, 2025
**Usage:** Refer to during implementation for visual guidance
