import { Component, Input, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface CarouselAsset {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

@Component({
  selector: 'vds-asset-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vds-asset-carousel.component.html',
  styleUrls: ['./vds-asset-carousel.component.scss']
})
export class VdsAssetCarouselComponent implements OnInit, OnDestroy {
  @Input() assets: CarouselAsset[] = [];
  @Input() autoplayInterval = 6000; // 6 seconds

  currentIndex = signal(0);
  currentAsset = computed(() => this.assets[this.currentIndex()]);

  private autoplayTimer: any;

  ngOnInit() {
    if (this.assets.length > 0) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  nextSlide() {
    this.currentIndex.update((i) => (i + 1) % this.assets.length);
    // Restart autoplay timer when manually advancing
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), this.autoplayInterval);
  }

  prevSlide() {
    this.currentIndex.update((i) => (i - 1 + this.assets.length) % this.assets.length);
    // Restart autoplay timer when manually advancing
    this.stopAutoplay();
    setTimeout(() => this.startAutoplay(), this.autoplayInterval);
  }
}
