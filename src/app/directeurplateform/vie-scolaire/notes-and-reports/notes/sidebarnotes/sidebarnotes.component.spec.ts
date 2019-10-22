import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarnotesComponent } from './sidebarnotes.component';

describe('SidebarnotesComponent', () => {
  let component: SidebarnotesComponent;
  let fixture: ComponentFixture<SidebarnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
