// File: src/app/features/updates/updates.page.ts

import { Component, computed, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { DatePipe, CommonModule, TitleCasePipe } from '@angular/common';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { UPDATES } from '../../data/seed-updates';

@Component({
  standalone: true,
  selector: 'app-updates',
  imports: [IonContent, StarfieldBackgroundComponent, DatePipe, CommonModule, TitleCasePipe],
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss']
})
export class UpdatesPage {
  updates = UPDATES.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  categoryFilter = signal<string | null>(null);

  categories = ['feature', 'bugfix', 'balance', 'infrastructure'];

  filteredUpdates = computed(() =>
    this.updates.filter(u =>
      !this.categoryFilter() || u.category === this.categoryFilter()
    )
  );

  featuredUpdates = computed(() =>
    this.filteredUpdates().filter(u => u.featured)
  );

  regularUpdates = computed(() =>
    this.filteredUpdates().filter(u => !u.featured)
  );

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      feature: 'var(--color-cyan)',
      bugfix: 'var(--color-lime)',
      balance: 'var(--color-orange)',
      infrastructure: 'var(--color-purple)'
    };
    return colors[category] || 'var(--color-text-muted)';
  }
}
