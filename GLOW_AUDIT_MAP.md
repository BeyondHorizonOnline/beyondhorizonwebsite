# Glow Audit Map - Complete Component Inventory

**Status:** Audit Complete - Ready for Implementation Lock
**Date:** December 8, 2025
**Purpose:** Define exact glow tier for every component to prevent overuse

---

## Global Components

### Header (vds-header)
```
Component: Ion Toolbar
├─ Idle State: TIER 1 AMBIENT (0 0 20px rgba(0, 255, 255, 0.05))
├─ Brand Text: NO GLOW (color only)
├─ Brand Monospace: NO GLOW (color only)
├─ Nav Buttons (idle): NO GLOW (color + border only)
├─ Nav Buttons (hover): TIER 2 (0 0 15px rgba(0, 255, 255, 0.3))
└─ Nav Buttons (focus): TIER 2 + outline
```

**Lock:** Header background = Tier 1 only. All text/buttons use color. Glow only on hover.

---

### Footer (vds-footer)
```
Component: Ion Toolbar
├─ Idle State: TIER 1 AMBIENT (0 0 20px rgba(0, 255, 255, 0.05))
├─ Footer Text: NO GLOW (color only)
├─ Footer Links (idle): NO GLOW (color only)
├─ Footer Links (hover): TIER 2 (0 0 8px rgba(0, 255, 255, 0.3))
├─ Footer Links (focus): TIER 2 + outline
├─ Version Label: NO GLOW (color only)
└─ Copyright Text: NO GLOW (color only)
```

**Lock:** Footer background = Tier 1 only. Links glow only on hover (Tier 2).

---

## Page Components

### Hero Section (home-v2)
```
Component: .hero-inner
├─ Hero Title: TIER 3 HERO (5-layer text-shadow with cyan + purple)
│  └─ text-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
│                  0 0 40px rgba(0, 255, 255, 0.3),
│                  0 0 60px rgba(183, 64, 217, 0.4),
│                  0 0 100px rgba(183, 64, 217, 0.15),
│                  0 2px 10px rgba(0, 0, 0, 0.8)
├─ Hero Subtitle: NO GLOW (color only)
├─ Hero Background: TIER 1 AMBIENT (background gradients, very subtle)
└─ CTA Buttons: TIER 3 PRIMARY (see button section)
```

**Lock:** Hero title is THE most glowing element on page. Subtitle has zero glow. Background ambient only.

---

## Content Components

### Cards (vds-card, nav-hub, etc.)

#### Card at Idle/Rest State
```
Component: .card
├─ Background: gradient (no glow)
├─ Border: 1px solid rgba(0, 255, 255, 0.2) (no glow)
├─ Box Shadow: 0 8px 24px rgba(0, 0, 0, 0.8) ONLY (depth, NO color glow)
├─ Hairline Top Border (::before): NO GLOW (color only, appears on hover)
├─ Card Title (h3): NO GLOW (color only)
└─ Card Description: NO GLOW (color only)
```

**Lock:** Cards have ZERO glow when at rest. Only depth shadow allowed.

#### Card on Hover/Focus State
```
Component: .card:hover
├─ Box Shadow: 0 12px 40px rgba(0, 0, 0, 0.7),
│              var(--shadow-glow-cyan-strong)  [TIER 2]
├─ Hairline Top Border (::before): TIER 2 (0 0 8px rgba(0, 255, 255, 0.3) opacity)
├─ Card Title: text-shadow 0 0 12px rgba(0, 255, 255, 0.3) [TIER 2]
├─ Transform: translateY(-6px)
└─ Focus Outline: 2px solid var(--color-cyan)
```

**Lock:** Glow appears ONLY on hover/focus. Tier 2 strength.

---

### Buttons

