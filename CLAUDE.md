# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Beyond Horizon**, an Ionic Angular standalone application for a sci-fi game/universe. It's a content-rich website showcasing ships, stations, and game lore with a codex system. The app uses Angular 21+ with Ionic 8+ components and Three.js for 3D model visualization.

## Technology Stack

- **Framework**: Angular 21 (standalone components)
- **UI Framework**: Ionic 8 (standalone mode)
- **3D Rendering**: Three.js with GLTFLoader
- **Routing**: Angular Router with lazy-loaded components
- **HTTP**: Angular HttpClient
- **Deployment**: Firebase Hosting
- **Mobile**: Capacitor (configured but web-focused)

## Common Commands

```bash
# Development server
npm start                    # Start dev server (default: http://localhost:4200)
ng serve                     # Alternative

# Building
npm run build                # Production build (output: www/)
ng build                     # Development build
ng build --configuration production

# Testing & Quality
npm test                     # Run Karma/Jasmine tests
npm run lint                 # ESLint checks
ng lint

# Watch mode (auto-rebuild on changes)
npm run watch

# Ionic-specific
npm run ionic:serve          # Start with --open flag
npm run ionic:build          # Alias for build
```

## Architecture

### Component Structure

The app follows a **feature-based architecture** with three main component categories:

1. **Feature Pages** (`src/app/features/*/`) - Top-level routable pages
   - `home/` - Landing page
   - `ships/ships-list/` & `ships/ships-detail/` - Ship catalog and detail views
   - `codex/codex-main/` & `codex/codex-detail/` - General codex system
   - `engineering/`, `logistics/`, `medical/`, `habitation/`, `stations/`, `media/`, `updates/`, `contact/` - Category-specific pages
   - `lore/` - Lore content

2. **Reusable Components** (`src/app/components/`) - Design system prefix `vds-*`
   - `vds-header` - Top navigation/menu
   - `vds-footer` - Footer
   - `vds-card` - Content card with title, code, series badge, tags
   - `vds-hero` - Hero banner component
   - `vds-badge` - Series/category badges
   - `vds-poster` - Image/poster display
   - `vds-search-bar` - Search/filter component
   - `vds-spec-grid` - Stats grid display
   - `vds-tag-list` - Tag display component
   - `vds-skeleton` - Loading skeleton

3. **Specialized Components** (`src/app/component/`) - Note: singular "component"
   - `model-viewer/` - Three.js GLB/GLTF 3D model viewer with orbit controls

### Data Architecture

**Hybrid Display + API Pattern**: The app uses a two-tier data strategy to balance performance and flexibility:

- **Seed Files** (`src/app/data/seed-*.ts`) - Lightweight display data embedded in the app for instant list rendering:
  - `seed-ships.ts` - Ship display data (name, role, summary, tags)
  - `seed-facilities.ts` - Facility/station display data
  - `seed-cx.ts` - CX series data
  - Each contains `templateId` linking to full database records

- **API Service** (`src/app/services/unit-stats/`) - On-demand stats from game backend:
  - `UnitStatsService` fetches full stats (health, shields, energy, weapon slots, etc.) when user clicks into detail view
  - Uses RxJS caching (`shareReplay`) to avoid duplicate API calls
  - Base URL: `https://game.beyondhorizononline.com/api`

**Why This Pattern**: Seed files keep the app bundle small and lists fast; API calls provide complete, up-to-date stats only when needed.

### Type System (`src/app/models/catalog.models.ts`)

- `CatalogEntityDisplay` - Minimal display data (id, name, role, summary, tags)
- `CatalogEntityStats` - Complete DB schema (50+ fields from game database)
- `ShipDisplay`, `FacilityDisplay` - Typed seed file entities
- `Ship`, `Facility`, `CatalogEntityBase` - Full entities with all stats (for detail views)
- `FullUnitData` - Merged display + stats type

### Services

- **RoutingService** (`src/app/services/routing.service.ts`) - Game pathfinding API client
  - Communicates with game server's A* pathfinding microservice
  - Methods: `findRoute()`, `findFewestJumps()`, `findShortestDistance()`
  - Handles retry logic, timeouts, and progressive backoff
  - Used by route-tester and star-map features

- **UnitStatsService** (`src/app/services/unit-stats/unit-stats.ts`) - Unit template stats fetcher
  - Fetches stats by `templateId` from game API
  - Caching layer with `Map<number, Observable<CatalogEntityStats>>`
  - Methods: `getUnitStats()`, `getBulkStats()`, `getFullUnit()`, `preloadStats()`

### Routing

All routes defined in `src/app/app.routes.ts` use lazy-loaded standalone components:

