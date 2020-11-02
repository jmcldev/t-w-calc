import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeflectionComponent } from './deflection.component';

describe('DeflectionComponent', () => {
  let component: DeflectionComponent;
  let fixture: ComponentFixture<DeflectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeflectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeflectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
