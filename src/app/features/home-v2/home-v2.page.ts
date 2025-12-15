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
      image: 'assets/thumbnails/Apex.png',
      link: '/ships/vx-6-apex',
      stats: [
        { label: 'Hull', value: '8500' },
        { label: 'Shield', value: '5000' },
        { label: 'Speed', value: '450' }
      ]
    },
    {
      id: 'vx-6-omen',
      title: 'VX-6 Omen',
      subtitle: 'Capital-line Battleship',
      description: 'The Omen embodies Voran\'s doctrine of "precision intimidation" — a battleship whose presence is engineered to erode enemy morale before the first shot is fired. Twin spinal mass cannons run the length of its reinforced keel.',
      image: 'assets/thumbnails/Omen.png',
      link: '/ships/vx-6-omen',
      stats: [
        { label: 'Hull', value: '9000' },
        { label: 'Shield', value: '5500' },
        { label: 'Speed', value: '420' }
      ]
    },
    {
      id: 'vx-9-vanguard',
      title: 'VX-9 Vanguard',
      subtitle: 'Fleet Command Vessel',
      description: 'The strategic nerve center of Voran\'s fleets, the Vanguard fuses advanced tactical computation with heavy carrier capacity to dominate the operational layer of any engagement.',
      image: 'assets/thumbnails/Vanguard.png',
      link: '/ships/vx-9-vanguard',
      stats: [
        { label: 'Hull', value: '12000' },
        { label: 'Shield', value: '8000' },
        { label: 'Speed', value: '350' }
      ]
    },
    {
      id: 'vx-4a-viper',
      title: 'VX-4A Viper',
      subtitle: 'Escort Destroyer',
      description: 'Optimized for stealth and strike missions in nebular or atmospheric zones, where conventional targeting systems falter. The Viper lurks within storm fronts, emerging only long enough to deliver crippling volleys at close range.',
      image: 'assets/thumbnails/VX4-Viper.png',
      link: '/ships/vx-4a-viper',
      stats: [
        { label: 'Hull', value: '4200' },
        { label: 'Shield', value: '2800' },
        { label: 'Speed', value: '580' }
      ]
    },
    {
      id: 'vx-5c-bastion',
      title: 'VX-5C Bastion',
      subtitle: 'Strike Carrier',
      description: 'Built to protect what Voran values most — critical fleets, corporate capitals, and irreplaceable infrastructure. The Bastion prioritizes layered shield arrays and dense interceptor squadrons over raw offensive power.',
      image: 'assets/thumbnails/VX5.png',
      link: '/ships/vx-5c-bastion',
      stats: [
        { label: 'Hull', value: '15000' },
        { label: 'Shield', value: '10000' },
        { label: 'Speed', value: '280' }
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
