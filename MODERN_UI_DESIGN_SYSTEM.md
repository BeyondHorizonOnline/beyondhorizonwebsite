# Beyond Horizon - Modern UI Design System
## EVE Online-Inspired Gaming/Esports Aesthetic

---

## Color Palette

### Primary Colors
- **Deep Navy/Space Black**: `#0a0e27` (backgrounds, dark panels)
- **Bright Cyan**: `#00d9ff` (primary accent, interactive elements)
- **Electric Purple**: `#7c3aed` (secondary accent, highlights)
- **Lime Green**: `#a4fc31` (tertiary accent, success/positive states)

### Secondary Colors
- **Light Gray**: `#e5e7eb` (primary text)
- **Medium Gray**: `#9ca3af` (secondary text, muted)
- **Dark Gray**: `#1f2937` (subtle backgrounds, dividers)

### Semantic Colors
- **Success**: Lime Green (#a4fc31)
- **Warning**: Amber/Orange (#f59e0b)
- **Error**: Red (#ef4444)
- **Info**: Cyan (#00d9ff)

### Gradients (for cards/hero)
- **Cyan-to-Purple**: `linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%)`
- **Purple-to-Pink**: `linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)`
- **Lime-Glow**: `radial-gradient(circle, #a4fc31 0%, transparent 70%)`

---

## Typography System

### Font Families
- **Display/Headlines**: `'Space Mono'` or `'JetBrains Mono'` (bold, futuristic monospace)
  - Fallback: `monospace` for wide compatibility
- **Body Text**: `'Inter'` or `'Segoe UI'` (modern, clean sans-serif)
  - Fallback: `system-ui, sans-serif`
- **Code/Specs**: `'Courier New'` or monospace equivalent

### Type Scale (rem-based, 16px root)

| Usage | Font Size | Font Weight | Line Height | Letter Spacing |
|-------|-----------|-------------|-------------|-----------------|
| Hero Title | 4rem (64px) | 900 bold | 1.1 | -0.02em |
| H1 Page Title | 3rem (48px) | 800 bold | 1.2 | -0.01em |
| H2 Section | 2rem (32px) | 700 bold | 1.3 | 0 |
| H3 Subsection | 1.5rem (24px) | 700 bold | 1.4 | 0 |
| Body Large | 1.125rem (18px) | 500 normal | 1.6 | 0 |
| Body Regular | 1rem (16px) | 400 normal | 1.6 | 0 |
| Small/Caption | 0.875rem (14px) | 400 normal | 1.5 | 0.01em |

### Text Styles
- **Hero Tagline**: Bold, all-caps, letter-spaced (+0.05em)
- **Button Text**: Bold uppercase, 0.875rem
- **Card Titles**: Bold, title case
- **Muted Text**: Medium gray, -0.5 opacity or lighter color

---

## Component Library

### 1. Hero Section
```
┌─────────────────────────────────────┐
│  BEYOND HORIZON                     │
│  Conquer the Frontier               │
│  [DOWNLOAD GAME] [LEARN MORE]       │
│  Animated gradient BG + subtle      │
│  parallax on scroll                 │
└─────────────────────────────────────┘
```

**Specs**:
- Full viewport height (or min 600px)
- Background: Dark navy with animated gradient overlay
- Gradient animation: Slow color shift (12s loop) between cyan-purple-lime
- Text: Centered, white (#e5e7eb)
- CTAs: Two buttons with icon + text
- Subtle glow effect around text (text-shadow with cyan)

### 2. Navigation Hub (6-Card Grid)
```
┌──────────┬──────────┬──────────┐
│ SHIPS    │ STATIONS │ CODEX    │
├──────────┼──────────┼──────────┤
│ LEARNING │ MEDIA    │ UPDATES  │
└──────────┴──────────┴──────────┘
```

**Card Style**:
- Background: Dark gray (#1f2937) with 1px cyan border
- Hover State:
  - Border glows (box-shadow: 0 0 20px rgba(0, 217, 255, 0.6))
  - Background shifts toward gradient (cyan-to-purple)
  - Scale: 1.05
  - Transition: 300ms ease
- Icon: Large (48px), centered, cyan colored
- Title: Bold H3, white
- Description: 1 line, medium gray
- Layout: Flexbox column, centered
- Padding: 2rem
- Mobile: Stack to 2 columns, then 1 column

### 3. Featured Asset Carousel
```
┌─────────────────────────────────────┐
│  [◀]  FEATURED: VX-6 Apex     [▶]  │
│       Capital-line Battleship       │
│       Shield: 5000 | Speed: 450     │
│       [VIEW FULL DETAILS →]         │
└─────────────────────────────────────┘
```

**Design**:
- Background: Gradient (purple-to-pink)
- Image/Thumbnail: Left side (40% width), rounded corners
- Content: Right side (60%), dark overlay
- Text: White, bold titles, cyan accent text for stats
- Nav Arrows: Large, cyan on hover, 300ms transition
- Autoplay: Every 6 seconds, smooth fade transition
- Mobile: Stack vertically, full width image

### 4. "How to Play" Section (Expandable Cards)
```
┌─────────────────────────────────────┐
│ ▼ What is Beyond Horizon?          │
│   [Expanded content here...]        │
├─────────────────────────────────────┤
│ ▶ The Voran Catalog                │
│   [Click to expand...]              │
└─────────────────────────────────────┘
```

**Design**:
- Card per section: Dark background (#1f2937)
- Header: Clickable, bold text, chevron icon (cyan)
- Header Hover: Subtle purple glow, cursor pointer
- Content: Prose text (light gray), left-padded
- Expand Animation: 300ms slide-down, opacity fade-in
- Divider: Thin cyan line between sections

### 5. CTA Section (Download Bar)
```
┌─────────────────────────────────────┐
│  Ready to Join the Frontier?        │
│  [DOWNLOAD NOW] [EMAIL SIGNUP]      │
└─────────────────────────────────────┘
```

**Design**:
- Background: Gradient (lime-glow centered)
- Text: Bold white, centered
- Buttons: Large (50px+ height), uppercase, bold
- Primary Button: Cyan background, dark text, hover with purple shift
- Secondary Button: Transparent with cyan border, white text, hover glow
- Mobile: Stack vertically, full width buttons
- Spacing: 2rem padding vertical, 4rem horizontal

### 6. Button Styles
```
PRIMARY:        SECONDARY:       TERTIARY:
┌──────────┐   ┌──────────┐     ┌──────────┐
│DOWNLOAD →│   │LEARN MORE│     │MORE INFO→│
└──────────┘   └──────────┘     └──────────┘
Cyan BG        Border + Cyan    Text Link +
Dark text      text, transparent cyan arrow
```

**Specs**:
- Min height: 44px (touch-friendly)
- Padding: 0.75rem 1.5rem
- Border radius: 4px (sharp, corporate feel)
- Font: Bold, uppercase, 0.875rem
- Icons: 16px, right-aligned with 0.5rem gap
- Transitions: Background 200ms, glow 200ms
- Hover: Scale 1.02, glow shadow

**States**:
- **Default**: Solid color or border
- **Hover**: Color shift + glow (0 0 15px rgba(cyan, 0.4))
- **Active**: Slightly darker, no scale
- **Disabled**: Opacity 0.5, no pointer events

### 7. Card Pattern (General)
```
┌─────────────────────────────────────┐
│ ICON                                │
│ Bold Title                          │
│ Subtitle or description text        │
│ [ACTION →]                          │
└─────────────────────────────────────┘
```

**Design**:
- Background: Dark (#1f2937) or navy (#0a0e27)
- Border: 1px solid, cyan or transparent
- Padding: 1.5rem
- Border radius: 6px
- Box shadow: Subtle dark shadow (0 4px 12px rgba(0,0,0,0.3))
- Hover: Border glows, slight lift (transform: translateY(-4px))
- Transition: 200ms ease

---

## Animation Guidelines

### Durations
- **Quick interactions**: 150-200ms (button clicks, hover states)
- **Moderate transitions**: 300-400ms (card expansion, carousel slide)
- **Page transitions**: 400-500ms (fade-in content, section reveals)

### Easing
- **Default**: `ease-in-out` (smooth, professional)
- **Entrances**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight bounce)
- **Exits**: `cubic-bezier(0.34, 0.04, 0.64, 0.35)` (smooth deceleration)

### Key Animations
1. **Glow Effect**: Box-shadow pulse on hover (shadow expands, fades)
2. **Gradient Shift**: Background color transitions between palette colors
3. **Slide-Down**: Max-height 0 → full height for expand/collapse
4. **Fade-In**: Opacity 0 → 1 for content reveals
5. **Scale Pop**: Transform scale 0.95 → 1 for new cards
6. **Parallax**: Subtle Y-offset on scroll (10-15px depth)

### Performance
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `left`, `top`
- Use `will-change: opacity, transform` on animated elements

---

## Layout & Spacing

### Breakpoints
- **Mobile**: 0-640px (1 column)
- **Tablet**: 641-1024px (2 columns)
- **Desktop**: 1025px+ (3+ columns)

### Container
- **Max Width**: 1400px
- **Padding**: 1.5rem mobile, 2rem tablet, 3rem desktop
- **Gap**: 1.5rem between sections

### Grid System
- **Base Unit**: 0.5rem (8px)
- **Spacing Scale**: 0.5, 1, 1.5, 2, 3, 4, 6rem
- **12-column grid** on desktop, 6 on tablet, 4 on mobile

---

## State & Feedback

### Interactive States
| State | Style | Duration |
|-------|-------|----------|
| **Hover** | Border glow + scale 1.05 | 200ms |
| **Active/Pressed** | Darker shade + no scale | instant |
| **Focus** | Cyan outline (4px) | 150ms |
| **Disabled** | 50% opacity, no interaction | — |
| **Loading** | Animated spinner (cyan), text fade | loop |
| **Error** | Red border + icon, error text | 300ms |
| **Success** | Lime green checkmark, text fade | 400ms |

### Loading Indicator
- Animated spinner: Rotating cyan circle (2s loop)
- Glow: Pulsing outer ring effect
- Text: "Loading..." with trailing dot animation

---

## Imagery & Visual Assets

### Hero Background
- Option 1: Dark navy with subtle animated gradient mesh
- Option 2: Low-opacity sci-fi space texture (stars, nebula)
- Option 3: Geometric grid pattern (fades in/out)
- Overlay: Semi-transparent (to keep text readable)

### Icons
- **Style**: Minimal, monoline, consistent 2px stroke weight
- **Size**: 24px (body), 48px (hero/card), 16px (buttons)
- **Color**: Cyan (#00d9ff) primary, lime/purple accents
- **Hover**: Slight color shift or glow

### 3D Models
- Display on detail pages only (not home v2)
- Lighting: Bright key light + fill, dark ambient
- Background: Transparent or subtle dark texture

---

## Implementation Notes

### CSS Framework Compatibility
- **Tailwind CSS**: Highly compatible (custom config for new palette)
- **SCSS/CSS-in-JS**: Full control, recommended for complex animations
- **Ionic**: Component overrides for modern look

### Font Loading
```
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500;700;900&display=swap');
```

### Dark Mode
- Primary design IS dark mode (no light theme needed initially)
- Fallback: Respect `prefers-color-scheme` for OS-level overrides

### Accessibility
- **Contrast**: All text meets WCAG AA (4.5:1 minimum)
- **Focus Indicators**: Cyan outline, 2-4px, visible on all interactive elements
- **Animations**: Respect `prefers-reduced-motion` (disable transforms)
- **Touch Targets**: Min 44x44px for buttons/interactive areas

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-dark-navy: #0a0e27;
  --color-cyan: #00d9ff;
  --color-purple: #7c3aed;
  --color-lime: #a4fc31;
  --color-text-light: #e5e7eb;
  --color-text-muted: #9ca3af;
  --color-bg-dark: #1f2937;

  /* Typography */
  --font-display: 'Space Mono', monospace;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Courier New', monospace;

  /* Spacing */
  --spacing-unit: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;

  /* Animation */
  --duration-quick: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --easing-ease: ease-in-out;

  /* Border Radius */
  --radius-sharp: 4px;
  --radius-normal: 6px;
  --radius-round: 12px;

  /* Shadows */
  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-glow: 0 0 20px rgba(0, 217, 255, 0.4);
}
```

---

## Visual Hierarchy

1. **Hero Title**: Largest, boldest, cyan glow
2. **Section Titles (H2)**: Large, bold, white
3. **Card Titles**: Medium, bold, white
4. **Body Text**: Regular, light gray
5. **Muted Text**: Small, medium gray
6. **Interactive Elements**: Cyan/lime accent, bold

---

## Summary

A **modern gaming/esports-inspired design** with:
- **Dark, spacious aesthetic** (navy/purple/cyan palette)
- **Bold, futuristic typography** (Space Mono display, Inter body)
- **Minimal, sharp components** with glowing accents
- **Moderate animations** (200-400ms transitions, no jank)
- **Gaming audience appeal** (high contrast, action-oriented, EVE Online vibes)
- **Accessible & performant** (WCAG AA, GPU animations, fast load)
