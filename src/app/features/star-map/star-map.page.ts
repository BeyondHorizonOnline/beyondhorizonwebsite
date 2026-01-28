// src/app/star-map/star-map.page.ts
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
  signal, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RoutingService, RouteResponse } from '../../services/routing.service';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonItem, IonLabel, IonNote, IonInput,
  IonSegment, IonSegmentButton,
  IonButton, IonIcon, IonChip, IonRange
} from '@ionic/angular/standalone';

type P = { x: number; y: number; z: number };

/** ---- Galaxy backdrop config (from your meta) ---- */
const GALAXY_IMG_URL = 'assets/GalaxyDottedMap.png';
const GALAXY_BOUNDS = {
  minX: 2001.5400390625,
  maxX: 50076.23828125,
  minZ: 5409.990234375,
  maxZ: 47299.921875,
};
const MIN_ZOOM = 0.005;   // was ~0.1 — allow much farther zoom out
const MAX_ZOOM = 12;      // a little headroom for zooming in

// If the image appears flipped vertically versus your routes, set to true.
const FLIP_Y = false;
/** ------------------------------------------------- */

@Component({
  standalone: true,
  selector: 'app-star-map',
  templateUrl: './star-map.page.html',
  styleUrls: ['./star-map.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonItem, IonLabel, IonNote, IonInput,
    IonSegment, IonSegmentButton,
    IonButton, IonIcon, IonChip, IonRange,
  ],
})
export class StarMapPage implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  fromId = 2244677;
  toId = 2526077;
  shipJumpMax: number | null = 500;           // REQUIRED default
  metric: '2d' | '3d' = '3d';
  optimize: 'distance' | 'hops' = 'hops';   // default fewest jumps

  loading = signal(false);
  error = signal<string | null>(null);
  route = signal<RouteResponse | null>(null);

  /** Debug */
  showDebug = signal(false);
  lastPayload: any = null;

  /** Canvas/camera */
  private ctx!: CanvasRenderingContext2D;
  private w = 800; private h = 500;
  private dpr = 1;
  private zoom = 1.0;
  private offsetX = 0; private offsetY = 0;

  /** Pointer (touch/mouse) */
  private pointers = new Map<number, { x: number; y: number }>();
  private lastPan = { x: 0, y: 0, offsetX: 0, offsetY: 0 };
  private lastPinchDist = 0;

  /** Galaxy image */
  private bgImg = new Image();
  private bgReady = false;

  /** Hover tooltip */
  private mouseX = 0;
  private mouseY = 0;
  private hoveredWaypoint: { name: string; id: number; x: number; y: number; z: number; hopIndex: number } | null = null;

  /** Route animation */
  private animationProgress = 0;
  private animationId: number | null = null;
  private isAnimating = false;

  /** Listeners */
  private onResize = () => {};
  private onWheel = (e: WheelEvent) => {};
  private onPointerDown = (e: PointerEvent) => {};
  private onPointerMove = (e: PointerEvent) => {};
  private onPointerUpCancel = (e: PointerEvent) => {};
  private onMouseMove = (e: MouseEvent) => {};
  private onKeyDown = (e: KeyboardEvent) => {};

  constructor(private routing: RoutingService) {}

  ngOnInit() {
    const c = this.canvasRef.nativeElement;
    this.ctx = c.getContext('2d')!;
    c.style.touchAction = 'none'; // allow our mobile gestures

    const resize = () => {
      this.w = c.clientWidth || 800;
      this.h = 500; // adjust if you want a dynamic height
      this.dpr = Math.max(1, window.devicePixelRatio || 1);
      c.width = Math.max(1, Math.floor(this.w * this.dpr));
      c.height = Math.max(1, Math.floor(this.h * this.dpr));
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.draw();
    };
    this.onResize = resize;
    resize();
    window.addEventListener('resize', this.onResize);

    // Desktop wheel zoom
    this.onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.sign(e.deltaY) > 0 ? 0.9 : 1.1;
      const rect = c.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      this.zoomAtScreenPoint(factor, cx, cy);
    };
    c.addEventListener('wheel', this.onWheel, { passive: false });

    // Pointer (mouse + touch)
    this.onPointerDown = (e: PointerEvent) => {
      c.setPointerCapture?.(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (this.pointers.size === 1) {
        this.lastPan = { x: e.clientX, y: e.clientY, offsetX: this.offsetX, offsetY: this.offsetY };
      } else if (this.pointers.size === 2) {
        const [p1, p2] = Array.from(this.pointers.values());
        this.lastPinchDist = this.dist(p1, p2);
      }
    };

    this.onPointerMove = (e: PointerEvent) => {
      if (!this.pointers.has(e.pointerId)) return;
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (this.pointers.size === 1) {
        // Pan
        const p = this.pointers.values().next().value as { x: number; y: number };
        const dx = (p.x - this.lastPan.x) / this.zoom;
        const dy = (p.y - this.lastPan.y) / this.zoom;
        this.offsetX = this.lastPan.offsetX - dx;
        this.offsetY = this.lastPan.offsetY - dy;
        this.draw();
      } else if (this.pointers.size === 2) {
        // Pinch zoom anchored at gesture center
        const [p1, p2] = Array.from(this.pointers.values());
        const distNow = this.dist(p1, p2);
        if (this.lastPinchDist > 0 && distNow > 0) {
          const factor = distNow / this.lastPinchDist;
          const rect = c.getBoundingClientRect();
          const cx = (p1.x + p2.x) / 2 - rect.left;
          const cy = (p1.y + p2.y) / 2 - rect.top;
          this.zoomAtScreenPoint(factor, cx, cy);
        }
        this.lastPinchDist = distNow;
      }
    };

    this.onPointerUpCancel = (e: PointerEvent) => {
      this.pointers.delete(e.pointerId);
      if (this.pointers.size <= 1) this.lastPinchDist = 0;
      if (this.pointers.size === 1) {
        const p = this.pointers.values().next().value as { x: number; y: number };
        this.lastPan = { x: p.x, y: p.y, offsetX: this.offsetX, offsetY: this.offsetY };
      }
    };

    c.addEventListener('pointerdown', this.onPointerDown, { passive: false });
    window.addEventListener('pointermove', this.onPointerMove, { passive: false });
    window.addEventListener('pointerup', this.onPointerUpCancel, { passive: false });
    window.addEventListener('pointercancel', this.onPointerUpCancel, { passive: false });

    // Mouse move for hover tooltips
    this.onMouseMove = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.checkHover();
      if (!this.isAnimating) this.draw();
    };
    c.addEventListener('mousemove', this.onMouseMove);

    // Keyboard shortcuts
    this.onKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'r':
          this.resetView();
          break;
        case 'f':
          this.fitToRoute();
          break;
        case 'g':
          this.fitGalaxy();
          break;
        case 'c':
          this.centerView();
          break;
        case 'a':
          this.animateRoute();
          break;
      }
    };
    window.addEventListener('keydown', this.onKeyDown);

    // Load galaxy image once
    this.bgImg.src = GALAXY_IMG_URL;
    this.bgImg.onload = () => { this.bgReady = true; this.draw(); };
  }

  ngOnDestroy() {
    const c = this.canvasRef?.nativeElement;
    if (c) {
      c.removeEventListener('wheel', this.onWheel as any);
      c.removeEventListener('pointerdown', this.onPointerDown as any);
      c.removeEventListener('mousemove', this.onMouseMove as any);
    }
    window.removeEventListener('resize', this.onResize as any);
    window.removeEventListener('pointermove', this.onPointerMove as any);
    window.removeEventListener('pointerup', this.onPointerUpCancel as any);
    window.removeEventListener('pointercancel', this.onPointerUpCancel as any);
    window.removeEventListener('keydown', this.onKeyDown as any);
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }

  // ---------- helpers ----------
  private dist(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private worldToScreen(p: P) {
    const sx = (p.x - this.offsetX) * this.zoom + this.w / 2;
    const sy = (-(p.z) - this.offsetY) * this.zoom + this.h / 2;
    return { x: sx, y: sy };
  }

  private screenToWorld(sx: number, sy: number): { x: number; z: number } {
    const x = (sx - this.w / 2) / this.zoom + this.offsetX;
    const z = -((sy - this.h / 2) / this.zoom + this.offsetY);
    return { x, z };
  }

  /** Zoom around a screen point (cx,cy) keeping the world point under it stable */
  private zoomAtScreenPoint(factor: number, cx: number, cy: number) {
    const before = this.screenToWorld(cx, cy);
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, this.zoom * factor));
    const effFactor = newZoom / this.zoom;
    this.zoom = newZoom;
    const after = this.screenToWorld(cx, cy);
    this.offsetX += (before.x - after.x);
    this.offsetY += (after.z - before.z);
    this.draw();
  }

  /** Check if mouse is hovering over a waypoint */
  private checkHover() {
    const r = this.route();
    if (!r?.hops?.length) {
      this.hoveredWaypoint = null;
      return;
    }

    const threshold = 12; // pixels
    let closest: typeof this.hoveredWaypoint = null;
    let closestDist = Infinity;

    // Build unique waypoints list
    const waypoints: Array<{ p: P; name: string; id: number; hopIndex: number }> = [];
    r.hops.forEach((h, i) => {
      if (i === 0) {
        waypoints.push({ p: h.from, name: h.from.name || `System ${h.from.id}`, id: h.from.id, hopIndex: i });
      }
      waypoints.push({ p: h.to, name: h.to.name || `System ${h.to.id}`, id: h.to.id, hopIndex: i + 1 });
    });

    for (const wp of waypoints) {
      const screen = this.worldToScreen(wp.p);
      const dist = Math.hypot(screen.x - this.mouseX, screen.y - this.mouseY);
      if (dist < threshold && dist < closestDist) {
        closestDist = dist;
        closest = { name: wp.name, id: wp.id, x: wp.p.x, y: wp.p.y, z: wp.p.z, hopIndex: wp.hopIndex };
      }
    }

    this.hoveredWaypoint = closest;
  }

  /** Animate route drawing */
  animateRoute() {
    const r = this.route();
    if (!r?.hops?.length) return;

    // Cancel any existing animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.animationProgress = 0;
    this.isAnimating = true;

    const totalHops = r.hops.length;
    const duration = 3500; // 3.5 seconds for smoother animation
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      this.animationProgress = Math.min(1, elapsed / duration);

      this.draw();

      if (this.animationProgress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
        this.animationId = null;
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  // ---------- actions ----------
  async run(form?: NgForm) {
    if ((this.shipJumpMax ?? 0) <= 0) {
      this.error.set('Ship Jump Max is required.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.route.set(null);

    const payload = {
      from: Number(this.fromId),
      to: Number(this.toId),
      metric: this.metric,
      shipJumpMax: Number(this.shipJumpMax),
      optimize: this.optimize,
    };
    this.lastPayload = payload;

    try {
      const out = await this.routing.findRoute(payload);
      if (!out.ok) this.error.set(out.error || 'Route failed');
      this.route.set(out);
      this.centerViewOnRoute();
      // Auto-animate the route when it loads
      if (out.ok && out.hops?.length) {
        this.animateRoute();
      } else {
        this.draw();
      }
    } catch (e: any) {
      this.error.set(e?.message || 'Network error');
    } finally {
      this.loading.set(false);
    }
  }

  // Debug
  copyJson(which: 'route' | 'payload' = 'route') {
    const data = which === 'route' ? this.route() : this.lastPayload;
    if (!data) return;
    const text = JSON.stringify(data, null, 2);
    if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(text);
    else {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
  }
  downloadJson(which: 'route' | 'payload' = 'route') {
    const data = which === 'route' ? this.route() : this.lastPayload;
    if (!data) return;
    const text = JSON.stringify(data, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const ts = new Date();
    const stamp = [
      ts.getFullYear(),
      String(ts.getMonth() + 1).padStart(2, '0'),
      String(ts.getDate()).padStart(2, '0'),
      String(ts.getHours()).padStart(2, '0'),
      String(ts.getMinutes()).padStart(2, '0'),
    ].join('');
    const name = which === 'route' ? `route-${stamp}.json` : `payload-${stamp}.json`;
    const a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }
  toggleDebug() { this.showDebug.set(!this.showDebug()); }

  // View helpers
  centerView() { this.centerViewOnRoute(); this.draw(); }
  resetView() { this.zoom = 1.0; this.offsetX = 0; this.offsetY = 0; this.draw(); }

fitToRoute() {
  const b = this.getRouteBounds(); if (!b) return;
  const worldWidth  = Math.max(1e-6, b.maxX - b.minX);
  const worldHeight = Math.max(1e-6, b.maxZ - b.minZ);
  const pad = 40;

  const zx = (this.w - pad * 2) / worldWidth;
  const zy = (this.h - pad * 2) / worldHeight;
  const zNeeded = Math.max(1e-6, Math.min(zx, zy));

  // Only cap by MAX_ZOOM so we can go smaller than MIN_ZOOM if needed to fit
  this.zoom = Math.min(MAX_ZOOM, zNeeded);

  const cx = (b.minX + b.maxX) / 2;
  const cz = (b.minZ + b.maxZ) / 2;
  this.offsetX = cx; this.offsetY = -cz;
  this.draw();
}

  /** Fit the whole galaxy image into view */
fitGalaxy() {
  const pad = 40;
  const worldWidth  = Math.max(1e-6, GALAXY_BOUNDS.maxX - GALAXY_BOUNDS.minX);
  const worldHeight = Math.max(1e-6, GALAXY_BOUNDS.maxZ - GALAXY_BOUNDS.minZ);

  const zx = (this.w - pad * 2) / worldWidth;
  const zy = (this.h - pad * 2) / worldHeight;
  const zNeeded = Math.max(1e-6, Math.min(zx, zy));

  this.zoom = Math.min(MAX_ZOOM, zNeeded);

  const cx = (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2;
  const cz = (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2;
  this.offsetX = cx; this.offsetY = -cz;
  this.draw();
}

  private getRouteBounds(): { minX: number; maxX: number; minZ: number; maxZ: number } | null {
    const r = this.route(); if (!r?.hops?.length) return null;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const h of r.hops) {
      for (const p of [h.from, h.to]) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.z < minZ) minZ = p.z;
        if (p.z > maxZ) maxZ = p.z;
      }
    }
    return { minX, maxX, minZ, maxZ };
  }

private centerViewOnRoute() {
  const r = this.route(); if (!r?.hops?.length) return;
  this.fitToRoute(); // replaces the manual mid-point/0.6 zoom
}

  private draw() {
    const ctx = this.ctx; if (!ctx) return;
    ctx.clearRect(0, 0, this.w, this.h);

    /** --- Galaxy background aligned to world bounds --- */
    if (this.bgReady) {
      const topZ    = FLIP_Y ? GALAXY_BOUNDS.minZ : GALAXY_BOUNDS.maxZ;
      const bottomZ = FLIP_Y ? GALAXY_BOUNDS.maxZ : GALAXY_BOUNDS.minZ;

      const tl = this.worldToScreen({ x: GALAXY_BOUNDS.minX, y: 0, z: topZ });
      const br = this.worldToScreen({ x: GALAXY_BOUNDS.maxX, y: 0, z: bottomZ });

      const w = br.x - tl.x;
      const h = br.y - tl.y;
      ctx.drawImage(this.bgImg, tl.x, tl.y, w, h);
    }
    /** -------------------------------------------------- */

    // Grid (optional; leave on top of image but below route)
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,159,26,0.08)';
    for (let x = GALAXY_BOUNDS.minX; x <= GALAXY_BOUNDS.maxX; x += 2000) {
      const s1 = this.worldToScreen({ x, y:0, z: GALAXY_BOUNDS.minZ });
      const s2 = this.worldToScreen({ x, y:0, z: GALAXY_BOUNDS.maxZ });
      ctx.beginPath(); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); ctx.stroke();
    }
    for (let z = GALAXY_BOUNDS.minZ; z <= GALAXY_BOUNDS.maxZ; z += 2000) {
      const s1 = this.worldToScreen({ x: GALAXY_BOUNDS.minX, y:0, z });
      const s2 = this.worldToScreen({ x: GALAXY_BOUNDS.maxX, y:0, z });
      ctx.beginPath(); ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); ctx.stroke();
    }
    ctx.restore();

    const r = this.route();
    if (!r?.hops?.length) return;

    const totalHops = r.hops.length;
    const animatedHops = this.isAnimating
      ? Math.floor(this.animationProgress * totalHops)
      : totalHops;
    const partialProgress = this.isAnimating
      ? (this.animationProgress * totalHops) - animatedHops
      : 1;

    // Route polyline with animation support
    ctx.save();
    ctx.lineWidth = 2.25;
    ctx.strokeStyle = '#ff9f1a';
    ctx.shadowColor = this.isAnimating ? 'rgba(255,159,26,.65)' : 'rgba(255,159,26,.35)';
    ctx.shadowBlur = this.isAnimating ? 12 : 6;
    ctx.beginPath();

    for (let i = 0; i < animatedHops && i < totalHops; i++) {
      const h = r.hops[i];
      if (!h?.from || !h?.to) continue;
      const a = this.worldToScreen(h.from);
      const b = this.worldToScreen(h.to);
      if (i === 0) ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }

    // Partial segment for animation
    if (this.isAnimating && animatedHops < totalHops && partialProgress > 0) {
      const h = r.hops[animatedHops];
      if (h?.from && h?.to) {
        const a = this.worldToScreen(h.from);
        const b = this.worldToScreen(h.to);
        if (animatedHops === 0) ctx.moveTo(a.x, a.y);
        const px = a.x + (b.x - a.x) * partialProgress;
        const py = a.y + (b.y - a.y) * partialProgress;
        ctx.lineTo(px, py);
      }
    }

    ctx.stroke();
    ctx.restore();

    // Animated glow trail head
    if (this.isAnimating && animatedHops < totalHops) {
      const h = r.hops[animatedHops];
      if (h?.from && h?.to) {
        const a = this.worldToScreen(h.from);
        const b = this.worldToScreen(h.to);
        const px = a.x + (b.x - a.x) * partialProgress;
        const py = a.y + (b.y - a.y) * partialProgress;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,200,100,0.8)';
        ctx.shadowColor = '#ff9f1a';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
      }
    }

    // Points + ALL waypoint labels
    const fill = '#ffd08a';
    ctx.fillStyle = fill;
    ctx.font = '11px sans-serif';

    // Collect unique waypoints to avoid duplicate labels
    const drawnLabels = new Set<number>();

    r.hops.forEach((h, i) => {
      const a = this.worldToScreen(h.from);
      const b = this.worldToScreen(h.to);

      // Only draw points that have been animated
      const drawFrom = !this.isAnimating || i < animatedHops || (i === animatedHops && partialProgress > 0);
      const drawTo = !this.isAnimating || i < animatedHops;

      if (drawFrom) {
        ctx.save();
        ctx.fillStyle = fill;
        ctx.shadowColor = 'rgba(255,159,26,.45)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw label for all waypoints (not just endpoints)
        if (!drawnLabels.has(h.from.id)) {
          drawnLabels.add(h.from.id);
          const isEndpoint = i === 0;
          const label = h.from.name || `#${h.from.id}`;
          ctx.fillStyle = isEndpoint ? 'rgba(95,255,255,.9)' : 'rgba(255,208,138,.7)';
          ctx.fillText(label, a.x + 6, a.y - 6);
        }
      }

      if (drawTo) {
        ctx.save();
        ctx.fillStyle = fill;
        ctx.shadowColor = 'rgba(255,159,26,.45)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw label for all waypoints
        if (!drawnLabels.has(h.to.id)) {
          drawnLabels.add(h.to.id);
          const isEndpoint = i === r.hops!.length - 1;
          const label = h.to.name || `#${h.to.id}`;
          ctx.fillStyle = isEndpoint ? 'rgba(95,255,255,.9)' : 'rgba(255,208,138,.7)';
          ctx.fillText(label, b.x + 6, b.y - 6);
        }
      }
    });

    // Hover tooltip
    if (this.hoveredWaypoint && !this.isAnimating) {
      const wp = this.hoveredWaypoint;
      const screen = this.worldToScreen({ x: wp.x, y: wp.y, z: wp.z });

      // Highlight hovered point
      ctx.save();
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = '#5fffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#5fffff';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Draw tooltip box
      const tooltipLines = [
        wp.name,
        `ID: ${wp.id}`,
        `Hop: ${wp.hopIndex + 1}`,
        `X: ${wp.x.toFixed(1)}`,
        `Z: ${wp.z.toFixed(1)}`
      ];

      ctx.font = '12px sans-serif';
      const lineHeight = 16;
      const padding = 8;
      const maxWidth = Math.max(...tooltipLines.map(l => ctx.measureText(l).width));
      const boxWidth = maxWidth + padding * 2;
      const boxHeight = tooltipLines.length * lineHeight + padding * 2;

      // Position tooltip to avoid edge overflow
      let tx = screen.x + 15;
      let ty = screen.y - boxHeight / 2;
      if (tx + boxWidth > this.w) tx = screen.x - boxWidth - 15;
      if (ty < 0) ty = 5;
      if (ty + boxHeight > this.h) ty = this.h - boxHeight - 5;

      // Draw tooltip background
      ctx.save();
      ctx.fillStyle = 'rgba(10,14,26,0.95)';
      ctx.strokeStyle = 'rgba(95,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(tx, ty, boxWidth, boxHeight, 4);
      ctx.fill();
      ctx.stroke();

      // Draw tooltip text
      ctx.fillStyle = '#e0e4e8';
      tooltipLines.forEach((line, i) => {
        ctx.fillStyle = i === 0 ? '#5fffff' : '#e0e4e8';
        ctx.fillText(line, tx + padding, ty + padding + (i + 1) * lineHeight - 4);
      });
      ctx.restore();
    }
  }
}
