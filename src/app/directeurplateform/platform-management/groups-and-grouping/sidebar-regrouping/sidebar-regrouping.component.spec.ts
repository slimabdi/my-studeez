import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRegroupingComponent } from './sidebar-regrouping.component';

describe('SidebarRegroupingComponent', () => {
  let component: SidebarRegroupingComponent;
  let fixture: ComponentFixture<SidebarRegroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRegroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRegroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