#### Primary Button - TIER 3 CTA (Only for main CTAs like "Download Game")
```
Component: .btn-primary
├─ Idle State:
│  ├─ Background: linear-gradient(cyan to lighter cyan)
│  ├─ Box Shadow: 0 0 40px rgba(0, 255, 255, 0.5),
│  │              0 0 80px rgba(0, 255, 255, 0.3) [TIER 3]
│  ├─ Arrow Text: color + text-shadow 0 0 8px rgba(0, 255, 255, 0.3)
│  └─ Border: 1px solid var(--color-cyan)
│
├─ Hover State:
│  ├─ Background: gradient to purple
│  ├─ Box Shadow: var(--shadow-glow-purple-strong) [TIER 3 stronger]
│  ├─ Arrow: slide-right + glow
│  └─ Scale: 1.05
│
└─ Focus State:
   ├─ Outline: 2px solid var(--color-cyan)
   └─ Keep Tier 3 glow + outline
```

**Lock:** Only use Tier 3 on PRIMARY CTAs (max 2-3 per page). These are the hero buttons.

#### Secondary Button - TIER 2 Interactive
```
Component: .btn-secondary
├─ Idle State:
│  ├─ Background: transparent
│  ├─ Border: 1px solid rgba(0, 255, 255, 0.3)
│  ├─ Box Shadow: 0 4px 12px rgba(0, 0, 0, 0.7) [depth only, NO glow]
│  ├─ Text Color: var(--color-cyan)
│  └─ Text Shadow: NONE
│
├─ Hover State:
│  ├─ Border: 1px solid var(--color-cyan)
│  ├─ Box Shadow: var(--shadow-glow-cyan-strong) [TIER 2]
│  ├─ Text Shadow: 0 0 8px rgba(0, 255, 255, 0.3) [TIER 2]
│  ├─ Scale: 1.05
│  └─ Arrow: slide-right
│
└─ Focus State:
   ├─ Outline: 2px solid var(--color-cyan)
   └─ Keep Tier 2 glow + outline
```

**Lock:** Secondary buttons NO glow at idle. Tier 2 glow only on hover.

#### Tertiary Button - NO GLOW
```
Component: .btn-tertiary
├─ Idle: color + border (no background, no glow)
├─ Hover: color change + translateX(4px) (no glow)
└─ Never: text-shadow or box-shadow glow
```

**Lock:** Tertiary buttons never have glow. Color and motion only.

---

### Typography Heading Components

#### H1 (Hero Title only - home-v2)
```
Component: .hero-title / h1.hero-title
├─ Font: Space Grotesk, 64px, weight 900
├─ Color: white
├─ Text Shadow: TIER 3 (5-layer cyan + purple glow)
└─ Use Case: Home page hero only (1 per page)
```

**Lock:** Only h1 class in .hero-inner gets Tier 3 glow. No other h1 elements.

#### H2 (Section Headers)
```
Component: h2
├─ Font: Space Grotesk, 32px, weight 800
├─ Color: white
├─ Text Shadow: NONE
├─ Letter Spacing: tight
└─ Margin: bottom 24px
```

**Lock:** H2 has ZERO glow. Color and typography only.

#### H3 (Subsection Headers)
```
Component: h3
├─ Font: Space Grotesk, 24px, weight 700
├─ Color: white
├─ Text Shadow: NONE
├─ Use Cases: Card titles, subsections
└─ On Card Hover: text-shadow 0 0 12px rgba(0, 255, 255, 0.3) [TIER 2]
```

**Lock:** H3 at rest: no glow. On card hover: Tier 2 feedback only.

#### H4 (Small Headers/Labels)
```
Component: h4
├─ Font: Space Grotesk, 14px, weight 700
├─ Color: cyan or light gray
├─ Text Shadow: NONE
├─ Text Transform: uppercase
└─ Letter Spacing: 0.05em
```

**Lock:** H4 never has glow. Color distinction only.

