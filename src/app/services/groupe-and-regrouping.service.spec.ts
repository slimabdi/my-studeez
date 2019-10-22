import { TestBed, inject } from '@angular/core/testing';

import { GroupeAndRegroupingService } from './groupe-and-regrouping.service';

describe('GroupeAndRegroupingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupeAndRegroupingService]
    });
  });

  it('should be created', inject([GroupeAndRegroupingService], (service: GroupeAndRegroupingService) => {
    expect(service).toBeTruthy();
  }));
});
