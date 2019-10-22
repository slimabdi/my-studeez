import { TestBed, inject } from '@angular/core/testing';

import { InfermerieService } from './infermerie.service';

describe('InfermerieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfermerieService]
    });
  });

  it('should be created', inject([InfermerieService], (service: InfermerieService) => {
    expect(service).toBeTruthy();
  }));
});
