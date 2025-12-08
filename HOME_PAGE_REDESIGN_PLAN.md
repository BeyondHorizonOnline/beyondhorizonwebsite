# Beyond Horizon Home Page Redesign - Plan

## Proof of Concept Approach

This redesign will be implemented as a **new route (`/home-v2`)** alongside the existing home page, allowing parallel testing and user feedback before full migration.

---

## Current State Analysis

**Existing Home (`/home`)**:
- Simple hero with title + 3 CTA buttons
- Minimal content (tagline only)
- Uses existing `VdsHeroComponent` and `vds-section` patterns
- No asset showcase or learning pathway

**Navigation**:
- Header with desktop nav + mobile hamburger menu
- 10 routes (Ships, Codex, Stations, Logistics, Engineering, Media, Updates, Star Map, Contact, Lore)
- Consistent across all pages

---

## Proposed Home Page v2 Structure

### 1. Hero Section (Above Fold)
- **Tagline**: "Build. Explore. Dominate." (or similar narrative hook)
- **Subtext**: Short descriptor of the game world
- **Primary CTA**: "Download Game" (prominent button)
- **Secondary CTAs**: "Learn the Universe" (text link to documentation)
- **Visual**: Use existing hero component, subtle parallax or video background (if bandwidth allows, else static)

### 2. Quick Navigation Hub (Grid Layout)
**3x2 grid** with 6 main categories:
- **Ships** - Icon + "Explore Fleet" link to `/ships`
- **Stations** - Icon + "View Habitats" link to `/stations`
- **Codex** - Icon + "Read Lore" link to `/codex`
- **Learning** - Icon + "How to Play" link to new `/learn` page
- **Media** - Icon + "View Gallery" link to `/media`
- **Updates** - Icon + "Latest News" link to `/updates`

Each card:
- Icon/thumbnail
- Title
- Brief descriptor (1 line)
- Hover effect (scale/glow)
- Semantic routing

### 3. Featured Asset Carousel (Optional Spotlight)
**Rotating showcase** of 3-5 game assets (ships, stations):
- Large card display with asset name, role, summary
- Next/prev buttons or autoplay
- Small detail CTA: "View Full Details →"
- Can be populated from seed data

### 4. "How to Play" Snippet Section
**Text-based learning overview**:
- 4-5 short sections (accordion or stacked):
  1. "What is Beyond Horizon?" (world/setting)
  2. "The Voran Catalog" (ship/station system)
  3. "Getting Started" (basic gameplay)
  4. "Progression & Ranks" (advancement)
  5. "Multiplayer & Community" (MMO hooks)
- Each expandable to full documentation (link to `/learn`)
- Minimal prose (2-3 sentences per section)

### 5. Call-to-Action Bar
- **"Ready to Join the Frontier?"**
- Prominent "Download Now" button (links to download page or external)
- Email signup field (optional, future newsletter integration)

### 6. Footer
- Reuse existing `VdsFooterComponent`
- Link to main nav routes

---

## Technical Implementation Plan

### New Files to Create

1. **New Page Component** (`src/app/features/home-v2/`)
   - `home-v2.page.ts` - Standalone component with signals for carousel state
   - `home-v2.page.html` - Template with all sections
   - `home-v2.page.scss` - Scoped styles (modern, gaming aesthetic)

2. **New Reusable Components** (`src/app/components/`)
   - `vds-nav-hub.component.ts` - 6-card navigation grid
   - `vds-asset-carousel.component.ts` - Featured asset rotator (optional phase 2)
   - `vds-cta-section.component.ts` - CTA bar component

3. **New Route** (`src/app/app.routes.ts`)
   - Add route: `{ path: 'home-v2', loadComponent: () => import('./features/home-v2/home-v2.page').then(m => m.HomeV2Page) }`

4. **Optional Learning Page** (`src/app/features/learn/`)
   - `learn.page.ts` - Full documentation hub
   - `learn.page.html` - Expandable sections, table of contents
   - `learn.page.scss`

### Component Dependencies
- **Ionic**: `IonContent`, `IonCard`, `IonGrid`, `IonRow`, `IonCol`, `IonButton`
- **Existing Components**: `VdsFooterComponent`, optionally `VdsCardComponent` for asset cards
- **Angular**: Signals for carousel state, computed for featured asset selection

### Styling Approach
- **Theme**: Keep existing dark sci-fi aesthetic (Elite Dangerous theme already in global.scss)
- **Layout**: CSS Grid for nav hub, flexbox for hero and CTA sections
- **Animation**: Hover states (scale, glow), smooth carousel transitions
- **Responsiveness**: Mobile-first (stack grid to 1 column on mobile)

---

