import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { VdsHeaderComponent } from '../../../components/vds-header/vds-header.component';
import { VdsFooterComponent } from '../../../components/vds-footer/vds-footer.component';

@Component({
  selector: 'app-guide-overview',
  standalone: true,
  imports: [IonContent, RouterLink, VdsHeaderComponent, VdsFooterComponent],
  templateUrl: './guide-overview.page.html',
  styleUrls: ['./guide-overview.page.scss']
})
export class GuideOverviewPage {
  guides = [
    {
      title: 'Getting Started',
      description: 'New to Beyond Horizon? Learn the basics of creating your account, choosing a faction, and building your first station.',
      link: '/guide/getting-started',
      icon: '🚀'
    },
    {
      title: 'Ships Guide',
      description: 'Explore the full catalog of Voran Defense starships, from nimble Frigates to devastating Dreadnoughts.',
      link: '/ships',
      icon: '🛸'
    },
    {
      title: 'Stations Guide',
      description: 'Discover mining stations, research labs, and trading hubs that form the economic backbone of your empire.',
      link: '/stations',
      icon: '🏗️'
    },
    {
      title: 'Lore & Story',
      description: 'Dive into the rich history of the Beyond Horizon universe, its factions, and the frontier waiting to be conquered.',
      link: '/lore',
      icon: '📜'
    },
    {
      title: 'Star Map',
      description: 'Navigate the galaxy, plan routes between systems, and explore the vast frontier of space.',
      link: '/star-map-v2',
      icon: '🗺️'
    },
    {
      title: 'Codex',
      description: 'The complete encyclopedia of Beyond Horizon - detailed information on all game systems and mechanics.',
      link: '/codex',
      icon: '📚'
    }
  ];
}
