import { TestBed, inject } from '@angular/core/testing';

import { ExelDownloadService } from './exel-download.service';

describe('ExelDownloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExelDownloadService]
    });
  });

  it('should be created', inject([ExelDownloadService], (service: ExelDownloadService) => {
    expect(service).toBeTruthy();
  }));
});
