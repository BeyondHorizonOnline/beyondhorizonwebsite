# Header-Hero Blend - Testing & Verification Guide

**Last Updated:** December 8, 2025
**Status:** Ready for Testing
**Build Status:** ✅ PASSING (no errors)

---

## Implementation Summary

The header-hero blend has been successfully implemented with:

### Components Modified

1. **[vds-header.component.ts](src/app/components/vds-header/vds-header.component.ts)**
   - Added: `@Input() variant: 'default' | 'hero' = 'default';`

2. **[vds-header.component.html](src/app/components/vds-header/vds-header.component.html)**
   - Updated: `<ion-header [class.hero-variant]="variant === 'hero'">`

3. **[vds-header.component.scss](src/app/components/vds-header/vds-header.component.scss)**
   - Added: `.hero-variant` styles (81 lines)
   - Desktop: 0.55-0.65 opacity, 15px blur
   - Tablet: 0.65-0.75 opacity, 12px blur
   - Mobile: 0.70-0.80 opacity, 10px blur

4. **[app.component.ts](src/app/app.component.ts)**
   - Added: Route-based variant detection
   - Auto-applies 'hero' variant on /home-v2
   - Auto-resets to 'default' on navigation away

5. **[app.component.html](src/app/app.component.html)**
   - Updated: `<vds-header [variant]="headerVariant()"></vds-header>`

6. **[home-v2.page.scss](src/app/features/home-v2/home-v2.page.scss)**
   - Removed: Old `::ng-deep ion-header` overrides

---

## How to Test

### Test 1: Navigation to Home-V2

**Steps:**
1. Open the application
2. Navigate to `/home-v2` (or click the home link that goes to home-v2)
3. **Observe the header:**
   - Header should appear semi-transparent
   - Starfield background should be visible THROUGH the header
   - Text should remain crisp and readable
   - Tier 1 glow should be subtle (barely noticeable)

**Expected Result:** Header blends seamlessly with the starfield background

**Actual Result:** [Test and document here]

---

### Test 2: Desktop Viewport (>1024px)

**Setup:**
1. Open browser DevTools
2. Set viewport to 1920x1080 (or larger)
3. Navigate to `/home-v2`

**Expected Values:**
- Background opacity: 0.55-0.65 (medium transparency)
- Backdrop blur: 15px
- Border: 1px solid rgba(0, 255, 255, 0.08) (hairline)
- Shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.03)

**Visual Checks:**
- [ ] Starfield clearly visible through header
- [ ] Text remains crisp (WCAG AAA contrast)
- [ ] No text-shadow on brand or nav buttons
- [ ] Nav buttons show Tier 2 glow on hover (bright blue)
- [ ] Hero title has stronger glow (Tier 3)

**Actual Result:** [Test and document here]

---

### Test 3: Tablet Viewport (768px - 1024px)

**Setup:**
1. Open browser DevTools
2. Set viewport to 768x1024 (iPad landscape)
3. Navigate to `/home-v2`

**Expected Values:**
- Background opacity: 0.65-0.75 (more opaque)
- Backdrop blur: 12px (reduced)
- All other properties same as desktop

**Visual Checks:**
- [ ] Opacity increased (less starfield visible)
- [ ] Text still readable
- [ ] Blur slightly reduced
- [ ] Smooth transition from desktop sizing

**Actual Result:** [Test and document here]

---

### Test 4: Mobile Viewport (<768px)

**Setup:**
1. Open browser DevTools
2. Set viewport to 375x667 (iPhone SE)
3. Navigate to `/home-v2`

**Expected Values:**
- Background opacity: 0.70-0.80 (maximum opacity)
- Backdrop blur: 10px (reduced further)
- All other properties same as desktop

**Visual Checks:**
- [ ] Opacity further increased (minimal starfield visible)
- [ ] Text very readable (high contrast)
- [ ] Blur minimal for performance
- [ ] Mobile hamburger menu visible and functional

