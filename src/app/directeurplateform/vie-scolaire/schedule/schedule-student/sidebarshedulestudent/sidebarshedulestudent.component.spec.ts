import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarshedulestudentComponent } from './sidebarshedulestudent.component';

describe('SidebarshedulestudentComponent', () => {
  let component: SidebarshedulestudentComponent;
  let fixture: ComponentFixture<SidebarshedulestudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarshedulestudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarshedulestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
