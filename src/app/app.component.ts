import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignAdderComponent } from './campaign-adder/campaign-adder.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopBarComponent,
    CampaignComponent,
    CampaignAdderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'futurum-tech-task';
}
