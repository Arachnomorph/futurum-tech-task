import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import events from '../event.service';

@Component({
  selector: 'app-campaign-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.scss',
})
export class CampaignFormComponent implements OnInit {
  towns = ['', 'London', 'Manchester', 'Liverpool', 'Birmingham']; //TODO: Get this from a service
  statuses = ['On', 'Off']; //TODO: Get this from a service
  bidMin = 50;
  eBalance = 1000; // TODO: Get this from a service
  tempEBalance = this.eBalance;
  formType: string = 'add';
  isActive: boolean = false;

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

  constructor() {
    events.listen('initializeAddForm', () => {
      this.formType = 'add';
      this.isActive ? null : this.toggleActive();
    });
    events.listen('initializeEditForm', () => {
      this.formType = 'edit';
      this.isActive ? null : this.toggleActive();
    });
  }

  ngOnInit(): void {
    this.campaignForm.get('campaignFund')?.valueChanges.subscribe((value) => {
      this.updateTempEBalance(value);
    });
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  updateTempEBalance(value: string | number | null) {
    if (value == null) {
      this.tempEBalance = this.eBalance;
    }
    if (typeof value === 'number') {
      this.tempEBalance = this.eBalance - value;
    }
  }

  addCampaign() {
    console.log('Write adding campaign logic!');
    this.campaignForm.reset();
    this.isActive ? this.toggleActive() : null;
  }

  editCampaign() {
    console.log('Write editing logic!');
    this.isActive ? this.toggleActive() : null;
  }
}
