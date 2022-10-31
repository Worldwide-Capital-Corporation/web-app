import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsStepComponent } from './client-details-step.component';

describe('ClientDetailsStepComponent', () => {
  let component: ClientDetailsStepComponent;
  let fixture: ComponentFixture<ClientDetailsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailsStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