**Actual Result:** [Test and document here]

---

### Test 5: Route Switching

**Steps:**
1. Navigate to `/home-v2` (hero variant active)
2. Observe header styling
3. Navigate to `/ships` (should revert to default)
4. Observe header styling change
5. Navigate back to `/home-v2` (hero variant active again)

**Expected Behavior:**
- Header changes instantly when route changes
- Hero variant applies only on /home-v2
- Default variant applies on all other routes

**Actual Result:** [Test and document here]

---

### Test 6: Accessibility Verification

**Contrast Verification:**

**Desktop (0.55 opacity):**
- Expected contrast ratio: 11.4:1 (WCAG AAA)
- Use WebAIM Contrast Checker
- White text (#FFFFFF) on rgba(13, 20, 37, 0.55)

**Mobile (0.75 opacity):**
- Expected contrast ratio: 14.1:1 (WCAG AAA)
- White text (#FFFFFF) on rgba(13, 20, 37, 0.75)

**Keyboard Navigation:**
1. Tab through header nav buttons
2. [ ] Focus indicators visible
3. [ ] Can activate buttons with Enter/Space
4. [ ] No focus traps

**Screen Reader (if available):**
1. [ ] Header structure announced correctly
2. [ ] Nav buttons have proper labels
3. [ ] No duplicate announcements

**Actual Result:** [Test and document here]

---

### Test 7: Other Pages (Regression Testing)

**Navigation:**
1. Navigate to `/ships`
2. Navigate to `/stations`
3. Navigate to `/logistics`
4. Navigate to `/engineering`
5. Navigate to `/codex`
6. Navigate to `/media`
7. Navigate to `/updates`
8. Navigate to `/contact`

**Expected Behavior:**
- Header should show DEFAULT variant (not hero)
- Header should have original styling (0.8-0.95 opacity, dark)
- No visual changes from previous build

**Actual Result:** [Test and document here]

---

### Test 8: Cross-Browser Testing

| Browser | Version | Desktop | Tablet | Mobile | Blur Support | Notes |
|---------|---------|---------|--------|--------|--------------|-------|
| Chrome | Latest | [ ] | [ ] | [ ] | [ ] | Full support |
| Firefox | Latest | [ ] | [ ] | [ ] | [ ] | Full support |
| Safari | Latest | [ ] | [ ] | [ ] | [ ] | Full support |
| Edge | Latest | [ ] | [ ] | [ ] | [ ] | Full support |

**Action Items:**
- [ ] Test backdrop-filter blur works
- [ ] Verify colors render correctly
- [ ] Check for rendering artifacts
- [ ] Verify smooth transitions

**Actual Results:** [Test and document here]

---

### Test 9: Performance Verification

**Metrics to Check:**

1. **Bundle Size:**
   - Expected: No increase (CSS-only)
   - Measure: Run `npm run build` and note initial/lazy chunk sizes

2. **Rendering Performance:**
   - Expected: No performance degradation
   - How to test: Open DevTools Performance tab, navigate to home-v2, check frame rate

3. **Memory Usage:**
   - Expected: No increase (no JavaScript overhead)
   - How to test: DevTools Memory tab, take heap snapshot

4. **Route Transition Speed:**
   - Expected: Instant hero/default variant switching
   - How to test: Navigate between /home-v2 and other pages, observe timing

**Actual Results:** [Test and document here]

---

### Test 10: Special Cases

**Initial Page Load:**
1. Hard refresh on home-v2 (`F5` with cache disabled)
2. [ ] Hero variant applies immediately
3. [ ] No flash of default styling

**Deep Link:**
1. Open new tab
2. Go directly to `/home-v2` URL
3. [ ] Hero variant present on initial load

**Browser Back/Forward:**
1. Navigate to /home-v2
2. Navigate to /ships
3. Click browser back button
4. [ ] Hero variant applies correctly (no delay)

**Actual Results:** [Test and document here]

---

## Visual Verification Checklist

### Hero Variant Active (/home-v2)
- [ ] Header background is semi-transparent
- [ ] Starfield visible through header
- [ ] Brand text is white, no text-shadow
- [ ] Nav buttons are light gray/cyan (no opacity reduction)
- [ ] Border is very subtle (hairline)
- [ ] Shadow is soft (Tier 1 only)
- [ ] Hover glow on nav is bright blue (Tier 2)
- [ ] No glow on idle state

### Default Variant (Other Pages)
- [ ] Header background is dark and opaque
- [ ] Strong shadow creates "chrome" effect
- [ ] Border is visible but subtle
- [ ] Styling unchanged from previous build

---

## Debugging Tips

### If Hero Variant Not Applying:

1. **Check Route Detection:**
   - Open DevTools Console
   - Check app.component.ts ngOnInit logic
   - Verify `this.router.url` contains '/home-v2'

2. **Check CSS Class Application:**
   - Inspect header element in DevTools
   - Verify `hero-variant` class is present when on /home-v2
   - Verify class is absent on other routes

3. **Check CSS Rules:**
   - Inspect header ion-toolbar
   - Verify `.hero-variant ion-toolbar` rules are applied
   - Check for CSS specificity conflicts
   - Look for `!important` flags being overridden

4. **Check Component Input:**
   - Verify `[variant]="headerVariant()"` binding in app.component.html
   - Verify variant input property exists in vds-header.component.ts
   - Check browser console for Angular binding errors

### If Styling Looks Wrong:

1. **Check Opacity:**
   - Use DevTools color picker to verify rgba values
   - Expected: rgba(13, 20, 37, 0.55) at desktop
   - Check if `!important` flags are being respected

2. **Check Blur:**
   - Inspect computed styles for `backdrop-filter`
   - Expected: `blur(15px)` on desktop
   - Verify no conflicting filters

3. **Check Text Contrast:**
   - Use WebAIM Contrast Checker
   - Test white text on actual background
   - Should achieve 11.4:1 or higher

---

## Success Criteria

✅ **All tests pass when:**

1. **Visual:** Hero variant applies only on /home-v2, starfield visible through header
2. **Responsive:** Opacity increases and blur decreases at each breakpoint
3. **Text:** Remains readable and prominent (no muting of opacity)
4. **Glow:** Tier 1 ambient only on header, Tier 2 on hover, Tier 3 unchanged
5. **Navigation:** Auto-applies on route change, auto-resets on navigation away
6. **Regression:** No changes to other pages
7. **Accessibility:** WCAG AAA contrast maintained, keyboard navigation works
8. **Performance:** No bundle size increase, no rendering lag
9. **Cross-browser:** Works on Chrome, Firefox, Safari, Edge

---

## Sign-Off

**Testing Completed By:** [Your Name]
**Date:** [Date]
**Overall Status:** [ ] PASS / [ ] FAIL

**Issues Found:** [List any issues]

**Recommendations:** [List any improvements]

---

## Next Steps After Testing

If all tests pass:
1. [ ] Merge branch to main
2. [ ] Deploy to staging environment
3. [ ] Final QA approval
4. [ ] Deploy to production

If issues found:
1. [ ] Document each issue with steps to reproduce
2. [ ] Create fixes in new commits
3. [ ] Re-test affected areas
4. [ ] Verify no new regressions

---

## Additional Resources

- [HEADER_HERO_BLEND_IMPLEMENTATION.md](HEADER_HERO_BLEND_IMPLEMENTATION.md) - Full implementation details
- [HEADER_HERO_BLEND_PLAN.md](HEADER_HERO_BLEND_PLAN.md) - Original design plan
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verify text contrast
- [Angular Navigation Guide](https://angular.io/guide/router) - Router documentation
- [Ionic Header Documentation](https://ionicframework.com/docs/api/header) - Ionic ion-header

---

**Last Updated:** 2025-12-08 18:52 UTC
**Version:** 1.0 (Ready for Testing)
