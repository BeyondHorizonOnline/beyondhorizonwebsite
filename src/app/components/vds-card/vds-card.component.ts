// File: src/app/components/vds-card/vds-card.component.ts
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { VdsBadgeComponent } from '../vds-badge/vds-badge.component';


@Component({
  selector: 'vds-card',
  standalone: true,
  imports: [RouterLink, IonIcon, VdsBadgeComponent],
  templateUrl: './vds-card.component.html',
  styleUrls: ['./vds-card.component.scss']
})
export class VdsCardComponent {
  @Input() title = '';
  @Input() code = '';
  @Input() series: any;
  @Input() summary = '';
  @Input() to = '';
  @Input() tags: string[] = [];
  @Input() thumbnail?: string;

  imageLoading = signal(true);

  onImageLoad(): void {
    this.imageLoading.set(false);
  }

  onImageError(): void {
    this.imageLoading.set(false);
  }
}
