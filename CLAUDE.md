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

## Known Issues

- Duplicate route definition for `/route-tester` in `app.routes.ts`
- TypeScript strict mode disabled - consider enabling incrementally for new code
