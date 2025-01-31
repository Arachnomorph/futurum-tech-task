import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAdderComponent } from './campaign-adder.component';

describe('CampaignAdderComponent', () => {
  let component: CampaignAdderComponent;
  let fixture: ComponentFixture<CampaignAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignAdderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
