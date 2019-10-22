import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarparentComponent } from './sidebarparent.component';

describe('SidebarparentComponent', () => {
  let component: SidebarparentComponent;
  let fixture: ComponentFixture<SidebarparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
