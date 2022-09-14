import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleSessionTimeoutDialogComponent } from './idle-session-timeout-dialog.component';

describe('IdleSessionTimeoutDialogComponent', () => {
  let component: IdleSessionTimeoutDialogComponent;
  let fixture: ComponentFixture<IdleSessionTimeoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdleSessionTimeoutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdleSessionTimeoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
