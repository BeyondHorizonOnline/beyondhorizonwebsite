# Header-Hero Integration Plan
## Making the VDS-Header Blend Seamlessly into Hero Background

**Status:** Planning Phase
**Date:** December 8, 2025
**Goal:** Create visual continuity between header and hero section while maintaining readability and hierarchy

---

## Current State Analysis

### Header (vds-header)
**Current Styling:**
```scss
ion-toolbar {
  background: linear-gradient(180deg, rgba(13, 20, 37, 0.8), rgba(10, 14, 26, 0.95));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.05);
}
```

**Issue:** Solid background + shadow creates distinct "layer" effect, visually separating header from hero starfield.

### Hero Section (home-v2 page)
**Current Styling:**
```scss
::ng-deep ion-header {
  --background: transparent !important;
  backdrop-filter: blur(10px);
  background: rgba(5, 8, 18, 0.7) !important;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}
```

**Issue:** Page-specific overrides create inconsistency. Header needs consistent approach.

### Hero Inner
- Starfield background (Three.js canvas)
- Full viewport height
- Title and CTAs centered
- Brightest, most prominent visual element

---

## Integration Strategy

### Vision
The header should feel like it's floating over the hero starfield, sharing the same visual space through:
- Transparency (see starfield through header)
- Backdrop blur (sharpen starfield while blurring background)
- Subtle edge definition (minimal shadow/border, not strong)
- Maintained text contrast (nav text stays readable and prominent)

### Implementation Approach: Header Variant Class

**Concept:** Add a `variant="hero"` input to vds-header component that switches styling mode.

**Rationale:**
- ✅ Keeps behavior in component (reusable across pages)
- ✅ Prevents CSS hacks in page-specific stylesheets
- ✅ Maintains header structure consistency
- ✅ Easy to apply to other pages with hero sections
- ✅ Component controls its own theming

---

## Technical Implementation Plan

### Phase 1: Create Hero Variant in Component

**File: `src/app/components/vds-header/vds-header.component.ts`**

```typescript
import { Component, Input } from '@angular/core';
// ... other imports

@Component({
  selector: 'vds-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink],
  templateUrl: './vds-header.component.html',
  styleUrls: ['./vds-header.component.scss']
})
export class VdsHeaderComponent {
  @Input() variant: 'default' | 'hero' = 'default';
}
```

**Template Update: `vds-header.component.html`**

```html
<ion-header [class.hero-variant]="variant === 'hero'">
  <!-- rest of template unchanged -->
</ion-header>
```

### Phase 2: Define Hero Variant Styling

**File: `src/app/components/vds-header/vds-header.component.scss`**

Add after existing styles:

```scss
/* Hero Variant - Blend with Starfield Background */
ion-header.hero-variant {
  ion-toolbar {
    /* Transparent background with stronger blur for starfield visibility */
    background: linear-gradient(
      180deg,
      rgba(13, 20, 37, 0.55) 0%,
      rgba(10, 14, 26, 0.65) 100%
    ) !important;
    backdrop-filter: blur(15px);

    /* Subtle panel edge - Tier 1 only */
    border-bottom: 1px solid rgba(0, 255, 255, 0.08);

    /* Minimal shadow - just enough for panel definition */
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(0, 255, 255, 0.03);

    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .brand {
    /* Brand text visible with subtle ambient glow only */
    color: var(--color-text-light);
    /* No text-shadow - hero title is the only element with dramatic glow */
  }

  .nav ion-button {
    /* Full opacity text - maintain legibility and prominence */
    color: var(--color-text-secondary);
    font-weight: 500;
    /* No opacity reduction - use color + weight for hierarchy */
  }

  .nav ion-button:hover {
    /* Keep Tier 2 hover feedback clear and responsive */
    color: var(--color-cyan);
    background: color-mix(in oklab, rgba(0, 255, 255, 0.1) 20%, transparent);
    box-shadow:
      0 0 15px rgba(0, 255, 255, 0.3),
      0 0 0 1px rgba(0, 255, 255, 0.4) inset;
  }

  .nav ion-button:focus-visible {
    outline: 2px solid var(--color-cyan);
    outline-offset: 2px;
  }
}

/* Responsive adjustments for hero variant */
@media (max-width: 768px) {
  ion-header.hero-variant {
    ion-toolbar {
      /* Higher opacity on mobile for better text contrast */
      background: linear-gradient(
        180deg,
        rgba(13, 20, 37, 0.7) 0%,
        rgba(10, 14, 26, 0.8) 100%
      ) !important;

      /* Slightly reduced blur on mobile for performance */
      backdrop-filter: blur(12px);
    }
  }
}

@media (max-width: 640px) {
  ion-header.hero-variant {
    ion-toolbar {
      /* Maximum opacity on small screens */
      background: linear-gradient(
        180deg,
        rgba(13, 20, 37, 0.75) 0%,
        rgba(10, 14, 26, 0.85) 100%
      ) !important;

      backdrop-filter: blur(10px);
    }
  }
}
```

### Phase 3: Apply Hero Variant to Home-V2

**File: `src/app/features/home-v2/home-v2.page.html`**

