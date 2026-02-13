import { Component, signal } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';

@Component({
  standalone: true,
  selector: 'app-vix',
  imports: [IonContent, StarfieldBackgroundComponent],
  templateUrl: './vix.page.html',
  styleUrls: ['./vix.page.scss']
})
export class VixPage {
  openFaq = signal<number | null>(null);

  toggleFaq(index: number) {
    this.openFaq.set(this.openFaq() === index ? null : index);
  }
}
