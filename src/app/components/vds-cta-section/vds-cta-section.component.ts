import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vds-cta-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vds-cta-section.component.html',
  styleUrls: ['./vds-cta-section.component.scss']
})
export class VdsCtaSectionComponent {
  @Input() title = 'Ready to Join the Frontier?';
  @Input() primaryBtnText = 'Download Now';
  @Input() primaryBtnLink = 'https://game.beyondhorizononline.com/download';
  @Input() secondaryBtnText = 'Email Signup';
  @Input() secondaryBtnLink: string | null = null;
  @Input() showSecondaryBtn = true;
}
