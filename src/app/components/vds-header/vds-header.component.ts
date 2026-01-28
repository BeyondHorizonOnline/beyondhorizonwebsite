// File: src/app/components/vds-header/vds-header.component.ts
import { Component, Input, OnDestroy, signal, ElementRef } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'vds-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonMenuButton, RouterLink, NgStyle],
  templateUrl: './vds-header.component.html',
  styleUrls: ['./vds-header.component.scss']
})
export class VdsHeaderComponent implements OnDestroy {
  @Input() variant: 'default' | 'hero' = 'default';

  activeDropdown = signal<string | null>(null);
  dropdownStyle = signal<{ top: string; left: string }>({ top: '0', left: '0' });

  private closeTimeout: any = null;

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
  }

  closeDropdown() {
    this.closeTimeout = setTimeout(() => {
      this.activeDropdown.set(null);
    }, 120);
  }

  keepOpen() {
    clearTimeout(this.closeTimeout);
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimeout);
  }
}