#### Body Text (p)
```
Component: p
├─ Font: Space Grotesk, 15px, weight 400
├─ Color: white or light gray
├─ Text Shadow: NONE
└─ Within Links:
   ├─ Idle: color only
   └─ Hover: color + text-shadow 0 0 8px rgba(0, 255, 255, 0.3) [TIER 2]
```

**Lock:** Body text never has idle glow. Links get Tier 2 on hover only.

#### Small Text / Captions
```
Component: small, .caption
├─ Font: Space Grotesk, 12px, weight 500
├─ Color: muted gray
├─ Text Shadow: NONE
└─ Never: receives glow of any kind
```

**Lock:** Caption text zero glow ever.

---

### Special Components

#### Accordion (Expandable Sections)

##### Accordion Header
```
Component: .accordion-header
├─ Idle State:
│  ├─ Background: linear-gradient(135deg, transparent, rgba(0, 255, 255, 0.02))
│  ├─ Text Color: white
│  ├─ Text Shadow: NONE
│  └─ Chevron Icon: color: cyan, text-shadow: NONE
│
├─ Hover State:
│  ├─ Background: linear-gradient(135deg, transparent, rgba(0, 255, 255, 0.08))
│  ├─ Text Color: cyan
│  ├─ Text Shadow: 0 0 10px rgba(0, 255, 255, 0.3) [TIER 2]
│  └─ Chevron: text-shadow 0 0 8px rgba(0, 255, 255, 0.3) [TIER 2]
│
└─ Active/Expanded State:
   ├─ Background: gradient maintained
   ├─ Chevron: rotated 90deg, glow maintained
   └─ Text Shadow: NONE (remove on non-hover)
```

**Lock:** Accordion text only glows on hover (Tier 2). Never at idle.

##### Accordion Content
```
Component: .accordion-content
├─ Idle: NO GLOW
├─ Expanded: NO GLOW
└─ Text inside: color only, no shadow glow
```

**Lock:** Content text never has glow.

---

#### CTA Section (Ready to Join the Frontier)

```
Component: .cta-section
├─ Background Gradient: linear-gradient cyan→purple (subtle colors)
├─ Background Radial Glow (::before):
│  ├─ Idle: TIER 1 (opacity: 0.05)
│  ├─ Animation: glow-pulse-slow 6s (opacity 0.05→0.1)
│  └─ Color: rgba(183, 64, 217, 0.1)
│
├─ Top Hairline (::after):
│  ├─ Gradient: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent)
│  └─ Opacity: 0.2 (subtle, not glowing)
│
├─ Buttons Inside: .btn-primary [TIER 3] (as defined above)
└─ Text Inside: NO GLOW (color only)
```

**Lock:** CTA section uses Tier 1 ambient glow on large background only. All text and buttons follow their individual rules.

---

#### Featured Assets Carousel (vds-asset-carousel)

##### Carousel Image Panel
```
Component: .carousel-image
├─ Idle State:
│  ├─ Border: 1px solid rgba(0, 255, 255, 0.5)
│  ├─ Box Shadow: 0 0 30px rgba(0, 255, 255, 0.5),
│  │              0 0 60px rgba(0, 255, 255, 0.3) [TIER 3 - featured content]
│  ├─ Background Nebula Glow (::before):
│  │  └─ radial-gradient with 0.2 opacity, animated
│  └─ Image: standard, no additional glow
│
└─ Hover State:
   ├─ Box Shadow: stronger (add 0 0 90px layer)
   ├─ Overlay Light Gradient (::after): add subtle highlight
   └─ Image brightness: increase slightly
```

**Lock:** Featured asset image is TIER 3. This is premium content that should glow prominently.

##### Carousel Stats Panel
```
Component: .carousel-stats
├─ Container:
│  ├─ Border: 1px solid rgba(0, 255, 255, 0.2)
│  ├─ Background: rgba(0, 255, 255, 0.03) (no glow on container)
│  └─ Box Shadow: depth only, NO glow
│
├─ Stat Label:
│  ├─ Font: JetBrains Mono
│  ├─ Color: muted
│  └─ Text Shadow: NONE
│
└─ Stat Value:
   ├─ Font: JetBrains Mono
   ├─ Color: cyan
   ├─ Text Shadow: 0 0 8px rgba(0, 255, 255, 0.2) [TIER 2 for emphasis]
   └─ Feature Flag: Only for featured/rare ships
```

