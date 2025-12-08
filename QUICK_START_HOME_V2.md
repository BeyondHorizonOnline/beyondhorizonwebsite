# Quick Start Guide - Home V2 Features

## Access the New Design

**URL**: `http://localhost:4200/home-v2`

## Page Sections (Top to Bottom)

### 1. HERO SECTION
```
═══════════════════════════════════════════════════════════════
                    [Full Viewport Height]

                      BEYOND HORIZON
                    Conquer the Frontier

              [DOWNLOAD GAME →] [LEARN MORE]

              [Animated gradient background with parallax]
═══════════════════════════════════════════════════════════════
```
- **Fonts**: Space Mono (bold, glowing)
- **Colors**: Light text (#e5e7eb) on dark navy background
- **Effects**: Text-shadow glow (cyan + purple), gradient background animation
- **CTAs**: Primary (cyan) + Secondary (border-only)

---

### 2. NAVIGATION HUB
```
┌───────────────────────────────────────────────────────────────┐
│                    EXPLORE THE UNIVERSE                        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ 🚀           │  │ 🏗️           │  │ 📖           │         │
│  │ SHIPS        │  │ STATIONS     │  │ CODEX        │         │
│  │ Explore Fleet│  │ View Habitats│  │ Read Lore    │         │
│  │ [Explore →]  │  │ [Explore →]  │  │ [Explore →]  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ 📚           │  │ 🎨           │  │ 📢           │         │
│  │ LEARNING     │  │ MEDIA        │  │ UPDATES      │         │
│  │ How to Play  │  │ View Gallery │  │ Latest News  │         │
│  │ [Get Started →] [Browse →]     │  │ [Read More →]│         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                 │
│  Hover: Glow effect, scale 1.05, icon animation              │
│  Desktop: 3 columns | Tablet: 2 columns | Mobile: 1 column  │
└───────────────────────────────────────────────────────────────┘
```
- **Component**: `<vds-nav-hub>`
- **Card Style**: Dark background, 1px cyan border, hover glow
- **Responsive**: Adapts grid columns per breakpoint
- **Interaction**: Click any card to navigate to feature page

---

### 3. FEATURED ASSETS CAROUSEL
```
┌───────────────────────────────────────────────────────────────┐
│                     FEATURED ASSETS                            │
│                                                                 │
│  [◀]  ┌──────────────────────────────────────────────┐  [▶]  │
│       │ [Ship Image]  │ VX-6 APEX                      │       │
│       │ (40% width)   │ Capital-line Battleship        │       │
│       │               │                                 │       │
│       │               │ The Apex stands as the pinnacle│       │
│       │               │ of Voran's design philosophy...│       │
│       │               │                                 │       │
│       │               │ Hull: 8500 | Shield: 5000      │       │
│       │               │ Speed: 450                      │       │
│       │               │                                 │       │
│       │               │ [VIEW FULL DETAILS →]           │       │
│       └──────────────────────────────────────────────┘       │
│                                                                 │
│       Autoplay: Every 6 seconds, fade transition (400ms)     │
│       Ships: VX-6 Apex → EX-1 Vibz → VX-2 Valkyrie           │
└───────────────────────────────────────────────────────────────┘
```
- **Component**: `<vds-asset-carousel>`
- **Features**: Auto-rotate, manual nav arrows, responsive layout
- **Mobile**: Full-width image, content below, navigation indicator
- **Data**: 3 featured ships from seed data (customizable)

---

### 4. HOW TO PLAY (Accordion)
```
┌───────────────────────────────────────────────────────────────┐
│                       HOW TO PLAY                              │
│                                                                 │
│  ▼ What is Beyond Horizon?                           [expanded]│
│    Beyond Horizon is an expansive space-based MMO...          │
│    Whether you're a ruthless tactician, a shrewd             │
│    merchant, or a frontier explorer...                        │
│                                                                 │
│    [Read the Lore →]                                          │
│  ───────────────────────────────────────────────────────────  │
│  ▶ The Voran Catalog                               [collapsed] │
│  ───────────────────────────────────────────────────────────  │
│  ▶ Getting Started                                 [collapsed] │
│  ───────────────────────────────────────────────────────────  │
│  ▶ Progression & Ranks                            [collapsed] │
│  ───────────────────────────────────────────────────────────  │
│  ▶ Multiplayer & Community                        [collapsed] │
│                                                                 │
│  Click any section to expand/collapse (300ms animation)       │
└───────────────────────────────────────────────────────────────┘
```
- **Component**: `<home-v2.page>` (accordion inline)
- **State**: Signals-based expand/collapse
- **Animation**: Smooth slide-down (max-height), chevron rotation
- **Content**: 5 learning sections with links to related pages
- **Default**: First section expanded for quick learning

---

### 5. CTA SECTION
```
┌───────────────────────────────────────────────────────────────┐
│              [Lime green glow background]                      │
│                                                                 │
│           Ready to Join the Frontier?                         │
│                                                                 │
│    [DOWNLOAD GAME →]        [PRE-REGISTER]                   │
│     Primary (cyan)          Secondary (border)                │
│     Hover: Purple shift     Hover: Purple border              │
│                                                                 │
│  Desktop: Side-by-side | Mobile: Stacked                      │
└───────────────────────────────────────────────────────────────┘
```
- **Component**: `<vds-cta-section>`
- **Purpose**: Primary conversion point (download game)
- **Buttons**: Customizable text and links
- **Visual**: Radial gradient glow behind content
- **Mobile**: Full-width stacked buttons for easy tapping

---

## Key Visual Features

### Colors in Action
| Element | Color | Usage |
|---------|-------|-------|
| Hero title | `#e5e7eb` (Light gray) | Main heading with cyan glow |
| Card borders | `#00d9ff` (Cyan) | 1px border, glows on hover |
| Hover accents | `#7c3aed` (Purple) | Button hover, gradient shifts |
| Success/CTAs | `#a4fc31` (Lime) | Download button, positive actions |
| Background | `#0a0e27` (Dark navy) | Main page background |

### Typography
| Usage | Font | Size | Weight |
|-------|------|------|--------|
| Hero | Space Mono | 4rem | 900 |
| Section | Space Mono | 2rem | 700 |
| Card title | Space Mono | 1.5rem | 700 |
| Body | Inter | 1rem | 400 |
| Muted | Inter | 0.875rem | 400 |

### Animations
- **Hero text glow**: Pulse effect (text-shadow expanding)
- **Card hover**: Border glow (0 0 20px) + scale 1.05 + gradient shift
- **Carousel**: Fade transition between slides (400ms)
- **Accordion**: Slide-down max-height + opacity fade
- **Buttons**: Scale and glow on hover
- **All durations**: 150-400ms with ease-in-out easing

---

## Responsive Behavior

### Desktop (1025px+)
- Hero: Full viewport height
- Nav hub: 3-column grid
- Carousel: Image left (40%) + content right (60%)
- CTA buttons: Inline, side-by-side
- Max width: 1400px

### Tablet (641-1024px)
- Hero: Slightly reduced height
- Nav hub: 2-column grid
- Carousel: Full-width image, content below
- CTA buttons: Inline with wrapping
- Container width: Full with padding

### Mobile (< 640px)
- Hero: 60% viewport height
- Nav hub: Single column, full width
- Carousel: Single column (image → content)
- CTA buttons: Full-width stack
- Accordion: More compact padding
- Text: Scaled down for readability

---

## Accessibility Features

✅ **Keyboard Navigation**
- Tab through all interactive elements
- Enter to click buttons/links
- Arrow keys for carousel (future enhancement)

✅ **Focus Indicators**
- 2px cyan outline on all focusable elements
- Outline offset for clarity
- Visible in light and dark backgrounds

✅ **Color Contrast**
- 4.5:1+ ratio on all text (WCAG AA)
- No color-only information conveyance
- Text + icons for clarity

✅ **Semantic HTML**
- Proper heading hierarchy (h1 → h2 → h3)
- Button elements for buttons
- Link elements for navigation
- Section elements for layout

✅ **Motion Preferences**
- Respects `prefers-reduced-motion` setting
- Disables animations if user prefers reduced motion
- No jarring transitions

---

## Testing Checklist

### Visual
- [ ] Hero section displays with glowing text
- [ ] 6 nav cards visible and properly aligned
- [ ] Carousel shows featured ships with smooth transitions
- [ ] Accordion expands/collapses smoothly
- [ ] CTA section has lime green glow background
- [ ] All text is readable (contrast check)

### Interaction
- [ ] Nav cards hover with glow effect and scale
- [ ] Carousel arrows navigate between assets
- [ ] Carousel auto-rotates every 6 seconds
- [ ] Accordion sections toggle on click
- [ ] Download button is prominent and clickable
- [ ] Links navigate to correct pages

### Responsive
- [ ] Desktop (1400px): 3-column grid, side-by-side carousel
- [ ] Tablet (768px): 2-column grid, stacked carousel
- [ ] Mobile (375px): 1-column grid, full-width buttons
- [ ] No horizontal scrolling on any breakpoint
- [ ] Touch targets are 44px+ minimum

### Performance
- [ ] Page loads quickly (< 3s)
- [ ] Animations are smooth (60fps)
- [ ] No jank or stuttering on scroll
- [ ] Carousel transitions are fluid
- [ ] Mobile performance is acceptable

### Accessibility
- [ ] Keyboard tab navigation works
- [ ] Focus indicators visible
- [ ] Heading hierarchy correct
- [ ] Images have alt text
- [ ] Colors have sufficient contrast
- [ ] Motion preference respected

---

## Customization Examples

### Change Featured Ships
Edit `src/app/features/home-v2/home-v2.page.ts`:
```typescript
featuredAssets: CarouselAsset[] = [
  {
    id: 'vx-6-apex',
    title: 'VX-6 Apex',
    // ... change data here
  },
  // Add more ships...
];
```

### Modify CTA Section
In template:
```html
<vds-cta-section
  title="Your Custom Title"
  primaryBtnText="Custom Button"
  primaryBtnLink="https://your-link.com"
></vds-cta-section>
```

### Adjust Colors
Edit `src/theme/modern-design-system.scss`:
```scss
:root {
  --color-cyan: #00d9ff;        /* Change accent color */
  --color-lime: #a4fc31;        /* Change success color */
  // Adjust other colors...
}
```

### Tweak Animation Timing
In design system:
```scss
--duration-normal: 300ms;   /* Default 300ms */
--duration-slow: 500ms;     /* Slower animations */
--easing-ease: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Next Steps

1. **Review Design**: Stakeholders view `/home-v2` and provide feedback
2. **Gather Metrics**: Track CTAs, scroll depth, feature page navigation
3. **User Testing**: 5-10 players test navigation and clarity
4. **Iteration**: Refine based on feedback (colors, animations, content)
5. **Migration**: Once approved, set `/home-v2` as default landing page
6. **Deployment**: Push to production via Firebase Hosting

---

## Troubleshooting

### Carousel not rotating
- Check browser console for errors
- Verify `autoplayInterval` prop is set (default: 6000ms)
- Check that `assets` array is populated

### Accordion not expanding
- Verify `toggleSection()` function is called on header click
- Check browser console for TypeScript errors
- Ensure signals are properly imported

### Styles not applying
- Clear browser cache (Ctrl+Shift+Del)
- Run `npm run build` to rebuild
- Check that `modern-design-system.scss` is imported in `global.scss`
- Verify CSS variables are available (`:root` scope)

### Mobile looks broken
- Check viewport meta tag in `index.html`
- Test on actual mobile device (not just browser zoom)
- Verify max-width containers aren't fixed pixels
- Check media queries in component SCSS files

---

## Questions?

Refer back to:
- **Design System**: `MODERN_UI_DESIGN_SYSTEM.md`
- **Wireframes**: `HOME_V2_WIREFRAMES.md`
- **Implementation**: `IMPLEMENTATION_COMPLETE.md`
- **Original Plan**: `HOME_PAGE_REDESIGN_PLAN.md`
