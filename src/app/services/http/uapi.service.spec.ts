import { TestBed } from '@angular/core/testing';

import { UapiService } from './uapi.service';

describe('UapiService', () => {
  let service: UapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
