// File: src/app/features/logistics/logistics.page.ts
import { Component, computed, signal } from '@angular/core';
import { IonContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

import { CX_ASSETS } from '../../data/seed-cx';
import { VdsCardComponent } from '../../components/vds-card/vds-card.component';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { CatalogEntityBase } from '../../models/catalog.models';

@Component({
  standalone: true,
  selector: 'app-logistics',
  imports: [IonContent, IonSelect, IonSelectOption, VdsCardComponent, StarfieldBackgroundComponent],
  templateUrl: './logistics.page.html',
  styleUrls: ['./logistics.page.scss']
})
export class LogisticsPage {
  assets: CatalogEntityBase[] = CX_ASSETS;

  logisticsFilter = signal<string | null>(null);

  // Extract unique types for filter dropdown
  types = Array.from(new Set(this.assets.map(a => a.unitType).filter(Boolean)));

  list = computed(() =>
    this.assets.filter(a =>
      (!this.logisticsFilter() || a.unitType === this.logisticsFilter())
    )
  );

  tagsOf(a: CatalogEntityBase): string[] {
    return [a.unitType, ...(a.tags || [])].filter(Boolean) as string[];
  }
}
