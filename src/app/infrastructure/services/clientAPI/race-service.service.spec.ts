import { TestBed, inject } from '@angular/core/testing';

import { RaceServiceService } from './race-service.service';

describe('RaceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceServiceService]
    });
  });

  it('should be created', inject([RaceServiceService], (service: RaceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
