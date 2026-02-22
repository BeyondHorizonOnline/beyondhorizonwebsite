# Beyond Horizon - Unified Style Guide

**Project**: Beyond Horizon (Ionic Angular Sci-Fi Game/Universe Content Platform)
**Framework**: Angular 21 (Standalone) + Ionic 8 + Three.js
**Design System**: EVE Online-inspired, cyberpunk/sci-fi aesthetic
**Last Updated**: 2025-02-21

---

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components & UI Elements](#components--ui-elements)
5. [Icons & Imagery](#icons--imagery)
6. [Animation & Motion](#animation--motion)
7. [Branding](#branding)
8. [Cross-Platform Consistency](#cross-platform-consistency)
9. [Three-Tier Glow Hierarchy](#three-tier-glow-hierarchy)
10. [Design Patterns](#design-patterns)

---

## Colors

### Color Palette (CSS Variables)

All colors are defined in **`src/theme/modern-design-system.scss`** and inherit via CSS custom properties.

#### Primary Base Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-dark-navy` | `#050812` | rgb(5, 8, 18) | Primary background | Ultra-deep black, app canvas |
| `--color-dark-navy-light` | `#0d1425` | rgb(13, 20, 37) | Secondary background | Containers, deep surfaces |
| `--color-black` | `#000000` | rgb(0, 0, 0) | Deepest layer | Maximum darkness, layering |
| `--color-charcoal` | `#1a1f2e` | rgb(26, 31, 46) | Cards, containers | Card backgrounds, overlays |

#### Primary Action Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-cyan` | `#00ffff` | rgb(0, 255, 255) | **Primary action, interactive** | Buttons, hover states, CTAs, focus rings |
| `--color-cyan-dark` | `#00ccdd` | rgb(0, 204, 221) | Hover/dark mode | Used on hover state transitions |

#### Secondary Accent Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-purple` | `#b740d9` | rgb(183, 64, 217) | Secondary accent, alternative CTA | Secondary interactive elements |
| `--color-purple-dark` | `#9d2bba` | rgb(157, 43, 186) | Hover/dark mode | Purple hover states |

#### Warning & Combat Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-red` | `#ff4444` | rgb(255, 68, 68) | Danger, errors, combat-related | Error messages, destructive actions |
| `--color-orange` | `#ff8c00` | rgb(255, 140, 0) | Warning, caution | Warnings, alerts, secondary danger |

#### Premium & Rare Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-gold` | `#ffc700` | rgb(255, 199, 0) | Premium, rare, elite items | Special ship classes, unique elements |
| `--color-amber` | `#ffb000` | rgb(255, 176, 0) | Hover/dark mode | Gold hover states |

#### Technical & System Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-teal` | `#00d9d9` | rgb(0, 217, 217) | Technical elements, info | System info, technical UI |
| `--color-teal-dark` | `#00a8a8` | rgb(0, 168, 168) | Hover/dark mode | Teal hover states |

#### Text & Contrast Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-text-light` | `#ffffff` | rgb(255, 255, 255) | Primary text, headings | Main content, high contrast |
| `--color-text-secondary` | `#e0e0e0` | rgb(224, 224, 224) | Secondary text | Subheadings, body copy |
| `--color-text-muted` | `#909090` | rgb(144, 144, 144) | Muted text, captions | Tags, chips, secondary info |
| `--color-text-muted-dark` | `#606060` | rgb(96, 96, 96) | Very muted text | Disabled states, hints |

#### Background Colors

| Variable | Hex Value | RGB | Usage | Notes |
|----------|-----------|-----|-------|-------|
| `--color-bg-dark` | `#0f131f` | rgb(15, 19, 31) | Dark container background | Card backgrounds, containers |
| `--color-bg-darker` | `#0a0e1a` | rgb(10, 14, 26) | Even darker background | Deep containers, modals |

#### Semantic Colors

| Variable | Hex Value | Usage | Maps To |
|----------|-----------|-------|---------|
| `--color-success` | `#00ffff` | Positive/success feedback | Cyan (NO GREEN) |
| `--color-warning` | `#ff8c00` | Warning messages | Orange |
| `--color-error` | `#ff4444` | Error states | Red |
| `--color-info` | `#00d9d9` | Informational | Teal |

### Legacy Variable System (src/theme/variables.scss)

For backwards compatibility, some older tokens still exist:

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--app-bg` | `#0b0b0c` | Legacy app background |
| `--app-surface` | `#131316` | Legacy surface color |
| `--app-surface-2` | `#1a1b1f` | Legacy secondary surface |
| `--app-border` | `#23242a` | Legacy border color |
| `--app-text` | `#eceef1` | Legacy text color |
| `--app-text-dim` | `#b9bec6` | Legacy dimmed text |
| `--app-text-muted` | `#9096a1` | Legacy muted text |
| `--app-accent` | `#ffd166` | Legacy warm accent (gold/amber) |
| `--app-success` | `#2bd08f` | Legacy success (green) |
| `--app-warning` | `#ffb454` | Legacy warning (amber) |
| `--app-danger` | `#ff6b6b` | Legacy danger (red) |

### Elite Dangerous Theme Variant (src/global.scss)

An optional `.theme-ed` class provides an Elite Dangerous HUD-inspired theme:

| Variable | Hex Value | Usage |
|----------|-----------|-------|
| `--ed-amber` | `#ff9f1a` | Primary accent (amber) |
| `--ed-amber-soft` | `#ffb74a` | Soft amber variant |
| `--ed-amber-dim` | `#c97a15` | Dimmed amber |
| `--ed-panel` | `#0b0f12` | Panel background |
| `--ed-panel-2` | `#0e1418` | Slightly lighter panel |

### Glow Effects (Text-Shadow & Box-Shadow)

Located in **`src/theme/modern-design-system.scss`** (lines 110-119):

#### Cyan Glow Family

```scss
--shadow-glow-cyan:
  0 0 15px rgba(0, 255, 255, 0.4),
  0 0 30px rgba(0, 255, 255, 0.2);

--shadow-glow-cyan-strong:
  0 0 30px rgba(0, 255, 255, 0.6),
  0 0 60px rgba(0, 255, 255, 0.3),
  0 0 90px rgba(0, 255, 255, 0.15);
```

#### Purple Glow Family

```scss
--shadow-glow-purple:
  0 0 20px rgba(183, 64, 217, 0.5),
  0 0 40px rgba(183, 64, 217, 0.3);

--shadow-glow-purple-strong:
  0 0 40px rgba(183, 64, 217, 0.7),
  0 0 80px rgba(183, 64, 217, 0.4);
```

#### Gold Glow Family

```scss
--shadow-glow-gold:
  0 0 20px rgba(255, 199, 0, 0.4),
  0 0 40px rgba(255, 199, 0, 0.2);

--shadow-glow-gold-strong:
  0 0 40px rgba(255, 199, 0, 0.6),
  0 0 80px rgba(255, 199, 0, 0.3);
```

#### Red Glow Family

```scss
--shadow-glow-red:
  0 0 20px rgba(255, 68, 68, 0.4),
  0 0 40px rgba(255, 68, 68, 0.2);

--shadow-glow-red-strong:
  0 0 40px rgba(255, 68, 68, 0.6),
  0 0 80px rgba(255, 68, 68, 0.3);
```

#### Teal Glow

```scss
--shadow-glow-teal:
  0 0 20px rgba(0, 217, 217, 0.4),
  0 0 40px rgba(0, 217, 217, 0.2);
```

### Standard Shadows (Depth)

```scss
--shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.6);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.7);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.8);
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.9);
--shadow-inner: inset 0 0 20px rgba(0, 0, 0, 0.8);
```

### Dark Mode / Light Mode Support

- **Current Implementation**: Dark mode only (system default via `@import '@ionic/angular/css/palettes/dark.system.css'`)
- **Light Mode**: Not implemented; the entire app is dark-first
- **Accessibility**: Respects `prefers-reduced-motion` media query for users who prefer minimal animation

---

## Typography

### Font Families

Loaded via **Google Fonts** in `src/global.scss` (line 29):

```scss
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
```

#### Primary UI Font

- **Font**: Space Grotesk
- **Weights Available**: 400, 500, 600, 700
- **Usage**: Display, headings, body text, UI elements
- **CSS Variable**: `--font-display`, `--font-body`
- **Fallback Chain**: `'Space Grotesk', 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

#### Monospace / Code Font

- **Font**: JetBrains Mono
- **Weights Available**: 400, 600, 700
- **Usage**: Code blocks, technical elements, timestamps, metadata
- **CSS Variable**: `--font-mono`
- **Fallback Chain**: `'JetBrains Mono', 'Courier New', monospace`

### Font Sizes (CSS Variables)

All sizes use `rem` units (base: 16px = 1rem) for accessibility and responsiveness:

| Variable | Size | Pixel Equivalent | Usage |
|----------|------|------------------|-------|
| `--fs-hero` | 4rem | 64px | Hero title (largest) |
| `--fs-h1` | 3rem | 48px | Page titles, main heading |
| `--fs-h2` | 2rem | 32px | Section headings |
| `--fs-h3` | 1.5rem | 24px | Subsection headings, card titles |
| `--fs-body-lg` | 1.125rem | 18px | Large body text, callouts |
| `--fs-body` | 1rem | 16px | **Primary body text** |
| `--fs-small` | 0.875rem | 14px | Smaller text, secondary info |
| `--fs-caption` | 0.75rem | 12px | Captions, metadata, timestamps |

### Font Weights

| Variable | Weight | Usage |
|----------|--------|-------|
| `--fw-normal` | 400 | Body text, regular content |
| `--fw-medium` | 500 | Emphasized text, labels |
| `--fw-bold` | 700 | **Headings, strong emphasis** |
| `--fw-black` | 900 | Display text, hero titles (rarely used) |

### Line Heights

| Variable | Value | Usage |
|----------|-------|-------|
| `--lh-tight` | 1.1 | Headings, display text (compact) |
| `--lh-snug` | 1.2 | Headings, titles |
| `--lh-normal` | 1.5 | **Default body text** |
| `--lh-relaxed` | 1.6 | Card summaries, longer paragraphs (readable) |

### Letter Spacing

| Variable | Value | Usage |
|----------|-------|-------|
| `--ls-tight` | -0.02em | Headings (condensed feel) |
| `--ls-normal` | 0 | Standard text |
| `--ls-wide` | 0.05em | Labels, captions (spacious feel) |

### Typography Scale Summary

```
Hero:       fs-hero (64px) | fw-black | lh-tight | ls-tight
H1:         fs-h1 (48px)   | fw-black | lh-snug  | ls-tight
H2:         fs-h2 (32px)   | fw-bold  | lh-snug  | ls-tight
H3:         fs-h3 (24px)   | fw-bold  | lh-normal | ls-normal
Body (lg):  fs-body-lg (18px) | fw-normal | lh-relaxed | ls-normal
Body:       fs-body (16px) | fw-normal | lh-normal | ls-normal
Small:      fs-small (14px) | fw-normal | lh-normal | ls-normal
Caption:    fs-caption (12px) | fw-normal | lh-normal | ls-wide
```

### Responsive Typography (Clamp)

In `src/theme/global.scss`, some typography uses CSS `clamp()` for fluid scaling:

- **Display/H1**: Scales between viewport widths for mobile-to-desktop responsiveness
- **Body**: Fixed size (1rem / 16px) across all viewports
- **Small**: Fixed size (0.875rem / 14px) across all viewports

---

## Spacing & Layout

### Spacing Scale (8px Baseline)

All spacing derives from an 8px baseline unit system, defined in `src/theme/modern-design-system.scss`:

| Variable | Size | Pixel Equivalent | Usage |
|----------|------|------------------|-------|
| `--spacing-xs` | 0.25rem | 4px | Minimal gaps, micro-spacing |
| `--spacing-sm` | 0.5rem | 8px | **Standard small spacing** (component padding) |
| `--spacing-md` | 1rem | 16px | **Standard spacing** (padding, margins) |
| `--spacing-lg` | 1.5rem | 24px | **Standard large spacing** (section padding) |
| `--spacing-xl` | 2rem | 32px | Large sections, major spacing |
| `--spacing-2xl` | 3rem | 48px | Hero sections, major breaks |
| `--spacing-3xl` | 4rem | 64px | Full page sections, hero padding |

### Legacy Spacing Scale (src/theme/variables.scss)

Older tokens (still in use in some components):

| Variable | Size | Usage |
|----------|------|-------|
| `--space-1` | 8px | Minimal spacing |
| `--space-2` | 12px | Compact spacing |
| `--space-3` | 16px | Standard spacing |
| `--space-4` | 20px | Standard spacing |
| `--space-5` | 24px | Standard spacing |
| `--space-6` | 32px | Large spacing |
| `--space-7` | 40px | Larger spacing |
| `--space-8` | 56px | Very large spacing |
| `--space-9` | 72px | Massive spacing |

### Border Radius

| Variable | Size | Usage |
|----------|------|-------|
| `--radius-sharp` | 4px | Sharp corners (rare) |
| `--radius-normal` | 6px | Standard buttons, minor elements |
| `--radius-round` | 12px | **Most components** (cards, buttons) |

### Grid System

#### 12-Column Grid (`.vds-grid` utility)

- **Column Count**: 12 columns (responsive)
- **Gap**: Uses spacing variables (typically `--spacing-md` / 16px)
- **Breakpoints**:
  - **Desktop (>1024px)**: Full 12-column grid
  - **Tablet (768-1024px)**: Adjusted layout
  - **Mobile (<768px)**: Single column or 2-column layout

#### Standard Container Width

- **Max Width**: 1400px (large screens)
- **Padding**: `--spacing-2xl` (48px) on sides
- **Layout Pattern**: Flex container with `justify-content: center` and `align-items: center`

### Breakpoints

Defined in **`src/theme/modern-design-system.scss`** and component SCSS files:

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Mobile | < 640px | Single column, full width |
| Tablet | 640px - 1024px | 2-3 column layouts, adjusted spacing |
| Desktop | > 1024px | Full 12-column grid, max-width containers |

### Toolbar Height Constant

- **Variable**: `--vds-toolbar-h`
- **Value**: 56px
- **Usage**: Header/navigation bar height, used for offset calculations in layouts

---

## Components & UI Elements

### Design System Prefix

All reusable components use the **`vds-`** prefix (Visual Design System):
- Example: `vds-card`, `vds-header`, `vds-hero`, `vds-badge`
- Exception: `bh-model-viewer` (specialized 3D viewer, uses `bh-` prefix)

### Core Components

#### 1. **vds-card** (Primary Content Card)
**File**: `src/app/components/vds-card/vds-card.component.scss` (179 lines)

**Structure**:
- Card wrapper with gradient background
- Optional thumbnail (16:9 aspect ratio, lazy load)
- Content section with padding
- Title (h3), summary (text-muted), tags/chips
- Internal flex layout with grow space

**States**:

| State | Styling |
|-------|---------|
| **At Rest** | Navy gradient bg (rgba 10-22, 0.9-0.95), white border (0.08 opacity), no glow |
| **Hover** | TranslateY(-3px) lift, border → cyan (0.4 opacity), glow: cyan 0.2 opacity |
| **Title on Hover** | Transitions to cyan color (Tier-2 feedback) |
| **Tags/Chips** | White border (0.1 opacity), transitions to cyan on parent hover |
| **Loading** | Spinner animation while image loads |

**CSS Classes**:
- `.card` - Card container
- `.card-thumbnail` - Image wrapper
- `.card-content` - Content section
- `.card-title` - h3 element
- `.card-summary` - Summary text
- `.card-tags` - Tag/chip container

---

#### 2. **vds-header** (Navigation Header)
**File**: `src/app/components/vds-header/vds-header.component.scss` (315 lines)

**Structure**:
- Top navigation bar with logo/brand, nav buttons, login/profile
- Optional dropdown menu
- Responsive hamburger menu for mobile

**Variants**:

| Variant | Opacity | Blur | Usage |
|---------|---------|------|-------|
| **default** | 0.8-0.95 | 10px | Standard pages, dark opaque header |
| **hero** | 0.35-0.15 | 10px | Hero pages (e.g., /home-v2) blends with starfield |

**Hero Variant Specifics** (per CLAUDE.md):

| Screen Size | Opacity Range | Blur | Font Weight |
|------------|---------------|------|------------|
| Desktop (>1024px) | 0.35-0.15 | 10px | Brand: 800, Nav: 400 |
| Tablet (768-1024px) | 0.5-0.3 | 16px | Brand: 800, Nav: 400 |
| Mobile (<768px) | 0.6-0.4 | 14px | Brand: 800, Nav: 400 |

**Styling Details**:
- **Brand**: Font weight 800, letter spacing 0.08em, color white
- **Nav Buttons**: Color rgba(224, 224, 224) at rest, 75% opacity, transitions to cyan on hover
- **Hover State**: Cyan border + cyan text + Tier-2 glow (0.15-0.3 opacity)
- **Active State**: Same as hover
- **No text-shadow** on brand or nav buttons (only hero title has Tier-3)
- **Gradient fades**: 20% fade zone on hero variant (soft transparent edge)

**Responsive Behavior**:
- Hide nav menu buttons on mobile (<640px), show hamburger instead
- Dropdown menu: Fixed position, gradient bg, cyan border, scales with viewport

---

#### 3. **vds-footer** (Ethereal Footer)
**File**: `src/app/components/vds-footer/vds-footer.component.scss` (75 lines)

**Design Philosophy**: Footer must NOT "box in" the hero content. Uses Tier-1 ambient only.

**Styling**:
- **Opacity**: 0.15-0.08 (nearly invisible, doesn't obscure background)
- **Blur**: 8px (minimal, lets starfield show through)
- **Background**: Linear gradient fade to transparent (NO hard borders)
- **Text**: 0.5 opacity at rest, increases to 1.0 on hover (Tier-1 ambient)
- **Shadow**: NONE (no depth, weightless design)
- **Border**: NONE (no hard edges, use gradient fades instead)
- **Padding**: 8px block (thinner than header's 18px)

**Links**: Hover state reveals cyan color with minimal text-shadow

---

#### 4. **vds-hero** (Hero Section)
**File**: `src/app/components/vds-hero/vds-hero.component.scss` (94 lines)

**Structure**:
- Full section with gradient background + teal tint (0.05 opacity)
- Optional background image (::before pseudo, 0.22 opacity)
- Scanlines effect (::after pseudo, repeating-linear-gradient, screen blend mode)
- Logo, H1, P text, CTA buttons (flex row with 12px gap)

**Responsive Adjustments**:
- **Desktop**: 64px padding, large font sizes
- **Mobile**: 36px padding, responsive font sizes, flex-wrap for buttons

---

#### 5. **vds-badge** (Series/Category Badge)
**File**: `src/app/components/vds-badge/vds-badge.component.scss` (stub)

**Badge Types** (from seed data):

| Badge | Series | Color | Usage |
|-------|--------|-------|-------|
| VX | Voran Defense | Cyan | Military-style ships |
| CX | Commercial | Gold | Cargo, trade ships |
| BX | Special/Unique | Purple | One-off ships |
| EX | Exploration | Silver | Explorer ships |
| MX | Military | Red | Combat ships |
| HX | Exotic/Rare | Cyan | Rare, special ships |

**Styling**: Thin borders, muted white text (0.7 opacity), no glow at idle

---

#### 6. **vds-poster** (Image/Poster Display)
**File**: `src/app/components/vds-poster/vds-poster.component.scss`

Used for displaying large images with optional overlays, rounded corners, filters.

---

#### 7. **vds-tag-list** (Tag/Chip Display)
**File**: `src/app/components/vds-tag-list/vds-tag-list.component.scss`

Displays comma-separated or space-separated tags/chips. Styling:
- **At Rest**: White text (0.7 opacity), white border (0.1 opacity)
- **Hover**: Transitions to cyan, slight scale

---

#### 8. **vds-skeleton** (Loading Placeholder)
**File**: `src/app/components/vds-skeleton/vds-skeleton.component.scss`

Shows while content loads. Typically a dark rectangle with subtle animation.

---

#### 9. **vds-spec-grid** (Statistics Grid)
**File**: `src/app/components/vds-spec-grid/vds-spec-grid.component.scss`

Grid layout for displaying ship specs, stats (health, shields, energy, etc.). Uses:
- 2-4 column layout (responsive)
- Label + Value structure
- Muted text for labels, bright text for values

---

#### 10. **vds-search-bar** (Search/Filter Input)
**File**: `src/app/components/vds-search-bar/vds-search-bar.component.scss`

Search input with optional filter controls. Styling:
- **Background**: Dark with cyan border on focus
- **Text**: Light text on dark background
- **Placeholder**: Muted text
- **Focus State**: Cyan glow, border highlight

---

#### 11. **vds-nav-hub** (Navigation Hub)
**File**: `src/app/components/vds-nav-hub/vds-nav-hub.component.scss`

Grid of navigation cards (each a `.nav-card`). Responsive: `auto-fit minmax(280px, 1fr)`

---

#### 12. **vds-quick-facts** (Quick Facts Widget)
**File**: `src/app/components/vds-quick-facts/vds-quick-facts.component.scss`

Small cards displaying key facts or stats. Similar styling to main cards but more compact.

---

#### 13. **vds-system-card** (Station/System Card)
**File**: `src/app/components/vds-system-card/vds-system-card.component.scss`

Variant of card for displaying stations, systems, or facilities.

---

#### 14. **vds-cta-section** (Call-to-Action Section)
**File**: `src/app/components/vds-cta-section/vds-cta-section.component.scss`

Large hero-like section with gradient background + inset glow effect. Typically contains heading, description, and CTA button.

---

#### 15. **vds-asset-carousel** (Image Carousel)
**File**: `src/app/components/vds-asset-carousel/vds-asset-carousel.component.scss`

Image carousel with optional content overlay. Responsive flex layout.

---

#### 16. **bh-model-viewer** (3D Model Viewer)
**File**: `src/app/components/bh-model-viewer/model-viewer.component.scss`

Three.js-powered 3D viewer for GLB/GLTF models. Features:
- Canvas container, full width
- OrbitControls for user interaction
- Auto-scaling based on model bounding box
- Lighting rig (3-point: ambient, key, fill, rim)
- Event-driven rendering (no requestAnimationFrame loop)

---

### Button Styles

#### Primary Button (`.btn-primary`)

```scss
background: linear-gradient(135deg, var(--color-cyan), var(--color-teal));
color: #000;
border: none;
border-radius: var(--radius-round);
font-weight: var(--fw-bold);
padding: var(--spacing-md) var(--spacing-lg);
box-shadow: var(--shadow-glow-cyan);
transition: all var(--duration-normal) var(--easing-ease);

&:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-glow-cyan-strong);
}
```

#### Secondary Button (`.btn-secondary`)

```scss
background: transparent;
border: 2px solid var(--color-cyan);
color: var(--color-cyan);
border-radius: var(--radius-round);
padding: var(--spacing-md) var(--spacing-lg);
transition: all var(--duration-normal) var(--easing-ease);

&:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: var(--shadow-glow-cyan);
}
```

#### Tertiary Button (`.btn-tertiary`)

```scss
background: transparent;
border: none;
color: var(--color-text-light);
padding: var(--spacing-sm);
transition: color var(--duration-normal) var(--easing-ease);

&:hover {
  color: var(--color-cyan);
}
```

### Input States

| State | Styling |
|-------|---------|
| **Default** | Dark background, light border, muted text |
| **Focus** | Cyan border, cyan glow, placeholder fades |
| **Disabled** | Gray text (var(--color-text-muted-dark)), no border glow |
| **Error** | Red border, red glow, error message below |
| **Success** | Cyan border (same as focus), no additional glow |

---

## Icons & Imagery

### Icon Set

**Provider**: Ionicons (pre-loaded in `src/main.ts`)

```typescript
addIcons(allIcons); // All ionicons available globally
```

**Common Icons Used**:
- Navigation: `chevron-forward`, `chevron-back`, `menu`, `close`
- Actions: `search`, `settings`, `login`, `logout`, `person`
- Status: `checkmark-circle`, `alert-circle`, `information-circle`
- Social: `logo-github`, `logo-twitter`, etc.

**Styling**:
- Icon color: Inherits from parent text color
- On hover (card, button): Transitions to cyan
- Size: Typically 24px-32px (set via `ion-icon` size attribute)

### Image Styling

#### Card Thumbnails (16:9 Aspect Ratio)

- **Container**: `position: relative; padding-bottom: 56.25%;` (16:9)
- **Image**: `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`
- **Object Fit**: `cover` (fills container, crops if needed)
- **Loading**: Fade-in animation (opacity 0 → 1) via lazy-loading library
- **Hover**: Slight scale (1.02x) to give depth effect

#### Background Images

- **Filter**: `opacity: 0.22` (very muted, stays in background)
- **Blend Mode**: `normal` (overlaid with colored gradients)
- **Use Case**: Hero sections, page backgrounds

#### Image Overlays

- **Gradient Overlay**: Dark gradient (bottom-to-top fade) for text contrast
- **Scanlines**: Repeating horizontal lines (screen blend mode) for sci-fi effect

---

## Animation & Motion

### Easing Curves

Defined in **`src/theme/modern-design-system.scss`** (lines 92-96):

| Variable | Value | Usage |
|----------|-------|-------|
| `--easing-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | **Standard** (most animations) |
| `--easing-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating motion (entrance) |
| `--easing-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating motion (exit) |
| `--easing-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth entrance + exit |
| `--easing-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy/springy effect |

### Transition Durations

| Variable | Duration | Usage |
|----------|----------|-------|
| `--duration-quick` | 150ms | Fast feedback (hover, focus) |
| `--duration-normal` | 300ms | **Standard** (most transitions) |
| `--duration-slow` | 500ms | Slower, emphasis animations |

### Keyframe Animations

#### @keyframes gradient-shift

```scss
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```
**Usage**: Animated gradient backgrounds (6s loop)

#### @keyframes fade-in-up

```scss
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
**Duration**: 800ms
**Usage**: Element entrance animations

#### @keyframes glow-pulse

```scss
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 1); }
}
```
**Usage**: Pulsing glow effects

#### @keyframes glow-pulse-slow

```scss
@keyframes glow-pulse-slow {
  0%, 100% {
    opacity: 0.5;
    filter: blur(4px);
  }
  50% {
    opacity: 1;
    filter: blur(8px);
  }
}
```
**Duration**: 6s
**Usage**: Ambient glow breathing effect

### Standard Transitions

| Trigger | Properties | Duration | Easing | Notes |
|---------|-----------|----------|--------|-------|
| Hover | `all` | 300ms | ease | Most interactive elements |
| Focus | `border, box-shadow` | 150ms | ease | Input focus ring |
| Click/Active | `transform` | 100ms | ease | Button scale-down effect |

### Accessibility: Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Effect**: Disables all animations for users with motion sensitivity preferences.

---

## Branding

### Logo

**Storage**: `src/assets/` (exact path not specified in codebase, typically in `/images/` or `/logos/`)

**Usage Contexts**:
- Header brand element (small, ~48-56px height)
- Hero section logo (large, 220-520px width via clamp, responsive)
- Footer (small, optional)

**Styling**:
- **Header**: Simple image, may have drop-shadow or glow
- **Hero**: Large, with `drop-shadow()` filter effect
- **Responsive**: Uses `clamp()` for fluid sizing across viewports

### Brand Colors

**Primary Colors**:
- **Cyan** (`#00ffff`) - Primary action, interactive, sci-fi feel
- **Dark Navy** (`#050812`) - Primary background, prestige
- **White** (`#ffffff`) - Contrast, readability

**Secondary Colors**:
- **Purple** (`#b740d9`) - Alternative accent, rare/special
- **Gold** (`#ffc700`) - Premium, elite
- **Teal** (`#00d9d9`) - Technical, system info

**Anti-Branding**:
- **No green** (semantic colors use cyan instead of green for success)
- **No typical tech grays** (uses dark navy and charcoal for depth)

### Visual Identity

- **Aesthetic**: EVE Online-inspired sci-fi/cyberpunk
- **Tone**: Elite, futuristic, technical, premium
- **Patterns**: Gradients, glows, scanlines, subtle animations
- **Typography**: Modern geometric (Space Grotesk) + technical monospace (JetBrains Mono)

### Brand Guidelines Reference

Documentation in **CLAUDE.md** (project instructions) includes:
- Three-Tier Glow Hierarchy (Tier 1-3 intensity levels)
- Header-Hero Blend Pattern (hero variant opacity rules)
- Footer Ethereal Treatment (minimal visual weight)
- Card Styling Rules (quiet, clean, cyan-only aesthetic)
- Design Philosophy (optical hierarchy, minimal weight, gradient fades)

---

## Cross-Platform Consistency

### Web Only

This project is **web-focused** only (no Unity game):

- **Framework**: Angular 21 (web browser)
- **UI Framework**: Ionic 8 (web components)
- **Deployment**: Firebase Hosting
- **Capacitor**: Configured but web-focused (not native mobile)

### Responsive Design (Web)

**Breakpoints**:
- **Mobile**: < 640px (single column, full width)
- **Tablet**: 640px - 1024px (2-3 columns, adjusted spacing)
- **Desktop**: > 1024px (full 12-column grid, max-width 1400px)

**Viewport Meta Tag**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Responsive Units**:
- **Typography**: `rem` (scales with user's font size preference)
- **Spacing**: `rem`-based (inherits from 16px root)
- **Fluid Sizing**: `clamp()` for responsive typography (hero titles, headings)
- **Layout**: Flexbox + CSS Grid for adaptive layouts

### Ionic Dark Mode Support

- **System Default**: Respects OS dark/light mode preference
- **Import**: `@import '@ionic/angular/css/palettes/dark.system.css'`
- **Fallback**: Light mode not explicitly styled (dark-first design)

### Accessibility

**Implemented**:
- **Semantic HTML**: Proper heading hierarchy (h1-h3)
- **Color Contrast**: All text meets WCAG AA standards (dark navy bg + cyan/white text = high contrast)
- **Focus Rings**: Visible cyan focus ring on interactive elements
- **Keyboard Navigation**: All buttons/links keyboard accessible
- **Reduced Motion**: `prefers-reduced-motion` media query honored
- **Icon Labels**: All Ionicons have implicit labels via `<ion-icon>` accessibility

**Not Implemented**:
- Light mode (dark-first design)
- High contrast mode variant
- ARIA labels (relies on semantic HTML)

### Performance Considerations

**Image Optimization**:
- Lazy loading for card thumbnails
- WebP format support (if configured)
- Optimized dimensions for different breakpoints

**Bundle Size**:
- Ionicons pre-loaded in `src/main.ts` (tree-shaking enabled)
- Google Fonts subsetted (only used weights: 400, 500, 600, 700)
- CSS-in-JS limited (SCSS compiled to static CSS)

---

## Three-Tier Glow Hierarchy

**Critical Design Principle**: All visual effects follow a strict three-tier glow system to maintain visual hierarchy. **Never break this ordering.**

| Tier | Purpose | Opacity Range | Components | Rule |
|------|---------|----------------|-----------|------|
| **Tier 3** | Hero CTAs, titles | 0.5–1.0 | Hero title text-shadow, main CTA buttons | **Only the main call-to-action.** Everything else must be dimmer. |
| **Tier 2** | Interactive feedback | 0.15–0.3 | Nav button hover/active, card hover, focus states | **Sharp, clear glow on user interaction.** Interactive feedback only. |
| **Tier 1** | Ambient atmosphere | 0.01–0.03 | Header/footer glow, card borders at rest | **Barely perceptible.** Creates mood without competing for attention. |

**Implementation**:
- **Tier 3**: Use `box-shadow: var(--shadow-glow-cyan-strong)` or `text-shadow` with 0.6-1.0 opacity
- **Tier 2**: Use `box-shadow: var(--shadow-glow-cyan)` with 0.15-0.3 opacity on hover
- **Tier 1**: Use subtle border (0.08 opacity white) or minimal glow (0.01-0.03 opacity)

---

## Design Patterns

### Card Pattern (vds-card)

**Default State**:
- Navy gradient background (rgba(10, 22, 46) → rgba(5, 8, 18), 0.9 opacity)
- White border (0.08 opacity) — barely visible
- No glow, no color
- Minimal depth shadow only

**Hover State**:
- Lift: `transform: translateY(-3px)`
- Border: Brighten to cyan (0.4 opacity)
- Glow: Single cyan glow (0.2 opacity) — Tier-2 only, never strong
- Title: Transitions to cyan
- Tags: Transitions to cyan border

### Button Pattern (Primary)

**Default State**:
- Cyan gradient background
- Dark text (black or near-black)
- No glow at rest

**Hover State**:
- Scale: `transform: scale(1.05)`
- Glow: `var(--shadow-glow-cyan)` (Tier-2 opacity)

**Active/Pressed State**:
- Scale: `transform: scale(0.98)` (slight inset effect)
- Glow: Same or stronger than hover

### Input Pattern

**Default State**:
- Dark background with subtle border
- Placeholder text muted (0.7 opacity)
- No glow

**Focus State**:
- Cyan border (2px)
- Cyan glow (Tier-2 opacity)
- Placeholder fades out
- Clear focus ring visible

### Navigation Pattern

**Default State** (non-hero pages):
- Dark header (0.8-0.95 opacity)
- White text (nav items, 0.75 opacity)
- Cyan border at bottom

**Hero Variant** (hero pages):
- Semi-transparent (0.35-0.15 opacity on desktop)
- White text (0.75 opacity, lighter weight 400)
- Blends into starfield background

**Hover State**:
- Nav text → cyan
- Cyan border + subtle glow
- Tier-2 feedback only

### Hero Section Pattern

**Layout**:
- Full viewport height (`min-height: 100vh`)
- Gradient background (dark with colored tint)
- Optional background image (0.22 opacity overlay)
- Scanlines effect (repeating-linear-gradient, screen blend mode)
- Centered content (logo, h1, paragraph, CTA buttons)

**Responsive**:
- Desktop: 64px padding, large font sizes
- Mobile: 36px padding, responsive font sizes, flex-wrap buttons

### Card Grid Pattern (nav-hub)

**Layout**:
- CSS Grid with `auto-fit minmax(280px, 1fr)`
- Responsive columns (1 on mobile, 2-3 on tablet, 4+ on desktop)
- Gap: `var(--spacing-lg)` (24px)

**Children**:
- Each `.nav-card` extends `.card` pattern
- Icon, title, description, CTA arrow

---

## Implementation Checklist

When building new components or pages, ensure:

- [ ] **Colors**: Use CSS variables from `src/theme/modern-design-system.scss` (not hardcoded hex)
- [ ] **Typography**: Apply scale via `--fs-*`, `--fw-*`, `--lh-*` variables
- [ ] **Spacing**: Use `--spacing-*` scale (multiples of 8px)
- [ ] **Border Radius**: Use `--radius-*` variables (sharp/normal/round)
- [ ] **Shadows**: Use `--shadow-*` for depth, `--shadow-glow-*` for emphasis
- [ ] **Animations**: Use `--duration-*` and `--easing-*` variables, respect `prefers-reduced-motion`
- [ ] **Hover States**: Only Tier-2 glow on interactive elements (0.15-0.3 opacity)
- [ ] **Accessibility**: Visible focus ring, semantic HTML, adequate color contrast
- [ ] **Responsiveness**: Test at 320px, 768px, 1024px, 1440px breakpoints
- [ ] **Component Prefix**: Use `vds-` for design system components, `bh-` for specialized
- [ ] **Dark Mode**: Assume dark-only (dark navy background, light/cyan text)
- [ ] **Three-Tier Hierarchy**: Hero CTAs brightest, interactive feedback Tier-2, ambient Tier-1

---

## Quick Reference Links

### Key Files

- **Main Design System**: `src/theme/modern-design-system.scss` (908 lines)
- **Base Variables**: `src/theme/variables.scss`
- **Global Styles**: `src/global.scss`
- **Header Component**: `src/app/components/vds-header/`
- **Card Component**: `src/app/components/vds-card/`
- **Project Instructions**: `CLAUDE.md` (includes glow hierarchy, header pattern, footer treatment, card rules)

### External Resources

- **Ionicons**: https://ionicons.com/ (pre-loaded in app)
- **Google Fonts**: Space Grotesk & JetBrains Mono (loaded in `src/global.scss`)
- **Ionic Framework**: https://ionicframework.com/docs/
- **Angular**: https://angular.io/

---

**Document Version**: 1.0
**Last Updated**: 2025-02-21
**Maintained By**: Beyond Horizon Design System
