import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarCalendarComponent } from './scolar-calendar.component';

describe('ScolarCalendarComponent', () => {
  let component: ScolarCalendarComponent;
  let fixture: ComponentFixture<ScolarCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolarCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
