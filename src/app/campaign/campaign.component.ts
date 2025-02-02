import { Component, Input } from '@angular/core';
import events from '../event.service';

@Component({
  selector: 'app-campaign',
  imports: [],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss',
})
export class CampaignComponent {
  @Input() campaign!: {
    id: number;
    name: string;
    keywords: string;
    bid: number;
    fund: number;
    status: string;
    town: string;
    radius: number;
  };

  initializeEditForm() {
    events.emit('initializeEditForm', this.campaign);
  }

  deleteCampaign() {
    console.log('write campaign deletion logic!');
  }
}
