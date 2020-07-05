import { TestBed } from '@angular/core/testing';

import { CopService } from './cop.service';

describe('CopService', () => {
  let service: CopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
