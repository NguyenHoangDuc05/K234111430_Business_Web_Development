import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Exercise13 } from './exercise13';

describe('Exercise13', () => {
  let component: Exercise13;
  let fixture: ComponentFixture<Exercise13>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise13],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise13);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
