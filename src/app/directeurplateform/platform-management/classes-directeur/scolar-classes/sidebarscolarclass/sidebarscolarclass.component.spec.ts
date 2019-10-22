import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarscolarclassComponent } from './sidebarscolarclass.component';

describe('SidebarscolarclassComponent', () => {
  let component: SidebarscolarclassComponent;
  let fixture: ComponentFixture<SidebarscolarclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarscolarclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarscolarclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
