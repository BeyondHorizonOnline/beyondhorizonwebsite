import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface NavCard {
  icon: string;
  title: string;
  description: string;
  link: string;
  label?: string;
}

@Component({
  selector: 'vds-nav-hub',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vds-nav-hub.component.html',
  styleUrls: ['./vds-nav-hub.component.scss']
})
export class VdsNavHubComponent {
  @Input() cards: NavCard[] = [
    {
      icon: '🚀',
      title: 'Ships',
      description: 'Explore Fleet',
      link: '/ships',
      label: 'Explore'
    },
    {
      icon: '🏗️',
      title: 'Stations',
      description: 'View Habitats',
      link: '/stations',
      label: 'Explore'
    },
    {
      icon: '📖',
      title: 'Codex',
      description: 'Read Lore',
      link: '/codex',
      label: 'Explore'
    },
    {
      icon: '📚',
      title: 'Learning',
      description: 'How to Play',
      link: '/learn',
      label: 'Get Started'
    },
    {
      icon: '🎨',
      title: 'Media',
      description: 'View Gallery',
      link: '/media',
      label: 'Browse'
    },
    {
      icon: '📢',
      title: 'Updates',
      description: 'Latest News',
      link: '/updates',
      label: 'Read More'
    }
  ];
}
