import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { VdsNavHubComponent } from '../../components/vds-nav-hub/vds-nav-hub.component';
import { VdsCtaSectionComponent } from '../../components/vds-cta-section/vds-cta-section.component';
import { VdsAssetCarouselComponent, CarouselAsset } from '../../components/vds-asset-carousel/vds-asset-carousel.component';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { SHIPS } from '../../data/seed-ships';

@Component({
  selector: 'app-home-v2',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    VdsNavHubComponent,
    VdsCtaSectionComponent,
    VdsAssetCarouselComponent,
    StarfieldBackgroundComponent
  ],
  templateUrl: './home-v2.page.html',
  styleUrls: ['./home-v2.page.scss']
})
export class HomeV2Page {
  // Featured assets for carousel (select 3-5 ships)
  featuredAssets: CarouselAsset[] = [
    {
      id: 'vx-6-apex',
      title: 'VX-6 Apex',
      subtitle: 'Capital-line Battleship',
      description: 'The Apex stands as the pinnacle of Voran\'s VX-Series design philosophy — a warship engineered not merely for combat, but for domination through precision. Multi-layered shield lattices cycle frequencies on predictive combat algorithms, shrugging off return fire that lesser vessels cannot even track.',
      image: 'assets/images/ships/vx-6-apex.jpg',
      link: '/ships/vx-6-apex',
      stats: [
        { label: 'Hull', value: '8500' },
        { label: 'Shield', value: '5000' },
        { label: 'Speed', value: '450' }
      ]
    },
    {
      id: 'ex-1-vibz',
      title: 'EX-1 Vibz',
      subtitle: 'Mobile Construction Ship',
      description: 'The smallest member of the EX lineup — a rapid-deployment builder drone designed for tight construction spaces and quick assembly tasks. Where larger yardships cannot safely maneuver, Vibz units swarm in to weld new structure over old scars.',
      image: 'assets/images/ships/ex-1-vibz.jpg',
      link: '/ships/ex-1-vibz',
      stats: [
        { label: 'Hull', value: '1500' },
        { label: 'Shield', value: '800' },
        { label: 'Speed', value: '650' }
      ]
    },
    {
      id: 'vx-2-valkyrie',
      title: 'VX-2 Valkyrie',
      subtitle: 'Heavy Frigate',
      description: 'A deadly skirmisher that blends raw power with unmatched agility. The Valkyrie is designed for surgical strikes and tactical dominance in fast-paced engagements, making it a favorite among frontline commanders.',
      image: 'assets/images/ships/vx-2-valkyrie.jpg',
      link: '/ships/vx-2-valkyrie',
      stats: [
        { label: 'Hull', value: '3200' },
        { label: 'Shield', value: '2000' },
        { label: 'Speed', value: '550' }
      ]
    }
  ];

  // FAQ sections state
  expandedSection = signal<string | null>('what-is-bh');

  toggleSection(sectionId: string) {
    this.expandedSection.set(
      this.expandedSection() === sectionId ? null : sectionId
    );
  }

  isExpanded(sectionId: string): boolean {
    return this.expandedSection() === sectionId;
  }
}
