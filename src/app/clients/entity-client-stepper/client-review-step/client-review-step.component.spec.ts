import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReviewStepComponent } from './client-review-step.component';

describe('ClientReviewStepComponent', () => {
  let component: ClientReviewStepComponent;
  let fixture: ComponentFixture<ClientReviewStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReviewStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReviewStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
