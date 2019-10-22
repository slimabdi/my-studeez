import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesReportComponent } from './absences-report.component';

describe('AbsencesReportComponent', () => {
  let component: AbsencesReportComponent;
  let fixture: ComponentFixture<AbsencesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsencesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsencesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
