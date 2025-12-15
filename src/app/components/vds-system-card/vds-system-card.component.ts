// File: src/app/components/vds-system-card/vds-system-card.component.ts
import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'vds-system-card',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './vds-system-card.component.html',
  styleUrls: ['./vds-system-card.component.scss']
})
export class VdsSystemCardComponent {
  @Input() name = '';
  @Input() icon = '';
  @Input() description = '';
}
