import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFollowComponent } from './students-follow.component';

describe('StudentsFollowComponent', () => {
  let component: StudentsFollowComponent;
  let fixture: ComponentFixture<StudentsFollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsFollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
