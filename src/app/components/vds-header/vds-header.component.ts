// File: src/app/components/vds-header/vds-header.component.ts
import { Component, Input, OnDestroy, signal, ElementRef } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { logOut } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'vds-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink, IonIcon, CommonModule],
  templateUrl: './vds-header.component.html',
  styleUrls: ['./vds-header.component.scss']
})
export class VdsHeaderComponent implements OnDestroy {
  @Input() variant: 'default' | 'hero' = 'default';

  activeDropdown = signal<string | null>(null);
  dropdownStyle = signal<{ top: string; left: string }>({ top: '0', left: '0' });
  profileOpen = signal(false);

  private closeTimeout: any = null;
  private profileCloseTimeout: any = null;

  constructor(public authService: AuthService) {
    addIcons({ logOut });
  }

  openDropdown(name: string, event: MouseEvent) {
    clearTimeout(this.closeTimeout);

    const trigger = event.currentTarget as HTMLElement;
    const rect = trigger.getBoundingClientRect();

    this.dropdownStyle.set({
      top: `${rect.bottom + 8}px`,
      left: `${rect.left + rect.width / 2}px`
    });

    this.activeDropdown.set(name);
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
    clearTimeout(this.profileCloseTimeout);
    this.profileOpen.set(true);
  }

  closeProfileDropdown() {
    this.profileCloseTimeout = setTimeout(() => {
      this.profileOpen.set(false);
    }, 150);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimeout);
    clearTimeout(this.profileCloseTimeout);
  }
}
