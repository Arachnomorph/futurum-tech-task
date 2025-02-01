import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignAdderComponent } from './campaign-adder/campaign-adder.component';
import { CampaignsService } from './campaigns.service';

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
export class AppComponent implements OnInit {
  campaigns: any;

  constructor(private CampaignsService: CampaignsService) {}

  ngOnInit(): void {
    this.CampaignsService.getCampaigns().subscribe((data) => {
      this.campaigns = data;
    });
  }

  title = 'futurum-tech-task';
}
