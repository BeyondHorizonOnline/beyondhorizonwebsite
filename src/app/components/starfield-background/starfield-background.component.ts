import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import * as THREE from 'three';

declare global {
  namespace THREE {
    class Scene {}
    class PerspectiveCamera {}
    class WebGLRenderer {}
    class Points {}
    class BufferGeometry {}
    class BufferAttribute {}
    class PointsMaterial {}
  }
}

@Component({
  selector: 'app-starfield-background',
  standalone: true,
  template: '<canvas #starfieldCanvas></canvas>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
})
export class StarfieldBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starfieldCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() starCount = 2000;
  @Input() parallaxSpeed = 0.0001; // Subtle drift

  private scene: any;
  private camera: any;
  private renderer: any;
  private stars: any;
  private animationId: number | null = null;
  private time = 0;

  ngAfterViewInit(): void {
    this.initStarfield();
    this.animate();
    window.addEventListener('resize', () => this.onWindowResize());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.onWindowResize());
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initStarfield(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    this.camera.position.z = 0;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Transparent

    // Create stars
    this.createStars();
  }

  private createStars(): void {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];

    // Generate random star positions and colors
    for (let i = 0; i < this.starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;

      positions.push(x, y, z);

      // Vary star colors (white, blue, yellow)
      const colorChoice = Math.random();
      let r, g, b;

      if (colorChoice < 0.5) {
        // White stars
        r = 1;
        g = 1;
        b = 1;
      } else if (colorChoice < 0.75) {
        // Blue-ish stars (cooler)
        r = 0.7;
        g = 0.8;
        b = 1;
      } else {
        // Yellow-ish stars (warmer)
        r = 1;
        g = 0.9;
        b = 0.6;
      }

      // Add some opacity variation
      const opacity = 0.3 + Math.random() * 0.7;
      colors.push(r * opacity, g * opacity, b * opacity);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

    const material = new THREE.PointsMaterial({
      size: Math.random() * 1 + 0.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Subtle parallax drift (very slow rotation)
    this.time += this.parallaxSpeed;
    this.stars.rotation.x += this.parallaxSpeed * 0.1;
    this.stars.rotation.y += this.parallaxSpeed * 0.05;

    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
}
