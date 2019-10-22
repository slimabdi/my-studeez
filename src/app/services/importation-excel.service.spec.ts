import { TestBed, inject } from '@angular/core/testing';

import { ImportationExcelService } from './importation-excel.service';

describe('ImportationExcelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportationExcelService]
    });
  });

  it('should be created', inject([ImportationExcelService], (service: ImportationExcelService) => {
    expect(service).toBeTruthy();
  }));
});
