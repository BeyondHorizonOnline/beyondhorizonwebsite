import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { VdsHeaderComponent } from '../../../components/vds-header/vds-header.component';
import { VdsFooterComponent } from '../../../components/vds-footer/vds-footer.component';

@Component({
  selector: 'app-getting-started',
  standalone: true,
  imports: [IonContent, RouterLink, VdsHeaderComponent, VdsFooterComponent],
  templateUrl: './getting-started.page.html',
  styleUrls: ['./getting-started.page.scss']
})
export class GettingStartedPage {}