## Navigation Bridging Strategy

### From Home v2 → Existing Pages
Each nav card (`vds-nav-hub`) links directly to existing routes:
- Ships → `/ships` (existing ShipsListPage)
- Stations → `/stations` (existing StationsPage)
- Codex → `/codex` (existing CodexPage)
- Media → `/media` (existing MediaPage)
- Updates → `/updates` (existing UpdatesPage)
- Learn → `/learn` (new page, or external docs link)

### No Breaking Changes
- Existing `/home` page remains untouched
- Existing header/footer/menu work the same
- All linked pages work unchanged
- Users can manually navigate to both `/home` and `/home-v2`

### Future Migration Path
Once feedback is collected:
1. Option A: Replace `/home` with v2 content
2. Option B: Set v2 as default landing, keep `/home` as legacy
3. Option C: A/B test with analytics

---

## Technology Recommendations

### Keep Current Stack
- **Why**: Minimal disruption, familiar patterns, works well
- **Angular 21 + Ionic 8**: Already proven for this project
- **No major refactor needed**

### Optional Enhancements (Future Phases)
1. **Framer Motion / GSAP** - For carousel animations (nicer transitions)
   - Current approach: CSS + Angular signals (sufficient for PoC)
   - Migration: Can add if feedback wants premium animations

2. **Headless CMS** - For "How to Play" sections (future iteration)
   - Current approach: Hardcoded in component (fine for PoC)
   - Scalability: Can migrate to CMS later

3. **Video Background** - If hero needs dynamic feel
   - Current approach: Static image (better performance)
   - Conditional: Add low-res video if bandwidth allows

---

## Phase Breakdown

### Phase 1 (MVP / PoC)
- [ ] Create `HomeV2Page` with hero + nav hub + how-to sections
- [ ] Create `vds-nav-hub` component
- [ ] Add `/home-v2` route
- [ ] Style for gamer aesthetic (dark, high contrast)
- [ ] Test responsiveness (mobile/desktop)
- **Deliverable**: Functional proof of concept at `/home-v2`

### Phase 2 (Enhancement)
- [ ] Add `vds-asset-carousel` for featured ships/stations
- [ ] Create full `/learn` page with expanded documentation
- [ ] Add micro-interactions (hover effects, smooth scrolls)
- [ ] Newsletter signup integration
- **Deliverable**: Enhanced PoC ready for A/B testing

### Phase 3 (Migration)
- [ ] Collect user feedback from PoC
- [ ] Decide on `/home` replacement vs. parallel running
- [ ] Update navigation links if needed
- [ ] Deprecate or archive old home page
- **Deliverable**: Production-ready redesigned home

---

## Design Specs (Quick Reference)

### Color Palette
- **Primary**: Amber (#ff9f1a) - from existing Elite Dangerous theme
- **Dark BG**: #070a0c
- **Card BG**: #0b0f12
- **Text**: Light gray (#e0e0e0)
- **Accent**: Cyan/blue highlights (secondary)

### Typography
- **Hero Title**: Large, mono-spaced or bold sans (already in brand)
- **Body**: Readable sans-serif, 16px+ for gamer audience
- **Monospace**: For code/specs (existing class `.mono`)

### Spacing & Grid
- **Desktop**: 12-column grid, max 1200px width
- **Mobile**: Single column, 16px padding
- **Card Gap**: 1.5rem

### Interactive Elements
- **Buttons**: Large touch targets (44px+ height)
- **Hover States**: Scale 1.05, glow shadow
- **Animations**: 200-300ms easing (smooth, not jarring)

---

## Success Metrics for Feedback

1. **Engagement**: Click-through rate to asset pages (Ships, Codex, etc.)
2. **CTA Conversion**: "Download Game" button clicks
3. **UX**: Does the nav hub feel intuitive vs. header menu?
4. **Learning Clarity**: Do 3 people understand game concept after reading "How to Play"?
5. **Performance**: Page load time, smooth scrolling, no jank on lower-end devices

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| PoC route conflicts with existing nav | Keep as `/home-v2`, no overwrites |
| Responsive layout breaks on mobile | Test early, use Ionic grid system |
| Carousel state management complexity | Start with simple signals, expand if needed |
| Asset data not in seed files | Use existing SHIPS/FACILITIES from seed data |
| Users confused by 2 home pages | Clear messaging, optional A/B test parameter |

---

## Summary

**Build a modern, narrative-driven home page that serves as a navigation hub and learning entry point, keeping the existing dark sci-fi aesthetic. Implement as `/home-v2` for low-risk PoC testing, bridging seamlessly to existing ship/codex/station pages. Target: Gamer-friendly, fast, minimal friction to download CTA.**
