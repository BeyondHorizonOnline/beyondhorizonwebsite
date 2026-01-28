// File: src/app/components/vds-header/vds-header.component.ts
import { Component, Input, OnDestroy, signal, ElementRef } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
<<<<<<< HEAD
import { NgStyle } from '@angular/common';
=======
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { logOut } from 'ionicons/icons';
import { addIcons } from 'ionicons';
>>>>>>> 1e722f820696f2f59a555f377cb2b1839a9cc94f

@Component({
  selector: 'vds-header',
  standalone: true,
<<<<<<< HEAD
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink, NgStyle],
=======
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink, IonIcon, CommonModule],
>>>>>>> 1e722f820696f2f59a555f377cb2b1839a9cc94f
  templateUrl: './vds-header.component.html',
  styleUrls: ['./vds-header.component.scss']
})
export class VdsHeaderComponent implements OnDestroy {
  @Input() variant: 'default' | 'hero' = 'default';

<<<<<<< HEAD
  activeDropdown = signal<string | null>(null);
  dropdownStyle = signal<{ top: string; left: string }>({ top: '0', left: '0' });
=======
  // Dropdown state management
  fleetOpen = signal(false);
  codexOpen = signal(false);
  communityOpen = signal(false);
  profileOpen = signal(false);
>>>>>>> 1e722f820696f2f59a555f377cb2b1839a9cc94f

  private closeTimeout: any = null;

<<<<<<< HEAD
  openDropdown(name: string, event: MouseEvent) {
    clearTimeout(this.closeTimeout);

    // Get trigger button position
    const trigger = event.currentTarget as HTMLElement;
    const rect = trigger.getBoundingClientRect();

    // Position dropdown below trigger, centered
    this.dropdownStyle.set({
      top: `${rect.bottom + 8}px`,
      left: `${rect.left + rect.width / 2}px`
    });

    this.activeDropdown.set(name);
=======
  constructor(public authService: AuthService) {
    addIcons({ logOut });
  }

  openFleetDropdown() {
    clearTimeout(this.closeTimeouts['fleet']);
    this.fleetOpen.set(true);
>>>>>>> 1e722f820696f2f59a555f377cb2b1839a9cc94f
  }

  closeDropdown() {
    this.closeTimeout = setTimeout(() => {
      this.activeDropdown.set(null);
    }, 120);
  }

  keepOpen() {
    clearTimeout(this.closeTimeout);
  }

  openProfileDropdown() {
    clearTimeout(this.closeTimeouts['profile']);
    this.profileOpen.set(true);
  }

  closeProfileDropdown() {
    this.closeTimeouts['profile'] = setTimeout(() => {
      this.profileOpen.set(false);
    }, 150);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimeout);
  }
}
