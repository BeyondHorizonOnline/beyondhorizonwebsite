// File: src/app/features/lore/lore.page.ts
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { VdsBadgeComponent } from '../../components/vds-badge/vds-badge.component';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';

@Component({
  standalone: true,
  selector: 'app-lore',
  imports: [IonContent, VdsBadgeComponent, StarfieldBackgroundComponent],
  templateUrl: './lore.page.html',
  styleUrls: ['./lore.page.scss']
})
export class LorePage {}
