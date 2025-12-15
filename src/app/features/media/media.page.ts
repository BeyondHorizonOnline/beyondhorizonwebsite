// File: src/app/features/media/media.page.ts
import { Component, signal } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

export interface MediaItem {
  id: string;
  title: string;
  category: 'concept-art' | 'wallpapers' | 'screenshots' | 'renders';
  thumbnail?: string;
  fullImage?: string;
  description?: string;
  comingSoon?: boolean;
}

export interface MediaCategory {
  id: string;
  label: string;
  icon: string;
}

@Component({
  standalone: true,
  selector: 'app-media',
  imports: [IonContent, IonIcon],
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss']
})
export class MediaPage {
  categories: MediaCategory[] = [
    { id: 'all', label: 'All', icon: 'grid-outline' },
    { id: 'concept-art', label: 'Concept Art', icon: 'brush-outline' },
    { id: 'wallpapers', label: 'Wallpapers', icon: 'image-outline' },
    { id: 'screenshots', label: 'Screenshots', icon: 'camera-outline' },
    { id: 'renders', label: '3D Renders', icon: 'cube-outline' }
  ];

  activeCategory = signal<string>('all');

  // Current media items - mix of available and coming soon
  mediaItems: MediaItem[] = [
    {
      id: 'vulcan-concept-1',
      title: 'VX-6C Vulcan - Front View',
      category: 'concept-art',
      thumbnail: 'assets/posters/vx-5-bastion.jpg',
      fullImage: 'assets/posters/vx-5-bastion.jpg',
      description: 'Concept art of the Vulcan-class battleship'
    },
    {
      id: 'relay-nexus-1',
      title: 'BXG-9 Relay Nexus',
      category: 'renders',
      thumbnail: 'assets/posters/bxg-9-relay-nexus.jpg',
      fullImage: 'assets/posters/bxg-9-relay-nexus.jpg',
      description: 'Strategic jump interface station render'
    },
    // Coming soon placeholders
    {
      id: 'concept-coming-1',
      title: 'Fleet Formation',
      category: 'concept-art',
      comingSoon: true,
      description: 'Battle fleet in formation'
    },
    {
      id: 'wallpaper-coming-1',
      title: 'Nebula Approach',
      category: 'wallpapers',
      comingSoon: true,
      description: '4K Desktop Wallpaper'
    },
    {
      id: 'wallpaper-coming-2',
      title: 'Station Docking',
      category: 'wallpapers',
      comingSoon: true,
      description: '4K Desktop Wallpaper'
    },
    {
      id: 'screenshot-coming-1',
      title: 'Combat Encounter',
      category: 'screenshots',
      comingSoon: true,
      description: 'In-game screenshot'
    },
    {
      id: 'render-coming-1',
      title: 'Carrier Detail',
      category: 'renders',
      comingSoon: true,
      description: 'High-detail 3D render'
    },
    {
      id: 'render-coming-2',
      title: 'Engine Assembly',
      category: 'renders',
      comingSoon: true,
      description: 'Technical cutaway render'
    }
  ];

  get filteredItems(): MediaItem[] {
    const category = this.activeCategory();
    if (category === 'all') {
      return this.mediaItems;
    }
    return this.mediaItems.filter(item => item.category === category);
  }

  setCategory(categoryId: string): void {
    this.activeCategory.set(categoryId);
  }

  downloadImage(item: MediaItem): void {
    if (item.fullImage && !item.comingSoon) {
      window.open(item.fullImage, '_blank');
    }
  }
}
