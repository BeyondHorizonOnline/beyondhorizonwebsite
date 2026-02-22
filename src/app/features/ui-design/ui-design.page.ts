import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ui-design',
  standalone: true,
  imports: [CommonModule],
  template: `
    <iframe
      [src]="sanitizedUrl"
      style="
        width: 100%;
        height: 100vh;
        border: none;
        display: block;
      "
    ></iframe>
  `,
})
export class UiDesignPage {
  sanitizedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/Beyond-Horizon-Unified-Design-System-v2.html');
  }
}
