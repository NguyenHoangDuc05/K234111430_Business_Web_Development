import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lunar } from './lunar';

describe('Lunar', () => {
  let component: Lunar;
  let fixture: ComponentFixture<Lunar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lunar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lunar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
