import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityClientComponent } from './create-entity-client.component';

describe('CreateEntityClientComponent', () => {
  let component: CreateEntityClientComponent;
  let fixture: ComponentFixture<CreateEntityClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEntityClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
