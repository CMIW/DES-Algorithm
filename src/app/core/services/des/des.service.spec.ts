import { TestBed } from '@angular/core/testing';

import { DESService } from './des.service';

describe('DESService', () => {
  let service: DESService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DESService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
