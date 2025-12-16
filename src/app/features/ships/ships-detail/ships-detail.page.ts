// File: src/app/features/ships/ship-detail.page.ts
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

import { SHIPS } from '../../../data/seed-ships';
import { ShipDisplay, CatalogEntityStats } from '../../../models/catalog.models';
import { VdsBadgeComponent } from '../../../components/vds-badge/vds-badge.component';
import { VdsQuickFactsComponent, QuickFact } from '../../../components/vds-quick-facts/vds-quick-facts.component';
import { VdsSystemCardComponent } from '../../../components/vds-system-card/vds-system-card.component';
import { ModelViewerComponent } from 'src/app/component/model-viewer/model-viewer.component';
import { UnitStatsService } from '../../../services/unit-stats/unit-stats';
import { getSystemsForEntity, SystemCard } from '../../../data/mock-systems';

// Map of ship IDs to their 3D model paths
const MODEL_PATHS: Record<string, string> = {
  'vx-6c-vulcan': 'assets/models/vulcan.glb',
};

@Component({
  standalone: true,
  selector: 'app-ship-detail',
  imports: [
    IonContent,
    IonIcon,
    RouterLink,
    UpperCasePipe,
    VdsBadgeComponent,
    VdsQuickFactsComponent,
    VdsSystemCardComponent,
    ModelViewerComponent
  ],
  templateUrl: './ships-detail.page.html',
  styleUrls: ['./ships-detail.page.scss']
})
export class ShipDetailPage {
  id = signal<string>('');

  specsExpanded = false;
  viewMode = signal<'image' | '3d'>('image');
  imageLoading = signal<boolean>(true);

  // Stats from API
  stats = signal<CatalogEntityStats | null>(null);
  loadingStats = signal<boolean>(false);
  statsError = signal<string | null>(null);

  // Ship display data (from seed file)
  ship = computed<ShipDisplay | undefined>(() =>
    SHIPS.find(s => s.id === this.id())
  );

  // Path to 3D model if available
  modelPath = computed<string | null>(() => {
    return MODEL_PATHS[this.id()] || null;
  });