**Lock:** Regular stats zero glow. Featured item stats get Tier 2 text-shadow.

---

### Form Components (Standard across app)

#### Text Input / Textarea
```
Component: input, textarea
├─ Idle:
│  ├─ Border: 1px solid rgba(0, 255, 255, 0.3)
│  └─ Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.5) [depth only]
│
├─ Focus:
│  ├─ Border: 1px solid var(--color-cyan)
│  ├─ Box Shadow: var(--shadow-glow-cyan) [TIER 2]
│  ├─ Outline: 2px solid var(--color-cyan)
│  └─ Text Shadow: NONE
│
└─ Error State:
   ├─ Border: 1px solid var(--color-red)
   ├─ Box Shadow: 0 0 15px rgba(255, 68, 68, 0.3) [TIER 2 error color]
   └─ Outline: 2px solid var(--color-red)
```

**Lock:** Inputs glow only on focus (Tier 2).

#### Checkboxes / Radio Buttons
```
Component: input[type="checkbox"], input[type="radio"]
├─ Idle: color indicator (no glow)
├─ Focus: outline only (no shadow glow)
└─ Checked: color change + outline (no glow)
```

**Lock:** Form controls never have shadow glow. Outline-based focus only.

---

## Navigation Components

### Nav Hub Cards (vds-nav-hub)
```
Component: .nav-card (extends .card)
├─ Follows Card Rules: NO glow at idle, TIER 2 glow on hover
├─ Icon: scales on hover (transform: scale(1.1))
├─ Title: NO glow (color only)
├─ Title on Hover: text-shadow 0 0 10px rgba(0, 255, 255, 0.2) [subtle TIER 2]
├─ CTA Link:
│  ├─ Idle: color only
│  ├─ Hover: color change + text-shadow 0 0 8px rgba(0, 255, 255, 0.3) [TIER 2]
│  └─ Arrow: slides on hover
└─ Card Shadow: Same as card component
```

**Lock:** Nav cards follow standard card glow rules.

---

## Badge & Tag Components

### Badges (vds-badge)
```
Component: .badge
├─ Standard Badge (Idle):
│  ├─ Background: colored background
│  ├─ Border: 1px solid color
│  └─ Text: NO glow
│
├─ Premium/Rare Badge:
│  ├─ Background: gold or gradient
│  ├─ Border: 1px solid var(--color-gold)
│  ├─ Box Shadow: 0 0 12px rgba(255, 199, 0, 0.3) [TIER 2 for emphasis]
│  ├─ Text Shadow: NONE
│  └─ Label: "RARE" or "PREMIUM"
│
└─ Hover (Premium Badge):
   └─ Box Shadow: stronger glow [TIER 2 stronger]
```

**Lock:** Regular badges no glow. Premium badges Tier 2 glow.

### Tags / Chips (vds-tag-list)
```
Component: .tag, .chip
├─ Standard Tag (Idle):
│  ├─ Background: rgba(0, 255, 255, 0.03)
│  ├─ Border: 1px solid rgba(0, 255, 255, 0.3)
│  ├─ Text Color: muted
│  └─ Text Shadow: NONE
│
├─ Standard Tag (Hover):
│  ├─ Border: 1px solid var(--color-cyan)
│  ├─ Background: rgba(0, 255, 255, 0.08)
│  ├─ Box Shadow: 0 0 10px rgba(0, 255, 255, 0.2) [TIER 2]
│  ├─ Text Color: cyan
│  └─ Text Shadow: NONE
│
└─ Premium Tag:
   ├─ Border: 1px solid var(--color-gold)
   ├─ Background: rgba(255, 199, 0, 0.1)
   ├─ Box Shadow: (idle) 0 0 8px rgba(255, 199, 0, 0.2) [TIER 2 always]
   ├─ Text Color: gold
   └─ On Hover: stronger glow
```

