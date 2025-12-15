// File: src/app/features/stations/stations.page.ts
import { Component, computed, signal } from '@angular/core';
import { IonContent, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TitleCasePipe } from '@angular/common';

import { FACILITIES } from '../../data/seed-facilities';
import { VdsCardComponent } from '../../components/vds-card/vds-card.component';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { Facility } from '../../models/catalog.models';

@Component({
  standalone: true,
  selector: 'app-stations',
  imports: [IonContent, IonSelect, IonSelectOption, VdsCardComponent, StarfieldBackgroundComponent, TitleCasePipe],
  templateUrl: './stations.page.html',
  styleUrls: ['./stations.page.scss']
})
export class StationsPage {
  facilities: Facility[] = FACILITIES;

  typeFilter = signal<string | null>(null);

  types = Array.from(new Set(this.facilities.map(f => f.subtype))).sort();

  list = computed(() =>
    this.facilities.filter(f =>
      (!this.typeFilter() || f.subtype === this.typeFilter())
    )
  );

  tagsOf(f: Facility): string[] {
    return [String(f.subtype), ...(f.tags || [])];
  }
}
