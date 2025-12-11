// File: src/app/features/contact/contact.page.ts
import { Component, signal } from '@angular/core';
import { IonContent, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [IonContent, IonInput, IonTextarea, StarfieldBackgroundComponent],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage {
  submitSuccess = signal(false);

  submit(ev: Event) {
    ev.preventDefault();
    // Set success state and hide after 5 seconds
    this.submitSuccess.set(true);
    setTimeout(() => this.submitSuccess.set(false), 5000);
  }
}
