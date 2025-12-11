// File: src/app/features/engineering/engineering.page.ts
import { Component, computed, signal } from '@angular/core';
import { IonContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

import { FACILITIES } from '../../data/seed-facilities';
import { VdsCardComponent } from '../../components/vds-card/vds-card.component';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { Facility } from '../../models/catalog.models';

@Component({
  standalone: true,
  selector: 'app-engineering',
  imports: [IonContent, IonSelect, IonSelectOption, VdsCardComponent, StarfieldBackgroundComponent],
  templateUrl: './engineering.page.html',
  styleUrls: ['./engineering.page.scss']
})
export class EngineeringPage {
  // All engineering facilities: factories, power cores, harvesters, and mines
  facilities: Facility[] = FACILITIES.filter((f: Facility) =>
    f.subtype === 'factory' ||
    f.subtype === 'power' ||
    f.unitType === 'Harvester' ||
    f.unitType === 'Mine'
  );

  engineeringFilter = signal<string | null>(null);

  // Extract unique types for filter dropdown
  types = Array.from(new Set(this.facilities.map(f => f.unitType || f.subtype).filter(Boolean)));

  list = computed(() =>
    this.facilities.filter(f =>
      (!this.engineeringFilter() ||
       (f.unitType === this.engineeringFilter() || f.subtype === this.engineeringFilter()))
    )
  );

  tagsOf(f: Facility): string[] {
    const type = f.unitType || f.subtype;
    return [type, ...(f.tags || [])].filter(Boolean) as string[];
  }
}