  // Hero image path
  heroImage = computed<string | null>(() => {
    const s = this.ship();
    return s?.heroImage || null;
  });

  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'image' ? '3d' : 'image');
  }

  onImageLoad() {
    this.imageLoading.set(false);
  }

  onImageError() {
    this.imageLoading.set(false);
  }

  // Quick Facts with icons
  quickFacts = computed<QuickFact[]>(() => {
    const apiStats = this.stats();
    const s = this.ship();
    if (!s) return [];

    const facts: QuickFact[] = [];

    if (apiStats) {
      // Use API stats when available
      if (apiStats.BaseShield) facts.push({ icon: 'shield-outline', label: 'Shield', value: apiStats.BaseShield.toLocaleString() });
      if (apiStats.BaseHealth) facts.push({ icon: 'home-outline', label: 'Hull', value: apiStats.BaseHealth.toLocaleString() });
      if (apiStats.Hyperspace) facts.push({ icon: 'rocket-outline', label: 'Hyperspace', value: apiStats.Hyperspace });
      if (apiStats.Speed) facts.push({ icon: 'flash-outline', label: 'Speed', value: apiStats.Speed });
      if (apiStats.StaffRequired) facts.push({ icon: 'people-outline', label: 'Crew', value: apiStats.StaffRequired.toLocaleString() });
      if (apiStats.TechTier) facts.push({ icon: 'list-outline', label: 'Tech Tier', value: apiStats.TechTier });
    } else {
      // Fallback to seed data
      facts.push({ icon: 'pricetag-outline', label: 'Series', value: s.series });
      facts.push({ icon: 'layers-outline', label: 'Class', value: s.class });
      facts.push({ icon: 'briefcase-outline', label: 'Role', value: s.role });
    }

    return facts.slice(0, 6);
  });

  // Full specs for accordion - now as QuickFacts with icons
  specFacts = computed<QuickFact[]>(() => {
    const apiStats = this.stats();
    if (!apiStats) return [];

    const s = this.ship();
    if (!s) return [];

    // Map of spec labels to icons
    const specIcons: Record<string, string> = {
      'Class': 'layers-outline',
      'Unit Type': 'cube-outline',
      'Size': 'resize-outline',
      'Hull': 'home-outline',
      'Shield': 'shield-outline',
      'Weapon Slots': 'flash-outline',
      'Crew Required': 'people-outline',
      'Housing': 'bed-outline',
      'Speed': 'speedometer-outline',
      'Hyperspace': 'rocket-outline',
      'Atmospheric': 'cloudy-outline',
      'Shield Type': 'shield-checkmark-outline',
      'Tech Tier': 'list-outline',
      'Resource Capacity': 'cube-outline',
      'Dock Capacity': 'boat-outline',
      'Requires Power': 'battery-charging-outline',
      'Provides Power': 'flash-outline',
      'Provides Storage': 'file-tray-stacked-outline',
      'Construction Cost': 'construct-outline',
      'Development Cost': 'trending-up-outline'
    };

    const specs: Array<{ label: string; value: string | number }> = [
      { label: 'Class', value: s.class },
      { label: 'Unit Type', value: apiStats.UnitType },
      { label: 'Size', value: apiStats.Size },
      { label: 'Hull', value: apiStats.BaseHealth },
      { label: 'Shield', value: apiStats.BaseShield },
      { label: 'Weapon Slots', value: apiStats.WeaponSlots },
      { label: 'Crew Required', value: apiStats.StaffRequired },
      { label: 'Housing', value: apiStats.TotalHousing },
      { label: 'Speed', value: apiStats.Speed },
      { label: 'Hyperspace', value: apiStats.Hyperspace },
      { label: 'Atmospheric', value: apiStats.Atmospheric ? 'Yes' : 'No' },
      { label: 'Shield Type', value: apiStats.ShieldType },
      { label: 'Tech Tier', value: apiStats.TechTier },
      { label: 'Resource Capacity', value: apiStats.ResourceCapacity },
      { label: 'Dock Capacity', value: apiStats.DockCapacity },
      { label: 'Requires Power', value: apiStats.RequiresPower ? 'Yes' : 'No' },
      { label: 'Provides Power', value: apiStats.ProvidesPower ? 'Yes' : 'No' },
      { label: 'Provides Storage', value: apiStats.ProvidesStorage ? 'Yes' : 'No' },
      { label: 'Construction Cost', value: apiStats.ConstructionCost },
      { label: 'Development Cost', value: apiStats.DevelopmentCost }
    ];

    // Filter out zero values and convert to QuickFact format
    return specs
      .filter(spec => !(typeof spec.value === 'number' && spec.value === 0))
      .map(spec => ({
        icon: specIcons[spec.label] || 'information-circle-outline',
        label: spec.label,
        value: typeof spec.value === 'number' ? spec.value.toLocaleString() : spec.value
      }));
  });

  // Systems & Capabilities
  systems = computed<SystemCard[]>(() => {
    const s = this.ship();
    if (!s) return [];
    return getSystemsForEntity(s.id, s.class, s.role);
  });

  // Related ships (same class)
  relatedShips = computed(() => {
    const s = this.ship();
    if (!s) return [];

    return SHIPS
      .filter(ship => ship.id !== s.id && (ship.class === s.class || ship.series === s.series))
      .slice(0, 4);
  });

  constructor(
    route: ActivatedRoute,
    private unitStatsService: UnitStatsService
  ) {
    const param = route.snapshot.paramMap.get('id') || '';
    this.id.set(param);
    this.loadShipStats();
  }

  private loadShipStats() {
    const ship = this.ship();
    if (!ship) {
      console.error('Ship not found:', this.id());
      return;
    }

    this.loadingStats.set(true);
    this.statsError.set(null);

    this.unitStatsService.getUnitStats(ship.templateId).subscribe({
      next: (apiStats) => {
        this.stats.set(apiStats);
        this.loadingStats.set(false);
      },
      error: (error) => {
        this.statsError.set(error.message || 'Failed to load stats');
        this.loadingStats.set(false);
        console.error('Error loading stats:', error);
      }
    });
  }

  retryLoadStats() {
    this.loadShipStats();
  }
}
