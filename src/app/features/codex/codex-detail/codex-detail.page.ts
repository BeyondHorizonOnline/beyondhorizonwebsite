// File: src/app/features/codex/codex-detail.page.ts
import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

import { IonContent, IonIcon } from '@ionic/angular/standalone';

import { ShipDisplayData, SHIPS } from '../../../data/seed-ships';
import { FACILITIES } from '../../../data/seed-facilities';
import { CX_ASSETS } from '../../../data/seed-cx';
import { VEHICLES } from '../../../data/seed-vehicles';

import { CatalogEntityBase } from '../../../models/catalog.models';

import { VdsBadgeComponent } from '../../../components/vds-badge/vds-badge.component';
import { VdsQuickFactsComponent, QuickFact } from '../../../components/vds-quick-facts/vds-quick-facts.component';
import { VdsSystemCardComponent } from '../../../components/vds-system-card/vds-system-card.component';
import { ModelViewerComponent } from '../../../components/bh-model-viewer/model-viewer.component';
import { getSystemsForEntity, SystemCard } from '../../../data/mock-systems';

// Map of entity IDs to their 3D model paths (only for entities with models)
const MODEL_PATHS: Record<string, string> = {
  'vx-6c-vulcan': 'assets/models/vulcan.glb',
};

// Ships use UI-only ShipDisplayData; facilities/CX use full DB-backed CatalogEntityBase
export type CodexEntity = ShipDisplayData | CatalogEntityBase;



function isShipDisplay(e: CodexEntity | undefined): e is ShipDisplayData {
  // ShipDisplay has required 'class' property; CatalogEntityBase has 'unitType'
  return !!e && 'templateId' in e && !('unitType' in e);
}


@Component({
  standalone: true,
  selector: 'app-codex-detail',
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
  templateUrl: './codex-detail.page.html',
  styleUrls: ['./codex-detail.page.scss']
})
export class CodexDetailPage {
  private id = signal<string>('');

  specsExpanded = false;
  viewMode = signal<'image' | '3d'>('image');
  imageLoading = signal<boolean>(true);
  selectedVariant = signal<string | null>(null);

  entity = computed<CodexEntity | undefined>(() => {
    const targetId = this.id();
    if (!targetId) return undefined;

    return (
      SHIPS.find(s => s.id === targetId) ||
      FACILITIES.find(f => f.id === targetId) ||
      CX_ASSETS.find(c => c.id === targetId) ||
      VEHICLES.find(v => v.id === targetId)
    ) as CodexEntity | undefined;
  });

  isShip = computed<boolean>(() => isShipDisplay(this.entity()));

  // Path to 3D model if available, otherwise null for placeholder
  modelPath = computed<string | null>(() => {
    const targetId = this.id();
    return MODEL_PATHS[targetId] || null;
  });

  // Hero image path (uses selected variant if set)
  heroImage = computed<string | null>(() => {
    const e = this.entity();
    const variant = this.selectedVariant();
    if (variant && e?.heroVariants) {
      const found = e.heroVariants.find(v => v.color === variant);
      if (found) return found.path;
    }
    return e?.heroImage || null;
  });

  // Available color variants
  heroVariants = computed(() => {
    const e = this.entity();
    return e?.heroVariants || [];
  });

  // Thumbnail fallback
  thumbnail = computed<string | null>(() => {
    const e = this.entity();
    return e?.thumbnail || null;
  });

  selectVariant(color: string) {
    this.selectedVariant.set(color);
    this.imageLoading.set(true);
  }

  onImageLoad() {
    this.imageLoading.set(false);
  }

  onImageError() {
    this.imageLoading.set(false);
  }

 // this will be used instead of e.unitType in the template
  unitTypeLabel = computed<string | null>(() => {
    const e = this.entity();
    if (!e) return null;

    if (isShipDisplay(e)) {
      // For UI ships, show something meaningful when there’s no class
      return e.role || 'Ship';
    }

    // Facilities / CX assets have unitType from CatalogEntityBase
    return e.unitType;
  });

