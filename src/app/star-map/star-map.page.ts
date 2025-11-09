// src/app/star-map/star-map.page.ts
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
  signal, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RoutingService, RouteResponse } from '../services/routing.service';
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
  toId = 9008810;
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

  /** Listeners */
  private onResize = () => {};
  private onWheel = (e: WheelEvent) => {};
  private onPointerDown = (e: PointerEvent) => {};
  private onPointerMove = (e: PointerEvent) => {};
  private onPointerUpCancel = (e: PointerEvent) => {};

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

    // Load galaxy image once
    this.bgImg.src = GALAXY_IMG_URL;
    this.bgImg.onload = () => { this.bgReady = true; this.draw(); };
  }

  ngOnDestroy() {
    const c = this.canvasRef?.nativeElement;
    if (c) {
      c.removeEventListener('wheel', this.onWheel as any);
      c.removeEventListener('pointerdown', this.onPointerDown as any);
    }
    window.removeEventListener('resize', this.onResize as any);
    window.removeEventListener('pointermove', this.onPointerMove as any);
    window.removeEventListener('pointerup', this.onPointerUpCancel as any);
    window.removeEventListener('pointercancel', this.onPointerUpCancel as any);
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
      this.draw();
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

    // Route polyline
    ctx.save();
    ctx.lineWidth = 2.25;
    ctx.strokeStyle = '#ff9f1a';
    ctx.shadowColor = 'rgba(255,159,26,.35)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    r.hops.forEach((h, i) => {
      const a = this.worldToScreen(h.from);
      const b = this.worldToScreen(h.to);
      if (i === 0) ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    });
    ctx.stroke();
    ctx.restore();

    // Points + end labels
    const fill = '#ffd08a';
    ctx.fillStyle = fill;
    r.hops.forEach((h, i) => {
      const a = this.worldToScreen(h.from);
      const b = this.worldToScreen(h.to);

      ctx.save();
      ctx.shadowColor = 'rgba(255,159,26,.45)';
      ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(a.x, a.y, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(b.x, b.y, 3.2, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      if (i === 0) {
        ctx.fillStyle = 'rgba(255,208,138,.85)';
        ctx.fillText(`${h.from.name || h.from.id}`, a.x + 6, a.y - 6);
        ctx.fillStyle = fill;
      }
      if (i === r.hops!.length - 1) {
        ctx.fillStyle = 'rgba(255,208,138,.85)';
        ctx.fillText(`${h.to.name || h.to.id}`, b.x + 6, b.y - 6);
        ctx.fillStyle = fill;
      }
    });
  }
}
