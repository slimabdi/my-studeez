import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAndGroupingComponent } from './groups-and-grouping.component';

describe('GroupsAndGroupingComponent', () => {
  let component: GroupsAndGroupingComponent;
  let fixture: ComponentFixture<GroupsAndGroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsAndGroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAndGroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