**Lock:** Regular tags no idle glow. Premium tags Tier 2. Hover adds Tier 2.

---

## Summary by Tier

### TIER 1 (Ambient - Opacity 0.05-0.1)
```
✅ Header background
✅ Footer background
✅ CTA section background (animated, subtle)
✅ Page background gradients
❌ NEVER: text, buttons, cards at rest, interactive elements
```

### TIER 2 (Interactive - Opacity 0.3-0.5)
```
✅ Buttons on hover/focus
✅ Cards on hover/focus
✅ Links on hover/focus
✅ Form inputs on focus
✅ Nav items on hover/focus
✅ Accordion headers on hover
✅ Card titles on card hover
✅ Premium badges (persistent)
✅ Premium tags (persistent)
❌ NEVER: idle states, body text, regular headings, caps/labels
```

### TIER 3 (Hero/Premium - Opacity 0.5-1.0)
```
✅ Hero title (h1 in .hero-inner only)
✅ Primary CTA buttons (Download Game, main CTAs only - max 2-3 per page)
✅ Featured asset cards (carousel images)
✅ Featured/rare item badges
✅ Important alerts
❌ NEVER: regular content, secondary elements, text shadows on body copy
```

### NEVER GLOW
```
❌ Body text
❌ Secondary headings (h2, h3, h4 except on hover)
❌ Captions, small text
❌ Regular badges
❌ Form labels
❌ Placeholder text
❌ Breadcrumbs
❌ Regular stats
❌ Disabled states
```

---

## Glow Opacity Reference

```
Tier 1 Opacity: 0.05-0.1    (barely visible, atmospheric)
Tier 2 Opacity: 0.3-0.5     (clearly visible, intentional feedback)
Tier 3 Opacity: 0.5-1.0     (very prominent, commanding attention)
```

---

## Lock & Implementation Rules

✅ **LOCKED:**
- Hero title = TIER 3 (only element with dramatic persistent glow)
- Header/Footer = TIER 1 only (atmospheric, not decorative)
- Cards at rest = ZERO glow (shape and border only)
- Buttons at idle = ZERO glow (except primary CTA = TIER 3)
- Text never at rest = ZERO text-shadow glow
- Links hover = TIER 2 glow (new addition)
- Form inputs focus = TIER 2 glow (new addition)

❌ **FORBIDDEN DURING IMPLEMENTATION:**
- Adding idle glow to any element unless explicitly in this map
- Using Tier 3 glow on non-hero, non-primary-CTA, non-featured elements
- Text shadows on body copy or regular headings
- Glow on disabled or inactive states
- Persistent glow on secondary elements
- Decorative glow just to "make it look cool"

---

## Verification Checklist Before Implementation

- [ ] Hero title is the ONLY element with Tier 3 persistent glow
- [ ] Primary CTAs max 2-3 per page with Tier 3 glow
- [ ] Featured assets only element with Tier 3 background glow
- [ ] Header/footer glow is 0.05 opacity (barely visible)
- [ ] All cards have zero glow at rest
- [ ] All buttons have zero glow at rest (except primary CTA)
- [ ] All text glows are hover/active only (Tier 2)
- [ ] No text-shadow on body copy, h2, h3, h4 at rest
- [ ] Links glow on hover (Tier 2, not idle)
- [ ] Form inputs glow on focus (Tier 2, not idle)
- [ ] Premium items identified and marked for Tier 2/3 glow
- [ ] No glow on inactive, disabled, or placeholder states

---

**Status:** LOCKED - Ready for Implementation
**Last Review:** December 8, 2025
**Change Control:** Follow this map exactly. Any deviations require approval.