- `/home` - HomePage (default route)
- `/ships` - ShipsListPage
- `/ships/:id` - ShipDetailPage
- `/codex` - CodexPage (main codex)
- `/codex/:id` - CodexDetailPage
- `/lore`, `/logistics`, `/engineering`, `/medical`, `/habitation`, `/stations`, `/media`, `/updates`, `/contact` - Category pages
- `/star-map` - Star map visualization
- `/route-tester` - Route pathfinding tester

**Note**: Duplicate `/route-tester` route exists in routes array (lines 14 and 22) - this should be cleaned up.

### 3D Model Viewer

The `ModelViewerComponent` uses Three.js with a manually controlled rendering approach (no animation loop):

- **Scene Setup**: PerspectiveCamera, WebGLRenderer with sRGB encoding, ACESFilmic tone mapping
- **Lighting**: 3-point rig (ambient + key + fill + rim directional lights)
- **Controls**: OrbitControls with damping disabled
- **Loading**: GLTFLoader with loading state management
- **Framing**: Auto-frames camera to loaded model using bounding box
- **Render Strategy**: Event-driven rendering (no requestAnimationFrame loop) - renders only on control changes or resize

Key settings:
- Tone mapping exposure: 3.6 (tuned for dark models)
- Min/max distance set dynamically based on model size
- Canvas resizes with parent element

## Key Patterns

### Standalone Components

All components use Angular standalone mode (no NgModules). Import dependencies directly:

```typescript
@Component({
  standalone: true,
  imports: [IonContent, IonCard, RouterLink, VdsCardComponent],
  // ...
})
```

### Signals & Computed

Modern Angular signal-based reactivity is used for filtering/derived state:

```typescript
classFilter = signal<string | null>(null);
list = computed(() =>
  this.ships.filter(s => !this.classFilter() || s.class === this.classFilter())
);
```

### Ionic Components

Import from `@ionic/angular/standalone`:

```typescript
import { IonContent, IonCard, IonButton } from '@ionic/angular/standalone';
```

All Ionicons are pre-loaded in `src/main.ts` via `addIcons(allIcons)`.

## Configuration Notes

### TypeScript Config

- `strict: false` - TypeScript strict mode is **disabled**
- `noImplicitAny: false` - Implicit any allowed
- `noImplicitReturns: false` - Return statements not strictly enforced
- When adding new code, prefer explicit types despite these settings

### Build Configuration

- **Production build**: Outputs to `www/` (Firebase hosting directory)
- **Budget limits**: 2MB warning / 5MB error for initial bundle
- **Environment files**: `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod)
- File replacements handled in `angular.json` build configurations

### Firebase

- Hosting configured in `firebase.json`
- Public directory: `www/`
- SPA rewrites: All routes redirect to `/index.html`

## Development Workflow

1. **Adding a new ship/facility**: Add to appropriate seed file with `templateId`, display data
2. **Adding a new page**: Create in `src/app/features/[name]/`, add route to `app.routes.ts`
3. **Adding a reusable component**: Create in `src/app/components/vds-[name]/`
4. **Working with 3D models**: Place GLB files in `src/assets/models/`, reference with `src` input on `ModelViewerComponent`
5. **Testing API integration**: Use `UnitStatsService.getUnitStats(templateId)` - service handles caching automatically

## API Endpoints

- Game API base: `https://game.beyondhorizononline.com/api`
  - `/units/template/{templateId}` - Get unit template stats
  - `/game/route` (POST) - Pathfinding service

## Style Conventions

- Component selector prefix: `vds-` for design system, `bh-` for specialized components
- SCSS files: Each component has its own `.scss` file
- Global styles: `src/global.scss` and `src/theme/variables.scss`

## Visual Design Rules

### Three-Tier Glow Hierarchy

All visual effects follow a strict three-tier glow system to maintain visual hierarchy. **Never break this ordering.**

| Tier | Purpose | Opacity | Components | Rule |
|------|---------|---------|------------|------|
| **Tier 3** (Brightest) | Hero CTAs, titles | 0.5–1.0 | Hero title text-shadow, CTA buttons | Only the main call-to-action. Everything else must be dimmer. |
| **Tier 2** (Interactive) | Hover/active states | 0.15–0.3 | Nav button hover/active, card hover | Interactive feedback. Sharp, clear glow on user interaction. |
| **Tier 1** (Ambient) | Subtle atmosphere | 0.01–0.03 | Header/footer glow, card borders | Barely perceptible. Creates mood without competing for attention. |

