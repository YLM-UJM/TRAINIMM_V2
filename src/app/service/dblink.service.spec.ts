import { TestBed } from '@angular/core/testing';

import { DblinkService } from './dblink.service';

describe('DblinkService', () => {
  let service: DblinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DblinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
