import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignsService } from './campaigns.service';
import events from './event.service';

interface Campaign {
  id: number;
  name: string;
  keywords: string[];
  bidAmount: number;
  campaignFound: number;
  status: string;
  town: string;
  radius: number;
}

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    TopBarComponent,
    CampaignComponent,
    CampaignFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private CampaignsService: CampaignsService) {}
  public data: any;
  campaigns: any;

  ngOnInit(): void {
    this.CampaignsService.getData().subscribe((response) => {
      let data = response.campaigns;
      this.campaigns = data;
      // console.log(data);
    });

    events.listen('addCampaign', (data) => {
      // console.log(data);
      this.campaigns.push(data);
    });
  }

  title = 'futurum-tech-task';
}
