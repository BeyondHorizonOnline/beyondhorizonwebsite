// File: src/app/app.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { VdsHeaderComponent } from './components/vds-header/vds-header.component';
import { VdsFooterComponent } from './components/vds-footer/vds-footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet,
    IonMenu, IonContent, IonList, IonItem, RouterLink,   // ⬅️ menu pieces
    VdsHeaderComponent, VdsFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  headerVariant = signal<'default' | 'hero'>('default');

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes and apply hero variant on home-v2
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.headerVariant.set(
          event.urlAfterRedirects === '/home-v2' ? 'hero' : 'default'
        );
      });

    // Check initial route
    if (this.router.url === '/home-v2') {
      this.headerVariant.set('hero');
    }
  }
}
