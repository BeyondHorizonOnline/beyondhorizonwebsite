// File: src/app/features/media/media.page.ts
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { VdsPosterComponent } from '../../components/vds-poster/vds-poster.component';


@Component({
  standalone: true,
  selector: 'app-media',
  imports: [IonContent, VdsPosterComponent],
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss']
})
export class MediaPage {
  posters = [
    { src: 'assets/posters/vx-5-bastion.jpg', caption: 'VX-5 Bastion — Defensive Escort Carrier' },
    { src: 'assets/posters/bxg-9-relay-nexus.jpg', caption: 'BXG-9 Relay Nexus — Strategic Jump Interface' }
  ];
}
