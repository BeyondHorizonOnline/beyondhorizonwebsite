import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  sanitizedUrl = 'assets/beyond-horizon-ui-design-system.html';
}