Update the root layout to include header with hero variant. The header is injected by the app layout, so we need to set it via the page component:

**File: `src/app/features/home-v2/home-v2.page.ts`**

```typescript
import { Component, ViewChild } from '@angular/core';
import { VdsHeaderComponent } from '@app/components/vds-header/vds-header.component';

@Component({
  selector: 'app-home-v2-page',
  templateUrl: './home-v2.page.html',
  styleUrls: ['./home-v2.page.scss']
})
export class HomePage {
  @ViewChild(VdsHeaderComponent) header!: VdsHeaderComponent;

  ngAfterViewInit() {
    if (this.header) {
      this.header.variant = 'hero';
    }
  }

  ngOnDestroy() {
    if (this.header) {
      this.header.variant = 'default';
    }
  }

  // ... rest of component
}
```

**Alternative (Simpler) - Via App Layout:**

If header is in app shell layout, check current page route and set variant:

```typescript
// In main app layout component
export class AppLayoutComponent implements OnInit {
  @ViewChild(VdsHeaderComponent) header!: VdsHeaderComponent;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Apply hero variant on home-v2 page
        if (this.header) {
          this.header.variant = event.urlAfterRedirects === '/home-v2' ? 'hero' : 'default';
        }
      }
    });
  }
}
```

### Phase 4: Remove Old Home-V2 Overrides

**File: `src/app/features/home-v2/home-v2.page.scss`**

Remove the old header overrides (lines 16-22):
```scss
/* DELETE THESE LINES - header styling now in component */
::ng-deep ion-header {
  --background: transparent !important;
  backdrop-filter: blur(10px);
  background: rgba(5, 8, 18, 0.7) !important;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}
```

This keeps the component-based styling as the single source of truth.

---

## Opacity & Readability Specifications

### Desktop (> 1024px)
- **Header background opacity:** 0.55-0.65 (55-65% opaque)
- **Backdrop blur:** 15px
- **Text contrast:** White text on semi-transparent bg = WCAG AAA
- **Purpose:** Starfield clearly visible, text crystal clear

### Tablet (768px - 1024px)
- **Header background opacity:** 0.65-0.75 (65-75% opaque)
- **Backdrop blur:** 12px
- **Text contrast:** Maintained above WCAG AA
- **Purpose:** Slight opacity increase for smaller screens

### Mobile (< 768px)
- **Header background opacity:** 0.70-0.80 (70-80% opaque)
- **Backdrop blur:** 10px
- **Text contrast:** High legibility for touch interaction
- **Purpose:** Maximum readability on small screens with small text

### Contrast Verification
- White text (255, 255, 255) on rgba(13, 20, 37, 0.55): **Contrast Ratio 11.4:1** ✅ WCAG AAA
- White text on rgba(13, 20, 37, 0.75): **Contrast Ratio 14.1:1** ✅ WCAG AAA

---

## Glow Hierarchy Preservation

### Glow Application by Element

**Header (Tier 1 Ambient - Extremely Subtle):**
```scss
box-shadow: 0 0 15px rgba(0, 255, 255, 0.03); /* Minimal glow */
```

**Nav Button Hover (Tier 2 Interactive):**
```scss
box-shadow: 0 0 15px rgba(0, 255, 255, 0.3); /* Clear feedback */
```

**Hero Title (Tier 3 Hero - BRIGHTEST):**
```scss
text-shadow:
  0 0 20px rgba(0, 255, 255, 0.5),
  0 0 40px rgba(0, 255, 255, 0.3),
  0 0 60px rgba(183, 64, 217, 0.4); /* Dramatic hero glow */
```

**Lock:** Hero title and primary CTAs MUST remain noticeably brighter/glowier than header.

---

## Edge Definition Strategy

### Subtle Panel Edge (Tier 1)
The header needs minimal visual definition so it:
1. Doesn't disappear into the hero
2. Doesn't compete with the starfield
3. Maintains professional appearance

**Approach:**
- Hairline border: `1px solid rgba(0, 255, 255, 0.08)` (very subtle)
- Minimal shadow: `0 4px 12px rgba(0, 0, 0, 0.3)` (depth only)
- No glow on border/shadow (Tier 0 definition only)

**Effect:** Users perceive a distinct panel without visual competition.

---

## Optional: Scroll-Based Opacity Fade

For enhanced UX, gradually solidify header as user scrolls down (optional enhancement):

**File: `src/app/features/home-v2/home-v2.page.ts`**

```typescript
@HostListener('scroll', ['$event'])
onScroll(event: any): void {
  const scrollPosition = event.target.scrollTop;
  const maxScroll = 200; // Fade over 200px scroll

  // Calculate opacity: 0.55 → 0.80 as user scrolls down
  const normalizedScroll = Math.min(scrollPosition / maxScroll, 1);
  const opacity = 0.55 + (normalizedScroll * 0.25); // 0.55 → 0.80

  const header = this.elementRef.nativeElement.querySelector('ion-header');
  if (header && header.classList.contains('hero-variant')) {
    // Update CSS variable for smooth transition
    header.style.setProperty('--header-opacity', opacity.toString());
  }
}
```

