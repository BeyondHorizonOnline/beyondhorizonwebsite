// src/app/star-map-v2/star-map-v2.page.ts
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
  signal, computed, CUSTOM_ELEMENTS_SCHEMA, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoutingService, RouteResponse } from '../services/routing.service';
import { IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/** Galaxy bounds from existing star map */
const GALAXY_BOUNDS = {
  minX: 2001.5400390625,
  maxX: 50076.23828125,
  minZ: 5409.990234375,
  maxZ: 47299.921875,
};

/** Galaxy systems data structure */
interface GalaxyData {
  count: number;
  ids: number[];
  positions: number[];  // Flat: [x0,y0,z0, x1,y1,z1, ...]
  names: string[];
}

@Component({
  standalone: true,
  selector: 'app-star-map-v2',
  templateUrl: './star-map-v2.page.html',
  styleUrls: ['./star-map-v2.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonIcon, IonSpinner
  ],
})
export class StarMapV2Page implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  // Form inputs
  fromId = 2244677;
  toId = 2526077;
  shipJumpMax: number | null = 500;
  metric: '2d' | '3d' = '3d';
  optimize: 'distance' | 'hops' = 'hops';
  showImperial = signal(false);

  // State
  loading = signal(false);
  loadingGalaxy = signal(true);
  error = signal<string | null>(null);
  route = signal<RouteResponse | null>(null);
  systemCount = signal(0);
  panelCollapsed = signal(false);
  routePanelCollapsed = signal(false);
  showGrid = signal(true);
  showZones = signal(false);
  hoveredSystemIndex = signal<number | null>(null);

  // Route list items for the panel
  routeListItems = computed(() => {
    const r = this.route();
    if (!r?.hops?.length) return [];

    const items: { index: number; name: string; x: number; y: number; z: number; distance?: number; isStart: boolean; isEnd: boolean }[] = [];

    r.hops.forEach((hop, i) => {
      if (i === 0) {
        items.push({
          index: 0,
          name: hop.from.name || `System ${hop.from.id}`,
          x: hop.from.x,
          y: hop.from.y,
          z: hop.from.z,
          isStart: true,
          isEnd: false,
        });
      }
      items.push({
        index: i + 1,
        name: hop.to.name || `System ${hop.to.id}`,
        x: hop.to.x,
        y: hop.to.y,
        z: hop.to.z,
        distance: hop.distance,
        isStart: false,
        isEnd: i === r.hops!.length - 1,
      });
    });

    return items;
  });

  // Three.js objects (use 'any' to avoid TypeScript namespace conflicts)
  private renderer: any;
  private scene: any;
  private camera: any;
  private controls: any;
  private animationId: number | null = null;

  // Galaxy data
  private galaxyPoints: any = null;
  private galaxyData: GalaxyData | null = null;
  private routeLine: any = null;
  private waypointMarkers: any = null;
  private routeLabels: any = null;
  private gridHelper: any = null;
  private cardinalLabels: any = null;
  private zoneBoundaries: any = null;
  private nebulaMesh: any = null;
  private highlightMarker: any = null;
  private nebulaTime = 0;

  // Animation state
  private isAnimatingRoute = false;
  private routeAnimationProgress = 0;
  private animationStartTime = 0;
  private routeCurve: any = null;
  private routeWaypoints: any[] = [];
  private cameraStartPos: any = null;
  private cameraStartTarget: any = null;

  // Comet effect
  private cometHead: any = null;
  private cometGlow: any = null;
  private cometTrail: any = null;

  constructor(
    private http: HttpClient,
    private routing: RoutingService
  ) {}

  ngOnInit() {
    this.initThreeJS();
    this.loadGalaxyData();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  @HostListener('window:resize')
  onResize() {
    this.handleResize();
  }

  // ==================== Three.js Setup ====================

  togglePanel() {
    this.panelCollapsed.set(!this.panelCollapsed());
  }

  toggleRoutePanel() {
    this.routePanelCollapsed.set(!this.routePanelCollapsed());
  }

  highlightSystem(index: number) {
    this.hoveredSystemIndex.set(index);
    const items = this.routeListItems();
    const item = items[index];
    if (!item) return;

    // Create or update highlight marker
    if (!this.highlightMarker) {
      const geometry = new THREE.RingGeometry(180, 220, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      });
      this.highlightMarker = new THREE.Mesh(geometry, material);
      this.highlightMarker.rotation.x = -Math.PI / 2;
      this.scene.add(this.highlightMarker);
    }

    this.highlightMarker.position.set(item.x, item.y + 20, item.z);
    this.highlightMarker.visible = true;

    // Also scale up the corresponding waypoint marker
    if (this.waypointMarkers?.children[index]) {
      this.waypointMarkers.children[index].scale.setScalar(2);
    }
  }

  clearHighlight() {
    const prevIndex = this.hoveredSystemIndex();
    this.hoveredSystemIndex.set(null);

    if (this.highlightMarker) {
      this.highlightMarker.visible = false;
    }

    // Reset waypoint marker scale
    if (prevIndex !== null && this.waypointMarkers?.children[prevIndex]) {
      this.waypointMarkers.children[prevIndex].scale.setScalar(1);
    }
  }

  focusSystem(item: { x: number; y: number; z: number; name: string }) {
    // Move camera to focus on this system
    const distance = 3000;
    this.controls.target.set(item.x, item.y, item.z);
    this.camera.position.set(item.x, item.y + distance * 0.6, item.z + distance * 0.8);
    this.controls.update();
  }

  private initThreeJS() {
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Renderer - fullscreen
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x050810, 1);
    container.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0a0e1a, 30000, 80000);

    // Camera - positioned to look down at galaxy plane
    const galaxyCenterX = (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2;
    const galaxyCenterZ = (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 100, 200000);
    this.camera.position.set(galaxyCenterX, 25000, galaxyCenterZ + 20000);
    this.camera.lookAt(galaxyCenterX, 0, galaxyCenterZ);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1000;
    this.controls.maxDistance = 100000;
    this.controls.target.set(galaxyCenterX, 0, galaxyCenterZ);
    this.controls.update();

    // Grid helper for depth perception
    this.addGrid();

    // Add animated nebula background
    this.addNebula();

    // Start render loop
    this.animate();
  }

  private addGrid() {
    const gridSize = GALAXY_BOUNDS.maxX - GALAXY_BOUNDS.minX;
    const gridDivisions = 20;
    this.gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ffff, 0x1a2a4a);
    this.gridHelper.position.set(
      (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2,
      -50,
      (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2
    );
    this.gridHelper.material.opacity = 0.15;
    this.gridHelper.material.transparent = true;
    this.scene.add(this.gridHelper);

    // Add cardinal direction labels
    this.addCardinalLabels();

    // Add zone boundary lines
    this.addZoneBoundaries();
  }

  private addZoneBoundaries() {
    // Will be called after galaxy data loads to draw boundaries around star clusters
    this.zoneBoundaries = new THREE.Group();
    this.zoneBoundaries.visible = this.showZones();
    this.scene.add(this.zoneBoundaries);
  }

  private buildStarBoundaries() {
    if (!this.galaxyData || !this.zoneBoundaries) return;

    // Clear existing boundaries
    while (this.zoneBoundaries.children.length > 0) {
      this.zoneBoundaries.remove(this.zoneBoundaries.children[0]);
    }

    const positions = this.galaxyData.positions;
    const count = this.galaxyData.count;

    // Create a 100x100 density grid for zones
    const gridResolution = 100;
    const minX = GALAXY_BOUNDS.minX;
    const maxX = GALAXY_BOUNDS.maxX;
    const minZ = GALAXY_BOUNDS.minZ;
    const maxZ = GALAXY_BOUNDS.maxZ;
    const cellWidth = (maxX - minX) / gridResolution;
    const cellDepth = (maxZ - minZ) / gridResolution;

    // Count stars in each cell
    const grid: number[][] = [];
    for (let i = 0; i < gridResolution; i++) {
      grid[i] = new Array(gridResolution).fill(0);
    }

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      const cellX = Math.floor((x - minX) / cellWidth);
      const cellZ = Math.floor((z - minZ) / cellDepth);
      if (cellX >= 0 && cellX < gridResolution && cellZ >= 0 && cellZ < gridResolution) {
        grid[cellX][cellZ]++;
      }
    }

    // Threshold for populated cells
    const threshold = 1;

    // Find connected regions using flood fill
    const visited: boolean[][] = [];
    for (let i = 0; i < gridResolution; i++) {
      visited[i] = new Array(gridResolution).fill(false);
    }

    const regions: { cells: [number, number][], color: number, name: string }[] = [];
    const regionColors = [0x00ffff, 0xff6600, 0x00ff66, 0xff0066, 0x6600ff, 0xffff00];
    const regionNames = ['Alpha Sector', 'Beta Sector', 'Gamma Sector', 'Delta Sector', 'Epsilon Sector', 'Zeta Sector'];
    let regionIndex = 0;

    for (let startI = 0; startI < gridResolution; startI++) {
      for (let startJ = 0; startJ < gridResolution; startJ++) {
        if (grid[startI][startJ] >= threshold && !visited[startI][startJ]) {
          // Flood fill to find connected region
          const regionCells: [number, number][] = [];
          const stack: [number, number][] = [[startI, startJ]];

          while (stack.length > 0) {
            const [i, j] = stack.pop()!;
            if (i < 0 || i >= gridResolution || j < 0 || j >= gridResolution) continue;
            if (visited[i][j] || grid[i][j] < threshold) continue;

            visited[i][j] = true;
            regionCells.push([i, j]);

            stack.push([i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]);
          }

          // Only keep regions with significant size
          if (regionCells.length > 20) {
            regions.push({
              cells: regionCells,
              color: regionColors[regionIndex % regionColors.length],
              name: regionNames[regionIndex % regionNames.length]
            });
            regionIndex++;
          }
        }
      }
    }

    const y = 50;

    // Draw each region with fill and boundary
    for (const region of regions) {
      // Create fill for each cell in region
      const fillMaterial = new THREE.MeshBasicMaterial({
        color: region.color,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      // Calculate region centroid for label
      let centroidX = 0, centroidZ = 0;

      for (const [i, j] of region.cells) {
        const cellX1 = minX + i * cellWidth;
        const cellZ1 = minZ + j * cellDepth;

        centroidX += cellX1 + cellWidth / 2;
        centroidZ += cellZ1 + cellDepth / 2;

        // Create fill quad for this cell
        const fillGeometry = new THREE.PlaneGeometry(cellWidth, cellDepth);
        const fillMesh = new THREE.Mesh(fillGeometry, fillMaterial);
        fillMesh.rotation.x = -Math.PI / 2;
        fillMesh.position.set(cellX1 + cellWidth / 2, y, cellZ1 + cellDepth / 2);
        this.zoneBoundaries.add(fillMesh);
      }

      centroidX /= region.cells.length;
      centroidZ /= region.cells.length;

      // Add region label
      const label = this.createRegionLabel(region.name, region.color);
      label.position.set(centroidX, y + 500, centroidZ);
      this.zoneBoundaries.add(label);

      // Draw boundary lines
      const boundaryMaterial = new THREE.LineBasicMaterial({
        color: region.color,
        transparent: true,
        opacity: 0.5,
      });

      const drawnEdges = new Set<string>();

      for (const [i, j] of region.cells) {
        const cellX1 = minX + i * cellWidth;
        const cellX2 = minX + (i + 1) * cellWidth;
        const cellZ1 = minZ + j * cellDepth;
        const cellZ2 = minZ + (j + 1) * cellDepth;

        // Check each edge
        const leftEmpty = i === 0 || grid[i - 1][j] < threshold;
        const rightEmpty = i === gridResolution - 1 || grid[i + 1][j] < threshold;
        const topEmpty = j === 0 || grid[i][j - 1] < threshold;
        const bottomEmpty = j === gridResolution - 1 || grid[i][j + 1] < threshold;

        if (leftEmpty) {
          const key = `v_${i}_${j}`;
          if (!drawnEdges.has(key)) {
            drawnEdges.add(key);
            const points = [new THREE.Vector3(cellX1, y + 10, cellZ1), new THREE.Vector3(cellX1, y + 10, cellZ2)];
            this.zoneBoundaries.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), boundaryMaterial));
          }
        }
        if (rightEmpty) {
          const key = `v_${i + 1}_${j}`;
          if (!drawnEdges.has(key)) {
            drawnEdges.add(key);
            const points = [new THREE.Vector3(cellX2, y + 10, cellZ1), new THREE.Vector3(cellX2, y + 10, cellZ2)];
            this.zoneBoundaries.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), boundaryMaterial));
          }
        }
        if (topEmpty) {
          const key = `h_${i}_${j}`;
          if (!drawnEdges.has(key)) {
            drawnEdges.add(key);
            const points = [new THREE.Vector3(cellX1, y + 10, cellZ1), new THREE.Vector3(cellX2, y + 10, cellZ1)];
            this.zoneBoundaries.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), boundaryMaterial));
          }
        }
        if (bottomEmpty) {
          const key = `h_${i}_${j + 1}`;
          if (!drawnEdges.has(key)) {
            drawnEdges.add(key);
            const points = [new THREE.Vector3(cellX1, y + 10, cellZ2), new THREE.Vector3(cellX2, y + 10, cellZ2)];
            this.zoneBoundaries.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), boundaryMaterial));
          }
        }
      }
    }
  }

  private createRegionLabel(text: string, color: number): any {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Convert hex color to CSS
    const hexColor = '#' + color.toString(16).padStart(6, '0');

    // Draw text with glow
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = hexColor;
    ctx.shadowBlur = 20;
    ctx.fillStyle = hexColor;
    ctx.fillText(text, 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      depthTest: false,
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(6000, 1500, 1);
    return sprite;
  }

  private addCardinalLabels() {
    this.cardinalLabels = new THREE.Group();

    const centerX = (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2;
    const centerZ = (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2;
    const offsetX = (GALAXY_BOUNDS.maxX - GALAXY_BOUNDS.minX) / 2 + 2000;
    const offsetZ = (GALAXY_BOUNDS.maxZ - GALAXY_BOUNDS.minZ) / 2 + 2000;
    const y = 500; // Height above grid

    // N, S, E, W positions (treating -Z as North, +Z as South, +X as East, -X as West)
    const directions = [
      { label: 'N', x: centerX, z: GALAXY_BOUNDS.minZ - 2000 },
      { label: 'S', x: centerX, z: GALAXY_BOUNDS.maxZ + 2000 },
      { label: 'E', x: GALAXY_BOUNDS.maxX + 2000, z: centerZ },
      { label: 'W', x: GALAXY_BOUNDS.minX - 2000, z: centerZ },
    ];

    directions.forEach(dir => {
      const sprite = this.createCardinalSprite(dir.label);
      sprite.position.set(dir.x, y, dir.z);
      this.cardinalLabels.add(sprite);
    });

    this.scene.add(this.cardinalLabels);
  }

  private createCardinalSprite(label: string): any {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw letter with glow effect
    ctx.font = 'bold 180px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Outer glow
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 30;
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.fillText(label, 128, 128);

    // Main text
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#00ffff';
    ctx.fillText(label, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.6,
      depthTest: false,
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(3000, 3000, 1);
    return sprite;
  }

  toggleGrid() {
    this.showGrid.set(!this.showGrid());
    if (this.gridHelper) {
      this.gridHelper.visible = this.showGrid();
    }
    if (this.cardinalLabels) {
      this.cardinalLabels.visible = this.showGrid();
    }
  }

  toggleZones() {
    this.showZones.set(!this.showZones());
    if (this.zoneBoundaries) {
      this.zoneBoundaries.visible = this.showZones();
    }
  }

  private addNebula() {
    // Create animated nebula shader
    const nebulaGeometry = new THREE.PlaneGeometry(200000, 200000);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x1a0a2e) },
        color2: { value: new THREE.Color(0x0a1628) },
        color3: { value: new THREE.Color(0x16213e) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;

        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vec2 uv = vUv * 3.0;
          float t = time * 0.05;

          float n1 = snoise(vec3(uv * 0.5, t)) * 0.5 + 0.5;
          float n2 = snoise(vec3(uv * 1.0 + 100.0, t * 0.7)) * 0.5 + 0.5;
          float n3 = snoise(vec3(uv * 2.0 + 200.0, t * 0.5)) * 0.5 + 0.5;

          vec3 col = mix(color1, color2, n1);
          col = mix(col, color3, n2 * 0.5);
          col += vec3(0.02, 0.01, 0.03) * n3;

          // Add subtle glow spots
          float glow = pow(n1 * n2, 3.0) * 0.3;
          col += vec3(0.1, 0.05, 0.15) * glow;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });

    this.nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    this.nebulaMesh.position.set(
      (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2,
      -5000,
      (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2
    );
    this.nebulaMesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.nebulaMesh);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();

    // Update nebula animation
    if (this.nebulaMesh) {
      this.nebulaTime += 0.016;
      this.nebulaMesh.material.uniforms.time.value = this.nebulaTime;
    }

    // Update route animation if active
    if (this.isAnimatingRoute) {
      this.updateRouteAnimation();
    }

    this.renderer.render(this.scene, this.camera);
  };

  private handleResize() {
    const container = this.containerRef?.nativeElement;
    if (!container || !this.renderer || !this.camera) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.containerRef?.nativeElement?.removeChild(this.renderer.domElement);
    }
    if (this.controls) {
      this.controls.dispose();
    }
    // Dispose geometries and materials
    this.scene?.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    });
  }

  // ==================== Galaxy Data ====================

  private async loadGalaxyData() {
    try {
      const data = await this.http.get<GalaxyData>('assets/data/galaxy-systems.json').toPromise();
      if (!data) throw new Error('No data received');

      this.galaxyData = data;
      this.systemCount.set(data.count);
      this.createGalaxyPoints(data);
      this.buildStarBoundaries(); // Draw boundaries around star clusters
      this.loadingGalaxy.set(false);
    } catch (e: any) {
      console.error('Failed to load galaxy data:', e);
      this.error.set('Failed to load galaxy systems');
      this.loadingGalaxy.set(false);
    }
  }

  private createGalaxyPoints(data: GalaxyData) {
    const geometry = new THREE.BufferGeometry();

    // Modify positions to add random Y height variation for 3D depth
    const positions = new Float32Array(data.positions.length);
    for (let i = 0; i < data.count; i++) {
      const idx = i * 3;
      positions[idx] = data.positions[idx];         // X stays same
      // Y: add random variation (-2000 to +2000) on top of existing value
      positions[idx + 1] = data.positions[idx + 1] + (Math.random() - 0.5) * 4000;
      positions[idx + 2] = data.positions[idx + 2]; // Z stays same
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Random star colors - different star types
    const colors = new Float32Array(data.count * 3);
    const starColors = [
      [1.0, 1.0, 1.0],       // White
      [0.9, 0.95, 1.0],      // Blue-white
      [0.7, 0.85, 1.0],      // Light blue
      [0.5, 0.7, 1.0],       // Blue
      [1.0, 0.95, 0.8],      // Yellow-white
      [1.0, 0.85, 0.6],      // Yellow
      [1.0, 0.7, 0.4],       // Orange
      [1.0, 0.5, 0.3],       // Red-orange
      [0.8, 0.9, 1.0],       // Pale blue
      [0.6, 0.8, 0.95],      // Cyan-ish
    ];

    for (let i = 0; i < data.count; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      // Add slight random variation to each color
      colors[i * 3] = color[0] * (0.8 + Math.random() * 0.2);
      colors[i * 3 + 1] = color[1] * (0.8 + Math.random() * 0.2);
      colors[i * 3 + 2] = color[2] * (0.8 + Math.random() * 0.2);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Random sizes for variety
    const sizes = new Float32Array(data.count);
    for (let i = 0; i < data.count; i++) {
      sizes[i] = 40 + Math.random() * 80; // 40-120 size range
    }
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create circular star texture
    const starTexture = this.createStarTexture();

    const material = new THREE.PointsMaterial({
      size: 80,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      map: starTexture,
      alphaMap: starTexture,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.galaxyPoints = new THREE.Points(geometry, material);
    this.scene.add(this.galaxyPoints);
  }

  private createStarTexture(): any {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    // Create radial gradient for soft circular star
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createCometGlowTexture(): any {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;

    // Create multi-layered FIREBALL glow - orange/red/yellow
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');      // White hot center
    gradient.addColorStop(0.1, 'rgba(255, 255, 200, 0.95)'); // Bright yellow
    gradient.addColorStop(0.2, 'rgba(255, 220, 100, 0.85)'); // Yellow-orange
    gradient.addColorStop(0.35, 'rgba(255, 160, 50, 0.6)');  // Orange
    gradient.addColorStop(0.5, 'rgba(255, 100, 20, 0.4)');   // Deep orange
    gradient.addColorStop(0.7, 'rgba(200, 50, 0, 0.2)');     // Red-orange
    gradient.addColorStop(0.85, 'rgba(150, 20, 0, 0.1)');    // Dark red
    gradient.addColorStop(1, 'rgba(80, 0, 0, 0)');           // Fade to transparent

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  private createCometTrail() {
    // Create particle trail for FIREBALL sparks behind comet
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Initialize particles at origin (will be updated during animation)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Fireball colors - orange/red/yellow gradient based on position in trail
      const t = i / particleCount;
      if (t < 0.3) {
        // Front of trail - bright yellow/white
        colors[i * 3] = 1.0;                           // R
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; // G
        colors[i * 3 + 2] = 0.5 + Math.random() * 0.3; // B
      } else if (t < 0.6) {
        // Middle - orange
        colors[i * 3] = 1.0;                           // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.1 * Math.random();       // B
      } else {
        // Back of trail - red/dark orange
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 0;                          // B
      }

      sizes[i] = 30 + Math.random() * 50;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const trailTexture = this.createStarTexture();
    const material = new THREE.PointsMaterial({
      size: 40,
      map: trailTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.cometTrail = new THREE.Points(geometry, material);
    this.scene.add(this.cometTrail);
  }

  // ==================== Route Handling ====================

  async computeRoute() {
    if ((this.shipJumpMax ?? 0) <= 0) {
      this.error.set('Ship Jump Max is required.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.clearRoute();

    try {
      const result = await this.routing.findRoute({
        from: Number(this.fromId),
        to: Number(this.toId),
        metric: this.metric,
        shipJumpMax: Number(this.shipJumpMax),
        optimize: this.optimize,
      });

      if (!result.ok) {
        this.error.set(result.error || 'Route calculation failed');
      } else {
        this.route.set(result);
        this.drawRoute(result);
        // Don't call fitToRoute here - the fly-through animation handles camera positioning
        this.animateRouteDrawing();
      }
    } catch (e: any) {
      this.error.set(e?.message || 'Network error');
    } finally {
      this.loading.set(false);
    }
  }

  private clearRoute() {
    if (this.routeLine) {
      this.scene.remove(this.routeLine);
      this.routeLine.geometry.dispose();
      this.routeLine.material.dispose();
      this.routeLine = null;
    }
    if (this.waypointMarkers) {
      this.scene.remove(this.waypointMarkers);
      this.waypointMarkers = null;
    }
    if (this.routeLabels) {
      this.scene.remove(this.routeLabels);
      this.routeLabels = null;
    }
    // Clean up comet effect
    if (this.cometHead) {
      this.scene.remove(this.cometHead);
      this.cometHead = null;
    }
    if (this.cometGlow) {
      this.scene.remove(this.cometGlow);
      this.cometGlow = null;
    }
    if (this.cometTrail) {
      this.scene.remove(this.cometTrail);
      this.cometTrail = null;
    }
    this.route.set(null);
    this.isAnimatingRoute = false;
    this.routeCurve = null;
    this.routeWaypoints = [];
  }

  private drawRoute(result: RouteResponse) {
    if (!result.hops?.length) return;

    // Collect waypoints for camera animation
    this.routeWaypoints = [];
    result.hops.forEach((hop, i) => {
      if (i === 0) {
        this.routeWaypoints.push(new THREE.Vector3(hop.from.x, hop.from.y, hop.from.z));
      }
      this.routeWaypoints.push(new THREE.Vector3(hop.to.x, hop.to.y, hop.to.z));
    });

    // Create smooth curve through waypoints using CatmullRomCurve3
    this.routeCurve = new THREE.CatmullRomCurve3(this.routeWaypoints, false, 'catmullrom', 0.5);

    // Generate many interpolated points for smooth line (50 points per segment)
    const totalSegments = this.routeWaypoints.length - 1;
    const pointsPerSegment = 50;
    const smoothPoints = this.routeCurve.getPoints(totalSegments * pointsPerSegment);

    const geometry = new THREE.BufferGeometry().setFromPoints(smoothPoints);

    // Fireball trail line - bright orange/gold
    const material = new THREE.LineBasicMaterial({
      color: 0xff8800,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });

    this.routeLine = new THREE.Line(geometry, material);
    this.scene.add(this.routeLine);

    // Create comet head - bright yellow-white fireball core
    const cometHeadGeometry = new THREE.SphereGeometry(100, 16, 16);
    const cometHeadMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffcc,  // Bright yellow-white
      transparent: true,
      opacity: 1,
    });
    this.cometHead = new THREE.Mesh(cometHeadGeometry, cometHeadMaterial);
    this.scene.add(this.cometHead);

    // Create comet glow - larger soft sprite for the glow effect
    const glowTexture = this.createCometGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.cometGlow = new THREE.Sprite(glowMaterial);
    this.cometGlow.scale.set(600, 600, 1);
    this.scene.add(this.cometGlow);

    // Create comet trail - particle system for sparks
    this.createCometTrail();

    // Add waypoint markers (smaller size)
    this.waypointMarkers = new THREE.Group();
    this.routeLabels = new THREE.Group();

    const startGeometry = new THREE.SphereGeometry(120, 12, 12);
    const endGeometry = new THREE.SphereGeometry(120, 12, 12);
    const hopGeometry = new THREE.SphereGeometry(60, 8, 8);

    const startMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const endMaterial = new THREE.MeshBasicMaterial({ color: 0xff4444 });
    const hopMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8 });

    result.hops.forEach((hop, i) => {
      if (i === 0) {
        const startMarker = new THREE.Mesh(startGeometry, startMaterial);
        startMarker.position.set(hop.from.x, hop.from.y, hop.from.z);
        this.waypointMarkers!.add(startMarker);

        // Add start label
        this.addSystemLabel(hop.from.name || `System ${hop.from.id}`, hop.from.x, hop.from.y + 200, hop.from.z, 0x00ff88);
      }

      const isEnd = i === result.hops!.length - 1;
      const marker = new THREE.Mesh(
        isEnd ? endGeometry : hopGeometry,
        isEnd ? endMaterial : hopMaterial
      );
      marker.position.set(hop.to.x, hop.to.y, hop.to.z);
      this.waypointMarkers!.add(marker);

      // Add label for end and intermediate waypoints
      const labelColor = isEnd ? 0xff4444 : 0xffaa00;
      this.addSystemLabel(hop.to.name || `System ${hop.to.id}`, hop.to.x, hop.to.y + 200, hop.to.z, labelColor);
    });

    this.scene.add(this.waypointMarkers);
    this.scene.add(this.routeLabels);
  }

  private addSystemLabel(text: string, x: number, y: number, z: number, color: number) {
    // Create sprite-based label
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 64;

    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Text shadow for readability
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillText(text, canvas.width / 2 + 2, canvas.height / 2 + 2);

    // Main text
    const hexColor = '#' + color.toString(16).padStart(6, '0');
    ctx.fillStyle = hexColor;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(x, y, z);
    sprite.scale.set(800, 100, 1);

    this.routeLabels.add(sprite);
  }

  private fitToRoute(result: RouteResponse) {
    if (!result.hops?.length) return;

    // Calculate route bounds
    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    for (const hop of result.hops) {
      for (const p of [hop.from, hop.to]) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minZ = Math.min(minZ, p.z);
        maxZ = Math.max(maxZ, p.z);
      }
    }

    const centerX = (minX + maxX) / 2;
    const centerZ = (minZ + maxZ) / 2;
    const size = Math.max(maxX - minX, maxZ - minZ) || 5000;

    // Position camera to see route with padding
    const distance = size * 1.5;

    this.controls.target.set(centerX, 0, centerZ);
    this.camera.position.set(centerX, distance * 0.8, centerZ + distance * 0.6);
    this.controls.update();
  }

  private animateRouteDrawing() {
    if (!this.routeLine || !this.routeCurve) return;

    // Use drawRange to animate line drawing
    const geometry = this.routeLine.geometry;
    geometry.setDrawRange(0, 0);
    this.routeAnimationProgress = 0;
    this.animationStartTime = performance.now();
    this.isAnimatingRoute = true;

    // Dim stars to make route more prominent
    if (this.galaxyPoints?.material) {
      this.galaxyPoints.material.opacity = 0.15;
    }

    // Store camera start position for smooth return at end
    this.cameraStartPos = this.camera.position.clone();
    this.cameraStartTarget = this.controls.target.clone();

    // Position camera BEHIND the start point, looking DOWN at the path (semi truck view)
    const startPoint = this.routeCurve.getPoint(0);
    const lookAheadPoint = this.routeCurve.getPoint(0.03);

    // Direction of travel
    const direction = new THREE.Vector3().subVectors(lookAheadPoint, startPoint).normalize();

    // Camera offset: BEHIND and HIGH above the comet, looking down
    const cameraOffset = new THREE.Vector3()
      .addScaledVector(direction, -1200)  // Behind the comet
      .add(new THREE.Vector3(0, 1400, 0)); // High above

    this.camera.position.copy(startPoint).add(cameraOffset);
    // Look at a point closer to the comet (not far ahead) to angle down
    this.controls.target.copy(startPoint);
    this.controls.update();

    // Position comet at start
    if (this.cometHead) {
      this.cometHead.position.copy(startPoint);
      this.cometHead.visible = true;
    }
    if (this.cometGlow) {
      this.cometGlow.position.copy(startPoint);
      this.cometGlow.visible = true;
    }
    if (this.cometTrail) {
      this.cometTrail.visible = true;
    }

    // Also hide markers/labels initially, reveal as animation progresses
    if (this.waypointMarkers) {
      this.waypointMarkers.children.forEach((child: any) => {
        child.visible = false;
      });
    }
    if (this.routeLabels) {
      this.routeLabels.children.forEach((child: any) => {
        child.visible = false;
      });
    }
  }

  private updateRouteAnimation() {
    if (!this.routeLine || !this.isAnimatingRoute || !this.routeCurve) return;

    const geometry = this.routeLine.geometry;
    const posCount = geometry.attributes.position.count;

    // Time-based animation over 30 seconds for slower, cinematic fly-through
    const elapsed = performance.now() - this.animationStartTime;
    const duration = 30000; // 30 seconds
    const rawProgress = Math.min(1, elapsed / duration);

    // Linear progress for consistent speed throughout
    this.routeAnimationProgress = rawProgress;

    // Update line draw range
    const visiblePoints = Math.max(1, Math.floor(posCount * this.routeAnimationProgress));
    geometry.setDrawRange(0, visiblePoints);

    // Get comet position (at the front of the drawn line)
    const cometT = this.routeAnimationProgress;
    const cometPos = this.routeCurve.getPoint(cometT);

    // Update comet head and glow positions
    if (this.cometHead) {
      this.cometHead.position.copy(cometPos);
      // Pulsing glow effect
      const pulse = 1 + Math.sin(elapsed * 0.01) * 0.2;
      this.cometHead.scale.setScalar(pulse);
    }
    if (this.cometGlow) {
      this.cometGlow.position.copy(cometPos);
      // Larger pulsing glow
      const glowPulse = 600 + Math.sin(elapsed * 0.008) * 100;
      this.cometGlow.scale.set(glowPulse, glowPulse, 1);
    }

    // Update comet trail - sparks behind the comet
    this.updateCometTrail(cometPos, cometT);

    // Camera fly-through: HIGH BEHIND the comet looking DOWN (semi truck view)
    if (this.routeAnimationProgress < 0.85) {
      const lookT = Math.min(1, this.routeAnimationProgress + 0.04);
      const lookAheadPoint = this.routeCurve.getPoint(lookT);

      // Direction of travel
      const direction = new THREE.Vector3().subVectors(lookAheadPoint, cometPos);
      if (direction.length() > 0) {
        direction.normalize();
      }

      // Camera offset: HIGH above and BEHIND the comet (semi truck looking down at car)
      const cameraOffset = new THREE.Vector3()
        .addScaledVector(direction, -1200)  // Behind the comet
        .add(new THREE.Vector3(0, 1400, 0)); // High above

      // Smooth camera movement with lerp
      const targetCamPos = cometPos.clone().add(cameraOffset);
      this.camera.position.lerp(targetCamPos, 0.03);  // Smooth follow
      // Look at the comet itself (not far ahead) to angle down
      this.controls.target.lerp(cometPos, 0.03);
      this.controls.update();
    } else if (this.routeAnimationProgress < 1) {
      // Smooth transition to overview at end (last 15%)
      const overviewT = (this.routeAnimationProgress - 0.85) / 0.15;
      const easeT = this.easeInOutCubic(overviewT);

      // Gradually restore star brightness during pullback
      if (this.galaxyPoints?.material) {
        this.galaxyPoints.material.opacity = 0.15 + (0.7 * easeT);
      }

      // Fade out comet
      if (this.cometHead?.material) {
        this.cometHead.material.opacity = 1 - easeT;
      }
      if (this.cometGlow?.material) {
        this.cometGlow.material.opacity = 1 - easeT;
      }
      if (this.cometTrail?.material) {
        this.cometTrail.material.opacity = 0.8 * (1 - easeT);
      }

      // Calculate overview position
      const route = this.route();
      if (route?.hops?.length) {
        let minX = Infinity, maxX = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;
        for (const hop of route.hops) {
          for (const p of [hop.from, hop.to]) {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minZ = Math.min(minZ, p.z);
            maxZ = Math.max(maxZ, p.z);
          }
        }
        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;
        const size = Math.max(maxX - minX, maxZ - minZ) || 5000;
        const distance = size * 1.8;

        const overviewPos = new THREE.Vector3(centerX, distance * 0.9, centerZ + distance * 0.7);
        const overviewTarget = new THREE.Vector3(centerX, 0, centerZ);

        this.camera.position.lerp(overviewPos, easeT * 0.06);
        this.controls.target.lerp(overviewTarget, easeT * 0.06);
        this.controls.update();
      }
    }

    // Reveal markers and labels progressively
    if (this.waypointMarkers && this.routeLabels) {
      const markerCount = this.waypointMarkers.children.length;
      const visibleMarkers = Math.ceil(markerCount * this.routeAnimationProgress);

      for (let i = 0; i < markerCount; i++) {
        const shouldShow = i < visibleMarkers;
        if (this.waypointMarkers.children[i]) {
          this.waypointMarkers.children[i].visible = shouldShow;
        }
        if (this.routeLabels.children[i]) {
          this.routeLabels.children[i].visible = shouldShow;
        }
      }
    }

    // Animation complete
    if (this.routeAnimationProgress >= 1) {
      geometry.setDrawRange(0, posCount);
      this.isAnimatingRoute = false;

      // Restore star brightness
      if (this.galaxyPoints?.material) {
        this.galaxyPoints.material.opacity = 0.85;
      }

      // Hide comet effects
      if (this.cometHead) this.cometHead.visible = false;
      if (this.cometGlow) this.cometGlow.visible = false;
      if (this.cometTrail) this.cometTrail.visible = false;

      // Ensure all markers/labels are visible
      if (this.waypointMarkers) {
        this.waypointMarkers.children.forEach((child: any) => {
          child.visible = true;
        });
      }
      if (this.routeLabels) {
        this.routeLabels.children.forEach((child: any) => {
          child.visible = true;
        });
      }
    }
  }

  private updateCometTrail(cometPos: any, t: number) {
    if (!this.cometTrail || !this.routeCurve) return;

    const positions = this.cometTrail.geometry.attributes.position.array;
    const particleCount = positions.length / 3;

    for (let i = 0; i < particleCount; i++) {
      // Each particle is at a slightly earlier point on the curve
      const trailT = Math.max(0, t - (i / particleCount) * 0.05);
      const trailPos = this.routeCurve.getPoint(trailT);

      // Add some random scatter for spark effect
      const scatter = 50 * (i / particleCount);
      positions[i * 3] = trailPos.x + (Math.random() - 0.5) * scatter;
      positions[i * 3 + 1] = trailPos.y + (Math.random() - 0.5) * scatter;
      positions[i * 3 + 2] = trailPos.z + (Math.random() - 0.5) * scatter;
    }

    this.cometTrail.geometry.attributes.position.needsUpdate = true;
  }

  // Easing function for smooth animation
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // ==================== View Controls ====================

  resetView() {
    const galaxyCenterX = (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2;
    const galaxyCenterZ = (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2;

    this.controls.target.set(galaxyCenterX, 0, galaxyCenterZ);
    this.camera.position.set(galaxyCenterX, 25000, galaxyCenterZ + 20000);
    this.controls.update();
  }

  fitGalaxy() {
    const galaxyCenterX = (GALAXY_BOUNDS.minX + GALAXY_BOUNDS.maxX) / 2;
    const galaxyCenterZ = (GALAXY_BOUNDS.minZ + GALAXY_BOUNDS.maxZ) / 2;
    const size = Math.max(
      GALAXY_BOUNDS.maxX - GALAXY_BOUNDS.minX,
      GALAXY_BOUNDS.maxZ - GALAXY_BOUNDS.minZ
    );

    this.controls.target.set(galaxyCenterX, 0, galaxyCenterZ);
    this.camera.position.set(galaxyCenterX, size * 0.6, galaxyCenterZ + size * 0.4);
    this.controls.update();
  }

  fitRoute() {
    const r = this.route();
    if (r) this.fitToRoute(r);
  }

  replayAnimation() {
    if (this.routeLine) {
      this.animateRouteDrawing();
    }
  }

  // ==================== Imperial Systems ====================

  toggleImperial() {
    this.showImperial.set(!this.showImperial());
    // TODO: Implement imperial system highlighting
  }
}
