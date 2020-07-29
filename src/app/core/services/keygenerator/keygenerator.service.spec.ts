import { TestBed } from '@angular/core/testing';

import { KeygeneratorService } from './keygenerator.service';

describe('KeygeneratorService', () => {
  let service: KeygeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeygeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
