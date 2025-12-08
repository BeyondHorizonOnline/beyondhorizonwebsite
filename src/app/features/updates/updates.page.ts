// File: src/app/features/updates/updates.page.ts

import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-updates',
  imports: [IonContent],
  templateUrl: './updates.page.html',
  styleUrls: ['./updates.page.scss']
})
export class UpdatesPage {
  entries = [
    { date: '2025-11-01', title: 'Initial scaffolding', body: 'Bootstrapped Ionic + Angular standalone app with VDS theme.' },
    { date: '2025-11-05', title: 'Codex online', body: 'Unified data index and search with seed datasets.' },
    { date: '2025-11-18', title: 'Formatting Update', body: 'Updates to the theme and also enabled the Star Map.' },
  ];
}
