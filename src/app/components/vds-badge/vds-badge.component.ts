// File: src/app/components/vds-badge/vds-badge.component.ts
import { Component, Input } from '@angular/core';
import { seriesColor } from '../../utils/format-utils';

@Component({
  selector: 'vds-badge',
  standalone: true,
  template: `<span class="vds-badge" [style.borderColor]="color"><ng-content></ng-content></span>`,
  styles: [`
    .vds-badge {
      display: inline-block;
      font-family: var(--font-mono);
      border: 1px solid rgba(0, 255, 255, 0.25);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 11px;
      letter-spacing: 0.02em;
      color: rgba(255, 255, 255, 0.7);
      background: transparent;
      text-transform: uppercase;
      font-weight: 500;
    }
  `]
})
export class VdsBadgeComponent {
  @Input() series: any;
  get color() { return seriesColor(this.series); }
}
