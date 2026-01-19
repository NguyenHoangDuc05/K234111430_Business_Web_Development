import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise18 } from './exercise18';

describe('Exercise18Component', () => {
  let component: Exercise18;
  let fixture: ComponentFixture<Exercise18>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise18]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise18);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
