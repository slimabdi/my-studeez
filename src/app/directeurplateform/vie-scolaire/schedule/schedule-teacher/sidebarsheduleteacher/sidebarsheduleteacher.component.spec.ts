import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarsheduleteacherComponent } from './sidebarsheduleteacher.component';

describe('SidebarsheduleteacherComponent', () => {
  let component: SidebarsheduleteacherComponent;
  let fixture: ComponentFixture<SidebarsheduleteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarsheduleteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarsheduleteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
