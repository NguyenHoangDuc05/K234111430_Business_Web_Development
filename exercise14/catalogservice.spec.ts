import { TestBed } from '@angular/core/testing';

import { Catalogservice } from './catalogservice';

describe('Catalogservice', () => {
  let service: Catalogservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Catalogservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
