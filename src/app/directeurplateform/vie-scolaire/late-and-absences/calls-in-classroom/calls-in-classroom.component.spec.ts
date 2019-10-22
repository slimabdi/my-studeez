import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsInClassroomComponent } from './calls-in-classroom.component';

describe('CallsInClassroomComponent', () => {
  let component: CallsInClassroomComponent;
  let fixture: ComponentFixture<CallsInClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallsInClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsInClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
