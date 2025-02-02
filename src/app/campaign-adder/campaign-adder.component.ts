import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-campaign-adder',
  imports: [ReactiveFormsModule],
  templateUrl: './campaign-adder.component.html',
  styleUrl: './campaign-adder.component.scss',
})
export class CampaignAdderComponent implements OnInit {
  towns = ['', 'London', 'Manchester', 'Liverpool', 'Birmingham']; //TODO: Get this from a service
  statuses = ['On', 'Off']; //TODO: Get this from a service
  bidMin = 50;
  eBalance = 1000; // TODO: Get this from a service
  tempEBalance = this.eBalance;

  campaignForm = new FormGroup({
    campaignName: new FormControl('', Validators.required),
    campaignKeywords: new FormControl('', Validators.required),
    campaignBid: new FormControl('', [
      Validators.required,
      Validators.min(this.bidMin),
    ]),
    campaignFund: new FormControl('', Validators.required),
    campaignStatus: new FormControl(this.statuses[1], Validators.required),
    campaignTown: new FormControl(this.towns[0], [
      Validators.required,
      Validators.minLength(1),
    ]),
    campaignRadius: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.campaignForm.get('campaignFund')?.valueChanges.subscribe((value) => {
      if (value == null) {
        this.tempEBalance = this.eBalance;
      }
      if (typeof value === 'number') {
        this.tempEBalance = this.eBalance - value;
      }
    });
  }

  addCampaign() {
    console.log(this.campaignForm.value);
    this.campaignForm.reset();
  }
}
