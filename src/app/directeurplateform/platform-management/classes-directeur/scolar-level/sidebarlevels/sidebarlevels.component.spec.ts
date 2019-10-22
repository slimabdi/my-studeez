import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarlevelsComponent } from './sidebarlevels.component';

describe('SidebarlevelsComponent', () => {
  let component: SidebarlevelsComponent;
  let fixture: ComponentFixture<SidebarlevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarlevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarlevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
