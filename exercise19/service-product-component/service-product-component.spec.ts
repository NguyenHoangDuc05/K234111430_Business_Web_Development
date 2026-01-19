import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductComponent } from './service-product-component';

describe('ServiceProductComponent', () => {
  let component: ServiceProductComponent;
  let fixture: ComponentFixture<ServiceProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProductComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
