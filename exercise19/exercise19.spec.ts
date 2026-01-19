import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise19 } from './exercise19';

describe('Exercise19', () => {
  let component: Exercise19;
  let fixture: ComponentFixture<Exercise19>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise19]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise19);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
