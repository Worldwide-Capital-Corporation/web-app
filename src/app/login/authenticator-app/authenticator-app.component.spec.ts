import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatorAppComponent } from './authenticator-app.component';

describe('AuthenticatorAppComponent', () => {
  let component: AuthenticatorAppComponent;
  let fixture: ComponentFixture<AuthenticatorAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatorAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
