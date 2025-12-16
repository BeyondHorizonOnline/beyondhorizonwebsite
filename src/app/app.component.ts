// File: src/app/app.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem, IonItemGroup, IonItemDivider } from '@ionic/angular/standalone';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { VdsHeaderComponent } from './components/vds-header/vds-header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet,
    IonMenu, IonContent, IonList, IonItem, IonItemGroup, IonItemDivider, RouterLink,   // ⬅️ menu pieces
    VdsHeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  headerVariant = signal<'default' | 'hero'>('default');

  constructor(private router: Router) {}

  ngOnInit() {
    // Check initial route immediately (router might not be ready yet)
    this.updateVariantForUrl(this.router.url);

    // Listen to route changes and apply hero variant on home-v2
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateVariantForUrl(event.urlAfterRedirects);
        this.scrollToTop();
      });
  }

  private updateVariantForUrl(url: string) {
    // Check if URL contains /home-v2
    this.headerVariant.set(
      url.includes('/home-v2') ? 'hero' : 'default'
    );
  }

  closeMenu() {
    const menu = document.querySelector('ion-menu');
    menu?.close();
  }

  private scrollToTop() {
    // Scroll all ion-content elements to top
    setTimeout(() => {
      const contents = document.querySelectorAll('ion-content');
      contents.forEach((content: any) => {
        content.scrollToTop?.(0);
      });
    }, 0);
  }
}