**Key Rule**: If something is glowing brightly, it must be either a hero CTA (Tier 3) or the user just hovered over it (Tier 2). Never add bright glows to passive elements.

### Header-Hero Blend Pattern

The `vds-header` component supports two variants via `[variant]` input:

- **`default`**: Dark opaque header (0.8–0.95 opacity) for all non-hero pages
- **`hero`**: Semi-transparent header (0.35–0.15 opacity) for home-v2, blends with starfield background

**Route Detection** (in `app.component.ts`):
- `/home-v2` → applies `hero` variant automatically
- All other routes → applies `default` variant
- Detection uses Angular Router NavigationEnd events + route URL check

**CSS Variable Override** (critical):
- Global `--ion-toolbar-background` in `global.scss:187` overrides component styles
- Both header and footer must override this: `--ion-toolbar-background: transparent !important;`
- Background property must use `!important` flag to enforce component styling

**Hero Variant Specifics**:
- Desktop (>1024px): 0.35–0.15 opacity, 20px blur, soft gradient fade (20% fade zone)
- Tablet (768–1024px): 0.5–0.3 opacity, 16px blur
- Mobile (<768px): 0.6–0.4 opacity, 14px blur
- **No text-shadow on brand or nav buttons** (only hero title has Tier-3 glow)
- Nav text opacity: 75–80% (muted but readable, supports hierarchy)
- Nav button font weight: 400 (lighter than brand's 800)
- **Active nav state** (`.router-link-active`): Same styling as hover (Tier-2 feedback)

### Footer Ethereal Treatment

Footer must not "box in" the hero content. Use Tier-1 ambient only:

- Opacity: 0.15–0.08 (nearly invisible)
- Blur: 8px (minimal, doesn't obscure starfield)
- Padding: 8px block (thinner than header's 18px)
- Text color: Barely visible (0.5–0.7 opacity), increases to 1.0 only on hover
- Shadow: **None** (no depth, weightless)
- Border: **None** (hard edges create visual separation; use gradient fades instead)

**Global CSS Override**: Add to `ion-footer` in footer SCSS:
```scss
ion-footer {
  --ion-toolbar-background: transparent !important;
}
ion-toolbar {
  background: [...] !important;  // Always use !important
}
```

### Card Styling Rules (vds-card)

Standard codex cards must be **quiet, clean, and cyan-only** to maintain visual hierarchy:

**At Rest (Idle State)**
- Background: Dark navy gradient (rgba 10-22, opacity 0.9–0.95) — muted, premium feel
- Border: Subtle white (0.08 opacity) — barely visible
- Shadow: Minimal depth shadow only, no glow
- No color, no gradient flooding, no idle animation

**Text**
- Title: Pure white, bold, clean
- Summary: Muted gray (--color-text-muted)
- Badges: Cyan border (0.25 opacity), muted white text (0.7 opacity), thin capsule
- Chips/Tags: Muted white (0.7), thin white border (0.1 opacity)

**Hover State (Tier-2 Feedback Only)**
- Lift: Tiny 3px translateY (not 8px — restrained)
- Border: Brighten to cyan (0.4 opacity)
- Glow: Single subtle cyan glow (0.2 opacity) — Tier-2 only, never strong
- Title: Smooth transition to cyan (Tier-2, not Tier-3)
- No purple gradient, no multi-layer glow, no neon halo

**Series Badges**
- VX (Voran Defense): Cyan
- CX (Commercial): Gold
- BX (Special/Unique): Purple
- EX (Exploration): Silver
- MX (Military): Red
- HX (Exotic/Rare): Cyan
- Styling: Thin borders, muted text (0.7 opacity), no glow at idle

**Hierarchy Reminder**
- Brightest → Section heading (Tier-3)
- Bright → Hovered card (Tier-2 only)
- Medium → Card title at rest
- Subtle → Summary, badges, chips (Tier-1 ambient)

### Design Philosophy

1. **Optical Hierarchy**: User's eye should naturally move to hero CTA first, then brand, then nav
2. **Minimal Weight**: Header and footer should feel like they're floating in the same space as the background, not sitting on top
3. **Gradient Fades**: Use soft 20% fade zones instead of hard borders for visual blending
4. **Padding as Breathing Room**: Premium feel comes from generous padding, not opacity reduction
5. **Text Weight Over Opacity**: Use font weight and color to create hierarchy, not opacity (users need readable text)
6. **Quiet at Rest, Responsive on Hover**: Cards should be solid and premium when idle, with restrained Tier-2 feedback only on interaction

## Known Issues

- Duplicate route definition for `/route-tester` in `app.routes.ts`
- TypeScript strict mode disabled - consider enabling incrementally for new code
