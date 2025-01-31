import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-campaign-adder',
  imports: [ReactiveFormsModule],
  templateUrl: './campaign-adder.component.html',
  styleUrl: './campaign-adder.component.scss',
})
export class CampaignAdderComponent {
  campaignForm = new FormGroup({
    campaignName: new FormControl(''),
  });

  addCampaign() {
    console.log(this.campaignForm.value.campaignName);
  }
}