  // Full specs as QuickFacts with icons
  specFacts = computed<QuickFact[]>(() => {
    const e = this.entity();
    if (!e) return [];

    // Map of spec labels to icons
    const specIcons: Record<string, string> = {
      'Series': 'pricetag-outline',
      'Code': 'code-outline',
      'Role': 'briefcase-outline',
      'Class': 'layers-outline',
      'Template ID': 'finger-print-outline',
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
      'Energy Produced': 'flash-outline',
      'Energy Used': 'battery-charging-outline',
      'Requires Power': 'battery-charging-outline',
      'Provides Power': 'flash-outline',
      'Provides Storage': 'file-tray-stacked-outline',
      'Construction Cost': 'construct-outline',
      'Development Cost': 'trending-up-outline'
    };

    const specs: Array<{ label: string; value: string | number }> = [];

    if (isShipDisplay(e)) {
      // Display-only ship: use the UI data you actually have
      specs.push({ label: 'Series', value: e.series });
      specs.push({ label: 'Code', value: e.code });
      specs.push({ label: 'Role', value: e.role });
      if (e.class) specs.push({ label: 'Class', value: e.class });
      specs.push({ label: 'Template ID', value: e.templateId });
    } else {
      // Facilities / CX assets: full DB-backed stats from CatalogEntityBase
      specs.push({ label: 'Unit Type', value: e.unitType });
      specs.push({ label: 'Size', value: e.size });
      specs.push({ label: 'Hull', value: e.baseHealth });
      specs.push({ label: 'Shield', value: e.baseShield });
      specs.push({ label: 'Weapon Slots', value: e.weaponSlots });
      specs.push({ label: 'Crew Required', value: e.staffRequired });
      specs.push({ label: 'Housing', value: e.totalHousing });
      specs.push({ label: 'Speed', value: e.speed });
      specs.push({ label: 'Hyperspace', value: e.hyperspace });
      specs.push({ label: 'Atmospheric', value: e.atmospheric ? 'Yes' : 'No' });
      specs.push({ label: 'Shield Type', value: e.shieldType });
      specs.push({ label: 'Tech Tier', value: e.techTier });
      specs.push({ label: 'Resource Capacity', value: e.resourceCapacity });
      specs.push({ label: 'Dock Capacity', value: e.dockCapacity });
      specs.push({ label: 'Energy Produced', value: e.baseEnergyProduced });
      specs.push({ label: 'Energy Used', value: e.baseEnergyUsed });
      specs.push({ label: 'Requires Power', value: e.requiresPower ? 'Yes' : 'No' });
      specs.push({ label: 'Provides Power', value: e.providesPower });
      specs.push({ label: 'Provides Storage', value: e.providesStorage });
      specs.push({ label: 'Construction Cost', value: e.constructionCost });
      specs.push({ label: 'Development Cost', value: e.developmentCost });
    }

    // Filter out zero values and convert to QuickFact format
    return specs
      .filter(spec => !(typeof spec.value === 'number' && spec.value === 0))
      .map(spec => ({
        icon: specIcons[spec.label] || 'information-circle-outline',
        label: spec.label,
        value: typeof spec.value === 'number' ? spec.value.toLocaleString() : spec.value
      }));
  });

  // Quick Facts with icons for the new component
  quickFacts = computed<QuickFact[]>(() => {
    const e = this.entity();
    if (!e) return [];

    const facts: QuickFact[] = [];

    if (isShipDisplay(e)) {
      // Ships: show key identifying info
      facts.push({ icon: 'pricetag-outline', label: 'Series', value: e.series });
      facts.push({ icon: 'code-outline', label: 'Code', value: e.code });
      facts.push({ icon: 'briefcase-outline', label: 'Role', value: e.role });
      if (e.class) facts.push({ icon: 'layers-outline', label: 'Class', value: e.class });
    } else {
      // Facilities/CX: show gameplay-relevant stats
      const f = e as CatalogEntityBase;
      if (f.baseShield) facts.push({ icon: 'shield-outline', label: 'Shield', value: f.baseShield.toLocaleString() });
      if (f.baseHealth) facts.push({ icon: 'home-outline', label: 'Hull', value: f.baseHealth.toLocaleString() });
      if (f.hyperspace) facts.push({ icon: 'rocket-outline', label: 'Hyperspace', value: f.hyperspace });
      if (f.speed) facts.push({ icon: 'flash-outline', label: 'Speed', value: f.speed });
      if (f.staffRequired) facts.push({ icon: 'people-outline', label: 'Crew', value: f.staffRequired.toLocaleString() });
      if (f.techTier) facts.push({ icon: 'list-outline', label: 'Tech Tier', value: f.techTier });
    }

    return facts.slice(0, 6); // Limit to 6 facts
  });

  // Systems & Capabilities based on entity type
  systems = computed<SystemCard[]>(() => {
    const e = this.entity();
    if (!e) return [];

    const unitType = isShipDisplay(e) ? e.class : (e as CatalogEntityBase).unitType;
    return getSystemsForEntity(e.id, unitType, e.role);
  });

  // Related units (same class or series)
  relatedUnits = computed(() => {
    const e = this.entity();
    if (!e) return [];

    const currentId = e.id;
    const currentSeries = e.series;
    const currentClass = isShipDisplay(e) ? e.class : null;

    // Find up to 4 related ships by class or series
    return SHIPS
      .filter(s => s.id !== currentId && (s.class === currentClass || s.series === currentSeries))
      .slice(0, 4);
  });

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id') || '';
    this.id.set(id);
  }
}