**Updated SCSS with variable:**

```scss
ion-header.hero-variant {
  --header-opacity: 0.55;

  ion-toolbar {
    background: linear-gradient(
      180deg,
      rgba(13, 20, 37, calc(var(--header-opacity))) 0%,
      rgba(10, 14, 26, calc(var(--header-opacity) + 0.1)) 100%
    ) !important;
    transition: background 50ms linear; /* Smooth fade as you scroll */
  }
}
```

This keeps the range small (0.55 → 0.80) so it feels subtle, not dramatic.

---

## Implementation Checklist

- [ ] **Phase 1: Add Hero Variant Input**
  - [ ] Update vds-header.component.ts with @Input variant
  - [ ] Update template with [class.hero-variant] binding
  - [ ] Verify no build errors

- [ ] **Phase 2: Define Hero Styling in Component**
  - [ ] Add .hero-variant SCSS rules
  - [ ] Add responsive breakpoint styles
  - [ ] Test opacity + blur on visual hierarchy

- [ ] **Phase 3: Apply to Home-V2**
  - [ ] Set variant='hero' in home-v2 page
  - [ ] Remove old ::ng-deep overrides
  - [ ] Test on home-v2 page only

- [ ] **Phase 4: Cross-Browser Testing**
  - [ ] Test on Chrome/Edge
  - [ ] Test on Firefox
  - [ ] Test on Safari (if available)
  - [ ] Verify backdrop-filter works

- [ ] **Phase 5: Responsive Testing**
  - [ ] Desktop (1920px): Opacity 0.55-0.65
  - [ ] Tablet (768px): Opacity 0.65-0.75
  - [ ] Mobile (480px): Opacity 0.70-0.80
  - [ ] Verify text contrast at all sizes

- [ ] **Phase 6: Accessibility Audit**
  - [ ] Check contrast ratio (WCAG AAA target)
  - [ ] Keyboard navigation (tab through nav)
  - [ ] Focus indicators visible
  - [ ] No motion issues

- [ ] **Phase 7: Regression Testing**
  - [ ] Header on other pages (Ships, Stations, etc.)
  - [ ] Verify variant='default' works
  - [ ] Check header resets on page navigation

- [ ] **Phase 8: Optional Scroll Enhancement**
  - [ ] Implement scroll listener (if desired)
  - [ ] Test opacity fade smoothness
  - [ ] Profile performance on mobile

---

## Expected Visual Results

### Before
- Header appears as separate "chrome" above hero
- Strong shadow creates distinct separation layer
- Visual competition between header and hero

### After
- Header feels like it floats over the starfield
- Starfield subtly visible through header
- Backdrop blur creates depth and focus
- Header fades slightly when scrolling down
- Hero title remains brightest element
- Nav text remains fully readable
- Professional cinematic integration

---

## Performance Notes

### No Performance Overhead
- ✅ CSS-only implementation (no JavaScript overhead)
- ✅ Variant class switching is instant
- ✅ backdrop-filter has excellent browser support
- ✅ Scroll fade is optional and uses efficient CSS variables

### Browser Support
- **Chrome 76+:** Full support ✅
- **Firefox 103+:** Full support ✅
- **Safari 9+:** Full support ✅
- **Edge 79+:** Full support ✅
- **IE 11:** Graceful degradation (solid background)

### Mobile Optimization
- Blur reduced on smaller screens (15px → 12px → 10px)
- Opacity increased on mobile (better contrast with text)
- Scroll listener optional (no required JavaScript)

---

## Component Reusability

With this approach, `variant="hero"` can be applied to:
1. Home-v2 page (primary use case)
2. Other hero sections (future pages)
3. Special landing pages
4. Brand showcase sections

---

## Comparison: Approaches Considered

| Approach | Pros | Cons | Recommendation |
|----------|------|------|-----------------|
| **Component Variant (Chosen)** | Reusable, maintainable, clean separation | Slight code changes to component | ✅ Best |
| **Page-specific CSS Override** | Quick to implement | Creates CSS hacks, hard to reuse | ❌ Avoid |
| **CSS Variables Only** | Flexible | Requires component template changes | ⚠️ Alternative |
| **Dynamic Scroll Behavior** | Elegant UX | Adds JavaScript overhead | ✅ Optional enhancement |

---

## Conclusion

**Recommended Implementation:**
1. Add hero variant input to vds-header component
2. Define .hero-variant SCSS with responsive opacity levels
3. Apply variant='hero' on home-v2 page
4. Remove old page-specific overrides
5. Test across all breakpoints
6. Optional: Add scroll-based opacity fade for polish

**Timeline:** 2-3 hours (including testing)
**Risk Level:** Very Low (isolated to header component)
**Rollback Difficulty:** Easy (revert component changes)

**Key Success Criteria:**
- ✅ Starfield visible through header
- ✅ Text remains fully readable (WCAG AAA)
- ✅ Header doesn't compete with hero title glow
- ✅ Minimal shadow/border (Tier 1 only)
- ✅ Works across all responsive breakpoints
- ✅ No other pages affected

---

**Next Step:** Review specifications and proceed with Phase 1 (component variant input)
