// File: src/app/components/vds-header/vds-header.component.ts
import { Component, Input, OnDestroy, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'vds-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink],
  templateUrl: './vds-header.component.html',
  styleUrls: ['./vds-header.component.scss']
})
export class VdsHeaderComponent implements OnDestroy {
  @Input() variant: 'default' | 'hero' = 'default';

  // Dropdown state management
  fleetOpen = signal(false);
  codexOpen = signal(false);
  communityOpen = signal(false);

  private closeTimeouts: { [key: string]: any } = {};

  openFleetDropdown() {
    clearTimeout(this.closeTimeouts['fleet']);
    this.fleetOpen.set(true);
  }

  closeFleetDropdown() {
    this.closeTimeouts['fleet'] = setTimeout(() => {
      this.fleetOpen.set(false);
    }, 150);
  }

  openCodexDropdown() {
    clearTimeout(this.closeTimeouts['codex']);
    this.codexOpen.set(true);
  }

  closeCodexDropdown() {
    this.closeTimeouts['codex'] = setTimeout(() => {
      this.codexOpen.set(false);
    }, 150);
  }

  openCommunityDropdown() {
    clearTimeout(this.closeTimeouts['community']);
    this.communityOpen.set(true);
  }

  closeCommunityDropdown() {
    this.closeTimeouts['community'] = setTimeout(() => {
      this.communityOpen.set(false);
    }, 150);
  }

  ngOnDestroy() {
    Object.values(this.closeTimeouts).forEach(timeout => clearTimeout(timeout));
  }
}
