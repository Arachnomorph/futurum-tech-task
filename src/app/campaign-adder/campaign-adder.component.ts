import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-campaign-adder',
  imports: [ReactiveFormsModule],
  templateUrl: './campaign-adder.component.html',
  styleUrl: './campaign-adder.component.scss',
})
export class CampaignAdderComponent {
  towns = ['', 'London', 'Manchester', 'Liverpool', 'Birmingham']; //TODO: Get this from a service

  campaignForm = new FormGroup({
    campaignName: new FormControl(''),
    campaignKeywords: new FormControl(''),
    campaignBid: new FormControl(0),
    campaignFund: new FormControl(0),
    campaignStatus: new FormControl(''),
    campaignTown: new FormControl(this.towns[0]),
    campaignRadius: new FormControl(''),
  });

  addCampaign() {
    console.log(this.campaignForm.value);
  }
}
