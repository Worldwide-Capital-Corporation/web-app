import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOfficeAddressStepComponent } from './client-office-address-step.component';

describe('ClientOfficeAddressStepComponent', () => {
  let component: ClientOfficeAddressStepComponent;
  let fixture: ComponentFixture<ClientOfficeAddressStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOfficeAddressStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOfficeAddressStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
