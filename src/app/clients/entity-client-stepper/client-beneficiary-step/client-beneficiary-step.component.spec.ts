import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBeneficiaryStepComponent } from './client-beneficiary-step.component';

describe('ClientBeneficiaryStepComponent', () => {
  let component: ClientBeneficiaryStepComponent;
  let fixture: ComponentFixture<ClientBeneficiaryStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBeneficiaryStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBeneficiaryStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
