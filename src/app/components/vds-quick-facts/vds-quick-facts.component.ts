// File: src/app/components/vds-quick-facts/vds-quick-facts.component.ts
import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

export interface QuickFact {
  icon: string;
  label: string;
  value: string | number;
}

@Component({
  selector: 'vds-quick-facts',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './vds-quick-facts.component.html',
  styleUrls: ['./vds-quick-facts.component.scss']
})
export class VdsQuickFactsComponent {
  @Input() facts: QuickFact[] = [];
}
