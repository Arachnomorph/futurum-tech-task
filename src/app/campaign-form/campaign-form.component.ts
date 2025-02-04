import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CampaignsService } from '../campaigns.service';
import events from '../event.service';

@Component({
  selector: 'app-campaign-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  templateUrl: './campaign-form.component.html',
  styleUrl: './campaign-form.component.scss',
})
export class CampaignFormComponent implements OnInit {
  towns: string[] = [''];
  statuses = ['On', 'Off'];
  bidMin = 50;
  eBalance = 0;
  tempEBalance = this.eBalance;
  formType: string = 'add';
  isActive: boolean = false;
  keywords: string[] = [''];
  filteredKeywords: Observable<string[]> | undefined;
  savedKeywords: string[] = [];

  campaignForm = new FormGroup({
    isDeleted: new FormControl(false),
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    keywords: new FormControl('', this.arrayIsNotEmpty(this.savedKeywords)),
    bid: new FormControl('', [
      Validators.required,
      Validators.min(this.bidMin),
    ]),
    fund: new FormControl('', Validators.required),
    status: new FormControl(this.statuses[1], Validators.required),
    town: new FormControl(this.towns[0], [
      Validators.required,
      Validators.minLength(1),
    ]),
    radius: new FormControl('', Validators.required),
  });

  constructor(private CampaignsService: CampaignsService) {
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
    this.CampaignsService.getData().subscribe((response) => {
      let data = response;
      this.eBalance = data.emeraldAccountBalance;
      this.keywords = data.keywordList;
      this.towns.push(...data.towns);
      this.tempEBalance = this.eBalance;
    });

    this.campaignForm.get('fund')?.valueChanges.subscribe((value) => {
      this.updateTempEBalance(value);
    });

    this.filteredKeywords = this.campaignForm
      .get('keywords')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }

  private arrayIsNotEmpty(array: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (array.length > 0) {
        return null;
      } else {
        console.log(`custom validator error: ${array} is empty`);
        return { arrayIsEmpty: 'true' };
      }
    };
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.keywords.filter((keyword) => {
      return keyword.toLowerCase().includes(filterValue);
    });
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  confirmKeyword() {
    let word = this.campaignForm.get('keywords')?.value;
    this.campaignForm.patchValue({ keywords: '' });
    if (typeof word === 'string') {
      this.savedKeywords.push(' ' + word);
    }
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
    let data = { form: this.campaignForm.value, words: this.savedKeywords };
    events.emit('addCampaign', data);
    console.log(data);
    this.campaignForm.reset();
    this.savedKeywords = [];
    this.campaignForm.patchValue({ isDeleted: false, status: 'Off' });
    this.isActive ? this.toggleActive() : null;
  }

  editCampaign() {
    events.emit('editCampaign', this.campaignForm.value);
    this.campaignForm.reset();
    this.savedKeywords = [];
    this.campaignForm.patchValue({ isDeleted: false, status: 'Off' });
    this.isActive ? this.toggleActive() : null;
  }
}
